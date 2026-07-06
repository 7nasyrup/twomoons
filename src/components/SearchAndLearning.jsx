import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tv, BookOpen, CheckCircle2, ChevronRight, Camera, Sparkles, Circle, EyeOff, FastForward, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '../utils/assetPath';

const OBJECT_DETAILS = {
  tv: {
    messages: [
      { role: 'info', speaker: 'ニュースキャスター', text: `『――さて、次のニュースです。世界的なエネルギー危機の救世主として、国家規模の極秘プロジェクトによりあの「人工月」が打ち上げられてから、ちょうど50年』` },
      { role: 'info', speaker: 'ニュースキャスター', text: `『今や、我々のあらゆる生活インフラを支える莫大な新エネルギーが、あの美しい青い光から供給され続けています』` },
      { role: 'sakura', text: `「今年で50年か…人工月打ち上げられてから」` },
      { role: 'narrative', text: `世界的なエネルギー危機の救世主として、国家規模の極秘プロジェクトにより打ち上げられたというその人工月は、今や地球のあらゆるインフラを支える莫大な新エネルギーを供給していた。` },
      { role: 'narrative', text: `けれど、それは決して無償の恵みなどではない。人工月は、地球の生態系をじわじわと侵食する「未知の毒」でもある。` }
    ]
  },

  bookshelf: {
    messages: [
      { role: 'narrative', text: `カバンに教科書を入れようとしたとき、本棚に置かれた、いまはもう私の隣にはいない父の論文が目に入った。` },
      { role: 'narrative', text: `幼い頃、父は私によく、おとぎ話を聞かせるように月の話を語ってくれた。けれど、ある日を境に父は私の前から突然消えてしまった。` },
      { role: 'sakura', text: `（お父さん……。私はまだ、何も突き止められてないよ）` },
      { role: 'narrative', text: `小さく首を振って思考を振り払い、私はカバンを肩にかけた。` }
    ]
  },
};

const InfoParticle = ({ startX, startY, targetX, targetY, onComplete }) => {
  const [style, setStyle] = useState({
    left: startX,
    top: startY,
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.5)'
  });

  useEffect(() => {
    let flyTimer;
    let completeTimer;

    const raf = requestAnimationFrame(() => {
      // 柔らかく浮かび上がる光の粒
      setStyle({
        left: startX,
        top: startY - 40,
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1.2)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });

      flyTimer = setTimeout(() => {
        // UI（タスクリスト）へ吸い込まれる
        setStyle({
          left: targetX,
          top: targetY,
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.2)',
          transition: 'all 0.6s cubic-bezier(0.5, 0, 0.2, 1)'
        });
      }, 500);

      completeTimer = setTimeout(() => {
        onComplete();
      }, 1100);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(flyTimer);
      clearTimeout(completeTimer);
    };
  }, [startX, startY, targetX, targetY, onComplete]);

  return (
    <div
      className="fixed z-[100] pointer-events-none flex items-center justify-center"
      style={style}
    >
      <div className="w-6 h-6 bg-white/90 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] backdrop-blur-md flex items-center justify-center">
        <div className="w-3 h-3 bg-cyan-200 rounded-full" />
      </div>
    </div>
  );
};

