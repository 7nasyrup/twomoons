import { motion } from 'framer-motion';

export default function ShakeLayer({ children, shakeEffect }) {
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
      transition: { duration: 1.0, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
    },
    shakeContinuousSmall: {
      x: [0, -3, 3, -2, 2, -1, 1, 0],
      y: [0, 2, -2, 1, -1, 1, -1, 0],
      transition: { duration: 0.2, ease: 'linear', repeat: Infinity }
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
  } else if (shakeEffect === 'small_continuous' || shakeEffect === 'shakeContinuousSmall') {
    animState = 'shakeContinuousSmall';
  } else if (shakeEffect === 'fadeOut' || shakeEffect === 'shakeFadeOut') {
    animState = 'shakeFadeOut';
  }

  return (
    <motion.div
      className="absolute inset-0"
      variants={shakeVariants}
      animate={animState}
    >
      {children}
    </motion.div>
  );
}
