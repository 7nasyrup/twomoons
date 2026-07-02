import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tv, BookOpen, FileText, Check, Search, X, ChevronRight } from 'lucide-react';


const OBJECT_DETAILS = {
  tv: {
    title: 'ニュースキャスター',
    text: [
      `『――さて、次のニュースです。世界的なエネルギー危機の救世主として、国家規模の極秘プロジェクトによりあの「人工月」が打ち上げられてから、ちょうど50年』`,
      `『今や、我々のあらゆる生活インフラを支える莫大な新エネルギーが、あの美しい青い光から供給され続けています』`,
    ],
    dialogue: `「今年で50年か…人工月打ち上げられてから」`,
    afterText: [
      `世界的なエネルギー危機の救世主として、国家規模の極秘プロジェクトにより打ち上げられたというその人工月は、今や地球のあらゆるインフラを支える莫大な新エネルギーを供給していた。`,
      `けれど、それは決して無償の恵みなどではない。人工月は、地球の生態系をじわじわと侵食する「未知の毒」でもある。`
    ],
  },


  bookshelf: {
    messages: [
      { role: 'narrative', text: `カバンを閉めようとしたとき、机の隅に置かれた、いまはもう私の隣にはいない父との写真が目に留まった。` },
      { role: 'narrative', text: `幼い頃、父は私によく、おとぎ話を聞かせるように月の話を語ってくれた。けれど、ある日を境に父は私の前から突然消えてしまった。` },
      { role: 'sakura', text: `（お父さん……。私はまだ、何も突き止められてないよ）` },
      { role: 'narrative', text: `小さく首を振って思考を振り払い、私はカバンを肩にかけた。` }
    ]
  },
};

export default function SearchAndLearning({ onComplete }) {
  const [visited, setVisited] = useState({ tv: false, newspaper: false, bookshelf: false, artificial_moon: false, calendar: false });
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

  const handleSelectObject = (key) => {
    if (isTransitioning || currentMessage) return;
    setVisited((prev) => ({ ...prev, [key]: true }));

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
      }
    }
  }, [messageQueue, currentMessage, isTyping, bgImage]);

  const handleFinishSearch = () => {
    const score = ['tv', 'bookshelf', 'artificial_moon'].filter(k => visited[k]).length;
    onComplete(score);
  };

  const handleOpenWindow = () => {
    if (currentMessage) return;
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
            <div className={`text-sm font-noto tracking-wider flex items-center gap-3 text-white/90 ${visited.artificial_moon ? 'line-through' : ''}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${visited.artificial_moon ? 'bg-gray-500' : 'bg-white/80'}`} />
              カーテンを開ける
            </div>
            <div className={`text-sm font-noto tracking-wider flex items-center gap-3 text-white/90 ${visited.tv ? 'line-through' : ''}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${visited.tv ? 'bg-gray-500' : 'bg-white/80'}`} />
              テレビを消す
            </div>
            <div className={`text-sm font-noto tracking-wider flex items-center gap-3 text-white/90 ${visited.bookshelf ? 'line-through' : ''}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${visited.bookshelf ? 'bg-gray-500' : 'bg-white/80'}`} />
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
            onClick={() => handleSelectObject('tv')}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center w-12 h-12"
            style={{ top: '38%', left: '82%' }}
          >
            {visited.tv ? (
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white/30 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-[0_0_10px_#ffffff] opacity-80"></span>
              </>
            )}
          </button>



          {/* Object 3: Bookshelf */}
          <button
            key="spot-bookshelf"
            onClick={() => handleSelectObject('bookshelf')}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center w-12 h-12"
            style={{ top: '55%', left: '95%' }}
          >
            {visited.bookshelf ? (
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-white/30 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-[0_0_10px_#ffffff] opacity-80"></span>
              </>
            )}
          </button>

          {/* Object 4: Window (Interact to switch view) */}
          <button
            key="spot-window"
            onClick={handleOpenWindow}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex flex-col items-center justify-center w-16 h-16"
            style={{ top: '30%', left: '60%' }}
          >
            {visited.artificial_moon ? (
              <div className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-white/30 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-white shadow-[0_0_12px_#ffffff] opacity-80"></span>
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
              className="absolute bottom-8 left-8 bg-gray-900/50 backdrop-blur-sm px-5 py-3 rounded-md shadow text-white/80 hover:text-white hover:bg-gray-800/60 transition-all text-sm font-light tracking-[0.2em] font-noto z-20 flex items-center gap-2"
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
