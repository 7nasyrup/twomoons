import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & TUNING
// ═══════════════════════════════════════════════════════════════════════════════
const TURN_DELAY = 1000;              // Delay between turns (ms)
const ATTACK_DURATION = 1500;         // Total time for enemy attack windup
const GLINT_TIME = 900;               // When the red glint appears (earlier to give more reaction time)
const PARRY_WINDOW_START = 900;       // Parry window opens when glint appears
const PARRY_WINDOW_END = 1500;        // Parry window closes when attack hits (600ms window)
const HEAL_COOLDOWN = 12000;

// Damage values
const ALLY_BASE_DAMAGE = 25;
const ENEMY_BASE_DAMAGE = 40;
const GUARD_REDUCTION = 0.4;          // 60% damage reduction when holding guard
const ULTIMATE_DAMAGE = 180;
const HEAL_AMOUNT = 80;
const COUNTER_DAMAGE = 35;            // Parry counter-attack damage

// Sync
const SYNC_PER_HIT = 2;               
const SYNC_PER_PARRY = 25;            
const SYNC_COST_ULTIMATE = 100;

// Turn order
const TURN_ORDER = ['mutsunori', 'nagisa', 'enemy1', 'enemy2'];
const TIMELINE_DISPLAY_COUNT = 10;    // How many turns to show in the timeline

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════════════════════════════════
const createAllies = () => [
  { id: 'mutsunori', name: '睦典', image: '/battle/mutsunori.png', cutinImage: '/character/Mutsunori/Mutsunori_serious.png', hp: 300, maxHp: 300, color: '#34d399', isDead: false, flashTimer: 0, lastDamage: 0 },
  { id: 'nagisa',    name: '凪砂', image: '/battle/nagisa.png', cutinImage: '/character/Nagisa/Nagisa_serious.png', hp: 280, maxHp: 280, color: '#a78bfa', isDead: false, flashTimer: 0, lastDamage: 0 },
];

const createEnemies = () => [
  { id: 'enemy1', name: 'キメラα', image: '/battle/ene.png', hp: 600, maxHp: 600, color: '#ef4444', isStunned: false, isDead: false, flashTimer: 0 },
  { id: 'enemy2', name: 'キメラβ', image: '/battle/ene.png', hp: 550, maxHp: 550, color: '#dc2626', isStunned: false, isDead: false, flashTimer: 0 },
];

