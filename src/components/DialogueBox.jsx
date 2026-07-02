import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FastForward, BookOpen, EyeOff, LogOut } from 'lucide-react';

const hudGlitchIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

export default function DialogueBox({
  speaker,
  role,
  text,
  isTyping,
  isVisible,
  autoMode,
  onNext,
  onToggleAuto,
  onToggleHud,
  onOpenLog,
  choices,
  isWaitingForChoice,
  onSelectChoice,
  fullText,
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
        className="absolute bottom-0 left-0 right-0 z-30"
        variants={hudGlitchIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* LOG & HIDE buttons - top left */}
        <div className="fixed top-4 left-6 z-40 flex gap-2">
          <HudButton icon={<BookOpen size={16} />} label="LOG" onClick={onOpenLog} />
          <HudButton icon={<EyeOff size={16} />} label="HIDE" onClick={onToggleHud} />
        </div>

        {/* AUTO & EXIT buttons - top right */}
        <div className="fixed top-4 right-24 z-40 flex gap-2">
          <HudButton
            icon={<FastForward size={16} />}
            label="AUTO"
            onClick={onToggleAuto}
            active={autoMode}
          />
          <HudButton
            icon={<LogOut size={16} />}
            label="EXIT"
            onClick={onExit}
          />
        </div>

        {/* Choices */}
        {isWaitingForChoice && choices && (
          <div className="flex flex-col items-end gap-2 mb-3 mr-12 md:mr-24">
            {choices.map((choice, idx) => {
              const isInteractive = true;
              return (
                <motion.button
                  key={idx}
                  className={`w-80 md:w-96 bg-[#080a10]/80 backdrop-blur border border-cyan-500/20 text-cyan-100 py-3 px-6 rounded
                             transition-all duration-300 text-left font-noto tracking-wide
                             ${isInteractive
                      ? "hover:bg-cyan-500/10 hover:border-cyan-400/50 cursor-pointer"
                      : "opacity-60 cursor-default"
                    }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.1 } }}
                  whileHover={isInteractive ? { scale: 1.01 } : {}}
                  whileTap={isInteractive ? { scale: 0.99 } : {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInteractive) {
                      onSelectChoice(idx);
                    }
                  }}
                >
                  <span className="text-cyan-500/60 font-orbitron text-xs mr-3">{String(idx + 1).padStart(2, '0')}</span>
                  {choice.text}
                </motion.button>
              );
            })}
          </div>
        )}


        {/* Dialogue panel */}
        <div
          className="relative bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-16 pb-12 px-12 md:px-24 cursor-pointer transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          {/* Speaker name */}
          {showSpeaker && (
            <div className="flex items-center gap-3 mb-2">
              <span className="text-white text-base md:text-lg font-bold tracking-widest font-noto">
                {displaySpeaker}
              </span>
              {displayRole && displayRole !== 'NARRATOR' && (
                <span className="text-white/40 text-[10px] md:text-xs font-orbitron px-2 py-0.5 border border-white/10 rounded tracking-widest uppercase">
                  {displayRole}
                </span>
              )}
            </div>
          )}

          {/* Line between speaker and text */}
          <div className="w-full h-[1px] bg-gradient-to-r from-white/40 via-white/15 to-transparent mb-4" />

          {/* Text content */}
          <div className="min-h-[80px] flex items-start">
            <p className="text-gray-100 text-base md:text-lg leading-relaxed font-noto tracking-wide">
              {text}
              {isTyping && (
                <motion.span
                  className="inline-block w-[2px] h-4 md:h-[18px] bg-white ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>
          </div>

          {/* Next indicator */}
          {!isTyping && !isWaitingForChoice && (
            <motion.div
              className="absolute bottom-4 right-12 md:right-24"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronRight size={24} className="text-white/60" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function HudButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-orbitron tracking-wider
                  border transition-all duration-200
                  ${active
          ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
          : 'bg-[#080a10]/60 border-cyan-500/10 text-cyan-500/60 hover:border-cyan-500/30 hover:text-cyan-400'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
