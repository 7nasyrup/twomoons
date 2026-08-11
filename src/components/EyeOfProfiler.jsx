import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldAlert, Check, X, Crosshair, Award, ArrowLeftRight } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

const TARGETS_DATA = {
  drone: {
    id: 'drone',
    name: '監視ドローン',
    desc: '防衛局または裏の組織が放った自律型スキャンデバイス。',
    resultText: '【監視ドローンの特定】防衛局のドローン。こちらの月波適応度をスキャンしようとしていた形跡。しかし誰かによってハッキングされ、機能停止している。',
    color: '#06b6d4', // Cyan
    top: '15%',      // Higher up in the sky
    left: '125cqw',    // Panoramic coordinate
    width: '90px',
    height: '90px'
  },
  mutsunori: {
    id: 'mutsunori',
    name: '不審な影：睦典？',
    desc: '電柱の陰、微かに漏れる熱量波形。',
    resultText: '【睦典のプロファイリング】割烹着の代わりに、見たこともない特殊戦闘装備を纏っている。実家の包丁ではなく、巨大な大剣の柄を握り締め、こちらを見守るように静止していた。周囲の熱量が完全に凍結している。',
    color: '#bc84ee', // Purple
    top: '60%',      // Middle-low on the street
    left: '30cqw',
    width: '100px',
    height: '140px'
  },
  mika: {
    id: 'mika',
    name: '不審な影：ミカ？',
    desc: 'ビルの隙間に溶ける、五感ノイズの発生源。',
    resultText: '【ミカのプロファイリング】闇に溶ける特殊な迷彩マントを羽織り、指先から感覚幻覚を遮断する微細なノイズを散布している。しかしその視線は、ただ一途にこちらの安全を監視しているようだ。',
    color: '#ff758f', // Pink
    top: '45%',      // Mid-level
    left: '165cqw',
    width: '100px',
    height: '130px'
  },
  nagisa: {
    id: 'nagisa',
    name: '不審な影：凪砂？',
    desc: 'ベンチの背後、時間計測の干渉波。',
    resultText: '【凪砂のプロファイリング】暗闇の中、虚空の一点を見つめたまま、因果律の因果線をその眼球で数秒先まで絶対予知している。脳に凄まじい激痛が走っているのか、冷や汗を流しながら、こちらの足元を見つめている。',
    color: '#ffb703', // Yellow/Gold
    top: '72%',      // Low down near a bench/ground
    left: '85cqw',
    width: '100px',
    height: '120px'
  }
};

