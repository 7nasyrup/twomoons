import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpriteAnimator from './SpriteAnimator';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS & TUNING
// ═══════════════════════════════════════════════════════════════════════════════
const TURN_DELAY = 1000;              // Delay between turns (ms)
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
  { type: 'normal', hits: 1, duration: 1500, label: '通常攻撃' },
  { type: 'fast', hits: 1, duration: 800, label: '高速攻撃' },
  { type: 'double', hits: 2, duration: 1000, label: '連続攻撃' },
  { type: 'triple', hits: 3, duration: 900, label: '三連撃' },
  { type: 'quad', hits: 4, duration: 800, label: '四連撃' },
  { type: 'delayed', hits: 1, duration: 2500, label: 'ディレイ攻撃' },
];

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
  
  const [guardingAllies, setGuardingAllies] = useState(new Set());
  const [healCooldown, setHealCooldown] = useState(0);
  const [buffTurnsLeft, setBuffTurnsLeft] = useState(0);
  const [guardCooldownTrigger, setGuardCooldownTrigger] = useState({ mutsunori: 0, nagisa: 0 });
  
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

  const gameLoopRef = useRef(null);
  const lastTickRef = useRef(0);
  const hitStopRef = useRef(0);
  const guardCooldownsRef = useRef({ mutsunori: 0, nagisa: 0 });
  const stateRef = useRef({ allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, buffTurnsLeft });

  useEffect(() => {
    stateRef.current = { allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, buffTurnsLeft };
  }, [allies, enemies, currentAttack, guardingAllies, syncRate, battlePhase, turnPhase, currentTurnIndex, counterAttack, buffTurnsLeft]);

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
      const rawDt = timestamp - lastTickRef.current;
      lastTickRef.current = timestamp;
      
      if (rawDt > 200) { gameLoopRef.current = requestAnimationFrame(tick); return; } 
      
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
                
                const target = aliveEnemies.reduce((min, e) => e.hp < min.hp ? e : min, aliveEnemies[0]);
                const baseDmg = ALLY_BASE_DAMAGE + Math.floor(Math.random() * 8);
                const dmg = hasBuff ? Math.floor(baseDmg * 1.5) : baseDmg;
                
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
                if (playSE) playSE('/assets/audio/bgm/+game_sword.mp3');
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
          
          const pattern = ATTACK_PATTERNS[Math.floor(Math.random() * ATTACK_PATTERNS.length)];

          const attack = {
            enemyId: turnId,
            targetId: target.id,
            startTime: now,
            pattern: pattern,
            duration: pattern.duration,
            hitsRemaining: pattern.hits,
            glintFired: false,
            resolved: false
          };
          setCurrentAttack(attack);
          if (enemy) addLog(`⚠ ${enemy.name} が ${target.name} を狙っている！ [${pattern.label}]`);
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
        
        // Trigger Glint (Optional UI marker)
        if (elapsed >= Math.max(0, attack.duration - 500) && !attack.glintFired) {
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
            const hasBuff = stateRef.current.buffTurnsLeft > 0;
            const isGuarding = currentGuards.has(attack.targetId);
            let dmg = ENEMY_BASE_DAMAGE + Math.floor(Math.random() * 10);
            
            if (hasBuff) {
              dmg = Math.floor(dmg * 0.8);
            }
            
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
          
          if (attack.hitsRemaining > 1) {
            // Setup next hit in the combo
            setCurrentAttack({
              ...attack,
              startTime: now,
              hitsRemaining: attack.hitsRemaining - 1,
              glintFired: false,
              resolved: false
            });
          } else {
            setCurrentAttack(null);
            setTurnPhase('enemy_resolve');
            setTurnTimer(150); // Visual step forward duration (snappy!)
          }
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
        stateRef.current.counterAttack = null;
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
    const nowTime = Date.now();
    if (nowTime - guardCooldownsRef.current[allyId] < 800) {
      // Cooldown active, ignore input to prevent mashing
      return;
    }
    
    const attack = stateRef.current.currentAttack;
    let parrySuccess = false;

    if (stateRef.current.turnPhase === 'enemy_windup' && attack && attack.targetId === allyId) {
      const elapsed = Date.now() - attack.startTime;
      
      // Parry window is active just before the attack hits until slightly after
      const parryStart = attack.duration - 150;
      const parryEnd = attack.duration + 50;
      
      if (elapsed >= parryStart && elapsed <= parryEnd) {
        // PARRY!
        parrySuccess = true;
        hitStopRef.current = 150; // Hit stop effect
        if (playSE) playSE('/assets/audio/bgm/+parry.mp3');
        setParryFlash(true);
        setTimeout(() => setParryFlash(false), 500);
        triggerSakuraNote();
        addSync(SYNC_PER_PARRY);
        
        if (attack.hitsRemaining > 1) {
          // Not the last hit, combo continues!
          const nextAttack = {
            ...attack,
            startTime: Date.now(), // next hit starts immediately
            hitsRemaining: attack.hitsRemaining - 1,
            glintFired: false,
            resolved: false
          };
          setCurrentAttack(nextAttack);
          stateRef.current.currentAttack = nextAttack; // sync update for tick()
          
          const ally = stateRef.current.allies.find(a => a.id === allyId);
          addLog(`✨ ${ally?.name} が弾いた！ さらに追撃が来る！`);
        } else {
          // Last hit parried!
          setCurrentAttack(null);
          stateRef.current.currentAttack = null; // sync update for tick()
          
          setEnemies(prev => prev.map(e => {
            if (e.id === attack.enemyId) {
              return { ...e, isStunned: true };
            }
            return e;
          }));
          
          const ally = stateRef.current.allies.find(a => a.id === allyId);
          addLog(`✨ パリィ成功！ ${ally?.name} が敵の連携をすべて弾き返した！`);
          
          // Set up counter-attack
          setCounterAttack({ allyId: allyId, enemyId: attack.enemyId });
          stateRef.current.counterAttack = { allyId: allyId, enemyId: attack.enemyId };
          setTurnPhase('counter_attack');
          stateRef.current.turnPhase = 'counter_attack';
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
        const dmg = 250 + Math.floor(Math.random() * 20);
        
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

  const handleNagisaUltimate = useCallback(() => {
    if (syncRate < SYNC_COST_ULTIMATE || stateRef.current.battlePhase !== 'fighting') return;
    
    const nagisa = allies.find(a => a.id === 'nagisa');
    if (!nagisa || nagisa.isDead) return;

    setSyncRate(0);
    setDuetCutin({ allyId: nagisa.id, name: nagisa.name, image: nagisa.cutinImage });
    
    setUltimateFlash(true);
    triggerSakuraNote();
    
    // 必殺技中は戦闘時間を2.5秒間完全に停止させる
    hitStopRef.current = 2500;

    setTimeout(() => {
      setShakeActive(true);
      setEnemies(prev => prev.map(e => {
        if (e.isDead) return e;
        const dmg = 120 + Math.floor(Math.random() * 10);
        spawnDamageNumber(e.id, dmg, 'ultimate');
        return { ...e, hp: Math.max(0, e.hp - dmg), flashTimer: 800, isDead: e.hp - dmg <= 0, isStunned: true };
      }));
      setCurrentAttack(null);
      addLog(`★★ 凪砂の必殺技！ 制圧射撃で敵全体をスタン！ ★★`);
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
    <div className={`absolute inset-0 w-full h-full bg-[#0a0f18] overflow-hidden select-none z-50 flex flex-col font-noto ${shakeActive ? 'animate-battle-shake' : ''}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/battle/sougen.jpeg" alt="background" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40 backdrop-blur-[2px]" />
      </div>

      {/* ── INTRO ── */}
      <AnimatePresence>
        {battlePhase === 'intro' && (
          <motion.div className="absolute inset-0 z-[60] flex items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
              <div className="font-noto text-xs tracking-[0.4em] text-cyan-200/80 mb-3">SYNCHRONIC VOCAL BATTLE</div>
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

      {/* ═══════════════════════════════════════════════════════════════
           TOP HUD (Status & Timeline)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-slate-900/80 to-transparent z-40 pointer-events-none flex flex-col">
        {/* Timeline */}
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
        
        {/* Enemy HP Bars (moved to sprites) */}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           BATTLE FIELD
         ═══════════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex items-stretch px-2 md:px-8 pt-20 pb-32 z-10 overflow-hidden">
        
        {/* ── Allies (Left Column) ── */}
        <div className="w-1/2 flex flex-col justify-around items-center pr-4">
          {allies.map(ally => {
            const isTargeted = targetedAllies.has(ally.id);
            const attackInfo = activeAttacksCompat.find(a => a.targetId === ally.id);
            const isGuarding = guardingAllies.has(ally.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === ally.id && turnPhase !== 'turn_delay';
            
            return (
              <div key={ally.id} className="relative flex flex-col items-center w-full">
                {/* Status Bar */}
                <div className="w-24 md:w-32 mb-2 z-20 flex flex-col gap-1">
                  <div className="flex justify-end items-center px-1">
                    <span className="font-noto font-bold text-[8px] md:text-[10px] text-slate-100 drop-shadow-md">{ally.hp}/{ally.maxHp}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900/60 rounded-full overflow-hidden backdrop-blur-sm shadow-sm">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-300 transition-all duration-300 shadow-[0_0_5px_rgba(34,211,238,0.5)]" style={{ width: `${(ally.hp / ally.maxHp) * 100}%` }} />
                  </div>
                </div>

                {/* Ally Portrait (Interactable) */}
                <motion.div
                  className={`relative cursor-pointer touch-none flex items-center justify-center transition-all duration-200
                    ${ally.id === 'nagisa' ? 'w-[140px] h-[186px] md:w-[180px] md:h-[230px]' : 'w-28 h-36 md:w-36 md:h-48'}
                    ${ally.isDead ? 'opacity-40 grayscale' : ''}
                  `}
                  animate={{ x: isCurrentTurn && turnPhase === 'ally_attack' ? 30 : 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                  onPointerDown={() => handlePointerDown(ally.id)}
                  onPointerUp={() => handlePointerUp(ally.id)}
                  onPointerLeave={() => handlePointerUp(ally.id)}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {/* Warning Line Effect (Targeted) */}
                  {isTargeted && !ally.isDead && attackInfo && (
                    <motion.div 
                      className="absolute top-1/2 -right-64 md:-right-96 w-64 md:w-96 h-1 bg-gradient-to-l from-transparent via-red-500 to-red-500 z-10 origin-right"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: [0.8, 0.4, 0.8] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    />
                  )}

                  {/* Target Highlight & Shrinking Circle (Osu! Style) */}
                  {isTargeted && !ally.isDead && attackInfo && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-40">
                      {/* Inner Target Circle (Red) */}
                      <div className="absolute w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full border-[3px] border-red-400 bg-red-400/20 shadow-[0_0_15px_rgba(248,113,113,0.6)]" />
                      {/* Shrinking Outer Circle */}
                      <motion.div
                        key={attackInfo.startTime}
                        className="absolute w-[225px] h-[225px] md:w-[275px] md:h-[275px] rounded-full border-[3px] shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                        initial={{ scale: 1, opacity: 0, borderColor: '#ffffff' }}
                        animate={{ scale: 0.4, opacity: 1, borderColor: '#f87171' }}
                        transition={{ duration: attackInfo.duration / 1000, ease: 'linear' }}
                      />
                    </div>
                  )}

                  {/* Guard Shield Effect */}
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
                  
                  {/* Buff Aura Effect */}
                  {buffTurnsLeft > 0 && !ally.isDead && (
                    <motion.div 
                      className="absolute inset-[-10px] rounded-2xl border-2 border-pink-300/60 pointer-events-none z-10"
                      animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.05, 1], boxShadow: ['0 0 10px rgba(244,114,182,0.2)', '0 0 25px rgba(244,114,182,0.6)', '0 0 10px rgba(244,114,182,0.2)'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  
                  {/* Guard Cooldown Indicator (Visual Overlay) */}
                  <AnimatePresence>
                    {guardCooldownTrigger[ally.id] && !ally.isDead && (
                      <motion.div
                        key={`cd-${guardCooldownTrigger[ally.id]}`}
                        className="absolute inset-0 bg-slate-900/60 rounded-2xl flex items-center justify-center z-30 pointer-events-none"
                        initial={{ height: '100%' }}
                        animate={{ height: 0 }}
                        transition={{ duration: 0.8, ease: 'linear' }}
                      >
                      </motion.div>
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

        {/* ── Enemies (Right Column) ── */}
        <div className="w-1/2 flex flex-col justify-around items-center pl-4">
          {enemies.map(enemy => {
            const isAttacking = activeAttacksCompat.some(a => a.enemyId === enemy.id);
            const isCurrentTurn = TURN_ORDER[currentTurnIndex % TURN_ORDER.length] === enemy.id && turnPhase !== 'turn_delay';

            return (
              <div key={enemy.id} className="relative flex flex-col items-center w-full z-20">
                {/* Status Bar */}
                <div className="w-28 md:w-36 mb-2 z-20 flex flex-col">
                  <div className="w-full h-1.5 bg-slate-900/60 rounded-full overflow-hidden backdrop-blur-sm shadow-sm">
                    <div className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
                  </div>
                </div>

                {/* Enemy Body */}
                <motion.div 
                  className={`relative w-28 h-36 md:w-36 md:h-48 flex items-center justify-center transition-all duration-200 ${
                    enemy.isDead ? 'opacity-30 grayscale'
                    : enemy.flashTimer > 0 ? 'animate-battle-hit-flash'
                    : ''
                  }`}
                  animate={{ x: isCurrentTurn && turnPhase === 'enemy_resolve' ? -30 : 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut' }}
                >
                  
                  {/* Enemy Image */}
                  <img src={enemy.image} alt={enemy.name} className={`w-full h-full object-contain drop-shadow-[0_0_15px_rgba(244,63,94,0.3)] ${enemy.isStunned ? 'opacity-60 blur-[2px]' : ''}`} />

                  {/* Stun Indicator */}
                  {enemy.isStunned && !enemy.isDead && (
                    <motion.div className="absolute -top-4 font-noto text-[10px] text-amber-200 font-bold bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-500/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                      STUNNED
                    </motion.div>
                  )}
                  {/* Attack Indicator */}
                  {isAttacking && !enemy.isDead && (
                    <motion.div className="absolute inset-[-15px] rounded-full border-[3px] border-red-400/60 border-dotted" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                  )}
                </motion.div>

                {/* Damage Numbers */}
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
        
        {/* EXIT button */}
        <button onClick={handleResultClose} className="absolute top-4 right-4 md:top-6 md:right-6 px-4 py-2 bg-slate-900/60 backdrop-blur-sm border border-slate-600/50 text-slate-300 font-noto text-xs tracking-widest rounded-full hover:border-cyan-300/50 hover:text-cyan-100 transition-all z-30">
          EXIT
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           BOTTOM HUD (Sakura, Commands, Cards)
         ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-0 inset-x-0 h-[15vh] md:h-[18vh] bg-slate-900/40 backdrop-blur-md border-t border-slate-700/50 z-40 flex flex-row items-center justify-between px-2 md:px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Left: Sakura & Sync */}
        <div className="flex items-center gap-2 md:gap-4 w-[30%]">
          <div className="relative">
            <motion.div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-cyan-200/80 shadow-[0_0_15px_rgba(165,243,252,0.4)] bg-slate-800 flex items-center justify-center" animate={sakuraSinging ? { scale: [1, 1.05, 1], borderColor: ['rgba(165,243,252,0.8)', 'rgba(244,114,182,0.8)', 'rgba(165,243,252,0.8)'] } : {}} transition={{ duration: 1, repeat: Infinity }}>
               {/* Sakura mini portrait */}
               <img src="/battle/sakura.png" alt="Sakura" className="w-full h-full object-cover scale-150 origin-top" />
            </motion.div>
            {/* Note Effects from Sakura */}
            <AnimatePresence>
              {sakuraNotes.map(note => (
                <motion.div
                  key={note.id}
                  className="absolute top-0 right-0 text-pink-200 font-bold text-lg md:text-2xl drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] pointer-events-none"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: 100 + note.x * 3, y: -50 + note.y, scale: 1.5 }}
                  exit={{ opacity: 0, y: -100 + note.y }}
                  transition={{ duration: 1 }}
                >
                  ♪
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex flex-col">
            <span className="font-noto font-bold text-cyan-50 text-[10px] md:text-sm drop-shadow-md">朔良</span>
            <div className="flex items-center gap-1">
              <span className="font-noto font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-pink-200 text-sm md:text-xl italic">
                {Math.floor(syncRate)}%
              </span>
              <span className="font-noto text-[8px] md:text-[10px] text-cyan-200/60 mt-1">SYNC</span>
            </div>
          </div>
        </div>

        {/* Center & Right: Action Commands */}
        <div className="flex flex-1 items-center justify-end md:justify-center gap-4 md:gap-8 pr-4 md:pr-12">
          
          {/* Heal Button */}
          <button
            onClick={handleHeal}
            disabled={healCooldown > 0 || battlePhase !== 'fighting'}
            className={`relative w-14 h-14 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden ${
              healCooldown > 0
                ? 'bg-slate-800/60 text-slate-500 border border-slate-600/30 cursor-not-allowed'
                : 'bg-gradient-to-b from-emerald-500/20 to-emerald-900/80 text-emerald-100 border border-emerald-400/50 hover:bg-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.5)] active:scale-95 cursor-pointer'
            }`}
          >
            {healCooldown > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-slate-900/60 transition-all duration-100" style={{ height: `${(healCooldown / HEAL_COOLDOWN) * 100}%` }} />
            )}
            <span className="font-noto font-bold text-[10px] md:text-xs relative z-10">回復</span>
            <span className="font-noto text-[8px] md:text-[10px] opacity-80 relative z-10">{healCooldown > 0 ? `${(healCooldown / 1000).toFixed(0)}s` : 'HEAL'}</span>
          </button>

          {/* Mutsunori Ultimate */}
          <button
            onClick={handleMutsunoriUltimate}
            disabled={syncRate < SYNC_COST_ULTIMATE || battlePhase !== 'fighting' || allies.find(a => a.id === 'mutsunori')?.isDead}
            className={`relative w-16 h-16 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden ${
              syncRate < SYNC_COST_ULTIMATE || allies.find(a => a.id === 'mutsunori')?.isDead
                ? 'bg-slate-800/60 text-slate-500 border border-slate-600/30 cursor-not-allowed'
                : 'bg-gradient-to-b from-cyan-400/20 to-cyan-900/80 text-cyan-50 border border-cyan-300/60 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] active:scale-95 cursor-pointer'
            }`}
          >
            <span className="font-noto font-black text-[10px] md:text-sm relative z-10 text-cyan-100 drop-shadow-md">睦典<br/>必殺技</span>
            {syncRate >= SYNC_COST_ULTIMATE && (
              <motion.div className="absolute inset-0 bg-gradient-to-t from-cyan-400/40 to-transparent pointer-events-none" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
            )}
          </button>

          {/* Nagisa Ultimate */}
          <button
            onClick={handleNagisaUltimate}
            disabled={syncRate < SYNC_COST_ULTIMATE || battlePhase !== 'fighting' || allies.find(a => a.id === 'nagisa')?.isDead}
            className={`relative w-16 h-16 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden ${
              syncRate < SYNC_COST_ULTIMATE || allies.find(a => a.id === 'nagisa')?.isDead
                ? 'bg-slate-800/60 text-slate-500 border border-slate-600/30 cursor-not-allowed'
                : 'bg-gradient-to-b from-pink-400/20 to-pink-900/80 text-pink-50 border border-pink-300/60 hover:shadow-[0_0_25px_rgba(244,114,182,0.6)] active:scale-95 cursor-pointer'
            }`}
          >
            <span className="font-noto font-black text-[10px] md:text-sm relative z-10 text-pink-100 drop-shadow-md">凪砂<br/>必殺技</span>
            {syncRate >= SYNC_COST_ULTIMATE && (
              <motion.div className="absolute inset-0 bg-gradient-to-t from-pink-400/40 to-transparent pointer-events-none" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
            )}
          </button>

          {/* Buff Button */}
          <button
            onClick={handleBuff}
            disabled={syncRate < SYNC_COST_BUFF || battlePhase !== 'fighting'}
            className={`relative w-14 h-14 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center transition-all overflow-hidden ${
              syncRate < SYNC_COST_BUFF
                ? 'bg-slate-800/60 text-slate-500 border border-slate-600/30 cursor-not-allowed'
                : 'bg-gradient-to-b from-amber-400/20 to-amber-900/80 text-amber-100 border border-amber-300/50 hover:bg-amber-500/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] active:scale-95 cursor-pointer'
            }`}
          >
            <span className="font-noto font-bold text-[10px] md:text-xs relative z-10">強化</span>
            <span className="font-noto text-[8px] md:text-[10px] opacity-80 relative z-10">{syncRate < SYNC_COST_BUFF ? `${Math.floor(syncRate)}/30` : buffTurnsLeft > 0 ? `${buffTurnsLeft}T` : 'READY'}</span>
            {buffTurnsLeft > 0 && (
              <motion.div className="absolute inset-[-4px] border-2 border-amber-300/80 rounded-2xl pointer-events-none" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />
            )}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
           VICTORY / DEFEAT
         ═══════════════════════════════════════════════════════════════ */}
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
