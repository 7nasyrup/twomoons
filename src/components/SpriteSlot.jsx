import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assetPath } from '../utils/assetPath';

const SPEAKER_CONFIGS = {
  "Mutsunori": {
    folder: "/character/Mutsunori",
    baseFileName: "Mutsunori",
    defaultExpression: "smile",
    positionClass: "left-[5%] w-[45%] h-[95%]"
  },
  "Hirumi": {
    folder: "/character/Hirumi",
    baseFileName: "Hirumi",
    defaultExpression: "smile",
    positionClass: "right-[5%] w-[45%] h-[95%]"
  },
  "Mika": {
    folder: "/character/Mika",
    baseFileName: "Mika",
    defaultExpression: "neutral",
    positionClass: "right-[5%] w-[45%] h-[95%]"
  },
  "Nagisa": {
    folder: "/character/Nagisa",
    baseFileName: "Nagisa",
    defaultExpression: "neutral",
    positionClass: "left-[22%] w-[45%] h-[95%]"
  },
  "Akane": {
    folder: "/character/Akane",
    baseFileName: "Akane",
    defaultExpression: "neutral",
    positionClass: "right-[22%] w-[45%] h-[95%]"
  },
  "Michiru": {
    folder: "/character/Michiru",
    baseFileName: "Michiru",
    defaultExpression: "smile",
    positionClass: "left-[15%] w-[45%] h-[95%]"
  },
  "BlackKnight": {
    folder: "/character/Hirumi",
    baseFileName: "Hirumi",
    defaultExpression: "black_knight",
    positionClass: "right-[15%] w-[45%] h-[95%]"
  }
};

const SPEAKER_TO_ROMAJI = {
  "睦典": "Mutsunori",
  "ヒルミ教授": "Hirumi",
  "ミカ": "Mika",
  "凪砂": "Nagisa",
  "大男": "Akane",
  "アカネ": "Akane",
  "満": "Michiru",
  "黒騎士": "BlackKnight"
};

export default function SpriteSlot({ leftActive, rightActive, focusSlot, currentSpeaker, presentCharacters = [], currentLine, currentStep, scenarioData = [] }) {
  const isTransmission = currentLine?.text?.trim().startsWith('『');

  const resolvedDisplayMap = {};

  presentCharacters.forEach(c => {
    const rawBase = c.split('_')[0];
    const base = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
    if (SPEAKER_CONFIGS[base]) {
      resolvedDisplayMap[base] = c;
    }
  });

  if (Array.isArray(currentLine?.hideIllust)) {
    currentLine.hideIllust.forEach(c => {
      const rawBase = c.split('_')[0];
      const base = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
      delete resolvedDisplayMap[base];
    });
  }

  if (Array.isArray(currentLine?.showIllust)) {
    currentLine.showIllust.forEach(c => {
      const rawBase = c.split('_')[0];
      const base = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
      if (SPEAKER_CONFIGS[base]) {
        resolvedDisplayMap[base] = c;
      }
    });
  }

  if (!isTransmission && currentSpeaker) {
    const rawSpeakerBase = currentSpeaker.split('_')[0];
    const speakerBase = SPEAKER_TO_ROMAJI[rawSpeakerBase] || rawSpeakerBase;
    if (SPEAKER_CONFIGS[speakerBase] && !resolvedDisplayMap[speakerBase]) {
      resolvedDisplayMap[speakerBase] = `${speakerBase}_${SPEAKER_CONFIGS[speakerBase].defaultExpression}`;
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {Object.entries(resolvedDisplayMap).map(([baseCharName, charName]) => {
          let config = SPEAKER_CONFIGS[baseCharName];
          if (!config) return null;

          const underscoreIndex = charName.indexOf('_');
          const expression = underscoreIndex !== -1 ? charName.substring(underscoreIndex + 1) : config.defaultExpression;

          const imagePath = assetPath(`${config.folder}/${config.baseFileName}_${expression}.png`);

          if (baseCharName === "Mika") {
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

          if (baseCharName === "Akane") {
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

          const activeTalker = currentLine?.talker || currentSpeaker;
          let isSpeaker = false;
          if (activeTalker) {
            const rawActiveBase = activeTalker.split('_')[0];
            const activeRomajiBase = SPEAKER_TO_ROMAJI[rawActiveBase] || rawActiveBase;
            isSpeaker = activeRomajiBase === baseCharName;
          }

          if (!isSpeaker && (currentSpeaker === "？？？" || currentSpeaker === "？？?")) {
            const hasDialogue = currentLine?.text && (currentLine.text.includes("「") || currentLine.text.includes("『"));
            if (hasDialogue) {
              const currentScene = currentLine?.scene;
              let hasSpokenInThisScene = false;
              if (Array.isArray(scenarioData) && typeof currentStep === 'number') {
                for (let i = currentStep - 1; i >= 0; i--) {
                  const line = scenarioData[i];
                  if (line?.scene !== currentScene) break;
                  if (line?.speaker) {
                    const lineSpeakerRomaji = SPEAKER_TO_ROMAJI[line.speaker.split('_')[0]] || line.speaker.split('_')[0];
                    if (lineSpeakerRomaji === baseCharName) {
                      hasSpokenInThisScene = true;
                      break;
                    }
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
                style={{ backgroundImage: `url(${assetPath('/character/Mutsunori/Mutsunori_smile.png')})` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="relative w-full h-[90%] overflow-hidden">
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