export default function EyeOfProfiler({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [scanned, setScanned] = useState({ drone: false, mutsunori: false, mika: false, nagisa: false });
  const [activeProfile, setActiveProfile] = useState(null);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'failed'
  
  // Panoramic scroll states (X and Y panning)
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const panStartX = useRef(0);
  const panStartY = useRef(0);
  const containerRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  const handleMouseDown = (e) => {
    if (gameState !== 'playing' || activeProfile) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    panStartX.current = panX;
    panStartY.current = panY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging || gameState !== 'playing' || activeProfile) return;
    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;
    
    // Width is 200cqw (max pan is 100cqw), Height is 150cqh (max pan is 50cqh)
    const maxPanX = window.innerWidth;
    const maxPanY = window.innerHeight * 0.5;
    
    const nextPanX = Math.max(0, Math.min(maxPanX, panStartX.current - deltaX));
    const nextPanY = Math.max(0, Math.min(maxPanY, panStartY.current - deltaY));
    
    setPanX(nextPanX);
    setPanY(nextPanY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Support
  const handleTouchStart = (e) => {
    if (gameState !== 'playing' || activeProfile) return;
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
    panStartX.current = panX;
    panStartY.current = panY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || gameState !== 'playing' || activeProfile) return;
    const deltaX = e.changedTouches ? e.changedTouches[0].clientX - dragStartX.current : e.touches[0].clientX - dragStartX.current;
    const deltaY = e.changedTouches ? e.changedTouches[0].clientY - dragStartY.current : e.touches[0].clientY - dragStartY.current;
    
    const maxPanX = window.innerWidth;
    const maxPanY = window.innerHeight * 0.5;
    
    const nextPanX = Math.max(0, Math.min(maxPanX, panStartX.current - deltaX));
    const nextPanY = Math.max(0, Math.min(maxPanY, panStartY.current - deltaY));
    
    setPanX(nextPanX);
    setPanY(nextPanY);
  };

  const handleScanTarget = (key, e) => {
    e.stopPropagation(); // Prevent drag end triggering click
    if (gameState !== 'playing' || scanned[key] || isDragging) return;

    const updatedScanned = { ...scanned, [key]: true };
    setScanned(updatedScanned);
    setActiveProfile(key);

    const allScanned = Object.values(updatedScanned).every(Boolean);
    if (allScanned) {
      setGameState('won');
    }
  };

  const handleCloseProfile = () => {
    setActiveProfile(null);
  };

  const handleFinish = (success) => {
    onComplete(success);
  };

  const totalScanned = Object.values(scanned).filter(Boolean).length;

  return (
    <div className="absolute inset-0 bg-black z-50 overflow-hidden select-none font-orbitron">
      
      {/* Panorama Exploration Map Area (Full Screen) */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Scrollable Panorama Track (2D panning using translate) */}
        <div 
          className="absolute left-0 top-0 w-[200cqw] h-[150cqh] transition-transform duration-100 ease-out"
          style={{ 
            transform: `translate(-${panX}px, -${panY}px)`
          }}
        >
          {/* Background image: night.jpg */}
          {!imageError ? (
            <img
              src={assetPath('/scene/night.jpg')}
              alt="residential street night"
              className="w-full h-full object-cover pointer-events-none select-none filter brightness-10 contrast-125"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Cyber green digital fallback background */
            <div className="w-full h-full relative bg-gradient-to-r from-[#011a0a] via-[#022f12] to-[#011a0a] flex items-center justify-around">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black_90%)]" />
              <div className="text-green-500/10 font-bold text-9xl select-none tracking-[0.5em] font-orbitron">NV_ZONE</div>
            </div>
          )}

          {/* Floating targets placed absolutely inside 200cqw width and 150cqh height panoramic bg */}
          {Object.entries(TARGETS_DATA).map(([key, target]) => {
            const isScanned = scanned[key];
            return (
              <button
                key={key}
                disabled={gameState !== 'playing' || isScanned}
                onClick={(e) => handleScanTarget(key, e)}
                className="absolute group flex flex-col items-center justify-center focus:outline-none transition-all duration-300"
                style={{
                  top: target.top,
                  left: target.left,
                  width: target.width,
                  height: target.height
                }}
              >
                <div 
                  className={`relative w-full h-full flex items-center justify-center border rounded-full transition-all duration-300 ${
                    isScanned 
                      ? 'border-green-500 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.6)]' 
                      : 'border-red-500/40 bg-red-950/10 hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse'
                  }`}
                >
                  <div className="absolute inset-2 border border-dashed rounded-full border-white/10" />
                  <Crosshair className={`w-8 h-8 ${isScanned ? 'text-green-400' : 'text-red-500 group-hover:text-red-400 animate-spin [animation-duration:12s]'}`} />

                  {isScanned && (
                    <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white rounded-full p-0.5 text-[8px] z-30 font-mono">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <span className={`text-[10px] mt-1 tracking-widest font-mono font-bold ${isScanned ? 'text-green-400' : 'text-red-400/80 group-hover:text-red-200'}`}>
                  {isScanned ? 'SCANNED' : 'UNIDENTIFIED'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Drag tutorial indicator overlay (fades after 4 seconds) */}
        <motion.div 
          className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/80 border border-green-500/30 text-green-400 text-[10px] tracking-[0.2em] px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <ArrowLeftRight className="w-3.5 h-3.5 animate-bounce" />
          ドラッグして視点を上下左右に動かしてください
        </motion.div>
      </div>

      {/* Night Vision / HUD Overlays (Absolute Overlay) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,36,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(0,255,0,0.04),rgba(0,255,0,0.01),rgba(0,255,0,0.04))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-40" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-10" />

      {/* Large HUD Circular Vignette (Scope) (Absolute Overlay) */}
      <div className="absolute inset-0 border-[30px] border-black/40 rounded-[20%] pointer-events-none z-20 flex items-center justify-center">
        <div className="w-[85cqh] h-[85cqh] rounded-full border border-green-500/10 absolute pointer-events-none" />
        <div className="w-[65cqh] h-[65cqh] rounded-full border border-green-500/20 border-dashed absolute pointer-events-none" />
        <div className="w-[45cqh] h-[45cqh] rounded-full border-2 border-green-500/30 absolute pointer-events-none flex items-center justify-center">
          <div className="w-4 h-[1px] bg-green-500" />
          <div className="h-4 w-[1px] bg-green-500" />
        </div>
      </div>

      {/* Header Info Overlay */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow">
        <h2 className="text-sm font-light text-green-400 tracking-[0.2em] flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          暗闇の監視網：住宅街（夜）視点探索
        </h2>
      </div>
      <div className="absolute top-8 right-8 z-20 pointer-events-none bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow flex gap-6 text-right">
        <div>
          <span className="text-[8px] text-green-500/60 block uppercase font-mono tracking-[0.2em]">TIMER</span>
          <span className={`text-sm font-light font-mono tracking-[0.2em] ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
          </span>
        </div>
        <div>
          <span className="text-[8px] text-green-500/60 block uppercase font-mono tracking-[0.2em]">SCAN</span>
          <span className="text-sm font-light font-mono text-green-400 tracking-[0.2em]">
            {totalScanned} / 4
          </span>
        </div>
      </div>

      {/* Footer Instructions / Info (Absolute Overlay) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-md shadow flex items-center gap-4 text-xs font-light tracking-[0.2em]">
        <span className="text-green-500/60">【ドラッグ：視点移動】 【クリック：スキャン】</span>
        <span className="text-green-400">100%特定で裏イベント解放</span>
      </div>

      {/* Single Target Profiling Popup */}
      <AnimatePresence>
        {activeProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 flex justify-center items-center p-4 z-[90]"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="w-full max-w-2xl bg-black/80 border border-white/10 rounded-sm p-10 relative flex flex-col shadow-2xl h-[55cqh] justify-between overflow-hidden backdrop-blur-md"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-light tracking-[0.2em] text-green-400">
                    {TARGETS_DATA[activeProfile].name}
                  </h3>
                </div>
                <button
                  onClick={handleCloseProfile}
                  className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 flex flex-col gap-3 py-4 overflow-y-auto">
                <div className="text-gray-300 font-light tracking-[0.2em] leading-[2.2] text-sm md:text-base whitespace-pre-line">
                  {TARGETS_DATA[activeProfile].resultText}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mt-auto">
                <span className="text-green-400/80 flex items-center gap-2 text-xs font-light tracking-[0.2em]">
                  <Check className="w-4 h-4 text-green-400" />
                  ターゲットの特定データをロードしました。
                </span>
                <button
                  onClick={handleCloseProfile}
                  className="text-xs text-gray-400 hover:text-white transition-colors tracking-[0.2em] font-light"
                >
                  [ 探索を続ける ]
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result/Final Screen */}
      <AnimatePresence>
        {(gameState === 'won' || gameState === 'failed') && !activeProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#011408]/98 flex flex-col items-center justify-center p-6 z-[90]"
          >
            {/* Holographic background radar */}
            <div className="absolute w-[60cqh] h-[60cqh] rounded-full border border-green-500/5 shadow-[0_0_80px_rgba(34,197,94,0.03)] pointer-events-none" />

            <div className="w-full max-w-xl border border-white/10 rounded-sm p-10 bg-black/80 backdrop-blur-md relative flex flex-col items-center text-center shadow-2xl">
              {gameState === 'won' ? (
                <>
                  <Award className="w-12 h-12 text-green-400 mb-6 animate-bounce" />
                  <h2 className="text-lg md:text-xl font-light text-green-400 tracking-[0.2em] mb-6">
                    100% プロファイリング成功！
                  </h2>
                  <p className="text-gray-300 font-light tracking-[0.2em] leading-[2.2] text-sm md:text-base mb-8 max-w-md">
                    素晴らしい観察眼です。制限時間内にすべての不審信号の特定に成功しました。<br />
                    彼らの日常の裏にある真の顔をプロファイリングし、特別な裏イベントへの分岐フラグを獲得しました。
                  </p>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-12 h-12 text-red-500 mb-6 animate-pulse" />
                  <h2 className="text-lg md:text-xl font-light text-red-500 tracking-[0.2em] mb-6">
                    プロファイリング失敗
                  </h2>
                  <p className="text-gray-300 font-light tracking-[0.2em] leading-[2.2] text-sm md:text-base mb-8 max-w-md">
                    制限時間内にすべてのターゲットを特定できませんでした。<br />
                    不審な視線の影を暴けないまま、不穏な通常ルートへ進行します。
                  </p>
                </>
              )}

              <button
                onClick={() => handleFinish(gameState === 'won')}
                className="mt-2 text-white/60 hover:text-white transition-all text-sm font-light tracking-[0.2em] flex items-center gap-2"
              >
                [ {gameState === 'won' ? '裏イベント・本編を体験する' : '通常シナリオへ戻る'} ]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
