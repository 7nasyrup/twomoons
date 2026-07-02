import React, { useState, useEffect, useRef } from 'react';
import { Tv, BookOpen, FileText, Check, Search, X, ChevronRight } from 'lucide-react';

// --- 部屋の背景に合わせて簡単に位置やサイズを調整できるオブジェクト用のスタイル設定 ---
const ITEM_DECORATIONS = {
  // 新聞紙（souji_shinbunshi.png）のスタイル設定
  souji_shinbunshi: {
    top: '75%',         // Y座標（上からの位置）
    left: '63%',        // X座標（左からの位置）
    width: '64px',      // 横幅
    height: '64px',     // 縦幅
    zIndex: '10'        // 重なりの順序
  },
  // 壁掛けカレンダー（calender_kabekake.png）のスタイル設定
  calender_kabekake: {
    top: '25%',         // Y座標（上からの位置）
    left: '45%',        // X座標（左からの位置）
    width: '70px',      // 横幅
    height: '80px',     // 縦幅
    zIndex: '10'        // 重なりの順序
  }
};

const OBJECT_DETAILS = {
  tv: {
    title: 'テレビ：キメラ襲撃ニュース',
    icon: Tv,
    text: `テレビから深夜のニュースキャスターの声が流れている。
『――昨夜発生した〇〇区での大規模な爆発事故について、防衛局は特殊ガス導管の破損によるものと断定しました』

防衛局は素早い対応で、事故発生から数分で周囲を完全にドーム状の結界で封鎖したという。`,
    dialogue: `「ガス爆発……？ でも、画面の端に映ってるあのクレーター、まるで巨大な獣の爪で引き裂かれたような形をしてる。
防衛局の動きも早すぎる。事故発生から数分で周囲を完全にドーム状の結界で封鎖するなんて、まるで“何か”を外に逃がさないように閉じ込めたみたい……」`,
    pointDesc: '【キメラ襲撃ニュースの矛盾】について学習しました。'
  },
  newspaper: {
    title: '新聞：月波エネルギー50周年特集',
    icon: FileText,
    text: `テーブルの上に置かれた夕刊。人工月のエネルギー供給50周年を祝う華やかな記事が踊る。
しかし、その紙面の隅、小さな週刊コラムに奇妙な記述を見つけた。
『適応不全――月波（げっぱ）を浴びることで発現する異能力だが、その強すぎる力は脳に過負荷をかけ、やがて自我を崩壊させる。この“月波症候群”の進行は、中和の波長を持つ存在が傍にいなければ、防ぐことはできない――』`,
    dialogue: `「異能の力を使うと、頭が壊れていちゃうの……？
だから、みんなあんなに冷たい瞳をしたり、頭痛に耐えるように苦しんでいたのかな……」`,
    pointDesc: '【異能の代償と自我の摩耗】について学習しました。'
  },
  bookshelf: {
    title: '本棚：父の研究ノートのコピー',
    icon: BookOpen,
    text: `古い本棚の奥。お父さんが昔遺していった、擦り切れた研究論文の写しを引っ張り出す。
『――人工の月は、地球の資源を再生する。しかし、その本質は“真実を隠すための巨大な幻影”だ。本物の月は破壊されたのではない。人工月の生み出す強力な中和フィールドによって、時空の裏側に“無効化・封印”されているのだ』`,
    dialogue: `「本物の月は、人工月の裏側で眠っているだけ……？
無効化、フィールド……。もし、私がお父さんから譲り受けたこの“無能力”の体質が、その無効化の鍵を握っているとしたら……？」`,
    pointDesc: '【人工月と無効化の真実】について学習しました。'
  },
  artificial_moon: {
    title: '夜空：妖しく輝く人工月',
    icon: Search,
    text: `窓の外に浮かぶ、冷たく傲慢な青い光を放つ人工の月。
今からちょうど50年前、エネルギー危機の救世主として極秘プロジェクトで打ち上げられたが、その本質は本物の月を覆い隠し、強力な中和フィールドで時空の裏側に無効化・封印するための巨大な幻影装置。
また、人工月の放つ『月波（げっぱ）』は人々に異能をもたらす一方で、適応できずに怪物と化した『キメラ』を生み出し、適応者に対しても自我を崩壊させる『未知の毒』として作用する。`,
    dialogue: `「あのぎらぎらと輝く青い光が、この世界を狂わせている。
お父さんが言っていた『本物の月』は、あの人工月の光のベールの向こうで、私たちが思い出すのを待っているんだ……」`,
    pointDesc: '【人工月と月波の真実】について学習しました。'
  },
  calendar: {
    title: 'カレンダー：書き込まれた記念日',
    icon: BookOpen,
    text: `壁に掛けられたシンプルなカレンダー。
何気なく目をやると、ある特定の日付に、赤いペンで小さく丸印がつけられている。
それは今からちょうど50年前、人工月が軌道に乗せられ、世界に初めて『月波エネルギー』の供給が開始された、新世界の『誕生日』とも言える日だった。

しかしお父さんの古い日記によれば、その日は同時に「本物の月」が空から失われ、人々が月の真実を忘れ始めた『喪失の日』でもあった。`,
    dialogue: `「50年。二つの月が完全に重なり合った狂気の世界に染まって、もうそんなに経つんだ……。
このカレンダーに赤い丸をつけたのは、お父さんなのかな。それとも……」`,
    pointDesc: '【失われた50年の歴史】について学習しました。'
  }
};

