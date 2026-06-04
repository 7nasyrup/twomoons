import { motion, AnimatePresence } from 'framer-motion';

export default function CinemaLayer({ text, isActive }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="absolute inset-0 z-40 flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Top letterbox bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[15%] bg-black"
            initial={{ y: '-100%' }}
            animate={{ y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ y: '-100%' }}
          />
          {/* Bottom letterbox bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[15%] bg-black"
            initial={{ y: '100%' }}
            animate={{ y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ y: '100%' }}
          />

          {/* Center text */}
          <div className="flex justify-center items-center h-40 z-50 max-w-[70%]">
            <AnimatePresence mode="wait">
              <motion.p
                key={text}
                className="text-center text-cyan-100/90 text-2xl md:text-3xl font-noto font-light tracking-[0.2em] leading-relaxed px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
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
