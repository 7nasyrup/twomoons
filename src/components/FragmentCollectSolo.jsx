import React, { useState, useEffect, useRef, useCallback } from 'react';
import FCDialogueBox from './FCDialogueBox';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, FileText, ArrowLeftRight, Clock, Sparkles, Circle, CheckCircle2 } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

// ─── 研究所エリア定義 ────────────────────────────────────────────────────────────
const ROOMS = [
  { id: 'lab1', name: 'エリア01 ／ 入口実験室', bg: '/scene/fragment_collect/laboratory1.jpg' },
  { id: 'lab2', name: 'エリア02 ／ 検体保管室', bg: '/scene/fragment_collect/The-Scary-Laboratory1.jpg' },
  { id: 'lab3', name: 'エリア03 ／ クローニング区画', bg: '/scene/fragment_collect/cloning-laboratory3.jpg' },
  { id: 'lab4', name: 'エリア04 ／ 管制塔コア', bg: '/scene/fragment_collect/Spacecraft-laboratory2.jpg' },
];

// ─── チップ取得時（朔良の内心モノローグ） ────────────────────────────────────────
const SOLO_CHIP = [
  [
    { speaker: null, role: 'SYSTEM', text: 'セキュリティコードの断片を入手した。' },
    { speaker: '朔良', role: 'SAKURA', text: '「……よし。これで一つ。急がないと」' },
  ],
  [
    { speaker: null, role: 'SYSTEM', text: 'セキュリティコードの断片を入手した。' },
    { speaker: '朔良', role: 'SAKURA', text: '「……静かすぎて、かえって怖い。でも、止まれない」' },
  ],
  [
    { speaker: null, role: 'SYSTEM', text: 'セキュリティコードの断片を入手した。' },
    { speaker: '朔良', role: 'SAKURA', text: '「（もうすぐだ。もうすぐ……）」' },
  ],
  [
    { speaker: null, role: 'SYSTEM', text: 'セキュリティコードの断片を入手した。' },
    { speaker: '朔良', role: 'SAKURA', text: '「……ッ、これで全部揃った。ゲートを開けられる」' },
  ],
];

// ─── ファイル取得時のモノローグ ──────────────────────────────────────────────────
const SOLO_FILE = [
  [{ speaker: '朔良', role: 'SAKURA', text: '「機密ファイル……。後で確認しよう」' }],
  [{ speaker: '朔良', role: 'SAKURA', text: '「……これ、重要な情報かもしれない。しっかり読まないと」' }],
  [{ speaker: '朔良', role: 'SAKURA', text: '「……こんなことが、ここで行われていたなんて」' }],
  [{ speaker: '朔良', role: 'SAKURA', text: '「……知らなかった。知りたくなかった、かもしれない。でも、知らないままじゃダメだ」' }],
];

// ─── ゲート解錠時 ─────────────────────────────────────────────────────────────
const SOLO_GATE = [
  { speaker: '朔良', role: 'SAKURA', text: '「──よしっ、これで全部！　ゲートを開けられる」' },
];

