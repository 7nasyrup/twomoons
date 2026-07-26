import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FastForward, BookOpen, LogOut, SkipForward, Save, FolderOpen, X } from 'lucide-react';
import { renderTextWithLinks } from '../utils/textUtils';

const hudGlitchIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } }
};

export default function DialogueBox({
  speaker,
  role,
  text,
  isTyping,
  isVisible,
  autoMode,
  skipMode,
  onNext,
  onToggleAuto,
  onToggleSkip,
  onToggleHud,
  onOpenLog,
  choices,
  isWaitingForChoice,
  onSelectChoice,
  fullText,
  onSave,
  onLoad,
  onExit,
}) {
  if (!isVisible) return null;

  let displaySpeaker = speaker;
  let displayRole = role;
  if (!displaySpeaker && fullText && fullText.trim().startsWith("（")) {
    const isSystemMessage = fullText.includes("ありがとうございました") || fullText.includes("アップデート");
    if (!isSystemMessage) {
      displaySpeaker = "朔良";
      if (!displayRole) {
        displayRole = "SAKURA";
      }
    }
  }

  const showSpeaker = !!displaySpeaker;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 z-30 font-orbitron pointer-events-none"
        variants={hudGlitchIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* EXIT Button (Top Left) */}
        <div className="absolute top-[4vh] left-[4vh] z-50 pointer-events-auto">
          <HudButton icon={<LogOut className="w-[2vh] h-[2vh]" />} label="EXIT" onClick={onExit} />
        </div>

        {/* Bottom Area Wrapper */}
        <div className="absolute bottom-0 w-full flex flex-col pointer-events-none items-center">

          {/* Choices */}
          {isWaitingForChoice && choices && (
            <div className="flex flex-col items-end gap-4 mb-4 w-full px-12 md:px-24 pointer-events-auto">
              {choices.map((choice, idx) => {
                const isInteractive = true;
                return (
                  <motion.div
                    key={idx}
                    className="relative p-[1px] bg-slate-700 hover:bg-[#00e5ff] transition-colors cursor-pointer group w-[80%] max-w-[600px] rounded-md"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.1 } }}
                    whileHover={isInteractive ? { scale: 1.02 } : {}}
                    whileTap={isInteractive ? { scale: 0.98 } : {}}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isInteractive) {
                        onSelectChoice(idx);
                      }
                    }}
                  >
                    <div className={`w-full bg-slate-900/95 backdrop-blur-md py-[2vh] px-[4vh] flex items-center border border-slate-700/50 rounded-md ${isInteractive ? '' : 'opacity-60 cursor-default'}`}>
                      <span className="text-[#00e5ff] font-bold text-[2vh] mr-4 tracking-widest">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="text-slate-200 font-noto text-[2.5vh] tracking-wide font-bold flex-1">{choice.text}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* FUI Dialogue Box based on user image */}
          <div 
            className="w-[88%] max-w-[1000px] mb-[4vh] cursor-pointer pointer-events-auto relative mt-[4vh] flex flex-col items-center"
          >

            <div className="w-full relative shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border-b-[0.8vh] border-[#4dd0e1] flex flex-col">

              {/* Header Bar */}
              <div className="w-full h-[6vh] bg-[#0a192f] flex justify-between items-center relative overflow-hidden">
                {/* Geometric Pattern Background for Header */}
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #09202a 25%, transparent 25%, transparent 75%, #09202a 75%, #09202a), repeating-linear-gradient(45deg, #09202a 25%, #0e2a38 25%, #0e2a38 75%, #09202a 75%, #09202a)`,
                    backgroundPosition: `0 0, 10px 10px`,
                    backgroundSize: `20px 20px`
                  }}
                />

                {/* Left side: Nameplate */}
                <div className="flex items-center px-[3vh] relative z-10 bg-[#0a192f] h-full pr-[6vh] shadow-[10px_0_20px_rgba(10,25,47,0.8)]" style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0 100%)' }}>
                  {showSpeaker && (
                    <>
                      <div className="w-0 h-0 border-t-[0.8vh] border-t-transparent border-l-[1.2vh] border-l-[#00e5ff] border-b-[0.8vh] border-b-transparent mr-[1.5vh]" />
                      <span className="text-white font-bold tracking-widest text-[2.5vh] mr-[1.5vh] shadow-md">{displaySpeaker}</span>
                      {displayRole && (
                        <span className="text-[#00e5ff] font-bold text-[1.2vh] tracking-widest uppercase mt-[0.2vh]">
                          {displayRole}
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Right side: X */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleHud();
                  }}
                  className="px-[3vh] text-[#00e5ff]/50 hover:text-[#00e5ff] hover:bg-[#00e5ff]/10 relative z-10 h-full flex items-center transition-colors"
                >
                  <X className="w-[2.5vh] h-[2.5vh]" strokeWidth={2.5} />
                </button>
              </div>

              {/* Text Area */}
              <div className="bg-white w-full h-[28vh] min-h-[28vh] max-h-[28vh] flex-none overflow-hidden p-[4vh] pb-[6vh] relative">
                <p className="m-0 text-slate-800 text-[3.3vh] leading-[1.8] font-noto tracking-wide whitespace-pre-line font-medium">
                  {renderTextWithLinks(text)}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-[1.5vh] h-[2.5vh] bg-[#00e5ff] ml-[1vh] align-middle opacity-80"
                      animate={{ opacity: [1, 0.2] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </p>

                {/* Next indicator */}
                {!isTyping && !isWaitingForChoice && (
                  <motion.div
                    className="absolute bottom-[3vh] right-[4vh] flex items-center text-[#4dd0e1]"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronRight className="w-[4vh] h-[4vh]" strokeWidth={2.5} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* HUD Buttons Grouped Together (Overlapping the bottom cyan border) */}
            <div className="absolute -bottom-[1.5vh] right-[6%] flex gap-[1vh] z-20">
              <HudButton icon={<Save className="w-[2vh] h-[2vh]" />} label="SAVE" onClick={onSave} />
              <HudButton icon={<FolderOpen className="w-[2vh] h-[2vh]" />} label="LOAD" onClick={onLoad} />
              <HudButton icon={<SkipForward className="w-[2vh] h-[2vh]" />} label="SKIP" onClick={onToggleSkip} active={skipMode} />
              <HudButton icon={<BookOpen className="w-[2vh] h-[2vh]" />} label="LOG" onClick={onOpenLog} />
              <HudButton icon={<FastForward className="w-[2vh] h-[2vh]" />} label="AUTO" onClick={onToggleAuto} active={autoMode} />
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function HudButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`flex items-center gap-[0.8vh] px-[2vh] py-[0.8vh] rounded-full text-[1.5vh] font-bold tracking-widest font-noto
                  transition-all duration-300 shadow-md border
                  ${active
          ? 'bg-[#00e5ff] text-slate-900 border-[#00e5ff] shadow-[0_4px_12px_rgba(0,229,255,0.4)]'
          : 'bg-white text-slate-600 border-[#4dd0e1] hover:border-[#00e5ff] hover:text-[#00e5ff] hover:-translate-y-0.5'}
        `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
