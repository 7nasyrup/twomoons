import React, { useEffect, useState } from 'react';
import { assetPath } from '../utils/assetPath'; 

export default function TitleScreen({ onStart, onContinue, onBattle, hasSave, playBGM }) {
    const [showCredits, setShowCredits] = useState(false);

    // Play title BGM when component mounts
    useEffect(() => {
        if (playBGM) {
            playBGM(assetPath('/assets/audio/bgm/deep_blue_moon.mp3'));
        }
    }, [playBGM]);

    return (
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center overflow-hidden z-40 select-none">
            {/* 16:9コンテナ（背景画像と完全に一致する領域） */}
            <div 
                className="relative w-full max-w-full max-h-full aspect-video flex flex-col justify-end"
                style={{ containerType: 'size' }}
            >
                {/* Background Image */}
                <div 
                    className="absolute inset-0 w-full h-full bg-contain bg-center bg-no-repeat pointer-events-none" 
                    style={{ backgroundImage: `url(${assetPath('/title.png')})` }}
                />

                {/* Buttons / Menu */}
                <div className="w-full text-center z-10 relative mb-[9%]">
                    <div className="flex flex-col items-center justify-center w-[24%] mx-auto" style={{ gap: '3cqh' }}>
                        {/* Start Button */}
                        <button
                            onClick={onStart}
                            className="w-full bg-cyan-950/30 border border-cyan-500/40 text-cyan-300 hover:text-white font-orbitron rounded
                           hover:bg-cyan-500/25 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,245,255,0.35)]
                           transition-all duration-300 transform hover:-translate-y-[2%] active:translate-y-0 active:scale-98"
                            style={{ padding: '2.5cqh 0', fontSize: '1.4cqw', letterSpacing: '0.3em' }}
                        >
                            NEW GAME
                        </button>

                        {/* Continue Button */}
                        <button
                            onClick={onContinue}
                            disabled={!hasSave}
                            className={`w-full font-orbitron rounded transition-all duration-300
                           ${hasSave
                                    ? 'bg-indigo-950/30 border border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-500/25 hover:border-indigo-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] transform hover:-translate-y-[2%] active:translate-y-0 active:scale-98'
                                    : 'border border-gray-800 text-gray-600 cursor-not-allowed bg-black/10'}`}
                            style={{ padding: '2.5cqh 0', fontSize: '1.4cqw', letterSpacing: '0.3em' }}
                        >
                            CONTINUE
                        </button>

                        {/* Battle Test Button */}
                        <button
                            onClick={onBattle}
                            className="w-full bg-pink-950/30 border border-pink-500/40 text-pink-300 hover:text-white font-orbitron rounded
                           hover:bg-pink-500/25 hover:border-pink-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.35)]
                           transition-all duration-300 transform hover:-translate-y-[2%] active:translate-y-0 active:scale-98"
                            style={{ padding: '2.5cqh 0', fontSize: '1.4cqw', letterSpacing: '0.3em' }}
                        >
                            BATTLE
                        </button>

                        {/* Credits Button */}
                        <button
                            onClick={() => setShowCredits(true)}
                            className="w-full bg-transparent border border-transparent text-gray-400 hover:text-cyan-300 font-orbitron rounded
                           hover:bg-cyan-950/20 hover:border-cyan-500/20 transition-all duration-300"
                            style={{ padding: '2cqh 0', fontSize: '1.1cqw', letterSpacing: '0.2em' }}
                        >
                            CREDITS
                        </button>
                    </div>
                </div>

                {/* Footer / Copyright */}
                <div className="w-full flex flex-row justify-between items-center z-10 font-orbitron px-[4%] pb-[2%] opacity-70" style={{ fontSize: '1cqw' }}>
                    <p className="text-gray-400">© 2026 TWOMOONS PROJECT. ALL RIGHTS RESERVED.</p>
                    <p className="text-cyan-400/40">POWERED BY CYBER_NOVEL_ENGINE</p>
                </div>
            </div>

            {/* Credits Modal Overlay */}
            {showCredits && (
                <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 p-6 animate-fadeIn">
                    <div className="w-full max-w-xl bg-[#050b18] border border-cyan-500/30 rounded-lg p-6 relative shadow-[0_0_30px_rgba(0,245,255,0.1)]">
                        <h3 className="text-xl font-orbitron text-cyan-400 tracking-[0.2em] border-b border-cyan-500/20 pb-2 mb-4 text-center">
                            CREDITS
                        </h3>

                        <div className="space-y-4 text-sm font-noto text-gray-300 max-h-[60cqh] overflow-y-auto pr-2">
                            {/* 一旦非表示
                            <div className="text-center">
                                <p className="text-xs font-orbitron text-cyan-500/60 tracking-widest mb-1">PRODUCER / SCENARIO</p>
                                <p className="font-semibold text-white">TWOMOONS DEV TEAM</p>
                            </div>

                            <div className="text-center">
                                <p className="text-xs font-orbitron text-cyan-500/60 tracking-widest mb-1">GRAPHICS & DESIGN</p>
                                <p className="text-white text-sm">Holographic Neural Generator</p>
                            </div>
                            */}

                            <div className="text-center w-full">
                                <p className="text-sm font-orbitron text-cyan-500/80 tracking-widest mb-6">■BGM素材・使用楽曲</p>

                                <div className="max-w-lg mx-auto text-left w-full">
                                    <p className="text-white text-sm mb-3 pl-2 border-l-2 border-cyan-500/50">DOVA-SYNDROME　様</p>
                                    <div className="flex flex-col gap-2 text-[11px] text-gray-300 pl-3">
                                        {/* ユーザーが追加した楽曲 */}
                                        <div className="flex items-start">
                                            <span className="w-36 shrink-0">shimtone様</span>
                                            <span className="text-gray-400 leading-relaxed">「Sakura Mellows」「雨の路地裏」「Tailshaft」「アンドロイドの涙」「Night Howling」「Citrus Days」「
                                                Wobbly Dark Silhouette」</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-36 shrink-0">ネコト様</span>
                                            <span className="text-gray-400 leading-relaxed">「ゴーストおじさん」</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-36 shrink-0">Heitaro Ashibe様</span>
                                            <span className="text-gray-400 leading-relaxed">「孤独な道行き」</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-36 shrink-0">マニーラ様</span>
                                            <span className="text-gray-400 leading-relaxed">「月面散歩」</span>
                                        </div>
                                        <div className="flex items-start">
                                            <span className="w-36 shrink-0">しんさんわーくす様</span>
                                            <span className="text-gray-400 leading-relaxed">「碧い回路の夜明け」</span>
                                        </div>
                                    </div>

                                    <p className="text-white text-sm mt-8 mb-3 pl-2 border-l-2 border-cyan-500/50">BGMer　様</p>
                                    <div className="flex flex-col gap-2 text-[11px] text-gray-300 pl-3">
                                        <div className="flex items-start">
                                            <span className="text-gray-400 leading-relaxed">「不安の種」</span>
                                        </div>
                                    </div>

                                    <p className="text-white text-sm mt-8 mb-3 pl-2 border-l-2 border-cyan-500/50">PeriTune　様</p>
                                    <div className="flex flex-col gap-2 text-[11px] text-gray-300 pl-3">
                                        <div className="flex items-start">
                                            <span className="text-gray-400 leading-relaxed">「Glistening Ripples」</span>
                                        </div>
                                    </div>
                                </div>
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
        </div>
    );
}
