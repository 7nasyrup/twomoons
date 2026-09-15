import { useRef, useCallback, useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';

Howler.html5PoolSize = 100;

let globalMaster = parseFloat(localStorage.getItem('volume_master') ?? '0.7');
let globalBGM = parseFloat(localStorage.getItem('volume_bgm') ?? '0.5');
let globalSE = parseFloat(localStorage.getItem('volume_se') ?? '0.8');
let globalMuted = localStorage.getItem('volume_muted') === 'true';

let activeBgm = null;
let activeBgmSrc = null;
const sePool = {};

export function useAudioSystem() {
  const [masterVolume, setMasterVolume] = useState(globalMaster);
  const [bgmVolume, setBgmVolumeState] = useState(globalBGM);
  const [seVolume, setSeVolumeState] = useState(globalSE);
  const [isMuted, setIsMuted] = useState(globalMuted);

  useEffect(() => { Howler.mute(globalMuted); }, []);

  const playBGM = useCallback((src, { fadeDuration = 1500, volume, seek = 0 } = {}) => {
    if (!src) return;
    if (src === activeBgmSrc) {
      if (volume !== undefined && activeBgm) {
        globalBGM = volume; setBgmVolumeState(volume);
        activeBgm.fade(activeBgm.volume(), volume * globalMaster, fadeDuration);
      }
      return;
    }
    if (volume !== undefined) {
      globalBGM = volume; setBgmVolumeState(volume);
    }
    if (activeBgm) {
      const old = activeBgm;
      old.fade(old.volume(), 0, fadeDuration);
      setTimeout(() => old.unload(), fadeDuration + 100);
    }
    const nb = new Howl({ src: [src], loop: true, volume: 0, html5: false });
    nb.play();
    if (seek > 0) nb.seek(seek);
    nb.fade(0, globalBGM * globalMaster, fadeDuration);
    activeBgm = nb; activeBgmSrc = src;
  }, []);

  const playSE = useCallback((src, duration = null, loop = false, customVolume = 1.0, fadeOutDuration = 300) => {
    if (!src) return;
    if (sePool[src]) {
      if (sePool[src].loopInterval) clearInterval(sePool[src].loopInterval);
      sePool[src].stop(); sePool[src].unload();
    }
    const sound = new Howl({
      src: [src], html5: false,
      volume: globalSE * globalMaster * customVolume,
      loop: loop === true,
    });
    sePool[src] = sound;
    sound.play();

    if (typeof loop === 'number' && loop > 0) {
      sound.loopInterval = setInterval(() => { sound.play(); }, loop);
    }
    if (duration !== null && duration !== undefined) {
      setTimeout(() => {
        const s = sePool[src];
        if (s) {
          if (s.loopInterval) clearInterval(s.loopInterval);
          s.fade(s.volume(), 0, fadeOutDuration);
          setTimeout(() => { if (sePool[src]) sePool[src].stop(); }, fadeOutDuration);
        }
      }, duration * 1000);
    }
  }, []);

  const stopSE = useCallback((src, fadeDuration = 300) => {
    const stopOne = (s) => {
      if (!s) return;
      if (s.loopInterval) clearInterval(s.loopInterval);
      s.fade(s.volume(), 0, fadeDuration);
      setTimeout(() => { s.stop(); s.unload(); }, fadeDuration + 50);
    };
    if (src) {
      stopOne(sePool[src]); delete sePool[src];
    } else {
      Object.keys(sePool).forEach(k => { stopOne(sePool[k]); delete sePool[k]; });
    }
  }, []);

  const stopBGM = useCallback((fadeDuration = 1000) => {
    if (activeBgm) {
      const old = activeBgm; activeBgmSrc = null;
      old.fade(old.volume(), 0, fadeDuration);
      setTimeout(() => { old.unload(); if (activeBgm === old) activeBgm = null; }, fadeDuration + 100);
    }
  }, []);

  const pauseBGM = useCallback((fadeDuration = 1000) => {
    if (activeBgm) {
      const cur = activeBgm; cur.fade(cur.volume(), 0, fadeDuration);
      setTimeout(() => { cur.pause(); }, fadeDuration + 100);
    }
  }, []);

  const resumeBGM = useCallback((fadeDuration = 1000) => {
    if (activeBgm) {
      const cur = activeBgm; cur.play(); cur.fade(0, globalBGM * globalMaster, fadeDuration);
    }
  }, []);

  const setBGMVolume = useCallback((v, fd = 0) => {
    globalBGM = v; localStorage.setItem('volume_bgm', v.toString()); setBgmVolumeState(v);
    if (activeBgm) {
      if (fd > 0) activeBgm.fade(activeBgm.volume(), v * globalMaster, fd);
      else activeBgm.volume(v * globalMaster);
    }
  }, []);

  const setSEVolume = useCallback((v) => {
    globalSE = v; localStorage.setItem('volume_se', v.toString()); setSeVolumeState(v);
    Object.values(sePool).forEach(s => s.volume(v * globalMaster));
  }, []);

  const setMasterVol = useCallback((v) => {
    globalMaster = v; localStorage.setItem('volume_master', v.toString()); setMasterVolume(v);
    if (activeBgm) activeBgm.volume(globalBGM * v);
    Object.values(sePool).forEach(s => s.volume(globalSE * v));
  }, []);

  const toggleMute = useCallback(() => {
    const next = !globalMuted; globalMuted = next;
    localStorage.setItem('volume_muted', next.toString());
    setIsMuted(next); Howler.mute(next); return next;
  }, []);

  return {
    playBGM, pauseBGM, resumeBGM, playSE, stopSE, stopBGM, toggleMute,
    setMasterVol, setBGMVolume, setSEVolume, masterVolume, bgmVolume, seVolume, isMuted,
  };
}
