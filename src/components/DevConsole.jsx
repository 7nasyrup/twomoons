import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, SkipForward, Volume2, VolumeX } from 'lucide-react';

export default function DevConsole({ currentStep, totalSteps, onJumpToStep, onToggleMute, scenarioData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [jumpInput, setJumpInput] = useState('');

  const sceneBreaks = scenarioData?.reduce((acc, item, idx) => {
    if (idx === 0 || item.scene !== scenarioData[idx - 1].scene) {
      acc.push({ scene: item.scene, step: idx, id: item.id });
    }
    return acc;
  }, []) || [];

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-3 right-3 z-[60] bg-[#080a10]/80 border border-cyan-500/20 text-cyan-500/60
                   p-2 rounded hover:border-cyan-400/40 hover:text-cyan-400 transition-all"
      >
        <Terminal size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-12 right-3 z-[60] bg-[#080a10]/95 backdrop-blur-xl border border-cyan-500/20
                       rounded-lg p-4 w-72 shadow-[0_0_40px_rgba(0,245,255,0.1)]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-cyan-400 text-xs font-orbitron tracking-wider">DEV CONSOLE</span>
              <button onClick={() => setIsOpen(false)} className="text-cyan-500/40 hover:text-cyan-400">
                <X size={14} />
              </button>
            </div>

            {/* Progress */}
            <div className="text-cyan-500/60 text-xs font-orbitron mb-3">
              STEP: {currentStep} / {totalSteps - 1}
              <div className="w-full bg-cyan-900/20 h-1 rounded mt-1">
                <div
                  className="bg-cyan-500/60 h-1 rounded transition-all duration-300"
                  style={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Jump to step */}
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                placeholder="Step #"
                className="flex-1 bg-[#030712] border border-cyan-500/20 text-cyan-100 text-xs px-2 py-1.5 rounded
                           font-orbitron placeholder:text-cyan-500/30 focus:border-cyan-400/50 outline-none"
              />
              <button
                onClick={() => {
                  const step = parseInt(jumpInput);
                  if (!isNaN(step)) onJumpToStep(step);
                }}
                className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded text-xs
                           font-orbitron hover:bg-cyan-500/20 transition-colors"
              >
                <SkipForward size={12} />
              </button>
            </div>

            {/* Scene quick jump */}
            <div className="text-cyan-500/40 text-[10px] font-orbitron tracking-wider mb-2">SCENES</div>
            <div className="flex flex-col gap-1">
              {sceneBreaks.map((sb) => (
                <button
                  key={sb.step}
                  onClick={() => onJumpToStep(sb.step)}
                  className={`text-left text-xs px-2 py-1.5 rounded transition-colors font-orbitron
                    ${currentStep >= sb.step ? 'text-cyan-400 bg-cyan-500/10' : 'text-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/5'}`}
                >
                  #{sb.scene} — Step {sb.step}
                </button>
              ))}
            </div>

            {/* Audio toggle */}
            <button
              onClick={onToggleMute}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[#030712] border border-cyan-500/20
                         text-cyan-500/60 py-2 rounded text-xs font-orbitron hover:border-cyan-400/40 transition-colors"
            >
              <Volume2 size={12} /> TOGGLE AUDIO
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
