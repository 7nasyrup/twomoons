import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SpriteAnimator({ 
  src, 
  frameWidth = 192, 
  frameHeight = 192, 
  columns = 5, 
  totalFrames = 10, 
  fps = 15,
  loop = true,
  holdOnFrame = null,
  pulsateOnHold = false,
  onComplete,
  scale = 1,
  blendMode = 'normal'
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => {
        if (holdOnFrame !== null && prev === holdOnFrame) {
          clearInterval(timer);
          return prev;
        }
        if (prev + 1 >= totalFrames) {
          if (loop) return 0;
          clearInterval(timer);
          if (onComplete) onComplete();
          return prev; // hold on last frame
        }
        return prev + 1;
      });
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [totalFrames, fps, loop, holdOnFrame, onComplete]);

  if (!loop && frame >= totalFrames) return null;

  const x = (frame % columns) * frameWidth;
  const y = Math.floor(frame / columns) * frameHeight;

  const isHolding = holdOnFrame !== null && frame === holdOnFrame;

  return (
    <motion.div 
      className="absolute pointer-events-none z-50 flex items-center justify-center"
      initial={{ scale }}
      animate={isHolding && pulsateOnHold ? { scale: [scale, scale * 1.1, scale], opacity: [1, 0.8, 1] } : { scale }}
      transition={isHolding && pulsateOnHold ? { duration: 1.0, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
      style={{
        width: frameWidth,
        height: frameHeight,
        backgroundImage: `url(${src})`,
        backgroundPosition: `-${x}px -${y}px`,
        backgroundRepeat: 'no-repeat',
        transformOrigin: 'center center',
        mixBlendMode: blendMode
      }}
    />
  );
}
