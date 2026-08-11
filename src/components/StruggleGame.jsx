import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAudioSystem } from '../hooks/useAudioSystem';
import { assetPath } from '../utils/assetPath';

export default function StruggleGame({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { playSE } = useAudioSystem();

  const handleTap = useCallback(() => {
    if (isCompleted) return;
    
    // Play sound effect
    playSE(assetPath('/assets/audio/bgm/+struggle.mp3'));

    setProgress((prev) => {
      const next = prev + 5;
      if (next >= 100) {
        setIsCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 1000); // 1秒後に完了
        return 100;
      }
      return next;
    });
  }, [isCompleted, playSE, onComplete]);

  // Handle keyboard events (Space or Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTap]);

  return (
    <motion.div
      className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-widest mb-2 font-noto">
          縄を解け！
        </h2>
        <p className="text-sm text-slate-300 tracking-wider">
          画面をタップ（またはSpace/Enter）して連打
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="w-96 max-w-[90cqw] h-8 bg-slate-800 rounded-full border border-slate-600 overflow-hidden mb-12 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <motion.div
          className="h-full bg-gradient-to-r from-red-600 to-red-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
        />
        {/* Shine effect */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20" />
      </div>

      {/* Tap Button */}
      <motion.button
        onClick={handleTap}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isCompleted}
        className={`w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-colors duration-200 ${
          isCompleted 
            ? 'border-green-500 bg-green-500/20 text-green-400' 
            : 'border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20'
        }`}
      >
        <span className="font-orbitron font-bold text-2xl">
          {isCompleted ? 'CLEAR' : 'TAP'}
        </span>
      </motion.button>

      {/* Success Particle Effect (Simple) */}
      {isCompleted && (
        <motion.div
          className="absolute inset-0 bg-white z-0 pointer-events-none mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
}