// ─── 各エリアのアイテム配置 ──────────────────────────────────────────────────────
const ROOM_ITEMS = {
  lab1: {
    chips: [
      { id: 'chip_1', pos: { top: '45%', left: '28%' }, label: 'コード断片①' },
    ],
    files: [
      {
        id: 'file_1',
        pos: { top: '62%', left: '65%' },
        label: '機密ファイル 01',
        messages: [
          {
            speaker: 'システム', role: 'SYSTEM',
            text: '【機密ファイル 01 ／ 月面研究所：設立の目的と経緯】'
          },
          {
            speaker: null, role: null,
            text: '月面研究所（正式名称：LUNA-CORE RESEARCH FACILITY）は、地球エネルギー危機への対応策として、約二十年前に秘密裏に設立された。\n表向きは「月面資源採掘」のための施設であるが、その実態は——'
          },
          {
            speaker: null, role: null,
            text: '人類の異能適応可能性を研究し、エネルギー生成に転用するための「実験場」であった。\n施設の中核たる《コア》は、適応者の異能エネルギーを吸収・増幅・変換するデバイスとして設計されており、初期の実験体は「志願者」として扱われた。\n\n（余白の走り書き）「今は誰も、自分の意志でここにはいない」'
          },
        ],
      },
    ],
  },

  lab2: {
    chips: [
      { id: 'chip_2', pos: { top: '38%', left: '20%' }, label: 'コード断片②' },
      { id: 'chip_3', pos: { top: '55%', left: '75%' }, label: 'コード断片③' },
    ],
    files: [
      {
        id: 'file_2',
        pos: { top: '30%', left: '50%' },
        label: '機密ファイル 02',
        messages: [
          {
            speaker: 'システム', role: 'SYSTEM',
            text: '【機密ファイル 02 ／ キメラ生成プロセス：事故報告書】'
          },
          {
            speaker: null, role: null,
            text: '重大事故報告 ／ 優先度：最高。\n適応者の異能エネルギーをコアへ注入する実験中に、エネルギーの逆流・汚染が発生。\n逆流した異能エネルギーが周辺の生体試料と融合・変異し、制御不能な生命体——【キメラ】が生成されることが確認された。'
          },
          {
            speaker: null, role: null,
            text: 'キメラは高い攻撃性と環境適応能力を持ち、施設内への封じ込めが困難になりつつある。\n\n上層部の対応（内部メモ）：\n「外部への流出は情報統制で処理。被験者の損耗は『消耗品の誤差』として処理。研究は継続せよ」'
          },
        ],
      },
    ],
  },

  lab3: {
    chips: [
      { id: 'chip_4', pos: { top: '50%', left: '35%' }, label: 'コード断片④' },
    ],
    files: [
      {
        id: 'file_3',
        pos: { top: '35%', left: '68%' },
        label: '機密ファイル 03',
        messages: [
          {
            speaker: 'システム', role: 'SYSTEM',
            text: '【機密ファイル 03 ／ コア暴走の予測シナリオ】'
          },
          {
            speaker: null, role: null,
            text: 'コアに蓄積されたエネルギーが臨界値を超えた場合のシミュレーション（機密）。\n\n第一段階：施設周辺の電磁環境が崩壊。通信・航法システムが全滅。\n第二段階：コアが放出するエネルギー波が月面全域に拡散。地球の大気圏外にも影響が及ぶ。\n第三段階：キメラの活動が爆発的に増加。制御不能となった群体が地球へ到達する可能性が浮上。'
          },
          {
            speaker: null, role: null,
            text: '上層部の判断（赤いスタンプ）：\n【対処不能と判定。施設は放棄し、証拠を消去せよ】\n\n（付記・手書き）「……誰も、止めに来てくれないのか」'
          },
        ],
      },
    ],
  },

  lab4: {
    chips: [],
    files: [
      {
        id: 'file_4',
        pos: { top: '58%', left: '25%' },
        label: '機密ファイル 04',
        messages: [
          {
            speaker: 'システム', role: 'SYSTEM',
            text: '【機密ファイル 04 ／ コアの停止条件：唯一の可能性】'
          },
          {
            speaker: null, role: null,
            text: 'コアは異能エネルギーを「吸収する」ことで稼働する。\n逆に、コアが処理できる限界値を超えるエネルギーを「一度に注ぎ込む」ことができれば——過負荷（オーバーロード）による強制停止が可能という仮説が成立する。\n\nただし、コアの許容量は既存の適応者の能力値を大幅に上回っており、単体での達成はほぼ不可能とされていた。'
          },
          {
            speaker: null, role: null,
            text: '付記（最後のページ）：\n「しかし——もし複数の適応者が同時に、あるいは《吸収》という特性を持つ異質な存在が介在するなら。\nその場合に限り、理論的には可能かもしれない。\n\n……後は、頼んだよ」'
          },
        ],
      },
    ],
  },
};

