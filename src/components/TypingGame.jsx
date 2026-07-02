import React, { useState, useEffect, useRef } from 'react';

const TYPING_WORDS = [
  'LUNAR_WAVE_OVERDRIVE',
  'BLOCK_PORT_2001',
  'DECRYPT_S_DATA',
  'REVERSE_TRACE_ACTIVE'
];

export default function TypingGame({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds limit
  const [isGameOver, setIsGameOver] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef(null);

  const currentWord = TYPING_WORDS[wordIndex];

  // Start game timer
  useEffect(() => {
    if (!hasStarted || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGameOver(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isGameOver]);

  // Handle game input via window keydown
  useEffect(() => {
    if (!hasStarted || isGameOver) return;

    const handleKeyDown = (e) => {
      // Allow only normal character typing
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
        return;
      }

      const nextChar = currentWord[typedInput.length];
      
      // We check case-insensitive or exact match. Usually exact match for code strings is cooler.
      if (e.key.toUpperCase() === nextChar) {
        const newTyped = typedInput + nextChar;
        setTypedInput(newTyped);

        // Word completed!
        if (newTyped === currentWord) {
          if (wordIndex + 1 < TYPING_WORDS.length) {
            // Move to next word
            setWordIndex((prev) => prev + 1);
            setTypedInput('');
          } else {
            // All words complete! Success!
            handleGameOver(true);
          }
        }
      } else {
        // Mistake! Shake effect
        triggerShake();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, isGameOver, typedInput, wordIndex, currentWord]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  const handleGameOver = (success) => {
    setIsGameOver(true);
    setIsSuccess(success);
    
    // Automatically transition back to the main game after 3 seconds
    setTimeout(() => {
      onComplete(success);
    }, 3000);
  };

  const percentProgress = (timeLeft / 30) * 100;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 bg-[#030712]/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-all duration-500 font-orbitron p-6 overflow-hidden ${
        shake ? 'animate-shake' : ''
      } ${timeLeft <= 10 ? 'border border-red-600/50' : ''}`}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30" />

      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.02)_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none" />

      {!hasStarted ? (
        <div className="text-center z-20 max-w-lg">
          <div className="text-red-500 text-6xl animate-pulse mb-4">⚠ SECURITY BREACH ⚠</div>
          <h2 className="text-2xl text-cyan-400 tracking-[0.2em] font-bold mb-4">
            リミット・タイピング
          </h2>
          <p className="text-gray-300 font-light tracking-[0.2em] leading-[2.2] text-sm mb-8">
            何者かがあなたの端末ポート経由でシステムへハッキングを仕掛けています。<br />
            制限時間内に指定された防衛セキュリティコードを入力し、ハッキングを遮断、および逆探知を成功させてください！
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="text-red-400/80 hover:text-red-400 bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-md shadow border border-red-500/20 font-light tracking-[0.3em] transition-all duration-300"
          >
            [ 防衛プログラム起動 ]
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl text-center z-20 flex flex-col justify-between h-full py-12">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-xs tracking-widest ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-cyan-500'}`}>
                {timeLeft <= 10 ? 'CRITICAL STATUS: DEFENSE SYSTEM COMPROMISED' : 'STATUS: REVERSING EXPLOIT...'}
              </span>
              <span className="text-gray-500 text-xs">
                NODE: {wordIndex + 1} / {TYPING_WORDS.length}
              </span>
            </div>

            {/* Timer and Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 text-xs tracking-widest">FIREWALL DECAY RATE:</span>
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-bounce' : 'text-cyan-400'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden p-[2px] border border-cyan-500/20">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    timeLeft <= 10 ? 'bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gradient-to-r from-cyan-600 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                  }`}
                  style={{ width: `${percentProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Typing Area */}
          <div className="my-auto py-8">
            {isGameOver ? (
              <div className="animate-fadeIn">
                {isSuccess ? (
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-green-400 tracking-[0.2em] mb-4 drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]">
                      TRACE COMPLETED
                    </h1>
                    <p className="text-gray-300 font-light tracking-[0.2em] leading-[2.2] text-sm md:text-base mt-4">
                      ハッキングの遮断に成功！ 侵入者の逆探知を完了しました。
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 tracking-[0.2em] mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                      CONNECTION LOST
                    </h1>
                    <p className="text-gray-300 font-light tracking-[0.2em] leading-[2.2] text-sm md:text-base mt-4">
                      ファイアウォールが突破されました。強制シャットダウンを実行します。
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative p-10 bg-black/80 border border-white/10 rounded-sm shadow-2xl">
                {/* Visual of currently typing word */}
                <div className="text-4xl md:text-5xl font-bold tracking-[0.1em] mb-6 flex justify-center flex-wrap select-none">
                  {currentWord.split('').map((char, index) => {
                    let charColor = 'text-gray-600';
                    if (index < typedInput.length) {
                      charColor = 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]';
                    } else if (index === typedInput.length) {
                      charColor = 'text-white border-b-2 border-white animate-pulse';
                    }
                    return (
                      <span key={index} className={`font-mono ${charColor}`}>
                        {char === '_' ? '＿' : char}
                      </span>
                    );
                  })}
                </div>
                <div className="text-xs text-cyan-500/60 tracking-[0.2em] font-light mt-6 text-center">
                  キーボードから直接上記の英数字を入力してください
                </div>
              </div>
            )}
          </div>

          {/* Footer UI Details */}
          <div className="border-t border-cyan-500/10 pt-4 flex justify-between items-center text-[10px] text-gray-500">
            <span>ALGORITHM: LUNAR-AES-256</span>
            <span>IP TRACE: ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}
