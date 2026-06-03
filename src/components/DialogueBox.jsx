import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FastForward, BookOpen, EyeOff } from 'lucide-react';

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
}) {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-4"
        variants={hudGlitchIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Control bar */}
        <div className="flex justify-end gap-2 mb-2 mr-2">
          <HudButton icon={<BookOpen size={16} />} label="LOG" onClick={onOpenLog} />
          <HudButton
            icon={<FastForward size={16} />}
            label="AUTO"
            onClick={onToggleAuto}
            active={autoMode}
          />
          <HudButton icon={<EyeOff size={16} />} label="HIDE" onClick={onToggleHud} />
        </div>

        {/* Choices */}
        {isWaitingForChoice && choices && (
          <div className="mb-3 flex flex-col gap-2">
            {choices.map((choice, idx) => {
              const isInteractive = choice.targetLabel === "mutsunori_route_start";
              return (
                <motion.button
                  key={idx}
                  className={`w-full bg-[#080a10]/80 backdrop-blur border border-cyan-500/20 text-cyan-100 py-3 px-6 rounded
                             transition-all duration-300 text-left font-noto tracking-wide
                             ${isInteractive
                               ? "hover:bg-cyan-500/10 hover:border-cyan-400/50 cursor-pointer"
                               : "opacity-60 cursor-default"
                             }`}
                  initial={{ opacity: 0, x: -20 }}
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
          className="relative bg-[#080a10]/90 backdrop-blur-xl border border-cyan-500/20 rounded-lg p-6 cursor-pointer
                     shadow-[0_0_40px_rgba(0,245,255,0.08),inset_0_1px_0_rgba(0,245,255,0.1)]
                     hover:border-cyan-500/30 transition-colors duration-300"
          onClick={onNext}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400/50" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/50" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400/50" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-400/50" />

          {/* Scanline effect */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,245,255,0.02)_2px,rgba(0,245,255,0.02)_4px)] pointer-events-none rounded-lg" />

          {/* Speaker name */}
          {speaker && (
            <div className="absolute -top-3 left-6 flex items-center gap-2">
              <span className="bg-[#080a10] border border-cyan-500/30 text-cyan-400 text-xs font-orbitron px-4 py-1 rounded-sm tracking-widest uppercase">
                {speaker}
              </span>
              {role && role !== 'NARRATOR' && (
                <span className="bg-black/80 border border-cyan-500/20 text-cyan-500/50 text-[9px] font-orbitron px-2 py-0.5 rounded-sm tracking-widest uppercase">
                  {role}
                </span>
              )}
            </div>
          )}

          {/* Text content */}
          <div className="min-h-[80px] flex items-start pt-2">
            <p className="text-gray-100 text-lg leading-relaxed font-noto tracking-wide">
              {text}
              {isTyping && (
                <motion.span
                  className="inline-block w-[2px] h-5 bg-cyan-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>
          </div>

          {/* Next indicator */}
          {!isTyping && !isWaitingForChoice && (
            <motion.div
              className="absolute bottom-2 right-4"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ChevronRight size={20} className="text-cyan-400/60" />
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
