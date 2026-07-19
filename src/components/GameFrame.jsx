import { motion } from 'framer-motion';

export default function GameFrame({ children, shakeEffect }) {
  const shakeVariants = {
    idle: { x: 0, y: 0 },
    shake: {
      x: [0, -10, 10, -8, 8, -5, 5, -2, 2, 0],
      y: [0, 5, -5, 4, -4, 3, -3, 1, -1, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    shakeLarge: {
      x: [0, -25, 25, -20, 20, -15, 15, -10, 10, -5, 5, 0],
      y: [0, 15, -15, 12, -12, 8, -8, 5, -5, 2, -2, 0],
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    shakeExtreme: {
      x: [0, -35, 35, -30, 30, -25, 25, -20, 20, -15, 15, 0],
      y: [0, 22, -22, 19, -19, 16, -16, 12, -12, 6, -6, 0],
      transition: { duration: 0.4, ease: 'linear', repeat: Infinity }
    },
    shakeFadeOut: {
      x: [0, -20, 20, -12, 12, -6, 6, 0],
      y: [0, 12, -12, 8, -8, 3, -3, 0],
      transition: { duration: 3.0, ease: 'easeOut' }
    }
  };

  let animState = 'idle';
  if (shakeEffect === 'large' || shakeEffect === 'shakeLarge') {
    animState = 'shakeLarge';
  } else if (shakeEffect === true || shakeEffect === 'shake') {
    animState = 'shake';
  } else if (shakeEffect === 'extreme' || shakeEffect === 'shakeExtreme') {
    animState = 'shakeExtreme';
  } else if (shakeEffect === 'fadeOut' || shakeEffect === 'shakeFadeOut') {
    animState = 'shakeFadeOut';
  }

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
        animate={animState}
      >
        {children}
      </motion.div>
    </div>
  );
}
