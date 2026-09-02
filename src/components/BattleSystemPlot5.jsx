import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpriteAnimator from './SpriteAnimator';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & TUNING
// ═══════════════════════════════════════════════════════════════════════════════
const TURN_DELAY = 600;             // Delay between turns (ms) (Allows time for heal/absorb and reading next action)
const HEAL_COOLDOWN = 12000;

// Damage values
const ALLY_BASE_DAMAGE = 15;
const ENEMY_BASE_DAMAGE = 20;
const GUARD_REDUCTION = 0.2;          // 80% damage reduction when holding guard
const ULTIMATE_DAMAGE = 200;
const HEAL_AMOUNT = 80;
const COUNTER_DAMAGE = 35;            // Parry counter-attack damage

// Sync
const SYNC_PER_HIT = 5;               // Sync points gained on normal attack
const SYNC_PER_PARRY = 20;            // Sync points gained on parry
const SYNC_MAX = 100;                 // Max sync points (unleashes Resonance)
const SYNC_COST_ULTIMATE = 100;       // Cost to use ultimate
const SYNC_COST_BUFF = 30;            // Cost to use buff song

const ATTACK_PATTERNS = [
  { label: '通常攻撃', sequence: [{ hits: 1, duration: 1200, interval: 0, delayStart: 0 }] },
  { label: '高速攻撃', sequence: [{ hits: 1, duration: 800, interval: 0, delayStart: 0 }] },
  { label: '二連撃', sequence: [{ hits: 2, duration: 1000, interval: 250, delayStart: 0 }] },
  {
    label: 'ディレイ連撃', sequence: [
      { hits: 1, duration: 1000, interval: 0, delayStart: 0 },
      { hits: 2, duration: 800, interval: 200, delayStart: 1000 }
    ]
  },
  {
    label: '変拍子連撃', sequence: [
      { hits: 2, duration: 900, interval: 200, delayStart: 0 },
      { hits: 1, duration: 900, interval: 0, delayStart: 1200 }
    ]
  },
  { label: '三連撃', sequence: [{ hits: 3, duration: 900, interval: 250, delayStart: 0 }] },
  {
    label: '乱舞', sequence: [
      { hits: 2, duration: 800, interval: 150, delayStart: 0 },
      { hits: 2, duration: 800, interval: 150, delayStart: 900 }
    ]
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ANOMALY FRAGMENTS
// ═══════════════════════════════════════════════════════════════════════════════
const ANOMALY_FRAGMENTS = {
  ATK_UP: { id: 'ATK_UP', name: '猛攻の欠片', desc: '与えるダメージが1.5倍になる', color: 'bg-red-500', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]', icon: '⚔️' },
  DEF_UP: { id: 'DEF_UP', name: '堅守の欠片', desc: '受けるダメージを半減する', color: 'bg-blue-500', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.6)]', icon: '🛡️' },
  SYNC_BOOST: { id: 'SYNC_BOOST', name: '共鳴の欠片', desc: 'SYNC獲得量が2倍になる', color: 'bg-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]', icon: '✨' },
  HEAL_BOOST: { id: 'HEAL_BOOST', name: '慈愛の欠片', desc: '回復量が2倍になる', color: 'bg-emerald-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]', icon: '💖' },
  ULT_BOOST: { id: 'ULT_BOOST', name: '崩壊の欠片', desc: '必殺技ダメージが2.5倍になる', color: 'bg-violet-500', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.6)]', icon: '🔥' },
};
const MAX_ANOMALY_SLOTS = 5;

// Turn order
const TURN_ORDER = ['mutsunori', 'enemy1'];
const TIMELINE_DISPLAY_COUNT = 10;    // How many turns to show in the timeline

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════════════════════════════════
const createAllies = () => [
  { id: 'mutsunori', name: '睦典', image: '/battle/mutsunori.png', cutinImage: '/character/Mutsunori/Mutsunori_serious.png', hp: 300, maxHp: 300, color: '#34d399', isDead: false, flashTimer: 0, lastDamage: 0 },
];

const createEnemies = () => [
  { id: 'enemy1', name: 'キメラ', image: '/character/kimera1.png', hp: 600, maxHp: 600, color: '#ef4444', isStunned: false, isDead: false, flashTimer: 0 },
];

