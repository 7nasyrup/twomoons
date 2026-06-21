import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Heart } from 'lucide-react';

const CHAR_DATA = {
  mutsunori: {
    name: '睦典',
    englishName: 'MUTSUNORI',
    image: '/illust/Mutsunori_default.webp',
    color: '#bc84ee', // Purple
    dialogue: `「あ、朔良！ちょうど新メニューの試作スープについて考えててさ。
……あ、危ないから、この鍋には触っちゃダメだよ？ 
今、僕の『手元』は……触れたものすべてを、一瞬で消炭にできるほど熱いから……。
……なんてね！ あはは、火傷しちゃうからさ。僕の隣で大人しく待ってて？」`,
    // Layout configurations for natural depth positioning
    style: {
      left: '20%',
      bottom: '-15%',
      scale: 2.30,
      zIndex: 10
    }
  },
  mika: {
    name: 'ミカ',
    englishName: 'MIKA',
    image: '/illust/Mika_default.webp',
    color: '#ff758f', // Pink
    dialogue: `「せんぱ〜い！僕に話しかけてくれるなんて、やっぱり運命ですね！
ねぇ、先輩の目には、今の僕がどんな風に映ってますか？
……僕の本当の姿、本当の『声』がどんなに醜くておぞましくても、
先輩だけは、僕のことを見失わないで、優しく抱きしめてくれますよね……？」`,
    style: {
      left: '2%',
      bottom: '20%', // Slightly shifted back for depth
      scale: 1.35,
      zIndex: 5
    }
  },
  nagisa: {
    name: '凪砂',
    englishName: 'NAGISA',
    image: '/illust/Nagisa_default.webp',
    color: '#4cc9f0', // Cyan
    dialogue: `「……君か。不意に声をかけられると、視界の因果律が狂う.
だが……不思議だな。君の隣にいるときだけは、私の脳を刺す
数秒先の不吉な未来の映像が……すべて静かに消え去る。
お願いだ、もう少しだけそばに。君の『無能力』で、私の痛みを中和してくれ……」`,
    style: {
      left: '48%',
      bottom: '2%',
      scale: 1.65,
      zIndex: 8
    }
  },
  akane: {
    name: 'アカネ',
    englishName: 'AKANE',
    image: '/illust/Akane_default.webp',
    color: '#ffb703', // Yellow/Gold
    dialogue: `「……俺に用か。……怪我はないな？
お前の周囲の重力が、僅かに乱れているのを感じた。
心配するな。お前に近づくすべての悪意、銃弾、人工月の有害な光さえ、
俺のこの手で、空間ごとねじ伏せて、すべて無に還してやる……」`,
    style: {
      left: '75%',
      bottom: '25%', // Right-most, slightly forward
      scale: 1.25,
      zIndex: 12
    }
  }
};

