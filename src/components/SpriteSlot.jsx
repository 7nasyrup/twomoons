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
  },
  "bk": {
    folder: "/character/Hirumi",
    baseFileName: "bk",
    defaultExpression: "neutral",
    positionClass: "right-[15%] w-[45%] h-[95%]"
  },
  "bl": {
    folder: "/character/Hirumi",
    baseFileName: "bl",
    defaultExpression: "komari",
    positionClass: "right-[15%] w-[45%] h-[95%]"
  },
  "Ruki": {
    folder: "/character/Ruki",
    baseFileName: "Ruki",
    defaultExpression: "neutral",
    positionClass: "left-[35%] w-[45%] h-[95%]"
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
  "黒騎士": "BlackKnight",
  "ルキ": "Ruki",
  "少年": "Ruki"
};

export default function SpriteSlot({ leftActive, rightActive, focusSlot, currentSpeaker, presentCharacters = [], currentLine, currentStep, scenarioData = [], isPhoneCallRight }) {
  const isTransmission = currentLine?.text?.trim().startsWith('『');

  const resolvedDisplayMap = {};

  presentCharacters.forEach(c => {
    const rawBase = c.split('_')[0];
    const base = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
    resolvedDisplayMap[base] = c;
  });

  if (Array.isArray(currentLine?.hideIllust)) {
    currentLine.hideIllust.forEach(c => {
      const rawBase = c.split('_')[0];
      const base = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
      delete resolvedDisplayMap[base];
    });
  }

  if (Array.isArray(currentLine?.showIllust)) {
    currentLine.showIllust.forEach(charRaw => {
      let c = charRaw;
      const match = charRaw.match(/^(.+?_bake\d)([1-6])$/) || charRaw.match(/^((?!.*_bake\d$).+?)([1-6])$/);
      if (match) {
        c = match[1];
      }
      const rawBase = c.split('_')[0];
      const base = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
      resolvedDisplayMap[base] = c;
    });
  }

  const effectiveScene = currentLine?.scene || (Array.isArray(scenarioData) && typeof currentStep === 'number' && currentStep > 0 ? scenarioData[currentStep - 1]?.scene : '');

  const orderedCharacters = Object.keys(resolvedDisplayMap);

  return (
    <div className="absolute inset-0 pointer-events-none z-[12]">
      <AnimatePresence>
        {orderedCharacters.map((baseCharName) => {
          const charState = resolvedDisplayMap[baseCharName];
          let config = SPEAKER_CONFIGS[baseCharName];
          if (!config) {
            config = {
              folder: "/character",
              baseFileName: baseCharName,
              defaultExpression: "",
              positionClass: "left-[27.5%] w-[45%] h-[95%]" // center
            };
          }

          let expression = config.defaultExpression;
          if (charState && charState.includes('_')) {
            expression = charState.split('_').slice(1).join('_');
            if (expression.match(/^[a-zA-Z]+[0-9]+$/) && !expression.startsWith('bake')) {
              const match = expression.match(/^([a-zA-Z]+)([0-9]+)$/);
              if (match) {
                expression = match[1];
              }
            }
          }

          let posIndex = null;

          const getForcedPos = (charRaw) => {
            const match = charRaw.match(/^(.+?_bake\d)([1-6])$/) || charRaw.match(/^((?!.*_bake\d$).+?)([1-6])$/);
            if (match) return parseInt(match[2], 10);
            return null;
          };

          const getBaseName = (charRaw) => {
            let c = charRaw;
            const match = charRaw.match(/^(.+?_bake\d)([1-6])$/) || charRaw.match(/^((?!.*_bake\d$).+?)([1-6])$/);
            if (match) c = match[1];
            const rawBase = c.split('_')[0];
            return SPEAKER_TO_ROMAJI[rawBase] || rawBase;
          };

          if (Array.isArray(currentLine?.showIllust)) {
            for (const charRaw of currentLine.showIllust) {
              if (getBaseName(charRaw) === baseCharName) {
                const p = getForcedPos(charRaw);
                if (p) posIndex = p;
              }
            }
          }

          if (!posIndex && Array.isArray(scenarioData) && typeof currentStep === 'number') {
            for (let i = currentStep - 1; i >= 0; i--) {
              const prevLine = scenarioData[i];
              if (Array.isArray(prevLine?.showIllust)) {
                let foundPos = null;
                for (const charRaw of prevLine.showIllust) {
                  if (getBaseName(charRaw) === baseCharName) {
                    const p = getForcedPos(charRaw);
                    if (p) foundPos = p;
                  }
                }
                if (foundPos) {
                  posIndex = foundPos;
                  break;
                }
              }
            }
          }

          let pos = null;
          if (typeof posIndex === 'number') {
            const POS_MAP = ['left', 'center-left', 'center', 'center-right', 'right', 'center-close'];
            pos = POS_MAP[posIndex - 1];
          }

          let imagePath = assetPath(`${config.folder}/${config.baseFileName}${expression ? `_${expression}` : ''}.png`);
          if (baseCharName === "BlackKnight") {
            if (expression === "attack") {
              imagePath = assetPath(`${config.folder}/BlackKnight_attack.png`);
            } else {
              imagePath = assetPath(`${config.folder}/BlackKnight.png`);
            }
          }

          let currentRoute = null;
          if (Array.isArray(scenarioData) && typeof currentStep === 'number') {
            for (let i = currentStep; i >= 0; i--) {
              const label = scenarioData[i]?.label;
              if (label && label.endsWith('_route_start')) {
                currentRoute = label;
                break;
              }
            }
          }

          if (baseCharName === "Mika") {
            if (currentRoute === "mika_route_start") {
              config = { ...config, positionClass: "left-[5%] w-[45%] h-[95%]" };
            } else if (resolvedDisplayMap["Hirumi"]) {
              config = { ...config, positionClass: "right-[25%] w-[45%] h-[95%]" };
            }
          }

          if (baseCharName === "Akane") {
            if (currentRoute === "akane_route_start") {
              config = { ...config, positionClass: "left-[5%] w-[45%] h-[95%]" };
            }
          }

          if (isPhoneCallRight && baseCharName === "Hirumi") {
            config = { ...config, positionClass: "right-[-2%] w-[45%] h-[95%]" };
          }

          if (isPhoneCallRight && baseCharName !== "Hirumi") {
            if (baseCharName === "Mutsunori") {
              config = { ...config, positionClass: "left-[-10%] w-[45%] h-[95%]" };
            } else if (baseCharName === "Nagisa" || baseCharName === "Michiru" || baseCharName === "Akane") {
              config = { ...config, positionClass: "left-[8%] w-[45%] h-[95%]" };
            } else if (baseCharName === "Mika" || baseCharName === "Ruki") {
              config = { ...config, positionClass: "left-[26%] w-[45%] h-[95%]" };
            }
          }



          // Position map: divide screen into 5 equal slots (each ~20% wide, sprite is 45% wide)
          // Slots are centered at: 10%, 30%, 50%, 70%, 90% of screen
          // Since sprite is 45% wide, left edge = center - 22.5%
          const positionStyleMap = {
            'left': { left: '-7.5%' },   // center 15% → left = -7.5%
            'center-left': { left: '10%' },     // center 32.5% → left = 10%
            'center': { left: '27.5%' },   // center 50% → left = 27.5%
            'center-close': { left: '27.5%', scale: 1.6, y: '10%' }, // center 50% but zoomed in
            'center-right': { left: '45%' },     // center 67.5% → left = 45%
            'right': { left: '62.5%' },   // center 85% → left = 62.5%
          };

          let overrideStyle = null;
          if (pos && positionStyleMap[pos]) {
            overrideStyle = positionStyleMap[pos];
          }

          const activeTalker = currentLine?.talker || currentSpeaker;
          let isSpeaker = false;
          if (activeTalker) {
            const rawActiveBase = activeTalker.split('_')[0];
            const activeRomajiBase = SPEAKER_TO_ROMAJI[rawActiveBase] || rawActiveBase;
            isSpeaker = activeRomajiBase === baseCharName;
            
            // Special cases where multiple sprite prefixes map to the same speaker
            if (activeRomajiBase === "Hirumi" && (baseCharName === "bk" || baseCharName === "bl" || baseCharName === "BlackKnight")) {
              isSpeaker = true;
            }
          }

          if (!isSpeaker && (currentSpeaker === "？？？" || currentSpeaker === "？？?")) {
            const hasDialogue = currentLine?.text && (currentLine.text.includes("「") || currentLine.text.includes("『"));
            if (hasDialogue) {
              let hasSpokenInThisScene = false;
              if (Array.isArray(scenarioData) && typeof currentStep === 'number') {
                for (let i = currentStep - 1; i >= 0; i--) {
                  const line = scenarioData[i];
                  if (line?.scene && line.scene !== effectiveScene) break;
                  if (line?.speaker) {
                    const lineSpeakerRomaji = SPEAKER_TO_ROMAJI[line.speaker.split('_')[0]] || line.speaker.split('_')[0];
                    if (lineSpeakerRomaji === baseCharName) {
                      hasSpokenInThisScene = true;
                      break;
                    }
                  }
                }
              }
              const isMonster = baseCharName.toLowerCase().includes('kimera') || baseCharName.toLowerCase().includes('blackknight') || baseCharName.toLowerCase().includes('machine');
              if (!hasSpokenInThisScene && !isMonster) {
                isSpeaker = true;
              }
            }
          }

          const positionStyles = overrideStyle ? overrideStyle : (() => {
            // Parse positionClass from config to inline style as fallback
            const pc = config.positionClass;
            const leftMatch = pc.match(/left-\[([^\]]+)\]/);
            const rightMatch = pc.match(/right-\[([^\]]+)\]/);

            if (leftMatch) return { left: leftMatch[1] };
            if (rightMatch) {
              const rVal = rightMatch[1];
              if (rVal.endsWith('%')) {
                const num = parseFloat(rVal);
                return { left: `${55 - num}%` }; // 100% - 45%(width) - right
              }
              return { right: rVal };
            }
            return {};
          })();

          const isKimera = baseCharName.toLowerCase().includes('kimera');
          const isMachine = baseCharName.toLowerCase().includes('machine');

          const { scale: posScale, y: posY, ...layoutStyles } = positionStyles || {};
          let finalScale = posScale !== undefined ? posScale : 1.0;
          if (baseCharName.toLowerCase() === 'kimera2') {
            finalScale *= 1.2;
          }

          return (
            <motion.div
              key={baseCharName}
              className={`absolute flex flex-col justify-end items-center`}
              style={{
                width: isKimera ? '60%' : '45%',
                height: isKimera ? '75%' : '95%',
                bottom: isKimera ? '28cqh' : (isMachine ? '20cqh' : '-50px'),
                left: isKimera && (!overrideStyle) ? '20%' : undefined,
                transformOrigin: 'bottom center',
                ...layoutStyles
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: posY !== undefined ? posY : 0,
                scale: finalScale,
                filter: (isSpeaker || isKimera || isMachine) ? "brightness(1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))" : "brightness(0.4) drop-shadow(0 5px 10px rgba(0,0,0,0.3))",
                zIndex: isSpeaker ? 20 : 10,
              }}
              layout="position"
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
