import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, Music } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

export default function SettingsModal({ isOpen, onClose, audioSystem }) {
  if (!isOpen) return null;
  const { masterVolume, bgmVolume, seVolume, setMasterVol, setBGMVolume, setSEVolume, playSE } = audioSystem;

  const playTestSE = () => playSE(assetPath('/assets/audio/se/footsteps.mp3'));

  const items = [
    { label: 'マスター音量', val: masterVolume, set: setMasterVol, icon: <Volume2 size={18} className="text-[#00e5ff]" /> },
    { label: 'BGM 音量', val: bgmVolume, set: setBGMVolume, icon: <Music size={18} className="text-[#00e5ff]" /> },
    { label: 'SE 音量', val: seVolume, set: setSEVolume, icon: <Volume2 size={18} className="text-[#00e5ff]" />, isSE: true }
  ];

  const bgGradient = `repeating-linear-gradient(45deg, #09202a 25%, transparent 25%, transparent 75%, #09202a 75%, #09202a), repeating-linear-gradient(45deg, #09202a 25%, #0e2a38 25%, #0e2a38 75%, #09202a 75%, #09202a)`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div onClick={onClose} className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden z-[100] select-none">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="settings-modal-card relative shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-xl overflow-hidden border-b-[0.8cqh] border-[#4dd0e1] flex flex-col"
          >
            {/* Header Bar */}
            <div className="w-full h-[6cqh] bg-[#0a192f] flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-80" style={{ backgroundImage: bgGradient, backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }} />

              {/* Left side: Nameplate */}
              <div 
                className="flex items-center px-[3cqh] relative z-10 bg-[#0a192f] h-full pr-[6cqh] shadow-[10px_0_20px_rgba(10,25,47,0.8)]" 
                style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0 100%)' }}
              >
                <div className="w-0 h-0 border-t-[0.8cqh] border-t-transparent border-l-[1.2cqh] border-l-[#00e5ff] border-b-[0.8cqh] border-b-transparent mr-[1.5cqh]" />
                <span className="text-white font-bold tracking-widest text-[2.2cqh] mr-[1.5cqh] shadow-md font-orbitron">
                  CONFIG / 設定
                </span>
              </div>

              {/* Right side: X */}
              <button 
                onClick={onClose} 
                className="px-[3cqh] text-[#00e5ff]/50 hover:text-[#00e5ff] hover:bg-[#00e5ff]/10 relative z-10 h-full flex items-center transition-colors pointer-events-auto"
              >
                <X className="dlg-x-icon w-[3.5cqh] h-[3.5cqh]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Content Area */}
            <div className="bg-white w-full p-[4cqh] pb-[4cqh] relative flex flex-col gap-6">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-slate-800 font-noto">
                    <span className="flex items-center gap-2 font-bold text-[1.8cqh] lg:text-[2cqh]">
                      {item.icon}
                      {item.label}
                    </span>
                    <span className="font-orbitron text-cyan-800 font-black text-[2cqh]">
                      {Math.round(item.val * 100)}%
                    </span>
                  </div>
                  <input
                    type="range" min="0" max="1" step="0.01" value={item.val}
                    onChange={(e) => item.set(parseFloat(e.target.value))}
                    onMouseUp={item.isSE ? playTestSE : undefined}
                    onTouchEnd={item.isSE ? playTestSE : undefined}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00e5ff]"
                    style={{ background: `linear-gradient(to right, rgb(0, 229, 255) ${item.val * 100}%, rgb(226, 232, 240) ${item.val * 100}%)` }}
                  />
                </div>
              ))}

              {/* Close Button を削除 */}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}