// Helper to get character info for timeline
const getCharInfo = (id) => {
  const map = {
    mutsunori: { name: '睦典', image: '/battle/mutsunori.png', isAlly: true },
    nagisa:    { name: '凪砂', image: '/battle/nagisa.png', isAlly: true },
    enemy1:    { name: 'キメラα', image: '/battle/ene.png', isAlly: false },
    enemy2:    { name: 'キメラβ', image: '/battle/ene.png', isAlly: false },
  };
  return map[id] || { name: '？', image: '', isAlly: false };
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BattleSystem({ onComplete, playBGM, stopBGM, playSE }) {
  // ─── Core State ───
  const [allies, setAllies] = useState(createAllies);
  const [enemies, setEnemies] = useState(createEnemies);
  const [syncRate, setSyncRate] = useState(0);          // 0-100
  const [battlePhase, setBattlePhase] = useState('intro');
  const [battleLog, setBattleLog] = useState([]);
  
  // ─── Turn State ───
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);  // index in TURN_ORDER
  const [turnPhase, setTurnPhase] = useState('waiting');  // 'waiting' | 'ally_attack' | 'enemy_windup' | 'enemy_resolve' | 'counter_attack' | 'turn_delay'
  const [turnTimer, setTurnTimer] = useState(0);
  const [currentAttack, setCurrentAttack] = useState(null); // { enemyId, targetId, startTime, duration, glintFired }
  const [counterAttack, setCounterAttack] = useState(null); // { allyId, enemyId }
  
  // ─── Action State ───
  const [guardingAllies, setGuardingAllies] = useState(new Set());
  const [healCooldown, setHealCooldown] = useState(0);
  
  // ─── Visual Effects State ───
  const [sakuraSinging, setSakuraSinging] = useState(false);
  const [sakuraNotes, setSakuraNotes] = useState([]); // { id, x, y }
  const [showDamageNumbers, setShowDamageNumbers] = useState([]);
  const [shakeActive, setShakeActive] = useState(false);
  const [parryFlash, setParryFlash] = useState(false);
  const [ultimateFlash, setUltimateFlash] = useState(false);
  const [healFlash, setHealFlash] = useState(false);
  const [duetCutin, setDuetCutin] = useState(null); 
  const [glintEffects, setGlintEffects] = useState([]); // { id, enemyId }

  // ─── Refs for game loop ───
  const gameLoopRef = useRef(null);
  const lastTickRef = useRef(0);
  const stateRef = useRef({ allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack });

  useEffect(() => {
    stateRef.current = { allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack };
  }, [allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack]);

  // ─── Helpers ───
  const addLog = useCallback((msg) => {
    setBattleLog(prev => [...prev.slice(-4), msg]);
  }, []);

  const spawnDamageNumber = useCallback((targetId, amount, type = 'damage') => {
    const id = Date.now() + Math.random();
    setShowDamageNumbers(prev => [...prev, { id, targetId, amount, type }]);
    setTimeout(() => setShowDamageNumbers(prev => prev.filter(d => d.id !== id)), 1200);
  }, []);

  const triggerSakuraNote = useCallback(() => {
    setSakuraSinging(true);
    const id = Date.now() + Math.random();
    setSakuraNotes(prev => [...prev.slice(-5), { id, x: Math.random() * 40 - 20, y: Math.random() * -40 - 20 }]);
    setTimeout(() => {
      setSakuraNotes(prev => prev.filter(n => n.id !== id));
      setSakuraSinging(false);
    }, 1000);
  }, []);

  const addSync = useCallback((amount) => {
    setSyncRate(prev => Math.min(100, prev + amount));
  }, []);

  const spawnGlint = useCallback((enemyId) => {
    const id = Date.now() + Math.random();
    setGlintEffects(prev => [...prev, { id, enemyId }]);
    setTimeout(() => setGlintEffects(prev => prev.filter(g => g.id !== id)), 400);
  }, []);

  // ─── Timeline computation ───
  const timelineQueue = useMemo(() => {
    const queue = [];
    let idx = currentTurnIndex;
    for (let i = 0; i < TIMELINE_DISPLAY_COUNT; i++) {
      queue.push({ id: TURN_ORDER[idx % TURN_ORDER.length], turnIndex: idx });
      idx++;
    }
    return queue;
  }, [currentTurnIndex]);

  // ─── Turn helpers ───
  const getCurrentTurnId = useCallback(() => {
    return TURN_ORDER[currentTurnIndex % TURN_ORDER.length];
  }, [currentTurnIndex]);

  const isAllyTurn = useCallback((id) => {
    return id === 'mutsunori' || id === 'nagisa';
  }, []);

  const advanceTurn = useCallback(() => {
    setCurrentTurnIndex(prev => prev + 1);
    setTurnPhase('turn_delay');
    setTurnTimer(TURN_DELAY);
  }, []);

  // ─── BGM ───
  useEffect(() => {
    if (battlePhase === 'fighting' && playBGM) {
      playBGM('/assets/audio/bgm/Battle1.mp3');
    }
    return () => { if (stopBGM) stopBGM(); };
  }, [battlePhase]);

  // ─── Intro -> Fighting ───
  useEffect(() => {
    if (battlePhase === 'intro') {
      const timer = setTimeout(() => {
        setBattlePhase('fighting');
        setTurnPhase('turn_delay');
        setTurnTimer(500); // Brief initial delay
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [battlePhase]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // MAIN GAME LOOP (Turn-Based)
  // ═══════════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (battlePhase !== 'fighting') return;

    const tick = (timestamp) => {
      if (!lastTickRef.current) lastTickRef.current = timestamp;
      const dt = timestamp - lastTickRef.current;
      lastTickRef.current = timestamp;
      
      if (dt > 200) { gameLoopRef.current = requestAnimationFrame(tick); return; } 

      const { allies: currentAllies, enemies: currentEnemies, guardingAllies: currentGuards } = stateRef.current;
      const now = Date.now();

      // Check win/loss
      if (currentAllies.every(a => a.isDead)) { setBattlePhase('defeat'); return; }
      if (currentEnemies.every(e => e.isDead)) { setBattlePhase('victory'); return; }

      // Tick cooldowns
      setHealCooldown(prev => Math.max(0, prev - dt));
      
      // Tick flash timers
      setAllies(prev => prev.map(a => ({ ...a, flashTimer: Math.max(0, a.flashTimer - dt) })));
      setEnemies(prev => prev.map(e => ({ ...e, flashTimer: Math.max(0, e.flashTimer - dt) })));

      const phase = stateRef.current.turnPhase;

      // ── TURN DELAY: wait between turns ──
      if (phase === 'turn_delay') {
        setTurnTimer(prev => {
          const next = prev - dt;
          if (next <= 0) {
            // Start next turn
            const turnId = TURN_ORDER[stateRef.current.currentTurnIndex % TURN_ORDER.length];
            const allAllies = stateRef.current.allies;
            const allEnemies = stateRef.current.enemies;

            // Skip dead characters
            const isAlly = turnId === 'mutsunori' || turnId === 'nagisa';
            if (isAlly) {
              const ally = allAllies.find(a => a.id === turnId);
              if (!ally || ally.isDead) {
                setCurrentTurnIndex(p => p + 1);
                setTurnTimer(100);
                return 100;
              }
            } else {
              const enemy = allEnemies.find(e => e.id === turnId);
              if (!enemy || enemy.isDead) {
                setCurrentTurnIndex(p => p + 1);
                setTurnTimer(100);
                return 100;
              }
            }

            if (isAlly) {
              // Deal damage immediately as the animation starts
              const aliveEnemies = allEnemies.filter(e => !e.isDead);
              if (aliveEnemies.length > 0) {
                const target = aliveEnemies.reduce((min, e) => e.hp < min.hp ? e : min, aliveEnemies[0]);
                const dmg = ALLY_BASE_DAMAGE + Math.floor(Math.random() * 8);
                
                setEnemies(prev => prev.map(e => {
                  if (e.id === target.id) {
                    const newHp = Math.max(0, e.hp - dmg);
                    return { ...e, hp: newHp, flashTimer: 300, isDead: newHp <= 0 };
                  }
                  return e;
                }));
                spawnDamageNumber(target.id, dmg, 'damage');
                addSync(SYNC_PER_HIT);
                const ally = allAllies.find(a => a.id === turnId);
                if (ally) addLog(`⚔ ${ally.name} が ${target.name} に攻撃！`);
              }
              setTurnPhase('ally_attack');
              setTurnTimer(150); // Visual step forward duration (snappy!)
            } else {
              // Check if enemy is stunned (from parry)
              const enemy = allEnemies.find(e => e.id === turnId);
              if (enemy && enemy.isStunned) {
                // Skip turn and clear stun
                addLog(`💫 ${enemy.name} はスタンしているため行動不能！`);
                setEnemies(prev => prev.map(e => e.id === turnId ? { ...e, isStunned: false } : e));
                setCurrentTurnIndex(p => p + 1);
                setTurnTimer(TURN_DELAY);
                return TURN_DELAY;
              }
              setTurnPhase('enemy_windup');
            }
            return 0;
          }
          return next;
        });
      }

      // ── ALLY ATTACK (Animation Hold) ──
      if (phase === 'ally_attack') {
        setTurnTimer(prev => {
          const next = prev - dt;
          if (next <= 0) {
            setCurrentTurnIndex(p => p + 1);
            setTurnPhase('turn_delay');
            setTurnTimer(TURN_DELAY);
            return 0;
          }
          return next;
        });
      }

      // ── ENEMY WINDUP ──
      if (phase === 'enemy_windup' && !stateRef.current.currentAttack) {
        const turnId = TURN_ORDER[stateRef.current.currentTurnIndex % TURN_ORDER.length];
        const allAllies = stateRef.current.allies;
        const aliveAllies = allAllies.filter(a => !a.isDead);
        
        if (aliveAllies.length > 0) {
          const target = aliveAllies[Math.floor(Math.random() * aliveAllies.length)];
          const enemy = stateRef.current.enemies.find(e => e.id === turnId);
          
          const attack = {
            enemyId: turnId,
            targetId: target.id,
            startTime: now,
            duration: ATTACK_DURATION,
            glintFired: false,
            resolved: false
          };
          setCurrentAttack(attack);
          if (enemy) addLog(`⚠ ${enemy.name} が ${target.name} を狙っている！`);
        } else {
          // No alive allies, skip
          setCurrentTurnIndex(p => p + 1);
          setTurnPhase('turn_delay');
          setTurnTimer(TURN_DELAY);
        }
      }

      // ── PROCESS ENEMY ATTACK ──
      if (phase === 'enemy_windup' && stateRef.current.currentAttack) {
        const attack = stateRef.current.currentAttack;
        const elapsed = now - attack.startTime;
        
        // Trigger Glint
        if (elapsed >= GLINT_TIME && !attack.glintFired) {
          setCurrentAttack(prev => prev ? { ...prev, glintFired: true } : null);
          spawnGlint(attack.enemyId);
        }

        // Attack resolves
        if (elapsed >= attack.duration && !attack.resolved) {
          setCurrentAttack(prev => prev ? { ...prev, resolved: true } : null);
          
          const allAllies = stateRef.current.allies;
          const targetIdx = allAllies.findIndex(a => a.id === attack.targetId && !a.isDead);
          const enemy = stateRef.current.enemies.find(e => e.id === attack.enemyId);
          
          if (targetIdx !== -1 && enemy) {
            const isGuarding = currentGuards.has(attack.targetId);
            let dmg = ENEMY_BASE_DAMAGE + Math.floor(Math.random() * 10);
            
            if (isGuarding) {
              dmg = Math.floor(dmg * GUARD_REDUCTION);
              addLog(`🛡️ ${allAllies[targetIdx].name} がガード！ 被害軽減`);
            } else {
              addLog(`💥 ${enemy.name} の攻撃が ${allAllies[targetIdx].name} に直撃！`);
            }
            
            setAllies(prev => prev.map((a, i) => {
              if (a.id === attack.targetId) {
                const newHp = Math.max(0, a.hp - dmg);
                return { ...a, hp: newHp, flashTimer: 400, isDead: newHp <= 0 };
              }
              return a;
            }));
            spawnDamageNumber(attack.targetId, dmg, isGuarding ? 'damage' : 'critical');
          }
          
          setCurrentAttack(null);
          setTurnPhase('enemy_resolve');
          setTurnTimer(150); // Visual step forward duration (snappy!)
        }
      }

      // ── ENEMY RESOLVE (Animation Hold) ──
      if (phase === 'enemy_resolve') {
        setTurnTimer(prev => {
          const next = prev - dt;
          if (next <= 0) {
            setCurrentTurnIndex(p => p + 1);
            setTurnPhase('turn_delay');
            setTurnTimer(TURN_DELAY);
            return 0;
          }
          return next;
        });
      }

      // ── COUNTER ATTACK (after parry) ──
      if (phase === 'counter_attack' && stateRef.current.counterAttack) {
        const { allyId, enemyId } = stateRef.current.counterAttack;
        const ally = stateRef.current.allies.find(a => a.id === allyId);
        const enemy = stateRef.current.enemies.find(e => e.id === enemyId);
        
        if (ally && enemy && !enemy.isDead) {
          const dmg = COUNTER_DAMAGE + Math.floor(Math.random() * 10);
          setEnemies(prev => prev.map(e => {
            if (e.id === enemyId) {
              const newHp = Math.max(0, e.hp - dmg);
              return { ...e, hp: newHp, flashTimer: 400, isDead: newHp <= 0 };
            }
            return e;
          }));
          spawnDamageNumber(enemyId, dmg, 'damage');
          addLog(`⚡ ${ally.name} が反撃！ ${enemy.name} にダメージ！`);
        }
        
        setCounterAttack(null);
        // Advance turn (enemy's turn still consumed)
        setCurrentTurnIndex(p => p + 1);
        setTurnPhase('turn_delay');
        setTurnTimer(TURN_DELAY);
      }

      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, [battlePhase, addLog, spawnDamageNumber, addSync, spawnGlint]);


  // ═══════════════════════════════════════════════════════════════════════════════
  // INTERACTIONS (PARRY & GUARD)
  // ═══════════════════════════════════════════════════════════════════════════════
  
  const handlePointerDown = useCallback((allyId) => {
    if (stateRef.current.battlePhase !== 'fighting') return;
    const ally = stateRef.current.allies.find(a => a.id === allyId);
    if (!ally || ally.isDead) return;

    const now = Date.now();
    let parrySuccess = false;

    // Check for Parry Window
    const attack = stateRef.current.currentAttack;
    if (attack && attack.targetId === allyId) {
      const elapsed = now - attack.startTime;
      
      // Parry window is active just after the glint starts until the attack hits
      if (elapsed >= PARRY_WINDOW_START && elapsed <= PARRY_WINDOW_END) {
        // PARRY!
        parrySuccess = true;
        if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
        setParryFlash(true);
        setTimeout(() => setParryFlash(false), 500);
        triggerSakuraNote();
        addSync(SYNC_PER_PARRY);
        
        // Cancel the attack, stun enemy, trigger counter-attack
        setCurrentAttack(null);
        setEnemies(prev => prev.map(e => {
          if (e.id === attack.enemyId) {
            return { ...e, isStunned: true };
          }
          return e;
        }));
        
        addLog(`✨ パリィ成功！ ${ally.name} が敵を弾き返した！`);
        
        // Set up counter-attack
        setCounterAttack({ allyId: allyId, enemyId: attack.enemyId });
        setTurnPhase('counter_attack');
      }
    }

    if (!parrySuccess) {
      // Normal Guard
      setGuardingAllies(prev => {
        const next = new Set(prev);
        next.add(allyId);
        return next;
      });
      triggerSakuraNote();
    }
  }, [addLog, addSync, triggerSakuraNote, playSE]);

  const handlePointerUp = useCallback((allyId) => {
    setGuardingAllies(prev => {
      const next = new Set(prev);
      next.delete(allyId);
      return next;
    });
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════════
  // ABILITIES
  // ═══════════════════════════════════════════════════════════════════════════════

  const handleHeal = useCallback(() => {
    if (healCooldown > 0 || stateRef.current.battlePhase !== 'fighting') return;
    
    setHealCooldown(HEAL_COOLDOWN);
    setHealFlash(true);
    setTimeout(() => setHealFlash(false), 500);
    triggerSakuraNote();

    setAllies(prev => prev.map(a => {
      if (a.isDead) return a;
      spawnDamageNumber(a.id, HEAL_AMOUNT, 'heal');
      return { ...a, hp: Math.min(a.maxHp, a.hp + HEAL_AMOUNT), flashTimer: 0 };
    }));
    addLog(`💖 朔良の歌でパーティ全体が回復！`);
  }, [healCooldown, addLog, triggerSakuraNote, spawnDamageNumber]);

  const handleUltimate = useCallback(() => {
    if (syncRate < SYNC_COST_ULTIMATE || stateRef.current.battlePhase !== 'fighting') return;
    
    setSyncRate(0);
    const aliveAlly = allies.find(a => !a.isDead);
    if (aliveAlly) {
      setDuetCutin({ allyId: aliveAlly.id, name: aliveAlly.name, image: aliveAlly.cutinImage });
    }
    
    setUltimateFlash(true);
    triggerSakuraNote();

    setTimeout(() => {
      setShakeActive(true);
      setEnemies(prev => prev.map(e => {
        if (e.isDead) return e;
        const dmg = ULTIMATE_DAMAGE + Math.floor(Math.random() * 40);
        spawnDamageNumber(e.id, dmg, 'ultimate');
        return { ...e, hp: Math.max(0, e.hp - dmg), flashTimer: 800, isDead: e.hp - dmg <= 0, isStunned: true };
      }));
      setCurrentAttack(null); // cancel current enemy attack
      addLog(`★★ 共鳴の歌！ デュエット・アルティメット炸裂！ ★★`);
    }, 1500);

    setTimeout(() => { setDuetCutin(null); setUltimateFlash(false); setShakeActive(false); }, 2500);
  }, [syncRate, allies, addLog, triggerSakuraNote, spawnDamageNumber]);

  const handleResultClose = useCallback(() => {
    if (stopBGM) stopBGM();
    onComplete(battlePhase === 'victory' ? 'win' : 'lose');
  }, [battlePhase, onComplete, stopBGM]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER COMPUTATIONS
  // ═══════════════════════════════════════════════════════════════════════════════
  
  const targetedAllies = useMemo(() => {
    const set = new Set();
    if (currentAttack) set.add(currentAttack.targetId);
    return set;
  }, [currentAttack]);

  const activeAttacksCompat = useMemo(() => {
    return currentAttack ? [currentAttack] : [];
  }, [currentAttack]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className={`absolute inset-0 w-full h-full bg-[#050B14] overflow-hidden select-none z-50 flex flex-col ${shakeActive ? 'animate-battle-shake' : ''}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/battle/sougen.jpeg" alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" /> {/* Slight dark overlay for readability */}
      </div>
      
      {/* Background Grids */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,245,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* ── INTRO ── */}
      <AnimatePresence>
        {battlePhase === 'intro' && (
          <motion.div className="absolute inset-0 z-[60] flex items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <div className="font-orbitron text-xs tracking-[0.4em] text-cyan-500/60 mb-3">SYNCHRONIC VOCAL BATTLE</div>
              <h2 className="font-orbitron text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 tracking-wider animate-pulse">
                BATTLE START
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VISUAL FLASHES ── */}
      <AnimatePresence>
        {parryFlash && (
          <motion.div className="absolute inset-0 z-[55] pointer-events-none flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="absolute inset-0 bg-cyan-400/20" />
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} transition={{ duration: 0.4 }} className="font-orbitron text-5xl md:text-7xl font-black text-cyan-300 drop-shadow-[0_0_30px_rgba(0,245,255,0.8)] z-10 italic">
              PARRY!
            </motion.div>
          </motion.div>
        )}
        {healFlash && (
          <motion.div className="absolute inset-0 z-[54] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 0.5 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 to-transparent" />
          </motion.div>
        )}
        {ultimateFlash && (
          <motion.div className="absolute inset-0 z-[55] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.3, 0.6, 0] }} transition={{ duration: 2 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/50 via-cyan-400/30 to-violet-500/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DUET CUTIN ── */}
      <AnimatePresence>
        {duetCutin && (
          <motion.div className="absolute inset-0 z-[58] pointer-events-none flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-black/70" />
            <motion.img src={duetCutin.image} alt={duetCutin.name} className="absolute h-[80%] object-contain z-10 drop-shadow-[0_0_40px_rgba(0,245,255,0.6)]" initial={{ x: '-100%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
            <motion.div className="absolute bottom-[15%] z-20 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="font-orbitron text-xs tracking-[0.5em] text-cyan-400/80 mb-2">DUET ULTIMATE</div>
              <div className="font-noto text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-cyan-300 tracking-wider">共鳴の歌</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
           TIMELINE (Turn Order) - Top Bar
         ═══════════════════════════════════════════════════════════════ */}
      {battlePhase === 'fighting' && (
        <div className="relative z-30 w-full flex justify-center pt-2 pb-1">
          <div className="flex items-center gap-1 md:gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/20">
            <span className="font-orbitron text-[8px] md:text-[10px] text-cyan-400/60 tracking-widest mr-2">TURN</span>
            <div className="flex items-center gap-1 md:gap-1.5">
              <AnimatePresence mode="popLayout">
                {timelineQueue.map((turn, i) => {
                  const info = getCharInfo(turn.id);
                  const isCurrent = i === 0;
                  const isDead = info.isAlly 
                    ? allies.find(a => a.id === turn.id)?.isDead 
                    : enemies.find(e => e.id === turn.id)?.isDead;
                  
                  return (
                    <motion.div
                      key={turn.turnIndex}
                      layout
                      initial={{ opacity: 0, scale: 0.5, x: 30 }}
                      animate={{ opacity: isDead ? 0.3 : 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: -30 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className={`relative flex-shrink-0 ${isCurrent ? 'z-10' : 'z-0'}`}
                    >
                      {/* Diamond container */}
                      <div 
                        className={`relative overflow-hidden flex items-center justify-center
                          ${isCurrent 
                            ? 'w-10 h-10 md:w-12 md:h-12' 
                            : 'w-7 h-7 md:w-9 md:h-9'
                          }
                        `}
                        style={{ transform: 'rotate(45deg)' }}
                      >
                        {/* Background */}
                        <div className={`absolute inset-0 ${
                          isCurrent 
                            ? (info.isAlly ? 'bg-cyan-500 shadow-[0_0_12px_rgba(0,245,255,0.6)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]')
                            : (info.isAlly ? 'bg-cyan-900/80' : 'bg-red-900/80')
                        } border ${
                          isCurrent
                            ? (info.isAlly ? 'border-cyan-300' : 'border-red-300')
                            : (info.isAlly ? 'border-cyan-500/40' : 'border-red-500/40')
                        }`} />
                        
                        {/* Character Icon */}
                        <div style={{ transform: 'rotate(-45deg)' }} className="relative z-10">
                          <img 
                            src={info.image} 
                            alt={info.name} 
                            className={`${isCurrent ? 'w-7 h-7 md:w-9 md:h-9' : 'w-5 h-5 md:w-6 md:h-6'} object-contain`}
                          />
                        </div>
                      </div>

                      {/* Current turn glow */}
                      {isCurrent && (
                        <motion.div 
                          className="absolute inset-[-3px] pointer-events-none"
                          style={{ transform: 'rotate(45deg)' }}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          <div className={`w-full h-full border-2 ${info.isAlly ? 'border-cyan-300/80' : 'border-red-300/80'}`} />
                        </motion.div>
                      )}
                      
                      {/* Separator arrow (except last) */}
                      {i < timelineQueue.length - 1 && (
                        <div className="absolute -right-1 md:-right-1.5 top-1/2 -translate-y-1/2 text-[6px] text-white/30 z-20">▸</div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
           BATTLE FIELD
         ═══════════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex items-stretch px-2 md:px-8 pt-2 pb-4 z-10 overflow-hidden">
        
        {/* ── Protagonist (Sakura) - Far Left ── */}
        <div className="w-[20%] md:w-[15%] flex flex-col items-center justify-center relative">
          <div className="relative w-20 h-32 md:w-28 md:h-44">
            <motion.img
              src="/battle/sakura.png"
              alt="Sakura"
              className="w-full h-full object-contain"
              animate={sakuraSinging ? { y: [0, -10, 0], scale: [1, 1.05, 1] } : { y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            {/* Note Effects */}
            <AnimatePresence>
              {sakuraNotes.map(note => (
                <motion.div
                  key={note.id}
                  className="absolute top-0 left-1/2 text-cyan-300 font-bold text-xl drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]"
                  initial={{ opacity: 0, x: note.x, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: note.x * 2, y: note.y - 30, scale: 1.5 }}
                  exit={{ opacity: 0, y: note.y - 50 }}
                  transition={{ duration: 1 }}
                >
                  ♪
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mt-2 font-noto text-xs text-cyan-400/80 tracking-widest bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">朔良</div>
        </div>

        {/* ── Allies (Mid-Left Column) ── */}
        <div className="w-[35%] flex flex-col justify-around items-center pr-4 border-r border-cyan-500/10">
          {allies.map(ally => {
            const isTargeted = targetedAllies.has(ally.id);
            const isGuarding = guardingAllies.has(ally.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === ally.id && turnPhase !== 'turn_delay';
            
            return (
              <div key={ally.id} className="relative flex flex-col items-center w-full">
                {/* Status Bar */}
                <div className="w-24 md:w-32 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-orbitron text-[9px] text-cyan-400/80 w-5">HP</span>
                    <div className="flex-1 h-[6px] bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full transition-all duration-300" style={{ width: `${(ally.hp / ally.maxHp) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Ally Portrait (Interactable) */}
                <motion.div
                  className={`relative cursor-pointer touch-none w-24 h-32 md:w-32 md:h-40 rounded-xl flex items-center justify-center transition-all duration-200
                    ${ally.isDead ? 'opacity-40 grayscale' : ''}
                  `}
                  animate={{ x: isCurrentTurn && turnPhase === 'ally_attack' ? 30 : 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                  onPointerDown={() => handlePointerDown(ally.id)}
                  onPointerUp={() => handlePointerUp(ally.id)}
                  onPointerLeave={() => handlePointerUp(ally.id)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Active Turn Indicator */}
                  {isCurrentTurn && !ally.isDead && (
                    <motion.div
                      className="absolute inset-[-12px] rounded-xl border-2 border-cyan-400 bg-cyan-400/10"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {/* Target Highlight Effect */}
                  {isTargeted && !ally.isDead && (
                    <motion.div
                      className="absolute inset-[-12px] rounded-xl border-2 border-red-500 bg-red-500/10"
                      animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.02, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                  {/* Guard Shield Effect */}
                  {isGuarding && !ally.isDead && (
                    <div className="absolute inset-[-8px] rounded-xl border-2 border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,245,255,0.4)]" />
                  )}
                  
                  {ally.image ? (
                    <img src={ally.image} alt={ally.name} className={`w-full h-full object-contain relative z-10 ${ally.flashTimer > 0 ? 'animate-battle-hit-flash drop-shadow-[0_0_15px_rgba(248,113,113,0.8)]' : ''}`} />
                  ) : (
                    <div className="w-full h-full bg-gray-800/80 border border-gray-600 rounded-xl flex items-center justify-center">
                      <span className="font-noto font-bold text-gray-300">{ally.name}</span>
                    </div>
                  )}

                  {/* Indicators */}
                  {isTargeted && !ally.isDead && (
                    <div className="absolute -top-6 bg-red-950/80 border border-red-500/50 px-2 py-0.5 rounded text-[10px] font-orbitron text-red-400 animate-pulse z-20">⚠ TARGET</div>
                  )}
                  {isGuarding && !ally.isDead && (
                    <div className="absolute -bottom-4 font-orbitron text-[9px] text-cyan-300 bg-black/60 px-2 py-0.5 rounded-full border border-cyan-500/30 z-20">GUARDING</div>
                  )}
                  {ally.isDead && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl z-20">
                      <span className="font-orbitron text-xs text-red-500 font-bold">DEAD</span>
                    </div>
                  )}
                </motion.div>

                {/* Damage Numbers */}
                <AnimatePresence>
                  {showDamageNumbers.filter(d => d.targetId === ally.id).map(d => (
                    <motion.div key={d.id} className={`absolute top-0 z-30 font-orbitron font-black text-lg md:text-xl ${d.type === 'heal' ? 'text-emerald-400' : 'text-red-400'} drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]`} initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -40 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                      {d.type === 'heal' ? `+${d.amount}` : `-${d.amount}`}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Enemies (Right Column) ── */}
        <div className="w-[45%] flex flex-col justify-around items-center pl-4">
          {enemies.map(enemy => {
            const isAttacking = activeAttacksCompat.some(a => a.enemyId === enemy.id);
            const activeGlint = glintEffects.find(g => g.enemyId === enemy.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === enemy.id && turnPhase !== 'turn_delay';

            return (
              <div key={enemy.id} className="relative flex flex-col items-center w-full z-20">
                {/* Status Bar */}
                <div className="w-28 md:w-36 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-orbitron text-[9px] text-red-400/80 w-5">HP</span>
                    <div className="flex-1 h-[6px] bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                      <div className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all duration-300" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Enemy Body (Now using ene.png) */}
                <motion.div 
                  className={`relative w-24 h-32 md:w-32 md:h-40 flex items-center justify-center transition-all duration-200 ${
                    enemy.isDead ? 'opacity-30 grayscale'
                    : enemy.flashTimer > 0 ? 'animate-battle-hit-flash'
                    : ''
                  }`}
                  animate={{ x: isCurrentTurn && turnPhase === 'enemy_resolve' ? -30 : 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  
                  {/* Active Turn Indicator for Enemies */}
                  {isCurrentTurn && !enemy.isDead && (
                    <motion.div
                      className="absolute inset-[-12px] rounded-full border-2 border-red-400 bg-red-400/10"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}

                  {/* Glint Effect for Parry Timing (Horizontal Slash) */}
                  <AnimatePresence>
                    {activeGlint && (
                      <motion.div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex items-center justify-center"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: [0, 1.2, 1.5], opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        {/* Red glow base */}
                        <div className="w-[250px] md:w-[350px] h-2 bg-red-600/60 absolute blur-[4px] rounded-full" />
                        {/* Sharp red line */}
                        <div className="w-[200px] md:w-[300px] h-[2px] bg-red-500 absolute shadow-[0_0_15px_rgba(255,0,0,1)] rounded-full" />
                        {/* Bright core */}
                        <div className="w-[100px] md:w-[150px] h-[1px] bg-white absolute shadow-[0_0_10px_rgba(255,255,255,1)] rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Enemy Image */}
                  <img src={enemy.image} alt={enemy.name} className={`w-full h-full object-contain drop-shadow-[0_0_10px_rgba(239,68,68,0.2)] ${enemy.isStunned ? 'opacity-50 blur-[1px]' : ''}`} />

                  {/* Stun Indicator */}
                  {enemy.isStunned && !enemy.isDead && (
                    <motion.div className="absolute -top-4 font-orbitron text-[9px] text-yellow-400 font-bold bg-black/80 px-2 py-0.5 rounded border border-yellow-500/50" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                      STUNNED
                    </motion.div>
                  )}
                  {/* Attack Indicator */}
                  {isAttacking && !enemy.isDead && (
                    <motion.div className="absolute inset-[-10px] rounded-full border-2 border-red-500/50 border-dashed" animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
                  )}
                  
                  <span className="absolute -bottom-6 font-noto text-sm md:text-base font-bold text-red-300 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
                    {enemy.name}
                  </span>
                </motion.div>

                {/* Damage Numbers */}
                <AnimatePresence>
                  {showDamageNumbers.filter(d => d.targetId === enemy.id).map(d => (
                    <motion.div key={d.id} className={`absolute top-0 z-30 font-orbitron font-black text-xl md:text-2xl ${d.type === 'ultimate' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400' : 'text-orange-400'} drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]`} initial={{ opacity: 1, y: 0, scale: 1.5 }} animate={{ opacity: 0, y: -50, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                      -{d.amount}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* EXIT button */}
        <button onClick={handleResultClose} className="absolute top-2 right-2 md:top-3 md:right-3 px-3 py-1.5 bg-gray-900/80 border border-gray-600/50 text-gray-400 font-orbitron text-[10px] tracking-widest rounded hover:border-cyan-500/50 hover:text-cyan-300 transition-all z-30">
          EXIT
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           LEFT-SIDE ACTION BUTTONS (Floating)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-[3vh] left-[2vw] z-40 flex flex-col items-center gap-3">
        
        {/* Ultimate Button with Sync Rate Ring */}
        <div className="relative">
          <button
            onClick={handleUltimate}
            disabled={syncRate < SYNC_COST_ULTIMATE || battlePhase !== 'fighting'}
            className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all ${
              syncRate < SYNC_COST_ULTIMATE
                ? 'bg-gray-900/80 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-br from-cyan-900/90 to-violet-900/90 text-white hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] active:scale-95 cursor-pointer'
            }`}
          >
            <span className="font-noto font-black text-[10px] md:text-xs relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">共鳴の歌</span>
            <span className="font-orbitron text-[7px] md:text-[8px] opacity-80 relative z-10 mt-0.5 text-cyan-300">{Math.floor(syncRate)}%</span>
          </button>
          
          {/* SVG Sync Rate Ring */}
          <svg 
            className="absolute inset-[-4px] md:inset-[-5px] w-[calc(100%+8px)] h-[calc(100%+8px)] md:w-[calc(100%+10px)] md:h-[calc(100%+10px)] -rotate-90 pointer-events-none"
            viewBox="0 0 100 100"
          >
            {/* Background ring */}
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(100,116,139,0.3)" strokeWidth="3" />
            {/* Progress ring */}
            <circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke={syncRate >= 100 ? 'url(#syncGradientFull)' : 'url(#syncGradient)'}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 46}`}
              strokeDashoffset={`${2 * Math.PI * 46 * (1 - syncRate / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
            <defs>
              <linearGradient id="syncGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
              <linearGradient id="syncGradientFull" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Full glow when ready */}
          {syncRate >= SYNC_COST_ULTIMATE && (
            <motion.div 
              className="absolute inset-[-6px] md:inset-[-7px] rounded-full border-2 border-cyan-300/60 pointer-events-none"
              animate={{ opacity: [0.3, 0.9, 0.3], boxShadow: ['0 0 10px rgba(0,245,255,0.2)', '0 0 25px rgba(0,245,255,0.6)', '0 0 10px rgba(0,245,255,0.2)'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Heal Button */}
        <button
          onClick={handleHeal}
          disabled={healCooldown > 0 || battlePhase !== 'fighting'}
          className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all ${
            healCooldown > 0
              ? 'border-gray-600/50 bg-gray-900/80 text-gray-500 cursor-not-allowed'
              : 'border-emerald-500/70 bg-emerald-950/80 text-emerald-300 hover:bg-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 cursor-pointer'
          }`}
        >
          {healCooldown > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-600/30 rounded-b-full transition-all duration-100 overflow-hidden" style={{ height: `${(healCooldown / HEAL_COOLDOWN) * 100}%` }} />
          )}
          <span className="font-noto font-bold text-[9px] md:text-[10px] relative z-10">癒やし</span>
          <span className="font-orbitron text-[7px] md:text-[8px] opacity-70 relative z-10 mt-0.5">{healCooldown > 0 ? `${(healCooldown / 1000).toFixed(0)}s` : 'HEAL'}</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           VICTORY / DEFEAT
         ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(battlePhase === 'victory' || battlePhase === 'defeat') && (
          <motion.div className="absolute inset-0 z-[60] flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className={`absolute inset-0 ${battlePhase === 'victory' ? 'bg-black/70' : 'bg-red-950/60'}`} />
            <motion.div className="relative z-10 text-center" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className={`font-orbitron text-4xl md:text-6xl font-black tracking-[0.3em] ${battlePhase === 'victory' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-orange-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)]'}`}>
                {battlePhase === 'victory' ? 'VICTORY' : 'DEFEAT'}
              </h2>
              <button onClick={handleResultClose} className={`mt-10 px-8 py-3 font-orbitron text-sm tracking-[0.3em] rounded border transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${battlePhase === 'victory' ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-300 hover:text-white hover:shadow-[0_0_20px_rgba(0,245,255,0.35)]' : 'bg-red-950/30 border-red-500/40 text-red-300 hover:bg-red-500/25 hover:border-red-300 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.35)]'}`}>
                {battlePhase === 'victory' ? 'CONTINUE' : 'RETURN'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