export default function SearchAndLearning({ onComplete }) {
  const [visited, setVisited] = useState({ tv: false, newspaper: false, bookshelf: false, artificial_moon: false, calendar: false });
  const [activeObj, setActiveObj] = useState(null);
  const [bgImage, setBgImage] = useState('/scene/room_tv.png');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);

  // --- Dialogue Box UI states (本編同様のメッセージウィンドウ) ---
  const [activeDialogue, setActiveDialogue] = useState(null); // セリフテキスト
  const [displayedDialogue, setDisplayedDialogue] = useState(''); // 一文字ずつ流す用のテキスト
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  const handleSelectObject = (key) => {
    if (isTransitioning || activeDialogue) return;
    setVisited((prev) => ({ ...prev, [key]: true }));
    setActiveObj(key);
  };

  const handleCloseDetail = () => {
    if (activeObj) {
      const dialogueText = OBJECT_DETAILS[activeObj].dialogue;
      setActiveObj(null);
      // 詳細を閉じた直後に、朔良の台詞をメッセージウィンドウで表示開始
      setActiveDialogue(dialogueText);
    }
  };

  const handleNextDialogue = () => {
    if (isTyping) {
      // タイピング中の場合、タイマーを停止して一瞬で全表示する（スキップ）
      clearInterval(typingTimer.current);
      setDisplayedDialogue(activeDialogue);
      setIsTyping(false);
    } else {
      // 読み終わった場合、メッセージウィンドウを閉じる
      setActiveDialogue(null);
      setDisplayedDialogue('');
    }
  };

  const handleFinishSearch = () => {
    const score = Object.values(visited).filter(Boolean).length;
    onComplete(score);
  };

  const handleOpenWindow = () => {
    if (activeDialogue) return;
    setIsTransitioning(true);
    setIsBlackout(true); // 暗転開始

    // 暗転完了タイミング（300ms後）で背景切り替え ＆ フェードアウト開始
    setTimeout(() => {
      setBgImage('/scene/moon.jpg');
      setIsBlackout(false);
    }, 300);

    // 完全に完了したタイミング（700ms後）で操作ガード解除
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const handleBackToRoom = () => {
    if (activeDialogue) return;
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
    if (!activeDialogue) {
      setDisplayedDialogue('');
      setIsTyping(false);
      return;
    }

    clearInterval(typingTimer.current);
    setDisplayedDialogue('');
    setIsTyping(true);
    let currentString = '';

    typingTimer.current = setInterval(() => {
      if (currentString.length < activeDialogue.length) {
        currentString += activeDialogue.charAt(currentString.length);
        setDisplayedDialogue(currentString);
      } else {
        clearInterval(typingTimer.current);
        setDisplayedDialogue(activeDialogue);
        setIsTyping(false);
      }
    }, 25); // 1文字25msで一文字ずつ流す

    return () => clearInterval(typingTimer.current);
  }, [activeDialogue]);

  const totalVisited = Object.values(visited).filter(Boolean).length;
  const isMoonView = bgImage === '/scene/moon.jpg';

  return (
    <div className="absolute inset-0 bg-[#030712] z-50 overflow-hidden select-none font-orbitron">
      {/* Background image (room_tv.png or moon.jpg) */}
      <img
        src={bgImage}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0 transition-all duration-700"
      />

      {/* Blackout overlay for cinematic transition */}
      <div
        className={`absolute inset-0 bg-black z-40 pointer-events-none transition-opacity duration-300 ${isBlackout ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* Header Info Overlay */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow">
        <h2 className="text-sm font-light text-white/90 tracking-[0.2em] flex items-center gap-3 font-noto">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          {isMoonView ? '窓の外：妖しく光る人工の月' : '深夜の自室：世界観探索'}
        </h2>
      </div>
      <div className="absolute top-8 right-8 z-20 pointer-events-none bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow">
        <span className="text-sm font-light text-white/80 font-orbitron tracking-[0.2em]">
          SCAN: {totalVisited} / 5
        </span>
      </div>

      {/* Spots visible in Living Room Room View */}
      {!isMoonView ? (
        <div key="living-room-container" className="absolute inset-0">
          {/* Decorative Items: NO ANIMATIONS, NO INTERACTIONS */}
          {/* 1. 掃除した新聞紙 */}
          <img
            src="/item/souji_shinbunshi.png"
            alt="souji shinbunshi"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              top: ITEM_DECORATIONS.souji_shinbunshi.top,
              left: ITEM_DECORATIONS.souji_shinbunshi.left,
              width: ITEM_DECORATIONS.souji_shinbunshi.width,
              height: ITEM_DECORATIONS.souji_shinbunshi.height,
              zIndex: ITEM_DECORATIONS.souji_shinbunshi.zIndex
            }}
          />

          {/* 2. 壁掛けカレンダー */}
          <img
            src="/item/calender_kabekake.png"
            alt="calender kabekake"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{
              top: ITEM_DECORATIONS.calender_kabekake.top,
              left: ITEM_DECORATIONS.calender_kabekake.left,
              width: ITEM_DECORATIONS.calender_kabekake.width,
              height: ITEM_DECORATIONS.calender_kabekake.height,
              zIndex: ITEM_DECORATIONS.calender_kabekake.zIndex
            }}
          />

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

          {/* Object 2: Newspaper */}
          <button
            key="spot-newspaper"
            onClick={() => handleSelectObject('newspaper')}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center w-12 h-12"
            style={{ top: '75%', left: '63%' }}
          >
            {visited.newspaper ? (
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

          {/* Object 6: Calendar (Superimposed over calender_kabekake image decoration) */}
          <button
            key="spot-calendar"
            onClick={() => handleSelectObject('calendar')}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center w-12 h-12"
            style={{ top: ITEM_DECORATIONS.calender_kabekake.top, left: ITEM_DECORATIONS.calender_kabekake.left }}
          >
            {visited.calendar ? (
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
        </div>
      ) : (
        <div key="moon-view-container" className="absolute inset-0">
          {/* Object 5: Artificial Moon in Moon View */}
          <button
            key="spot-artificial-moon"
            onClick={() => !isTransitioning && handleSelectObject('artificial_moon')}
            disabled={isTransitioning}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex flex-col items-center justify-center w-20 h-20"
            style={{ top: '30%', left: '48%' }}
          >
            {visited.artificial_moon ? (
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-white/30 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-white shadow-[0_0_15px_#ffffff] opacity-90"></span>
              </>
            )}
          </button>

          {/* Back to Room Button */}
          <button
            key="btn-back-to-room"
            onClick={handleBackToRoom}
            className="absolute bottom-8 left-8 bg-gray-900/50 backdrop-blur-sm px-5 py-3 rounded-md shadow text-white/80 hover:text-white hover:bg-gray-800/60 transition-all text-sm font-light tracking-[0.2em] font-noto z-20 flex items-center gap-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            部屋に戻る
          </button>
        </div>
      )}

      {/* Simple Close Button in Bottom-Right */}
      <button
        onClick={handleFinishSearch}
        className="absolute bottom-8 right-8 bg-gray-900/50 backdrop-blur-sm px-5 py-3 rounded shadow text-white/80 hover:text-white hover:bg-gray-800/60 transition-all text-sm font-light tracking-[0.2em] font-noto z-20 flex items-center gap-2"
      >
        {totalVisited === 5 ? '探索を終了する' : '探索を一時終了'}
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Detail Overlay Popup */}
      {activeObj && (
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-6 z-30 animate-fadeIn"
          onClick={handleCloseDetail}
        >
          <div 
            className="w-full max-w-2xl bg-black/80 border border-white/10 p-10 relative flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                {React.createElement(OBJECT_DETAILS[activeObj].icon, { className: 'w-5 h-5 text-gray-400' })}
                <h3 className="text-lg font-light text-white/90 tracking-[0.15em] font-noto">
                  {OBJECT_DETAILS[activeObj].title}
                </h3>
              </div>
            </div>

            {/* Scrollable content body */}
            <div className="flex-1 overflow-y-auto mb-10 text-base text-gray-300 leading-[2.2] font-noto tracking-wider whitespace-pre-line">
              {OBJECT_DETAILS[activeObj].text}
            </div>

            {/* Notification / Learning Badge */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-end gap-4">
              <span className="text-cyan-200/70 text-xs flex items-center gap-2 font-noto tracking-widest">
                <Check className="w-4 h-4" />
                {OBJECT_DETAILS[activeObj].pointDesc}
              </span>
              <button
                onClick={handleCloseDetail}
                className="text-xs text-gray-400 hover:text-white transition-colors tracking-[0.2em] font-noto"
              >
                [ 閉じる ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Game Main Dialogue Box style Overlay (本編同様のメッセージウィンドウ) --- */}
      {activeDialogue && (
        <div
          onClick={handleNextDialogue}
          className="absolute inset-x-0 bottom-0 z-50 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-32 pb-12 px-12 md:px-32 cursor-pointer animate-slideUp"
        >
          {/* Speaker name */}
          <div className="flex items-center gap-3 mb-4 select-none">
            <span className="text-white/90 text-lg md:text-xl font-light tracking-[0.2em]">
              朔良
            </span>
            <span className="text-white/30 text-xs font-orbitron tracking-[0.2em] uppercase">
              SAKURA
            </span>
          </div>

          {/* Line between speaker and text */}
          <div className="w-full h-px bg-white/20 mb-6 select-none" />

          {/* Text content with cursor indicator */}
          <div className="min-h-[100px] flex items-start">
            <p className="text-gray-200 text-lg md:text-xl leading-[2.2] font-light tracking-[0.2em]">
              {displayedDialogue}
              {isTyping && (
                <span className="inline-block w-[2px] h-5 bg-white/80 ml-2 align-middle animate-pulse" />
              )}
            </p>
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
