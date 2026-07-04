import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tv, BookOpen, FileText, Check, Search, X, ChevronRight } from 'lucide-react';


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
      setStyle({
        left: startX,
        top: startY - 40,
        opacity: 1,
        transform: 'translate(-50%, -50%) scale(1.5)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      });

      flyTimer = setTimeout(() => {
        setStyle({
          left: targetX,
          top: targetY,
          opacity: 0.8,
          transform: 'translate(-50%, -50%) scale(0.3)',
          transition: 'all 0.6s cubic-bezier(0.5, 0, 0.2, 1)'
        });
      }, 300);

      completeTimer = setTimeout(() => {
        onComplete();
      }, 900);
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
      <div className="w-4 h-4 rounded-full bg-cyan-200 shadow-[0_0_15px_5px_rgba(103,232,249,0.8)]" />
      <div className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />
    </div>
  );
};

export default function SearchAndLearning({ onComplete }) {
  const [visited, setVisited] = useState({ tv: false, newspaper: false, bookshelf: false, artificial_moon: false, calendar: false });
  const [visuallyVisited, setVisuallyVisited] = useState({ tv: false, newspaper: false, bookshelf: false, artificial_moon: false, calendar: false });
  const [animations, setAnimations] = useState([]);
  const [pendingParticle, setPendingParticle] = useState(null);
  const [bgImage, setBgImage] = useState('/scene/room_tv.png');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [hasSeenMoonIntro, setHasSeenMoonIntro] = useState(false);
  const [fullScreenItemImage, setFullScreenItemImage] = useState(null);

  // --- Message Queue System (本編同様のメッセージウィンドウで情報を表示) ---
  const [messageQueue, setMessageQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  const triggerParticle = useCallback((startX, startY, key) => {
    setTimeout(() => {
      const targetEl = document.getElementById('info-collection-target');
      let targetX = 50;
      let targetY = window.innerHeight - 50;
      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        targetX = targetRect.left + targetRect.width / 2;
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

    if (obj.fullScreenImage) {
      setFullScreenItemImage(obj.fullScreenImage);
    }

    if (obj.messages) {
      setMessageQueue(obj.messages.slice(1));
      setCurrentMessage(obj.messages[0]);
      return;
    }

    // 各項目が配列（複数メッセージ）でも文字列（単一メッセージ）でも対応できるようにする
    const textBlocks = obj.text ? (Array.isArray(obj.text) ? obj.text : [obj.text]) : [];
    const dialogueBlocks = obj.dialogue ? (Array.isArray(obj.dialogue) ? obj.dialogue : [obj.dialogue]) : [];
    const afterTextBlocks = obj.afterText ? (Array.isArray(obj.afterText) ? obj.afterText : [obj.afterText]) : [];

    const infoMessages = textBlocks.map(t => ({
      speaker: obj.title, text: t, role: 'info', icon: obj.icon
    }));

    const dialogueMessages = dialogueBlocks.map(d => ({
      speaker: '朔良', text: d, role: 'sakura'
    }));

    const afterInfoMessages = afterTextBlocks.map(t => ({
      speaker: '', text: t, role: 'narrative'
    }));

    const queue = [
      ...infoMessages,
      ...dialogueMessages,
      ...afterInfoMessages
    ];

    setMessageQueue(queue.slice(1));
    setCurrentMessage(queue[0]);
  };

  const handleNextMessage = useCallback(() => {
    if (isTyping) {
      // タイピング中の場合、タイマーを停止して一瞬で全表示する（スキップ）
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
        setFullScreenItemImage(null);
        if (bgImage === '/scene/moon.jpg') {
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
    const score = ['tv', 'bookshelf', 'artificial_moon'].filter(k => visited[k]).length;
    onComplete(score);
  };

  const handleOpenWindow = (e) => {
    if (currentMessage) return;

    if (!visited.artificial_moon) {
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
    setIsBlackout(true); // 暗転開始
    setHasSeenMoonIntro(false); // 演出開始時にリセット

    // 暗転完了タイミング（300ms後）で背景切り替え ＆ フェードアウト開始
    setTimeout(() => {
      setBgImage('/scene/moon.jpg');
      setVisited((prev) => ({ ...prev, artificial_moon: true }));
      setIsBlackout(false);
    }, 300);

    // 背景が完全に表示され、少し間を置いてからメッセージを表示（1200ms後）
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

      setIsTransitioning(false); // メッセージが表示されたタイミングで操作ガード解除
    }, 1200);
  };

  const handleBackToRoom = () => {
    if (currentMessage) return;
    setIsTransitioning(true);
    setIsBlackout(true); // 暗転開始

    setTimeout(() => {
      setBgImage('/scene/room_tv.png');
      setIsBlackout(false);
    }, 300);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  // --- Dialogue Typing Effect ---
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
    }, 25); // 1文字25msで一文字ずつ流す

    return () => clearInterval(typingTimer.current);
  }, [currentMessage]);

  // --- Keyboard Support for advancing messages ---
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
  const isMoonView = bgImage === '/scene/moon.jpg';

  const isMoonIntroPlaying = isMoonView && !hasSeenMoonIntro;

  return (
    <div className="absolute inset-0 bg-[#030712] z-50 overflow-hidden select-none font-orbitron">
      {/* Background image (room_tv.png or moon.jpg) */}
      <img
        src={bgImage}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 transition-all duration-700"
      />

      {/* Full Screen Item Image Overlay */}
      {fullScreenItemImage && (
        <img
          src={fullScreenItemImage}
          alt="item fullscreen"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-10 animate-fadeIn"
        />
      )}

      {/* Blackout overlay for cinematic transition */}
      <div
        className={`absolute inset-0 bg-black z-40 pointer-events-none transition-opacity duration-300 ${isBlackout ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* New Collection Target UI */}
      {!isMoonIntroPlaying && (
        <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
          <div id="info-collection-target" className="w-12 h-12 bg-gray-900/50 backdrop-blur-sm rounded-full shadow flex items-center justify-center border border-white/10">
            <FileText className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
      )}

      {/* Header Info Overlay */}
      {!isMoonIntroPlaying && (
        <div className="absolute top-8 left-8 z-20 pointer-events-none flex flex-col gap-12">
          <div className="bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow w-max">
            <h2 className="text-sm font-light text-white/90 tracking-[0.2em] flex items-center gap-3 font-noto">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
              {isMoonView ? '窓の外' : '朔良の部屋'}
            </h2>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm px-6 py-5 rounded-md shadow flex flex-col gap-3.5 w-max">
            <div id="info-artificial_moon" className={`text-sm font-noto tracking-wider flex items-center gap-3 transition-all duration-500 ${visuallyVisited.artificial_moon ? 'text-white/40 line-through' : 'text-white/90'}`}>
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${visuallyVisited.artificial_moon ? 'bg-white/40' : 'bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`} />
              カーテンを開ける
            </div>
            <div id="info-tv" className={`text-sm font-noto tracking-wider flex items-center gap-3 transition-all duration-500 ${visuallyVisited.tv ? 'text-white/40 line-through' : 'text-white/90'}`}>
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${visuallyVisited.tv ? 'bg-white/40' : 'bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`} />
              テレビを消す
            </div>
            <div id="info-bookshelf" className={`text-sm font-noto tracking-wider flex items-center gap-3 transition-all duration-500 ${visuallyVisited.bookshelf ? 'text-white/40 line-through' : 'text-white/90'}`}>
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${visuallyVisited.bookshelf ? 'bg-white/40' : 'bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`} />
              カバンに教科書を入れる
            </div>
          </div>
        </div>
      )}

      {/* Spots visible in Living Room Room View */}
      {!isMoonView ? (
        <div key="living-room-container" className="absolute inset-0">
          {/* Object 1: TV */}
          <button
            key="spot-tv"
            onClick={(e) => handleSelectObject('tv', e)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center w-12 h-12"
            style={{ top: '38%', left: '82%' }}
          >
            {visited.tv ? (
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white/40 opacity-60"></span>
                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-black/40 opacity-40 delay-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] opacity-90 border border-black/20"></span>
              </>
            )}
          </button>



          {/* Object 3: Bookshelf */}
          <button
            key="spot-bookshelf"
            onClick={(e) => handleSelectObject('bookshelf', e)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center w-12 h-12"
            style={{ top: '58%', left: '93%' }}
          >
            {visited.bookshelf ? (
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white/40 opacity-60"></span>
                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-black/40 opacity-40 delay-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] opacity-90 border border-black/20"></span>
              </>
            )}
          </button>

          {/* Object 4: Window (Interact to switch view) */}
          <button
            key="spot-window"
            onClick={(e) => handleOpenWindow(e)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex flex-col items-center justify-center w-16 h-16"
            style={{ top: '25%', left: '68%' }}
          >
            {visited.artificial_moon ? (
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-white/40 opacity-60"></span>
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-black/40 opacity-40 delay-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] opacity-90 border border-black/20"></span>
              </>
            )}
          </button>


        </div>
      ) : (
        <div key="moon-view-container" className="absolute inset-0">
          {/* Back to Room Button */}
          {!isMoonIntroPlaying && (
            <button
              key="btn-back-to-room"
              onClick={handleBackToRoom}
              className="absolute bottom-8 left-28 bg-gray-900/50 backdrop-blur-sm px-5 py-3 rounded-md shadow text-white/80 hover:text-white hover:bg-gray-800/60 transition-all text-sm font-light tracking-[0.2em] font-noto z-20 flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              部屋に戻る
            </button>
          )}
        </div>
      )}

      {/* Simple Close Button in Bottom-Right */}
      {!isMoonIntroPlaying && totalVisited === 3 && (
        <button
          onClick={handleFinishSearch}
          className="absolute bottom-8 right-8 bg-gray-900/50 backdrop-blur-sm px-5 py-3 rounded shadow text-white/80 hover:text-white hover:bg-gray-800/60 transition-all text-sm font-light tracking-[0.2em] font-noto z-20 flex items-center gap-2"
        >
          家を出る
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Information Particles */}
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
          className="absolute inset-0 z-40"
          onClick={handleNextMessage}
        />
      )}

      {/* --- Game Main Dialogue Box style Overlay (本編同様のメッセージウィンドウ) --- */}
      {currentMessage && (
        <div
          onClick={handleNextMessage}
          className="absolute inset-x-0 bottom-0 z-50 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-32 pb-12 px-12 md:px-32 cursor-pointer animate-slideUp"
        >
          {/* Speaker name or Header */}
          {currentMessage.role === 'sakura' ? (
            <div className="flex items-center gap-3 mb-4 select-none">
              <span className="text-white/90 text-lg md:text-xl font-light tracking-[0.2em]">
                朔良
              </span>
              <span className="text-white/30 text-xs font-orbitron tracking-[0.2em] uppercase">
                SAKURA
              </span>
            </div>
          ) : currentMessage.role === 'info' ? (
            <div className="flex items-center gap-3 mb-4 select-none">
              {currentMessage.icon && React.createElement(currentMessage.icon, { className: 'w-5 h-5 text-gray-400' })}
              <span className="text-gray-300 text-lg md:text-xl font-light tracking-[0.2em]">
                {currentMessage.speaker}
              </span>
            </div>
          ) : currentMessage.role === 'system' ? (
            <div className="flex items-center gap-3 mb-4 select-none">
              <span className="text-cyan-400/90 text-lg md:text-xl font-orbitron tracking-[0.2em] uppercase">
                SYSTEM
              </span>
            </div>
          ) : null}

          {/* Line between speaker and text */}
          <div className="w-full h-px bg-white/20 mb-6 select-none" />

          {/* Text content with cursor indicator */}
          <div className="min-h-[100px] flex items-start">
            {currentMessage.role === 'system' ? (
              <p className="text-cyan-200/90 text-lg md:text-xl leading-[2.2] font-light tracking-[0.2em] whitespace-pre-line flex items-center gap-3">
                <Check className="w-6 h-6 text-cyan-400" />
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-[2px] h-5 bg-cyan-400/80 ml-2 align-middle animate-pulse" />
                )}
              </p>
            ) : (
              <p className="text-gray-200 text-lg md:text-xl leading-[2.2] font-light tracking-[0.2em] whitespace-pre-line">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-[2px] h-5 bg-white/80 ml-2 align-middle animate-pulse" />
                )}
              </p>
            )}
          </div>

          {/* Next Indicator */}
          {!isTyping && (
            <div className="absolute bottom-8 right-12 md:right-32 animate-pulse">
              <ChevronRight size={24} className="text-white/40" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
