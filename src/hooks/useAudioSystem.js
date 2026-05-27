import { useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

export function useAudioSystem() {
  const bgmRef = useRef(null);
  const currentBgmSrc = useRef(null);
  const sePool = useRef({});
  const masterVolume = useRef(0.7);
  const bgmVolume = useRef(0.5);
  const seVolume = useRef(0.8);
  const isMuted = useRef(false);

  const playBGM = useCallback((src, { fadeDuration = 1500 } = {}) => {
    if (!src || src === currentBgmSrc.current) return;

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
      html5: true,
    });

    newBgm.play();
    newBgm.fade(0, bgmVolume.current * masterVolume.current, fadeDuration);
    bgmRef.current = newBgm;
    currentBgmSrc.current = src;
  }, []);

  const playSE = useCallback((src) => {
    if (!src) return;
    // Simple pooling: create or reuse Howl for this src
    if (!sePool.current[src]) {
      sePool.current[src] = new Howl({
        src: [src],
        volume: seVolume.current * masterVolume.current,
      });
    }
    sePool.current[src].play();
  }, []);

  const stopBGM = useCallback((fadeDuration = 1000) => {
    if (bgmRef.current) {
      bgmRef.current.fade(bgmRef.current.volume(), 0, fadeDuration);
      setTimeout(() => {
        bgmRef.current?.unload();
        bgmRef.current = null;
        currentBgmSrc.current = null;
      }, fadeDuration + 100);
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
    playSE,
    stopBGM,
    toggleMute,
    setMasterVol,
  };
}
