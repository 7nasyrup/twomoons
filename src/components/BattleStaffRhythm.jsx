import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpriteAnimator from './SpriteAnimator';
import '../battle.css';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & TUNING
// ═══════════════════════════════════════════════════════════════════════════════
const SYNC_MAX = 100;
const SYNC_PER_PARRY = 20;
const ALLY_BASE_DAMAGE = 15;
const ENEMY_BASE_DAMAGE = 25;
const ULTIMATE_DAMAGE = 9999;
const PARRY_WINDOW = 200; // ±ms
const HITSTOP_DURATION = 150; // ms
const ENEMY_STUN_DURATION = 3000; // ms
const HEAL_ON_PARRY = 10;

const BUFF_TYPES = [
  { id: 'fire', name: '猛火', color: '#ef4444', icon: '🔥', text: 'text-red-400', glow: 'drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' },
  { id: 'thunder', name: '雷霆', color: '#facc15', icon: '⚡', text: 'text-yellow-400', glow: 'drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' },
  { id: 'ice', name: '氷結', color: '#22d3ee', icon: '❄️', text: 'text-cyan-400', glow: 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' },
  { id: 'wind', name: '烈風', color: '#4ade80', icon: '🌪️', text: 'text-green-400', glow: 'drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' }
];

const ATTACK_PATTERNS = [
  { sequence: [{ delay: 1000 }] }, // Single slow
  { sequence: [{ delay: 600 }] },  // Single fast
  { sequence: [{ delay: 500 }, { delay: 900 }] }, // Double
  { sequence: [{ delay: 600 }, { delay: 900 }, { delay: 1300 }] }, // Triple
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BattleStaffRhythm({ onComplete, playBGM, stopBGM, playSE }) {
  // ─── State ───
  const [battlePhase, setBattlePhase] = useState('intro'); // intro, fighting, ultimate, victory, defeat
  const [showTutorial, setShowTutorial] = useState(true); // New tutorial state
  const [syncRate, setSyncRate] = useState(0);
  
  const [ally, setAlly] = useState({ id: 'mutsunori', name: '睦典', hp: 500, maxHp: 500 });
  const [enemy, setEnemy] = useState({ id: 'enemy1', name: 'キメラα', hp: 2000, maxHp: 2000, isStunned: false });
  
  const [activeBuff, setActiveBuff] = useState(null); // { type, duration }
  const [rushMode, setRushMode] = useState(false);
  
  const [damageNumbers, setDamageNumbers] = useState([]);
  const [battleLog, setBattleLog] = useState([]);
  const [shake, setShake] = useState(false);
  const [parryFlash, setParryFlash] = useState(false);
  const [hitEffects, setHitEffects] = useState([]);
  const [incomingAttacks, setIncomingAttacks] = useState([]);

  // Refs for Game Loop
  const stateRef = useRef({ ally, enemy, syncRate, battlePhase, activeBuff, rushMode });
  const attacksRef = useRef([]); // { id, resolveTime, parried, type }
  const timersRef = useRef({
    allyAttack: 0,
    enemyAttack: 2000,
    hitstop: 0,
    stun: 0,
    rush: 0
  });
  const reqRef = useRef();
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    stateRef.current = { ally, enemy, syncRate, battlePhase, activeBuff, rushMode };
  }, [ally, enemy, syncRate, battlePhase, activeBuff, rushMode]);

  // ─── Helpers ───
  const addLog = useCallback((msg) => setBattleLog(p => [...p.slice(-3), msg]), []);

  const spawnDamageNumber = useCallback((target, amount, type = 'damage') => {
    const id = Date.now() + Math.random();
    const x = target === 'ally' ? 20 + Math.random()*10 : 70 + Math.random()*10;
    const y = 30 + Math.random()*20;
    setDamageNumbers(p => [...p, { id, amount, type, x, y }]);
    setTimeout(() => setDamageNumbers(p => p.filter(d => d.id !== id)), 1000);
  }, []);

  const spawnHitEffect = useCallback((type) => {
    const id = Date.now() + Math.random();
    setHitEffects(p => [...p, { id, type }]);
    setTimeout(() => setHitEffects(p => p.filter(e => e.id !== id)), 500);
  }, []);

  // ─── Game Loop ───
  const tick = useCallback((time) => {
    if (stateRef.current.battlePhase !== 'fighting') {
      lastTimeRef.current = time;
      reqRef.current = requestAnimationFrame(tick);
      return;
    }

    const dt = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Hitstop
    if (timersRef.current.hitstop > 0) {
      timersRef.current.hitstop -= dt;
      reqRef.current = requestAnimationFrame(tick);
      return;
    }

    const state = stateRef.current;
    
    // Rush Mode Timer
    if (state.rushMode && timersRef.current.rush > 0) {
      timersRef.current.rush -= dt;
      if (timersRef.current.rush <= 0) {
        setRushMode(false);
        addLog("⚡ 怒涛の反撃ラッシュ終了");
      }
    }

    // Stun Timer
    if (state.enemy.isStunned && timersRef.current.stun > 0) {
      timersRef.current.stun -= dt;
      if (timersRef.current.stun <= 0) {
        setEnemy(p => ({ ...p, isStunned: false }));
        timersRef.current.enemyAttack = 1000;
      }
    }

    // Ally Attack Logic
    timersRef.current.allyAttack -= dt;
    if (timersRef.current.allyAttack <= 0) {
      const interval = state.rushMode ? 600 : 1800; // Faster in rush mode
      timersRef.current.allyAttack = interval;
      
      let dmg = ALLY_BASE_DAMAGE + Math.floor(Math.random() * 5);
      if (state.rushMode) dmg = Math.floor(dmg * 1.5);
      if (state.activeBuff) dmg = Math.floor(dmg * 1.2); // Buff bonus

      setEnemy(p => {
        const nextHp = Math.max(0, p.hp - dmg);
        if (nextHp === 0) setBattlePhase('victory');
        return { ...p, hp: nextHp };
      });
      spawnDamageNumber('enemy', dmg, 'damage');
      spawnHitEffect('slash');
      if (playSE) playSE('/assets/audio/bgm/+game_sword.mp3');
    }

    // Enemy Attack Logic
    if (!state.enemy.isStunned) {
      timersRef.current.enemyAttack -= dt;
      if (timersRef.current.enemyAttack <= 0 && attacksRef.current.length === 0) {
        // Queue new attacks
        const pattern = ATTACK_PATTERNS[Math.floor(Math.random() * ATTACK_PATTERNS.length)];
        const now = time;
        const newAttacks = pattern.sequence.map(seq => ({
          id: Math.random(),
          resolveTime: now + seq.delay,
          duration: seq.delay,
          parried: false,
          warned: false
        }));
        
        attacksRef.current.push(...newAttacks);
        setIncomingAttacks(p => [...p, ...newAttacks]);
        
        timersRef.current.enemyAttack = pattern.sequence[pattern.sequence.length - 1].delay + 1500;
        addLog("⚠️ 敵の攻撃が来る！");
      }
    }

    // Process Enemy Attacks
    attacksRef.current.forEach(atk => {
      if (atk.parried) return;
      
      if (time >= atk.resolveTime) {
        // Attack hit!
        atk.parried = true; // Mark resolved
        setIncomingAttacks(p => p.filter(a => a.id !== atk.id));
        
        const dmg = ENEMY_BASE_DAMAGE + Math.floor(Math.random() * 10);
        setAlly(p => {
          const nextHp = Math.max(0, p.hp - dmg);
          if (nextHp === 0) setBattlePhase('defeat');
          return { ...p, hp: nextHp };
        });
        setShake(true);
        setTimeout(() => setShake(false), 200);
        spawnDamageNumber('ally', dmg, 'damage');
        if (playSE) playSE('/assets/audio/bgm/+game_hit.mp3');
      }
    });
    // Cleanup resolved attacks
    attacksRef.current = attacksRef.current.filter(atk => time < atk.resolveTime);

    reqRef.current = requestAnimationFrame(tick);
  }, [playSE, spawnDamageNumber, spawnHitEffect, addLog]);

  useEffect(() => {
    reqRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqRef.current);
  }, [tick]);

  // ─── Input Handling (Parry) ───
  const handleParryInput = useCallback(() => {
    if (stateRef.current.battlePhase !== 'fighting') return;
    
    const now = performance.now();
    let parriedAny = false;
    
    // Find earliest unparried attack in window
    const targetAtk = attacksRef.current.find(atk => !atk.parried && Math.abs(atk.resolveTime - now) <= PARRY_WINDOW);

    if (targetAtk) {
      // Parry Success!
      targetAtk.parried = true;
      parriedAny = true;
      setIncomingAttacks(p => p.filter(a => a.id !== targetAtk.id));
      
      if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
      setParryFlash(true);
      setTimeout(() => setParryFlash(false), 100);
      setShake(true);
      setTimeout(() => setShake(false), 200);
      spawnHitEffect('parry');
      
      timersRef.current.hitstop = HITSTOP_DURATION;
      
      setSyncRate(p => Math.min(SYNC_MAX, p + SYNC_PER_PARRY));
      
      // Heal
      setAlly(p => ({ ...p, hp: Math.min(p.maxHp, p.hp + HEAL_ON_PARRY) }));
      
      // Random Buff
      const buff = BUFF_TYPES[Math.floor(Math.random() * BUFF_TYPES.length)];
      setActiveBuff(buff);
      addLog(`✨ パリィ成功！【${buff.name}】を獲得！`);
      
      // Check if all queued attacks are parried for Stun & Rush
      const allResolved = attacksRef.current.every(a => a.parried || a.resolveTime < now);
      if (allResolved && attacksRef.current.length > 0) {
        addLog("💫 全段パリィ成功！ 敵がスタンし、ラッシュモード突入！");
        setEnemy(p => ({ ...p, isStunned: true }));
        timersRef.current.stun = ENEMY_STUN_DURATION;
        setRushMode(true);
        timersRef.current.rush = ENEMY_STUN_DURATION;
        attacksRef.current = []; // clear
      }
    }
  }, [playSE, addLog, spawnHitEffect]);

  // Keyboard support for PC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        handleParryInput();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleParryInput]);

  // ─── Ultimate ───
  const triggerUltimate = () => {
    if (syncRate < 100 || battlePhase !== 'fighting') return;
    setBattlePhase('ultimate');
    if (playSE) playSE('/assets/audio/bgm/+game_skill.mp3');
    setSyncRate(0);
    
    // Cinematic sequence
    setTimeout(() => {
      setEnemy(p => ({ ...p, hp: 0 }));
      setBattlePhase('victory');
      addLog("🌟 DUET ULTIMATE !! 敵を粉砕した！");
    }, 2500);
  };

  // ─── Start / End ───
  useEffect(() => {
    if (battlePhase === 'intro' && !showTutorial) {
      if (playBGM) playBGM('/assets/audio/bgm/RPG_Battle_01.mp3');
      const t = setTimeout(() => setBattlePhase('fighting'), 2000);
      return () => clearTimeout(t);
    }
    if (battlePhase === 'victory' || battlePhase === 'defeat') {
      if (stopBGM) stopBGM();
      const t = setTimeout(() => {
        if (onComplete) onComplete(battlePhase === 'victory');
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [battlePhase, playBGM, stopBGM, onComplete, showTutorial]);

  // ─── Visualizer ───
  const visualizerBars = useMemo(() => {
    return [...Array(30)].map(() => ({
      maxHeight: (Math.random() * 100 + 20) * 0.6, // Lower height
      duration: 0.5 + Math.random()
    }));
  }, []);

  // ─── Arc Gauge SVG Logic ───
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (syncRate / 100) * circumference;

  return (
    <div 
      className={`w-full h-full relative overflow-hidden bg-[#040810] ${shake ? 'animate-shake' : ''}`}
      onPointerDown={handleParryInput} // Tap anywhere to parry
    >
      {/* Background & Atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: 'url(/battle/shopping.png)' }}
      />
      
      {/* Dark overlay for atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-[#020408]/80 pointer-events-none" />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 vignette-overlay z-0" />
      <div className="cinematic-guideline-top z-10" />
      <div className="cinematic-guideline-bottom z-10" />
      
      {/* Visualizer (CSS driven) */}
      <div className="absolute bottom-0 left-0 w-full h-48 flex items-end justify-center opacity-60 pointer-events-none mix-blend-screen z-10">
        {visualizerBars.map((bar, i) => (
          <motion.div
            key={i}
            className={`neon-wave ${syncRate >= 100 ? 'neon-wave-max' : ''}`}
            animate={{ 
              height: battlePhase === 'fighting' ? [10, bar.maxHeight, 10] : 10 
            }}
            transition={{ 
              duration: bar.duration, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>

      {/* Parry Flash Effect */}
      <AnimatePresence>
        {parryFlash && (
          <motion.div 
            className="absolute inset-0 bg-white z-[40] pointer-events-none mix-blend-overlay"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* ─── TOP: HP BARS ─── */}
      <div className="absolute top-6 w-full px-10 flex justify-between items-start z-30 pointer-events-none">
        {/* Ally HP */}
        <div className="w-1/3 max-w-[350px]">
          <div className="flex justify-between items-end mb-1">
            <span className="font-orbitron font-bold text-emerald-300 text-glow-emerald tracking-wider">{ally.name}</span>
            <span className="font-rajdhani italic font-bold text-emerald-100 text-glow-emerald text-lg">{ally.hp} / {ally.maxHp}</span>
          </div>
          <div className="jrpg-hp-wrapper">
            <div className="h-2.5 hp-bar-container">
              <motion.div 
                className="h-full hp-bar-fill-ally"
                animate={{ width: `${(ally.hp / ally.maxHp) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Enemy HP */}
        <div className="w-1/3 max-w-[350px] text-right">
          <div className="flex justify-between items-end mb-1 flex-row-reverse">
            <span className="font-orbitron font-bold text-red-400 text-glow-red tracking-wider">{enemy.name}</span>
            <span className="font-rajdhani italic font-bold text-red-100 text-glow-red text-lg">{enemy.hp} / {enemy.maxHp}</span>
          </div>
          <div className="jrpg-hp-wrapper flex justify-end">
            <div className="h-2.5 hp-bar-container w-full">
              <motion.div 
                className="h-full hp-bar-fill-enemy float-right"
                style={{ transformOrigin: "right" }}
                animate={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── BATTLE FIELD (Center) ─── */}
      <div className="absolute inset-0 flex items-end justify-between px-10 md:px-32 pb-40 pointer-events-none z-10">
        {/* Ally Sprite */}
        <div className="relative">
          <img src="/battle/mutsunori.png" alt="Mutsunori" className={`w-48 h-auto object-contain transition-all ${rushMode ? 'drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]' : ''}`} />
          {activeBuff && (
            <motion.div 
              className={`absolute -inset-4 rounded-full mix-blend-screen opacity-50 ${activeBuff.glow}`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
        </div>

        {/* Enemy Sprite */}
        <div className="relative">
          <img src="/character/kimera1.png" alt="Enemy" className={`w-64 h-auto object-contain transition-all ${enemy.isStunned ? 'grayscale brightness-50' : ''}`} />
          {enemy.isStunned && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl animate-bounce">💫</div>
          )}
          
          {/* Timing Indicators (Parry Targets) */}
          {incomingAttacks.map(atk => (
            <motion.div
              key={atk.id}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] pointer-events-none z-30"
              initial={{ width: 300, height: 300, opacity: 0 }}
              animate={{ width: 60, height: 60, opacity: 1 }}
              transition={{ duration: atk.duration / 1000, ease: "linear" }}
            />
          ))}
          {/* Target fixed ring */}
          {incomingAttacks.length > 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] border-[2px] border-cyan-200/50 rounded-full pointer-events-none z-20" />
          )}
        </div>
      </div>

      {/* Dynamic Hit Effects */}
      <AnimatePresence>
        {hitEffects.map(ef => (
          ef.type === 'parry' ? (
            <motion.div key={ef.id} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 1, y: 0 }}
              animate={{ scale: 1.5, opacity: 0, y: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="font-orbitron font-black text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-t from-cyan-300 to-white drop-shadow-[0_0_15px_rgba(34,211,238,1)] italic tracking-wider">
                PARRY!
              </span>
            </motion.div>
          ) : (
             <motion.div key={ef.id} className="absolute right-1/4 top-1/2 w-16 h-2 bg-white pointer-events-none z-30 rotate-45"
              initial={{ scale: 1, opacity: 1, x: -50 }}
              animate={{ scale: 3, opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            />
          )
        ))}
      </AnimatePresence>

      {/* Damage Numbers */}
      <AnimatePresence>
        {damageNumbers.map(dn => (
          <motion.div
            key={dn.id}
            className={`absolute font-rajdhani italic font-bold pointer-events-none z-50 text-4xl md:text-5xl ${
              dn.type === 'critical' ? 'text-amber-300 text-glow-amber' : 'text-white text-glow'
            }`}
            style={{ left: `${dn.x}%`, top: `${dn.y}%` }}
            initial={{ opacity: 1, y: 0, scale: 1.5 }}
            animate={{ opacity: 0, y: -50, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {dn.amount}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ─── BOTTOM UI ─── */}
      <div className="absolute bottom-0 w-full h-32 md:h-40 pointer-events-none z-30 flex items-end justify-between px-6 pb-6">
        
        {/* Left: Sakura & Arc Gauge */}
        <div className="relative flex items-center">
          {/* HUD Rings & Arc Gauge */}
          <div className="absolute -left-6 -bottom-6 w-32 h-32 md:w-40 md:h-40 -rotate-90">
            <svg width="100%" height="100%" viewBox="0 0 140 140" className="drop-shadow-lg">
              {/* Inner Tick Ring */}
              <circle cx="70" cy="70" r={radius - 12} fill="none" strokeWidth="1" className="hud-ring-outer" />
              {/* Base Ring */}
              <circle cx="70" cy="70" r={radius} fill="none" strokeWidth="6" className="hud-ring-inner" />
              {/* Active Sync Arc */}
              <motion.circle 
                cx="70" cy="70" r={radius} fill="none" 
                stroke={syncRate >= 100 ? '#fbbf24' : '#22d3ee'} 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={syncRate >= 100 ? 'drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : 'drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]'}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center rotate-90 pl-10 pb-10">
              <span className={`font-rajdhani italic font-bold text-xl md:text-2xl ${syncRate >= 100 ? 'text-amber-400 text-glow-amber animate-pulse' : 'text-cyan-300 text-glow'}`}>
                {Math.floor(syncRate)}%
              </span>
            </div>
          </div>

          {/* Sakura Portrait */}
          <div className="ml-24 md:ml-32 z-10 relative">
            <div className="jrpg-char-wrapper">
              <div className="w-20 h-20 md:w-28 md:h-28 hud-glass overflow-hidden relative">
                <img 
                  src="/character/Sakura/Sakura.png" 
                  alt="Sakura" 
                  className="absolute w-full h-full object-cover object-top scale-[1.8] origin-[center_15%]" 
                  onError={(e) => { e.target.src = '/character/Mutsunori/Mutsunori_normal.png'; }} 
                />
              </div>
            </div>
            {activeBuff && (
              <div className={`absolute -bottom-2 -right-2 bg-slate-900/90 backdrop-blur-sm rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs md:text-sm border border-slate-700 ${activeBuff.text} ${activeBuff.glow} z-20`}>
                {activeBuff.icon}
              </div>
            )}
          </div>
        </div>

        {/* Right: Ultimate Button */}
        <div className="relative pointer-events-auto">
          <AnimatePresence>
            {syncRate >= 100 && (
              <motion.button
                onClick={(e) => { e.stopPropagation(); triggerUltimate(); }}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-500/20 border-2 border-amber-400 px-8 py-4 rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.6)] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="font-orbitron font-black text-amber-300 text-lg md:text-2xl tracking-widest drop-shadow-md">
                  DUET ULTIMATE !!
                </span>
                <span className="font-noto text-amber-100/80 text-[10px] tracking-widest mt-1">
                  合体必殺技を発動
                </span>
              </motion.button>
            )}
          </AnimatePresence>
          {syncRate < 100 && (
            <div className="opacity-30 border border-slate-700 px-8 py-4 rounded-xl flex flex-col items-center justify-center bg-slate-900/50">
               <span className="font-orbitron text-slate-500 text-sm tracking-widest">
                  ULTIMATE STANDBY
                </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── ULTIMATE CINEMATIC ─── */}
      <AnimatePresence>
        {battlePhase === 'ultimate' && (
          <motion.div 
            className="absolute inset-0 bg-black z-50 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute w-[200%] h-32 bg-amber-400/20 -rotate-12 blur-xl"
              initial={{ y: -500 }} animate={{ y: 500 }} transition={{ duration: 0.5 }}
            />
            <motion.h1 
              className="font-orbitron font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 drop-shadow-[0_0_20px_rgba(251,191,36,1)] z-10"
              initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }}
            >
              RESONANCE BREAK
            </motion.h1>
            {/* Split Cutin */}
            <motion.img src="/character/Mutsunori/Mutsunori_serious.png" className="absolute left-0 bottom-0 h-3/4 object-contain" initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} />
            <motion.img src="/character/Sakura/Sakura.png" className="absolute right-0 top-0 h-1/2 object-contain rounded-full border-4 border-amber-400 shadow-[0_0_30px_#fbbf24] object-[center_top]" initial={{ x: 200, opacity: 0 }} animate={{ x: -50, opacity: 1 }} transition={{ delay: 0.5 }} onError={(e) => { e.target.src = '/character/Mutsunori/Mutsunori_normal.png'; }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── INTRO / OUTRO ─── */}
      <AnimatePresence>
        {battlePhase === 'intro' && (
          <motion.div className="absolute inset-0 bg-[#040810] z-50 flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.h2 className="text-cyan-400 font-orbitron text-4xl tracking-widest" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>ENGAGE</motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TUTORIAL MODAL ── */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-[#0f172a] border border-cyan-500/50 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.2)] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative">
              <h2 className="text-2xl md:text-3xl font-black text-cyan-300 mb-6 border-b border-cyan-500/30 pb-4 text-center tracking-widest">
                戦闘マニュアル (リズム・パリィ)
              </h2>
              
              <div className="space-y-6 text-sm md:text-base text-slate-300 leading-relaxed text-left">
                {/* 1. 防御 */}
                <section>
                  <h3 className="text-lg font-bold text-cyan-200 mb-2 flex items-center gap-2">
                    <span className="bg-cyan-900/50 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30 text-sm">1</span>
                    パリィ（防御）
                  </h3>
                  <p>
                    味方は自動で攻撃を行いますが、敵の攻撃は手動で防ぐ必要があります。<br />
                    敵の攻撃が当たるタイミングで<strong>「エンターキー」</strong>または<strong>「スペースキー」</strong>を押すと<strong>パリィ</strong>が成功し、ダメージを無効化します。
                  </p>
                </section>
                
                {/* 2. ラッシュモード */}
                <section>
                  <h3 className="text-lg font-bold text-emerald-200 mb-2 flex items-center gap-2">
                    <span className="bg-emerald-900/50 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/30 text-sm">2</span>
                    ラッシュモード
                  </h3>
                  <p>
                    敵の連続攻撃をすべてパリィすることに成功すると、敵がスタン状態になり<strong>「ラッシュモード」</strong>に突入します。<br />
                    ラッシュモード中は、味方の攻撃スピードと威力が大幅に上昇します。
                  </p>
                </section>
                
                {/* 3. シンクロ率と必殺技 */}
                <section>
                  <h3 className="text-lg font-bold text-amber-200 mb-2 flex items-center gap-2">
                    <span className="bg-amber-900/50 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30 text-sm">3</span>
                    シンクロ率ゲージと必殺技
                  </h3>
                  <p>
                    パリィを成功させると<strong>シンクロ率</strong>が溜まり、同時に少量のHP回復とランダムな強化バフ（炎、雷など）を獲得します。<br />
                    シンクロ率が100%に達すると、右下のボタンを押して敵を一撃で粉砕する<strong>合体必殺技</strong>を発動できます。
                  </p>
                </section>
              </div>
              
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setShowTutorial(false)}
                  className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)] hover:shadow-[0_0_25px_rgba(34,211,238,0.7)] hover:scale-105 active:scale-95"
                >
                  作戦開始
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(battlePhase === 'victory' || battlePhase === 'defeat') && (
          <motion.div className="absolute inset-0 z-[60] flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className={`absolute inset-0 ${battlePhase === 'victory' ? 'bg-[#060a12]/85' : 'bg-red-950/80'}`} />
            <motion.div className="relative z-10 text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <h2 className={`font-noto text-5xl font-black tracking-widest ${battlePhase === 'victory' ? 'text-amber-400' : 'text-red-400'}`}>
                {battlePhase === 'victory' ? 'TARGET DESTROYED' : 'MISSION FAILED'}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
