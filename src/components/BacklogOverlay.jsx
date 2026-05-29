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
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/10">
            <div className="flex items-center gap-2">
              <ScrollText size={16} className="text-cyan-500/60" />
              <span className="text-cyan-400 text-xs font-orbitron tracking-[0.3em]">BACKLOG</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-cyan-500/40 hover:text-cyan-400 transition-colors p-1"
            >
              <X size={18} />
            </button>
          </div>

          {/* Log entries */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin">
            {backlog.length === 0 ? (
              <p className="text-cyan-500/30 text-sm font-noto text-center mt-12">バックログは空です</p>
            ) : (
              backlog.map((entry, idx) => (
                <div key={idx} className="border-b border-cyan-500/5 pb-3">
                  {entry.speaker && (
                    <span className="text-cyan-400/70 text-xs font-orbitron tracking-wider">
                      {entry.speaker}
                    </span>
                  )}
                  <p className="text-gray-300/80 text-sm font-noto leading-relaxed mt-1">{entry.text}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
