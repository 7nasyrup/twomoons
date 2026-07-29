import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameFrame from './components/GameFrame';
import ShakeLayer from './components/ShakeLayer';
import SpriteSlot from './components/SpriteSlot';
import DialogueBox from './components/DialogueBox';
import CinemaLayer from './components/CinemaLayer';
import AlertModal from './components/AlertModal';
import ConfirmModal from './components/ConfirmModal';
import DevConsole from './components/DevConsole';
import BacklogOverlay from './components/BacklogOverlay';
import TitleScreen from './components/TitleScreen';
import TypingGame from './components/TypingGame';
import SearchAndLearning from './components/SearchAndLearning';
import SilentScore from './components/SilentScore';
import TapCommunication from './components/TapCommunication';
import EyeOfProfiler from './components/EyeOfProfiler';
import FragmentCollect from './components/FragmentCollect';
import FragmentCollectNagisa from './components/FragmentCollectNagisa';
import FragmentCollectMika from './components/FragmentCollectMika';
import FragmentCollectAkane from './components/FragmentCollectAkane';
import FragmentCollectSolo from './components/FragmentCollectSolo';
import PortraitWarningOverlay from './components/PortraitWarningOverlay';
import StealthGame from './components/StealthGame';
import SaveSlotModal, { SAVE_KEY_PREFIX, loadAllSlots } from './components/SaveSlotModal';
import InstallPrompt from './components/InstallPrompt';
import { useNovelEngine } from './hooks/useNovelEngine';
import { useAudioSystem } from './hooks/useAudioSystem';
import { scenarioData } from './data/scenario';
import { assetPath } from './utils/assetPath';