export default function SearchAndLearning({ onComplete }) {
  const [visited, setVisited] = useState({ tv: false, newspaper: false, bookshelf: false, artificial_moon: false, calendar: false });
  const [visuallyVisited, setVisuallyVisited] = useState({ tv: false, newspaper: false, bookshelf: false, artificial_moon: false, calendar: false });
  const [animations, setAnimations] = useState([]);
  const [pendingParticle, setPendingParticle] = useState(null);
  const [bgImage, setBgImage] = useState('/scene/sakura_room.png');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [arScanFlash, setArScanFlash] = useState(false);
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [hasSeenMoonIntro, setHasSeenMoonIntro] = useState(false);

  // --- Message Queue System ---
  const [messageQueue, setMessageQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  const triggerARScan = () => {
    setArScanFlash(true);
    setTimeout(() => setArScanFlash(false), 300); // 柔らかいスキャンエフェクト
  };

  const triggerParticle = useCallback((startX, startY, key) => {
    setTimeout(() => {
      const targetEl = document.getElementById(`task-${key}`);
      let targetX = window.innerWidth - 100;
      let targetY = 100;
      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        targetX = targetRect.left - 20; // タスク項目の左側に吸い込まれる
        targetY = targetRect.top + targetRect.height / 2;
      }

      const newAnim = { id: Date.now() + Math.random(), key, startX, startY, targetX, targetY };
      setAnimations(prev => [...prev, newAnim]);
    }, 50);
  }, []);

  const handleParticleComplete = useCallback((animId, key) => {
    setAnimations(prev => prev.filter(a => a.id !== animId));
    setVisuallyVisited(prev => ({ ...prev, [key]: true }));
  }, []);

  const handleSelectObject = (key, e) => {
    if (isTransitioning || currentMessage) return;

    if (key === 'tv') {
      setIsTransitioning(true);
      setIsBlackout(true);

      if (!visited.tv) {
        triggerARScan();
        if (e) {
          const rect = e.currentTarget.getBoundingClientRect();
          const startX = rect.left + rect.width / 2;
          const startY = rect.top + rect.height / 2;
          setPendingParticle({ key, startX, startY });
        } else {
          setPendingParticle({ key, startX: window.innerWidth / 2, startY: window.innerHeight / 2 });
        }
        setVisited((prev) => ({ ...prev, tv: true }));
      }

      setTimeout(() => {
        setBgImage('/scene/news.png');
        setIsBlackout(false);
      }, 300);

      setTimeout(() => {
        const obj = OBJECT_DETAILS[key];
        if (obj.messages) {
          setMessageQueue(obj.messages.slice(1));
          setCurrentMessage(obj.messages[0]);
        }
        setIsTransitioning(false);
      }, 1200);
      return;
    }

    if (!visited[key]) {
      triggerARScan();
      if (e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        setPendingParticle({ key, startX, startY });
      } else {
        setPendingParticle({ key, startX: window.innerWidth / 2, startY: window.innerHeight / 2 });
      }
      setVisited((prev) => ({ ...prev, [key]: true }));
    }

    const obj = OBJECT_DETAILS[key];

    if (obj.messages) {
      setMessageQueue(obj.messages.slice(1));
      setCurrentMessage(obj.messages[0]);
      return;
    }
  };

  const handleNextMessage = useCallback(() => {
    if (isTyping) {
      clearInterval(typingTimer.current);
      setDisplayedText(currentMessage.text);
      setIsTyping(false);
    } else {
      if (messageQueue.length > 0) {
        setCurrentMessage(messageQueue[0]);
        setMessageQueue((prev) => prev.slice(1));
        setDisplayedText('');
        setIsTyping(true);
      } else {
        setCurrentMessage(null);
        setDisplayedText('');
        setIsTyping(false);
        if (bgImage === '/scene/moon.png') {
          setHasSeenMoonIntro(true);
        }

        if (bgImage === '/scene/news.png') {
          setIsTransitioning(true);
          setIsBlackout(true);
          setTimeout(() => {
            setBgImage('/scene/sakura_room.png');
            setIsBlackout(false);
          }, 300);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 700);
        }

        if (pendingParticle) {
          triggerParticle(pendingParticle.startX, pendingParticle.startY, pendingParticle.key);
          setPendingParticle(null);
        }
      }
    }
  }, [messageQueue, currentMessage, isTyping, bgImage, pendingParticle, triggerParticle]);

  const handleFinishSearch = () => {
    const score = ['tv', 'bookshelf', 'artificial_moon'].filter(k => visited[k]).length;
    onComplete(score);
  };

  const handleOpenWindow = (e) => {
    if (currentMessage) return;

    if (!visited.artificial_moon) {
      triggerARScan();
      if (e) {
        const rect = e.currentTarget.getBoundingClientRect();
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        setPendingParticle({ key: 'artificial_moon', startX, startY });
      } else {
        setPendingParticle({ key: 'artificial_moon', startX: window.innerWidth / 2, startY: window.innerHeight / 2 });
      }
    }

    setIsTransitioning(true);
    setIsBlackout(true);
    setHasSeenMoonIntro(false);

    setTimeout(() => {
      setBgImage('/scene/moon.png');
      setVisited((prev) => ({ ...prev, artificial_moon: true }));
      setIsBlackout(false);
    }, 300);

    setTimeout(() => {
      const moonText = [
        `窓の外を見上げる。そこにあるのは、人類が誕生する遥か昔から夜空に君臨してきた、優しく黄色みがかった『本物の月』を完全に覆い隠すように、ぴったりと重なった――『人工の月』。`,
        `白昼の空に、凍てついたような青い光がぎらぎらと輝いている。`
      ];

      const queue = moonText.map(t => ({
        speaker: '', text: t, role: 'narrative'
      }));

      setMessageQueue(queue.slice(1));
      setCurrentMessage(queue[0]);

      setIsTransitioning(false);
    }, 1200);
  };

  const handleBackToRoom = () => {
    if (currentMessage) return;
    setIsTransitioning(true);
    setIsBlackout(true);

    setTimeout(() => {
      setBgImage('/scene/sakura_room.png');
      setIsBlackout(false);
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  useEffect(() => {
    if (!currentMessage) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    clearInterval(typingTimer.current);
    setDisplayedText('');
    setIsTyping(true);
    let currentString = '';

    typingTimer.current = setInterval(() => {
      if (currentString.length < currentMessage.text.length) {
        currentString += currentMessage.text.charAt(currentString.length);
        setDisplayedText(currentString);
      } else {
        clearInterval(typingTimer.current);
        setDisplayedText(currentMessage.text);
        setIsTyping(false);
      }
    }, currentMessage.role === 'sakura' ? 40 : 25);

    return () => clearInterval(typingTimer.current);
  }, [currentMessage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentMessage && (e.key === 'Enter' || e.key === ' ')) {
        handleNextMessage();
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMessage, isTyping, messageQueue, handleNextMessage]);

  const totalVisited = ['tv', 'bookshelf', 'artificial_moon'].filter(k => visited[k]).length;
  const isMoonView = bgImage === '/scene/moon.png';
  const isNewsView = bgImage === '/scene/news.png';
  const isMoonIntroPlaying = isMoonView && !hasSeenMoonIntro;

  return (
    <div className="absolute inset-0 bg-[#030712] overflow-hidden select-none font-noto">
      {/* Removed inline glass-panel style since it is globally defined in index.css */}

      {/* Background image */}
      <img
        src={assetPath(bgImage)}
        alt="room view"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 transition-all duration-1000 opacity-90 mix-blend-screen"
      />

      {/* AR Scan Ripple Effect */}
      <div
        className={`absolute inset-0 bg-cyan-100/10 z-[60] pointer-events-none transition-all duration-300 ${arScanFlash ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'}`}
      />

      {/* Blackout overlay */}
      <div
        className={`absolute inset-0 bg-[#050810] z-40 pointer-events-none transition-opacity duration-500 ${isBlackout ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Header Info Overlay - Clean AR Glass Style */}
      {!isMoonIntroPlaying && !isNewsView && (
        <div className="absolute top-8 right-8 z-20 pointer-events-none flex flex-col gap-4 items-end">
          <div className="bg-white/90 backdrop-blur-xl shadow-sm border border-white/60 px-6 py-3 rounded-full flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-800 tracking-[0.2em]">
              {isMoonView ? '窓の外' : '朔良の部屋'}
            </h2>
          </div>

          <div className="bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/60 px-8 py-6 rounded-3xl flex flex-col gap-5 min-w-[280px]">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-widest border-b border-slate-200 pb-3 uppercase">
              Morning Routine Tasks
            </h3>

            <motion.div layout id="task-artificial_moon" className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.artificial_moon ? 'text-slate-300 line-through' : (hoveredSpot === 'artificial_moon' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}>
              <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.artificial_moon ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
              窓の外を確認
            </motion.div>

            <AnimatePresence>
              {visuallyVisited.artificial_moon && (
                <motion.div
                  key="task-tv"
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.tv ? 'text-slate-300 line-through' : (hoveredSpot === 'tv' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}
                >
                  <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.tv ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
                  ニュースをチェック
                </motion.div>
              )}

              {visuallyVisited.tv && (
                <motion.div
                  key="task-bookshelf"
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.bookshelf ? 'text-slate-300 line-through' : (hoveredSpot === 'bookshelf' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}
                >
                  <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.bookshelf ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
                  カバンに荷物を詰める
                </motion.div>
              )}
            </AnimatePresence>

            {totalVisited === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 glass-panel rounded-3xl bg-cyan-500/10">
                <div className="text-lg text-cyan-200 tracking-[0.3em] font-medium flex items-center gap-2 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                  <CheckCircle2 className="w-5 h-5" /> ALL CLEAR
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Spots visible in Living Room Room View */}
      {bgImage === '/scene/sakura_room.png' ? (
        <div key="living-room-container" className="absolute inset-0">
          {/* Object 1: TV */}
          {visuallyVisited.artificial_moon && (
            <button
              key="spot-tv"
              onClick={(e) => handleSelectObject('tv', e)}
              onMouseEnter={() => setHoveredSpot('tv')}
              onMouseLeave={() => setHoveredSpot(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
              style={{ top: '45%', left: '12%' }}
            >
              <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.tv ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
                <Circle className={`w-6 h-6 transition-all duration-500 ${visited.tv ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
                {visited.tv && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
              </div>
              {!visited.tv && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">テレビ</span>}
            </button>
          )}

          {/* Object 3: Bookshelf */}
          {visuallyVisited.tv && (
            <button
              key="spot-bookshelf"
              onClick={(e) => handleSelectObject('bookshelf', e)}
              onMouseEnter={() => setHoveredSpot('bookshelf')}
              onMouseLeave={() => setHoveredSpot(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
              style={{ top: '35%', left: '30%' }}
            >
              <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.bookshelf ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
                <Circle className={`w-6 h-6 transition-all duration-500 ${visited.bookshelf ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
                {visited.bookshelf && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
              </div>
              {!visited.bookshelf && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">本棚</span>}
            </button>
          )}

          {/* Object 4: Window (Interact to switch view) */}
          <button
            key="spot-window"
            onClick={(e) => handleOpenWindow(e)}
            onMouseEnter={() => setHoveredSpot('artificial_moon')}
            onMouseLeave={() => setHoveredSpot(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
            style={{ top: '25%', left: '63%' }}
          >
            <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.artificial_moon ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
              <Circle className={`w-6 h-6 transition-all duration-500 ${visited.artificial_moon ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
              {visited.artificial_moon && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
            </div>
            {!visited.artificial_moon && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">窓の外</span>}
          </button>
        </div>
      ) : (
        <div key="moon-view-container" className="absolute inset-0">
          {!isMoonIntroPlaying && isMoonView && (
            <button
              key="btn-back-to-room"
              onClick={handleBackToRoom}
              className="absolute bottom-12 left-12 glass-panel px-8 py-4 rounded-full text-white hover:bg-white/20 transition-all text-sm font-medium tracking-[0.2em] z-20 flex items-center gap-3"
            >
              <ChevronRight className="w-4 h-4 rotate-180 opacity-60" />
              部屋に戻る
            </button>
          )}
        </div>
      )}

      {/* Finish Button - Clean Pill style */}
      {!isMoonIntroPlaying && !isNewsView && totalVisited === 3 && (
        <button
          onClick={handleFinishSearch}
          className="absolute bottom-12 right-12 bg-white text-black px-10 py-4 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 hover:bg-cyan-50 transition-all text-sm font-bold tracking-[0.2em] z-20 flex items-center gap-3 group"
        >
          出発する
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {/* Information Particles (Light Orbs) */}
      {animations.map(anim => (
        <InfoParticle
          key={anim.id}
          startX={anim.startX}
          startY={anim.startY}
          targetX={anim.targetX}
          targetY={anim.targetY}
          onComplete={() => handleParticleComplete(anim.id, anim.key)}
        />
      ))}

      {/* Message overlay capture */}
      {currentMessage && (
        <div
          className="absolute inset-0 z-40 cursor-pointer"
          onClick={handleNextMessage}
        />
      )}

      {/* --- Game Main Dialogue Box style Overlay (Clean AR Style) --- */}
      {currentMessage && (
        <div
          onClick={handleNextMessage}
          className="absolute inset-x-8 md:inset-x-24 bottom-12 z-50 flex flex-col justify-end bg-white/95 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] pt-8 pb-10 px-10 md:px-16 cursor-pointer"
        >
          {/* Speaker name Plate (Sticking out) - Always visible */}
          <div className="absolute -top-5 left-6 md:left-10 h-[40px] flex items-center z-10">
            <div className="bg-white text-slate-800 text-base font-bold tracking-[0.2em] px-6 py-2 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] min-w-[180px] h-full flex items-center justify-center gap-2">
              {currentMessage?.role === 'info' && currentMessage?.speaker && <Sparkles className="w-4 h-4 text-sky-500" />}
              {currentMessage?.speaker || (currentMessage?.role === 'sakura' ? '朔良' : '')}
            </div>
          </div>

          {/* Text content */}
          <div className="min-h-[100px] flex items-start pt-2">
            {currentMessage.role === 'sakura' ? (
              <p className="text-slate-800 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line">
                {displayedText}
                {isTyping && (
                  <motion.span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 ml-2 align-middle" animate={{ opacity: [1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
                )}
              </p>
            ) : (
              <p className="text-slate-800 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line">
                {displayedText}
                {isTyping && (
                  <motion.span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 ml-2 align-middle" animate={{ opacity: [1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} />
                )}
              </p>
            )}
          </div>

          {/* Next Indicator */}
          {!isTyping && (
            <motion.div className="absolute bottom-12 right-10" animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronRight className="w-6 h-6 text-slate-400" />
            </motion.div>
          )}

          {/* HUD Buttons (Bottom Right, sticking out) */}
          <div className="absolute bottom-0 right-6 md:right-10 translate-y-[50%] flex gap-2 z-20">
            <HudButton icon={<BookOpen size={14} />} label="LOG" onClick={() => console.log('Log placeholder')} />
            <HudButton icon={<EyeOff size={14} />} label="HIDE" onClick={() => console.log('Hide placeholder')} />
            <HudButton icon={<FastForward size={14} />} label="AUTO" onClick={() => console.log('Auto placeholder')} />
            <HudButton icon={<LogOut size={14} />} label="EXIT" onClick={() => console.log('Exit placeholder')} />
          </div>
        </div>
      )}
    </div>
  );
}

function HudButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest font-noto transition-all duration-300 shadow-sm backdrop-blur-md ${active ? 'bg-slate-100 text-slate-800' : 'bg-white/90 text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      {icon}
      {label}
    </button>
  );
}
