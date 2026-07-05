import React, { useState, useEffect, useRef } from 'react';
import GameFrame from './components/GameFrame';
import SpriteSlot from './components/SpriteSlot';
import DialogueBox from './components/DialogueBox';
import CinemaLayer from './components/CinemaLayer';
import AlertModal from './components/AlertModal';
import DevConsole from './components/DevConsole';
import BacklogOverlay from './components/BacklogOverlay';
import TitleScreen from './components/TitleScreen';
import TypingGame from './components/TypingGame';
import SearchAndLearning from './components/SearchAndLearning';
import SilentScore from './components/SilentScore';
import TapCommunication from './components/TapCommunication';
import EyeOfProfiler from './components/EyeOfProfiler';
import FragmentCollect from './components/FragmentCollect';
import { useNovelEngine } from './hooks/useNovelEngine';
import { useAudioSystem } from './hooks/useAudioSystem';
import { scenarioData } from './data/scenario';

// Custom CSS-based visual representation of game backgrounds when WebP/PNG images are missing
function BackgroundRenderer({ bgPath }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [bgPath]);

  if (!bgPath) return null;

  // Fallback styling based on bg name
  const isClassroom = bgPath.includes('cyber_classroom');
  const isGiantMoon = bgPath.includes('giant_blue_moon');
  const isSchoolGate = bgPath.includes('school_gate_evening');
  const isTownDark1 = bgPath.includes('town_dark_1');
  const isTownDark2 = bgPath.includes('town_dark_2');
  const isRooftop = bgPath.includes('rooftop');

  return (
    <div className="absolute inset-0 w-full h-full select-none z-0">
      {!imageError ? (
        <img
          src={bgPath}
          alt="background"
          className="w-full h-full object-cover transition-all duration-700"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full relative overflow-hidden transition-all duration-700">
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[#030712]" />

          {isTownDark1 && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#080d22] via-[#050816] to-[#020308]">
              {/* Skyline silhouette */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-[#04060c] clip-path-skyline border-t border-cyan-500/20 shadow-[0_-10px_30px_rgba(0,245,255,0.05)]" />
              {/* Stars / Window lights */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(rgba(0,245,255,0.15)_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-[30%] left-[20%] w-20 h-20 rounded-full bg-cyan-950/20 blur-2xl" />
            </div>
          )}

          {isTownDark2 && (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020308] via-[#050711] to-[#0b071a]">
              {/* Alleyway perspective lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10 stroke-cyan-400" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="1080" x2="800" y2="540" strokeWidth="2" />
                <line x1="1920" y1="1080" x2="1120" y2="540" strokeWidth="2" />
                <line x1="0" y1="900" x2="1920" y2="900" strokeWidth="1" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>
          )}

          {isGiantMoon && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#02040b] via-[#040714] to-[#010205] flex items-center justify-center">
              {/* Massive artificial cyan moon */}
              <div className="relative w-80 h-80 rounded-full bg-cyan-400/10 border-4 border-cyan-300/40 shadow-[0_0_100px_rgba(0,245,255,0.4),inset_0_0_40px_rgba(0,245,255,0.2)] animate-pulse">
                {/* Tech lines inside the artificial moon */}
                <div className="absolute inset-4 rounded-full border border-cyan-400/20 border-dashed" />
                <div className="absolute inset-12 rounded-full border border-cyan-400/15" />
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-300/30" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cyan-300/30" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,245,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
            </div>
          )}

          {isClassroom && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#05070f] to-[#020408] flex items-center justify-center">
              {/* Perspective grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.03)_1px,transparent_1px)] [background-size:40px_40px]" />
              {/* Cyber blackboard glow */}
              <div className="absolute top-[10%] w-[60%] h-[30%] bg-cyan-950/20 border border-cyan-500/20 rounded-md shadow-[0_0_30px_rgba(0,245,255,0.05)] flex flex-col justify-center items-center">
                <span className="text-cyan-500/40 font-orbitron text-xs tracking-[0.4em] mb-1">LECTURE HALL 07</span>
                <span className="text-cyan-500/20 font-orbitron text-[10px]">WAVE RESONANCE RATIO: OPTIMAL</span>
              </div>
            </div>
          )}

          {isSchoolGate && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#1b0826] via-[#10061e] to-[#04020a]">
              {/* Sunset orange horizon glow */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#ff0055]/10 via-transparent to-transparent opacity-60" />
              {/* Stars */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffe49e_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
              <div className="absolute bottom-0 left-12 w-32 h-64 border-l-2 border-r-2 border-t-2 border-white/5 rounded-t-lg bg-white/2" />
            </div>
          )}

          {isRooftop && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#010206] via-[#050818] to-[#03040c]">
              {/* Distant skyline with two moons */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#020306] border-t border-cyan-500/10" />
              {/* Handrails */}
              <div className="absolute bottom-0 left-0 right-0 h-24 border-t-2 border-cyan-500/10 flex justify-around">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-[2px] h-full bg-cyan-500/10" />
                ))}
              </div>
              {/* Giant Artificial Moon (Cyan) */}
              <div className="absolute top-[10%] left-[25%] w-40 h-40 rounded-full bg-cyan-400/5 border-2 border-cyan-400/20 shadow-[0_0_60px_rgba(0,245,255,0.2)]" />
              {/* Faint Real Moon (Gold) */}
              <div className="absolute top-[8%] right-[25%] w-24 h-24 rounded-full bg-[#ffe49e]/5 border border-[#ffe49e]/20 shadow-[0_0_40px_rgba(255,228,158,0.15)] animate-pulse" />
            </div>
          )}

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const {
    currentStep,
    currentLine,
    displayedText,
    isTyping,
    isWaitingForChoice,
    backlog,
    autoMode,
    hudVisible,
    currentBg,
    nextStep,
    selectChoice,
    jumpToStep,
    toggleAuto,
    toggleHud,
    setHudVisible,
    clearBacklog,
    totalSteps,
  } = useNovelEngine(scenarioData);

  const { playBGM, playSE, toggleMute } = useAudioSystem();

  const [showTitle, setShowTitle] = useState(true);
  const [hasSave, setHasSave] = useState(false);
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '' });
  const [shakeEffect, setShakeEffect] = useState(false);

  // Check if save data exists
  useEffect(() => {
    const savedStep = localStorage.getItem('twomoons_save_step');
    setHasSave(savedStep !== null);
  }, []);

  // Auto-save progress
  useEffect(() => {
    if (!showTitle && currentStep !== null && currentStep !== undefined) {
      localStorage.setItem('twomoons_save_step', currentStep.toString());
      setHasSave(true);
    }
  }, [currentStep, showTitle]);

  const handleStartGame = () => {
    clearBacklog();
    setShowTitle(false);
    jumpToStep(0);
  };

  const handleContinueGame = () => {
    const savedStep = localStorage.getItem('twomoons_save_step');
    if (savedStep !== null) {
      const stepIdx = parseInt(savedStep, 10);
      jumpToStep(stepIdx);
      setShowTitle(false);
    }
  };

  // Play title music
  useEffect(() => {
    if (showTitle) {
      playBGM('/assets/audio/bgm/deep_blue_moon.mp3');
    }
  }, [showTitle, playBGM]);

  // Character sprite visibility states
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [focusSlot, setFocusSlot] = useState(null);
  const [prevScene, setPrevScene] = useState('');
  const [presentCharacters, setPresentCharacters] = useState([]);
  const [displayedItem, setDisplayedItem] = useState(null);

  // Minigame result states
  const [learningScore, setLearningScore] = useState(0);
  const [eyeOfProfilerSuccess, setEyeOfProfilerSuccess] = useState(false);
  const [tapCommunicationScores, setTapCommunicationScores] = useState(null);
  const [silentScoreResult, setSilentScoreResult] = useState(null);
  const [fragmentCollectResult, setFragmentCollectResult] = useState(null);

  // Swipe gesture variables
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTap = useRef(0);

  // Clear sprites on scene change
  useEffect(() => {
    if (currentLine?.scene && currentLine.scene !== prevScene) {
      setPrevScene(currentLine.scene);
      setLeftActive(false);
      setRightActive(false);
      setFocusSlot(null);
      setPresentCharacters([]); // シーン切り替え時に画面内の登場キャラをリセット
      setDisplayedItem(null);
    }
  }, [currentLine?.scene, prevScene]);

  // Track present items
  useEffect(() => {
    if (!currentLine || showTitle) return;

    if (currentLine.hideItem || currentLine.clearItem) {
      setDisplayedItem(null);
    }

    if (currentLine.showItem) {
      setDisplayedItem(currentLine.showItem);
    }
  }, [currentLine, showTitle]);

  // Track present characters (including manual triggers)
  useEffect(() => {
    if (!currentLine || showTitle) return;

    // 1. Force Clear all illustrations
    if (currentLine.clearIllust) {
      setPresentCharacters([]);
      return;
    }

    let nextList = [...presentCharacters];
    let listChanged = false;

    // 2. Force Hide specific illustrations
    if (Array.isArray(currentLine.hideIllust)) {
      currentLine.hideIllust.forEach(char => {
        const baseName = char.split('_')[0];
        const initialLen = nextList.length;
        // 表情名が付いていても、ベース名が一致するキャラを全て削除
        nextList = nextList.filter(c => c.split('_')[0] !== baseName);
        if (nextList.length !== initialLen) {
          listChanged = true;
        }
      });
    }

    // 3. Force Show specific illustrations
    if (Array.isArray(currentLine.showIllust)) {
      currentLine.showIllust.forEach(char => {
        const baseName = char.split('_')[0];
        // 同じベース名を持つキャラクターが既にリストにいれば、それを新しい表情に置き換える
        const existingIndex = nextList.findIndex(c => c.split('_')[0] === baseName);
        if (existingIndex !== -1) {
          if (nextList[existingIndex] !== char) {
            nextList[existingIndex] = char;
            listChanged = true;
          }
        } else {
          nextList.push(char);
          listChanged = true;
        }
      });
    }

    // 4. Default Auto-show fallback when no manual action is specified for this speaker
    const speaker = currentLine.speaker;
    const targetSpeakers = ["睦典", "ミカ", "凪砂", "大男", "アカネ", "ヒルミ教授", "満", "黒騎士", "ルキ", "朔良"];
    const isTransmission = currentLine?.text?.trim().startsWith('『');
    if (speaker && targetSpeakers.includes(speaker) && !isTransmission) {
      const isManuallyHidden = Array.isArray(currentLine.hideIllust) && currentLine.hideIllust.some(c => c.split('_')[0] === speaker);
      const isNightMutsunoriException = currentLine.scene === "夜の帰り道" && speaker === "睦典";

      // 既にそのキャラクター（どの表情であっても）が表示リストに含まれていない場合のみ自動追加
      const isAlreadyPresent = nextList.some(c => c.split('_')[0] === speaker);
      if (!isManuallyHidden && !isNightMutsunoriException && !isAlreadyPresent) {
        nextList.push(speaker);
        listChanged = true;
      }
    }

    // 5. Apply `currentLine.illust` to update expression and persist it
    if (currentLine.illust) {
      const parts = currentLine.illust.split('_');
      if (parts.length === 2) {
        const engBase = parts[0];
        const exp = parts[1];

        // Map English to Japanese base names
        const engToJp = {
          "Mutsunori": "睦典",
          "Hirumi": "ヒルミ教授",
          "Mika": "ミカ",
          "Nagisa": "凪砂",
          "Akane": "大男",
          "Michiru": "満"
        };
        const jpBase = engToJp[engBase];

        if (jpBase) {
          const newCharStr = `${jpBase}_${exp}`;
          const existingIndex = nextList.findIndex(c => c.split('_')[0] === jpBase);

          if (existingIndex !== -1) {
            if (nextList[existingIndex] !== newCharStr) {
              nextList[existingIndex] = newCharStr;
              listChanged = true;
            }
          } else {
            nextList.push(newCharStr);
            listChanged = true;
          }
        }
      }
    }

    if (listChanged) {
      setPresentCharacters(nextList);
    }
  }, [currentLine, showTitle, presentCharacters]);

  // Audio system and sprite positioning logic based on active step details
  useEffect(() => {
    if (!currentLine || showTitle) return;

    // Background music changes based on scenes
    if (currentLine.scene === 'PROLOGUE') {
      playBGM('/assets/audio/bgm/deep_blue_moon.mp3');
    } else if (currentLine.scene === '講義室出口' || currentLine.scene === '大学の廊下') {
      playBGM('/assets/audio/bgm/mutsu_theme.mp3');
    } else if (currentLine.scene === '月科学大講義室') {
      playBGM('/assets/audio/bgm/classroom_ambient.mp3');
    }

    const action = currentLine.action;
    if (action) {
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
        playSE('/assets/audio/se/school_chime.mp3');
      } else if (action === 'PLAY_RUNNING_SE') {
        playSE('/assets/audio/se/running.mp3');
      } else if (action === 'PLAY_FOOTSTEP_SE') {
        playSE('/assets/audio/se/footsteps.mp3');
      }

      // Shake Screen
      if (action === 'SHAKE_SCREEN') {
        setShakeEffect(true);
        const timer = setTimeout(() => setShakeEffect(false), 600);
        return () => clearTimeout(timer);
      } else if (action === 'SHAKE_SCREEN_VERY_LARGE') {
        setShakeEffect('large');
        const timer = setTimeout(() => setShakeEffect(false), 800);
        return () => clearTimeout(timer);
      }

      // Red Alert
      if (action === 'TRIGGER_PHONE_RED_ALERT') {
        playSE('/assets/audio/se/siren_alert.mp3');
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
        return () => clearTimeout(timer);
      }
    } else {
      setFocusSlot(null);
    }
  }, [currentStep, currentLine, playBGM, playSE]);

  // Cinema Mode Autoplay timers
  useEffect(() => {
    if (!currentLine || showTitle) return;
    if (currentLine.style === 'cinema') {
      let delay = 3000;
      if (currentLine.action === 'FADE_IN') delay = 2500;
      if (currentLine.action === 'FADE_OUT') delay = 2000;
      if (currentLine.action === 'WAIT_SECONDS') delay = 2000;
      if (currentLine.action === 'SLOW_FADE_IN') delay = 3500;
      if (currentLine.action === 'WAIT_SECONDS_AND_MOVE_MOON') delay = 4000;
      if (currentLine.action === 'ALL_FADE_OUT') delay = 3000;

      const timer = setTimeout(() => {
        nextStep();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentStep, currentLine, nextStep, showTitle]);

  // Handle conditional branching and special actions
  useEffect(() => {
    if (!currentLine) return;
    
    if (currentLine.action === 'EVALUATE_FRAGMENT_COLLECT_BRANCH') {
      if (fragmentCollectResult && fragmentCollectResult.files >= 4) {
        const targetIdx = scenarioData.findIndex(line => line.label === 'happy_end_start');
        if (targetIdx !== -1) jumpToStep(targetIdx);
      } else {
        const targetIdx = scenarioData.findIndex(line => line.label === 'bad_end_start');
        if (targetIdx !== -1) {
          jumpToStep(targetIdx);
        } else {
          setShowTitle(true);
          jumpToStep(0);
        }
      }
    } else if (currentLine.action === 'GAME_OVER') {
      // Return to title
      setShowTitle(true);
      jumpToStep(0);
    }
  }, [currentStep, currentLine, jumpToStep, fragmentCollectResult]);

  // Handle touch events for gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (showTitle) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
          toggleAuto();
        }
      } else {
        if (diffY < -50) {
          setBacklogOpen(true);
        } else if (diffY > 50) {
          toggleHud();
        }
      }
    } else {
      const now = Date.now();
      if (now - lastTap.current < 250) {
        toggleAuto();
      } else {
        if (!isWaitingForChoice && !alertActive && !backlogOpen) {
          nextStep();
        }
      }
      lastTap.current = now;
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showTitle || alertActive) return;

      // Handle backlog closing via keyboard
      if (backlogOpen) {
        if (e.key === 'Escape') {
          setBacklogOpen(false);
          e.preventDefault();
        }
        return;
      }

      // If HUD is hidden, any key press will restore it
      if (!hudVisible) {
        setHudVisible(true);
        e.preventDefault();
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        const isMinigameActive = [
          'TRIGGER_TYPING_GAME',
          'TRIGGER_SEARCH_AND_LEARNING',
          'TRIGGER_SILENT_SCORE',
          'TRIGGER_TAP_COMMUNICATION',
          'TRIGGER_EYE_OF_PROFILER',
          'TRIGGER_FRAGMENT_COLLECT'
        ].includes(currentLine?.action);

        if (!isWaitingForChoice && !isMinigameActive) {
          nextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, toggleHud, toggleAuto, isWaitingForChoice, backlogOpen, alertActive, hudVisible, setHudVisible, currentLine]);

  const handleDismissAlert = () => {
    setAlertActive(false);
    nextStep();
  };

  const isCinema = currentLine?.style === 'cinema';
  const isDemoEnd = currentLine?.action === 'FADE_TO_DEMO_END';
  const isTypingGameActive = currentLine?.action === 'TRIGGER_TYPING_GAME';
  const isSearchAndLearningActive = currentLine?.action === 'TRIGGER_SEARCH_AND_LEARNING';
  const isSilentScoreActive = currentLine?.action === 'TRIGGER_SILENT_SCORE';
  const isTapCommunicationActive = currentLine?.action === 'TRIGGER_TAP_COMMUNICATION';
  const isEyeOfProfilerActive = currentLine?.action === 'TRIGGER_EYE_OF_PROFILER';
  const isFragmentCollectActive = currentLine?.action === 'TRIGGER_FRAGMENT_COLLECT';

  const handleEyeOfProfilerComplete = (success) => {
    setEyeOfProfilerSuccess(success);
    nextStep();
  };

  const handleFragmentCollectComplete = (result) => {
    setFragmentCollectResult(result);
    nextStep();
  };

  const handleTapCommunicationComplete = (scores) => {
    setTapCommunicationScores(scores);
    nextStep();
  };

  const handleSearchAndLearningComplete = (score) => {
    setLearningScore(score);
    nextStep();
  };

  const handleSilentScoreComplete = (scoreData) => {
    setSilentScoreResult(scoreData);
    nextStep();
  };

  const handleTypingGameComplete = (success) => {
    if (success) {
      // 成功ルートにジャンプ
      const targetIdx = scenarioData.findIndex(line => line.label === 'typing_success_start');
      if (targetIdx !== -1) {
        jumpToStep(targetIdx);
      } else {
        nextStep();
      }
    } else {
      // 失敗ルートにジャンプ
      const targetIdx = scenarioData.findIndex(line => line.label === 'typing_fail_start');
      if (targetIdx !== -1) {
        jumpToStep(targetIdx);
      } else {
        nextStep();
      }
    }
  };

  const filteredChoices = currentLine?.choices?.filter(choice => {
    if (choice.condition === 'learning_max') {
      return learningScore === 3;
    }
    return true;
  }) || [];

  return (
    <div
      className="w-full h-full select-none touch-none cursor-pointer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        if (!showTitle && !isWaitingForChoice && !alertActive && !backlogOpen && !isTypingGameActive && !isSearchAndLearningActive && !isSilentScoreActive && !isTapCommunicationActive && !isEyeOfProfilerActive && !isFragmentCollectActive) {
          nextStep();
        }
      }}
    >
      <GameFrame shakeEffect={shakeEffect}>
        {showTitle ? (
          <TitleScreen
            onStart={handleStartGame}
            onContinue={handleContinueGame}
            hasSave={hasSave}
            playBGM={playBGM}
          />
        ) : (
          <>
            {/* Visual Background Fallback & Actual Renderer */}
            <BackgroundRenderer bgPath={currentBg} />

            {/* Typing Game Overlay */}
            {isTypingGameActive && (
              <TypingGame onComplete={handleTypingGameComplete} />
            )}

            {/* Search & Learning Overlay */}
            {isSearchAndLearningActive && (
              <SearchAndLearning onComplete={handleSearchAndLearningComplete} />
            )}

            {/* Tap Communication Overlay */}
            {isTapCommunicationActive && (
              <TapCommunication onComplete={handleTapCommunicationComplete} />
            )}

            {/* Eye Of Profiler Overlay */}
            {isEyeOfProfilerActive && (
              <EyeOfProfiler onComplete={handleEyeOfProfilerComplete} />
            )}

            {/* Fragment Collect Overlay */}
            {isFragmentCollectActive && (
              <FragmentCollect onComplete={handleFragmentCollectComplete} />
            )}

            {/* Silent Score Overlay */}
            {isSilentScoreActive && (
              <SilentScore onComplete={handleSilentScoreComplete} />
            )}

            {/* Cinematic Black Letterbox Overlay */}
            <CinemaLayer
              text={currentLine?.text}
              isActive={isCinema && !isDemoEnd && !isTypingGameActive && !isSearchAndLearningActive && !isSilentScoreActive && !isTapCommunicationActive && !isEyeOfProfilerActive && !isFragmentCollectActive}
              isTyping={isTyping}
              onNext={nextStep}
            />

            {/* Character Sprite Overlay */}
            {!isCinema && !isDemoEnd && (
              <SpriteSlot
                leftActive={leftActive}
                rightActive={rightActive}
                focusSlot={focusSlot}
                currentSpeaker={currentLine?.speaker}
                presentCharacters={presentCharacters}
                currentLine={currentLine}
                currentStep={currentStep}
                scenarioData={scenarioData}
              />
            )}

            {/* Item Sprite Overlay */}
            {displayedItem && !isCinema && !isDemoEnd && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[15]">
                <img
                  src={displayedItem}
                  alt="item"
                  className="max-w-[40%] max-h-[60%] object-contain drop-shadow-2xl animate-fadeIn"
                />
              </div>
            )}

            {/* Subtitles & Normal Dialogue Boxes */}
            {!isCinema && !isDemoEnd && !alertActive && !isSearchAndLearningActive && !isSilentScoreActive && !isTapCommunicationActive && !isEyeOfProfilerActive && !isTypingGameActive && !isFragmentCollectActive && (
              <DialogueBox
                speaker={currentLine?.speaker}
                role={currentLine?.role}
                text={displayedText}
                fullText={currentLine?.text}
                isTyping={isTyping}
                isVisible={hudVisible}
                autoMode={autoMode}
                onNext={nextStep}
                onToggleAuto={toggleAuto}
                onToggleHud={toggleHud}
                onOpenLog={() => setBacklogOpen(true)}
                choices={filteredChoices}
                isWaitingForChoice={isWaitingForChoice}
                onSelectChoice={selectChoice}
                onExit={() => {
                  setShowTitle(true);
                }}
              />
            )}

            {/* HUD hidden overlay to restore HUD on click */}
            {!hudVisible && !isCinema && !isDemoEnd && (
              <div
                className="absolute inset-0 z-20 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setHudVisible(true);
                }}
              />
            )}

            {/* Warnings & Wave Anomaly Popups */}
            <AlertModal
              isActive={alertActive}
              title={alertConfig.title}
              message={alertConfig.message}
              onDismiss={handleDismissAlert}
            />

            {/* Demo End Screen */}
            {isDemoEnd && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-8 text-center animate-fadeIn">
                {/* Holographic background moon */}
                <div className="absolute w-[60vh] h-[60vh] rounded-full border border-cyan-500/10 shadow-[0_0_120px_rgba(0,245,255,0.05)] pointer-events-none" />

                <h1 className="text-4xl md:text-5xl font-orbitron font-extrabold text-cyan-400 tracking-[0.2em] mb-4 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                  TO BE CONTINUED
                </h1>
                <p className="text-gray-400 font-noto tracking-widest text-sm md:text-base mb-12">
                  青い月の裏側で - Behind the Blue Moon Demo
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      clearBacklog();
                      jumpToStep(0);
                    }}
                    className="px-8 py-3 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-orbitron text-sm tracking-widest rounded
                               hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]
                               transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    REPLAY DEMO
                  </button>
                  <button
                    onClick={() => {
                      setShowTitle(true);
                    }}
                    className="px-8 py-3 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-orbitron text-sm tracking-widest rounded
                               hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                               transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    RETURN TO TITLE
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Backlog overlay */}
        <BacklogOverlay
          isOpen={backlogOpen}
          onClose={() => setBacklogOpen(false)}
          backlog={backlog}
        />

        {/* Debug Console */}
        <DevConsole
          currentStep={currentStep}
          totalSteps={totalSteps}
          onJumpToStep={jumpToStep}
          onToggleMute={toggleMute}
          scenarioData={scenarioData}
        />


      </GameFrame>
    </div>
  );
}
