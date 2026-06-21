import React, { useState, useEffect, useRef } from 'react';

const LANES = [
  { id: 0, key: 'A', label: 'LANE A (Key: A)' },
  { id: 1, key: 'S', label: 'LANE B (Key: S)' },
  { id: 2, key: 'D', label: 'LANE C (Key: D)' }
];

export default function SilentScore({ onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [syncedRate, setSyncedRate] = useState(10); // Start at 10%
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds
  const [judgement, setJudgement] = useState(''); // Perfect, Great, Good, Miss
  const [judgementColor, setJudgementColor] = useState('text-cyan-400');
  const [notes, setNotes] = useState([]); // Array of { id, lane, y (0 to 100) }

  const timerRef = useRef(null);
  const noteIdCounter = useRef(0);
  const spawnTimer = useRef(0);
  const timeLeftRef = useRef(20);

  // We use this ref to synchronously track game state within the setInterval callback
  // to avoid React Render Phase conflicts and Stale Closure bugs entirely!
  const gameStateRef = useRef({
    score: 0,
    combo: 0,
    maxCombo: 0,
    syncedRate: 10,
    isPlaying: false
  });

  // Start the 3-Lane scrolling rhythm game
  const startGame = () => {
    gameStateRef.current = {
      score: 0,
      combo: 0,
      maxCombo: 0,
      syncedRate: 15, // Start with a safe 15%
      isPlaying: true
    };

    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setSyncedRate(15);
    setTimeLeft(20);
    setNotes([]);
    setJudgement('START!');
    setJudgementColor('text-indigo-400');
    timeLeftRef.current = 20;

    if (timerRef.current) clearInterval(timerRef.current);

    // Clean 30ms timer loop (no requestAnimationFrame rendering conflicts!)
    timerRef.current = setInterval(() => {
      // 1. Time Update
      timeLeftRef.current = Math.max(0, timeLeftRef.current - 0.03);
      setTimeLeft(Number(timeLeftRef.current.toFixed(2)));

      if (timeLeftRef.current <= 0) {
        endGame();
        return;
      }

      // 2. Note Spawning
      spawnTimer.current += 0.03;
      if (spawnTimer.current >= 0.7) { // Spawn a note every 0.7 seconds
        spawnTimer.current = 0;
        const randomLane = Math.floor(Math.random() * LANES.length);
        setNotes((prevNotes) => [
          ...prevNotes,
          { id: noteIdCounter.current++, lane: randomLane, y: 0 }
        ]);
      }

      // 3. Note Movement & Miss collision detection
      setNotes((prevNotes) => {
        let hasMissed = false;
        const movedNotes = prevNotes.map((note) => ({
          ...note,
          y: note.y + 3.0 // Move down by 3% every 30ms (takes ~1.0s to cross line)
        }));

        const activeNotes = movedNotes.filter((note) => {
          if (note.y > 100) { // Crossed the hit line too far (Miss)
            hasMissed = true;
            return false;
          }
          return true;
        });

        // Trigger miss state outside the React state setting callback to prevent React crashes!
        if (hasMissed) {
          setTimeout(() => {
            const state = gameStateRef.current;
            if (!state.isPlaying) return;
            state.combo = 0;
            state.syncedRate = Math.max(0, state.syncedRate - 5);
            
            setJudgement('MISS');
            setJudgementColor('text-red-500 animate-pulse');
            setCombo(0);
            setSyncedRate(state.syncedRate);
          }, 0);
        }

        return activeNotes;
      });
    }, 30);
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    gameStateRef.current.isPlaying = false;
    setIsPlaying(false);
    setIsGameOver(true);
  };

  // Keyboard hit handling (A, S, D keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      const keyUpper = e.key.toUpperCase();
      const lane = LANES.find((l) => l.key === keyUpper);
      if (lane !== undefined) {
        triggerHit(lane.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, notes]);

  // Hit scoring mechanics
  const triggerHit = (laneId) => {
    const state = gameStateRef.current;
    if (!state.isPlaying) return;

    // Find closest note in the hit lane
    let closestNote = null;
    let closestDistance = 100;

    notes.forEach((note) => {
      if (note.lane === laneId) {
        const distance = Math.abs(note.y - 85); // 85% y is the perfect hit line
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNote = note;
        }
      }
    });

    if (closestNote && closestDistance < 25) { // Hit window limit
      // Remove hit note
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== closestNote.id));

      let hitJudgement = 'GOOD';
      let hitColor = 'text-green-400';
      let scoreAdd = 50;
      let rateAdd = 3;

      if (closestDistance < 6) {
        hitJudgement = 'PERFECT';
        hitColor = 'text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.8)] font-black scale-105';
        scoreAdd = 150;
        rateAdd = 10;
      } else if (closestDistance < 13) {
        hitJudgement = 'GREAT';
        hitColor = 'text-cyan-300 font-bold';
        scoreAdd = 100;
        rateAdd = 6;
      }

      state.score += scoreAdd;
      state.syncedRate = Math.min(100, state.syncedRate + rateAdd);
      state.combo += 1;
      state.maxCombo = Math.max(state.maxCombo, state.combo);

      setScore(state.score);
      setSyncedRate(state.syncedRate);
      setCombo(state.combo);
      setMaxCombo(state.maxCombo);
      setJudgement(hitJudgement);
      setJudgementColor(hitColor);
    } else {
      // Empty hit or bad timing
      state.combo = 0;
      state.syncedRate = Math.max(0, state.syncedRate - 4);
      
      setCombo(0);
      setSyncedRate(state.syncedRate);
      setJudgement('BAD HIT');
      setJudgementColor('text-orange-500');
    }
  };

  // Clean up timer interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#020510]/95 flex flex-col items-center justify-between z-50 p-6 font-orbitron border-4 border-indigo-500/30 overflow-hidden select-none">
      {/* Scanline / Neon Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(99,102,241,0.03),rgba(0,0,0,0),rgba(99,102,241,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <div className="w-full max-w-2xl flex justify-between items-center border-b border-indigo-500/20 pb-3 z-20">
        <div>
          <span className="text-indigo-400 text-[10px] tracking-[0.3em] uppercase block mb-0.5">SYSTEM C: SILENT SCORE</span>
          <h2 className="text-base md:text-lg font-bold text-cyan-400 tracking-wider">
            波長中和・同調率シンクロ
          </h2>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-500 block">TIME REMAINING</span>
          <span className={`text-lg font-mono font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-indigo-300'}`}>
            {Math.max(0, timeLeft).toFixed(1)}s
          </span>
        </div>
      </div>

      {/* Game Content */}
      {!isPlaying && !isGameOver ? (
        // Start Screen
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md z-20 animate-fadeIn p-4">
          <div className="relative w-16 h-16 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-pink-500/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-pink-400/50" />
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="text-lg font-bold text-indigo-300 tracking-[0.2em] mb-3">
            サイレント・スコア
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed mb-8 font-noto tracking-wider">
            攻略対象の男が、異能の暴走（過負荷）で激痛に苦しんでいます。<br />
            あなたの「中和」の波長を彼と完璧に同調させ、精神を繋ぎ止めてください！<br /><br />
            <span className="text-indigo-400 font-bold">【操作方法】</span><br />
            上から降ってくるノーツが下部の判定サークル（丸枠）に重なるタイミングで、<br />
            キーボードの <span className="text-white font-mono bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30 font-bold text-sm">A</span>, <span className="text-white font-mono bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30 font-bold text-sm">S</span>, <span className="text-white font-mono bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30 font-bold text-sm">D</span> キーを押すか、<br />
            下部の各レーンの判定ボタンを直接タップしてください！
          </p>
          <button
            onClick={startGame}
            className="px-12 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold tracking-[0.3em] text-sm rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-300 transform active:scale-95"
          >
            同調シンクロ開始
          </button>
        </div>
      ) : isGameOver ? (
        // Results Screen
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md z-20 animate-fadeIn p-4">
          <div className="text-yellow-400 text-4xl mb-3">🏆</div>
          <h3 className="text-base font-bold text-white tracking-[0.2em] mb-4 uppercase">
            SYNCHRONIZATION RESULTS
          </h3>
          
          <div className="w-full bg-[#04091a]/80 border border-indigo-500/20 rounded-xl p-5 space-y-3.5 mb-8 font-mono text-left">
            <div className="flex justify-between border-b border-indigo-500/10 pb-2">
              <span className="text-gray-400 text-xs uppercase tracking-wider">FINAL SYNCED RATE</span>
              <span className="text-pink-400 font-bold text-base">{syncedRate}%</span>
            </div>
            <div className="flex justify-between border-b border-indigo-500/10 pb-2">
              <span className="text-gray-400 text-xs uppercase tracking-wider">TOTAL SCORE</span>
              <span className="text-indigo-300 font-bold text-base">{score} pts</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-gray-400 text-xs uppercase tracking-wider">MAX COMBO</span>
              <span className="text-yellow-400 font-bold text-base">{maxCombo} Combo</span>
            </div>
          </div>

          <button
            onClick={() => onComplete({ score, maxCombo, syncedRate })}
            className="px-12 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-[0.2em] text-sm rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            体験を完了する
          </button>
        </div>
      ) : (
        // Active 3-Lane gameplay arena
        <div className="flex-1 w-full max-w-lg flex flex-col justify-between z-20 py-2 items-center">
          {/* Top Status & Sync Rate Bar */}
          <div className="w-full bg-slate-950/60 p-3 rounded-xl border border-indigo-500/10 mb-2">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] text-indigo-300 tracking-wider flex items-center gap-1.5 uppercase font-mono">
                <span className={`inline-block w-2 h-2 rounded-full ${syncedRate > 50 ? 'bg-pink-500 animate-pulse' : 'bg-indigo-500'}`} />
                WAVELENGTH SYNC STATUS:
              </span>
              <span className="text-xs font-bold text-pink-400 font-mono">{syncedRate}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full p-[1.5px] border border-indigo-500/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${syncedRate}%` }}
              />
            </div>
          </div>

          {/* Gameplay Scrolling Lanes */}
          <div className="flex-1 w-full bg-[#030514]/90 rounded-xl border border-indigo-500/20 relative flex overflow-hidden min-h-[42vh] my-2 select-none">
            {/* Lane Dividing Lines */}
            <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-indigo-500/10" />
            <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-indigo-500/10" />

            {/* Perfect Judgement Hit Line */}
            <div className="absolute bottom-[15%] left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500/20 via-cyan-400 to-indigo-500/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-10" />

            {/* Scrolling Notes */}
            {notes.map((note) => (
              <div
                key={note.id}
                className="absolute w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 border-2 border-white shadow-[0_0_12px_rgba(168,85,247,0.6)] transform -translate-x-1/2 flex items-center justify-center text-xs text-white font-extrabold font-mono transition-all duration-75"
                style={{
                  left: note.lane === 0 ? '16.66%' : note.lane === 1 ? '50%' : '83.33%',
                  top: `${note.y}%`,
                  transform: 'translate(-50%, -50%) scale(1.1)'
                }}
              >
                {LANES[note.lane].key}
              </div>
            ))}

            {/* Judgement Feedback Floating Text */}
            {judgement && (
              <div className="absolute top-[40%] left-0 right-0 text-center pointer-events-none select-none z-30">
                <div className={`text-2xl font-black tracking-[0.15em] ${judgementColor} uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}>
                  {judgement}
                </div>
                {combo > 0 && (
                  <div className="text-xs font-bold text-yellow-400 mt-1 font-mono uppercase tracking-widest animate-bounce">
                    {combo} Combo!
                  </div>
                )}
              </div>
            )}

            {/* Bottom Hit Indicators (Clickable/Tappable) */}
            <div className="absolute bottom-[5%] left-0 right-0 h-16 flex justify-around items-center px-4">
              {LANES.map((lane) => (
                <button
                  key={lane.id}
                  onClick={() => triggerHit(lane.id)}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500/40 bg-indigo-950/40 flex flex-col justify-center items-center group active:scale-95 hover:border-pink-500/80 transition-all duration-100 z-20 shadow-[inset_0_0_12px_rgba(99,102,241,0.15)]"
                >
                  <span className="text-xs font-bold text-indigo-300 group-hover:text-pink-300 font-mono">
                    {lane.key}
                  </span>
                  <span className="text-[8px] text-gray-500 tracking-tighter uppercase">
                    TAP
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Score & Combo Panel */}
          <div className="w-full flex justify-between items-center text-xs font-mono px-3 py-1 border-t border-indigo-500/10 mt-1">
            <span className="text-gray-500">MAX COMBO: <span className="text-yellow-400 font-bold">{maxCombo}</span></span>
            <span className="text-gray-300 font-bold">SCORE: <span className="text-indigo-400 font-bold">{score} PTS</span></span>
          </div>
        </div>
      )}
    </div>
  );
}
