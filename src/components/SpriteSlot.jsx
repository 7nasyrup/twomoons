import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpriteSlot({ leftActive, rightActive, focusSlot }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Left Slot: Mutsunori (Purple) */}
      <AnimatePresence>
        {leftActive && (
          <motion.div
            className={`absolute bottom-0 left-[6%] w-[30%] h-[82%] flex flex-col justify-end items-center transition-all duration-500
              ${focusSlot === 'right' ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          >
            {/* Silhouette box */}
            <div className="relative w-full h-[90%] border border-[#bc84ee]/40 bg-[#bc84ee]/5 rounded-t-full shadow-[0_0_30px_rgba(188,132,238,0.25)] overflow-hidden">
              {/* Scanlines inside the hologram */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#bc84ee]/10 to-transparent animate-scanline pointer-events-none" />

              {/* Generic male silhouette SVG outline */}
              {/* <svg className="absolute inset-0 w-full h-full p-8 text-[#bc84ee]/20 opacity-80" viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
                <path d="M50,15 C45,15 40,20 40,25 C40,30 45,35 50,35 C55,35 60,30 60,25 C60,20 55,15 50,15 Z M35,45 C40,40 45,38 50,38 C55,38 60,40 65,45 C70,50 71,60 71,100 L29,100 C29,60 30,50 35,45 Z" fill="currentColor" stroke="#bc84ee" strokeWidth="1" />
              </svg> */}

              {/* Dynamic Image Layer (allows setting bg image from code/DOM) */}
              <div
                id="char-left-img"
                className="absolute inset-0 w-full h-full bg-contain bg-bottom bg-no-repeat transition-all duration-300"
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
            <div className="relative w-full h-[90%] border border-[#48cae4]/40 bg-[#48cae4]/5 rounded-t-full shadow-[0_0_30px_rgba(72,202,228,0.25)] overflow-hidden">
              {/* Scanlines inside the hologram */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#48cae4]/10 to-transparent animate-scanline pointer-events-none" />

              {/* Generic female outline SVG */}
              {/* <svg className="absolute inset-0 w-full h-full p-8 text-[#48cae4]/20 opacity-80" viewBox="0 0 100 100" preserveAspectRatio="xMidYMax meet">
                <path d="M50,13 C44,13 41,18 41,23 C41,28 43,33 50,33 C57,33 59,28 59,23 C59,18 56,13 50,13 Z M33,45 C38,40 45,37 50,37 C55,37 62,40 67,45 C69,50 69,62 69,100 L31,100 C31,62 31,50 33,45 Z" fill="currentColor" stroke="#48cae4" strokeWidth="1" />
              </svg> */}

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
