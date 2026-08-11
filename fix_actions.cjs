const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. isSpecialAction
code = code.replace(
  `    const isSpecialAction = [
      'FADE_TO_BLACK', 'SLOW_FADE_TO_BLACK', 'WAKE_UP', 'FADE_OUT',
      'WAIT_SECONDS', 'WAIT_SECONDS_AND_MOVE_MOON', 'ALL_FADE_OUT', 'WAIT_FADE',
      'WHITE_OUT_END', 'WHITE_OUT_START', 'WHITE_OUT_END_SLOW', 'WHITE_OUT_END_VERY_SLOW',
      'AWAKEN_MICHIRU'
    ].includes(currentLine.action);`,
  `    const _acts = Array.isArray(currentLine.action) ? currentLine.action : (typeof currentLine.action === 'string' ? currentLine.action.split(',').map(a => a.trim()) : []);
    const isSpecialAction = _acts.some(act => [
      'FADE_TO_BLACK', 'SLOW_FADE_TO_BLACK', 'WAKE_UP', 'FADE_OUT',
      'WAIT_SECONDS', 'WAIT_SECONDS_AND_MOVE_MOON', 'ALL_FADE_OUT', 'WAIT_FADE',
      'WHITE_OUT_END', 'WHITE_OUT_START', 'WHITE_OUT_END_SLOW', 'WHITE_OUT_END_VERY_SLOW',
      'AWAKEN_MICHIRU'
    ].includes(act));`
);

// 2. Cinema Autoplay timers
code = code.replace(
  `    if (currentLine.style === 'cinema' || currentLine.action === 'FADE_TO_BLACK' || currentLine.action === 'SLOW_FADE_TO_BLACK' || currentLine.action === 'WAIT_FADE') {
      let delay = 3000;
      if (currentLine.action === 'FADE_IN') delay = 2500;
      if (currentLine.action === 'FADE_OUT') delay = 2000;
      if (currentLine.action === 'WAIT_SECONDS') delay = 2000;
      if (currentLine.action === 'SLOW_FADE_IN') delay = 3500;
      if (currentLine.action === 'WAIT_SECONDS_AND_MOVE_MOON') delay = 4000;
      if (currentLine.action === 'ALL_FADE_OUT') delay = 3000;
      if (currentLine.action === 'FADE_TO_BLACK' || currentLine.action === 'SLOW_FADE_TO_BLACK') delay = currentLine.duration || (currentLine.action === 'SLOW_FADE_TO_BLACK' ? 3000 : 2000);
      if (currentLine.action === 'WAIT_FADE') delay = 1000;`,
  `    const rawAct = currentLine.action;
    const _acts2 = Array.isArray(rawAct) ? rawAct : (typeof rawAct === 'string' ? rawAct.split(',').map(a => a.trim()) : []);
    const hasAction2 = (act) => _acts2.includes(act);
    if (currentLine.style === 'cinema' || hasAction2('FADE_TO_BLACK') || hasAction2('SLOW_FADE_TO_BLACK') || hasAction2('WAIT_FADE')) {
      let delay = 3000;
      if (hasAction2('FADE_IN')) delay = 2500;
      if (hasAction2('FADE_OUT')) delay = 2000;
      if (hasAction2('WAIT_SECONDS')) delay = 2000;
      if (hasAction2('SLOW_FADE_IN')) delay = 3500;
      if (hasAction2('WAIT_SECONDS_AND_MOVE_MOON')) delay = 4000;
      if (hasAction2('ALL_FADE_OUT')) delay = 3000;
      if (hasAction2('FADE_TO_BLACK') || hasAction2('SLOW_FADE_TO_BLACK')) delay = currentLine.duration || (hasAction2('SLOW_FADE_TO_BLACK') ? 3000 : 2000);
      if (hasAction2('WAIT_FADE')) delay = 1000;`
);

