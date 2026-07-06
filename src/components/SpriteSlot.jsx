import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPEAKER_CONFIGS = {
  "睦典": {
    folder: "/character/Mutsunori",
    baseFileName: "Mutsunori",
    defaultExpression: "smile",
    positionClass: "left-[5%] w-[45%] h-[95%]"
  },
  "ヒルミ教授": {
    folder: "/character/Hirumi",
    baseFileName: "Hirumi",
    defaultExpression: "smile",
    positionClass: "right-[5%] w-[45%] h-[95%]"
  },
  "ミカ": {
    folder: "/character/Mika",
    baseFileName: "Mika",
    defaultExpression: "neutral",
    positionClass: "right-[5%] w-[45%] h-[95%]"
  },
  "凪砂": {
    folder: "/character/Nagisa",
    baseFileName: "Nagisa",
    defaultExpression: "neutral",
    positionClass: "left-[22%] w-[45%] h-[95%]"
  },
  "大男": {
    folder: "/character/Akane",
    baseFileName: "Akane",
    defaultExpression: "neutral",
    positionClass: "right-[22%] w-[45%] h-[95%]"
  },
  "アカネ": {
    folder: "/character/Akane",
    baseFileName: "Akane",
    defaultExpression: "neutral",
    positionClass: "right-[22%] w-[45%] h-[95%]"
  },
  "満": {
    folder: "/character/Michiru",
    baseFileName: "Michiru",
    defaultExpression: "smile",
    positionClass: "left-[15%] w-[45%] h-[95%]"
  },
  "黒騎士": {
    folder: "/character/Hirumi",
    baseFileName: "Hirumi",
    defaultExpression: "black_knight",
    positionClass: "right-[15%] w-[45%] h-[95%]"
  }
};

export default function SpriteSlot({ leftActive, rightActive, focusSlot, currentSpeaker, presentCharacters = [], currentLine, currentStep, scenarioData = [] }) {
  const isTransmission = currentLine?.text?.trim().startsWith('『');

  // ─────────────────────────────────────────────────────────────────
  // レンダー時に表示マップを直接計算する（useEffect の遅延を回避）
  //   resolvedDisplayMap: { baseCharName → expressionKey }
  //   例: { "睦典": "睦典_angry", "凪砂": "凪砂" }
  // ─────────────────────────────────────────────────────────────────
  const resolvedDisplayMap = {};

  // 1. presentCharacters（state）をベースに登録
  presentCharacters.forEach(c => {
    const base = c.split('_')[0];
    if (SPEAKER_CONFIGS[base]) {
      resolvedDisplayMap[base] = c;
    }
  });

  // 2. currentLine.hideIllust をレンダー時に即座に反映
  if (Array.isArray(currentLine?.hideIllust)) {
    currentLine.hideIllust.forEach(c => {
      const base = c.split('_')[0];
      delete resolvedDisplayMap[base];
    });
  }

  // 3. currentLine.showIllust をレンダー時に即座に反映（タイミング問題の根本対処）
  if (Array.isArray(currentLine?.showIllust)) {
    currentLine.showIllust.forEach(c => {
      const base = c.split('_')[0];
      if (SPEAKER_CONFIGS[base]) {
        resolvedDisplayMap[base] = c;
      }
    });
  }

  // 4. 現在の発言者をデフォルト表情で自動追加（まだ画面にいない場合のみ）
  if (!isTransmission && currentSpeaker) {
    const speakerBase = currentSpeaker.split('_')[0];
    if (SPEAKER_CONFIGS[speakerBase] && !resolvedDisplayMap[speakerBase]) {
      resolvedDisplayMap[speakerBase] = currentSpeaker;
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Automatic Speaker Sprite Slot */}
      <AnimatePresence>
        {Object.entries(resolvedDisplayMap).map(([baseCharName, charName]) => {
          let config = SPEAKER_CONFIGS[baseCharName];
          if (!config) return null;

          // 表情名をパース（例: "睦典_angry" → expression = "angry"）
          const underscoreIndex = charName.indexOf('_');
          const expression = underscoreIndex !== -1 ? charName.substring(underscoreIndex + 1) : config.defaultExpression;

          // 画像パスを動的に構築
          const imagePath = `${config.folder}/${config.baseFileName}_${expression}.png`;

          // ミカルートでの立ち位置変更
          if (baseCharName === "ミカ") {
            let isMikaRoute = false;
            if (Array.isArray(scenarioData) && typeof currentStep === 'number') {
              for (let i = currentStep; i >= 0; i--) {
                if (scenarioData[i]?.label === "mika_route_start") {
                  isMikaRoute = true;
                  break;
                }
              }
            }
            if (isMikaRoute) {
              config = { ...config, positionClass: "left-[5%] w-[45%] h-[95%]" };
            }
          }

          // アカネルートでの立ち位置変更
          if (baseCharName === "アカネ" || baseCharName === "大男") {
            let isAkaneRoute = false;
            if (Array.isArray(scenarioData) && typeof currentStep === 'number') {
              for (let i = currentStep; i >= 0; i--) {
                if (scenarioData[i]?.label === "akane_route_start") {
                  isAkaneRoute = true;
                  break;
                }
              }
            }
            if (isAkaneRoute) {
              config = { ...config, positionClass: "left-[5%] w-[45%] h-[95%]" };
            }
          }

          // フォーカス判定（発言しているキャラクターを明るく表示）
          const activeTalker = currentLine?.talker || currentSpeaker;
          let isSpeaker = activeTalker === baseCharName ||
            activeTalker === charName ||
            (activeTalker && activeTalker.split('_')[0] === baseCharName);

          // 「？？？」発言者の自動フォーカス判定
          if (!isSpeaker && (currentSpeaker === "？？？" || currentSpeaker === "？？?")) {
            const hasDialogue = currentLine?.text &&
              (currentLine.text.includes("「") || currentLine.text.includes("『"));
            if (hasDialogue) {
              const currentScene = currentLine?.scene;
              let hasSpokenInThisScene = false;
              if (Array.isArray(scenarioData) && typeof currentStep === 'number') {
                for (let i = currentStep - 1; i >= 0; i--) {
                  const line = scenarioData[i];
                  if (line?.scene !== currentScene) break;
                  if (line?.speaker === baseCharName) {
                    hasSpokenInThisScene = true;
                    break;
                  }
                }
              }
              if (!hasSpokenInThisScene) {
                isSpeaker = true;
              }
            }
          }

          return (
            <motion.div
              key={baseCharName}
              className={`absolute bottom-[-50px] flex flex-col justify-end items-center ${config.positionClass}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1.0,
                filter: isSpeaker ? "brightness(1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))" : "brightness(0.4) drop-shadow(0 5px 10px rgba(0,0,0,0.3))",
                zIndex: isSpeaker ? 20 : 10
              }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="relative w-full h-full">
                <img
                  src={imagePath}
                  alt={baseCharName}
                  className="w-full h-full object-contain object-bottom"
                  style={{ transition: 'opacity 0.25s ease' }}
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
            <div className="relative w-full h-full">
              <div
                id="char-left-img"
                className="absolute inset-0 w-full h-full bg-contain bg-top bg-no-repeat transition-all duration-300"
                style={{ backgroundImage: 'url(/character/Mutsunori/Mutsunori_smile.png)' }}
              />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
