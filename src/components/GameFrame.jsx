import { motion } from 'framer-motion';

export default function GameFrame({ children, shakeEffect }) {
  const shakeVariants = {
    idle: { x: 0, y: 0 },
    shake: {
      x: [0, -10, 10, -8, 8, -5, 5, -2, 2, 0],
      y: [0, 5, -5, 4, -4, 3, -3, 1, -1, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  return (
    <div className="w-screen h-screen bg-[#000000] flex items-center justify-center overflow-hidden">
      <motion.div
        id="game-canvas-wrapper"
        className="relative overflow-hidden bg-luna-abyss"
        style={{
          aspectRatio: '16 / 9',
          width: '100vw',
          maxHeight: '100vh',
          maxWidth: '177.78vh',
        }}
        variants={shakeVariants}
        animate={shakeEffect ? 'shake' : 'idle'}
      >
        {children}
      </motion.div>
    </div>
  );
}
