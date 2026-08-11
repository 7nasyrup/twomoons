import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';

export default function ConfirmModal({ isActive, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-[400] flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { e.stopPropagation(); onCancel && onCancel(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#000510]/60 backdrop-blur-md" />

          {/* Modal card */}
          <motion.div
            className="relative bg-[#0a192f] border-[0.3cqh] border-[#4dd0e1] rounded-xl p-6 max-w-md w-[90%] shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{
              scale: 1, opacity: 1, y: 0,
              transition: { type: 'spring', stiffness: 300, damping: 25 }
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Geometric Pattern Background for Header Area (Subtle) */}
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-10">
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #00e5ff 25%, transparent 25%, transparent 75%, #00e5ff 75%, #00e5ff)`,
                  backgroundPosition: `0 0, 10px 10px`,
                  backgroundSize: `20px 20px`
                }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <HelpCircle className="text-[#00e5ff]" size={24} />
              <h3 className="text-[#00e5ff] font-orbitron font-bold tracking-widest text-lg">
                {title || 'CONFIRMATION'}
              </h3>
              <button
                onClick={onCancel}
                className="ml-auto text-[#00e5ff]/50 hover:text-[#00e5ff] transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="border-t-[0.2cqh] border-[#4dd0e1]/30 pt-5 pb-6 relative z-10">
              <p className="text-slate-200 font-noto text-base leading-relaxed whitespace-pre-line text-center">
                {message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-6 mt-auto relative z-10">
              <motion.button
                className="px-6 py-2.5 rounded-full text-sm font-noto font-bold tracking-widest text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors w-32"
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
              >
                いいえ
              </motion.button>
              <motion.button
                className="px-6 py-2.5 rounded-full text-sm font-noto font-bold tracking-widest text-[#0a192f] bg-[#00e5ff] hover:bg-[#4dd0e1] transition-colors shadow-[0_0_15px_rgba(0,229,255,0.4)] w-32"
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
              >
                はい
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
