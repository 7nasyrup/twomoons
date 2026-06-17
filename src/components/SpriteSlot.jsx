import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpriteSlot({ leftActive, rightActive, focusSlot }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Left Slot: Mutsunori (Purple) */}
      <AnimatePresence>
        {leftActive && (
          <motion.div
            className={`absolute bottom-[-250px] left-0 right-0 mx-auto w-[55%] h-[105%] flex flex-col justify-end items-center transition-all duration-500
                  ${focusSlot === 'right' ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          >
            {/* Silhouette box */}
            <div className="relative w-full h-full">
              {/* Dynamic Image Layer (allows setting bg image from code/DOM) */}
              <div
                id="char-left-img"
                className="absolute inset-0 w-full h-full bg-contain bg-top bg-no-repeat transition-all duration-300"
                style={{ backgroundImage: 'url(/illust/Mutsunori_default.webp)' }}
              />
            </div>
            {/* Tag */}
            <div className="bg-black/80 border border-[#bc84ee]/40 text-[#bc84ee] font-orbitron text-[10px] px-4 py-0.5 rounded-sm mt-1.5 tracking-widest uppercase">
              MUTSUNORI
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Slot: Prof. Hirumi (Cyan) */}
      <AnimatePresence>
        {rightActive && (
          <motion.div
            className={`absolute bottom-0 right-[6%] w-[30%] h-[82%] flex flex-col justify-end items-center transition-all duration-500
                  ${focusSlot === 'left' ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          >
            {/* Silhouette box */}
            <div className="relative w-full h-[90%] overflow-hidden">
              {/* Dynamic Image Layer */}
              <div
                id="char-right-img"
                className="absolute inset-0 w-full h-full bg-contain bg-bottom bg-no-repeat transition-all duration-300"
              />
            </div>
            {/* Tag */}
            <div className="bg-black/80 border border-[#48cae4]/40 text-[#48cae4] font-orbitron text-[10px] px-4 py-0.5 rounded-sm mt-1.5 tracking-widest uppercase">
              PROF. HIRUMI
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
