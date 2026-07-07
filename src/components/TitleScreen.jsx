import React, { useEffect, useState } from 'react';
import { assetPath } from '../utils/assetPath';
import FuiShowcase from './FuiShowcase';

export default function TitleScreen({ onStart, onContinue, hasSave, playBGM }) {
    const [showCredits, setShowCredits] = useState(false);
    const [showFui, setShowFui] = useState(false);

    // Play title BGM when component mounts
    useEffect(() => {
        if (playBGM) {
            playBGM(assetPath('/assets/audio/bgm/deep_blue_moon.mp3'));
        }
    }, [playBGM]);

    return (
        <div className="absolute inset-0 w-full h-full bg-[#030712] overflow-hidden flex flex-col justify-between p-8 md:p-12 z-40 select-none">
            {/* Cyberpunk background grid & glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.03)_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Golden Real Moon & Cyan Artificial Moon in Background */}
            <div className="absolute top-[15%] right-[15%] w-48 h-48 rounded-full bg-[#ffe49e]/5 border border-[#ffe49e]/20 shadow-[0_0_50px_rgba(255,228,158,0.1)] pointer-events-none animate-pulse" />
            <div className="absolute top-[20%] right-[10%] w-56 h-56 rounded-full bg-cyan-400/5 border border-cyan-400/20 shadow-[0_0_70px_rgba(0,245,255,0.15)] pointer-events-none" />

            {/* Header Info / Cyber details */}
            <div className="w-full flex justify-between items-start z-10 font-orbitron text-[10px] tracking-[0.2em] text-cyan-500/60">
                <div>
                    <p className="animate-pulse">SYS_STATUS: ACTIVE</p>
                    <p>SECTOR: LUNAR_GATE_02</p>
                </div>
                <div className="text-right">
                    <p>VER. 1.0.0_DEMO</p>
                    <p className="text-pink-500/60">WAVE RESONANCE: HIGH</p>
                </div>
            </div>

            {/* Main Title Block */}
            <div className="my-auto text-center z-10 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

                {/* Japanese Title */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 tracking-[0.25em] font-noto mb-2 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)] select-none">
                    青い月の裏側で
                </h1>
                {/* English Subtitle */}
                <p className="text-sm md:text-base font-orbitron font-medium text-cyan-400/70 tracking-[0.5em] uppercase mb-16 pl-2">
                    Behind the Blue Moon
                </p>

                {/* Buttons / Menu */}
                <div className="flex flex-col items-center justify-center space-y-4 max-w-xs mx-auto">
                    {/* Start Button */}
                    <button
                        onClick={onStart}
                        className="w-full py-3 bg-cyan-950/30 border border-cyan-500/40 text-cyan-300 hover:text-white font-orbitron text-sm tracking-[0.3em] rounded
                       hover:bg-cyan-500/25 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.35)]
                       transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98"
                    >
                        NEW GAME
                    </button>

                    {/* Continue Button */}
                    <button
                        onClick={onContinue}
                        disabled={!hasSave}
                        className={`w-full py-3 font-orbitron text-sm tracking-[0.3em] rounded transition-all duration-300
                       ${hasSave
                                ? 'bg-indigo-950/30 border border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-500/25 hover:border-indigo-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98'
                                : 'border border-gray-800 text-gray-600 cursor-not-allowed bg-black/10'}`}
                    >
                        CONTINUE
                    </button>

                    {/* Credits Button */}
                    <button
                        onClick={() => setShowCredits(true)}
                        className="w-full py-2 bg-transparent border border-transparent text-gray-400 hover:text-cyan-300 font-orbitron text-xs tracking-[0.2em] rounded
                       hover:bg-cyan-950/20 hover:border-cyan-500/20 transition-all duration-300"
                    >
                        CREDITS
                    </button>

                    {/* FUI Showcase Button */}
                    <button
                        onClick={() => setShowFui(true)}
                        className="w-full py-2 mt-4 border border-[#e53935]/40 text-[#e53935] hover:bg-[#e53935] hover:text-white font-orbitron text-xs tracking-[0.2em] rounded transition-all duration-300"
                    >
                        UI SHOWCASE
                    </button>
                </div>
            </div>

            {/* Footer / Copyright */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center z-10 font-orbitron text-[9px] text-gray-500 tracking-wider space-y-2 md:space-y-0">
                <p>© 2026 TWOMOONS PROJECT. ALL RIGHTS RESERVED.</p>
                <p className="text-cyan-600/40">POWERED BY CYBER_NOVEL_ENGINE</p>
            </div>

            {/* Credits Modal Overlay */}
            {showCredits && (
                <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 p-6 animate-fadeIn">
                    <div className="w-full max-w-md bg-[#050b18] border border-cyan-500/30 rounded-lg p-6 relative shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                        <h3 className="text-xl font-orbitron text-cyan-400 tracking-[0.2em] border-b border-cyan-500/20 pb-2 mb-4 text-center">
                            CREDITS
                        </h3>

                        <div className="space-y-4 text-sm font-noto text-gray-300 max-h-[60vh] overflow-y-auto pr-2">
                            <div className="text-center">
                                <p className="text-xs font-orbitron text-cyan-500/60 tracking-widest mb-1">PRODUCER / SCENARIO</p>
                                <p className="font-semibold text-white">TWOMOONS DEV TEAM</p>
                            </div>

                            <div className="text-center">
                                <p className="text-xs font-orbitron text-cyan-500/60 tracking-widest mb-1">GRAPHICS & DESIGN</p>
                                <p className="text-white text-sm">Holographic Neural Generator</p>
                            </div>

                            <div className="text-center">
                                <p className="text-xs font-orbitron text-cyan-500/60 tracking-widest mb-1">MUSIC & SE</p>
                                <p className="text-white text-sm">Retro Cyberphonic Labs</p>
                            </div>

                            <div className="border-t border-cyan-500/10 pt-3 text-center text-xs text-gray-400">
                                <p>この作品はデモ版です。</p>
                                <p className="mt-1">青い月と金色に光る本物の月が紡ぐ、</p>
                                <p>近未来SFノベルアドベンチャー。</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCredits(false)}
                            className="mt-6 w-full py-2 bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-orbitron text-xs tracking-widest rounded
                         hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white transition-all duration-300"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}

            {/* FUI Showcase Overlay */}
            {showFui && (
                <FuiShowcase onClose={() => setShowFui(false)} />
            )}
        </div>
    );
}
