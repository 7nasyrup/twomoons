import { useRef, useCallback, useEffect } from 'react';
import { Howl, Howler } from 'howler';

// HTML5 Audioプールが枯渇する警告を防ぐためにサイズを拡張
Howler.html5PoolSize = 100;

export function useAudioSystem() {
  const bgmRef = useRef(null);
  const currentBgmSrc = useRef(null);
  const sePool = useRef({});
  const masterVolume = useRef(0.7);
  const bgmVolume = useRef(0.5);
  const seVolume = useRef(0.8);
  const isMuted = useRef(false);

  const playBGM = useCallback((src, { fadeDuration = 1500, volume, seek = 0 } = {}) => {
    if (!src) return;

    if (src === currentBgmSrc.current) {
      if (volume !== undefined && bgmRef.current) {
        bgmVolume.current = volume;
        const targetVol = volume * masterVolume.current;
        bgmRef.current.fade(bgmRef.current.volume(), targetVol, fadeDuration);
      }
      return;
    }

    if (volume !== undefined) {
      bgmVolume.current = volume;
    } else {
      bgmVolume.current = 0.5; // デフォルト音量
    }

    // Fade out current BGM
    if (bgmRef.current) {
      const oldBgm = bgmRef.current;
      oldBgm.fade(oldBgm.volume(), 0, fadeDuration);
      setTimeout(() => oldBgm.unload(), fadeDuration + 100);
    }

    const newBgm = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      html5: false,
      onend: function() {
        if (this.loop()) {
          this.play();
        }
      }
    });

    newBgm.play();
    if (seek > 0) {
      newBgm.seek(seek);
    }
    newBgm.fade(0, bgmVolume.current * masterVolume.current, fadeDuration);
    bgmRef.current = newBgm;
    currentBgmSrc.current = src;
  }, []);

  const playSE = useCallback((src, duration = null) => {
    if (!src) return;

    if (sePool.current[src]) {
      sePool.current[src].stop();
      sePool.current[src].unload();
    }

    const sound = new Howl({
      src: [src],
      html5: false,
      volume: seVolume.current * masterVolume.current,
    });
    sePool.current[src] = sound;
    const soundId = sound.play();

    if (duration) {
      setTimeout(() => {
        if (sePool.current[src]) {
          const currentVol = sePool.current[src].volume();
          sePool.current[src].fade(currentVol, 0, 300, soundId);
          setTimeout(() => {
            if (sePool.current[src]) {
              sePool.current[src].stop(soundId);
            }
          }, 300);
        }
      }, duration * 1000);
    }
  }, []);

  const stopSE = useCallback((src, fadeDuration = 300) => {
    if (src) {
      const sound = sePool.current[src];
      if (sound) {
        sound.fade(sound.volume(), 0, fadeDuration);
        setTimeout(() => {
          sound.stop();
          sound.unload();
          delete sePool.current[src];
        }, fadeDuration + 50);
      }
    } else {
      Object.values(sePool.current).forEach(h => {
        h.stop();
        h.unload();
      });
      sePool.current = {};
    }
  }, []);

  const stopBGM = useCallback((fadeDuration = 1000) => {
    if (bgmRef.current) {
      const oldBgm = bgmRef.current;
      oldBgm.fade(oldBgm.volume(), 0, fadeDuration);
      setTimeout(() => {
        oldBgm.unload();
        if (bgmRef.current === oldBgm) {
          bgmRef.current = null;
          currentBgmSrc.current = null;
        }
      }, fadeDuration + 100);
    }
  }, []);

  const pauseBGM = useCallback((fadeDuration = 1000) => {
    if (bgmRef.current) {
      const currentBgm = bgmRef.current;
      currentBgm.fade(currentBgm.volume(), 0, fadeDuration);
      setTimeout(() => {
        currentBgm.pause();
      }, fadeDuration + 100);
    }
  }, []);

  const resumeBGM = useCallback((fadeDuration = 1000) => {
    if (bgmRef.current) {
      const currentBgm = bgmRef.current;
      currentBgm.play();
      currentBgm.fade(0, bgmVolume.current * masterVolume.current, fadeDuration);
    }
  }, []);

  const toggleMute = useCallback(() => {
    isMuted.current = !isMuted.current;
    if (bgmRef.current) {
      bgmRef.current.mute(isMuted.current);
    }
    return isMuted.current;
  }, []);

  const setMasterVol = useCallback((val) => {
    masterVolume.current = val;
    if (bgmRef.current) {
      bgmRef.current.volume(bgmVolume.current * val);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      bgmRef.current?.unload();
      Object.values(sePool.current).forEach(h => h.unload());
    };
  }, []);

  return {
    playBGM,
    pauseBGM,
    resumeBGM,
    playSE,
    stopSE,
    stopBGM,
    toggleMute,
    setMasterVol,
  };
}
