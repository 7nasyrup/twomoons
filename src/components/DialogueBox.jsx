import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, FastForward, BookOpen, EyeOff, LogOut, Sparkles, SkipForward } from 'lucide-react';

const hudGlitchIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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
  const isSakura = displaySpeaker === '朔良';

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 font-noto"
        variants={hudGlitchIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Removed inline glass-panel style since it is globally defined in index.css */}


        {/* Choices */}
        {isWaitingForChoice && choices && (
          <div className="flex flex-col items-end gap-3 mb-6 mr-12 md:mr-24">
            {choices.map((choice, idx) => {
              const isInteractive = true;
              return (
                <motion.button
                  key={idx}
                  className={`w-80 md:w-96 glass-panel py-4 px-6 rounded-xl
                             transition-all duration-300 text-left font-noto tracking-wide relative overflow-hidden group
                              ${isInteractive
                      ? "hover:bg-slate-100/50 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
                      : "opacity-60 cursor-default"
                    }`}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
                  <span className="text-slate-500 font-bold text-xs mr-4 tracking-widest bg-slate-100 px-2 py-1 rounded-full">{String(idx + 1).padStart(2, '0')}</span>
                  {choice.text}
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Dialogue panel */}
        <div
          className="relative glass-panel rounded-xl pt-8 pb-10 px-10 md:px-16 mx-8 md:mx-24 mb-12 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          onClick={(e) => {
            e.stopPropagation();
            if (skipMode) {
              onToggleSkip();
            } else {
              onNext();
            }
          }}
        >
          {/* Speaker name Plate (Sticking out) - Always visible */}
          <div className="absolute -top-5 left-6 md:left-10 h-[40px] flex items-center z-10">
            <div className="bg-white text-slate-800 text-base font-bold tracking-[0.2em] px-6 py-2 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] min-w-[180px] h-full flex items-center justify-center">
              {showSpeaker ? displaySpeaker : ""}
            </div>
          </div>

          {/* Text content */}
          <div className="h-[100px] flex items-start pt-2">
            <p className="text-slate-800 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line">
              {text}
              {isTyping && (
                <motion.span
                  className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 ml-2 align-middle"
                  animate={{ opacity: [1, 0.2] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </p>
          </div>

          {/* Next indicator */}
          {!isTyping && !isWaitingForChoice && (
            <motion.div
              className="absolute bottom-12 right-10"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight size={24} className="text-slate-400" />
            </motion.div>
          )}

          {/* HUD Buttons (Bottom Right, sticking out) */}
          <div className="absolute bottom-0 right-6 md:right-10 translate-y-[50%] flex gap-2 z-20">
            <HudButton icon={<SkipForward size={14} />} label="SKIP" onClick={onToggleSkip} active={skipMode} />
            <HudButton icon={<BookOpen size={14} />} label="LOG" onClick={onOpenLog} />
            <HudButton icon={<EyeOff size={14} />} label="HIDE" onClick={onToggleHud} />
            <HudButton icon={<FastForward size={14} />} label="AUTO" onClick={onToggleAuto} active={autoMode} />
            <HudButton icon={<LogOut size={14} />} label="EXIT" onClick={onExit} />
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
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest font-noto
                  transition-all duration-300 shadow-sm backdrop-blur-md
                  ${active
          ? 'bg-slate-100 text-slate-800'
          : 'bg-white/90 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
