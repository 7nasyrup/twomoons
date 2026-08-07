import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle2, ChevronRight, Circle, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '../utils/assetPath';
import DialogueBox from './DialogueBox';
import ConfirmModal from './ConfirmModal';
import { useAudioSystem } from '../hooks/useAudioSystem';

const OBJECT_DETAILS = {
  shelf: {
    title: '古びた棚',
    messages: [
      { role: 'narrative', text: `薄暗い照明の中、錆びた棚が目に入った。棚の中にはいくつか汚れたファイルがあるみたいだけど…。` },
      { role: 'narrative', text: `一つ分厚い資料を取り出して、ざっと中身を見てみる。` },
      { role: 'info', speaker: '資料', text: `『……異能力やキメラの発現には、政府が隠ぺいした人工月が関係している』`, se: '+paper.mp3' },
      { role: 'info', speaker: '資料', text: `『……その中の、研究所によって守られる“コア”が発生源と仮定されており……』`, se: '+paper.mp3' },
      { role: 'narrative', text: `すべての内容を見ている暇はなかった。だけど…` },
      { role: 'SAKURA', speaker: '朔良', text: `（やっぱり、キメラや異能はあの人工月と関係しているんだ…）` },
      { role: 'narrative', text: `資料を閉じようとしたところで、とある文言が目に入った。` },
      { role: 'info', speaker: '資料', text: `『……研究所のデータの中で、『歌』の力を持つ者の存在を確認。歌によって対象者の身体能力を向上させることができる』` },
      { role: 'narrative', text: `睦典や、あの大男の前で歌った時の…あの感覚は。` },
      { role: 'SAKURA', speaker: '朔良', text: `（…まさか）` },
      { role: 'narrative', text: `震える手で、私はそっと資料を元に戻した。` }
    ]
  },
  locker: {
    title: 'ロッカー',
    messages: [
      { role: 'narrative', text: `建付けの悪いロッカーを開けると、そこには何かの部品や瓦礫のほかに、煤がついた救急箱が置かれていた。`, se: '+locker_open.mp3' },
      { role: 'narrative', text: `中身は綺麗な状態で、ほっとした私は縛られて痣になった手首や、殴られた際に出来た顔のうっ血痕を包帯やばんそうこうで処置していく。` },
      { role: 'narrative', text: `…あの人は、あの時確かに私を助けてくれていたのに。どうしてこんなことになってしまったんだろうか。それに、外の様子も何かおかしかった。` },
      { role: 'narrative', text: `不安が頭を駆け巡る中、処置を終えた私は部屋を再度見まわした。` }
    ]
  },
  window: {
    title: '窓',
    messages: [
      { role: 'narrative', text: `窓を見ると、すっかり空は暗闇に染まっていた。拉致されてどれだけの時間が経ったのだろう。` },
      { role: 'narrative', text: `手元のスマホを確認すると、時刻は日を跨ぐ直前だった。助けを呼ぼうにも、電波は『圏外』になっている。` },
      { role: 'narrative', text: `ただ窓の風景で気になったことがあった。それは―――。` },
      { role: 'SAKURA', speaker: '朔良', text: `（……炎？）` },
      { role: 'narrative', text: `よく見ると、あちらこちらで火の手が上がっているようだった。もしかしたら外も大変なことになっているのかもしれない。` }
    ]
  }
};

const InfoParticle = ({ startX, startY, targetX, targetY, onComplete, skipMode }) => {
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
      setStyle({
        left: startX,
        top: startY - (skipMode ? 0 : 40),
        opacity: 1,
        transform: `translate(-50%, -50%) scale(${skipMode ? 0.2 : 1.2})`,
        transition: skipMode ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });

      flyTimer = setTimeout(() => {
        setStyle({
          left: targetX,
          top: targetY,
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0.2)',
          transition: skipMode ? 'none' : 'all 0.6s cubic-bezier(0.5, 0, 0.2, 1)'
        });
      }, skipMode ? 0 : 500);

      completeTimer = setTimeout(() => {
        onComplete();
      }, skipMode ? 50 : 1100);
    });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(flyTimer);
      clearTimeout(completeTimer);
    };
  }, [startX, startY, targetX, targetY, onComplete, skipMode]);

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