// ─── パーティクルアニメーション ──────────────────────────────────────────────────
const InfoParticle = ({ startX, startY, targetX, targetY, color, onComplete }) => {
  const [style, setStyle] = useState({
    left: startX, top: startY, opacity: 0,
    transform: 'translate(-50%,-50%) scale(0.5)',
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setStyle({
        left: startX, top: startY - 40, opacity: 1,
        transform: 'translate(-50%,-50%) scale(1.5)',
        transition: 'all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
      });
      const t1 = setTimeout(() => {
        setStyle({
          left: targetX, top: targetY, opacity: 0.8,
          transform: 'translate(-50%,-50%) scale(0.3)',
          transition: 'all 0.6s cubic-bezier(0.5,0,0.2,1)',
        });
      }, 300);
      const t2 = setTimeout(onComplete, 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    });
    return () => cancelAnimationFrame(raf);
  }, [startX, startY, targetX, targetY, onComplete]);

  const glow = color === 'green' ? 'rgba(74,222,128,0.8)' : 'rgba(103,232,249,0.8)';
  const bgCol = color === 'green' ? '#4ade80' : '#67e8f9';

  return (
    <div className="fixed z-[100] pointer-events-none flex items-center justify-center" style={style}>
      <div style={{ width: 16, height: 16, borderRadius: '50%', background: bgCol, boxShadow: `0 0 15px 5px ${glow}` }} />
      <div className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />
    </div>
  );
};

// ─── メッセージウィンドウ（朔良ソロ版：キャラ表示なし） ──────────────────────────


