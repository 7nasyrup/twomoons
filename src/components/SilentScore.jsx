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

  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const audioCtxRef = useRef(null);
  const noteIdCounter = useRef(0);
  const spawnTimer = useRef(0);
  const timeLeftRef = useRef(20);
  const prevDisplayTimeRef = useRef(20);
  const lastTimeRef = useRef(0);

  const notesRef = useRef([]); // Array of { id, lane, spawnTime, targetTime, hit, missed }
  const effectsRef = useRef([]); // Array of hit animation effects
  const pressedKeysRef = useRef({ 0: false, 1: false, 2: false });

  // Game state reference for reading/writing synchronously inside animation frame callback
  const gameStateRef = useRef({
    score: 0,
    combo: 0,
    maxCombo: 0,
    syncedRate: 10,
    isPlaying: false
  });

  // Synthesize a zero-latency pitch-dropped synth tap sound using Web Audio API
  const playHitSound = (frequency = 600, duration = 0.08) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio synthesis failed', e);
    }
  };

  const addHitEffect = (laneId, color) => {
    effectsRef.current.push({
      id: Math.random(),
      lane: laneId,
      startTime: performance.now(),
      color: color,
      particles: Array.from({ length: 12 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.0 + Math.random() * 2.5;
        return {
          x: 0,
          y: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.5
        };
      })
    });
  };

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
    setJudgement('START!');
    setJudgementColor('text-indigo-400');

    timeLeftRef.current = 20;
    prevDisplayTimeRef.current = 20;
    spawnTimer.current = 0;
    noteIdCounter.current = 0;
    notesRef.current = [];
    effectsRef.current = [];
    lastTimeRef.current = performance.now();

    if (requestRef.current) cancelAnimationFrame(requestRef.current);

    // Main animation & game loop logic
    const tick = () => {
      if (!gameStateRef.current.isPlaying) return;

      const now = performance.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // 1. Time Update
      timeLeftRef.current = Math.max(0, timeLeftRef.current - delta / 1000);
      const displayTime = Number(timeLeftRef.current.toFixed(1));
      if (displayTime !== prevDisplayTimeRef.current) {
        setTimeLeft(displayTime);
        prevDisplayTimeRef.current = displayTime;
      }

      if (timeLeftRef.current <= 0) {
        endGame();
        return;
      }

      // 2. Note Spawning (700ms intervals)
      spawnTimer.current += delta;
      if (spawnTimer.current >= 700) {
        spawnTimer.current -= 700;
        const randomLane = Math.floor(Math.random() * LANES.length);
        notesRef.current.push({
          id: noteIdCounter.current++,
          lane: randomLane,
          spawnTime: now,
          targetTime: now + 850,
          hit: false,
          missed: false
        });
      }

      // 3. Note Movement & Miss Collision Detection
      const activeNotes = [];
      for (const note of notesRef.current) {
        const elapsed = now - note.spawnTime;
        const yPercentage = elapsed / 10; // 1000ms = 100% position

        if (yPercentage > 103 && !note.hit && !note.missed) {
          note.missed = true;
          // Trigger miss penalty
          const state = gameStateRef.current;
          state.combo = 0;
          state.syncedRate = Math.max(0, state.syncedRate - 5);

          setJudgement('MISS');
          setJudgementColor('text-red-500 animate-pulse');
          setCombo(0);
          setSyncedRate(state.syncedRate);
          playHitSound(220, 0.12); // Buzz tone for miss
        }

        // Keep note in array if not hit and not completed off-screen
        if (elapsed < 1100 && !note.hit) {
          activeNotes.push(note);
        }
      }
      notesRef.current = activeNotes;

      // 4. Render current frame to canvas
      draw();

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
  };

  const endGame = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    gameStateRef.current.isPlaying = false;
    setIsPlaying(false);
    setIsGameOver(true);
  };

  // Keyboard hit handling
  const triggerHit = (laneId) => {
    const state = gameStateRef.current;
    if (!state.isPlaying) return;

    const now = performance.now();
    let closestNote = null;
    let closestDiff = Infinity;

    // Find the closest active note in target lane
    for (const note of notesRef.current) {
      if (note.lane === laneId && !note.hit && !note.missed) {
        const diff = now - note.targetTime;
        if (Math.abs(diff) < Math.abs(closestDiff)) {
          closestDiff = diff;
          closestNote = note;
        }
      }
    }

    // Hit window check (maximum 250ms offset)
    if (closestNote && Math.abs(closestDiff) < 250) {
      closestNote.hit = true;
      const absDiff = Math.abs(closestDiff);

      let hitJudgement = 'GOOD';
      let hitColor = 'text-green-400';
      let scoreAdd = 50;
      let rateAdd = 3;
      let effectColor = 'rgba(74, 222, 128, 0.8)';
      let synthFreq = 500;

      if (absDiff < 60) {
        hitJudgement = 'PERFECT';
        hitColor = 'text-yellow-300 drop-shadow-[0_0_12px_rgba(253,224,71,0.8)] font-black scale-105';
        scoreAdd = 150;
        rateAdd = 10;
        effectColor = 'rgba(253, 224, 71, 0.8)';
        synthFreq = 800; // Bright pitch
      } else if (absDiff < 130) {
        hitJudgement = 'GREAT';
        hitColor = 'text-cyan-300 font-bold';
        scoreAdd = 100;
        rateAdd = 6;
        effectColor = 'rgba(34, 211, 238, 0.8)';
        synthFreq = 650; // Medium-bright pitch
      }

      playHitSound(synthFreq, 0.08);
      addHitEffect(laneId, effectColor);

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
      // Empty tap/incorrect timing
      state.combo = 0;
      state.syncedRate = Math.max(0, state.syncedRate - 4);

      setCombo(0);
      setSyncedRate(state.syncedRate);
      setJudgement('BAD HIT');
      setJudgementColor('text-orange-500');
      playHitSound(250, 0.08); // Dull pitch
    }
  };

  const handleButtonDown = (laneId) => {
    pressedKeysRef.current[laneId] = true;
    triggerHit(laneId);
  };

  const handleButtonUp = (laneId) => {
    pressedKeysRef.current[laneId] = false;
  };

  // Render game scene elements to HTML5 Canvas
  const draw = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Scale canvas buffer size by DPI for ultra-crisp vector drawings
    const targetWidth = Math.floor(rect.width * dpr);
    const targetHeight = Math.floor(rect.height * dpr);
    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const cssW = canvas.width / dpr;
    const cssH = canvas.height / dpr;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    // 1. Draw vertical lane dividers
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cssW / 3, 0);
    ctx.lineTo(cssW / 3, cssH);
    ctx.moveTo(2 * cssW / 3, 0);
    ctx.lineTo(2 * cssW / 3, cssH);
    ctx.stroke();

    // 2. Draw vertical active lane glow under tap buttons
    for (let i = 0; i < 3; i++) {
      const laneCenterX = i === 0 ? cssW / 6 : i === 1 ? cssW / 2 : 5 * cssW / 6;
      if (pressedKeysRef.current[i]) {
        const grad = ctx.createLinearGradient(laneCenterX, cssH, laneCenterX, 0);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
        grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(laneCenterX - cssW / 6, 0, cssW / 3, cssH);
      }
    }

    // 3. Draw horizontal judgement line at y = 85%
    const judgementY = cssH * 0.85;
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, judgementY);
    ctx.lineTo(cssW, judgementY);
    ctx.stroke();
    ctx.restore();

    // 4. Draw lane receptor circles
    for (let i = 0; i < 3; i++) {
      const laneCenterX = i === 0 ? cssW / 6 : i === 1 ? cssW / 2 : 5 * cssW / 6;
      const isPressed = pressedKeysRef.current[i];

      ctx.save();
      ctx.beginPath();
      const radius = 26;
      ctx.arc(laneCenterX, judgementY, radius, 0, Math.PI * 2);

      if (isPressed) {
        ctx.fillStyle = 'rgba(236, 72, 153, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#f43f5e';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(244, 63, 94, 0.8)';
      } else {
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
      }
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();
    }

    // 5. Draw active notes
    const now = performance.now();
    for (const note of notesRef.current) {
      if (note.hit) continue;

      const elapsed = now - note.spawnTime;
      const yPercentage = elapsed / 10;
      const noteY = cssH * (yPercentage / 100);
      const laneCenterX = note.lane === 0 ? cssW / 6 : note.lane === 1 ? cssW / 2 : 5 * cssW / 6;
      const noteRadius = 22;

      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';

      const grad = ctx.createRadialGradient(laneCenterX, noteY, 2, laneCenterX, noteY, noteRadius);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#ec4899');
      grad.addColorStop(1, '#6366f1');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.arc(laneCenterX, noteY, noteRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(LANES[note.lane].key, laneCenterX, noteY);
      ctx.restore();
    }

    // 6. Draw visual hit effects (expanding wave rings and sparks)
    const activeEffects = [];
    for (const effect of effectsRef.current) {
      const elapsed = now - effect.startTime;
      const duration = 250;
      const progress = Math.min(1, elapsed / duration);

      if (progress < 1) {
        const laneCenterX = effect.lane === 0 ? cssW / 6 : effect.lane === 1 ? cssW / 2 : 5 * cssW / 6;

        ctx.save();
        const startRadius = 26;
        const endRadius = 60;
        const currentRadius = startRadius + progress * (endRadius - startRadius);
        const opacity = 1 - progress;

        ctx.strokeStyle = effect.color.replace('0.8', opacity.toString());
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(laneCenterX, judgementY, currentRadius, 0, Math.PI * 2);
        ctx.stroke();

        for (const p of effect.particles) {
          p.x = laneCenterX + p.vx * progress * 20;
          p.y = judgementY + p.vy * progress * 20;
          p.alpha = 1 - progress;

          ctx.fillStyle = effect.color.replace('0.8', p.alpha.toString());
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        activeEffects.push(effect);
      }
    }
    effectsRef.current = activeEffects;
  };

  // Mount/Unmount event listener management
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStateRef.current.isPlaying) return;
      const keyUpper = e.key.toUpperCase();
      const lane = LANES.find((l) => l.key === keyUpper);
      if (lane !== undefined) {
        pressedKeysRef.current[lane.id] = true;
        triggerHit(lane.id);
      }
    };

    const handleKeyUp = (e) => {
      const keyUpper = e.key.toUpperCase();
      const lane = LANES.find((l) => l.key === keyUpper);
      if (lane !== undefined) {
        pressedKeysRef.current[lane.id] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      gameStateRef.current.isPlaying = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#020510]/95 flex flex-col items-center justify-between z-50 p-6 font-orbitron overflow-hidden select-none">
      {/* Scanline / Neon Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(99,102,241,0.03),rgba(0,0,0,0),rgba(99,102,241,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow">
        <h2 className="text-sm font-light text-cyan-400 tracking-[0.2em] flex items-center gap-3">
          <span className="text-indigo-400 uppercase tracking-[0.3em]">SYSTEM C //</span>
          波長中和・同調率シンクロ
        </h2>
      </div>
      <div className="absolute top-8 right-8 z-20 pointer-events-none bg-gray-900/50 backdrop-blur-sm px-5 py-2.5 rounded-md shadow text-right">
        <span className="text-[10px] text-gray-400 block tracking-[0.2em]">TIME REMAINING</span>
        <span className={`text-sm font-light font-mono tracking-[0.2em] ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-indigo-300'}`}>
          {Math.max(0, timeLeft).toFixed(1)}s
        </span>
      </div>

      {/* Game Content */}
      {!isPlaying && !isGameOver ? (
        // Start Screen
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md z-20 animate-fadeIn p-4">
          <div className="relative w-16 h-16 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-pink-500/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-pink-400/50" />
            <span className="text-2xl">❤️</span>
          </div>
          <p className="text-gray-300 text-sm leading-[2.2] mb-8 font-light tracking-[0.2em]">
            攻略対象の男が、異能の暴走（過負荷）で激痛に苦しんでいます。<br />
            あなたの「中和」の波長を彼と完璧に同調させ、精神を繋ぎ止めてください！<br /><br />
            <span className="text-indigo-400">【操作方法】</span><br />
            上から降ってくるノーツが下部の判定サークル（丸枠）に重なるタイミングで、<br />
            キーボードの <span className="text-white font-mono bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30 font-light text-xs">A</span>, <span className="text-white font-mono bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30 font-light text-xs">S</span>, <span className="text-white font-mono bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-500/30 font-light text-xs">D</span> キーを押すか、<br />
            下部の各レーンの判定ボタンを直接タップしてください！
          </p>
          <button
            onClick={startGame}
            className="text-pink-400/80 hover:text-pink-400 bg-gray-900/50 backdrop-blur-sm px-6 py-3 rounded-md shadow border border-pink-500/20 font-light tracking-[0.3em] transition-all duration-300"
          >
            [ 同調シンクロ開始 ]
          </button>
        </div>
      ) : isGameOver ? (
        // Results Screen
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md z-20 animate-fadeIn p-4">
          <div className="text-yellow-400 text-4xl mb-6">🏆</div>
          <h3 className="text-base font-light text-white tracking-[0.2em] mb-6 uppercase">
            SYNCHRONIZATION RESULTS
          </h3>

          <div className="w-full bg-black/80 border border-white/10 rounded-sm p-8 space-y-4 mb-8 font-mono text-left shadow-2xl backdrop-blur-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-light">FINAL SYNCED RATE</span>
              <span className="text-pink-400 font-light text-base tracking-[0.2em]">{syncedRate}%</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-light">TOTAL SCORE</span>
              <span className="text-indigo-300 font-light text-base tracking-[0.2em]">{score} pts</span>
            </div>
            <div className="flex justify-between pb-1">
              <span className="text-gray-400 text-xs uppercase tracking-[0.2em] font-light">MAX COMBO</span>
              <span className="text-yellow-400 font-light text-base tracking-[0.2em]">{maxCombo} Combo</span>
            </div>
          </div>

          <button
            onClick={() => onComplete({ score, maxCombo, syncedRate })}
            className="mt-2 text-white/60 hover:text-white transition-all text-sm font-light tracking-[0.2em] flex items-center gap-2"
          >
            [ 体験を完了する ]
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
          <div className="flex-1 w-full bg-[#030514]/90 rounded-xl border border-indigo-500/20 relative flex overflow-hidden min-h-[42cqh] my-2 select-none">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full block z-0"
            />

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
            <div className="absolute bottom-[5%] left-0 right-0 h-16 flex justify-around items-center px-4 z-20">
              {LANES.map((lane) => (
                <button
                  key={lane.id}
                  onMouseDown={() => handleButtonDown(lane.id)}
                  onMouseUp={() => handleButtonUp(lane.id)}
                  onMouseLeave={() => handleButtonUp(lane.id)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleButtonDown(lane.id);
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleButtonUp(lane.id);
                  }}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500/40 bg-indigo-950/40 flex flex-col justify-center items-center group active:scale-95 hover:border-pink-500/80 transition-all duration-100 shadow-[inset_0_0_12px_rgba(99,102,241,0.15)] cursor-pointer"
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
