import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function PopupLayer({ text, isActive, isTyping, onNext }) {
  return (
    <AnimatePresence>
      {(isActive && text) && (
        <motion.div
          className="absolute inset-0 z-[45] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            className="relative w-full max-w-2xl mx-4 p-8 md:p-12 text-center"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(231,202,177,0.5)',
            }}
            initial={{ scale: 0.95, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 16, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close Button (Top Right) */}
            {!isTyping && (
              <motion.button
                className="absolute top-4 right-4 pointer-events-auto bg-slate-200 hover:bg-[#00e5ff] text-slate-600 hover:text-slate-900 flex items-center justify-center p-2 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNext) onNext();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}

            <p className="text-slate-800 text-lg md:text-xl font-noto font-bold leading-relaxed whitespace-pre-wrap mt-2">
              {text}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
