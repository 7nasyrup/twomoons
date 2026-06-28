import { motion, AnimatePresence } from 'framer-motion';
import { X, ScrollText } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function BacklogOverlay({ isOpen, onClose, backlog }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-[55] bg-[#030712]/95 backdrop-blur-xl flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-cyan-500/10">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
            </motion.button>
            <div className="flex items-center gap-2">
              <ScrollText size={16} className="text-cyan-500/60" />
              <span className="text-cyan-400 text-xs font-orbitron tracking-[0.3em]">BACKLOG</span>
            </div>
          </div>

          {/* Log entries */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
            <div className="max-w-2xl mx-auto w-full space-y-4">
              {backlog.length === 0 ? (
                <p className="text-cyan-500/30 text-sm font-noto text-center mt-12">バックログは空です</p>
              ) : (
                backlog.map((entry, idx) => {
                  let displaySpeaker = entry.speaker;
                  if (!displaySpeaker && entry.text && entry.text.trim().startsWith("（")) {
                    const isSystemMessage = entry.text.includes("ありがとうございました") || entry.text.includes("アップデート");
                    if (!isSystemMessage) {
                      displaySpeaker = "朔良";
                    }
                  }

                  return (
                    <div key={idx} className="border-b border-cyan-500/5 pb-3">
                      {displaySpeaker && (
                        <span className="text-cyan-400/70 text-sm font-orbitron tracking-wider">
                          {displaySpeaker}
                        </span>
                      )}
                      <p className="text-gray-300/80 text-base md:text-lg font-noto leading-relaxed mt-1">{entry.text}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
