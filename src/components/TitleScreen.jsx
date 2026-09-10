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

                {/* Battle Test Button (Temporarily in Top-Left) */}
                <div className="absolute top-[4cqh] left-[4cqw] z-20">
                    <button
                        onClick={onBattle}
                        className="px-[2.5cqw] py-[1.2cqh] bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-600 rounded font-serif transition-all duration-300 transform hover:-translate-y-[2%] active:translate-y-0 active:scale-95 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ fontSize: '0.9cqw', letterSpacing: '0.2em' }}
                    >
                        Battle
                    </button>
                </div>

                {/* Buttons / Menu */}
                <div className="w-full text-center z-10 relative mb-[4%] -translate-x-[3%] lg:translate-x-0">
                    <div className="flex flex-col items-center justify-center w-[24%] mx-auto" style={{ gap: '3cqh' }}>
                        {/* Start Button */}
                        <button
                            onClick={onStart}
                            className="w-full bg-[#0c101d]/95 border-2 border-luna-gold/80 text-luna-gold font-bold font-serif rounded
                           hover:bg-luna-gold hover:text-slate-950 hover:border-luna-gold hover:shadow-[0_0_25px_rgba(255,228,158,0.4)]
                           transition-all duration-300 transform hover:-translate-y-[2%] active:translate-y-0 active:scale-98"
                            style={{ padding: '2.5cqh 0', fontSize: '1.4cqw', letterSpacing: '0.3em' }}
                        >
                            New Game
                        </button>

                        {/* Continue Button */}
                        <button
                            onClick={onContinue}
                            disabled={!hasSave}
                            className={`w-full font-serif font-bold rounded transition-all duration-300 border-2
                           ${hasSave
                                    ? 'bg-[#0c101d]/95 border-slate-400/80 text-white hover:bg-slate-200 hover:text-slate-950 hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transform hover:-translate-y-[2%] active:translate-y-0 active:scale-98'
                                    : 'border-stone-800 text-stone-600 cursor-not-allowed bg-black/60'}`}
                            style={{ padding: '2.5cqh 0', fontSize: '1.4cqw', letterSpacing: '0.3em' }}
                        >
                            Continue
                        </button>

                        {/* Credits Button */}
                        <button
                            onClick={() => setShowCredits(true)}
                            className="w-full bg-[#0c101d]/80 border border-stone-700 text-stone-300 hover:text-luna-gold hover:bg-luna-gold/15 hover:border-luna-gold font-serif font-bold rounded transition-all duration-300"
                            style={{ padding: '2cqh 0', fontSize: '1.1cqw', letterSpacing: '0.2em' }}
                        >
                            Credits
                        </button>
                    </div>
                </div>

                {/* Footer / Copyright */}
                <div className="w-full flex flex-row justify-between items-center z-10 font-orbitron px-[4%] pb-[2%] opacity-70" style={{ fontSize: '1cqw' }}>
                    <p className="text-gray-400">© 2026 TWOMOONS PROJECT. ALL RIGHTS RESERVED.</p>
                    <p className="text-luna-gold/20">POWERED BY CYBER_NOVEL_ENGINE</p>
                </div>
            </div>

            {/* Credits Modal Overlay */}
            {showCredits && (
                <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 p-6 animate-fadeIn">
                    <div className="w-full max-w-xl bg-luna-abyss border border-luna-gold/20 rounded-lg p-6 relative shadow-[0_0_30px_rgba(255,228,158,0.05)]">
                        <h3 className="text-xl font-orbitron text-luna-gold tracking-[0.2em] border-b border-luna-gold/10 pb-2 mb-4 text-center">
                            CREDITS
                        </h3>

                        <div className="space-y-4 text-sm font-noto text-gray-300 max-h-[60cqh] overflow-y-auto pr-2">
                            {/* 一旦非表示
                            <div className="text-center">
                                <p className="text-xs font-orbitron text-luna-gold/50 tracking-widest mb-1">PRODUCER / SCENARIO</p>
                                <p className="font-semibold text-white">TWOMOONS DEV TEAM</p>
                            </div>

                            <div className="text-center">
                                <p className="text-xs font-orbitron text-luna-gold/50 tracking-widest mb-1">GRAPHICS & DESIGN</p>
                                <p className="text-white text-sm">Holographic Neural Generator</p>
                            </div>
                            */}

                            <div className="text-center w-full">
                                <p className="text-sm font-orbitron text-luna-gold/80 tracking-widest mb-6">■BGM素材・使用楽曲</p>

                                <div className="max-w-lg mx-auto text-left w-full">
                                    <p className="text-white text-sm mb-3 pl-2 border-l-2 border-luna-gold/30">DOVA-SYNDROME　様</p>
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
                                        <div className="flex items-start">
                                            <span className="w-36 shrink-0">FLASH☆BEAT様</span>
                                            <span className="text-gray-400 leading-relaxed">「Incredible Power」</span>
                                        </div>
                                    </div>

                                    <p className="text-white text-sm mt-8 mb-3 pl-2 border-l-2 border-luna-gold/30">BGMer　様</p>
                                    <div className="flex flex-col gap-2 text-[11px] text-gray-300 pl-3">
                                        <div className="flex items-start">
                                            <span className="text-gray-400 leading-relaxed">「不安の種」</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="text-center w-full mt-8">
                                <p className="text-sm font-orbitron text-luna-gold/80 tracking-widest mb-6">■効果音・SE</p>

                                <div className="max-w-lg mx-auto text-left w-full">
                                    <p className="text-white text-sm mb-3 pl-2 border-l-2 border-luna-gold/30">OtoLogic　様</p>
                                </div>
                            </div>

                            <div className="border-t border-luna-gold/10 pt-3 text-center text-xs text-gray-400">
                                <p className="mt-1">青い月と金色に光る本物の月が紡ぐ、</p>
                                <p>近未来SFノベルアドベンチャー。</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowCredits(false)}
                            className="mt-6 w-full py-2 bg-luna-gold/5 border border-luna-gold/20 text-luna-gold/80 font-orbitron text-xs tracking-widest rounded
                         hover:bg-luna-gold/15 hover:border-luna-gold/40 hover:text-white transition-all duration-300"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