// 3. The huge action block
const originalBlock = `    const action = currentLine.action;
    if (action) {
      // Blood overlay actions
      if (action === 'SHOW_BLOOD' || action === 'BLOOD_SCREEN' || action === 'BLOOD_SPLATTING') {
        setIsBloodActive(true);
      } else if (action === 'CLEAR_BLOOD' || action === 'MUTSUNORI_HEALING_CUTIN') {
        setIsBloodActive(false);
      } else if (action === 'RED_ALERT_FLASH') {
        setIsRedAlertActive(true);
      } else if (action === 'CLEAR_RED_ALERT') {
        setIsRedAlertActive(false);
      } else if (action === 'RED_ALERT_AND_SMALL_SHAKE') {
        setIsRedAlertActive(true);
        setShakeEffect('small_continuous');
      } else if (action === 'CLEAR_ALL_ALERTS_AND_SHAKES') {
        setIsRedAlertActive(false);
        setShakeEffect(false);
      } else if (action === 'MONOCHROME_FLASH') {
        setIsMonochromeFlashActive(true);
      } else if (action === 'CLEAR_MONOCHROME_FLASH') {
        setIsMonochromeFlashActive(false);
      } else if (action === 'CLEAR_WHITE_OUT_AND_FLASHBACK_END') {
        setIsWhiteOut(false);
        setIsEnergyAuraActive(false);
      }

      // Sprite Slot actions
      if (action === 'SHOW_SILHOUETTE_LEFT') {
        setLeftActive(true);
      } else if (action === 'SHOW_SILHOUETTE_RIGHT') {
        setRightActive(true);
      } else if (action === 'HIDE_SILHOUETTE_RIGHT') {
        setRightActive(false);
      } else if (action === 'SHOW_BOTH_SILHOUETTES') {
        setLeftActive(true);
        setRightActive(true);
      } else if (action === 'FOCUS_SILHOUETTE_LEFT') {
        setLeftActive(true);
        setFocusSlot('left');
      }

      // SE Triggers
      if (action === 'PLAY_CHIME_SE') {
        playSE(assetPath('/assets/audio/se/school_chime.mp3'));
      } else if (action === 'PLAY_RUNNING_SE') {
        playSE(assetPath('/assets/audio/se/running.mp3'));
      } else if (action === 'PLAY_FOOTSTEP_SE') {
        playSE(assetPath('/assets/audio/se/footsteps.mp3'));
      }

      // Shake Screen
      if (action === 'SHAKE_SCREEN' || action === 'STOP_ALL_AURAS_AND_SHAKE' || action === 'END_PHONE_CALL_AND_SHAKE') {
        if (action === 'STOP_ALL_AURAS_AND_SHAKE') {
          setIsEnergyAuraActive(false);
          setIsBlackAuraActive(false);
          setShakeEffect('large');
        } else {
          setShakeEffect(true);
        }
        if (action === 'END_PHONE_CALL_AND_SHAKE') {
          setIsPhoneCallRight(false);
        }
        const timer = setTimeout(() => setShakeEffect(false), 600);
        return () => {
          clearTimeout(timer);
          setShakeEffect(false);
        };
      } else if (action === 'SHAKE_SCREEN_VERY_LARGE' || action === 'SHAKE_AND_SMOKE') {
        if (action === 'SHAKE_AND_SMOKE') setIsSmokeActive(true);
        setShakeEffect('large');
        const timer = setTimeout(() => setShakeEffect(false), 800);
        return () => {
          clearTimeout(timer);
          setShakeEffect(false);
        };
      } else if (action === 'SHAKE_SCREEN_EXTREME') {
        setShakeEffect('extreme');
        // continuous shake, no auto-clear
      } else if (action === 'SHAKE_SCREEN_CONTINUOUS_SMALL') {
        setShakeEffect('small_continuous');
      } else if (action === 'SHAKE_SCREEN_LONG_SMALL') {
        setShakeEffect('small_continuous');
        const timer = setTimeout(() => setShakeEffect(false), 2500);
        return () => {
          clearTimeout(timer);
          setShakeEffect(false);
        };
      } else if (action === 'DIZZY_EFFECT') {
        setShakeEffect('dizzy');
        // 継続的なエフェクトとするため自動クリアはしない
      } else if (action === 'BLUR_EFFECT') {
        setShakeEffect('blurOnly');
        // 継続的なエフェクト
      } else if (action === 'CLEAR_SHAKE') {
        setShakeEffect(false);
      }

      // Screen Effects
      if (action === 'FADE_IN_SMOKE') {
        setIsSmokeActive(true);
      } else if (action === 'CLEAR_SMOKE') {
        setIsSmokeActive(false);
      } else if (action === 'ENERGY_AURA_START') {
        setIsEnergyAuraActive(true);
      } else if (action === 'ENERGY_AURA_STOP') {
        setIsEnergyAuraActive(false);
      } else if (action === 'BLACK_AURA_START') {
        setIsBlackAuraActive(true);
      } else if (action === 'BLACK_AURA_STOP') {
        setIsBlackAuraActive(false);
      } else if (action === 'DARK_ENERGY_GATHER') {
        setIsDarkEnergyActive(true);
      } else if (action === 'CLEAR_DARK_ENERGY') {
        setIsDarkEnergyActive(false);
      } else if (action === 'CLOSE_EYES') {
        setIsEyesClosed(true);
      } else if (action === 'OPEN_EYES' || action === 'WAKE_UP') {
        setIsEyesClosed(false);
      } else if (action === 'START_PHONE_CALL_RIGHT') {
        setIsPhoneCallRight(true);
      } else if (action === 'END_PHONE_CALL' || action === 'END_PHONE_CALL_AND_SHAKE') {
        setIsPhoneCallRight(false);
      } else if (action === 'TEAR_BLUR_START') {
        setIsTearBlurActive(true);
      } else if (action === 'TEAR_BLUR_STOP') {
        setIsTearBlurActive(false);
      }

      if (action === 'LIGHT_WAVE_BURST') {
        setIsLightWaveActive(true);
        setShakeEffect('large');
        setIsWhiteFlash70Active(true);
        const flashTimer = setTimeout(() => setIsWhiteFlash70Active(false), 500);
        const shakeTimer = setTimeout(() => setShakeEffect(false), 1200);
        return () => {
          clearTimeout(flashTimer);
          clearTimeout(shakeTimer);
          setShakeEffect(false);
        };
      } else if (action === 'CLEAR_LIGHT_WAVE') {
        setIsLightWaveActive(false);
      } else if (action === 'SPEED_EFFECT' || action === 'SPEED_EFFECT_START') {
        setIsSpeedEffectActive(true);
      } else if (action === 'CLEAR_SPEED_EFFECT' || action === 'SPEED_EFFECT_STOP') {
        setIsSpeedEffectActive(false);
      }

      if (action === 'BLACK_DISTORTION' || action === 'BLACK_DISTORT') {
        setIsBlackDistortActive(true);
        const timer = setTimeout(() => setIsBlackDistortActive(false), 2000);
        return () => {
          clearTimeout(timer);
          setIsBlackDistortActive(false);
        };
      }

      if (action === 'FADE_TO_BLACK' || action === 'SLOW_FADE_TO_BLACK') {
        setIsFadingBlack(true);
        setIsRedAlertActive(false); // Stop red alert flash when transitioning to black
        setIsMonochromeFlashActive(false);
        const fadeDuration = currentLine.duration || (action === 'SLOW_FADE_TO_BLACK' ? 3000 : 2000);
        const timer = setTimeout(() => setIsFadingBlack(false), fadeDuration);
        
        let shakeTimer;
        if (action === 'SLOW_FADE_TO_BLACK') {
          setShakeEffect('fadeOut');
          shakeTimer = setTimeout(() => {
            setShakeEffect(false);
          }, fadeDuration);
        }

        return () => {
          clearTimeout(timer);
          if (shakeTimer) clearTimeout(shakeTimer);
          setIsFadingBlack(false);
          if (action === 'SLOW_FADE_TO_BLACK') setShakeEffect(false);
        };
      }

      if (action === 'WHITE_OUT_START') {
        setWhiteOutDuration(0.8);
        setIsWhiteOut(true);
        setWhitePulseLevel(0);
        setShakeEffect(false);
      } else if (action === 'AWAKEN_MICHIRU') {
        setIsBlackAuraActive(false);
        setIsEnergyAuraActive(true);
        setWhiteOutDuration(0.8);
        setIsWhiteOut(true);
        setWhitePulseLevel(0);
        setShakeEffect(false);
      } else if (action === 'WHITE_OUT_END') {
        setWhiteOutDuration(0.8);
        setIsWhiteOut(false);
      } else if (action === 'WHITE_OUT_END_SLOW') {
        setWhiteOutDuration(3);
        setIsWhiteOut(false);
      } else if (action === 'WHITE_OUT_END_VERY_SLOW') {
        setWhiteOutDuration(6);
        setIsWhiteOut(false);
      } else if (action === 'GRAY_OUT_START') {
        setGrayOutDuration(0.1);
        setIsGrayOut(true);
      } else if (action === 'GRAY_OUT_END_SLOW') {
        setGrayOutDuration(3);
        setIsGrayOut(false);
      } else if (action === 'WHITE_PULSE_START') {
        setWhitePulseLevel(0.2);
      } else if (action === 'WHITE_PULSE_MID') {
        setWhitePulseLevel(0.5);
      } else if (action === 'WHITE_PULSE_HIGH') {
        setWhitePulseLevel(0.8);
      } else if (action === 'WHITE_PULSE_STOP') {
        setWhitePulseLevel(0);
      } else if (action === 'EXPLOSION_WHITEOUT') {
        setWhiteOutDuration(0.8);
        setIsWhiteOut(true);
        setShakeEffect('extreme');
        setTimeout(() => {
          setShakeEffect(false);
        }, 800);
      } else if (action === 'WHITE_FLASH') {
        setIsWhiteFlashActive(true);
        setTimeout(() => setIsWhiteFlashActive(false), 500);
      } else if (action === 'WHITE_FLASH_70') {
        setIsWhiteFlash70Active(true);
        setTimeout(() => setIsWhiteFlash70Active(false), 500);
      } else if (action === 'WHITE_FLASH_AND_SHAKE') {
        setIsWhiteFlashActive(true);
        setShakeEffect('extreme');
        setTimeout(() => {
          setIsWhiteFlashActive(false);
          setShakeEffect(false);
        }, 500);
      }

      // Red Alert
      if (action === 'TRIGGER_PHONE_RED_ALERT') {
        playSE(assetPath('/assets/audio/se/siren_alert.mp3'));
        setShakeEffect(true);
        const timer = setTimeout(() => setShakeEffect(false), 800);

        setAlertConfig({
          title: '⚠ LUNAR WAVE DETECTED',
          message: currentLine.text
        });
        setAlertActive(true);

        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
        return () => {
          clearTimeout(timer);
          setShakeEffect(false);
        };
      }
    } else {
      setFocusSlot(null);
    }`;

