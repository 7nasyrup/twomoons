import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPEAKER_CONFIGS = {
  "睦典": {
    path: "/illust/Mutsunori_default.webp",
    positionClass: "left-[5%] w-[45%] h-[95%]"
  },
  "ミカ": {
    path: "/illust/Mika_default.webp",
    positionClass: "right-[5%] w-[45%] h-[95%]"
  },
  "凪砂": {
    path: "/illust/Nagisa_default.webp",
    positionClass: "left-[22%] w-[45%] h-[95%]"
  },
  "大男": {
    path: "/illust/Akane_default.webp",
    positionClass: "right-[22%] w-[45%] h-[95%]"
  }
};

export default function SpriteSlot({ leftActive, rightActive, focusSlot, currentSpeaker, presentCharacters = [], currentLine }) {
  // 表示対象の全キャラクター名（累積表示メンバー ＋ 現在の発言者。重複排除）
  const displayList = Array.from(new Set([
    ...presentCharacters,
    ...(SPEAKER_CONFIGS[currentSpeaker] ? [currentSpeaker] : [])
  ]));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Automatic Speaker Sprite Slot */}
      <AnimatePresence>
        {displayList.map((charName) => {
          const config = SPEAKER_CONFIGS[charName];
          if (!config) return null;

          // 基本判定：現在の発言者とキャラクター名が一致している場合
          // シナリオ側で talker: "キャラクター名" が明示的に指定されている場合は、それを優先して明るく（フォーカス）します。
          // これにより、speaker: "？？？" のように名前を伏せつつ特定の立ち絵を明るくしたり、
          // 別のキャラのセリフの際に画面上のキャラが誤って明るくなるのを100%防げます。
          const activeTalker = currentLine?.talker || currentSpeaker;
          const isSpeaker = activeTalker === charName;

          return (
            <motion.div
              key={charName}
              className={`absolute bottom-[-50px] flex flex-col justify-end items-center ${config.positionClass}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1.0, // サイズの拡大縮小は行わず等倍で表示
                filter: isSpeaker ? "brightness(1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))" : "brightness(0.4) drop-shadow(0 5px 10px rgba(0,0,0,0.3))",
                zIndex: isSpeaker ? 20 : 10
              }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="relative w-full h-full">
                <img
                  src={config.path}
                  alt={charName}
                  className="w-full h-full object-contain object-bottom transition-all duration-300"
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Left Slot: Mutsunori (Purple) */}
      <AnimatePresence>
        {leftActive && (
          <motion.div
            className={`absolute bottom-[-250px] left-0 right-0 mx-auto w-[55%] h-[105%] flex flex-col justify-end items-center transition-all duration-500
                  ${focusSlot === 'right' ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          >
            {/* Silhouette box */}
            <div className="relative w-full h-full">
              {/* Dynamic Image Layer (allows setting bg image from code/DOM) */}
              <div
                id="char-left-img"
                className="absolute inset-0 w-full h-full bg-contain bg-top bg-no-repeat transition-all duration-300"
                style={{ backgroundImage: 'url(/illust/Mutsunori_default.webp)' }}
              />
            </div>
            {/* Tag */}
            <div className="bg-black/80 border border-[#bc84ee]/40 text-[#bc84ee] font-orbitron text-[10px] px-4 py-0.5 rounded-sm mt-1.5 tracking-widest uppercase">
              MUTSUNORI
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Slot: Prof. Hirumi (Cyan) */}
      <AnimatePresence>
        {rightActive && (
          <motion.div
            className={`absolute bottom-0 right-[6%] w-[30%] h-[82%] flex flex-col justify-end items-center transition-all duration-500
                  ${focusSlot === 'left' ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          >
            {/* Silhouette box */}
            <div className="relative w-full h-[90%] overflow-hidden">
              {/* Dynamic Image Layer */}
              <div
                id="char-right-img"
                className="absolute inset-0 w-full h-full bg-contain bg-bottom bg-no-repeat transition-all duration-300"
              />
            </div>
            {/* Tag */}
            <div className="bg-black/80 border border-[#48cae4]/40 text-[#48cae4] font-orbitron text-[10px] px-4 py-0.5 rounded-sm mt-1.5 tracking-widest uppercase">
              PROF. HIRUMI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
