import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown, Save, FolderOpen, SkipForward, BookOpen, FastForward, LogOut } from 'lucide-react';

const renderTextWithLinks = (text) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/50 underline-offset-4 transition-colors pointer-events-auto relative z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function FCDialogueBox({ 
  currentMessage, 
  displayedText, 
  isTyping, 
  onNext, 
  animKey = "fc-dlg",
  onSave,
  onLoad,
  onToggleSkip,
  onOpenLog,
  onToggleAuto,
  skipMode,
  autoMode,
  onExit
}) {
  if (!currentMessage) return null;
  const isSystem = currentMessage.role === 'SYSTEM';
  let displaySpeaker = currentMessage.speaker;
  let displayRole = currentMessage.role;

  return (
    <AnimatePresence>
      <motion.div
        key={animKey}
        className="absolute inset-0 z-50 font-orbitron pointer-events-none"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-auto" onClick={onNext} />
        
        <div className="absolute bottom-0 w-full flex flex-col pointer-events-none items-center">
          <div 
            className="dlg-box w-[90vw] max-w-[1100px] mb-[8vh] cursor-pointer pointer-events-auto relative mt-[4vh] flex flex-col items-center"
            onClick={onNext}
          >
            <div className="w-full relative shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border-b-[0.8vh] border-[#4dd0e1] flex flex-col">
              
              <div className="w-full h-[6vh] bg-[#0a192f] flex justify-between items-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-80 pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, #09202a 25%, transparent 25%, transparent 75%, #09202a 75%, #09202a), repeating-linear-gradient(45deg, #09202a 25%, #0e2a38 25%, #0e2a38 75%, #09202a 75%, #09202a)`,
                    backgroundPosition: `0 0, 10px 10px`,
                    backgroundSize: `20px 20px`
                  }}
                />
                <div className="flex items-center px-[3vh] relative z-10 bg-[#0a192f] h-full pr-[6vh] shadow-[10px_0_20px_rgba(10,25,47,0.8)]" style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0 100%)' }}>
                  {displaySpeaker && (
                    <>
                      <div className="w-0 h-0 border-t-[0.8vh] border-t-transparent border-l-[1.2vh] border-l-[#00e5ff] border-b-[0.8vh] border-b-transparent mr-[1.5vh]" />
                      <span className="dlg-speaker text-white font-bold tracking-widest text-[2.5vh] mr-[1.5vh] shadow-md flex items-center gap-2">
                        {isSystem && <Sparkles className="w-[2vh] h-[2vh] text-[#00e5ff]" />}
                        {displaySpeaker}
                      </span>
                      {displayRole && !isSystem && (
                        <span className="dlg-role text-[#00e5ff] font-bold text-[1.2vh] tracking-widest uppercase mt-[0.2vh]">
                          {displayRole}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="px-[3vh] relative z-10 h-full flex items-center"></div>
              </div>

              <div className="dlg-text-area bg-white w-full h-[22vh] min-h-[22vh] max-h-[22vh] flex-none overflow-hidden p-[4vh] pb-[4vh] relative">
                <p className="dlg-body-text m-0 text-slate-800 text-[2.8vh] leading-[1.8] font-noto tracking-wide whitespace-pre-line font-medium">
                  {renderTextWithLinks(displayedText)}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-[1.5vh] h-[2.5vh] bg-[#00e5ff] ml-[1vh] align-middle opacity-80"
                      animate={{ opacity: [1, 0.2] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </p>

                {!isTyping && (
                  <motion.div
                    className="absolute right-[4vh] bottom-[3vh] flex items-center text-[#4dd0e1]"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-[4vh] h-[4vh] -rotate-90" strokeWidth={2.5} />
                  </motion.div>
                )}
              </div>
            </div>

            {/* HUD Buttons Grouped Together */}
            <div className="dlg-hud-row absolute -bottom-[1.5vh] right-[6vw] flex gap-[0.8vh] z-20">
              {onSave && <HudButton icon={<Save className="dlg-hud-icon w-[2.2vh] h-[2.2vh]" />} label="SAVE" onClick={onSave} />}
              {onLoad && <HudButton icon={<FolderOpen className="dlg-hud-icon w-[2.2vh] h-[2.2vh]" />} label="LOAD" onClick={onLoad} />}
              {onToggleSkip && <HudButton icon={<SkipForward className="dlg-hud-icon w-[2.2vh] h-[2.2vh]" />} label="SKIP" onClick={onToggleSkip} active={skipMode} />}
              {onOpenLog && <HudButton icon={<BookOpen className="dlg-hud-icon w-[2.2vh] h-[2.2vh]" />} label="LOG" onClick={onOpenLog} />}
              {onToggleAuto && <HudButton icon={<FastForward className="dlg-hud-icon w-[2.2vh] h-[2.2vh]" />} label="AUTO" onClick={onToggleAuto} active={autoMode} />}
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
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      className={`hud-btn flex items-center gap-[0.8vh] px-[2vh] py-[0.8vh] rounded-full text-[1.6vh] font-bold tracking-widest font-noto
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