// ─── 機密ファイル用 モーダル ──────────────────────────────────────────────────────
function FCFileModal({ file, onClose }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="w-full h-full max-w-2xl flex justify-center items-center pointer-events-none">
        <motion.div
          className="relative w-full max-h-full bg-[#080c14]/95 border border-green-500/30 rounded shadow-[0_0_30px_rgba(74,222,128,0.1)] overflow-hidden flex flex-col pointer-events-auto"
          initial={{ scale: 0.95, y: 20 }} animate={{ scale: isMobile ? 0.85 : 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        >
        <div className="bg-green-950/40 border-b border-green-500/20 px-6 py-4 flex items-center gap-3 shrink-0">
          <FileText className="w-5 h-5 text-green-400" />
          <span className="text-green-100 font-orbitron tracking-widest text-sm">CONFIDENTIAL DATA</span>
        </div>
        <div className="p-8 overflow-y-auto grow custom-scrollbar">
          {file.messages.map((m, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {m.speaker === 'システム' ? (
                <h3 className="text-green-300 font-bold tracking-widest mb-4 border-b border-green-500/30 pb-2 text-base md:text-lg">
                  {m.text.replace('【', '').replace('】', '')}
                </h3>
              ) : (
                <p className="text-gray-300 leading-loose font-noto tracking-wide whitespace-pre-line text-sm md:text-base">
                  {m.text}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="bg-black/40 border-t border-green-500/20 p-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-green-900/50 hover:bg-green-800/60 border border-green-400/30 hover:border-green-400 text-green-200 text-sm font-orbitron tracking-widest transition-all rounded shadow-[0_0_10px_rgba(74,222,128,0.2)]"
          >
            CLOSE
          </button>
        </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── メインコンポーネント（朔良ソロ探索） ────────────────────────────────────────
export default function FragmentCollectSolo({ onComplete, onSave, onLoad, onToggleSkip, onOpenLog, onToggleAuto, skipMode, autoMode }) {
  const [roomIndex, setRoomIndex] = useState(0);
  const [collectedChips, setCollectedChips] = useState(new Set());
  const [collectedFiles, setCollectedFiles] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);
  const [activeFile, setActiveFile] = useState(null);
  const [animations, setAnimations] = useState([]);
  const [pendingParticle, setPendingParticle] = useState(null);
  const [gateUnlocked, setGateUnlocked] = useState(false);
  const [lightX, setLightX] = useState(() => typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const [lightY, setLightY] = useState(() => typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const containerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const xRatio = typeof window !== 'undefined' ? (lightX / window.innerWidth) * 2 - 1 : 0;
  const yRatio = typeof window !== 'undefined' ? (lightY / window.innerHeight) * 2 - 1 : 0;
  const maxPanX = typeof window !== 'undefined' ? window.innerWidth * 0.35 : 0;
  const maxPanY = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 0;

  const totalChips = 4;
  const chipCount = collectedChips.size;
  const fileCount = collectedFiles.size;
  const currentRoom = ROOMS[roomIndex];
  const currentRoomItems = ROOM_ITEMS[currentRoom.id];

  // ─── 全体タイマー ──────────────────────────────────────────────
  useEffect(() => {
    if (gateUnlocked || currentMessage || activeFile || isGameOver || isTransitioning) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timer); setIsGameOver(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gateUnlocked, currentMessage, activeFile, isGameOver, isTransitioning]);

  const getTarget = useCallback((elId, fallbackX) => {
    const el = document.getElementById(elId);
    if (el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
    return { x: fallbackX, y: 40 };
  }, []);

  const triggerParticle = useCallback((sx, sy, type) => {
    setTimeout(() => {
      const t = type === 'chip'
        ? getTarget('fcs-chip-counter', window.innerWidth / 2)
        : getTarget('fcs-file-counter', window.innerWidth / 2 + 120);
      setAnimations(prev => [...prev, {
        id: Date.now() + Math.random(),
        startX: sx, startY: sy, targetX: t.x, targetY: t.y,
        color: type === 'chip' ? 'cyan' : 'green',
      }]);
    }, 50);
  }, [getTarget]);

  const showMessages = useCallback((msgs) => {
    if (!msgs || msgs.length === 0) return;
    setMessageQueue(msgs.slice(1));
    setCurrentMessage(msgs[0]);
    setDisplayedText('');
    setIsTyping(true);
  }, []);

  const handleNextMessage = useCallback(() => {
    if (isTyping) {
      clearInterval(typingTimer.current);
      if (currentMessage) setDisplayedText(currentMessage.text);
      setIsTyping(false);
    } else if (messageQueue.length > 0) {
      setCurrentMessage(messageQueue[0]);
      setMessageQueue(p => p.slice(1));
      setDisplayedText('');
      setIsTyping(true);
    } else {
      setCurrentMessage(null);
      setDisplayedText('');
      setIsTyping(false);
      if (pendingParticle) {
        triggerParticle(pendingParticle.sx, pendingParticle.sy, pendingParticle.type);
        setPendingParticle(null);
      }
    }
  }, [isTyping, currentMessage, messageQueue, pendingParticle, triggerParticle]);

  // ─── タイピングエフェクト ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!currentMessage) { setDisplayedText(''); setIsTyping(false); return; }
    clearInterval(typingTimer.current);
    setDisplayedText('');
    setIsTyping(true);
    let str = '';
    typingTimer.current = setInterval(() => {
      if (str.length < currentMessage.text.length) {
        str += currentMessage.text.charAt(str.length);
        setDisplayedText(str);
      } else {
        clearInterval(typingTimer.current);
        setDisplayedText(currentMessage.text);
        setIsTyping(false);
      }
    }, 25);
    return () => clearInterval(typingTimer.current);
  }, [currentMessage]);

  // ─── キーボードサポート ──────────────────────────────────────────────────────────
  useEffect(() => {
    const h = (e) => {
      if (currentMessage && (e.key === 'Enter' || e.key === ' ')) {
        handleNextMessage();
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [currentMessage, handleNextMessage]);

  // ─── 部屋移動 ────────────────────────────────────────────────────────────────────
  const moveRoom = (dir) => {
    if (isTransitioning || currentMessage || activeFile || isGameOver) return;
    const next = roomIndex + dir;
    if (next < 0 || next >= ROOMS.length) return;
    setIsTransitioning(true);
    setIsBlackout(true);
    setTimeout(() => { setRoomIndex(next); setIsBlackout(false); }, 300);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // ─── チップクリック ──────────────────────────────────────────────────────────────
  const handleChipClick = (chip, e) => {
    e.stopPropagation();
    if (currentMessage || isTransitioning || activeFile || isGameOver || collectedChips.has(chip.id)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    const nextCount = chipCount + 1;
    setCollectedChips(p => new Set([...p, chip.id]));
    setPendingParticle({ sx, sy, type: 'chip' });
    const lv = Math.min(chipCount, SOLO_CHIP.length - 1);
    const msgs = SOLO_CHIP[lv];
    if (nextCount >= totalChips) {
      showMessages([...msgs, ...SOLO_GATE]);
      setTimeout(() => setGateUnlocked(true), 4000);
    } else {
      showMessages(msgs);
    }
  };

  // ─── ファイルクリック ─────────────────────────────────────────────────────────────
  const handleFileClick = (file, e) => {
    e.stopPropagation();
    if (currentMessage || isTransitioning || activeFile || isGameOver || collectedFiles.has(file.id)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    setCollectedFiles(p => new Set([...p, file.id]));
    setPendingParticle({ sx, sy, type: 'file' });
    setActiveFile(file);
  };

  // ─── ファイルモーダルを閉じる ─────────────────────────────────────────────────────
  const closeActiveFile = () => {
    setActiveFile(null);
    const lv = Math.min(collectedFiles.size - 1, SOLO_FILE.length - 1);
    showMessages(SOLO_FILE[lv] || SOLO_FILE[0]);
  };

  const handleParticleComplete = useCallback((id) => {
    setAnimations(p => p.filter(a => a.id !== id));
  }, []);

  const handlePointerDown = (e) => {
    if (currentMessage || activeFile || isTransitioning || isGameOver || e.target.closest('button')) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e) => {
    if (currentMessage || activeFile || isTransitioning || isGameOver || !isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setLightX(prev => Math.max(0, Math.min(window.innerWidth, prev - dx * 1.5)));
    setLightY(prev => Math.max(0, Math.min(window.innerHeight, prev - dy * 1.5)));
  };

  const renderSpot = (item, type, handler) => {
    const isCollected = type === 'chip' ? collectedChips.has(item.id) : collectedFiles.has(item.id);
    const isChip = type === 'chip';
    return (
      <button
        key={item.id}
        onClick={(e) => handler(item, e)}
        disabled={isCollected}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group"
        style={item.pos}
      >
        <div className={`relative w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${isCollected ? (isChip ? 'border border-cyan-400/50 bg-cyan-500/10' : 'border border-green-400/50 bg-green-500/10') : 'border-2 border-white/60 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:border-white hover:bg-white/30'}`}>
          <Circle className={`w-10 h-10 transition-all duration-500 ${isCollected ? (isChip ? 'text-cyan-400 opacity-50 scale-125' : 'text-green-400 opacity-50 scale-125') : 'text-white opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'}`} strokeWidth={2} />
          {isCollected && <CheckCircle2 className={`absolute w-5 h-5 drop-shadow-md ${isChip ? 'text-cyan-300' : 'text-green-300'}`} strokeWidth={2} />}
        </div>
        {!isCollected && <span className="absolute -bottom-6 text-[10px] text-white/70 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{isChip ? 'CHIP' : 'FILE'}</span>}
      </button>
    );
  };

  return (
    <div className="absolute inset-0 bg-[#030712] z-50 overflow-hidden select-none">
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full select-none z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div style={{ perspective: '1000px' }} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute w-[180%] h-[180%] -left-[40%] -top-[40%] transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${xRatio * -maxPanX}px) translateY(${yRatio * -maxPanY}px) rotateX(${yRatio * -2}deg) rotateY(${xRatio * 4}deg)` }}
          >
            <img src={assetPath(currentRoom.bg)} alt="bg" className="absolute inset-0 w-full h-full object-cover select-none" />
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {currentRoomItems.chips.map(c => renderSpot(c, 'chip', handleChipClick))}
              {currentRoomItems.files.map(f => renderSpot(f, 'file', handleFileClick))}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-30" />
        </div>
      </div>

      {/* 暗転オーバーレイ */}
      <div className={`absolute inset-0 bg-black z-[35] pointer-events-none transition-opacity duration-300 ${isBlackout ? 'opacity-100' : 'opacity-0'}`} />

      {/* ─── HUD上部 ─── */}
      {!currentMessage && !isGameOver && (
        <div className="absolute top-4 lg:top-6 left-0 right-0 z-30 flex items-start justify-between px-2 pr-12 lg:px-8 pointer-events-none">
          <div className="glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <h2 className="text-[10px] lg:text-sm font-bold text-slate-800 tracking-[0.2em]">{currentRoom.name}</h2>
          </div>

          <div className="flex flex-col gap-1.5 lg:gap-2 items-end">
            <div className={`glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3 ${timeLeft <= 30 ? 'border-red-500/50 animate-pulse text-red-500' : 'text-slate-700'}`}>
              <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="text-[11px] lg:text-xs font-orbitron tracking-widest font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div id="fcs-chip-counter" className="glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sky-500" />
              <span className="text-[11px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">CHIP</span>
              <div className="flex items-center gap-1.5 lg:gap-2">
                {Array.from({ length: totalChips }, (_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < chipCount ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]' : 'bg-transparent border-white/30'}`} />
                ))}
              </div>
            </div>
            <div id="fcs-file-counter" className="glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <FileText className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500" />
              <span className="text-[11px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">FILE</span>
              <div className="flex items-center gap-1.5 lg:gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < fileCount ? 'bg-green-400 border-green-300 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-transparent border-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ドラッグ操作チュートリアル */}
      {!currentMessage && !activeFile && !isGameOver && (
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/80 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 rounded-full flex items-center gap-3 pointer-events-none z-30"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <ArrowLeftRight className="w-4 h-4 animate-bounce" />
          DRAG TO EXPLORE
        </motion.div>
      )}

      {/* ─── 左右移動ボタン ─── */}
      {!currentMessage && !isGameOver && (
        <>
          {roomIndex > 0 && (
            <button
              onClick={() => moveRoom(-1)}
              disabled={isTransitioning}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-24 flex items-center justify-center glass-panel rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-200 disabled:opacity-30"
            >
              <ChevronLeft className="w-8 h-8 text-slate-800" />
            </button>
          )}
          {roomIndex < ROOMS.length - 1 && (
            <button
              onClick={() => moveRoom(1)}
              disabled={isTransitioning}
              className="absolute right-12 lg:right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-24 flex items-center justify-center glass-panel rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-200 disabled:opacity-30"
            >
              <ChevronRight className="w-8 h-8 text-slate-800" />
            </button>
          )}
        </>
      )}

      {/* ─── ゲート解錠後の完了ボタン ─── */}
      {gateUnlocked && !currentMessage && (
        <motion.button
          onClick={() => onComplete({ chips: chipCount, files: fileCount })}
          className="absolute bottom-8 right-8 z-30 bg-cyan-900/60 backdrop-blur-sm border border-cyan-400/50 px-6 py-3 rounded-md text-cyan-200 font-orbitron text-sm tracking-widest hover:bg-cyan-700/60 hover:border-cyan-300 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(103,232,249,0.3)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ゲートを開く
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}

      {/* ─── メッセージウィンドウ（スプライトなし） ─── */}
      {!activeFile && (
        <FCDialogueBox
          currentMessage={currentMessage}
          displayedText={displayedText}
          isTyping={isTyping}
          onNext={handleNextMessage}
          onSave={onSave}
          onLoad={onLoad}
          onToggleSkip={onToggleSkip}
          onOpenLog={onOpenLog}
          onToggleAuto={onToggleAuto}
          skipMode={skipMode}
          autoMode={autoMode}
        />
      )}

      {/* ─── 機密ファイルモーダル ─── */}
      <AnimatePresence>
        {activeFile && <FCFileModal file={activeFile} onClose={closeActiveFile} />}
      </AnimatePresence>

      {/* ─── ゲームオーバー ─── */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <h2 className="text-red-500 text-4xl md:text-6xl font-orbitron tracking-[0.3em] font-bold mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
              SYSTEM DOWN
            </h2>
            <p className="text-red-200/80 font-noto tracking-widest mb-12">制限時間を超過しました。通信が途絶しました。</p>
            <button
              onClick={() => {
                setRoomIndex(0);
                setCollectedChips(new Set());
                setCollectedFiles(new Set());
                setGateUnlocked(false);
                setTimeLeft(180);
                setIsGameOver(false);
                setLightX(window.innerWidth / 2);
                setLightY(window.innerHeight / 2);
              }}
              className="px-8 py-3 bg-red-950/50 border border-red-500/50 hover:bg-red-900/80 hover:border-red-400 text-red-100 font-orbitron tracking-widest transition-all rounded shadow-[0_0_15px_rgba(239,68,68,0.3)] pointer-events-auto"
            >
              REBOOT (RETRY)
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── パーティクル ─── */}
      {animations.map(anim => (
        <InfoParticle
          key={anim.id}
          startX={anim.startX}
          startY={anim.startY}
          targetX={anim.targetX}
          targetY={anim.targetY}
          color={anim.color}
          onComplete={() => handleParticleComplete(anim.id)}
        />
      ))}
    </div>
  );
}
