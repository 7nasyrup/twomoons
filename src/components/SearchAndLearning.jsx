import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tv, BookOpen, CheckCircle2, ChevronRight, Camera, Sparkles, Circle, EyeOff, FastForward, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '../utils/assetPath';
import DialogueBox from './DialogueBox';

const OBJECT_DETAILS = {
  bag: {
    messages: [
      { role: 'narrative', text: `教科書が詰まった重いカバンを持ち上げ、自分の手元を見つめる。` },
      { role: 'narrative', text: `大学にまで入って月科学なんて不気味な勉強してるのに、私には、何の関係もない話。` },
      { role: 'narrative', text: `周囲の優秀な──何らかの力を隠し持っているであろう特待生たちとは違う。私は人工月の恩恵を一切受けられなかった、ただの『無能力者』。` },
      { role: 'narrative', text: `牙を持たない羊として生きるために、目立たないように、波風を立てないように。ただ二十歳の学生としての静かな日常を消化することだけが、私の生存戦略だった。` }
    ]
  },

  photo: {
    messages: [
      { role: 'narrative', text: `棚の特等席に飾られた、若き日の優しい父親と、まだ幼い私が写った写真に触れる。` },
      { role: 'father', speaker: '父', text: `『朔良、あの青い月を見ちゃダメだ。あの裏側にはね、もっと優しくて、満ちたり欠けたりしながら、ただ静かに僕たちを照らしてくれていた本物の月があるんだよ』` },
      { role: 'narrative', text: `父は私によく、隠されてしまった本物の月の姿を、何度も何度も話してくれた。そして、私の前から突然消えてしまった。` },
      { role: 'narrative', text: `父が何を求めて失踪したのか、その真相を知りたくて、私は最先端の、そして危険な『月科学エネルギー学部』の門を叩いたのだ。` }
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
  const [visited, setVisited] = useState({ bag: false, newspaper: false, photo: false, artificial_moon: false, calendar: false });
  const [visuallyVisited, setVisuallyVisited] = useState({ bag: false, newspaper: false, photo: false, artificial_moon: false, calendar: false });
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



        if (pendingParticle) {
          triggerParticle(pendingParticle.startX, pendingParticle.startY, pendingParticle.key);
          setPendingParticle(null);
        }
      }
    }
  }, [messageQueue, currentMessage, isTyping, bgImage, pendingParticle, triggerParticle]);

  const handleFinishSearch = () => {
    const score = ['bag', 'photo', 'artificial_moon'].filter(k => visited[k]).length;
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
      setVisited((prev) => ({ ...prev, artificial_moon: true }));
    }

    const queue = [
      { role: 'narrative', speaker: '', text: `画面を点灯させると、『月波観測庁』が発令した最新の警告通知が、不吉な赤色で明滅していた。` },
      { role: 'info', speaker: '警告通知', text: `【月波観測予報：警戒レベル3（厳重警戒）】 本日、人工月の活性化に伴い、地上への月波照射量が基準値を大幅に超過。一般市民は不要不急の外出を控え、特に『適応不全（【キメラ】化）』の兆候がある個体への接近に注意してください。` },
      { role: 'narrative', speaker: '', text: `月波（げっぱ）を浴びた人間の中から、常人離れした『異能力』に目覚める者が現れる。` },
      { role: 'narrative', speaker: '', text: `今やそれは珍しいことではないけれど、みんな国の研究機関に目をつけられるリスクを恐れて力を隠し、互いに探り合いながら生きている。` },
      { role: 'narrative', speaker: '', text: `そしてもう一つの警戒が、生態系の破壊──『キメラ』の発生。人工月のエネルギーに適応できず、怪物と化した動植物や元・人間の成れの果て。` },
      { role: 'narrative', speaker: '', text: `警戒レベル3ってことは、今夜あたり、またあの化け物どもが街を徘徊し始めるかもしれない。` }
    ];

    setMessageQueue(queue.slice(1));
    setCurrentMessage(queue[0]);
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

    const onGlobalTap = () => {
      handleNextMessage();
    };
    window.addEventListener('minigame-tap', onGlobalTap);

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

    return () => {
      clearInterval(typingTimer.current);
      window.removeEventListener('minigame-tap', onGlobalTap);
    };
  }, [currentMessage, handleNextMessage]);

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

  const totalVisited = ['bag', 'photo', 'artificial_moon'].filter(k => visited[k]).length;
  const isMoonView = bgImage === '/scene/moon.png';
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
      {!isMoonIntroPlaying && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20 pointer-events-none flex flex-col gap-2 md:gap-4 items-end scale-[0.6] md:scale-100 origin-top-right">
          <div className="bg-white/90 backdrop-blur-xl shadow-sm border border-white/60 px-6 py-3 rounded-full flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-800 tracking-[0.2em]">
              朔良の部屋
            </h2>
          </div>

          <div className="bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/60 px-8 py-6 rounded-3xl flex flex-col gap-5 min-w-[280px]">
            <h3 className="text-[10px] font-bold text-slate-400 tracking-widest border-b border-slate-200 pb-3 uppercase">
              Morning Routine Tasks
            </h3>

            <motion.div layout id="task-artificial_moon" className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.artificial_moon ? 'text-slate-300 line-through' : (hoveredSpot === 'artificial_moon' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}>
              <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.artificial_moon ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
              スマートフォンを手に取る
            </motion.div>

            <AnimatePresence>
              {visuallyVisited.artificial_moon && (
                <div
                  key="task-photo"
                  className="flex items-center gap-3 overflow-hidden group"
                >
                  <p
                    className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.photo ? 'text-slate-300 line-through' : (hoveredSpot === 'photo' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}
                  >
                    <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.photo ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
                    机の上の古い写真
                  </p>
                </div>
              )}

              {visuallyVisited.photo && (
                <motion.div
                  key="task-bag"
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.bag ? 'text-slate-300 line-through' : (hoveredSpot === 'bag' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}
                >
                  <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.bag ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
                  バッグを手に取る
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

      {/* Title / Current Area (Top Left) */}
      {!isMoonIntroPlaying && isMoonView && (
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 scale-[0.6] md:scale-100 origin-top-left">
          <div className="glass-panel px-6 py-3 rounded-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
            <div>
              <div className="font-orbitron text-[10px] text-cyan-500 tracking-[0.4em] mb-1">LOCATION</div>
              <div className="font-noto font-bold text-lg text-white tracking-widest">朔良の部屋</div>
            </div>
          </div>
        </div>
      )}

      {/* Spots visible in Living Room Room View */}
      {bgImage === '/scene/sakura_room.png' ? (
        <div key="living-room-container" className="absolute inset-0">
          {/* Object 1: Bag */}
          {visuallyVisited.photo && (
            <button
              key="spot-bag"
              onClick={(e) => handleSelectObject('bag', e)}
              onMouseEnter={() => setHoveredSpot('bag')}
              onMouseLeave={() => setHoveredSpot(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
              style={{ top: '60%', left: '15%' }}
            >
              <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.bag ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
                <Circle className={`w-6 h-6 transition-all duration-500 ${visited.bag ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
                {visited.bag && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
              </div>
              {!visited.bag && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">通学カバン</span>}
            </button>
          )}
          {/* Object 2: father and me Photo */}
          {visuallyVisited.artificial_moon && (
            <button
              key="spot-photo"
              onClick={(e) => handleSelectObject('photo', e)}
              onMouseEnter={() => setHoveredSpot('photo')}
              onMouseLeave={() => setHoveredSpot(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
              style={{ top: '65%', left: '90%' }}
            >
              <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.photo ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
                <Circle className={`w-6 h-6 transition-all duration-500 ${visited.photo ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
                {visited.photo && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
              </div>
              {!visited.photo && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">机の上の古い写真</span>}
            </button>
          )}

          {/* Object 3: phone*/}
          <button
            key="spot-window"
            onClick={(e) => handleOpenWindow(e)}
            onMouseEnter={() => setHoveredSpot('artificial_moon')}
            onMouseLeave={() => setHoveredSpot(null)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
            style={{ top: '55%', left: '63%' }}
          >
            <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.artificial_moon ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
              <Circle className={`w-6 h-6 transition-all duration-500 ${visited.artificial_moon ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
              {visited.artificial_moon && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
            </div>
            {!visited.artificial_moon && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">スマートフォン</span>}
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
      {!isMoonIntroPlaying && totalVisited === 3 && (
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
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={handleNextMessage}
        />
      )}

      <DialogueBox
        speaker={currentMessage?.speaker || ''}
        role={currentMessage?.role || ''}
        text={displayedText}
        isTyping={isTyping}
        isVisible={!!currentMessage}
        autoMode={false}
        skipMode={false}
        onNext={handleNextMessage}
        onToggleAuto={() => console.log('Auto toggle not supported here')}
        onToggleSkip={() => console.log('Skip toggle not supported here')}
        onToggleHud={() => console.log('Hide HUD not supported here')}
        onOpenLog={() => console.log('Log not supported here')}
        choices={null}
        isWaitingForChoice={false}
        onSelectChoice={() => { }}
        fullText={currentMessage?.text}
        onSave={() => console.log('Save placeholder')}
        onLoad={() => console.log('Load placeholder')}
        onExit={() => console.log('Exit placeholder')}
      />
    </div>
  );
}