export default function WarehouseExploration({
  onComplete,
  onSave,
  onLoad,
  onOpenLog,
  onToggleAuto,
  onToggleSkip,
  onExit,
  autoMode,
  skipMode,
  setSkipMode
}) {
  const [visited, setVisited] = useState({ shelf: false, locker: false, window: false });
  const [visuallyVisited, setVisuallyVisited] = useState({ shelf: false, locker: false, window: false });
  const [animations, setAnimations] = useState([]);
  const [pendingParticle, setPendingParticle] = useState(null);
  const bgImage = '/scene/warehouse2.png';
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [arScanFlash, setArScanFlash] = useState(false);
  const [hoveredSpot, setHoveredSpot] = useState(null);
  const [canSkip] = useState(() => localStorage.getItem('twomoons_cleared_warehouse') === 'true');
  const [confirmModal, setConfirmModal] = useState({ isActive: false, title: '', message: '', onConfirm: null, onCancel: null });

  const { playSE } = useAudioSystem();

  const [hudVisible, setHudVisible] = useState(true);
  const [messageQueue, setMessageQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  useEffect(() => {
    if (skipMode && setSkipMode) {
      setSkipMode(false);
    }
  }, []);

  const triggerARScan = () => {
    setArScanFlash(true);
    setTimeout(() => setArScanFlash(false), 300);
  };

  const triggerParticle = useCallback((startX, startY, key) => {
    setTimeout(() => {
      const targetEl = document.getElementById(`task-${key}`);
      let targetX = window.innerWidth - 100;
      let targetY = 100;
      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        targetX = targetRect.left - 20;
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
        setIsTyping(false);
        if (skipMode && setSkipMode) {
          setSkipMode(false);
        }

        if (pendingParticle) {
          triggerParticle(pendingParticle.startX, pendingParticle.startY, pendingParticle.key);
          setPendingParticle(null);
        }
      }
    }
  }, [messageQueue, currentMessage, isTyping, pendingParticle, triggerParticle, skipMode, setSkipMode]);

  const handleFinishSearch = () => {
    localStorage.setItem('twomoons_cleared_warehouse', 'true');
    const score = ['shelf', 'locker', 'window'].filter(k => visited[k]).length;
    onComplete(score);
  };

  useEffect(() => {
    if (!currentMessage) {
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    if (currentMessage.se) {
      playSE(assetPath(`/assets/audio/bgm/${currentMessage.se}`));
    }

    if (isTyping && displayedText !== '') return;

    clearInterval(typingTimer.current);
    setDisplayedText('');
    setIsTyping(true);
    let currentString = '';

    const delay = skipMode ? 10 : (currentMessage.role === 'sakura' ? 40 : 25);
    const charsPerTick = skipMode ? 3 : 1;

    typingTimer.current = setInterval(() => {
      if (currentString.length < currentMessage.text.length) {
        currentString += currentMessage.text.substr(currentString.length, charsPerTick);
        setDisplayedText(currentString);
      } else {
        clearInterval(typingTimer.current);
        setDisplayedText(currentMessage.text);
        setIsTyping(false);
      }
    }, delay);

    return () => clearInterval(typingTimer.current);
  }, [currentMessage, skipMode]);

  useEffect(() => {
    if (!currentMessage) return;

    const onGlobalTap = () => {
      handleNextMessage();
    };
    window.addEventListener('minigame-tap', onGlobalTap);

    return () => {
      window.removeEventListener('minigame-tap', onGlobalTap);
    };
  }, [currentMessage, handleNextMessage]);

  useEffect(() => {
    if (!currentMessage) return;

    if ((autoMode || skipMode) && !isTyping) {
      let delay = skipMode ? 100 : 1500;
      const timer = setTimeout(() => {
        handleNextMessage();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentMessage, isTyping, autoMode, skipMode, handleNextMessage]);

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

  const totalVisited = ['shelf', 'locker', 'window'].filter(k => visited[k]).length;

  return (
    <div className="absolute inset-0 bg-[#030712] overflow-hidden select-none font-noto">
      {/* Background image */}
      <img
        src={assetPath(bgImage)}
        alt="room view"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 transition-all duration-1000 opacity-90"
      />

      {/* AR Scan Ripple Effect */}
      <div
        className={`absolute inset-0 bg-cyan-100/10 z-[60] pointer-events-none transition-all duration-300 ${arScanFlash ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'}`}
      />

      {/* Header Info Overlay */}
      <div className="absolute top-8 right-8 max-lg:top-4 max-lg:right-16 z-20 pointer-events-none flex flex-col gap-4 max-lg:gap-2 items-end max-lg:scale-[0.8] max-lg:origin-top-right">
        <div className="bg-white/90 backdrop-blur-xl shadow-sm border border-white/60 px-6 py-3 rounded-full flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-800 tracking-[0.2em]">
            廃倉庫
          </h2>
        </div>

        <div className="bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white/60 px-8 py-6 rounded-3xl flex flex-col gap-5 min-w-[280px]">
          <h3 className="text-[10px] font-bold text-slate-400 tracking-widest border-b border-slate-200 pb-3 uppercase">
            Exploration Tasks
          </h3>

          <motion.div layout id="task-shelf" className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.shelf ? 'text-slate-300 line-through' : (hoveredSpot === 'shelf' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}>
            <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.shelf ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
            古びた棚を調べる
          </motion.div>

          <motion.div layout id="task-locker" className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.locker ? 'text-slate-300 line-through' : (hoveredSpot === 'locker' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}>
            <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.locker ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
            ロッカーを調べる
          </motion.div>

          <motion.div layout id="task-window" className={`text-sm font-bold tracking-wider flex items-center gap-4 transition-all duration-500 ${visuallyVisited.window ? 'text-slate-300 line-through' : (hoveredSpot === 'window' ? 'text-sky-500 drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] scale-105 origin-left' : 'text-slate-700')}`}>
            <CheckCircle2 className={`w-5 h-5 transition-colors ${visuallyVisited.window ? 'text-sky-400' : 'text-slate-200'}`} strokeWidth={2} />
            窓の外を確認する
          </motion.div>

          {totalVisited === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 glass-panel rounded-3xl bg-cyan-500/10">
              <div className="text-lg text-cyan-200 tracking-[0.3em] font-medium flex items-center gap-2 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                <CheckCircle2 className="w-5 h-5" /> ALL CLEAR
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {canSkip && !currentMessage && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 max-lg:top-4 z-40 animate-fadeIn">
          <button
            onClick={() => {
              setConfirmModal({
                isActive: true,
                title: 'SKIP EXPLORATION',
                message: '探索をスキップして次のシナリオへ進みますか？',
                onConfirm: () => {
                  setConfirmModal(prev => ({ ...prev, isActive: false }));
                  handleFinishSearch();
                },
                onCancel: () => {
                  setConfirmModal(prev => ({ ...prev, isActive: false }));
                }
              });
            }}
            className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 border border-cyan-500/30 text-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.2)] hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            <FastForward size={16} />
            <span className="text-xs font-noto font-bold tracking-widest">探索をスキップ</span>
          </button>
        </div>
      )}

      <div key="warehouse-container" className="absolute inset-0">
        {/* Object 1: Shelf */}
        <button
          key="spot-shelf"
          onClick={(e) => handleSelectObject('shelf', e)}
          onMouseEnter={() => setHoveredSpot('shelf')}
          onMouseLeave={() => setHoveredSpot(null)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
          style={{ top: '53%', left: '28%' }}
        >
          <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.shelf ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
            <Circle className={`w-6 h-6 transition-all duration-500 ${visited.shelf ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
            {visited.shelf && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
          </div>
          {!visited.shelf && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">古びた棚</span>}
        </button>

        {/* Object 2: Locker */}
        <button
          key="spot-locker"
          onClick={(e) => handleSelectObject('locker', e)}
          onMouseEnter={() => setHoveredSpot('locker')}
          onMouseLeave={() => setHoveredSpot(null)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
          style={{ top: '55%', left: '45%' }}
        >
          <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.locker ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
            <Circle className={`w-6 h-6 transition-all duration-500 ${visited.locker ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
            {visited.locker && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
          </div>
          {!visited.locker && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">ロッカー</span>}
        </button>

        {/* Object 3: Window */}
        <button
          key="spot-window"
          onClick={(e) => handleSelectObject('window', e)}
          onMouseEnter={() => setHoveredSpot('window')}
          onMouseLeave={() => setHoveredSpot(null)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
          style={{ top: '50%', left: '78%' }}
        >
          <div className={`relative w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${visited.window ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
            <Circle className={`w-6 h-6 transition-all duration-500 ${visited.window ? 'text-cyan-400 opacity-50 scale-125' : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
            {visited.window && <CheckCircle2 className="absolute text-cyan-300 w-4 h-4 drop-shadow-md" strokeWidth={2} />}
          </div>
          {!visited.window && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">窓</span>}
        </button>
      </div>

      {totalVisited === 3 && (
        <button
          onClick={handleFinishSearch}
          className="absolute bottom-12 right-12 max-lg:bottom-6 max-lg:right-20 max-lg:scale-[0.8] max-lg:origin-bottom-right bg-white text-black px-10 py-4 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-105 hover:bg-cyan-50 transition-all text-sm font-bold tracking-[0.2em] z-20 flex items-center gap-3 group"
        >
          探索を終了する
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {animations.map(anim => (
        <InfoParticle
          key={anim.id}
          startX={anim.startX}
          startY={anim.startY}
          targetX={anim.targetX}
          targetY={anim.targetY}
          skipMode={skipMode}
          onComplete={() => handleParticleComplete(anim.id, anim.key)}
        />
      ))}

      <ConfirmModal {...confirmModal} />

      {!hudVisible && !!currentMessage && (
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setHudVisible(true);
          }}
        />
      )}

      <DialogueBox
        speaker={currentMessage?.speaker || ''}
        role={currentMessage?.role || ''}
        text={displayedText}
        isTyping={isTyping}
        isVisible={!!currentMessage && hudVisible}
        autoMode={autoMode}
        skipMode={skipMode}
        onNext={handleNextMessage}
        onToggleAuto={onToggleAuto}
        onToggleSkip={onToggleSkip}
        onToggleHud={() => setHudVisible(!hudVisible)}
        onOpenLog={onOpenLog}
        choices={null}
        isWaitingForChoice={false}
        onSelectChoice={() => { }}
        fullText={currentMessage?.text}
        onSave={onSave}
        onLoad={onLoad}
        onExit={onExit}
      />
    </div>
  );
}