// Custom CSS-based visual representation of game backgrounds when WebP/PNG images are missing
function BackgroundRenderer({ bgPath, bgAnimationClass }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [bgPath]);

  if (!bgPath) return null;
  if (bgPath === 'black') {
    return <div className={`w-full h-full bg-black ${bgAnimationClass || ''}`} />;
  }

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
          src={assetPath(bgPath)}
          alt="background"
          className={`w-full h-full object-cover transition-all duration-700 ${bgAnimationClass || ''}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className={`w-full h-full relative overflow-hidden transition-all duration-700 ${bgAnimationClass || ''}`}>
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
        </div>
      )}

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
    </div>
  );
}

// Special Cut-in Overlay for Mutsunori's wound healing scene
function MutsunoriHealingCutIn() {
  return (
    <motion.div
      className="absolute top-[8%] left-[5%] right-[5%] h-[48%] z-[22] flex overflow-hidden border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-slate-950 rounded-lg"
      initial={{ opacity: 0, x: -150, skewX: -10 }}
      animate={{ opacity: 1, x: 0, skewX: 0 }}
      exit={{ opacity: 0, x: 150, skewX: 10 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left side: Mutsunori's body zoomed in */}
      <div className="relative w-[50%] h-full overflow-hidden bg-[#070b19] flex justify-center items-center">
        {/* Sci-fi backdrop grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-[30%] left-[25%] w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        
        {/* Torso zoom of Mutsunori */}
        <img
          src={assetPath('/character/Mutsunori/Mutsunori_smile.png')}
          alt="Mutsunori Torso Zoom"
          className="absolute max-w-none w-[260%] h-[260%] object-contain object-top"
          style={{
            transform: 'translate(4%, -15%)', // Position to zoom on Mutsunori's chest/torso
          }}
        />

        {/* Healing wound scar overlay: starts red and fades into cyan and heals */}
        <motion.div
          className="absolute w-[6px] h-[30%] bg-gradient-to-b from-red-500 via-cyan-400 to-transparent blur-[1.5px] rotate-[28deg] rounded-full"
          style={{ top: '40%', left: '48%' }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            scaleY: [0, 1, 0.4, 0],
            filter: ['drop-shadow(0 0 12px #ff0055)', 'drop-shadow(0 0 8px #ff0055)', 'drop-shadow(0 0 4px #00f5ff)', 'drop-shadow(0 0 0px transparent)']
          }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        />
        
        {/* Biotech scan overlay lines */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
      </div>

      {/* Right side: White diagonal cropped panel */}
      <div
        className="w-[60%] h-full bg-white relative flex flex-col justify-center pl-16 pr-8 text-slate-900 select-none"
        style={{
          marginLeft: '-10%',
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)'
        }}
      >
        {/* Diagonal tech scanner line */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-[4px] bg-cyan-500/60 blur-[2px] pointer-events-none"
          animate={{ x: ['12vw', '35vw'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10">
          <div className="font-orbitron font-extrabold text-[13px] tracking-[0.25em] text-cyan-600 mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            MUTSUNORI STATUS: RECOVERY
          </div>
          <h2 className="font-noto font-bold text-lg text-slate-800 tracking-wider mb-2">
            細胞超高速自己修復プロセス
          </h2>
          
          <div className="font-noto text-[11px] leading-relaxed text-slate-500 font-light space-y-1">
            <div>対象生体データ: <span className="font-semibold text-slate-700">MUTSUNORI (自我限界値到達)</span></div>
            <div>ダメージ箇所: <span className="font-semibold text-red-600">胸部・大剣による致命的裂傷</span></div>
            <div>修復状態: <span className="font-semibold text-emerald-600 font-orbitron animate-pulse">RECONSTRUCTING... 99.8%</span></div>
            <div className="pt-1 border-t border-slate-200 mt-2 text-[10px] font-mono text-cyan-700">
              {"[SYSTEM_LOG]: REVERSE ENERGY FLOODING -> HEALING COMPLETE"}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Special Light Wave Burst Overlay for Sakura's healing/purifying light scene
function LightWaveBurstOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[18] overflow-hidden mix-blend-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Warm Golden ambient glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.4, 0.8, 0.5],
          background: [
            'radial-gradient(circle at 50% 60%, rgba(253, 224, 71, 0.3) 0%, rgba(251, 146, 60, 0.1) 60%, transparent 100%)',
            'radial-gradient(circle at 50% 60%, rgba(253, 224, 71, 0.5) 0%, rgba(251, 146, 60, 0.2) 65%, transparent 100%)',
            'radial-gradient(circle at 50% 60%, rgba(253, 224, 71, 0.3) 0%, rgba(251, 146, 60, 0.1) 60%, transparent 100%)',
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Expanding Ripple Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute rounded-full border-4 border-amber-300/60 shadow-[0_0_40px_rgba(253,224,71,0.5),inset_0_0_20px_rgba(253,224,71,0.3)]"
          style={{
            left: '50%',
            top: '60%',
            width: '100px',
            height: '100px',
            marginLeft: '-50px',
            marginTop: '-50px',
          }}
          animate={{
            scale: [0.5, 12],
            opacity: [0.8, 0.4, 0],
            borderWidth: ['8px', '1px'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.0,
          }}
        />
      ))}

      {/* Dazzling light rays/shards */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute w-[4px] h-[30%] bg-gradient-to-b from-yellow-100 via-amber-300/40 to-transparent blur-[1px] origin-bottom"
          style={{
            left: '50%',
            top: '30%',
            transform: `rotate(${i * 60}deg) translateY(-50%)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating golden/white particles */}
      {[...Array(25)].map((_, i) => {
        const size = Math.random() * 8 + 4;
        const delay = Math.random() * 3;
        const duration = Math.random() * 2 + 2;
        return (
          <motion.div
            key={`gold-part-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: 'radial-gradient(circle, #ffffff 0%, #fde047 80%)',
              boxShadow: '0 0 10px #f59e0b, 0 0 20px #f59e0b',
              left: `${15 + Math.random() * 70}%`,
              top: '90%',
            }}
            animate={{
              y: ['0vh', '-110vh'],
              x: [0, (Math.random() - 0.5) * 80],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.3, 0.5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeOut",
              delay,
            }}
          />
        );
      })}
    </motion.div>
  );
}

export default function App() {
  const [manualTestMode, setManualTestMode] = useState(false);
  const [clearedMutsunori, setClearedMutsunori] = useState(() => localStorage.getItem('cleared_mutsunori_good_end') === 'true');
  const [clearedMika, setClearedMika] = useState(() => localStorage.getItem('cleared_mika_good_end') === 'true');
  const [clearedNagisa, setClearedNagisa] = useState(() => localStorage.getItem('cleared_nagisa_good_end') === 'true');
  const [clearedAkane, setClearedAkane] = useState(() => localStorage.getItem('cleared_akane_good_end') === 'true');

  const [endType, setEndType] = useState(null); // 'happy' | 'bad' | null
  const isEndScreen = endType !== null;

  const {
    currentStep,
    currentLine,
    displayedText,
    isTyping,
    isWaitingForChoice,
    backlog,
    autoMode,
    skipMode,
    hudVisible,
    currentBg,
    isBgTransitioning,
    isBgFadingOut,
    nextStep,
    prevStep,
    selectChoice,
    jumpToStep,
    toggleAuto,
    toggleSkip,
    setSkipMode,
    toggleHud,
    setHudVisible,
    clearBacklog,
    totalSteps,
  } = useNovelEngine(scenarioData, { manualTestMode, endMode: isEndScreen });

  const { playBGM, stopBGM, playSE, stopSE, toggleMute, pauseBGM, resumeBGM } = useAudioSystem();
  const lastSceneRef = useRef(null);
  const bgmOverrideRef = useRef(false);

  const [showTitle, setShowTitle] = useState(true);
  const [hasSave, setHasSave] = useState(false);
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [alertActive, setAlertActive] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '' });
  const [isFadingBlack, setIsFadingBlack] = useState(false);
  const [isWhiteOut, setIsWhiteOut] = useState(false);
  const [whiteOutDuration, setWhiteOutDuration] = useState(0.8);
  const [isGrayOut, setIsGrayOut] = useState(false);
  const [grayOutDuration, setGrayOutDuration] = useState(0.8);
  const [whitePulseLevel, setWhitePulseLevel] = useState(0);
  const [isWhiteFlashActive, setIsWhiteFlashActive] = useState(false);
  const [isWhiteFlash70Active, setIsWhiteFlash70Active] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);
  const [isSmokeActive, setIsSmokeActive] = useState(false);
  const [isBlackDistortActive, setIsBlackDistortActive] = useState(false);
  const [isBloodActive, setIsBloodActive] = useState(false);
  const [isRedAlertActive, setIsRedAlertActive] = useState(false);
  const [isMonochromeFlashActive, setIsMonochromeFlashActive] = useState(false);
  const [isEnergyAuraActive, setIsEnergyAuraActive] = useState(false);
  const [isDarkEnergyActive, setIsDarkEnergyActive] = useState(false);
  const [isEyesClosed, setIsEyesClosed] = useState(false);
  const [isBlackAuraActive, setIsBlackAuraActive] = useState(false);
  const [isLightWaveActive, setIsLightWaveActive] = useState(false);
  const [isTearBlurActive, setIsTearBlurActive] = useState(false);
  const [isSpeedEffectActive, setIsSpeedEffectActive] = useState(false);
  const [stealthGameResult, setStealthGameResult] = useState(null);

  const [saveToast, setSaveToast] = useState(null); // 'saved' | 'loaded' | null
  // セーブスロットモーダル
  const [slotModalMode, setSlotModalMode] = useState(null); // 'save' | 'load' | null
  const [slotModalSlots, setSlotModalSlots] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isActive: false, title: '', message: '', onConfirm: null, onCancel: null });

  // セーブデータが1件以上あるかチェック
  useEffect(() => {
    const slots = loadAllSlots();
    setHasSave(slots.some(s => s !== null));
  }, []);

  // Request fullscreen on mobile to hide browser address bar using native events (bypasses React synthetic event limitations)
  useEffect(() => {
    const handleNativeTouchOrClick = () => {
      const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      const isMobileSize = window.innerWidth < 1024;
      if (!isTouchDevice || !isMobileSize) return;

      const el = document.documentElement;
      const requestFS = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (requestFS && !document.fullscreenElement && !document.webkitFullscreenElement) {
        requestFS.call(el).catch((err) => {
          console.warn("Fullscreen API failed:", err);
        });
      }
    };

    // Attach native event listeners to document
    document.addEventListener('touchstart', handleNativeTouchOrClick, { passive: true });
    document.addEventListener('click', handleNativeTouchOrClick, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleNativeTouchOrClick);
      document.removeEventListener('click', handleNativeTouchOrClick);
    };
  }, []);

  const handleStartGame = () => {
    clearBacklog();
    setShowTitle(false);
    setFlags({});
    jumpToStep(0);
  };

  const handleExitToTitle = () => {
    setConfirmModal({
      isActive: true,
      title: 'EXIT TO TITLE',
      message: 'タイトル画面に戻りますか？\n（セーブされていない進行状況は失われます）',
      onConfirm: () => {
        setConfirmModal(prev => ({ ...prev, isActive: false }));
        setShowTitle(true);
      },
      onCancel: () => {
        setConfirmModal(prev => ({ ...prev, isActive: false }));
      }
    });
  };

  // タイトルの CONTINUE → ロードモーダルを開く
  const handleOpenLoadFromTitle = () => {
    const slots = loadAllSlots();
    setSlotModalSlots(slots);
    setSlotModalMode('load');
  };

  // ─── セーブモーダルを開く ──────────────────────────────────────────────────
  const handleSave = () => {
    if (showTitle || currentStep === null || currentStep === undefined) return;
    const slots = loadAllSlots();
    setSlotModalSlots(slots);
    setSlotModalMode('save');
  };

  // ─── ロードモーダルを開く（ゲーム中） ─────────────────────────────────────
  const handleLoad = () => {
    const slots = loadAllSlots();
    setSlotModalSlots(slots);
    setSlotModalMode('load');
  };

  // ─── スロット選択ハンドラ ──────────────────────────────────────────────────
  const handleSelectSlot = (slotIndex, slotData) => {
    if (slotModalMode === 'save') {
      // セーブ実行
      const sceneName = currentLine?.scene || '';
      const saveData = {
        step: currentStep,
        sceneName,
        savedAt: new Date().toISOString(),
        bgPath: currentBg || '',
        currentText: currentLine?.text || '',
        currentSpeaker: currentLine?.speaker || '',
        presentCharacters: [...presentCharacters],
        displayedItem: displayedItem || null,
        fragmentCollectResult,
        learningScore,
        eyeOfProfilerSuccess,
        tapCommunicationScores,
        silentScoreResult,
        flags,
      };
      localStorage.setItem(`${SAVE_KEY_PREFIX}${slotIndex}`, JSON.stringify(saveData));
      setHasSave(true);
      setSlotModalMode(null);
      setSaveToast('saved');
      setTimeout(() => setSaveToast(null), 2000);
    } else if (slotModalMode === 'load') {
      // ロード実行
      if (!slotData) return;
      setConfirmModal({
        isActive: true,
        title: 'LOAD SAVE DATA',
        message: showTitle ? 'このデータをロードしますか？' : 'このデータをロードしますか？\n（セーブされていない進行状況は失われます）',
        onConfirm: () => {
          setConfirmModal(prev => ({ ...prev, isActive: false }));
          if (slotData.fragmentCollectResult !== undefined) setFragmentCollectResult(slotData.fragmentCollectResult);
          if (slotData.learningScore !== undefined) setLearningScore(slotData.learningScore);
          if (slotData.eyeOfProfilerSuccess !== undefined) setEyeOfProfilerSuccess(slotData.eyeOfProfilerSuccess);
          if (slotData.tapCommunicationScores !== undefined) setTapCommunicationScores(slotData.tapCommunicationScores);
          if (slotData.silentScoreResult !== undefined) setSilentScoreResult(slotData.silentScoreResult);
          if (slotData.flags !== undefined) setFlags(slotData.flags);
          jumpToStep(slotData.step);
          setShowTitle(false);
          setSlotModalMode(null);
          setSaveToast('loaded');
          setTimeout(() => setSaveToast(null), 2000);
        },
        onCancel: () => {
          setConfirmModal(prev => ({ ...prev, isActive: false }));
        }
      });
    }
  };

  // Play title music
  useEffect(() => {
    if (showTitle) {
      playBGM(assetPath('/assets/audio/bgm/deep_blue_moon.mp3'));
    }
  }, [showTitle, playBGM]);

  const [isPhoneCallRight, setIsPhoneCallRight] = useState(false);

  const [visualLine, setVisualLine] = useState(null);
  const [visualStep, setVisualStep] = useState(0);

  useEffect(() => {
    if (!currentLine) return;
    if (isBgTransitioning) return;
    
    const isPrologue = currentLine.scene === 'PROLOGUE';
    const isSpecialAction = [
      'FADE_TO_BLACK', 'SLOW_FADE_TO_BLACK', 'WAKE_UP', 'FADE_OUT',
      'WAIT_SECONDS', 'WAIT_SECONDS_AND_MOVE_MOON', 'ALL_FADE_OUT', 'WAIT_FADE',
      'WHITE_OUT_END', 'WHITE_OUT_START', 'WHITE_OUT_END_SLOW', 'WHITE_OUT_END_VERY_SLOW',
      'AWAKEN_MICHIRU'
    ].includes(currentLine.action);

    const isAboutToTransition = 
      !isPrologue &&
      !isSpecialAction &&
      currentLine.bg &&
      currentBg !== '' &&
      currentLine.bg !== currentBg;

    if (!isAboutToTransition) {
      setVisualLine(currentLine);
      setVisualStep(currentStep);
    }
  }, [currentLine, currentStep, isBgTransitioning, currentBg]);

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
  const [flags, setFlags] = useState({});

  // Swipe gesture variables
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTap = useRef(0);
  // Prevents onClick from firing after onTouchEnd already handled the tap (mobile double-fire fix)
  const touchHandledRef = useRef(false);

  // Clear sprites on scene change
  useEffect(() => {
    if (visualLine?.scene && visualLine.scene !== prevScene) {
      setPrevScene(visualLine.scene);
      setLeftActive(false);
      setRightActive(false);
      setFocusSlot(null);
      setPresentCharacters([]); // シーン切り替え時に画面内の登場キャラをリセット
      setDisplayedItem(null);
      setIsBloodActive(false);
      setIsRedAlertActive(false);
      setIsMonochromeFlashActive(false);
      setIsLightWaveActive(false);
      setIsDarkEnergyActive(false);
      setIsEyesClosed(false);
      setIsPhoneCallRight(false);
    }
  }, [visualLine?.scene, prevScene]);

  // Track present items
  useEffect(() => {
    if (!visualLine || showTitle) return;

    if (visualLine.hideItem || visualLine.clearItem) {
      setDisplayedItem(null);
    }

    if (visualLine.showItem) {
      setDisplayedItem(visualLine.showItem);
    }
  }, [visualLine, showTitle]);

  // Track present characters (including manual triggers)
  useEffect(() => {
    if (!visualLine || showTitle) return;

    const jpToEngBase = {
      "睦典": "Mutsunori",
      "ヒルミ教授": "Hirumi",
      "ミカ": "Mika",
      "凪砂": "Nagisa",
      "大男": "Akane",
      "アカネ": "Akane",
      "満": "Michiru",
      "朔良": "Sakura",
      "黒騎士": "BlackKnight"
    };

    // 1. Force Clear all illustrations
    if (visualLine.clearIllust) {
      setPresentCharacters([]);
      return;
    }

    let nextList = [...presentCharacters];
    let listChanged = false;

    // 2. Force Hide specific illustrations
    if (Array.isArray(visualLine.hideIllust)) {
      visualLine.hideIllust.forEach(char => {
        const rawBase = char.split('_')[0];
        const baseName = jpToEngBase[rawBase] || rawBase;
        const initialLen = nextList.length;
        nextList = nextList.filter(c => {
          const cBase = c.split('_')[0];
          return (jpToEngBase[cBase] || cBase) !== baseName;
        });
        if (nextList.length !== initialLen) {
          listChanged = true;
        }
      });
    }

    // 3. Force Show specific illustrations
    if (Array.isArray(visualLine.showIllust)) {
      visualLine.showIllust.forEach(char => {
        const rawBase = char.split('_')[0];
        const baseName = jpToEngBase[rawBase] || rawBase;
        const existingIndex = nextList.findIndex(c => {
          const cBase = c.split('_')[0];
          return (jpToEngBase[cBase] || cBase) === baseName;
        });
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

    if (listChanged) {
      setPresentCharacters(nextList);
    }
  }, [visualLine, showTitle, presentCharacters]);

  // Audio system and sprite positioning logic based on active step details
  useEffect(() => {
    if (!currentLine || showTitle) return;

    // Track scene changes to reset BGM override
    if (currentLine.scene !== lastSceneRef.current) {
      bgmOverrideRef.current = false;
      lastSceneRef.current = currentLine.scene;
    }

    // Allow explicit bgm override from scenario data
    if (currentLine.bgm !== undefined) {
      bgmOverrideRef.current = true;
      let fadeDuration = 1500; // デフォルト 1.5秒
      if (currentLine.bgmFade !== undefined) {
        fadeDuration = currentLine.bgmFade < 100 ? currentLine.bgmFade * 1000 : currentLine.bgmFade;
      }

      if (currentLine.bgm === "stop" || currentLine.bgm === "none" || currentLine.bgm === "") {
        stopBGM(fadeDuration);
      } else if (currentLine.bgm === "pause") {
        pauseBGM(fadeDuration);
      } else if (currentLine.bgm === "resume") {
        resumeBGM(fadeDuration);
      } else {
        const bgmFile = currentLine.bgm.includes('.') ? currentLine.bgm : `${currentLine.bgm}.mp3`;
        playBGM(assetPath(`/assets/audio/bgm/${bgmFile}`), {
          fadeDuration,
          volume: currentLine.bgmVolume,
          seek: currentLine.bgmSeek
        });
      }
    } else if (!bgmOverrideRef.current) {
      // Fallback: Background music changes based on scenes
      if (currentLine.scene === 'PROLOGUE') {
        playBGM(assetPath('/assets/audio/bgm/deep_blue_moon.mp3'));
      } else if (currentLine.scene === '講義室出口' || currentLine.scene === '大学の廊下') {
        playBGM(assetPath('/assets/audio/bgm/mutsu_theme.mp3'));
      } else if (currentLine.scene === '月科学大講義室') {
        playBGM(assetPath('/assets/audio/bgm/classroom_ambient.mp3'));
      }
    }

    // Allow explicit SE play / stop from scenario data
    if (currentLine.se) {
      playSE(assetPath(`/assets/audio/bgm/${currentLine.se}`));
    }
    if (currentLine.stopSe) {
      stopSE(assetPath(`/assets/audio/bgm/${currentLine.stopSe}`));
    }

    const action = currentLine.action;
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
    }
  }, [currentStep, currentLine, playBGM, stopBGM, pauseBGM, resumeBGM, playSE, stopSE]);

  // Cinema Mode Autoplay timers
  useEffect(() => {
    if (!currentLine || showTitle || manualTestMode) return;
    if (currentLine.style === 'cinema' || currentLine.action === 'FADE_TO_BLACK' || currentLine.action === 'SLOW_FADE_TO_BLACK' || currentLine.action === 'WAIT_FADE') {
      let delay = 3000;
      if (currentLine.action === 'FADE_IN') delay = 2500;
      if (currentLine.action === 'FADE_OUT') delay = 2000;
      if (currentLine.action === 'WAIT_SECONDS') delay = 2000;
      if (currentLine.action === 'SLOW_FADE_IN') delay = 3500;
      if (currentLine.action === 'WAIT_SECONDS_AND_MOVE_MOON') delay = 4000;
      if (currentLine.action === 'ALL_FADE_OUT') delay = 3000;
      if (currentLine.action === 'FADE_TO_BLACK' || currentLine.action === 'SLOW_FADE_TO_BLACK') delay = currentLine.duration || (currentLine.action === 'SLOW_FADE_TO_BLACK' ? 3000 : 2000);
      if (currentLine.action === 'WAIT_FADE') delay = 1000;

      const timer = setTimeout(() => {
        nextStep();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentStep, currentLine, nextStep, showTitle, manualTestMode]);

  // Persist Good Ending completion flags
  useEffect(() => {
    if (!currentLine || showTitle) return;

    // 1. Nagisa Route Happy End
    if (currentLine.text && currentLine.text.includes("凪砂ルート・ハッピーエンド")) {
      localStorage.setItem('cleared_nagisa_good_end', 'true');
      setClearedNagisa(true);
    }

    // 2. Mika Route Happy End
    if (currentLine.text && currentLine.text.includes("私は彼の大きな手に優しく引かれながら") && currentLine.text.includes("キャンパスの雑踏の中へと歩き出した")) {
      localStorage.setItem('cleared_mika_good_end', 'true');
      setClearedMika(true);
    }

    // 3. Mutsunori Route Happy End
    if (currentLine.text && currentLine.text.includes("睦典ルート・ハッピーエンド")) {
      localStorage.setItem('cleared_mutsunori_good_end', 'true');
      setClearedMutsunori(true);
    }

    // 4. Akane Route Happy End
    if (currentLine.text && currentLine.text.includes("アカネルート・ハッピーエンド")) {
      localStorage.setItem('cleared_akane_good_end', 'true');
      setClearedAkane(true);
    }
  }, [currentLine, showTitle]);

  // Handle conditional branching and special actions
  useEffect(() => {
    if (!currentLine) return;

    if (currentLine.action === 'EVALUATE_FRAGMENT_COLLECT_BRANCH') {
      // 常にハッピーエンドルートへ進むように変更（バッドエンドは後で使用するために保持）
      const targetIdx = scenarioData.findIndex(line => line.label === 'happy_end_start');
      if (targetIdx !== -1) jumpToStep(targetIdx);
    } else if (currentLine.action === 'FADE_TO_HAPPY_END') {
      setEndType('happy');
    } else if (currentLine.action === 'FADE_TO_BAD_END') {
      setEndType('bad');
    } else if (currentLine.action === 'GAME_OVER') {
      // Return to title
      setShowTitle(true);
      jumpToStep(0);
    } else if (currentLine.action === 'EVALUATE_STEALTH_GAME_BRANCH') {
      if (stealthGameResult === 'Mutsunori') {
        const targetIdx = scenarioData.findIndex(line => line.label === 'stealth_clear_mutsunori');
        if (targetIdx !== -1) jumpToStep(targetIdx);
      } else if (stealthGameResult === 'Nagisa') {
        const targetIdx = scenarioData.findIndex(line => line.label === 'stealth_clear_nagisa');
        if (targetIdx !== -1) jumpToStep(targetIdx);
      } else {
        nextStep();
      }
    } else if (currentLine.action === 'EVALUATE_FRAGMENT_COLLECT_NAGISA_BRANCH') {
      if (fragmentCollectResult && fragmentCollectResult.files >= 4) {
        const targetIdx = scenarioData.findIndex(line => line.label === 'nagisa_fragment_happy_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      } else {
        const targetIdx = scenarioData.findIndex(line => line.label === 'nagisa_fragment_bad_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      }
    } else if (currentLine.action === 'EVALUATE_FRAGMENT_COLLECT_MIKA_BRANCH') {
      if (fragmentCollectResult && fragmentCollectResult.files >= 4) {
        const targetIdx = scenarioData.findIndex(line => line.label === 'mika_fragment_happy_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      } else {
        const targetIdx = scenarioData.findIndex(line => line.label === 'mika_fragment_bad_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      }
    } else if (currentLine.action === 'EVALUATE_FRAGMENT_COLLECT_AKANE_BRANCH') {
      if (fragmentCollectResult && fragmentCollectResult.files >= 4) {
        const targetIdx = scenarioData.findIndex(line => line.label === 'akane_fragment_happy_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      } else {
        const targetIdx = scenarioData.findIndex(line => line.label === 'akane_fragment_bad_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      }
    } else if (currentLine.action === 'EVALUATE_FRAGMENT_COLLECT_SOLO_BRANCH') {
      if (fragmentCollectResult && fragmentCollectResult.files >= 4) {
        const targetIdx = scenarioData.findIndex(line => line.label === 'solo_fragment_happy_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      } else {
        const targetIdx = scenarioData.findIndex(line => line.label === 'solo_fragment_bad_end');
        if (targetIdx !== -1) jumpToStep(targetIdx);
        else nextStep();
      }
    }
  }, [currentStep, currentLine, jumpToStep, fragmentCollectResult, stealthGameResult]);

  // Backup: trigger end screen when typing finishes on an ending slide
  // This catches any timing edge-cases where the above useEffect fires too early
  useEffect(() => {
    if (showTitle || isTyping) return;
    if (currentLine?.action === 'FADE_TO_HAPPY_END') {
      setEndType('happy');
    } else if (currentLine?.action === 'FADE_TO_BAD_END') {
      setEndType('bad');
    }
  }, [isTyping, currentLine, showTitle]);

  // Handle touch events for gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (showTitle) return;

    // If the touch target is a button or inside a button/link, don't advance the scenario.
    // Let the button's own click handler handle it instead.
    const target = e.target;
    if (target && (target.closest('button') || target.closest('a') || target.closest('[role="button"]'))) {
      touchHandledRef.current = true;
      setTimeout(() => { touchHandledRef.current = false; }, 300);
      return;
    }

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
      // Swipe gesture detected - Disabled to prevent accidental triggers 
      // when players are just tapping the screen to advance text.
      // (The user explicitly requested that Auto, etc., only trigger via HUD buttons)
      /*
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
      */
      
      // We still mark it as handled so the swipe doesn't accidentally trigger a tap (onClick)
      touchHandledRef.current = true;
      setTimeout(() => { touchHandledRef.current = false; }, 1000);
    } else {
      // Tap detected (not a swipe)
      const isMinigameActive = isTypingGameActive || isSearchAndLearningActive || isSilentScoreActive || isTapCommunicationActive || isEyeOfProfilerActive || isFragmentCollectActive || isFragmentCollectNagisaActive || isFragmentCollectMikaActive || isFragmentCollectAkaneActive || isFragmentCollectSoloActive || isStealthGameActive;

      if (skipMode && !isMinigameActive) {
        setSkipMode(false);
      } else {
        const isTransition = currentLine?.action === 'FADE_TO_BLACK' || currentLine?.action === 'SLOW_FADE_TO_BLACK' || currentLine?.action === 'WAIT_FADE' || isBgTransitioning || isBgFadingOut;
        
        if (!showTitle && !isWaitingForChoice && !alertActive && !backlogOpen && !isMinigameActive && !isAnyEnd && !isEndScreen && !isTransition) {
          nextStep();
        } else if (isMinigameActive) {
          window.dispatchEvent(new Event('minigame-tap'));
        }
      }
      
      // Mark as handled so onClick doesn't double-fire
      touchHandledRef.current = true;
      setTimeout(() => { touchHandledRef.current = false; }, 1000);
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

      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        prevStep();
        e.preventDefault();
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        if (skipMode) {
          setSkipMode(false);
          e.preventDefault();
          return;
        }

        const isMinigameActive = [
          'TRIGGER_TYPING_GAME',
          'TRIGGER_SEARCH_AND_LEARNING',
          'TRIGGER_SILENT_SCORE',
          'TRIGGER_TAP_COMMUNICATION',
          'TRIGGER_EYE_OF_PROFILER',
          'TRIGGER_FRAGMENT_COLLECT',
          'TRIGGER_STEALTH_GAME'
        ].includes(currentLine?.action);

        const isTransition = currentLine?.action === 'FADE_TO_BLACK' || currentLine?.action === 'SLOW_FADE_TO_BLACK' || currentLine?.action === 'WAIT_FADE' || isBgTransitioning || isBgFadingOut;
        if (!isWaitingForChoice && !isMinigameActive && !isAnyEnd && !isEndScreen && !isTransition) {
          nextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep, toggleHud, toggleAuto, isWaitingForChoice, backlogOpen, alertActive, hudVisible, setHudVisible, currentLine, skipMode, setSkipMode, showTitle, isBgTransitioning, isBgFadingOut, isEndScreen]);

  const handleDismissAlert = () => {
    setAlertActive(false);
    nextStep();
  };

  const isCinema = currentLine?.style === 'cinema';
  const isHappyEnd = currentLine?.action === 'FADE_TO_HAPPY_END';
  const isBadEnd = currentLine?.action === 'FADE_TO_BAD_END';
  const isTransition = currentLine?.action === 'FADE_TO_BLACK' || currentLine?.action === 'SLOW_FADE_TO_BLACK' || currentLine?.action === 'WAIT_FADE' || isBgTransitioning || isBgFadingOut;
  const isDemoEnd = currentLine?.action === 'FADE_TO_DEMO_END';
  const isAnyEnd = isHappyEnd || isBadEnd || isDemoEnd;
  const isFlashbackActive = currentLine?.scene?.startsWith('回想：');
  const isTypingGameActive = currentLine?.action === 'TRIGGER_TYPING_GAME';
  const isSearchAndLearningActive = currentLine?.action === 'TRIGGER_SEARCH_AND_LEARNING';
  const isSilentScoreActive = currentLine?.action === 'TRIGGER_SILENT_SCORE';
  const isTapCommunicationActive = currentLine?.action === 'TRIGGER_TAP_COMMUNICATION';
  const isEyeOfProfilerActive = currentLine?.action === 'TRIGGER_EYE_OF_PROFILER';
  const isFragmentCollectActive = currentLine?.action === 'TRIGGER_FRAGMENT_COLLECT';
  const isFragmentCollectNagisaActive = currentLine?.action === 'TRIGGER_FRAGMENT_COLLECT_NAGISA';
  const isFragmentCollectMikaActive = currentLine?.action === 'TRIGGER_FRAGMENT_COLLECT_MIKA';
  const isFragmentCollectAkaneActive = currentLine?.action === 'TRIGGER_FRAGMENT_COLLECT_AKANE';
  const isFragmentCollectSoloActive = currentLine?.action === 'TRIGGER_FRAGMENT_COLLECT_SOLO';
  const isStealthGameActive = currentLine?.action === 'TRIGGER_STEALTH_GAME';

  const handleEyeOfProfilerComplete = (success) => {
    setEyeOfProfilerSuccess(success);
    nextStep();
  };

  const handleFragmentCollectComplete = (result) => {
    setFragmentCollectResult(result);
    nextStep();
  };

  const handleFragmentCollectNagisaComplete = (result) => {
    setFragmentCollectResult(result);
    nextStep();
  };

  const handleFragmentCollectMikaComplete = (result) => {
    setFragmentCollectResult(result);
    nextStep();
  };

  const handleFragmentCollectAkaneComplete = (result) => {
    setFragmentCollectResult(result);
    nextStep();
  };

  const handleFragmentCollectSoloComplete = (result) => {
    setFragmentCollectResult(result);
    nextStep();
  };

  const handleStealthGameComplete = (result) => {
    setStealthGameResult(result);
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

  const processedChoices = currentLine?.choices?.map(choice => {
    let isLocked = false;
    if (choice.condition === 'learning_max') {
      isLocked = learningScore !== 3;
    } else if (choice.condition === 'akane_route_enabled') {
      isLocked = !(clearedMutsunori && clearedMika && clearedNagisa);
    } else if (choice.condition === 'mitsuru_route_enabled') {
      isLocked = !(clearedMutsunori && clearedMika && clearedNagisa && clearedAkane);
    } else if (choice.condition) {
      isLocked = !flags[choice.condition];
    }

    if (isLocked) {
      return { ...choice, text: '？？？', isLocked: true };
    }
    return choice;
  }) || [];

  const handleSelectChoice = (choiceIndex) => {
    const choice = processedChoices[choiceIndex];
    if (choice && choice.isLocked) return; // Prevent selecting locked choices
    if (choice && choice.setFlag) {
      setFlags(prev => ({
        ...prev,
        [choice.setFlag]: true
      }));
    }
    const originalIndex = currentLine?.choices?.indexOf(choice);
    if (originalIndex !== -1 && originalIndex !== undefined) {
      selectChoice(originalIndex);
    } else {
      selectChoice(choiceIndex);
    }
  };

  return (
    <div
      className="w-full h-full select-none touch-none cursor-pointer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => {
        // On mobile, onTouchEnd already handled the tap — skip onClick to prevent double-fire
        if (touchHandledRef.current) return;
        const isMinigameActive = isTypingGameActive || isSearchAndLearningActive || isSilentScoreActive || isTapCommunicationActive || isEyeOfProfilerActive || isFragmentCollectActive || isFragmentCollectNagisaActive || isFragmentCollectMikaActive || isFragmentCollectAkaneActive || isFragmentCollectSoloActive || isStealthGameActive;

        if (skipMode && !isMinigameActive) {
          setSkipMode(false);
          return;
        }
        const isTransition = currentLine?.action === 'FADE_TO_BLACK' || currentLine?.action === 'SLOW_FADE_TO_BLACK' || currentLine?.action === 'WAIT_FADE' || isBgTransitioning || isBgFadingOut;

        if (!showTitle && !isWaitingForChoice && !alertActive && !backlogOpen && !isMinigameActive && !isAnyEnd && !isEndScreen && !isTransition) {
          nextStep();
        } else if (isMinigameActive) {
          window.dispatchEvent(new Event('minigame-tap'));
        }
      }}
    >
      <GameFrame>
        <ShakeLayer shakeEffect={shakeEffect}>
        {showTitle ? (
          <TitleScreen
            onStart={handleStartGame}
            onContinue={handleOpenLoadFromTitle}
            hasSave={hasSave}
            playBGM={playBGM}
          />
        ) : (
          <div className="relative w-full h-full transition-all duration-1000" style={{ filter: isFlashbackActive ? 'sepia(0.5) contrast(1.1) brightness(0.9) grayscale(0.2)' : 'none' }}>
            {/* Visual Background Fallback & Actual Renderer */}
            <BackgroundRenderer
              bgPath={currentBg}
              bgAnimationClass={
                currentLine?.action === 'WAKE_UP'
                  ? 'animate-bg-wake-up'
                  : currentLine?.bgAnimation === 'search_ground'
                  ? 'animate-search-ground'
                  : currentLine?.bgAnimation === 'dash' || currentLine?.bgAnimation === 'run_dash'
                  ? 'animate-run-dash'
                  : currentLine?.bgAnimation === 'stumble_zoom' || currentLine?.bgAnimation === 'tilt_zoom'
                  ? 'animate-stumble-zoom'
                  : currentLine?.bgAnimation === 'center_zoom'
                  ? 'animate-center-zoom'
                  : currentLine?.bgAnimation === 'dodge_left'
                  ? 'animate-dodge-left'
                  : currentLine?.bgAnimation === 'dodge_right'
                  ? 'animate-dodge-right'
                  : currentLine?.bgAnimation === 'impact_zoom'
                  ? 'animate-impact-zoom'
                  : ''
              }
            />

            {/* Typing Game Overlay */}
            {isTypingGameActive && (
              <TypingGame onComplete={handleTypingGameComplete} />
            )}

            {/* Search & Learning Overlay */}
            {isSearchAndLearningActive && (
              <SearchAndLearning 
                onComplete={handleSearchAndLearningComplete} 
                onSave={handleSave}
                onLoad={handleLoad}
                onOpenLog={() => setBacklogOpen(true)}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                setSkipMode={setSkipMode}
                onExit={handleExitToTitle}
                autoMode={autoMode}
                skipMode={skipMode}
              />
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
              <FragmentCollect 
                onComplete={handleFragmentCollectComplete}
                onSave={handleSave}
                onLoad={handleLoad}
                onOpenLog={() => setBacklogOpen(true)}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                autoMode={autoMode}
                skipMode={skipMode}
              />
            )}

            {/* Fragment Collect Nagisa Overlay */}
            {isFragmentCollectNagisaActive && (
              <FragmentCollectNagisa 
                onComplete={handleFragmentCollectNagisaComplete}
                onSave={handleSave}
                onLoad={handleLoad}
                onOpenLog={() => setBacklogOpen(true)}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                autoMode={autoMode}
                skipMode={skipMode}
              />
            )}

            {/* Fragment Collect Mika Overlay */}
            {isFragmentCollectMikaActive && (
              <FragmentCollectMika 
                onComplete={handleFragmentCollectMikaComplete}
                onSave={handleSave}
                onLoad={handleLoad}
                onOpenLog={() => setBacklogOpen(true)}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                autoMode={autoMode}
                skipMode={skipMode}
              />
            )}

            {/* Fragment Collect Akane Overlay */}
            {isFragmentCollectAkaneActive && (
              <FragmentCollectAkane 
                onComplete={handleFragmentCollectAkaneComplete}
                onSave={handleSave}
                onLoad={handleLoad}
                onOpenLog={() => setBacklogOpen(true)}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                autoMode={autoMode}
                skipMode={skipMode}
              />
            )}

            {/* Fragment Collect Solo Overlay */}
            {isFragmentCollectSoloActive && (
              <FragmentCollectSolo 
                onComplete={handleFragmentCollectSoloComplete}
                onSave={handleSave}
                onLoad={handleLoad}
                onOpenLog={() => setBacklogOpen(true)}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                autoMode={autoMode}
                skipMode={skipMode}
              />
            )}

            {/* Silent Score Overlay */}
            {isSilentScoreActive && (
              <SilentScore onComplete={handleSilentScoreComplete} />
            )}

            {isStealthGameActive && (
              <StealthGame onComplete={handleStealthGameComplete} />
            )}

            {/* Cinematic Black Letterbox Overlay */}
            <CinemaLayer
              text={currentLine?.text}
              isActive={isCinema && !isAnyEnd && !isTypingGameActive && !isSearchAndLearningActive && !isSilentScoreActive && !isTapCommunicationActive && !isEyeOfProfilerActive && !isFragmentCollectActive && !isFragmentCollectMikaActive && !isFragmentCollectAkaneActive && !isFragmentCollectSoloActive && !isStealthGameActive}
              isTyping={isTyping}
              onNext={nextStep}
            />

            {/* Phone Call Right Split Overlay (Background) */}
            <AnimatePresence>
              {isPhoneCallRight && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 z-[5] pointer-events-none"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div 
                    className="absolute inset-0 bg-black shadow-[inset_20px_0_50px_rgba(0,0,0,0.8)]"
                    style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 60% 100%)' }}
                  >
                    <img src={assetPath('/scene/lab.png')} alt="lab" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-cyan-950/30 mix-blend-color-burn" />
                  </div>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]">
                    <line x1="70%" y1="0" x2="60%" y2="100%" stroke="#22d3ee" strokeWidth="3" />
                    <line x1="70%" y1="0" x2="60%" y2="100%" stroke="#fff" strokeWidth="1" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Character Sprite Overlay */}
            {!isCinema && !isAnyEnd && (
              <SpriteSlot
                leftActive={leftActive}
                rightActive={rightActive}
                focusSlot={focusSlot}
                currentSpeaker={visualLine?.speaker}
                presentCharacters={presentCharacters}
                currentLine={visualLine}
                currentStep={visualStep}
                scenarioData={scenarioData}
                isPhoneCallRight={isPhoneCallRight}
              />
            )}

            {/* Phone Call Right Scanline Overlay (Over Characters) */}
            <AnimatePresence>
              {isPhoneCallRight && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 z-[25] pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 60% 100%)' }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px)] [background-size:100%_4px]" />
                    <div className="absolute inset-0 bg-cyan-500/5 mix-blend-screen" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mutsunori Healing Cut-in Overlay */}
            <AnimatePresence>
              {currentLine?.action === 'MUTSUNORI_HEALING_CUTIN' && (
                <MutsunoriHealingCutIn />
              )}
            </AnimatePresence>

            {/* Item Sprite Overlay */}
            <AnimatePresence>
              {displayedItem && !isCinema && !isAnyEnd && (() => {
                const isPhone = displayedItem.includes('phone_');
                const isMessage = displayedItem.includes('Message.png');
                const isBottomAligned = isPhone || isMessage;
                return (
                  <motion.div
                    key="item-overlay"
                    className={`absolute inset-0 flex pointer-events-none z-[15] ${isBottomAligned ? 'items-end justify-center' : 'items-center justify-center'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0.7 } }}
                  >
                    <motion.img
                      key={displayedItem}
                      src={assetPath(displayedItem)}
                      alt="item"
                      initial={isBottomAligned ? { y: '100%', opacity: 0 } : { opacity: 0, scale: 0.95 }}
                      animate={isBottomAligned ? { y: '-5%', opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={isBottomAligned ? { y: '100%', opacity: 0 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`object-contain drop-shadow-2xl ${isPhone ? 'w-[20%] max-w-[250px] min-w-[150px]' : isMessage ? 'w-[50%] max-w-[600px] min-w-[300px]' : 'max-w-[40%] max-h-[60%]'}`}
                    />
                  </motion.div>
                );
              })()}
            </AnimatePresence>

            {/* Tear Blur Overlay */}
            <AnimatePresence>
              {isTearBlurActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[17] backdrop-blur-[6px] bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 1.5, ease: 'easeIn' } }}
                />
              )}
            </AnimatePresence>

            {/* Smoke Overlay */}
            <AnimatePresence>
              {isSmokeActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[18] overflow-hidden flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 4.0, ease: 'easeIn' } }}
                >
                  {/* Base gray background (Removed expensive backdrop-blur) */}
                  <div className="absolute inset-0 bg-gray-300" />
                  
                  {/* Lighter billowing effect using CSS radial gradients instead of blur/mix-blend */}
                  {[
                    { left: '-10%', size: '120vw', dur: 6, delay: 0 },
                    { left: '10%', size: '140vw', dur: 8, delay: 0.5 },
                    { left: '50%', size: '130vw', dur: 7, delay: 1 },
                  ].map((cloud, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: cloud.size,
                        height: cloud.size,
                        left: cloud.left,
                        top: '100%',
                        background: 'radial-gradient(circle, rgba(156,163,175,0.6) 0%, rgba(156,163,175,0) 70%)',
                      }}
                      animate={{
                        y: ['0vh', '-130vh'],
                        scale: [0.8, 1.3],
                      }}
                      transition={{
                        duration: cloud.dur,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: cloud.delay,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Energy Aura Overlay */}
            <AnimatePresence>
              {isEnergyAuraActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[18] overflow-hidden mix-blend-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      boxShadow: [
                        'inset 0 0 100px 30px rgba(0, 245, 255, 0.5), inset 0 0 150px 60px rgba(138, 43, 226, 0.4)',
                        'inset 0 0 120px 40px rgba(0, 245, 255, 0.7), inset 0 0 200px 80px rgba(138, 43, 226, 0.6)',
                        'inset 0 0 100px 30px rgba(0, 245, 255, 0.5), inset 0 0 150px 60px rgba(138, 43, 226, 0.4)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Energy Flow Particles */}
                  {[...Array(15)].map((_, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                      <motion.div
                        key={`energy-${i}`}
                        className="absolute rounded-full blur-[2px]"
                        style={{
                          width: (Math.random() * 8 + 4) + 'px',
                          height: (Math.random() * 40 + 20) + 'px',
                          left: isLeft ? `${Math.random() * 10 - 2}%` : `${92 + Math.random() * 10}%`,
                          top: '110%',
                          background: Math.random() > 0.5 ? '#00f5ff' : '#8a2be2',
                        }}
                        animate={{
                          y: ['0vh', '-120vh'],
                          x: isLeft ? [0, Math.random() * 100] : [0, -Math.random() * 100],
                          opacity: [0, 0.9, 0],
                          scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{
                          duration: Math.random() * 1.5 + 1.5,
                          repeat: Infinity,
                          ease: 'easeIn',
                          delay: Math.random() * 2
                        }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Speed Effect Overlay */}
            <AnimatePresence>
              {isSpeedEffectActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[16] overflow-hidden mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={`speed-${i}`}
                      className="absolute bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)]"
                      style={{
                        height: Math.random() * 4 + 1 + 'px',
                        width: Math.random() * 400 + 100 + 'px',
                        top: Math.random() * 100 + '%',
                        left: '100%',
                        opacity: Math.random() * 0.6 + 0.2
                      }}
                      animate={{
                        x: ['0vw', '-150vw']
                      }}
                      transition={{
                        duration: Math.random() * 0.3 + 0.1,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 0.4
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dark Energy Overlay */}
            <AnimatePresence>
              {isDarkEnergyActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[5] overflow-hidden flex justify-center items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <motion.div
                    className="relative w-[600px] h-[600px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,0,0,0.95) 0%, rgba(30,0,50,0.8) 30%, rgba(0,0,0,0) 70%)',
                    }}
                    animate={{
                      rotate: [0, 90, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  >
                    {/* Inner core */}
                    <motion.div
                      className="absolute inset-0 rounded-full mix-blend-multiply"
                      style={{
                        background: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(50,0,80,0.6) 40%, transparent 60%)',
                        filter: 'blur(8px)'
                      }}
                      animate={{
                        rotate: [360, 180, 90, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                    
                    {/* Absorbing particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute bg-black rounded-full"
                        style={{
                          width: `${10 + Math.random() * 20}px`,
                          height: `${10 + Math.random() * 20}px`,
                          boxShadow: '0 0 15px rgba(100,0,150,0.8)',
                          left: '50%',
                          top: '50%',
                          marginTop: '-15px',
                          marginLeft: '-15px',
                        }}
                        animate={{
                          x: [ (Math.random() - 0.5) * 600, 0 ],
                          y: [ (Math.random() - 0.5) * 600, 0 ],
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1 + Math.random() * 1.5,
                          repeat: Infinity,
                          ease: 'easeIn',
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Light Wave Burst Overlay */}
            <AnimatePresence>
              {isLightWaveActive && !isCinema && !isAnyEnd && (
                <LightWaveBurstOverlay />
              )}
            </AnimatePresence>

            {/* Black Aura Overlay */}
            <AnimatePresence>
              {isBlackAuraActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[18] overflow-hidden mix-blend-multiply"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0.5, 0.9, 0.5],
                      boxShadow: [
                        'inset 0 0 150px 50px rgba(0, 0, 0, 0.8), inset 0 0 200px 80px rgba(20, 0, 30, 0.6)',
                        'inset 0 0 180px 60px rgba(0, 0, 0, 0.9), inset 0 0 250px 100px rgba(30, 0, 40, 0.8)',
                        'inset 0 0 150px 50px rgba(0, 0, 0, 0.8), inset 0 0 200px 80px rgba(20, 0, 30, 0.6)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Subtle dark particles */}
                  {[...Array(12)].map((_, i) => {
                    const isLeft = i % 2 === 0;
                    return (
                      <motion.div
                        key={`dark-${i}`}
                        className="absolute rounded-full blur-[4px]"
                        style={{
                          width: `${Math.random() * 30 + 20}px`,
                          height: `${Math.random() * 30 + 20}px`,
                          background: 'rgba(0,0,0,0.85)',
                          left: isLeft ? `${Math.random() * 15 - 5}%` : `${Math.random() * 15 + 90}%`,
                          top: '110%'
                        }}
                        animate={{
                          y: ['0vh', '-120vh'],
                          x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 150],
                          opacity: [0, 0.7, 0]
                        }}
                        transition={{
                          duration: Math.random() * 3 + 3,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: Math.random() * 3
                        }}
                      />
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Black Distortion Overlay */}
            <AnimatePresence>
              {isBlackDistortActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19] overflow-hidden"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{
                    opacity: [0, 0.95, 0.5, 0.9, 0],
                    scale: [1, 1.04, 0.98, 1.03, 1],
                    filter: [
                      'blur(0px) contrast(100%)',
                      'blur(6px) contrast(170%) brightness(35%)',
                      'blur(2px) contrast(130%) brightness(60%)',
                      'blur(5px) contrast(160%) brightness(40%)',
                      'blur(0px) contrast(100%)'
                    ]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                >
                  <div className="w-full h-full bg-black/60" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.95)_85%)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blood Screen Vignette Overlay */}
            <AnimatePresence>
              {isBloodActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19] overflow-hidden"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 35%, rgba(139, 0, 0, 0.55) 70%, rgba(90, 0, 0, 0.95) 100%)',
                      boxShadow: 'inset 0 0 80px 40px rgba(180, 0, 0, 0.85)',
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(160,0,0,0.8),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(160,0,0,0.85),transparent_45%)] mix-blend-multiply" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Red Alert Flash Overlay */}
            <AnimatePresence>
              {isRedAlertActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19] overflow-hidden bg-red-600/35"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.9, 0.3], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                />
              )}
            </AnimatePresence>

            {/* Monochrome Flash Overlay */}
            <AnimatePresence>
              {isMonochromeFlashActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ boxShadow: "inset 0 0 200px 100px rgba(255,255,255,1)" }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    style={{ boxShadow: "inset 0 0 200px 100px rgba(0,0,0,1)" }}
                    animate={{ opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flashback Overlay */}
            <AnimatePresence>
              {isFlashbackActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19] flex flex-col justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 1.5 } }}
                >
                  <div className="w-full h-16 bg-black" />
                  <div className="w-full h-16 bg-black" />
                  <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* White Flash 70 Overlay */}
            <AnimatePresence>
              {isWhiteFlash70Active && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[20] bg-white"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* White Flash Overlay */}
            <AnimatePresence>
              {isWhiteFlashActive && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[20] bg-white"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* White Pulse Overlay */}
            <AnimatePresence>
              {whitePulseLevel > 0 && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[18] bg-white mix-blend-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, whitePulseLevel, 0] }}
                  transition={{ duration: 1.2 - whitePulseLevel, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>

            {/* White Out Overlay */}
            <AnimatePresence>
              {isWhiteOut && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19] bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: whiteOutDuration, ease: 'easeInOut' }}
                />
              )}
              {isGrayOut && !isCinema && !isAnyEnd && (
                <motion.div
                  className="absolute inset-0 pointer-events-none z-[19] bg-[#777777]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: grayOutDuration, ease: 'easeInOut' }}
                />
              )}
            </AnimatePresence>
          </div>
        )}
        </ShakeLayer>

        {!showTitle && (
          <>
            {/* Subtitles & Normal Dialogue Boxes */}
            {!isCinema && !isTransition && !isAnyEnd && !alertActive && !isSearchAndLearningActive && !isSilentScoreActive && !isTapCommunicationActive && !isEyeOfProfilerActive && !isTypingGameActive && !isFragmentCollectActive && !isFragmentCollectMikaActive && !isFragmentCollectAkaneActive && !isFragmentCollectSoloActive && !isStealthGameActive && (
              <DialogueBox
                speaker={currentLine?.speaker}
                role={currentLine?.role}
                text={displayedText}
                fullText={currentLine?.text}
                isTyping={isTyping}
                isVisible={hudVisible}
                autoMode={autoMode}
                skipMode={skipMode}
                onNext={nextStep}
                onToggleAuto={toggleAuto}
                onToggleSkip={toggleSkip}
                onToggleHud={toggleHud}
                onOpenLog={() => setBacklogOpen(true)}
                choices={processedChoices}
                isWaitingForChoice={isWaitingForChoice}
                onSelectChoice={handleSelectChoice}
                onSave={handleSave}
                onLoad={handleLoad}
                onExit={handleExitToTitle}
                touchHandledRef={touchHandledRef}
              />
            )}

            {/* HUD hidden overlay to restore HUD on click */}
            {!hudVisible && !isCinema && !isAnyEnd && (
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

            {/* Fade To Black Overlay */}
            <AnimatePresence>
              {(isFadingBlack || isBgTransitioning) && (
                <motion.div
                  className="absolute inset-0 z-[60] pointer-events-none bg-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: currentLine?.action === 'SLOW_FADE_TO_BLACK' ? 1.5 
                            : currentLine?.action === 'SLOW_FADE_IN' ? 1.0 
                            : currentLine?.action === 'FADE_IN' ? 0.7 
                            : 0.5, 
                    ease: "easeInOut" 
                  }}
                />
              )}
            </AnimatePresence>

            {/* Wake Up Blinking Eyelid Overlay */}
            {currentLine?.action === 'WAKE_UP' && (
              <div className="absolute inset-0 pointer-events-none z-[25] overflow-hidden">
                {/* Top Eyelid */}
                <div className="absolute top-0 left-0 right-0 bg-black animate-eyelid-top" />
                {/* Bottom Eyelid */}
                <div className="absolute bottom-0 left-0 right-0 bg-black animate-eyelid-bottom" />
              </div>
            )}

            {/* Eyes Closed Overlay */}
            {isEyesClosed && (
              <div className="absolute inset-0 pointer-events-none z-[25] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 bg-black animate-eyelid-close-top" />
                <div className="absolute bottom-0 left-0 right-0 bg-black animate-eyelid-close-bottom" />
              </div>
            )}

            {/* End Screen Overlay (Happy / Bad) - driven by endType state */}
            {isEndScreen && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-[70] p-8 text-center animate-fadeIn">
                <div
                  className={`absolute w-[60vh] h-[60vh] rounded-full border pointer-events-none transition-all duration-1000 ${endType === 'bad'
                      ? 'border-red-500/10 shadow-[0_0_120px_rgba(239,68,68,0.05)]'
                      : 'border-amber-400/10 shadow-[0_0_120px_rgba(245,158,11,0.05)]'
                    }`}
                />
                <h1
                  className={`text-4xl md:text-5xl font-orbitron font-extrabold tracking-[0.2em] mb-4 ${endType === 'bad'
                      ? 'text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse'
                      : 'text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse'
                    }`}
                >
                  {endType === 'bad' ? 'BAD END' : 'HAPPY END'}
                </h1>
                <p className="text-gray-400 font-noto tracking-widest text-sm md:text-base mb-12">
                  青い月の裏側で - Behind the Blue Moon
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEndType(null);
                    setShowTitle(true);
                    jumpToStep(0);
                  }}
                  className={`px-12 py-3.5 border font-orbitron text-sm tracking-[0.2em] rounded transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${endType === 'bad'
                      ? 'bg-red-950/30 border-red-500/30 text-red-300 hover:bg-red-500/20 hover:border-red-400 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                      : 'bg-amber-950/30 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    }`}
                >
                  RETURN TO TITLE
                </button>
              </div>
            )}

            {/* Demo End Screen */}
            {isDemoEnd && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-8 text-center animate-fadeIn">
                <div className="absolute w-[60vh] h-[60vh] rounded-full border border-cyan-500/10 shadow-[0_0_120px_rgba(0,245,255,0.05)] pointer-events-none" />
                <h1 className="text-4xl md:text-5xl font-orbitron font-extrabold text-cyan-400 tracking-[0.2em] mb-4 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                  TO BE CONTINUED
                </h1>
                <p className="text-gray-400 font-noto tracking-widest text-sm md:text-base mb-12">
                  青い月の裏側で - Behind the Blue Moon Demo
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearBacklog();
                      jumpToStep(0);
                    }}
                    className="px-8 py-3 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-orbitron text-sm tracking-widest rounded hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    REPLAY DEMO
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTitle(true);
                    }}
                    className="px-8 py-3 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 font-orbitron text-sm tracking-widest rounded hover:bg-indigo-500/20 hover:border-indigo-400 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    RETURN TO TITLE
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Save / Load Toast Notification */}
        {saveToast && (
          <div
            className="fixed bottom-[40vh] left-1/2 -translate-x-1/2 z-[200] px-6 py-2.5 rounded-full text-sm font-bold tracking-widest font-noto pointer-events-none glass-panel"
            style={{
              animation: 'fadeIn 0.2s ease',
              color: saveToast === 'saved' ? '#0ea5e9' : '#4f46e5', // 視認性の良いシアン・インディゴ
              border: `1px solid ${saveToast === 'saved' ? 'rgba(14,165,233,0.3)' : 'rgba(79,70,229,0.3)'
                }`
            }}
          >
            {saveToast === 'saved' ? '💾 セーブしました' : '📂 ロードしました'}
          </div>
        )}

        {/* Save Slot Modal */}
        {slotModalMode && (
          <SaveSlotModal
            mode={slotModalMode}
            slots={slotModalSlots}
            onClose={() => setSlotModalMode(null)}
            onSelectSlot={handleSelectSlot}
          />
        )}

        {/* Confirmation Modal */}
        <ConfirmModal {...confirmModal} />

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
          onJumpToStep={(step) => { setEndType(null); setShowTitle(false); jumpToStep(step); }}
          onToggleMute={toggleMute}
          scenarioData={scenarioData}
          manualTestMode={manualTestMode}
          onToggleManualTestMode={() => setManualTestMode(prev => !prev)}
          clearedMutsunori={clearedMutsunori}
          setClearedMutsunori={(val) => {
            localStorage.setItem('cleared_mutsunori_good_end', val ? 'true' : 'false');
            setClearedMutsunori(val);
          }}
          clearedMika={clearedMika}
          setClearedMika={(val) => {
            localStorage.setItem('cleared_mika_good_end', val ? 'true' : 'false');
            setClearedMika(val);
          }}
          clearedNagisa={clearedNagisa}
          setClearedNagisa={(val) => {
            localStorage.setItem('cleared_nagisa_good_end', val ? 'true' : 'false');
            setClearedNagisa(val);
          }}
          clearedAkane={clearedAkane}
          setClearedAkane={(val) => {
            localStorage.setItem('cleared_akane_good_end', val ? 'true' : 'false');
            setClearedAkane(val);
          }}
          onPrevStep={prevStep}
        />

        {/* Install Prompt Overlay (iOS/Android) */}
        <InstallPrompt />

        {/* Portrait Warning for Smartphones */}
        <PortraitWarningOverlay />

      </GameFrame>
    </div>
  );
}