// Helper to get character info for timeline
const getCharInfo = (id) => {
  const map = {
    mutsunori: { name: '睦典', image: '/battle/mutsunori.png', isAlly: true },
    nagisa: { name: '凪砂', image: '/battle/nagisa.png', isAlly: true },
    enemy1: { name: 'キメラ', image: '/character/kimera1.png', isAlly: false },
    enemy2: { name: 'キメラβ', image: '/character/kimera1.png', isAlly: false },
  };
  return map[id] || { name: '？', image: '', isAlly: false };
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BattleSystemPlot5({ onComplete, playBGM, stopBGM, playSE }) {
  // ─── Core State ───
  const [allies, setAllies] = useState(createAllies);
  const [enemies, setEnemies] = useState(createEnemies);
  const [syncRate, setSyncRate] = useState(0);          // 0-100
  const [battlePhase, setBattlePhase] = useState('intro');
  const [battleLog, setBattleLog] = useState([]);

  // ─── Turn State ───
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);  // index in TURN_ORDER
  const [turnPhase, setTurnPhase] = useState('waiting');  // 'waiting' | 'ally_windup' | 'ally_attack' | 'enemy_windup' | 'enemy_resolve' | 'counter_attack' | 'turn_delay'
  const [turnTimer, setTurnTimer] = useState(0);
  const [activeAttacks, setActiveAttacks] = useState([]); // Array of { id, enemyId, targetId, startTime, delay, duration, glintFired, resolved }
  const [counterAttack, setCounterAttack] = useState(null); // { allyId, enemyId }
  const [allyQTEState, setAllyQTEState] = useState('none'); // 'none' | 'waiting' | 'success' | 'fail'
  const [hitPosition, setHitPosition] = useState(null);
  const qteStartTimeRef = useRef(0);
  const qteSuccessRef = useRef(false);
  const qteResultRef = useRef('miss');

  const [guardingAllies, setGuardingAllies] = useState(new Set());
  const [healCooldown, setHealCooldown] = useState(0);
  const [buffTurnsLeft, setBuffTurnsLeft] = useState(0);
  const [guardCooldownTrigger, setGuardCooldownTrigger] = useState({ mutsunori: 0, nagisa: 0 });

  // ─── Anomaly State ───
  const [activeFragments, setActiveFragments] = useState([]); // [{ id, turnsLeft }]
  const [absorbCooldown, setAbsorbCooldown] = useState(0); // 0-5
  const [corruption, setCorruption] = useState(0); // 0-100 Rampage gauge

  // ─── Visual Effects State ───
  const [sakuraSinging, setSakuraSinging] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [sakuraNotes, setSakuraNotes] = useState([]); // { id, x, y }
  const [showDamageNumbers, setShowDamageNumbers] = useState([]);
  const [shakeActive, setShakeActive] = useState(false);
  const [parryFlash, setParryFlash] = useState(false);
  const [ultimateFlash, setUltimateFlash] = useState(false);
  const [healFlash, setHealFlash] = useState(false);
  const [counterAnim, setCounterAnim] = useState(null); // { allyId, enemyId }
  const [duetCutin, setDuetCutin] = useState(null);
  const [glintEffects, setGlintEffects] = useState([]); // { id, enemyId }
  const [isPaused, setIsPaused] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true); // New tutorial state

  const isPausedRef = useRef(isPaused);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  const gameLoopRef = useRef(null);
  const lastTickRef = useRef(0);
  const hitStopRef = useRef(0);
  const guardCooldownsRef = useRef({ mutsunori: 0, nagisa: 0 });
  const stateRef = useRef({ allies, enemies, activeAttacks, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, buffTurnsLeft, activeFragments, absorbCooldown, corruption });

  useEffect(() => {
    stateRef.current = { allies, enemies, activeAttacks, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, buffTurnsLeft, activeFragments, absorbCooldown, corruption };
  }, [allies, enemies, activeAttacks, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, buffTurnsLeft, activeFragments, absorbCooldown, corruption]);

  // ─── Helpers ───
  const addLog = useCallback((msg) => {
    setBattleLog(prev => [...prev.slice(-4), msg]);
  }, []);

  const spawnDamageNumber = useCallback((targetId, amount, type = 'damage') => {
    const id = Date.now() + Math.random();
    setShowDamageNumbers(prev => [...prev, { id, targetId, amount, type }]);
    setTimeout(() => setShowDamageNumbers(prev => prev.filter(d => d.id !== id)), 1200);
  }, []);

  const addSync = useCallback((amount) => {
    setSyncRate(prev => Math.min(SYNC_MAX, prev + amount));
  }, []);

  const executeAllyAttack = useCallback((qteResult) => {
    const allAllies = stateRef.current.allies;
    const allEnemies = stateRef.current.enemies;
    const turnId = TURN_ORDER[stateRef.current.currentTurnIndex % TURN_ORDER.length];

    const aliveEnemies = allEnemies.filter(e => !e.isDead);
    if (aliveEnemies.length > 0) {
      const hasBuff = stateRef.current.buffTurnsLeft > 0;

      if (hasBuff) {
        setBuffTurnsLeft(prev => {
          const next = Math.max(0, prev - 1);
          if (next === 0) {
            addLog("🎵 強化の歌の効果が切れた");
            setSakuraSinging(false);
          }
          return next;
        });
      }

      setAbsorbCooldown(prev => Math.max(0, prev - 1));

      const hasExpiringFragment = stateRef.current.activeFragments.some(f => f.turnsLeft <= 1);
      if (hasExpiringFragment) {
        addLog(`⚡ 吸収能力の効果が切れた`);
      }
      setActiveFragments(prev => prev.map(f => f.turnsLeft > 1 ? { ...f, turnsLeft: f.turnsLeft - 1 } : null).filter(Boolean));

      const target = aliveEnemies.reduce((min, e) => e.hp < min.hp ? e : min, aliveEnemies[0]);
      const atkMult = stateRef.current.activeFragments.some(f => f.id === 'ATK_UP') ? 1.5 : 1.0;
      const baseDmg = ALLY_BASE_DAMAGE + Math.floor(Math.random() * 8);
      let dmg = hasBuff ? Math.floor(baseDmg * 1.5) : baseDmg;
      dmg = Math.floor(dmg * atkMult);

      if (qteResult === 'perfect') {
        dmg = Math.floor(dmg * 1.5);
      } else if (qteResult === 'good') {
        dmg = Math.floor(dmg * 1.2);
      }

      setEnemies(prev => prev.map(e => {
        if (e.id === target.id) {
          const newHp = Math.max(0, e.hp - dmg);
          return { ...e, hp: newHp, flashTimer: 500, isDead: newHp <= 0 };
        }
        return e;
      }));
      spawnDamageNumber(target.id, dmg, qteResult === 'perfect' ? 'critical' : 'damage');
      addSync(SYNC_PER_HIT);
      const ally = allAllies.find(a => a.id === turnId);
      if (ally) {
        if (qteResult === 'perfect') addLog(`⚡ジャスト攻撃！ ${ally.name} が ${target.name} に大ダメージ！`);
        else addLog(`⚔ ${ally.name} が ${target.name} に攻撃！`);
      }
      if (playSE) playSE('/assets/audio/bgm/+game_sword.mp3');
    }
    setTurnPhase('ally_attack');
    stateRef.current.turnPhase = 'ally_attack';
    setTurnTimer(150);
  }, [addLog, spawnDamageNumber, addSync, playSE]);

  const triggerSakuraNote = useCallback((type = 'default') => {
    return; // TODO: Temporarily disabled per user request
    setSakuraSinging(true);

    // Generate 5-8 cyber notes/data particles
    const count = Math.floor(Math.random() * 4) + 5;
    const newNotes = [];
    const symbols = ['♪', '♬', '♫', '♩', '🎶', '🎵'];
    const colors = type === 'heal'
      ? ['text-emerald-300', 'text-emerald-400', 'text-green-300', 'text-green-400', 'text-teal-300']
      : type === 'attack'
        ? ['text-red-400', 'text-red-500', 'text-rose-400', 'text-rose-500', 'text-pink-500']
        : ['text-blue-300', 'text-blue-400', 'text-blue-300', 'text-cyan-300', 'text-cyan-400', 'text-sky-300', 'text-sky-400', 'text-indigo-300', 'text-violet-300'];

    for (let i = 0; i < count; i++) {
      const startX = (Math.random() * 400) - 100;
      const startY = (Math.random() * 300) - 150;
      newNotes.push({
        id: Date.now() + Math.random(),
        startX,
        startY,
        endX: startX + (Math.random() * 80 - 40),
        endY: startY + (Math.random() * 80 - 40),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.8 + 0.8, // 0.8x to 1.6x size
        duration: 1.5
      });
    }

    setSakuraNotes(prev => {
      if (prev.length >= 10) return prev;
      return [...prev, ...newNotes].slice(-10);
    });

    setTimeout(() => {
      const noteIds = newNotes.map(n => n.id);
      setSakuraNotes(prev => prev.filter(n => !noteIds.includes(n.id)));
      setSakuraSinging(false);
    }, 1500);
  }, []);

  // Continuous notes while guarding
  useEffect(() => {
    return; // TODO: Temporarily disabled per user request
    let intervalId;
    if (guardingAllies.has('mutsunori')) {
      intervalId = setInterval(() => {
        const symbols = ['♪', '♬', '♫', '♩', '🎶', '🎵'];
        const colors = ['text-blue-300', 'text-blue-400', 'text-blue-300', 'text-cyan-300', 'text-cyan-400', 'text-sky-300', 'text-sky-400', 'text-indigo-300', 'text-violet-300'];
        const startX = (Math.random() * 500) - 150; // Much wider horizontal range
        const startY = (Math.random() * 400) - 200; // Much wider vertical range
        const newNote = {
          id: Date.now() + Math.random(),
          startX,
          startY,
          endX: startX + (Math.random() * 100 - 50), // Drift gently in any direction
          endY: startY + (Math.random() * 100 - 50),
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          scale: Math.random() * 0.8 + 0.8,
          duration: 2.5 // Last longer for a slow float
        };

        setSakuraNotes(prev => {
          if (prev.length >= 10) return prev; // Limit quantity to 10 for less clutter
          return [...prev, newNote];
        });

        setTimeout(() => {
          setSakuraNotes(prev => prev.filter(n => n.id !== newNote.id));
        }, 2500); // 2.5 second lifetime
      }, 400); // Spawn much slower (every 400ms instead of 150ms)
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [guardingAllies]);

  const spawnGlint = useCallback((enemyId, targetId) => {
    const id = Date.now() + Math.random();
    setGlintEffects(prev => [...prev, { id, enemyId, targetId }]);
    setTimeout(() => setGlintEffects(prev => prev.filter(g => g.id !== id)), 1000);
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
    if (playBGM) {
      playBGM('/assets/audio/bgm/RPG_Battle_01.mp3');
    }
    return () => { if (stopBGM) stopBGM(); };
  }, []);

  // ─── Intro -> Fighting ───
  useEffect(() => {
    if (battlePhase === 'intro' && !showTutorial) {
      const timer = setTimeout(() => {
        setBattlePhase('fighting');
        setTurnPhase('turn_delay');
        setTurnTimer(2500); // Wait for black screen to open (1.3s) + brief pause (1.2s)
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [battlePhase, showTutorial]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // MAIN GAME LOOP (Turn-Based)
  // ═══════════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (battlePhase !== 'fighting') return;

    const tick = (timestamp) => {
      if (!lastTickRef.current) lastTickRef.current = timestamp;
      const rawDt = timestamp - lastTickRef.current;
      lastTickRef.current = timestamp;

      if (rawDt > 200) { gameLoopRef.current = requestAnimationFrame(tick); return; }

      let dt = rawDt;
      if (isPausedRef.current) {
        dt = 0;
      } else if (hitStopRef.current > 0) {
        hitStopRef.current -= rawDt;
        if (hitStopRef.current > 0) {
          dt = 0;
        } else {
          dt = -hitStopRef.current;
          hitStopRef.current = 0;
        }
      }

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
              setTurnPhase('ally_windup');
              stateRef.current.turnPhase = 'ally_windup';
              setTurnTimer(800); // UI animation gives 800ms to hit (down from 1500ms since the bar is fast)
              setAllyQTEState('waiting');
              setHitPosition(null);
              qteStartTimeRef.current = Date.now();
              qteSuccessRef.current = false;
              qteResultRef.current = 'miss';
            } else {
              // Check if enemy is stunned (from parry)
              const enemy = allEnemies.find(e => e.id === turnId);
              if (enemy && enemy.isStunned) {
                // Skip turn and clear stun
                addLog(`💫 ${enemy.name} はスタンしているため行動不能！`);
                setEnemies(prev => prev.map(e => e.id === turnId ? { ...e, isStunned: false } : e));
                setCurrentTurnIndex(p => p + 1);
                setTurnTimer(100);
                return 100;
              }
              setTurnPhase('enemy_windup');
            }
            return 0;
          }
          return next;
        });
      }

      // ── ALLY WINDUP (QTE Window) ──
      if (phase === 'ally_windup') {
        setTurnTimer(prev => {
          const next = prev - dt;
          if (next <= 0) {
            setAllyQTEState('none');
            executeAllyAttack(qteResultRef.current);
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
      if (phase === 'enemy_windup' && stateRef.current.activeAttacks.length === 0) {
        const turnId = TURN_ORDER[stateRef.current.currentTurnIndex % TURN_ORDER.length];
        const allAllies = stateRef.current.allies;
        const aliveAllies = allAllies.filter(a => !a.isDead);

        if (aliveAllies.length > 0) {
          const target = aliveAllies[Math.floor(Math.random() * aliveAllies.length)];
          const enemy = stateRef.current.enemies.find(e => e.id === turnId);

          const pattern = ATTACK_PATTERNS[Math.floor(Math.random() * ATTACK_PATTERNS.length)];

          const attacks = [];
          let totalHits = pattern.sequence.reduce((sum, seq) => sum + seq.hits, 0);
          let hitCount = 0;

          pattern.sequence.forEach((seq) => {
            for (let i = 0; i < seq.hits; i++) {
              hitCount++;
              attacks.push({
                id: Date.now() + Math.random() + hitCount,
                enemyId: turnId,
                targetId: target.id,
                startTime: now,
                delay: seq.delayStart + (i * seq.interval),
                duration: seq.duration,
                glintFired: false,
                resolved: false,
                isLast: hitCount === totalHits
              });
            }
          });
          setActiveAttacks(attacks);
          if (enemy) addLog(`⚠ ${enemy.name} が ${target.name} を狙っている！ [${pattern.label}]`);
        } else {
          // No alive allies, skip
          setCurrentTurnIndex(p => p + 1);
          setTurnPhase('turn_delay');
          setTurnTimer(TURN_DELAY);
        }
      }

      // ── PROCESS ENEMY ATTACK ──
      if (phase === 'enemy_windup' && stateRef.current.activeAttacks.length > 0) {
        let allResolved = true;
        let modified = false;
        const nextAttacks = [...stateRef.current.activeAttacks];

        for (let i = 0; i < nextAttacks.length; i++) {
          const attack = nextAttacks[i];
          if (attack.resolved) continue;
          allResolved = false;

          const elapsed = now - attack.startTime;

          // Trigger Glint (Converging UI marker)
          if (elapsed >= Math.max(0, attack.delay + attack.duration - 600) && !attack.glintFired) {
            attack.glintFired = true;
            modified = true;
            spawnGlint(attack.enemyId, attack.targetId);
          }

          // Attack resolves
          if (elapsed >= attack.delay + attack.duration) {
            attack.resolved = true;
            modified = true;

            const allAllies = stateRef.current.allies;
            const targetIdx = allAllies.findIndex(a => a.id === attack.targetId && !a.isDead);
            const enemy = stateRef.current.enemies.find(e => e.id === attack.enemyId);

            if (targetIdx !== -1 && enemy) {
              const hasBuff = stateRef.current.buffTurnsLeft > 0;
              const isGuarding = currentGuards.has(attack.targetId);
              const defMult = stateRef.current.activeFragments.some(f => f.id === 'DEF_UP') ? 0.5 : 1.0;
              let dmg = ENEMY_BASE_DAMAGE + Math.floor(Math.random() * 10);

              if (hasBuff) {
                dmg = Math.floor(dmg * 0.8);
              }

              dmg = Math.floor(dmg * defMult);

              if (isGuarding) {
                dmg = Math.floor(dmg * GUARD_REDUCTION);
                addLog(`🛡️ ${allAllies[targetIdx].name} がガード！ 被害軽減`);
              } else {
                addLog(`💥 ${enemy.name} の攻撃が ${allAllies[targetIdx].name} に直撃！`);
              }

              setAllies(prev => prev.map((a, idx) => {
                if (a.id === attack.targetId) {
                  const newHp = Math.max(0, a.hp - dmg);
                  return { ...a, hp: newHp, flashTimer: 400, isDead: newHp <= 0 };
                }
                return a;
              }));
              spawnDamageNumber(attack.targetId, dmg, isGuarding ? 'damage' : 'critical');
            }
          }
        }

        if (modified) {
          setActiveAttacks(nextAttacks);
          stateRef.current.activeAttacks = nextAttacks; // Sync for tick
        }

        if (allResolved) {
          setActiveAttacks([]);
          stateRef.current.activeAttacks = [];
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
          if (playSE) playSE('/assets/audio/bgm/+game_counter.mp3');
          setShakeActive(true);
          hitStopRef.current = 700; // Perfect impact weight

          setCounterAnim({ id: Date.now(), allyId, enemyId });
          setTimeout(() => setCounterAnim(null), 700);

          const dmg = COUNTER_DAMAGE * 2 + Math.floor(Math.random() * 20);
          setEnemies(prev => prev.map(e => {
            if (e.id === enemyId) {
              const newHp = Math.max(0, e.hp - dmg);
              return { ...e, hp: newHp, flashTimer: 700, isDead: newHp <= 0 };
            }
            return e;
          }));
          spawnDamageNumber(enemyId, dmg, 'ultimate');
          addLog(`⚡⚡ パーフェクト・パリィ！ ${ally.name} が踏み込み一閃！ ⚡⚡`);

          setTimeout(() => setShakeActive(false), 700);
        }

        setCounterAttack(null);
        stateRef.current.counterAttack = null;
        // Advance turn
        setCurrentTurnIndex(p => p + 1);
        setTurnPhase('turn_delay');
        setTurnTimer(800);
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
    const nowTime = Date.now();
    if (nowTime - guardCooldownsRef.current[allyId] < 800) {
      return;
    }

    let parrySuccess = false;

    if (stateRef.current.turnPhase === 'enemy_windup' && stateRef.current.activeAttacks.length > 0) {
      const activeAttacks = stateRef.current.activeAttacks;

      const parryableIndex = activeAttacks.findIndex(attack => {
        if (attack.targetId !== allyId || attack.resolved) return false;
        const elapsed = Date.now() - attack.startTime;
        const parryStart = attack.delay + attack.duration - 300;
        const parryEnd = attack.delay + attack.duration + 100;
        return elapsed >= parryStart && elapsed <= parryEnd;
      });

      if (parryableIndex !== -1) {
        parrySuccess = true;
        hitStopRef.current = 150;
        if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
        setParryFlash(true);
        setTimeout(() => setParryFlash(false), 500);
        triggerSakuraNote();

        // パリィ成功時に暴走ゲージを軽減
        setCorruption(prev => Math.max(0, prev - 20));

        const syncMult = stateRef.current.activeFragments.some(f => f.id === 'SYNC_BOOST') ? 2.0 : 1.0;
        const hasBuff = stateRef.current.buffTurnsLeft > 0;
        addSync((hasBuff ? SYNC_PER_PARRY * 2 : SYNC_PER_PARRY) * syncMult);

        const attack = activeAttacks[parryableIndex];

        const nextAttacks = [...activeAttacks];
        nextAttacks.splice(parryableIndex, 1);

        setActiveAttacks(nextAttacks);
        stateRef.current.activeAttacks = nextAttacks;

        const ally = stateRef.current.allies.find(a => a.id === allyId);

        if (!attack.isLast) {
          addLog(`✨ ${ally?.name} が弾いた！ さらに追撃が来る！`);
        } else {
          addLog(`✨ パリィ成功！ ${ally?.name} が敵の攻撃を弾き返した！`);

          setEnemies(prev => prev.map(e => e.id === attack.enemyId ? { ...e, isStunned: true } : e));
          setCounterAttack({ allyId, enemyId: attack.enemyId });
          stateRef.current.counterAttack = { allyId, enemyId: attack.enemyId };
          setTurnPhase('counter_attack');
          stateRef.current.turnPhase = 'counter_attack';

          setActiveAttacks([]);
          stateRef.current.activeAttacks = [];
        }
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
      if (next.has(allyId)) {
        next.delete(allyId);
        guardCooldownsRef.current[allyId] = Date.now();
        setGuardCooldownTrigger(prev => ({ ...prev, [allyId]: Date.now() }));
      }
      return next;
    });
  }, []);

  // ─── Keyboard Controls (Enter to Guard/Parry) ───
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
        e.preventDefault();

        if (stateRef.current.turnPhase === 'ally_windup') {
          handleAllyAttack();
          return;
        }

        const attacks = stateRef.current.activeAttacks || [];
        const attack = attacks[0];
        const targetId = (attack && stateRef.current.turnPhase === 'enemy_windup')
          ? attack.targetId
          : stateRef.current.allies[0]?.id;

        if (targetId) handlePointerDown(targetId);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const attacks = stateRef.current.activeAttacks || [];
        const attack = attacks[0];
        const targetId = (attack && stateRef.current.turnPhase === 'enemy_windup')
          ? attack.targetId
          : stateRef.current.allies[0]?.id;

        if (targetId) handlePointerUp(targetId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handlePointerDown, handlePointerUp]);

  // ─── UI Button Controls (Defend) ───
  const handleDefendButtonDown = useCallback(() => {
    const attacks = stateRef.current.activeAttacks || [];
    const attack = attacks[0];
    const targetId = (attack && stateRef.current.turnPhase === 'enemy_windup')
      ? attack.targetId
      : stateRef.current.allies[0]?.id;

    if (targetId) handlePointerDown(targetId);
  }, [handlePointerDown]);

  const handleDefendButtonUp = useCallback(() => {
    const attacks = stateRef.current.activeAttacks || [];
    const attack = attacks[0];
    const targetId = (attack && stateRef.current.turnPhase === 'enemy_windup')
      ? attack.targetId
      : stateRef.current.allies[0]?.id;

    if (targetId) handlePointerUp(targetId);
  }, [handlePointerUp]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // ABILITIES
  // ═══════════════════════════════════════════════════════════════════════════════

  const handleAllyAttack = useCallback((e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (stateRef.current.turnPhase !== 'ally_windup') return;
    if (qteSuccessRef.current) return;

    const elapsed = Date.now() - qteStartTimeRef.current;

    // The bar duration is 800ms. The center is hit at 400ms.
    // perfect: 320ms - 480ms
    // good: 200ms - 600ms
    let result = 'miss';
    if (elapsed >= 320 && elapsed <= 480) {
      result = 'perfect';
    } else if (elapsed >= 200 && elapsed <= 600) {
      result = 'good';
    }

    setHitPosition(Math.min((elapsed / 800) * 100, 100));

    qteResultRef.current = result;
    qteSuccessRef.current = true;

    if (result === 'perfect' || result === 'good') {
      setAllyQTEState(result);
      if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
      triggerSakuraNote('attack');
    } else {
      setAllyQTEState('fail');
      if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
      triggerSakuraNote('attack');
    }
  }, [playSE, triggerSakuraNote]);


  const handleHeal = useCallback(() => {
    if (healCooldown > 0 || stateRef.current.battlePhase !== 'fighting') return;

    setHealCooldown(HEAL_COOLDOWN);
    setHealFlash(true);
    setTimeout(() => setHealFlash(false), 500);
    triggerSakuraNote('heal');

    const healMult = stateRef.current.activeFragments.some(f => f.id === 'HEAL_BOOST') ? 2.0 : 1.0;
    const amount = Math.floor(HEAL_AMOUNT * healMult);

    setAllies(prev => prev.map(a => {
      if (a.isDead) return a;
      spawnDamageNumber(a.id, amount, 'heal');
      return { ...a, hp: Math.min(a.maxHp, a.hp + amount), flashTimer: 0 };
    }));
    addLog(`💖 朔良の歌でパーティ全体が回復！`);
  }, [healCooldown, addLog, triggerSakuraNote, spawnDamageNumber]);

  const handleBuff = useCallback(() => {
    if (syncRate < SYNC_COST_BUFF || stateRef.current.battlePhase !== 'fighting') return;

    setSyncRate(prev => Math.max(0, prev - SYNC_COST_BUFF));
    setBuffTurnsLeft(2); // 2 turns
    setHealFlash(true);
    setTimeout(() => setHealFlash(false), 300);
    triggerSakuraNote();

    addLog(`🎵 朔良が強化の歌を歌った！ 味方の攻防力UP (2ターン)`);
  }, [syncRate, addLog, triggerSakuraNote]);

  const handleMutsunoriUltimate = useCallback(() => {
    if (syncRate < SYNC_COST_ULTIMATE || stateRef.current.battlePhase !== 'fighting') return;

    const mutsunori = allies.find(a => a.id === 'mutsunori');
    if (!mutsunori || mutsunori.isDead) return;

    setSyncRate(0);
    setDuetCutin({ allyId: mutsunori.id, name: mutsunori.name, image: mutsunori.cutinImage });

    setUltimateFlash(true);
    triggerSakuraNote();

    // 必殺技中は戦闘時間を2.5秒間完全に停止させる
    hitStopRef.current = 2500;

    setTimeout(() => {
      setShakeActive(true);
      setEnemies(prev => {
        const aliveEnemies = prev.filter(e => !e.isDead);
        if (aliveEnemies.length === 0) return prev;

        const target = aliveEnemies.reduce((min, e) => e.hp < min.hp ? e : min, aliveEnemies[0]);
        const ultMult = stateRef.current.activeFragments.some(f => f.id === 'ULT_BOOST') ? 2.5 : 1.0;
        const dmg = Math.floor((250 + Math.floor(Math.random() * 20)) * ultMult);

        spawnDamageNumber(target.id, dmg, 'ultimate');

        return prev.map(e => {
          if (e.id === target.id) {
            return { ...e, hp: Math.max(0, e.hp - dmg), flashTimer: 800, isDead: e.hp - dmg <= 0 };
          }
          return e;
        });
      });
      setActiveAttacks([]);
      addLog(`★★ 睦典の必殺技！ 渾身の一撃が炸裂！ ★★`);
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
    activeAttacks.forEach(a => set.add(a.targetId));
    return set;
  }, [activeAttacks]);

  const activeAttacksCompat = activeAttacks;

  const svgRef = useRef(null);
  const [lineCoords, setLineCoords] = useState(null);

  useEffect(() => {
    if (activeAttacksCompat.length === 0) {
      setLineCoords(null);
      return;
    }

    const updateCoords = () => {
      const attack = activeAttacksCompat[0];
      const enemyEl = document.getElementById(`char-${attack.enemyId}`);
      const allyEl = document.getElementById(`char-${attack.targetId}`);
      const svgEl = svgRef.current;

      if (enemyEl && allyEl && svgEl) {
        const eRect = enemyEl.getBoundingClientRect();
        const aRect = allyEl.getBoundingClientRect();
        const sRect = svgEl.getBoundingClientRect();

        setLineCoords({
          x1: eRect.left + eRect.width / 2 - sRect.left,
          y1: eRect.top + eRect.height / 2 - sRect.top,
          x2: aRect.left + aRect.width / 2 - sRect.left,
          y2: aRect.top + aRect.height / 2 - sRect.top,
          enemyId: attack.enemyId,
          targetId: attack.targetId
        });
      }
    };

    const raf = requestAnimationFrame(updateCoords);
    window.addEventListener('resize', updateCoords);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateCoords);
    };
  }, [activeAttacksCompat]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className={`absolute inset-0 w-full h-full bg-[#090e17] overflow-hidden select-none z-50 flex flex-col font-orbitron ${shakeActive ? 'animate-battle-shake' : ''}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Full color bright image */}
        <img src="/battle/shopping.png" alt="Background" className="absolute inset-0 w-full h-full object-cover scale-[1.02] lg:scale-[1.15] -translate-y-0 lg:-translate-y-[5%]" />

        {/* Very subtle cyber tech overlays so UI is still readable */}
        <div className="absolute inset-0 bg-[#090e17]/20" />
        <div className="absolute inset-0 fui-grid-bg opacity-[0.2] mix-blend-overlay" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80vh] h-[80vh] rounded-full border border-emerald-500/10 shadow-[0_0_150px_rgba(16,185,129,0.05)] pointer-events-none" />
      </div>

      {/* ── CINEMATIC LETTERBOXING ── */}
      <motion.div className="absolute top-0 inset-x-0 bg-black z-10 pointer-events-none" initial={{ height: '15vh' }} animate={{ height: battlePhase === 'intro' ? '50vh' : '0vh' }} transition={{ duration: 0.8, ease: 'easeInOut', delay: battlePhase === 'intro' ? 0 : 0.5 }} />
      <motion.div className="absolute bottom-0 inset-x-0 bg-black z-10 pointer-events-none" initial={{ height: '15vh' }} animate={{ height: battlePhase === 'intro' ? '50vh' : '0vh' }} transition={{ duration: 0.8, ease: 'easeInOut', delay: battlePhase === 'intro' ? 0 : 0.5 }} />

      {/* ── INTRO ── */}
      <AnimatePresence>
        {battlePhase === 'intro' && (
          <motion.div className="absolute inset-0 z-[60] flex items-center justify-center pointer-events-none" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(8,145,178,0.15)_0%,_transparent_60%)] mix-blend-screen" />
            <motion.div className="text-center relative" initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
              <h2 className="font-noto text-4xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] py-2">
                戦闘開始
              </h2>
              <motion.div className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: 'easeInOut' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── TUTORIAL MODAL ── */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 lg:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-[#0f172a] border border-cyan-500/50 rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.2)] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-10 relative">
              <h2 className="text-2xl lg:text-3xl font-black text-cyan-300 mb-6 border-b border-cyan-500/30 pb-4 text-center tracking-widest">
                戦闘マニュアル
              </h2>

              <div className="space-y-6 text-sm lg:text-base text-slate-300 leading-relaxed text-left">
                {/* 1. 防御 */}
                <section>
                  <h3 className="text-lg font-bold text-cyan-200 mb-2 flex items-center gap-2">
                    <span className="bg-cyan-900/50 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/30 text-sm">1</span>
                    防御（ガード＆パリィ）
                  </h3>
                  <p>
                    敵の攻撃に合わせて<strong>「スペースキー」</strong>、<strong>「エンターキー」</strong>、または<strong>「味方の立ち絵をクリック（長押し）」</strong>すると防御ができます。<br />
                    敵の攻撃が当たる直前に合わせると<strong>パーフェクト・パリィ</strong>となり、ダメージを無効化しつつ敵に反撃ダメージを与えます。
                  </p>
                </section>

                {/* 2. 攻撃タイミング */}
                <section>
                  <h3 className="text-lg font-bold text-emerald-200 mb-2 flex items-center gap-2">
                    <span className="bg-emerald-900/50 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/30 text-sm">2</span>
                    ジャスト攻撃
                  </h3>
                  <p>
                    味方の攻撃時、画面に表示される丸いタイミングマーカーに合わせて攻撃ボタン（またはキー）を押してください。<br />
                    タイミングが完璧（ジャスト）だと、<strong>与えるダメージが1.5倍</strong>に増加します。
                  </p>
                </section>

                {/* 3. シンクロ率と吸収・回復 */}
                <section>
                  <h3 className="text-lg font-bold text-amber-200 mb-2 flex items-center gap-2">
                    <span className="bg-amber-900/50 px-2 py-0.5 rounded text-amber-300 border border-amber-500/30 text-sm">3</span>
                    シンクロ率ゲージと特殊アクション
                  </h3>
                  <p>
                    攻撃を当てたりパリィを成功させると右下の<strong>シンクロ率</strong>が溜まります。このゲージを消費して必殺技や強化などの強力なアクションが可能です。<br />
                    また、ターンとターンの間の猶予時間（1.5秒）を活用して、<strong>「吸収」</strong>ボタンなどを押すことで戦況を有利に進められます。
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

      {/* ── VISUAL FLASHES ── */}
      <AnimatePresence>
        {parryFlash && (
          <motion.div className="absolute inset-0 z-[65] pointer-events-none flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="absolute inset-0 bg-cyan-100/25" />
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} transition={{ duration: 0.4 }} className="font-noto text-5xl lg:text-7xl font-black text-cyan-100 drop-shadow-[0_0_30px_rgba(255,255,255,1)] z-10 italic tracking-wider">
              JUST PARRY!!
            </motion.div>
          </motion.div>
        )}
        {healFlash && (
          <motion.div className="absolute inset-0 z-[54] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 0.5 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-200/30 to-transparent" />
          </motion.div>
        )}
        {ultimateFlash && (
          <motion.div className="absolute inset-0 z-[55] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.7, 0.3, 0.6, 0] }} transition={{ duration: 2 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-200/50 via-cyan-100/30 to-violet-200/50" />
          </motion.div>
        )}
        {counterAnim && (
          <motion.div key={counterAnim.id} className="absolute inset-0 z-[70] pointer-events-none flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            <motion.div
              className="absolute w-[150%] h-1 bg-cyan-50 shadow-[0_0_40px_20px_rgba(165,243,252,0.8)]"
              style={{ rotate: -15 }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 0.4, ease: "easeOut", times: [0, 0.2, 1] }}
            />
            <motion.div
              className="absolute w-[150%] h-[1px] bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.9)]"
              style={{ rotate: -15 }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
              transition={{ duration: 0.4, ease: "easeOut", times: [0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DUET CUTIN ── */}
      <AnimatePresence>
        {duetCutin && (
          <motion.div className="absolute inset-0 z-[58] pointer-events-none flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <motion.img src={duetCutin.image} alt={duetCutin.name} className="absolute h-[80%] object-contain z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]" initial={{ x: '-100%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
            <motion.div className="absolute bottom-[15%] z-20 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="font-noto text-xs tracking-[0.5em] text-cyan-100/80 mb-2">ULTIMATE ART</div>
              <div className="font-noto text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-violet-100 to-cyan-100 tracking-wider">必殺技</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
           BATTLE FIELD
         ═══════════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex items-stretch px-4 lg:px-12 pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">

        {/* ── Allies (Left Column) ── */}
        <div className="w-1/2 flex flex-col justify-around items-center pr-4 translate-x-4 lg:translate-x-8">
          {allies.map(ally => {
            const isTargeted = targetedAllies.has(ally.id);
            const attackInfo = activeAttacksCompat.find(a => a.targetId === ally.id);
            const isGuarding = guardingAllies.has(ally.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === ally.id && turnPhase === 'ally_attack';
            const isCounterDashing = counterAnim && counterAnim.allyId === ally.id;

            return (
              <div key={ally.id} className="relative flex flex-col items-center w-full">

                {/* ── Ally HP Bar (Chimera-A style) ── */}
                <div className="w-20 lg:w-36 mb-1 lg:mb-2 z-20 relative">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-between w-full mb-0.5 px-1">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1 h-1 rotate-45 ${ally.id === 'nagisa' ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : ally.id === 'mika' ? 'bg-pink-400 shadow-[0_0_8px_#f472b6]' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'}`} />
                        <span className={`font-orbitron font-bold text-[8px] lg:text-[12px] tracking-[0.2em] ${ally.id === 'nagisa' ? 'text-blue-300 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]' : ally.id === 'mika' ? 'text-pink-300 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]' : 'text-emerald-300 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]'}`}>
                          {ally.name.toUpperCase()}
                        </span>
                      </div>
                      <span className={`font-orbitron font-bold text-[8px] lg:text-[10px] tabular-nums ${ally.id === 'nagisa' ? 'text-blue-100/90' : ally.id === 'mika' ? 'text-pink-100/90' : 'text-emerald-100/90'}`}>
                        {Math.ceil((ally.hp / ally.maxHp) * 100)}%
                      </span>
                    </div>
                    <div className="w-full mt-0.5 border border-white/80 bg-slate-900/80 p-[1.5px] shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                      <div className="h-1 lg:h-1.5 w-full bg-transparent">
                        <motion.div
                          className="h-full hp-bar-fill-ally"
                          animate={{ width: `${(ally.hp / ally.maxHp) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`relative flex items-center justify-center ${ally.id === 'nagisa' ? '' : 'top-2 left-2 lg:top-0 lg:left-0'}`}>
                  {!ally.isDead && activeFragments.length > 0 && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[45] -top-8 lg:-top-0 pb-0 lg:pb-10 opacity-80 mix-blend-screen"
                      animate={{ x: isCounterDashing ? 150 : (isCurrentTurn ? 30 : 0) }}
                      transition={{ duration: isCounterDashing ? 0.05 : 0.1, ease: 'easeOut' }}
                    >
                      <div className="scale-[0.8] lg:scale-100 flex items-center justify-center w-full h-full">
                        <SpriteAnimator
                          src="/battle/戦闘エフェクトアニメ８/320×240/pipo-btleffect071.png"
                          frameWidth={120}
                          frameHeight={120}
                          columns={10}
                          totalFrames={10}
                          fps={15}
                          loop={true}
                          scale={1.8}
                          blendMode="normal"
                        />
                      </div>
                    </motion.div>
                  )}

                  {ally.id === 'mutsunori' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <div className="relative w-[125px] h-[187px] lg:w-48 lg:h-64 lg:-translate-y-3.5 -translate-x-24 lg:-translate-x-40">
                        <img
                          src="/battle/sakura.png"
                          alt="sakura"
                          className="w-full h-full object-contain drop-shadow-lg opacity-90"
                        />
                        <AnimatePresence>
                          {sakuraNotes.map(note => (
                            <motion.div
                              key={note.id}
                              className={`absolute top-1/2 left-1/2 text-xl lg:text-3xl font-black ${note.color} drop-shadow-[0_0_8px_currentColor] z-50`}
                              initial={{ opacity: 0, x: `calc(-50% + ${note.startX || 0}px)`, y: `calc(-50% + ${note.startY || 0}px)`, scale: 0.5 }}
                              animate={{ opacity: [0, 1, 0], x: `calc(-50% + ${note.endX || note.x}px)`, y: `calc(-50% + ${note.endY || note.y}px)`, scale: note.scale, rotate: ((note.endX || note.x) % 30) }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: note.duration || 1.5, ease: "easeOut" }}
                            >
                              {note.symbol}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  <motion.div
                    id={`char-${ally.id}`}
                    className={`relative cursor-pointer touch-none flex items-center justify-center
                    ${ally.id === 'nagisa' ? 'w-[90px] h-[120px] lg:w-[180px] lg:h-[230px]' : 'w-[125px] h-[187px] lg:w-48 lg:h-64'}
                    ${ally.isDead ? 'opacity-40 grayscale' : ''}
                  `}
                    animate={{ x: isCounterDashing ? 150 : (isCurrentTurn ? 30 : 0) }}
                    transition={{ duration: isCounterDashing ? 0.05 : 0.1, ease: 'easeOut' }}
                    style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
                    onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); handlePointerDown(ally.id); }}
                    onPointerUp={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); handlePointerUp(ally.id); }}
                    onPointerCancel={(e) => { e.currentTarget.releasePointerCapture(e.pointerId); handlePointerUp(ally.id); }}
                    onPointerLeave={() => handlePointerUp(ally.id)}
                    onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
                  >

                    {isTargeted && !ally.isDead && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
                        <motion.div
                          className="absolute w-[80px] h-[80px] lg:w-[150px] lg:h-[150px] border-[2px] border-amber-500/80 rotate-45 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] border border-amber-400/30 rotate-45" />

                        {/* Target Crosshairs */}
                        <div className="absolute w-[120px] lg:w-[200px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                        <div className="absolute h-[120px] lg:h-[200px] w-[1px] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />

                        <div className="absolute -bottom-8 lg:-bottom-12 bg-amber-950/80 border border-amber-500 px-2 py-0.5 lg:px-3 lg:py-1 shadow-[0_0_10px_rgba(245,158,11,0.5)] backdrop-blur-sm skew-x-[-15deg]">
                          <span className="block font-orbitron text-[8px] lg:text-[10px] font-bold text-amber-400 tracking-widest animate-pulse skew-x-[15deg]">TARGET LOCK</span>
                        </div>
                      </div>
                    )}

                    {turnPhase === 'ally_windup' && TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === ally.id && !ally.isDead && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-auto cursor-pointer"
                        onPointerDown={handleAllyAttack}
                      >
                        <div className="absolute inset-[-50px] bg-cyan-900/10 rounded-full blur-xl mix-blend-screen" />

                        {/* Simple Timing Bar */}
                        <div className="relative w-[100%] max-w-[150px] lg:max-w-[200px] h-3 lg:h-4 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full overflow-hidden shadow-lg">
                          {/* Success Zone */}
                          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[20%] bg-cyan-400/50" />

                          {/* Moving Indicator */}
                          {allyQTEState === 'waiting' ? (
                            <motion.div
                              className="absolute top-0 bottom-0 w-[3px] bg-white z-20"
                              initial={{ left: '0%' }}
                              animate={{ left: '100%' }}
                              transition={{ duration: 0.8, ease: "linear" }}
                            />
                          ) : (
                            <div
                              className="absolute top-0 bottom-0 w-[3px] bg-white z-20"
                              style={{ left: `${hitPosition}%` }}
                            />
                          )}
                        </div>

                        <div className="mt-2 text-center">
                          <span className="block font-orbitron font-bold text-[10px] lg:text-xs text-white/80 tracking-[0.2em] animate-pulse">TAP!</span>
                        </div>

                        <AnimatePresence>
                          {(allyQTEState === 'perfect' || allyQTEState === 'good') && (
                            <motion.div
                              initial={{ scale: 0.5, opacity: 0, y: 0 }}
                              animate={{ scale: 1.5, opacity: 1, y: -40 }}
                              exit={{ opacity: 0, scale: 2 }}
                              className={`absolute font-orbitron font-black text-[16px] lg:text-[28px] tracking-[0.2em] z-50 italic ${allyQTEState === 'perfect' ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,1)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-500 drop-shadow-[0_0_15px_rgba(34,211,238,1)]'}`}
                            >
                              {allyQTEState === 'perfect' ? 'EXCELLENT' : 'GOOD'}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {isGuarding && !ally.isDead && (
                      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-50 ${ally.id === 'nagisa' ? '-translate-y-4' : ''}`}>
                        <SpriteAnimator
                          src="/battle/pipo-btleffect111f.png"
                          frameWidth={192}
                          frameHeight={192}
                          columns={5}
                          totalFrames={10}
                          fps={15}
                          loop={false}
                          holdOnFrame={4}
                          pulsateOnHold={true}
                          scale={1.2}
                        />
                      </div>
                    )}

                    {buffTurnsLeft > 0 && !ally.isDead && (
                      <motion.div
                        className="absolute inset-[-10px] rounded-2xl border border-pink-300/40 pointer-events-none z-10"
                        animate={{ opacity: [0.3, 0.7, 0.3], boxShadow: ['0 0 8px rgba(244,114,182,0.15)', '0 0 20px rgba(244,114,182,0.4)', '0 0 8px rgba(244,114,182,0.15)'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}

                    <AnimatePresence>
                      {guardCooldownTrigger[ally.id] && !ally.isDead && (
                        <motion.div
                          key={`cd-${guardCooldownTrigger[ally.id]}`}
                          className="absolute inset-0 bg-slate-900/50 rounded-2xl z-30 pointer-events-none"
                          initial={{ height: '100%' }}
                          animate={{ height: 0 }}
                          transition={{ duration: 0.8, ease: 'linear' }}
                        />
                      )}
                    </AnimatePresence>

                    {ally.image ? (
                      <img src={ally.image} alt={ally.name} className={`w-full h-full object-contain relative z-10 lg:-translate-y-6 ${ally.flashTimer > 0 ? 'animate-battle-hit-flash drop-shadow-[0_0_20px_rgba(248,113,113,0.8)]' : 'drop-shadow-lg'}`} />
                    ) : (
                      <div className="w-full h-full bg-slate-800/80 border border-slate-600 rounded-2xl flex items-center justify-center">
                        <span className="font-noto font-bold text-slate-300">{ally.name}</span>
                      </div>
                    )}

                    {ally.isDead && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl z-20">
                        <span className="font-noto text-[10px] text-red-400/80 font-bold tracking-[0.2em] uppercase">戦闘不能</span>
                      </div>
                    )}

                    <AnimatePresence>
                      {glintEffects.filter(g => g.targetId === ally.id).map(g => (
                        <motion.div
                          key={g.id}
                          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
                        >
                          <motion.div
                            className="absolute w-20 h-20 lg:w-40 lg:h-40 rounded-full border-[3px] border-amber-400 border-dashed shadow-[0_0_15px_rgba(251,191,36,0.7)]"
                            initial={{ scale: 2.5, opacity: 0, rotate: 0 }}
                            animate={{ scale: 0.15, opacity: [0, 1, 1, 0], rotate: 180 }}
                            transition={{ duration: 0.6, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute w-16 h-16 lg:w-36 lg:h-36 rounded-full border-2 border-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.5)]"
                            initial={{ scale: 3, opacity: 0 }}
                            animate={{ scale: 0.15, opacity: [0, 0.8, 0.8, 0] }}
                            transition={{ duration: 0.6, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-sm shadow-[0_0_30px_#fff]"
                            initial={{ opacity: 0, scale: 0, rotate: 45 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 2.5, 0], rotate: 90 }}
                            transition={{ duration: 0.3, delay: 0.6, ease: "easeOut" }}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {showDamageNumbers.filter(d => d.targetId === ally.id).map(d => (
                    <motion.div key={d.id} className={`absolute top-0 z-30 font-noto font-black text-lg lg:text-3xl italic ${d.type === 'heal' ? 'text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`} initial={{ opacity: 1, y: 0, scale: 0.8 }} animate={{ opacity: 0, y: -40, scale: 1.2 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                      {d.type === 'heal' ? `+${d.amount}` : `-${d.amount}`}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Enemies (Right Column) ── */}
        <div className="w-1/2 flex flex-col justify-around items-center pl-4 -translate-x-4 lg:-translate-x-8">
          {enemies.map(enemy => {
            const isAttacking = activeAttacksCompat.some(a => a.enemyId === enemy.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === enemy.id && turnPhase !== 'turn_delay';
            const hpRatio = enemy.hp / enemy.maxHp;

            return (
              <div key={enemy.id} className="relative flex flex-col items-center w-full">
                <div className="w-20 lg:w-36 z-20 relative -translate-x-6 lg:translate-x-0 translate-y-8 lg:translate-y-16">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-between w-full mb-0.5 px-1 lg:mb-1 lg:px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-400 shadow-[0_0_8px_#f87171] rotate-45" />
                        <span className="font-orbitron font-bold text-[8px] lg:text-[12px] text-red-400 tracking-[0.2em] drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">
                          {enemy.name.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-orbitron font-bold text-[8px] lg:text-[10px] text-red-100/90 tabular-nums">
                        {Math.ceil(hpRatio * 100)}%
                      </span>
                    </div>

                    <div className="w-full mt-0.5 border border-white/80 bg-slate-900/80 p-[1.5px] shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                      <div className="h-1 lg:h-1.5 w-full bg-transparent">
                        <motion.div
                          className="h-full hp-bar-fill-enemy float-right"
                          style={{ transformOrigin: "right" }}
                          animate={{ width: `${hpRatio * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-center -top-2 -left-8 lg:top-5 lg:left-0">




                  <motion.div
                    id={`char-${enemy.id}`}
                    className={`relative w-[230px] h-[307px] lg:w-80 lg:h-96 flex items-center justify-center z-40 ${enemy.isDead ? 'opacity-30 grayscale'
                      : enemy.flashTimer > 0 ? 'animate-battle-hit-flash'
                        : ''
                      }`}
                    animate={{
                      x: isAttacking ? -30 : (isCurrentTurn && turnPhase === 'enemy_resolve' ? -30 : 0),
                      scale: isAttacking ? 1.05 : 1
                    }}
                    transition={{
                      duration: isAttacking ? 0.3 : 0.2,
                      ease: isAttacking ? 'easeOut' : 'easeInOut'
                    }}
                  >
                    <img src={enemy.image} alt={enemy.name} className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all duration-150 ${enemy.isStunned ? 'opacity-70 grayscale-[50%]' : ''}`} />
                    <AnimatePresence>
                      {enemy.flashTimer > 0 && (
                        <motion.div
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 0.8 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0 bg-red-600 mix-blend-color z-10 pointer-events-none"
                          style={{
                            WebkitMaskImage: `url(${enemy.image})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskPosition: 'center',
                            WebkitMaskRepeat: 'no-repeat'
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {enemy.isStunned && !enemy.isDead && (
                      <motion.div className="absolute -top-2 lg:-top-3 font-noto text-[7px] lg:text-[10px] text-amber-200/90 font-bold bg-amber-950/70 backdrop-blur-sm px-1.5 py-0.5 lg:px-3 rounded border border-amber-500/30" animate={{ y: [0, -2, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                        スタン
                      </motion.div>
                    )}
                  </motion.div>

                  <AnimatePresence>
                    {showDamageNumbers.filter(d => d.targetId === enemy.id && (d.type === 'damage' || d.type === 'critical')).map(d => (
                      <div key={`fx-wrap-${d.id}`} className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 -top-20 lg:top-0 mix-blend-screen scale-[0.8] lg:scale-100">
                        <SpriteAnimator
                          src="/battle/戦闘エフェクトアニメ12/320×240/pipo-btleffect084.png"
                          frameWidth={120}
                          frameHeight={120}
                          columns={10}
                          totalFrames={10}
                          fps={15}
                          loop={false}
                          scale={1.8}
                          blendMode="normal"
                        />
                      </div>
                    ))}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {showDamageNumbers.filter(d => d.targetId === enemy.id).map(d => (
                    <motion.div key={d.id} className={`absolute top-0 z-50 font-noto font-black text-xl lg:text-4xl italic ${d.type === 'ultimate' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-violet-300' : 'text-white'} drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]`} initial={{ opacity: 1, y: 0, scale: 1.5 }} animate={{ opacity: 0, y: -50, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                      {d.amount}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Top Right Controls */}
        <div className="absolute top-3 right-3 lg:top-5 lg:right-5 flex gap-2 z-50">
          <button onClick={() => setIsPaused(!isPaused)} className={`px-2 py-1 lg:px-3 lg:py-1.5 bg-[#0a1628]/60 backdrop-blur-sm border ${isPaused ? 'border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 'border-slate-600/30 text-slate-400'} font-noto text-[8px] lg:text-[10px] tracking-[0.2em] rounded hover:border-slate-400/50 hover:text-slate-200 transition-all`}>
            {isPaused ? '再開 (RESUME)' : '一時停止 (PAUSE)'}
          </button>
          <button onClick={handleResultClose} className="px-2 py-1 lg:px-3 lg:py-1.5 bg-[#0a1628]/60 backdrop-blur-sm border border-slate-600/30 text-slate-400 font-noto text-[8px] lg:text-[10px] tracking-[0.2em] rounded hover:border-slate-400/50 hover:text-slate-200 transition-all">
            EXIT
          </button>
        </div>
      </div>


      {/* ═══════════════════════════════════════════════════════════════
           BOTTOM HUD (Cyber Radar & Sync)
         ═══════════════════════════════════════════════════════════════ */}

      {/* Dark gradient film at the bottom to make the UI pop */}
      <div className="absolute bottom-0 inset-x-0 h-[40vh] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30" />

      <div className="absolute inset-0 z-40 pointer-events-none">




        {/* ── Action Buttons (Moved below allies) ── */}
        <div className="absolute bottom-4 left-0 lg:bottom-12 lg:left-8 w-1/2 pointer-events-auto flex items-end justify-center gap-2 lg:gap-8 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)] -translate-x-8 lg:-translate-x-20">

          {/* Left Button - ULTIMATE (Reactor Core) */}
          <motion.button
            onClick={handleMutsunoriUltimate}
            disabled={syncRate < SYNC_COST_ULTIMATE || battlePhase !== 'fighting'}
            className={`relative w-[108px] h-[108px] lg:w-32 lg:h-32 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:scale-105 active:scale-95 ${syncRate < SYNC_COST_ULTIMATE || battlePhase !== 'fighting'
              ? 'bg-[#0a0a0a]/90 border-amber-900/30 cursor-not-allowed grayscale'
              : 'bg-[#1a0a03]/80 border-amber-500 hover:bg-[#2a1005]/90 hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] cursor-pointer'
              }`}
          >
            {/* Sync Rate Glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl mix-blend-screen transition-opacity duration-300"
              style={{
                background: syncRate >= SYNC_COST_ULTIMATE ? 'radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)' : 'none',
                opacity: syncRate / 100
              }}
            />

            {/* Spinning Rings */}
            <div className={`absolute inset-0.5 lg:inset-2 rounded-full border-2 border-amber-500/20 ${syncRate >= SYNC_COST_ULTIMATE ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
            <div className={`absolute inset-1.5 lg:inset-4 rounded-full border border-amber-400/10 border-dashed ${syncRate >= SYNC_COST_ULTIMATE ? 'animate-[spin_4s_linear_infinite_reverse]' : ''}`} />

            <div className="relative z-10 flex flex-col items-center">
              <div className="font-rajdhani font-black text-sm lg:text-5xl text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,1)] leading-none mb-0 lg:mb-1">
                {Math.floor(syncRate)}<span className="text-[8px] lg:text-xl opacity-80">%</span>
              </div>
              <div className="font-noto font-black text-[10px] lg:text-xs text-amber-200 tracking-[0.15em] lg:tracking-[0.3em] drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]">
                必殺技
              </div>
            </div>

            {/* Cost Indicator removed per user request */}

            {/* Fill Level visualization */}
            {syncRate >= SYNC_COST_ULTIMATE && (
              <motion.div
                className="absolute inset-[-10px] rounded-full border border-amber-300/40 pointer-events-none"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </motion.button>

          {/* Right Button - HEAL */}
          <motion.button
            onClick={handleHeal}
            disabled={healCooldown > 0 || battlePhase !== 'fighting'}
            className={`w-20 h-20 lg:w-24 lg:h-24 mb-2 lg:mb-4 rounded-full flex flex-col items-center justify-center overflow-hidden group transition-all duration-300 relative border-2 backdrop-blur-md hover:scale-105 active:scale-95 ${healCooldown > 0 || battlePhase !== 'fighting'
              ? 'bg-[#090e17]/90 border-slate-700/50 cursor-not-allowed'
              : 'bg-emerald-950/60 border-emerald-500/80 hover:bg-emerald-900/80 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] cursor-pointer'
              }`}
          >
            {/* Tech grid bg */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wLDggTDgsMCBMMCwwIFoiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4yKSIvPjwvc3ZnPg==')] pointer-events-none mix-blend-overlay" />

            <div className="flex flex-col items-center gap-1 z-10">
              <span className={`font-noto font-black text-[12px] lg:text-base tracking-[0.1em] lg:tracking-[0.2em] ${healCooldown <= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-slate-600'}`}>回復</span>
              {healCooldown > 0 ? (
                <span className="font-orbitron font-bold text-[8px] lg:text-[12px] text-emerald-700">CD:{(healCooldown / 1000).toFixed(1)}</span>
              ) : (
                <div className="flex gap-[2px]">
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981]" />
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981] opacity-70" />
                  <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981] opacity-40" />
                </div>
              )}
            </div>
          </motion.button>



        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           VICTORY / DEFEAT
         ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(battlePhase === 'victory' || battlePhase === 'defeat') && (
          <motion.div className="absolute inset-0 z-[100] flex flex-col items-center justify-center pointer-events-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className={`absolute inset-0 ${battlePhase === 'victory' ? 'bg-[#030712]/90' : 'bg-[#1e0505]/90'} backdrop-blur-md`} />

            {/* Cinematic light beams */}
            <motion.div
              className={`absolute top-1/2 left-0 w-full h-[30vh] -translate-y-1/2 ${battlePhase === 'victory' ? 'bg-gradient-to-r from-transparent via-cyan-900/20 to-transparent' : 'bg-gradient-to-r from-transparent via-red-900/20 to-transparent'} mix-blend-screen skew-y-[-5deg]`}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            <motion.div className="relative z-10 text-center flex flex-col items-center" initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className={`font-noto text-5xl lg:text-7xl font-black tracking-[0.2em] py-2 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] ${battlePhase === 'victory' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500' : 'text-transparent bg-clip-text bg-gradient-to-b from-white via-red-100 to-red-600'}`}>
                {battlePhase === 'victory' ? '勝利' : '敗北'}
              </h2>

              <motion.button
                onClick={handleResultClose}
                className={`mt-12 px-12 py-4 font-noto font-bold text-sm tracking-[0.4em] rounded-sm backdrop-blur-md border transition-all duration-300 relative overflow-hidden group ${battlePhase === 'victory' ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-50 hover:bg-cyan-900/60 hover:border-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]' : 'bg-red-950/30 border-red-500/50 text-red-50 hover:bg-red-900/60 hover:border-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent ${battlePhase === 'victory' ? 'via-cyan-400/20' : 'via-red-400/20'} to-transparent translate-x-[-100%] group-hover:translate-x-[100%]`} style={{ transitionDuration: '1s' }} />
                <span className="relative z-10">{battlePhase === 'victory' ? '次へ進む' : '撤退する'}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

