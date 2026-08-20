import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import SpriteAnimator from './SpriteAnimator';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & TUNING
// ═══════════════════════════════════════════════════════════════════════════════
const TURN_DELAY = 400;

// Damage
const ALLY_BASE_DAMAGE = 12;
const ENEMY_BASE_DAMAGE = 18;
const GUARD_REDUCTION = 0.25;
const COUNTER_DAMAGE = 30;
const HEAL_AMOUNT = 70;
const HEAL_COOLDOWN = 12000;
const ULTIMATE_DAMAGE = 220;

// Sync
const SYNC_PER_HIT = 3;
const SYNC_PER_PARRY = 15;
const SYNC_MAX = 100;
const SYNC_COST_ULTIMATE = 100;

// Resonance Tuning Constants Removed

// Turn order
const TURN_ORDER = ['mutsunori', 'enemy1'];
const TIMELINE_DISPLAY_COUNT = 10;

// Enemy attack patterns
const ATTACK_PATTERNS = [
  { type: 'normal', hits: 1, duration: 1500, label: '通常攻撃' },
  { type: 'fast', hits: 1, duration: 900, label: '高速攻撃' },
  { type: 'double', hits: 2, duration: 1100, label: '連続攻撃' },
  { type: 'triple', hits: 3, duration: 1000, label: '三連撃' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ANOMALY FRAGMENTS
// ═══════════════════════════════════════════════════════════════════════════════
const ANOMALY_FRAGMENTS = {
  ATK_UP: { id: 'ATK_UP', name: '猛攻の欠片', desc: '与えるダメージが1.5倍になる', cost: 2, color: 'bg-red-500', border: 'border-red-400', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]', icon: '⚔️' },
  DEF_UP: { id: 'DEF_UP', name: '堅守の欠片', desc: '受けるダメージを半減する', cost: 2, color: 'bg-blue-500', border: 'border-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.6)]', icon: '🛡️' },
  SYNC_BOOST: { id: 'SYNC_BOOST', name: '共鳴の欠片', desc: 'SYNC獲得量が2倍になる', cost: 3, color: 'bg-amber-500', border: 'border-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]', icon: '✨' },
  HEAL_BOOST: { id: 'HEAL_BOOST', name: '慈愛の欠片', desc: '回復量が2倍になる', cost: 3, color: 'bg-emerald-500', border: 'border-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]', icon: '💖' },
  ULT_BOOST: { id: 'ULT_BOOST', name: '崩壊の欠片', desc: '必殺技ダメージが2.5倍になる', cost: 5, color: 'bg-violet-500', border: 'border-violet-400', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.6)]', icon: '🔥' },
};
const MAX_ANOMALY_COST = 10;
const MAX_ANOMALY_SLOTS = 5;

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL DATA
// ═══════════════════════════════════════════════════════════════════════════════
const createAllies = () => [
  { id: 'mutsunori', name: '睦典', image: '/battle/mutsunori.png', cutinImage: '/character/Mutsunori/Mutsunori_serious.png', hp: 300, maxHp: 300, color: '#34d399', isDead: false, flashTimer: 0 },
];

const createEnemies = () => [
  { id: 'enemy1', name: 'キメラα', image: '/character/kimera1.png', hp: 500, maxHp: 500, color: '#ef4444', isStunned: false, isDead: false, flashTimer: 0 },
];

const getCharInfo = (id) => {
  const map = {
    mutsunori: { name: '睦典', image: '/battle/mutsunori.png', isAlly: true },
    enemy1:    { name: 'キメラα', image: '/character/kimera1.png', isAlly: false },
  };
  return map[id] || { name: '？', image: '', isAlly: false };
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BattleResonanceTuning({ onComplete, playBGM, stopBGM, playSE }) {
  // ─── Core State ───
  const [allies, setAllies] = useState(createAllies);
  const [enemies, setEnemies] = useState(createEnemies);
  const [syncRate, setSyncRate] = useState(0);
  const [battlePhase, setBattlePhase] = useState('intro');
  const [battleLog, setBattleLog] = useState([]);

  // ─── Turn State ───
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [turnPhase, setTurnPhase] = useState('waiting');
  const [turnTimer, setTurnTimer] = useState(0);
  const [currentAttack, setCurrentAttack] = useState(null);
  const [counterAttack, setCounterAttack] = useState(null);

  const [guardingAllies, setGuardingAllies] = useState(new Set());
  const [healCooldown, setHealCooldown] = useState(0);
  const [guardCooldownTrigger, setGuardCooldownTrigger] = useState({ mutsunori: 0 });

  // ─── Anomaly State ───
  const [inventoryFragments, setInventoryFragments] = useState([]); // Array of IDs
  const [activeFragments, setActiveFragments] = useState([]); // Array of IDs
  const [showInventory, setShowInventory] = useState(false);

  // ─── Visual Effects State ───
  const [sakuraSinging, setSakuraSinging] = useState(false);
  const [sakuraNotes, setSakuraNotes] = useState([]);
  const [showDamageNumbers, setShowDamageNumbers] = useState([]);
  const [shakeActive, setShakeActive] = useState(false);
  const [parryFlash, setParryFlash] = useState(false);
  const [ultimateFlash, setUltimateFlash] = useState(false);
  const [healFlash, setHealFlash] = useState(false);
  const [duetCutin, setDuetCutin] = useState(null);
  const [glintEffects, setGlintEffects] = useState([]);
  const [resonanceBurst, setResonanceBurst] = useState(null); // { type, x, y }

  const gameLoopRef = useRef(null);
  const lastTickRef = useRef(0);
  const hitStopRef = useRef(0);
  const guardCooldownsRef = useRef({ mutsunori: 0 });
  const stateRef = useRef({
    allies, enemies, currentAttack, guardingAllies, syncRate,
    battlePhase, turnPhase, currentTurnIndex, counterAttack, activeFragments, showInventory
  });

  useEffect(() => {
    stateRef.current = {
      allies, enemies, currentAttack, guardingAllies, syncRate,
      battlePhase, turnPhase, currentTurnIndex, counterAttack, activeFragments, showInventory
    };
  }, [allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, activeFragments, showInventory]);

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
    setSyncRate(prev => Math.min(SYNC_MAX, prev + amount));
  }, []);

  const spawnGlint = useCallback((enemyId) => {
    const id = Date.now() + Math.random();
    setGlintEffects(prev => [...prev, { id, enemyId }]);
    setTimeout(() => setGlintEffects(prev => prev.filter(g => g.id !== id)), 400);
  }, []);

  // ─── Timeline ───
  const timelineQueue = useMemo(() => {
    const queue = [];
    let idx = currentTurnIndex;
    for (let i = 0; i < TIMELINE_DISPLAY_COUNT; i++) {
      queue.push({ id: TURN_ORDER[idx % TURN_ORDER.length], turnIndex: idx });
      idx++;
    }
    return queue;
  }, [currentTurnIndex]);

  const advanceTurn = useCallback(() => {
    setCurrentTurnIndex(prev => prev + 1);
    setTurnPhase('turn_delay');
    setTurnTimer(TURN_DELAY);
  }, []);

  // ─── BGM ───
  useEffect(() => {
    if (playBGM) playBGM('/assets/audio/bgm/RPG_Battle_01.mp3');
    return () => { if (stopBGM) stopBGM(); };
  }, []);

  // ─── Intro -> Fighting ───
  useEffect(() => {
    if (battlePhase === 'intro') {
      const timer = setTimeout(() => {
        setBattlePhase('fighting');
        setTurnPhase('turn_delay');
        setTurnTimer(500);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [battlePhase]);

  // ═══════════════════════════════════════════════════════════════════════════════
  // RESONANCE TUNING (Removed)
  // ═══════════════════════════════════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════════════════════════════════
  // MAIN GAME LOOP
  // ═══════════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (battlePhase !== 'fighting') return;

    const tick = (timestamp) => {
      if (!lastTickRef.current) lastTickRef.current = timestamp;
      const rawDt = timestamp - lastTickRef.current;
      lastTickRef.current = timestamp;

      if (rawDt > 200) { gameLoopRef.current = requestAnimationFrame(tick); return; }

      if (stateRef.current.showInventory) {
        gameLoopRef.current = requestAnimationFrame(tick);
        return;
      }

      let dt = rawDt;
      if (hitStopRef.current > 0) {
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

      // Win/Loss check
      if (currentAllies.every(a => a.isDead)) { setBattlePhase('defeat'); return; }
      if (currentEnemies.every(e => e.isDead)) { setBattlePhase('victory'); return; }

      // Tick cooldowns
      setHealCooldown(prev => Math.max(0, prev - dt));
      setAllies(prev => prev.map(a => ({ ...a, flashTimer: Math.max(0, a.flashTimer - dt) })));
      setEnemies(prev => prev.map(e => ({ ...e, flashTimer: Math.max(0, e.flashTimer - dt) })));

      const phase = stateRef.current.turnPhase;

      // ── TURN DELAY ──
      if (phase === 'turn_delay') {
        setTurnTimer(prev => {
          const next = prev - dt;
          if (next <= 0) {
            const turnId = TURN_ORDER[stateRef.current.currentTurnIndex % TURN_ORDER.length];
            const allAllies = stateRef.current.allies;
            const allEnemies = stateRef.current.enemies;

            const isAlly = turnId === 'mutsunori';
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
              resolveAllyAttack('normal');
              return 0;
            } else {
              // Enemy turn
              const enemy = allEnemies.find(e => e.id === turnId);
              if (enemy && enemy.isStunned) {
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


      // ── ALLY ATTACK (Animation Hold after tuning resolved) ──
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
          const pattern = ATTACK_PATTERNS[Math.floor(Math.random() * ATTACK_PATTERNS.length)];

          const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
          const hits = [];
          for (let i = 0; i < pattern.hits; i++) {
            let offsetX, offsetY, isValid;
            let attempts = 0;
            do {
              offsetX = (Math.random() - 0.5) * 160;
              offsetY = (Math.random() - 0.5) * 160;
              isValid = true;
              for (const prev of hits) {
                const dist = Math.sqrt(Math.pow(offsetX - prev.offsetX, 2) + Math.pow(offsetY - prev.offsetY, 2));
                if (dist < 45) { // Prevent overlapping
                  isValid = false;
                  break;
                }
              }
              attempts++;
            } while (!isValid && attempts < 20);

            hits.push({
              id: i,
              startTime: now + (i * 450),
              duration: pattern.duration,
              glintFired: false,
              resolved: false,
              offsetX,
              offsetY,
              requiredKey: keys[Math.floor(Math.random() * keys.length)]
            });
          }
          const attack = {
            enemyId: turnId,
            targetId: target.id,
            pattern,
            hits
          };
          setCurrentAttack(attack);
          if (enemy) addLog(`⚠ ${enemy.name} が ${target.name} を狙っている！ [${pattern.label}]`);
        } else {
          setCurrentTurnIndex(p => p + 1);
          setTurnPhase('turn_delay');
          setTurnTimer(TURN_DELAY);
        }
      }

      // ── PROCESS ENEMY ATTACK ──
      if (phase === 'enemy_windup' && stateRef.current.currentAttack) {
        const attack = stateRef.current.currentAttack;
        let allResolved = true;
        let anyResolvedThisFrame = false;

        const nextHits = attack.hits.map(hit => {
          if (hit.resolved) return hit;
          allResolved = false;
          
          const elapsed = now - hit.startTime;
          if (elapsed < 0) return hit; // Not started yet

          let nextHit = { ...hit };
          if (elapsed >= Math.max(0, hit.duration - 500) && !hit.glintFired) {
            nextHit.glintFired = true;
            spawnGlint(attack.enemyId);
          }

          if (elapsed >= hit.duration) {
            nextHit.resolved = true;
            anyResolvedThisFrame = true;
          }
          return nextHit;
        });

        if (JSON.stringify(attack.hits) !== JSON.stringify(nextHits)) {
           setCurrentAttack({ ...attack, hits: nextHits });
        }

        if (anyResolvedThisFrame) {
          const allAllies = stateRef.current.allies;
          const targetIdx = allAllies.findIndex(a => a.id === attack.targetId && !a.isDead);
          const enemy = stateRef.current.enemies.find(e => e.id === attack.enemyId);

          if (targetIdx !== -1 && enemy) {
            const isGuarding = currentGuards.has(attack.targetId);
            const defMult = stateRef.current.activeFragments.includes('DEF_UP') ? 0.5 : 1.0;
            let dmg = Math.floor((ENEMY_BASE_DAMAGE + Math.floor(Math.random() * 10)) * defMult);
            if (isGuarding) {
              dmg = Math.floor(dmg * GUARD_REDUCTION);
              addLog(`🛡️ ${allAllies[targetIdx].name} がガード！ 被害軽減`);
            } else {
              addLog(`💥 ${enemy.name} の攻撃が ${allAllies[targetIdx].name} に直撃！`);
            }

            setAllies(prev => prev.map(a => {
              if (a.id === attack.targetId) {
                const newHp = Math.max(0, a.hp - dmg);
                return { ...a, hp: newHp, flashTimer: 400, isDead: newHp <= 0 };
              }
              return a;
            }));
            spawnDamageNumber(attack.targetId, dmg, isGuarding ? 'damage' : 'critical');
          }
        }

        if (allResolved && nextHits.every(h => h.resolved)) {
           setCurrentAttack(null);
           setTurnPhase('enemy_resolve');
           setTurnTimer(150);
        }
      }

      // ── ENEMY RESOLVE ──
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

      // ── COUNTER ATTACK ──
      if (phase === 'counter_attack' && stateRef.current.counterAttack) {
        const { allyId, enemyId } = stateRef.current.counterAttack;
        const ally = stateRef.current.allies.find(a => a.id === allyId);
        const enemy = stateRef.current.enemies.find(e => e.id === enemyId);

        if (ally && enemy && !enemy.isDead) {
          const atkMult = stateRef.current.activeFragments.includes('ATK_UP') ? 1.5 : 1.0;
          const dmg = Math.floor((COUNTER_DAMAGE + Math.floor(Math.random() * 10)) * atkMult);
          setEnemies(prev => prev.map(e => {
            if (e.id === enemyId) {
              const newHp = Math.max(0, e.hp - dmg);
              return { ...e, hp: newHp, flashTimer: 400, isDead: newHp <= 0 };
            }
            return e;
          }));
          spawnDamageNumber(enemyId, dmg, 'damage');
          addLog(`⚡ ${ally.name} が反撃！ ${enemy.name} にダメージ！`);
          
          if (Math.random() < 0.3) {
            const keys = Object.keys(ANOMALY_FRAGMENTS);
            const drop = keys[Math.floor(Math.random() * keys.length)];
            setInventoryFragments(prev => [...prev, drop]);
            addLog(`🔮 異能の欠片【${ANOMALY_FRAGMENTS[drop].name}】を吸収した！`);
          }
        }

        setCounterAttack(null);
        stateRef.current.counterAttack = null;
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
  // RESOLVE ALLY ATTACK
  // ═══════════════════════════════════════════════════════════════════════════════
  const resolveAllyAttack = useCallback((result) => {
    const allEnemies = stateRef.current.enemies;
    const aliveEnemies = allEnemies.filter(e => !e.isDead);
    if (aliveEnemies.length === 0) return;

    const turnId = TURN_ORDER[stateRef.current.currentTurnIndex % TURN_ORDER.length];
    const ally = stateRef.current.allies.find(a => a.id === turnId);
    const target = aliveEnemies.reduce((min, e) => e.hp < min.hp ? e : min, aliveEnemies[0]);

    let multiplier = 1.0;
    const atkMult = stateRef.current.activeFragments.includes('ATK_UP') ? 1.5 : 1.0;
    const syncMult = stateRef.current.activeFragments.includes('SYNC_BOOST') ? 2.0 : 1.0;
    let syncGain = Math.floor(SYNC_PER_HIT * syncMult);

    const baseDmg = ALLY_BASE_DAMAGE + Math.floor(Math.random() * 8);
    const dmg = Math.floor(baseDmg * multiplier * atkMult);

    setEnemies(prev => prev.map(e => {
      if (e.id === target.id) {
        const newHp = Math.max(0, e.hp - dmg);
        return { ...e, hp: newHp, flashTimer: 300, isDead: newHp <= 0 };
      }
      return e;
    }));

    const dmgType = 'damage';
    spawnDamageNumber(target.id, dmg, dmgType);
    addSync(syncGain);
    if (ally) addLog(`⚔ ${ally.name} の攻撃！`);
    if (playSE) playSE('/assets/audio/bgm/+game_sword.mp3');
    
    if (Math.random() < 0.25) {
      const keys = Object.keys(ANOMALY_FRAGMENTS);
      const drop = keys[Math.floor(Math.random() * keys.length)];
      setInventoryFragments(prev => [...prev, drop]);
      addLog(`🔮 異能の欠片【${ANOMALY_FRAGMENTS[drop].name}】を吸収した！`);
    }

    triggerSakuraNote();
    setTurnPhase('ally_attack');
    setTurnTimer(200);
  }, [addLog, addSync, spawnDamageNumber, triggerSakuraNote, playSE]);




  // ═══════════════════════════════════════════════════════════════════════════════
  // PARRY & GUARD
  // ═══════════════════════════════════════════════════════════════════════════════
  const handleActionStart = useCallback((allyId, pressedKey = null) => {
    const nowTime = Date.now();
    if (nowTime - guardCooldownsRef.current[allyId] < 800) return;

    const attack = stateRef.current.currentAttack;
    let parrySuccess = false;

    if (stateRef.current.turnPhase === 'enemy_windup' && attack && attack.targetId === allyId) {
      // Find the first unresolved hit
      const targetHitIndex = attack.hits.findIndex(h => !h.resolved);
      if (targetHitIndex !== -1) {
        const hit = attack.hits[targetHitIndex];
        const elapsed = nowTime - hit.startTime;
        const parryStart = hit.duration - 150;
        const parryEnd = hit.duration + 50;
        
        // Check if the pressed key matches the required key
        const keyMatch = pressedKey === null || pressedKey === hit.requiredKey;

        if (keyMatch && elapsed >= parryStart && elapsed <= parryEnd) {
          parrySuccess = true;
          // Mark this hit as resolved
          attack.hits[targetHitIndex].resolved = true;
          
          hitStopRef.current = 150;
          if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
          setParryFlash(true);
          setTimeout(() => setParryFlash(false), 500);
          triggerSakuraNote();
          const syncMult = stateRef.current.activeFragments.includes('SYNC_BOOST') ? 2.0 : 1.0;
          addSync(Math.floor(SYNC_PER_PARRY * syncMult));

          if (attack.hits.every(h => h.resolved)) {
            setCurrentAttack(null);
            stateRef.current.currentAttack = null;
            setEnemies(prev => prev.map(e => e.id === attack.enemyId ? { ...e, isStunned: true } : e));
            const ally = stateRef.current.allies.find(a => a.id === allyId);
            addLog(`✨ パリィ成功！ ${ally?.name} が敵の攻撃を弾き返した！`);
            setCounterAttack({ allyId, enemyId: attack.enemyId });
            stateRef.current.counterAttack = { allyId, enemyId: attack.enemyId };
            setTurnPhase('counter_attack');
            stateRef.current.turnPhase = 'counter_attack';
          } else {
            setCurrentAttack({ ...attack, hits: [...attack.hits] });
            stateRef.current.currentAttack = { ...attack, hits: [...attack.hits] };
            const ally = stateRef.current.allies.find(a => a.id === allyId);
            addLog(`✨ ${ally?.name} が弾いた！ さらに追撃が来る！`);
          }
        }
      }
    }

    if (!parrySuccess) {
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

  // Keyboard support for parry
  useEffect(() => {
    const getMappedKey = (key) => {
      const upper = key.toUpperCase();
      if (upper === 'W' || key === 'ArrowUp') return 'ArrowUp';
      if (upper === 'A' || key === 'ArrowLeft') return 'ArrowLeft';
      if (upper === 'S' || key === 'ArrowDown') return 'ArrowDown';
      if (upper === 'D' || key === 'ArrowRight') return 'ArrowRight';
      return null;
    };

    const handleKeyDown = (e) => {
      const mapped = getMappedKey(e.key);
      if (mapped) {
        const mutsunori = stateRef.current.allies.find(a => a.id === 'mutsunori');
        if (mutsunori && !mutsunori.isDead) {
          handleActionStart(mutsunori.id, mapped);
        }
      }
    };
    const handleKeyUp = (e) => {
      const mapped = getMappedKey(e.key);
      if (mapped) {
        const mutsunori = stateRef.current.allies.find(a => a.id === 'mutsunori');
        if (mutsunori) {
          handlePointerUp(mutsunori.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleActionStart, handlePointerUp]);


  // ═══════════════════════════════════════════════════════════════════════════════
  // ABILITIES
  // ═══════════════════════════════════════════════════════════════════════════════
  const handleHeal = useCallback(() => {
    if (healCooldown > 0 || stateRef.current.battlePhase !== 'fighting') return;
    setHealCooldown(HEAL_COOLDOWN);
    setHealFlash(true);
    setTimeout(() => setHealFlash(false), 500);
    triggerSakuraNote();
    const healMult = stateRef.current.activeFragments.includes('HEAL_BOOST') ? 2.0 : 1.0;
    const amount = Math.floor(HEAL_AMOUNT * healMult);
    setAllies(prev => prev.map(a => {
      if (a.isDead) return a;
      spawnDamageNumber(a.id, amount, 'heal');
      return { ...a, hp: Math.min(a.maxHp, a.hp + amount), flashTimer: 0 };
    }));
    addLog(`💖 朔良の歌でパーティ全体が回復！`);
  }, [healCooldown, addLog, triggerSakuraNote, spawnDamageNumber]);

  const handleUltimate = useCallback(() => {
    if (syncRate < SYNC_COST_ULTIMATE || stateRef.current.battlePhase !== 'fighting') return;
    const mutsunori = allies.find(a => a.id === 'mutsunori');
    if (!mutsunori || mutsunori.isDead) return;

    setSyncRate(0);
    setDuetCutin({ allyId: mutsunori.id, name: mutsunori.name, image: mutsunori.cutinImage });
    setUltimateFlash(true);
    triggerSakuraNote();
    hitStopRef.current = 2500;

    setTimeout(() => {
      setShakeActive(true);
      setEnemies(prev => {
        const aliveEnemies = prev.filter(e => !e.isDead);
        if (aliveEnemies.length === 0) return prev;
        const target = aliveEnemies.reduce((min, e) => e.hp < min.hp ? e : min, aliveEnemies[0]);
        const ultMult = stateRef.current.activeFragments.includes('ULT_BOOST') ? 2.5 : 1.0;
        const dmg = Math.floor((ULTIMATE_DAMAGE + Math.floor(Math.random() * 20)) * ultMult);
        spawnDamageNumber(target.id, dmg, 'ultimate');
        return prev.map(e => {
          if (e.id === target.id) {
            return { ...e, hp: Math.max(0, e.hp - dmg), flashTimer: 800, isDead: e.hp - dmg <= 0 };
          }
          return e;
        });
      });
      setCurrentAttack(null);
      addLog(`★★ 睦典の必殺技！ 渾身の一撃が炸裂！ ★★`);
    }, 1500);

    setTimeout(() => { setDuetCutin(null); setUltimateFlash(false); setShakeActive(false); }, 2500);
  }, [syncRate, allies, addLog, triggerSakuraNote, spawnDamageNumber]);

  const handleResultClose = useCallback(() => {
    if (stopBGM) stopBGM();
    onComplete(battlePhase === 'victory' ? 'win' : 'lose');
  }, [battlePhase, onComplete, stopBGM]);


  // ═══════════════════════════════════════════════════════════════════════════════
  // ANOMALY ABSORPTION (FRAGMENTS)
  // ═══════════════════════════════════════════════════════════════════════════════
  const handleEquipFragment = useCallback((fragId) => {
    setActiveFragments(prev => {
      if (prev.length >= MAX_ANOMALY_SLOTS) {
        addLog('⚠ スロットが一杯です');
        return prev;
      }
      return [...prev, fragId];
    });
    setInventoryFragments(prev => {
      const idx = prev.indexOf(fragId);
      if (idx !== -1) {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      return prev;
    });
  }, [addLog]);

  const handleUnequipFragment = useCallback((index) => {
    setActiveFragments(prev => {
      const fragId = prev[index];
      if (!fragId) return prev;
      setInventoryFragments(inv => [...inv, fragId]);
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }, []);

  const totalCost = activeFragments.reduce((sum, id) => sum + ANOMALY_FRAGMENTS[id].cost, 0);
  const isOverCost = totalCost > MAX_ANOMALY_COST;

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

  const svgRef = useRef(null);
  const [lineCoords, setLineCoords] = useState(null);

  useEffect(() => {
    if (activeAttacksCompat.length === 0) { setLineCoords(null); return; }
    const updateCoords = () => {
      const attack = activeAttacksCompat[0];
      const enemyEl = document.getElementById(`rt-char-${attack.enemyId}`);
      const allyEl = document.getElementById(`rt-char-${attack.targetId}`);
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
        });
      }
    };
    const raf = requestAnimationFrame(updateCoords);
    window.addEventListener('resize', updateCoords);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', updateCoords); };
  }, [activeAttacksCompat]);



  // ═══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════════
  return (
    <div className={`absolute inset-0 w-full h-full bg-[#0a0f18] overflow-hidden select-none z-50 flex flex-col font-noto ${shakeActive ? 'animate-battle-shake' : ''}`}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="/battle/sougen.jpeg" alt="background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40 backdrop-blur-[2px]" />
      </div>

      {/* ── INTRO ── */}
      <AnimatePresence>
        {battlePhase === 'intro' && (
          <motion.div className="absolute inset-0 z-[60] flex items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <div className="font-noto text-xs tracking-[0.4em] text-cyan-200/80 mb-3">RESONANCE TUNING BATTLE</div>
              <h2 className="font-noto text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 tracking-wider animate-pulse">
                BATTLE START
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VISUAL FLASHES ── */}
      <AnimatePresence>
        {parryFlash && (
          <motion.div className="absolute inset-0 z-[65] pointer-events-none flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="absolute inset-0 bg-cyan-100/30" />
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1.2, opacity: 1 }} exit={{ scale: 2, opacity: 0 }} transition={{ duration: 0.4 }} className="font-noto text-5xl md:text-7xl font-black text-cyan-100 drop-shadow-[0_0_30px_rgba(255,255,255,1)] z-10 italic">
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
      </AnimatePresence>


      {/* ── DUET CUTIN ── */}
      <AnimatePresence>
        {duetCutin && (
          <motion.div className="absolute inset-0 z-[58] pointer-events-none flex items-center justify-center overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <motion.img src={duetCutin.image} alt={duetCutin.name} className="absolute h-[80%] object-contain z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]" initial={{ x: '-100%', opacity: 0 }} animate={{ x: '0%', opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
            <motion.div className="absolute bottom-[15%] z-20 text-center" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <div className="font-noto text-xs tracking-[0.5em] text-cyan-100/80 mb-2">ULTIMATE ART</div>
              <div className="font-noto text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-violet-100 to-cyan-100 tracking-wider">必殺技</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAUSE OVERLAY ── */}
      <AnimatePresence>
        {showInventory && (
          <motion.div 
            className="absolute inset-0 bg-black/60 z-[35] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════
           TOP HUD
         ═══════════════════════════════════════════════════════ */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-900/80 to-transparent z-40 pointer-events-none flex flex-col">
        {battlePhase === 'fighting' && (
          <div className="w-full flex justify-center pt-2">
            <div className="flex items-center gap-1 bg-slate-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-600/30 shadow-lg">
              <span className="font-noto text-[8px] md:text-[10px] text-slate-300 tracking-widest mr-2 font-bold">TURN</span>
              <div className="flex items-center gap-1.5">
                <AnimatePresence mode="popLayout">
                  {timelineQueue.map((turn, i) => {
                    const info = getCharInfo(turn.id);
                    const isCurrent = i === 0;
                    const isDead = info.isAlly ? allies.find(a => a.id === turn.id)?.isDead : enemies.find(e => e.id === turn.id)?.isDead;
                    return (
                      <motion.div key={turn.turnIndex} layout initial={{ opacity: 0, scale: 0.5, x: 20 }} animate={{ opacity: isDead ? 0.3 : 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: -20 }} transition={{ duration: 0.3, ease: 'easeOut' }} className={`relative flex-shrink-0 ${isCurrent ? 'z-10' : 'z-0'}`}>
                        <div className={`relative overflow-hidden flex items-center justify-center rounded-full ${isCurrent ? 'w-8 h-8 md:w-10 md:h-10 border-2' : 'w-6 h-6 md:w-7 md:h-7 border'} ${isCurrent ? (info.isAlly ? 'border-cyan-300 bg-cyan-900' : 'border-red-400 bg-red-900') : (info.isAlly ? 'border-slate-500 bg-slate-800' : 'border-slate-500 bg-slate-800')}`}>
                          <img src={info.image} alt={info.name} className="w-full h-full object-cover" />
                        </div>
                        {i < timelineQueue.length - 1 && <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-[8px] text-slate-400 z-20">▸</div>}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════
           BATTLE FIELD
         ═══════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex items-stretch px-2 md:px-8 pt-20 pb-32 z-10 overflow-hidden">

        {/* Attack Warning Lines & Projectiles */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {lineCoords && (
            <>
              <motion.line
                x1={lineCoords.x1} y1={lineCoords.y1}
                x2={lineCoords.x2} y2={lineCoords.y2}
                stroke="#ef4444" strokeWidth="2" strokeDasharray="8 8" opacity="0.3"
              />
              {activeAttacksCompat.flatMap(attack => 
                attack.hits.filter(h => !h.resolved && Date.now() >= h.startTime).map(hit => (
                  <motion.circle
                    key={`${attack.enemyId}-${hit.id}`}
                    r="12" fill="#ef4444" filter="drop-shadow(0 0 8px rgba(239,68,68,1))"
                    initial={{ cx: lineCoords.x1, cy: lineCoords.y1, opacity: 0 }}
                    animate={{ 
                      cx: [lineCoords.x1, lineCoords.x2], 
                      cy: [lineCoords.y1, lineCoords.y2],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: hit.duration / 1000,
                      ease: "linear",
                      times: [0, 0.1, 0.95, 1]
                    }}
                  />
                ))
              )}
            </>
          )}
        </svg>

        {/* ── Allies (Left) ── */}
        <div className="w-1/2 flex flex-col justify-around items-center pr-4">
          {allies.map(ally => {
            const isTargeted = targetedAllies.has(ally.id);
            const attackInfo = activeAttacksCompat.find(a => a.targetId === ally.id);
            const isGuarding = guardingAllies.has(ally.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === ally.id && turnPhase !== 'turn_delay';

            return (
              <div key={ally.id} className="relative flex flex-col items-center w-full">
                {/* Status */}
                <div className="w-24 md:w-32 mb-2 z-20 flex flex-col gap-1">
                  <div className="flex justify-end items-center px-1">
                    <span className="font-noto font-bold text-[8px] md:text-[10px] text-slate-100 drop-shadow-md">{ally.hp}/{ally.maxHp}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900/60 rounded-full overflow-hidden backdrop-blur-sm shadow-sm">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-300 transition-all duration-300 shadow-[0_0_5px_rgba(34,211,238,0.5)]" style={{ width: `${(ally.hp / ally.maxHp) * 100}%` }} />
                  </div>
                </div>

                {/* Ally Portrait */}
                <motion.div
                  id={`rt-char-${ally.id}`}
                  className={`relative cursor-pointer touch-none flex items-center justify-center transition-all duration-200 w-28 h-36 md:w-36 md:h-48 ${ally.isDead ? 'opacity-40 grayscale' : ''}`}
                  animate={{ x: isCurrentTurn && turnPhase === 'ally_attack' ? 30 : 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                  onPointerDown={() => handleActionStart(ally.id)}
                  onPointerUp={() => handlePointerUp(ally.id)}
                  onPointerLeave={() => handlePointerUp(ally.id)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Target Indicators (HSR Overlapping/Scattered Style) */}
                  {isTargeted && !ally.isDead && attackInfo && (
                    <div className="absolute inset-0 pointer-events-none z-50">
                      {attackInfo.hits.map((hit, i) => {
                        const isPast = hit.resolved;
                        const hasStarted = Date.now() >= hit.startTime;
                        // Use the stable random offset generated when attack was created
                        const top = `calc(50% + ${hit.offsetY}px - 20px)`;
                        const left = `calc(50% + ${hit.offsetX}px - 20px)`;
                        
                        // Don't render until it starts
                        if (!hasStarted && !isPast) return null;

                        return (
                          <div key={hit.id} className="absolute w-10 h-10 flex items-center justify-center" style={{ top, left }}>
                            {/* Inner Circle Background */}
                            <div className="absolute inset-1 rounded-full bg-slate-800/90 border border-slate-600 shadow-inner flex items-center justify-center">
                              {/* Glowing dot for past hits */}
                              {isPast && <div className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />}
                              {/* Required key for future/current hits */}
                              {!isPast && <div className="font-noto text-lg font-bold text-slate-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">
                                {{'ArrowUp': '↑', 'ArrowDown': '↓', 'ArrowLeft': '←', 'ArrowRight': '→'}[hit.requiredKey]}
                              </div>}
                            </div>
                            
                            {/* Outer Progress Ring (SVG) */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_4px_rgba(253,224,71,0.8)]">
                              <circle
                                cx="20" cy="20" r="18"
                                fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3"
                              />
                              {(hasStarted || isPast) && (
                                <motion.circle
                                  key={hasStarted && !isPast ? hit.startTime : `past-${i}`}
                                  cx="20" cy="20" r="18"
                                  fill="none" stroke={isPast ? "#22d3ee" : "#fde047"} strokeWidth="3" strokeLinecap="round"
                                  strokeDasharray={18 * 2 * Math.PI}
                                  initial={{ strokeDashoffset: isPast ? 0 : 18 * 2 * Math.PI }}
                                  animate={{ strokeDashoffset: isPast ? 0 : [18 * 2 * Math.PI, 0] }}
                                  transition={(hasStarted && !isPast) ? { duration: hit.duration / 1000, ease: "linear" } : { duration: 0 }}
                                />
                              )}
                            </svg>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Guard Shield */}
                  {isGuarding && !ally.isDead && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                      <SpriteAnimator
                        src="/battle/pipo-btleffect111f.png"
                        frameWidth={192} frameHeight={192}
                        columns={5} totalFrames={10}
                        fps={15} loop={false}
                        holdOnFrame={4} pulsateOnHold={true}
                        scale={1.2}
                      />
                    </div>
                  )}

                  {/* Guard Cooldown */}
                  <AnimatePresence>
                    {guardCooldownTrigger[ally.id] && !ally.isDead && (
                      <motion.div
                        key={`cd-${guardCooldownTrigger[ally.id]}`}
                        className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center z-30 pointer-events-none"
                        initial={{ height: '100%' }}
                        animate={{ height: 0 }}
                        transition={{ duration: 0.8, ease: 'linear' }}
                      />
                    )}
                  </AnimatePresence>

                  {ally.image ? (
                    <img src={ally.image} alt={ally.name} className={`w-full h-full object-contain relative z-10 ${ally.flashTimer > 0 ? 'animate-battle-hit-flash drop-shadow-[0_0_20px_rgba(248,113,113,0.8)]' : 'drop-shadow-lg'}`} />
                  ) : (
                    <div className="w-full h-full bg-slate-800/80 border border-slate-600 rounded-2xl flex items-center justify-center">
                      <span className="font-noto font-bold text-slate-300">{ally.name}</span>
                    </div>
                  )}

                  {ally.isDead && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm rounded-2xl z-20">
                      <span className="font-noto text-sm text-red-400 font-bold tracking-widest">INCAPACITATED</span>
                    </div>
                  )}
                </motion.div>

                {/* Damage Numbers */}
                <AnimatePresence>
                  {showDamageNumbers.filter(d => d.targetId === ally.id).map(d => (
                    <motion.div key={d.id} className={`absolute top-0 z-30 font-noto font-black text-xl md:text-3xl italic ${d.type === 'heal' ? 'text-emerald-300' : 'text-red-400'} drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]`} initial={{ opacity: 1, y: 0, scale: 0.8 }} animate={{ opacity: 0, y: -40, scale: 1.2 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                      {d.type === 'heal' ? `+${d.amount}` : `-${d.amount}`}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Enemies (Right) ── */}
        <div className="w-1/2 flex flex-col justify-around items-center pl-4">
          {enemies.map(enemy => {
            const isAttacking = activeAttacksCompat.some(a => a.enemyId === enemy.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === enemy.id && turnPhase !== 'turn_delay';

            return (
              <div key={enemy.id} className="relative flex flex-col items-center w-full z-20">
                <div className="w-28 md:w-36 mb-2 z-20 flex flex-col">
                  <div className="w-full h-1.5 bg-slate-900/60 rounded-full overflow-hidden backdrop-blur-sm shadow-sm">
                    <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
                  </div>
                </div>

                <motion.div
                  id={`rt-char-${enemy.id}`}
                  className={`relative w-40 h-48 md:w-64 md:h-72 flex items-center justify-center transition-all duration-200 ${
                    enemy.isDead ? 'opacity-30 grayscale'
                    : enemy.flashTimer > 0 ? 'animate-battle-hit-flash'
                    : ''
                  }`}
                  animate={{ x: isCurrentTurn && turnPhase === 'enemy_resolve' ? -30 : 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  <img src={enemy.image} alt={enemy.name} className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(244,63,94,0.3)] ${enemy.isStunned ? 'opacity-60 blur-[2px]' : ''}`} />
                  {enemy.isStunned && !enemy.isDead && (
                    <motion.div className="absolute -top-4 font-noto text-[10px] text-amber-200 font-bold bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-500/50" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                      STUNNED
                    </motion.div>
                  )}
                  {isAttacking && !enemy.isDead && (
                    <motion.div className="absolute inset-[-15px] rounded-full border-[3px] border-red-400/60 border-dotted" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                  )}
                </motion.div>

                <AnimatePresence>
                  {showDamageNumbers.filter(d => d.targetId === enemy.id).map(d => (
                    <motion.div key={d.id} className={`absolute top-0 z-30 font-noto font-black text-2xl md:text-4xl italic ${d.type === 'ultimate' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-pink-300' : 'text-white'} drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]`} initial={{ opacity: 1, y: 0, scale: 1.5 }} animate={{ opacity: 0, y: -50, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                      {d.amount}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* EXIT */}
        <button onClick={handleResultClose} className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-2 bg-slate-900/60 backdrop-blur-sm border border-slate-600/50 text-slate-300 font-noto text-xs tracking-widest rounded-full hover:border-cyan-300/50 hover:text-cyan-100 transition-all z-30">
          EXIT
        </button>
      </div>


      {/* ═══════════════════════════════════════════════════════
           BOTTOM HUD
         ═══════════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 inset-x-0 h-[18cqh] md:h-[22cqh] bg-slate-900/60 backdrop-blur-md border-t border-slate-700/50 z-40 flex flex-col justify-end shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        
        {/* TOP LAYER: Global SYNC Gauge */}
        <div className="absolute top-0 left-0 right-0 h-4 md:h-6 bg-slate-950/80 border-b border-slate-700/50 flex items-center shadow-inner">
          {/* Progress fill */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-cyan-600 to-pink-500 transition-all duration-300"
            style={{ width: `${Math.min(100, (syncRate / SYNC_COST_ULTIMATE) * 100)}%` }}
          />
          {/* Animated glow on full */}
          {syncRate >= SYNC_COST_ULTIMATE && (
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
          )}

          {/* Markers */}
          <div className="absolute left-[30%] top-0 bottom-0 w-0.5 bg-slate-300/40 z-10" />
          <div className="absolute left-[30%] -top-3.5 md:-top-4 text-[8px] md:text-[10px] text-amber-200 font-bold z-10 drop-shadow-md">BUFF (30)</div>
          
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-300/40 z-10" />
          <div className="absolute right-1 -top-3.5 md:-top-4 text-[8px] md:text-[10px] text-pink-200 font-bold z-10 drop-shadow-md">ULTIMATE (100)</div>

          {/* Sync Rate Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <span className="font-noto font-black text-white text-[10px] md:text-xs tracking-[0.2em] drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
              SYNC {Math.floor(syncRate)}%
            </span>
          </div>
        </div>

        {/* BOTTOM LAYER: Actions & Sakura */}
        <div className="w-full flex-1 flex flex-row items-center justify-start gap-6 md:gap-12 px-4 md:px-8 pt-4 md:pt-6 pb-2 md:pb-3">
          
          {/* Left: Sakura */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="relative">
              <motion.div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-cyan-200/80 shadow-[0_0_15px_rgba(165,243,252,0.4)] bg-slate-800 flex items-center justify-center" animate={sakuraSinging ? { scale: [1, 1.05, 1], borderColor: ['rgba(165,243,252,0.8)', 'rgba(244,114,182,0.8)', 'rgba(165,243,252,0.8)'] } : {}} transition={{ duration: 1, repeat: Infinity }}>
                 <img src="/battle/sakura.png" alt="Sakura" className="w-full h-full object-cover scale-150 origin-top" />
              </motion.div>
              <AnimatePresence>
                {sakuraNotes.map(note => (
                  <motion.div key={note.id} className="absolute top-0 right-0 text-pink-200 font-bold text-lg md:text-2xl drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] pointer-events-none" initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }} animate={{ opacity: 1, x: 100 + note.x * 3, y: -50 + note.y, scale: 1.5 }} exit={{ opacity: 0, y: -100 + note.y }} transition={{ duration: 1 }}>♪</motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex flex-col">
              <span className="font-noto font-bold text-cyan-50 text-[10px] md:text-sm drop-shadow-md">朔良</span>
            </div>
          </div>

          {/* Right: Action Commands */}
          <div className="flex items-center justify-start gap-3 md:gap-6">
            
            {/* Heal Button */}
            <button
              onClick={handleHeal}
              disabled={healCooldown > 0 || battlePhase !== 'fighting'}
              className={`relative w-14 h-16 md:w-20 md:h-22 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden border ${
                healCooldown > 0
                  ? 'bg-slate-800/60 text-slate-500 border-slate-600/30 cursor-not-allowed'
                  : 'bg-gradient-to-b from-emerald-500/20 to-emerald-900/80 text-emerald-100 border-emerald-400/50 hover:bg-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.5)] active:scale-95 cursor-pointer'
              }`}
            >
              {healCooldown > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 transition-all duration-100" style={{ height: `${(healCooldown / HEAL_COOLDOWN) * 100}%` }} />
              )}
              <span className="font-noto font-bold text-[10px] md:text-xs relative z-10 mb-1">回復</span>
              <span className="font-noto text-[8px] md:text-[10px] opacity-80 relative z-10 bg-slate-950/50 px-2 py-0.5 rounded-full">CD: {healCooldown > 0 ? `${(healCooldown / 1000).toFixed(0)}s` : 'OK'}</span>
            </button>

            {/* Mutsunori Ultimate Button */}
            <button
              onClick={handleUltimate}
              disabled={syncRate < SYNC_COST_ULTIMATE || battlePhase !== 'fighting' || allies.find(a => a.id === 'mutsunori')?.isDead}
              className={`relative w-16 h-18 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden border z-10 ${
                syncRate < SYNC_COST_ULTIMATE || allies.find(a => a.id === 'mutsunori')?.isDead
                  ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border-slate-600/30'
                  : 'bg-gradient-to-b from-cyan-400/20 to-cyan-900/90 text-cyan-50 border-cyan-300/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] active:scale-95 cursor-pointer'
              }`}
            >
              {syncRate >= SYNC_COST_ULTIMATE && (
                <motion.div className="absolute inset-0 bg-gradient-to-t from-cyan-400/40 to-transparent pointer-events-none" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
              <span className="font-noto font-black text-[10px] md:text-sm relative z-10 text-cyan-100 drop-shadow-md text-center leading-tight mb-1">睦典<br/>必殺技</span>
              <span className={`font-noto text-[8px] md:text-[10px] relative z-10 px-2 py-0.5 rounded-full ${syncRate >= SYNC_COST_ULTIMATE ? 'bg-cyan-600/80 text-cyan-50 font-bold' : 'bg-slate-950/50 text-slate-400'}`}>
                Cost: 100
              </span>
            </button>
            
            {/* ─── Anomaly Absorption Slots ─── */}
            <div className="flex flex-col gap-1 ml-2 md:ml-6 relative">
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-noto text-[10px] font-bold text-cyan-200 tracking-wider">ANOMALY SLOTS</span>
                <span className={`font-noto text-[10px] font-bold px-2 rounded-full ${isOverCost ? 'bg-red-500/80 text-white animate-pulse' : 'bg-slate-800 text-slate-300'}`}>
                  COST: {totalCost}/{MAX_ANOMALY_COST}
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map(i => {
                  const fragId = activeFragments[i];
                  const frag = fragId ? ANOMALY_FRAGMENTS[fragId] : null;
                  return (
                    <div 
                      key={i} 
                      onClick={() => handleUnequipFragment(i)}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                        frag ? `${frag.color} ${frag.border} ${frag.glow}` : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-700'
                      } ${isOverCost && frag ? 'animate-shake' : ''}`}
                      title={frag ? `${frag.name} (Cost: ${frag.cost})\n${frag.desc}\nクリックで外す` : '空きスロット'}
                    >
                      {frag ? <span className="text-xl md:text-2xl drop-shadow-md">{frag.icon}</span> : <span className="text-slate-600 text-xs">-</span>}
                    </div>
                  );
                })}
                <button 
                  onClick={() => setShowInventory(!showInventory)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                    showInventory ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="インベントリを開く"
                >
                  <span className="text-sm font-bold block relative">
                    📦
                    {inventoryFragments.length > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[8px] px-1 rounded-full">{inventoryFragments.length}</span>
                    )}
                  </span>
                </button>
              </div>

              {/* Inventory Popup */}
              <AnimatePresence>
                {showInventory && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-[110%] right-0 w-[280px] bg-slate-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-xl p-3 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50"
                  >
                    <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
                      <span className="font-noto font-bold text-cyan-200 text-sm">拾得した欠片</span>
                      <button onClick={() => setShowInventory(false)} className="text-slate-400 hover:text-white">✕</button>
                    </div>
                    {inventoryFragments.length === 0 ? (
                      <div className="text-center text-slate-500 text-xs py-4">
                        欠片を持っていません。<br/>敵を攻撃して確率でドロップします。
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                        {inventoryFragments.map((id, index) => {
                          const frag = ANOMALY_FRAGMENTS[id];
                          return (
                            <div 
                              key={`${id}-${index}`} 
                              onClick={() => handleEquipFragment(id)}
                              className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 cursor-pointer border border-transparent hover:border-cyan-500/50 transition-all group"
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${frag.color} ${frag.border} border`}>
                                {frag.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                  <span className="font-noto font-bold text-slate-200 text-xs truncate group-hover:text-cyan-200">{frag.name}</span>
                                  <span className="text-[10px] text-amber-200 font-bold bg-amber-900/30 px-1.5 rounded">Cost: {frag.cost}</span>
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">{frag.desc}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
           VICTORY / DEFEAT
         ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(battlePhase === 'victory' || battlePhase === 'defeat') && (
          <motion.div className="absolute inset-0 z-[60] flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className={`absolute inset-0 ${battlePhase === 'victory' ? 'bg-slate-900/80 backdrop-blur-sm' : 'bg-red-950/80 backdrop-blur-sm'}`} />
            <motion.div className="relative z-10 text-center" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className={`font-noto text-4xl md:text-6xl font-black tracking-[0.3em] ${battlePhase === 'victory' ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 drop-shadow-[0_0_30px_rgba(165,243,252,0.5)]' : 'text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-orange-300 drop-shadow-[0_0_30px_rgba(248,113,113,0.5)]'}`}>
                {battlePhase === 'victory' ? 'VICTORY' : 'DEFEAT'}
              </h2>
              <button onClick={handleResultClose} className={`mt-10 px-10 py-4 font-noto font-bold text-sm tracking-[0.3em] rounded-full border transition-all duration-300 hover:-translate-y-1 ${battlePhase === 'victory' ? 'bg-cyan-900/50 border-cyan-300/60 text-cyan-100 hover:bg-cyan-600/50 hover:shadow-[0_0_20px_rgba(103,232,249,0.5)]' : 'bg-red-900/50 border-red-300/60 text-red-100 hover:bg-red-600/50 hover:shadow-[0_0_20px_rgba(248,113,113,0.5)]'}`}>
                {battlePhase === 'victory' ? 'CONTINUE' : 'RETURN'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
