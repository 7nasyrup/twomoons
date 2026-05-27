import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export default function AlertModal({ isActive, title, message, onDismiss }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm" />

          {/* Alert card */}
          <motion.div
            className="relative bg-[#0a0008] border-2 border-red-500/60 rounded-lg p-6 max-w-md w-[90%]
                       shadow-[0_0_60px_rgba(255,0,85,0.2),inset_0_0_30px_rgba(255,0,85,0.05)]"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{
              scale: 1, opacity: 1, y: 0,
              transition: { type: 'spring', stiffness: 200, damping: 20 }
            }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Glitch scanlines */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,0,85,0.03)_2px,rgba(255,0,85,0.03)_4px)] pointer-events-none rounded-lg" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <AlertTriangle className="text-red-500" size={24} />
              </motion.div>
              <h3 className="text-red-400 font-orbitron text-sm tracking-[0.3em] uppercase">
                {title || '⚠ MOON WAVE ALERT'}
              </h3>
              <button
                onClick={onDismiss}
                className="ml-auto text-red-500/50 hover:text-red-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="border-t border-red-500/20 pt-4">
              <p className="text-red-100/80 font-noto text-sm leading-relaxed">{message}</p>
            </div>

            {/* Bottom bar */}
            <div className="mt-4 flex justify-end">
              <motion.button
                className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2 rounded text-xs font-orbitron tracking-wider
                           hover:bg-red-500/30 transition-colors"
                whileTap={{ scale: 0.95 }}
                onClick={onDismiss}
              >
                DISMISS
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
