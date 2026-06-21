import React, { useState } from 'react';
import { Tv, BookOpen, FileText, Check, Search, X } from 'lucide-react';

const OBJECT_DETAILS = {
  tv: {
    title: 'テレビ：キメラ襲撃ニュース',
    icon: Tv,
    text: `テレビから深夜のニュースキャスターの声が流れている。
『――昨夜発生した〇〇区での大規模な爆発事故について、防衛局は特殊ガス導管の破損によるものと断定しました』

朔良：「ガス爆発……？ でも、画面の端に映ってるあのクレーター、まるで巨大な獣の爪で引き裂かれたような形をしてる。
防衛局の動きも早すぎる。事故発生から数分で周囲を完全にドーム状の結界で封鎖するなんて、まるで“何か”を外に逃がさないように閉じ込めたみたい……」`,
    pointDesc: '【キメラ襲撃ニュースの矛盾】について学習しました。'
  },
  newspaper: {
    title: '新聞：月波エネルギー50周年特集',
    icon: FileText,
    text: `テーブルの上に置かれた夕刊。人工月のエネルギー供給50周年を祝う華やかな記事が踊る。
しかし、その紙面の隅、小さな週刊コラムに奇妙な記述を見つけた。
『適応不全――月波（げっぱ）を浴びることで発現する異能力だが、その強すぎる力は脳に過負荷をかけ、やがて自我を崩壊させる。この“月波症候群”の進行は、中和の波長を持つ存在が傍にいなければ、防ぐことはできない――』

朔良：「異能の力を使うと、頭が壊れていっちゃうの……？
だから、みんなあんなに冷たい瞳をしたり、頭痛に耐えるように苦しんでいたのかな……」`,
    pointDesc: '【異能の代償と自我の摩耗】について学習しました。'
  },
  bookshelf: {
    title: '本棚：父の研究ノートのコピー',
    icon: BookOpen,
    text: `古い本棚の奥。お父さんが昔遺していった、擦り切れた研究論文の写しを引っ張り出す。
『――人工の月は、地球の資源を再生する。しかし、その本質は“真実を隠すための巨大な幻影”だ。本物の月は破壊されたのではない。人工月の生み出す強力な中和フィールドによって、時空の裏側に“無効化・封印”されているのだ』

朔良：「本物の月は、人工月の裏側で眠っているだけ……？
無効化、フィールド……。もし、私がお父さんから譲り受けたこの“無能力”の体質が、その無効化の鍵を握っているとしたら……？」`,
    pointDesc: '【人工月と無効化の真実】について学習しました。'
  }
};

export default function SearchAndLearning({ onComplete }) {
  const [visited, setVisited] = useState({ tv: false, newspaper: false, bookshelf: false });
  const [activeObj, setActiveObj] = useState(null);

  const handleSelectObject = (key) => {
    setVisited((prev) => ({ ...prev, [key]: true }));
    setActiveObj(key);
  };

  const handleCloseDetail = () => {
    setActiveObj(null);
  };

  const handleFinishSearch = () => {
    const score = Object.values(visited).filter(Boolean).length;
    onComplete(score);
  };

  const totalVisited = Object.values(visited).filter(Boolean).length;

  return (
    <div className="absolute inset-0 bg-[#030712] z-50 overflow-hidden select-none font-orbitron">
      {/* Background image: room.jpg (Full Screen) */}
      <img
        src="/scene/room.jpg"
        alt="room bg"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />

      {/* Header Info Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 border-b border-cyan-500/20 pb-2">
        <h2 className="text-sm font-bold text-cyan-400 tracking-[0.15em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          深夜の自室：世界観探索
        </h2>
        <span className="text-xs font-bold text-cyan-400 font-mono">
          SCAN: {totalVisited} / 3
        </span>
      </div>

      {/* Object 1: TV Hatena */}
      <button
        onClick={() => handleSelectObject('tv')}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20"
        style={{ top: '38%', left: '25%' }}
      >
        <div className="relative">
          <img 
            src="/scene/hatena.png" 
            alt="?" 
            className={`w-16 h-16 object-contain ${visited.tv ? 'opacity-40 grayscale' : 'animate-bounce'}`} 
          />
          {visited.tv && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 text-[8px] z-10">
              <Check className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </button>

      {/* Object 2: Newspaper Hatena */}
      <button
        onClick={() => handleSelectObject('newspaper')}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20"
        style={{ top: '68%', left: '50%' }}
      >
        <div className="relative">
          <img 
            src="/scene/hatena.png" 
            alt="?" 
            className={`w-16 h-16 object-contain ${visited.newspaper ? 'opacity-40 grayscale' : 'animate-bounce'}`} 
          />
          {visited.newspaper && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 text-[8px] z-10">
              <Check className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </button>

      {/* Object 3: Bookshelf Hatena */}
      <button
        onClick={() => handleSelectObject('bookshelf')}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20"
        style={{ top: '42%', left: '75%' }}
      >
        <div className="relative">
          <img 
            src="/scene/hatena.png" 
            alt="?" 
            className={`w-16 h-16 object-contain ${visited.bookshelf ? 'opacity-40 grayscale' : 'animate-bounce'}`} 
          />
          {visited.bookshelf && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 text-[8px] z-10">
              <Check className="w-2.5 h-2.5" />
            </span>
          )}
        </div>
      </button>

      {/* Extremely Simple Close Button in Bottom-Right */}
      <button
        onClick={handleFinishSearch}
        className="absolute bottom-6 right-6 px-6 py-2.5 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all text-xs font-bold rounded tracking-widest z-20"
      >
        {totalVisited === 3 ? '探索を終了する' : '探索を一時終了'}
      </button>

      {/* Detail Overlay Popup */}
      {activeObj && (
        <div className="absolute inset-0 bg-black/90 flex justify-center items-center p-6 z-30 animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#02050e] border-2 border-cyan-500/40 rounded-xl p-6 relative flex flex-col h-[70vh] shadow-[0_0_50px_rgba(0,245,255,0.1)]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-cyan-500/20 pb-4 mb-4">
              <div className="flex items-center gap-2">
                {React.createElement(OBJECT_DETAILS[activeObj].icon, { className: 'w-6 h-6 text-cyan-400' })}
                <h3 className="font-bold text-lg text-cyan-400 tracking-wider">
                  {OBJECT_DETAILS[activeObj].title}
                </h3>
              </div>
              <button 
                onClick={handleCloseDetail}
                className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content body */}
            <div className="flex-1 overflow-y-auto mb-6 text-sm text-gray-300 leading-relaxed font-noto tracking-wider pr-2 whitespace-pre-line">
              {OBJECT_DETAILS[activeObj].text}
            </div>

            {/* Notification / Learning Badge */}
            <div className="border-t border-cyan-500/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
              <span className="text-green-400 flex items-center gap-1.5 font-bold tracking-widest font-noto">
                <Check className="w-4 h-4 text-green-400" />
                {OBJECT_DETAILS[activeObj].pointDesc}
              </span>
              <button
                onClick={handleCloseDetail}
                className="px-6 py-2 bg-cyan-500 border border-cyan-400 text-white font-bold tracking-widest uppercase hover:bg-cyan-400 transition-all rounded w-full sm:w-auto text-center"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
