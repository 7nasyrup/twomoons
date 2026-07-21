import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { renderTextWithLinks } from '../utils/textUtils';

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
          className="absolute inset-0 z-[55] flex items-center justify-center p-4 md:p-12 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

          {/* Main Panel matching DialogueBox style */}
          <motion.div
            className="w-full max-w-[1200px] h-[85vh] relative shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden border-b-8 border-[#4dd0e1] flex flex-col z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 200 } }}
            exit={{ y: 10, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="w-full h-14 bg-[#0a192f] flex justify-between items-center relative overflow-hidden shrink-0">
              {/* Geometric Pattern Background for Header */}
              <div
                className="absolute inset-0 opacity-80 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #09202a 25%, transparent 25%, transparent 75%, #09202a 75%, #09202a), repeating-linear-gradient(45deg, #09202a 25%, #0e2a38 25%, #0e2a38 75%, #09202a 75%, #09202a)`,
                  backgroundPosition: `0 0, 10px 10px`,
                  backgroundSize: `20px 20px`
                }}
              />

              {/* Left side: Nameplate */}
              <div className="flex items-center px-6 relative z-10 bg-[#0a192f] h-full pr-12 shadow-[10px_0_20px_rgba(10,25,47,0.8)]" style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0 100%)' }}>
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-[#00e5ff] border-b-[6px] border-b-transparent mr-3" />
                <span className="text-white font-bold tracking-widest text-lg shadow-md font-orbitron">BACKLOG</span>
              </div>

              {/* Right side: X */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="px-6 text-[#00e5ff]/50 hover:text-[#00e5ff] hover:bg-[#00e5ff]/10 relative z-10 h-full flex items-center transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Log Entries Area */}
            <div ref={scrollRef} className="bg-white w-full flex-1 overflow-y-auto p-6 md:p-10 relative scrollbar-thin scrollbar-thumb-[#4dd0e1]/40 scrollbar-track-transparent">
              <div className="max-w-4xl mx-auto w-full space-y-6">
                {backlog.length === 0 ? (
                  <p className="text-slate-400 text-sm font-noto text-center mt-12 font-bold tracking-widest">バックログは空です</p>
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
                      <div key={idx} className="border-b border-slate-100 pb-5">
                        {displaySpeaker && (
                          <span className="text-[#00acc1] text-sm font-bold font-noto tracking-widest mb-1 block">
                            {displaySpeaker}
                          </span>
                        )}
                        <p className="text-slate-800 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line font-medium">
                          {renderTextWithLinks(entry.text)}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
