import { motion, AnimatePresence } from 'framer-motion';

export default function CinemaLayer({ text, isActive, isTyping, onNext }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-40 flex flex-col justify-center items-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.0 } }}
          exit={{ opacity: 0, transition: { duration: 1.0 } }}
        >
          {/* Top letterbox bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[15%] bg-black"
            initial={{ y: '-100%' }}
            animate={{ y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ y: '-100%', transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
          />
          {/* Bottom letterbox bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[15%] bg-black"
            initial={{ y: '100%' }}
            animate={{ y: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ y: '100%', transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
          />

          {/* Center text */}
          <div className="flex justify-center items-center h-40 z-50 w-full bg-black/60 relative overflow-hidden">
            <AnimatePresence>
              <motion.p
                key={text}
                className="absolute text-center text-cyan-100/90 text-[clamp(12px,4.5vw,30px)] md:text-[clamp(20px,3vw,30px)] font-noto font-light tracking-[0.2em] leading-relaxed px-2 w-[95%] md:max-w-[80%] whitespace-pre-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: isTyping ? 1.0 : 0, ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