export default function TapCommunication({ onComplete }) {
  const [talkCount, setTalkCount] = useState(3);
  const [activeCharKey, setActiveCharKey] = useState(null);
  const [scores, setScores] = useState({
    mutsunori: 30,
    mika: 35,
    nagisa: 40,
    akane: 25
  });
  const [showResult, setShowResult] = useState(false);
  const [hoveredChar, setHoveredChar] = useState(null);

  const handleSelectChar = (key) => {
    if (talkCount <= 0 && !activeCharKey) return;
    setActiveCharKey(key);
  };

  const handleCloseDialogue = () => {
    if (!activeCharKey) return;

    const key = activeCharKey;
    setScores(prev => ({
      ...prev,
      [key]: Math.min(100, prev[key] + 20)
    }));
    
    setTalkCount(prev => {
      const nextCount = prev - 1;
      if (nextCount <= 0) {
        setTimeout(() => {
          setShowResult(true);
        }, 800);
      }
      return nextCount;
    });

    setActiveCharKey(null);
  };

  const handleFinish = () => {
    onComplete(scores);
  };

  const activeChar = activeCharKey ? CHAR_DATA[activeCharKey] : null;

  return (
    <div className="absolute inset-0 bg-black z-50 overflow-hidden font-orbitron">
      {/* Background image: school.jpg (Full Screen) */}
      <img
        src="/scene/school.jpg"
        alt="school bench bg"
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.2] pointer-events-none select-none z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Small Talk Count Badge (top right) */}
      <div className="absolute top-4 right-4 bg-black/80 border border-white/20 px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-2">
        <span className="text-[10px] text-gray-400 tracking-wider font-bold">TALK:</span>
        <span className={`text-sm font-bold font-mono ${talkCount === 0 ? 'text-red-500' : 'text-cyan-400'}`}>
          {talkCount}
        </span>
      </div>

      {/* Main Board - 4 Characters Absolutely Positioned for Depth */}
      <div className="w-full h-full relative z-20 px-4 pb-0 select-none">
        {Object.entries(CHAR_DATA).map(([key, char]) => {
          const isHovered = hoveredChar === key;
          const isFinished = talkCount <= 0;
          const score = scores[key];

          return (
            <div
              key={key}
              className="absolute w-[240px] h-[82%] flex flex-col justify-end items-center transition-all duration-300"
              style={{
                left: char.style.left,
                bottom: char.style.bottom,
                zIndex: isHovered ? 50 : char.style.zIndex
              }}
              onMouseEnter={() => !isFinished && setHoveredChar(key)}
              onMouseLeave={() => setHoveredChar(null)}
            >
              {/* Resonance Score Badge - Anchored relative to the top of the character's standee height to keep it close */}
              <div
                className="absolute flex flex-col items-center transition-all duration-300 z-30"
                style={{ 
                  bottom: `${char.style.scale * 44}%`, // Lowered down to be right above the head of the characters
                  transform: isHovered ? 'translateY(-4px)' : 'none'
                }}
              >
                <div 
                  className="flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-bold font-mono shadow-md"
                  style={{ 
                    borderColor: `${char.color}50`, 
                    backgroundColor: 'rgba(2, 5, 14, 0.85)',
                    color: char.color,
                    boxShadow: isHovered ? `0 0 10px ${char.color}40` : 'none'
                  }}
                >
                  <Heart className="w-3 h-3 fill-current animate-pulse" />
                  {score}%
                </div>
                
                {/* Progress Mini Bar */}
                <div className="w-16 h-0.5 bg-gray-950 rounded-full mt-1 overflow-hidden border border-white/5">
                  <div 
                    className="h-full transition-all duration-500" 
                    style={{ width: `${score}%`, backgroundColor: char.color }}
                  />
                </div>
              </div>

              {/* Character Standee wrapper */}
              <button
                disabled={isFinished}
                onClick={() => handleSelectChar(key)}
                className="w-full h-[78%] relative flex items-end justify-center focus:outline-none transition-all duration-300"
                style={{
                  filter: isFinished 
                    ? 'brightness(0.3) grayscale(0.5)' 
                    : (hoveredChar && !isHovered ? 'brightness(0.5) blur(1px)' : 'brightness(1)')
                }}
              >
                {/* Standing image */}
                <div className="relative w-full h-full pointer-events-none flex items-end justify-center overflow-visible">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="max-h-full object-contain object-bottom transition-transform duration-300 select-none origin-bottom"
                    style={{
                      transform: isHovered ? `scale(${char.style.scale + 0.05})` : `scale(${char.style.scale})`,
                      filter: isHovered ? `drop-shadow(0 0 20px ${char.color}80)` : 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))'
                    }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Dialogue Popup Modal */}
      <AnimatePresence>
        {activeChar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex justify-center items-end p-6 z-40"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-3xl bg-black/95 border-2 rounded-xl p-6 relative shadow-2xl flex flex-col justify-between"
              style={{ borderColor: `${activeChar.color}60` }}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-2 mb-4" style={{ borderColor: `${activeChar.color}20` }}>
                <h3 className="font-bold text-md tracking-wider" style={{ color: activeChar.color }}>
                  {activeChar.name}
                </h3>
                <button
                  onClick={handleCloseDialogue}
                  className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Text Content */}
              <div className="font-noto tracking-wider text-sm text-gray-200 leading-relaxed whitespace-pre-line mb-6 pl-2 border-l-2" style={{ borderColor: activeChar.color }}>
                {activeChar.dialogue}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end">
                <button
                  onClick={handleCloseDialogue}
                  className="px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all rounded text-white cursor-pointer"
                  style={{
                    backgroundColor: activeChar.color,
                    boxShadow: `0 4px 10px ${activeChar.color}40`
                  }}
                >
                  対話を終了する
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result/Final Screen */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-6 z-50"
          >
            <div className="w-full max-w-md border border-white/10 rounded-xl p-8 bg-black/90 relative flex flex-col items-center text-center shadow-2xl">
              <Award className="w-12 h-14 text-cyan-400 mb-4 animate-bounce" />
              
              <h2 className="text-lg font-bold text-cyan-400 tracking-[0.15em] mb-4">
                対話共鳴フェーズ完了
              </h2>

              <p className="text-gray-300 font-noto text-xs leading-relaxed mb-6 max-w-xs">
                メンバーたちとの特別な対話を終えました。<br />
                深まった共鳴は、今後の選択に影響を与えます。
              </p>

              {/* Visualized end resonance statuses */}
              <div className="w-full grid grid-cols-2 gap-4 mb-6">
                {Object.entries(CHAR_DATA).map(([key, char]) => (
                  <div key={key} className="p-3 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center">
                    <span className="text-[11px] font-bold text-gray-300 mb-1">{char.name}</span>
                    <span className="text-sm font-bold font-mono" style={{ color: char.color }}>
                      {scores[key]}%
                    </span>
                    <div className="w-full h-1 bg-gray-950 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full" style={{ width: `${scores[key]}%`, backgroundColor: char.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-500 hover:to-blue-400 text-white font-bold tracking-widest text-xs rounded shadow-md transition-all duration-300"
              >
                本編へ戻る
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