const newBlock = `    const rawMainAction = currentLine.action;
    const actionsList = Array.isArray(rawMainAction) ? rawMainAction : (typeof rawMainAction === 'string' ? rawMainAction.split(',').map(a => a.trim()) : []);
    const hasAction = (act) => actionsList.includes(act);

    if (actionsList.length > 0) {
      const cleanups = [];

      // Blood overlay actions
      if (hasAction('SHOW_BLOOD') || hasAction('BLOOD_SCREEN') || hasAction('BLOOD_SPLATTING')) {
        setIsBloodActive(true);
      } else if (hasAction('CLEAR_BLOOD') || hasAction('MUTSUNORI_HEALING_CUTIN')) {
        setIsBloodActive(false);
      }
      
      if (hasAction('RED_ALERT_FLASH')) {
        setIsRedAlertActive(true);
      } else if (hasAction('CLEAR_RED_ALERT')) {
        setIsRedAlertActive(false);
      } else if (hasAction('RED_ALERT_AND_SMALL_SHAKE')) {
        setIsRedAlertActive(true);
        setShakeEffect('small_continuous');
      } else if (hasAction('CLEAR_ALL_ALERTS_AND_SHAKES')) {
        setIsRedAlertActive(false);
        setShakeEffect(false);
      }
      
      if (hasAction('MONOCHROME_FLASH')) {
        setIsMonochromeFlashActive(true);
      } else if (hasAction('CLEAR_MONOCHROME_FLASH')) {
        setIsMonochromeFlashActive(false);
      }
      
      if (hasAction('CLEAR_WHITE_OUT_AND_FLASHBACK_END')) {
        setIsWhiteOut(false);
        setIsEnergyAuraActive(false);
      }

      // Sprite Slot actions
      if (hasAction('SHOW_SILHOUETTE_LEFT')) {
        setLeftActive(true);
      } else if (hasAction('SHOW_SILHOUETTE_RIGHT')) {
        setRightActive(true);
      } else if (hasAction('HIDE_SILHOUETTE_RIGHT')) {
        setRightActive(false);
      } else if (hasAction('SHOW_BOTH_SILHOUETTES')) {
        setLeftActive(true);
        setRightActive(true);
      } else if (hasAction('FOCUS_SILHOUETTE_LEFT')) {
        setLeftActive(true);
        setFocusSlot('left');
      }

      // SE Triggers
      if (hasAction('PLAY_CHIME_SE')) {
        playSE(assetPath('/assets/audio/se/school_chime.mp3'));
      } else if (hasAction('PLAY_RUNNING_SE')) {
        playSE(assetPath('/assets/audio/se/running.mp3'));
      } else if (hasAction('PLAY_FOOTSTEP_SE')) {
        playSE(assetPath('/assets/audio/se/footsteps.mp3'));
      }

      // Shake Screen
      if (hasAction('SHAKE_SCREEN') || hasAction('STOP_ALL_AURAS_AND_SHAKE') || hasAction('END_PHONE_CALL_AND_SHAKE')) {
        if (hasAction('STOP_ALL_AURAS_AND_SHAKE')) {
          setIsEnergyAuraActive(false);
          setIsBlackAuraActive(false);
          setShakeEffect('large');
        } else {
          setShakeEffect(true);
        }
        if (hasAction('END_PHONE_CALL_AND_SHAKE')) {
          setIsPhoneCallRight(false);
        }
        const timer = setTimeout(() => setShakeEffect(false), 600);
        cleanups.push(() => { clearTimeout(timer); setShakeEffect(false); });
      } else if (hasAction('SHAKE_SCREEN_VERY_LARGE') || hasAction('SHAKE_AND_SMOKE')) {
        if (hasAction('SHAKE_AND_SMOKE')) setIsSmokeActive(true);
        setShakeEffect('large');
        const timer = setTimeout(() => setShakeEffect(false), 800);
        cleanups.push(() => { clearTimeout(timer); setShakeEffect(false); });
      } else if (hasAction('SHAKE_SCREEN_EXTREME')) {
        setShakeEffect('extreme');
        // continuous shake, no auto-clear
      } else if (hasAction('SHAKE_SCREEN_CONTINUOUS_SMALL')) {
        setShakeEffect('small_continuous');
      } else if (hasAction('SHAKE_SCREEN_LONG_SMALL')) {
        setShakeEffect('small_continuous');
        const timer = setTimeout(() => setShakeEffect(false), 2500);
        cleanups.push(() => { clearTimeout(timer); setShakeEffect(false); });
      } else if (hasAction('DIZZY_EFFECT')) {
        setShakeEffect('dizzy');
      } else if (hasAction('BLUR_EFFECT')) {
        setShakeEffect('blurOnly');
      } else if (hasAction('CLEAR_SHAKE')) {
        setShakeEffect(false);
      }

      // Screen Effects
      if (hasAction('FADE_IN_SMOKE')) {
        setIsSmokeActive(true);
      } else if (hasAction('CLEAR_SMOKE')) {
        setIsSmokeActive(false);
      }
      
      if (hasAction('ENERGY_AURA_START')) {
        setIsEnergyAuraActive(true);
      } else if (hasAction('ENERGY_AURA_STOP')) {
        setIsEnergyAuraActive(false);
      }
      
      if (hasAction('BLACK_AURA_START')) {
        setIsBlackAuraActive(true);
      } else if (hasAction('BLACK_AURA_STOP')) {
        setIsBlackAuraActive(false);
      }
      
      if (hasAction('DARK_ENERGY_GATHER')) {
        setIsDarkEnergyActive(true);
      } else if (hasAction('CLEAR_DARK_ENERGY')) {
        setIsDarkEnergyActive(false);
      }
      
      if (hasAction('CLOSE_EYES')) {
        setIsEyesClosed(true);
      } else if (hasAction('OPEN_EYES') || hasAction('WAKE_UP')) {
        setIsEyesClosed(false);
      }
      
      if (hasAction('START_PHONE_CALL_RIGHT')) {
        setIsPhoneCallRight(true);
      } else if (hasAction('END_PHONE_CALL') || hasAction('END_PHONE_CALL_AND_SHAKE')) {
        setIsPhoneCallRight(false);
      }
      
      if (hasAction('TEAR_BLUR_START')) {
        setIsTearBlurActive(true);
      } else if (hasAction('TEAR_BLUR_STOP')) {
        setIsTearBlurActive(false);
      }

      if (hasAction('LIGHT_WAVE_BURST')) {
        setIsLightWaveActive(true);
        setShakeEffect('large');
        setIsWhiteFlash70Active(true);
        const flashTimer = setTimeout(() => setIsWhiteFlash70Active(false), 500);
        const shakeTimer = setTimeout(() => setShakeEffect(false), 1200);
        cleanups.push(() => { clearTimeout(flashTimer); clearTimeout(shakeTimer); setShakeEffect(false); });
      } else if (hasAction('CLEAR_LIGHT_WAVE')) {
        setIsLightWaveActive(false);
      }
      
      if (hasAction('SPEED_EFFECT') || hasAction('SPEED_EFFECT_START')) {
        setIsSpeedEffectActive(true);
      } else if (hasAction('CLEAR_SPEED_EFFECT') || hasAction('SPEED_EFFECT_STOP')) {
        setIsSpeedEffectActive(false);
      }

      if (hasAction('BLACK_DISTORTION') || hasAction('BLACK_DISTORT')) {
        setIsBlackDistortActive(true);
        const timer = setTimeout(() => setIsBlackDistortActive(false), 2000);
        cleanups.push(() => { clearTimeout(timer); setIsBlackDistortActive(false); });
      }

      if (hasAction('FADE_TO_BLACK') || hasAction('SLOW_FADE_TO_BLACK')) {
        setIsFadingBlack(true);
        setIsRedAlertActive(false); // Stop red alert flash when transitioning to black
        setIsMonochromeFlashActive(false);
        const fadeDuration = currentLine.duration || (hasAction('SLOW_FADE_TO_BLACK') ? 3000 : 2000);
        const timer = setTimeout(() => setIsFadingBlack(false), fadeDuration);
        
        let shakeTimer;
        if (hasAction('SLOW_FADE_TO_BLACK')) {
          setShakeEffect('fadeOut');
          shakeTimer = setTimeout(() => {
            setShakeEffect(false);
          }, fadeDuration);
        }

        cleanups.push(() => { clearTimeout(timer); if (shakeTimer) clearTimeout(shakeTimer); setIsFadingBlack(false); if (hasAction('SLOW_FADE_TO_BLACK')) setShakeEffect(false); });
      }

      if (hasAction('WHITE_OUT_START')) {
        setWhiteOutDuration(0.8);
        setIsWhiteOut(true);
        setWhitePulseLevel(0);
        setShakeEffect(false);
      } else if (hasAction('AWAKEN_MICHIRU')) {
        setIsBlackAuraActive(false);
        setIsEnergyAuraActive(true);
        setWhiteOutDuration(0.8);
        setIsWhiteOut(true);
        setWhitePulseLevel(0);
        setShakeEffect(false);
      } else if (hasAction('WHITE_OUT_END')) {
        setWhiteOutDuration(0.8);
        setIsWhiteOut(false);
      } else if (hasAction('WHITE_OUT_END_SLOW')) {
        setWhiteOutDuration(3);
        setIsWhiteOut(false);
      } else if (hasAction('WHITE_OUT_END_VERY_SLOW')) {
        setWhiteOutDuration(6);
        setIsWhiteOut(false);
      } else if (hasAction('GRAY_OUT_START')) {
        setGrayOutDuration(0.1);
        setIsGrayOut(true);
      } else if (hasAction('GRAY_OUT_END_SLOW')) {
        setGrayOutDuration(3);
        setIsGrayOut(false);
      } else if (hasAction('WHITE_PULSE_START')) {
        setWhitePulseLevel(0.2);
      } else if (hasAction('WHITE_PULSE_MID')) {
        setWhitePulseLevel(0.5);
      } else if (hasAction('WHITE_PULSE_HIGH')) {
        setWhitePulseLevel(0.8);
      } else if (hasAction('WHITE_PULSE_STOP')) {
        setWhitePulseLevel(0);
      } else if (hasAction('EXPLOSION_WHITEOUT')) {
        setWhiteOutDuration(0.8);
        setIsWhiteOut(true);
        setShakeEffect('extreme');
        setTimeout(() => {
          setShakeEffect(false);
        }, 800);
      } else if (hasAction('WHITE_FLASH')) {
        setIsWhiteFlashActive(true);
        setTimeout(() => setIsWhiteFlashActive(false), 500);
      } else if (hasAction('WHITE_FLASH_70')) {
        setIsWhiteFlash70Active(true);
        setTimeout(() => setIsWhiteFlash70Active(false), 500);
      } else if (hasAction('WHITE_FLASH_AND_SHAKE')) {
        setIsWhiteFlashActive(true);
        setShakeEffect('extreme');
        setTimeout(() => {
          setIsWhiteFlashActive(false);
          setShakeEffect(false);
        }, 500);
      }

      // Red Alert
      if (hasAction('TRIGGER_PHONE_RED_ALERT')) {
        playSE(assetPath('/assets/audio/se/siren_alert.mp3'));
        setShakeEffect(true);
        const timer = setTimeout(() => setShakeEffect(false), 800);

        setAlertConfig({
          title: '⚠ LUNAR WAVE DETECTED',
          message: currentLine.text
        });
        setAlertActive(true);

        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
        cleanups.push(() => { clearTimeout(timer); setShakeEffect(false); });
      }
      
      if (cleanups.length > 0) {
        return () => cleanups.forEach(c => c());
      }
    } else {
      setFocusSlot(null);
    }`;

code = code.replace(originalBlock, newBlock);

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx successfully updated without corruption!');
