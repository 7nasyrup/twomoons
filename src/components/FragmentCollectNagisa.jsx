import React, { useState, useEffect, useRef, useCallback } from 'react';
import FCDialogueBox from './FCDialogueBox';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Shield, FileText, ArrowLeftRight, Clock, Sparkles, Circle, CheckCircle2 } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

const ROOMS = [
  { id: 'lab1', name: 'エリア01 ／ 入口実験室', bg: '/scene/fragment_collect/laboratory1.jpg' },
  { id: 'lab2', name: 'エリア02 ／ 検体保管室', bg: '/scene/fragment_collect/The-Scary-Laboratory1.jpg' },
  { id: 'lab3', name: 'エリア03 ／ クローニング区画', bg: '/scene/fragment_collect/cloning-laboratory3.jpg' },
  { id: 'lab4', name: 'エリア04 ／ 管制塔コア', bg: '/scene/fragment_collect/Spacecraft-laboratory2.jpg' },
];

const NAGISA_CHIP = [
  [
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_neutral', text: '「コードの断片、確保。……あれ、少し眩暈が」' },
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_neutral', text: '「……いや、少し眩暈がしただけ。問題ないよ」' }
  ],
  [
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「っ──！」' },
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「あれ、音が消えてた……？　いや、僕の油断だ。そう、ただの油断」' }
  ],
  [
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「……君の声が、遠くで響いているみたいに聞こえない」' },
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「今、世界の色が抜けて見えた……。……何でもない、急ごう」' }
  ],
  [
    { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_neutral', text: '「……。とりあえず、先を急ごう」' }
  ]
];

const NAGISA_FILE = [
  [{ speaker: '凪砂', role: '凪砂', illust: 'Nagisa_neutral', text: '「機密ファイル？　ふうん。後で確認してみて」' }],
  [{ speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「……そのファイル。見ない方が、君のためかもしれないね」' }],
  [{ speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「……そのファイル、僕の名前が書いてあったか？　……見なかったことにして」' }],
  [{ speaker: '凪砂', role: '凪砂', illust: 'Nagisa_serious', text: '「……。……ねえ、朔良。君、今、僕のことを心配してる？」' }],
];

const NAGISA_GATE = [
  { speaker: '凪砂', role: '凪砂', illust: 'Nagisa_smile', text: '「コードが揃った。……行こうか、朔良」' },
];

const ROOM_ITEMS = {
  lab1: {
    chips: [{ id: 'chip_1', pos: { top: '45%', left: '28%' }, label: 'コード断片①' }],
    files: [{
      id: 'file_1', pos: { top: '62%', left: '65%' }, label: '機密ファイル 01',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【機密ファイル 01 ／ 被験者：ナギサ・異能初期設定】' },
        { speaker: null, role: null, text: '被験者コード：N-001。異能分類：《精神透視（サトリ）》。\n視界に入った人間の思考・感情・記憶を残らず読み解き、いかなる行動も完全に先読みできる人心掌握の能力として研究所より「最優先適応者」の認定を受ける。' },
        { speaker: null, role: null, text: '初回同期時の本人コメント（録音記録より抜粋）：\n「便利だって思うだろ？」\n\n…当時の彼に、その代償を知る術はなかった。' },
      ],
    }],
  },
  lab2: {
    chips: [
      { id: 'chip_2', pos: { top: '38%', left: '20%' }, label: 'コード断片②' },
      { id: 'chip_3', pos: { top: '55%', left: '75%' }, label: 'コード断片③' },
    ],
    files: [{
      id: 'file_2', pos: { top: '30%', left: '50%' }, label: '機密ファイル 02',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【機密ファイル 02 ／ エラー報告：過負荷による感覚拒絶】' },
        { speaker: null, role: null, text: '重大バグ報告 ／ 優先度：最高。\n被験者N-001の精神透視能力に、想定外の副作用が確認された。\n絶え間なく流れ込む膨大な他者の思考データが、脳に致命的な過負荷（キャパオーバー）を与えている。' },
        { speaker: null, role: null, text: '脳が自己防衛に走った結果、一時的に五感のいずれかをランダムに遮断・喪失していく肉体拒絶反応が記録されている。\n\n被験者本人への開示：──【見送り】\n理由：研究上の継続使用に支障をきたす可能性があるため。' },
      ],
    }],
  },
  lab3: {
    chips: [{ id: 'chip_4', pos: { top: '50%', left: '35%' }, label: 'コード断片④' }],
    files: [{
      id: 'file_3', pos: { top: '35%', left: '68%' }, label: '機密ファイル 03',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【機密ファイル 03 ／ 適応者の末路：五感の完全喪失】' },
        { speaker: null, role: null, text: '摩耗率が100%に達した場合の予測シミュレーション（機密）。\n\n脳への過負荷が限界を超えた時点で、全ての五感が永久に機能停止する。\n情報の嵐に脳を焼き尽くされながら、暗黒と静寂の中で生き地獄を味わう「完全なる廃人」への強制変貌が不可避となる。' },
        { speaker: null, role: null, text: '研究所の内部評価（一行メモ）：\n「制御不能になる前に廃棄するか、情報収集機器として運用するかを選択せよ」\n\n──そこに、人として扱う選択肢は、どこにもなかった。' },
      ],
    }],
  },
  lab4: {
    chips: [],
    files: [{
      id: 'file_4', pos: { top: '58%', left: '25%' }, label: '機密ファイル 04',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【機密ファイル 04 ／ プロジェクト・ウェッジ（楔）：能力中和の適合性】' },
        { speaker: null, role: null, text: '仮説：適応者の代償を止める「楔（ウェッジ）」の条件。\n\n精神透視能力の過負荷と五感の喪失を止める理論的な方法が、ただ一つ存在する。\n精神透視能力が「完全に遮断される存在（異物）」と接触・同調した場合──' },
        { speaker: null, role: null, text: '──相手が持つ「中和・吸収」の力が《楔》として機能し、脳を情報の濁流から解放して代償（五感の喪失）を無効化・リセットできるという仮説が成立する。\n\nキー要素：中和する者の存在。感情の深さ。そして、互いに選び合う意志。\n\n（余白に走り書き）「──つまり、誰かが彼を"選び続けること"が、唯一の解になりうる」' },
      ],
    }],
  },
};

const InfoParticle = ({ startX, startY, targetX, targetY, color, onComplete }) => {
  const [style, setStyle] = useState({ left: startX, top: startY, opacity: 0, transform: 'translate(-50%,-50%) scale(0.5)' });
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setStyle({ left: startX, top: startY - 40, opacity: 1, transform: 'translate(-50%,-50%) scale(1.5)', transition: 'all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)' });
      const t1 = setTimeout(() => { setStyle({ left: targetX, top: targetY, opacity: 0.8, transform: 'translate(-50%,-50%) scale(0.3)', transition: 'all 0.6s cubic-bezier(0.5,0,0.2,1)' }); }, 300);
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



function FCSprite({ currentMessage }) {
  const illust = currentMessage?.illust;
  if (!illust) return null;
  const sepIdx = illust.indexOf('_');
  if (sepIdx === -1) return null;
  const base = illust.substring(0, sepIdx);
  const expression = illust.substring(sepIdx + 1);
  const CFGS = { Nagisa: { folder: '/character/Nagisa', file: 'Nagisa', posClass: 'right-[5%] w-[45%] h-[95%]' } };
  const cfg = CFGS[base];
  if (!cfg) return null;
  return (
    <AnimatePresence>
      <motion.div key={illust} className={`absolute bottom-[-50px] flex flex-col justify-end items-center pointer-events-none z-20 ${cfg.posClass}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, filter: 'brightness(1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
        <img src={assetPath(`${cfg.folder}/${cfg.file}_${expression}.png`)} alt={base} className="w-full h-full object-contain object-bottom" />
      </motion.div>
    </AnimatePresence>
  );
}

function FCFileModal({ file, onClose }) {
  return (
    <motion.div className="absolute inset-0 z-[60] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="relative w-full max-w-2xl max-h-full bg-[#080c14]/95 border border-green-500/30 rounded shadow-[0_0_30px_rgba(74,222,128,0.1)] overflow-hidden flex flex-col" initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}>
        <div className="bg-green-950/40 border-b border-green-500/20 px-6 py-4 flex items-center gap-3 shrink-0">
          <FileText className="w-5 h-5 text-green-400" />
          <span className="text-green-100 font-orbitron tracking-widest text-sm">CONFIDENTIAL DATA</span>
        </div>
        <div className="p-8 overflow-y-auto grow custom-scrollbar">
          {file.messages.map((m, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              {m.speaker === 'システム' ? (
                <h3 className="text-green-300 font-bold tracking-widest mb-4 border-b border-green-500/30 pb-2 text-base md:text-lg">{m.text.replace('【', '').replace('】', '')}</h3>
              ) : (
                <p className="text-gray-300 leading-loose font-noto tracking-wide whitespace-pre-line text-sm md:text-base">{m.text}</p>
              )}
            </div>
          ))}
        </div>
        <div className="bg-black/40 border-t border-green-500/20 p-4 flex justify-end shrink-0">
          <button onClick={onClose} className="px-8 py-2.5 bg-green-900/50 hover:bg-green-800/60 border border-green-400/30 hover:border-green-400 text-green-200 text-sm font-orbitron tracking-widest transition-all rounded">CLOSE</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FragmentCollectNagisa({ onComplete, onSave, onLoad, onToggleSkip, onOpenLog, onToggleAuto, skipMode, autoMode }) {
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

  useEffect(() => {
    if (gateUnlocked || currentMessage || activeFile || isGameOver || isTransitioning) return;
    const timer = setInterval(() => { setTimeLeft(prev => { if (prev <= 1) { clearInterval(timer); setIsGameOver(true); return 0; } return prev - 1; }); }, 1000);
    return () => clearInterval(timer);
  }, [gateUnlocked, currentMessage, activeFile, isGameOver, isTransitioning]);

  const getTarget = useCallback((elId, fallbackX) => {
    const el = document.getElementById(elId);
    if (el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
    return { x: fallbackX, y: 40 };
  }, []);

  const triggerParticle = useCallback((sx, sy, type) => {
    setTimeout(() => {
      const t = type === 'chip' ? getTarget('fcn-chip-counter', window.innerWidth / 2) : getTarget('fcn-file-counter', window.innerWidth / 2 + 120);
      setAnimations(prev => [...prev, { id: Date.now() + Math.random(), startX: sx, startY: sy, targetX: t.x, targetY: t.y, color: type === 'chip' ? 'cyan' : 'green' }]);
    }, 50);
  }, [getTarget]);

  const showMessages = useCallback((msgs) => {
    if (!msgs || msgs.length === 0) return;
    setMessageQueue(msgs.slice(1)); setCurrentMessage(msgs[0]); setDisplayedText(''); setIsTyping(true);
  }, []);

  const handleNextMessage = useCallback(() => {
    if (isTyping) { clearInterval(typingTimer.current); if (currentMessage) setDisplayedText(currentMessage.text); setIsTyping(false); }
    else if (messageQueue.length > 0) { setCurrentMessage(messageQueue[0]); setMessageQueue(p => p.slice(1)); setDisplayedText(''); setIsTyping(true); }
    else { setCurrentMessage(null); setDisplayedText(''); setIsTyping(false); if (pendingParticle) { triggerParticle(pendingParticle.sx, pendingParticle.sy, pendingParticle.type); setPendingParticle(null); } }
  }, [isTyping, currentMessage, messageQueue, pendingParticle, triggerParticle]);

  useEffect(() => {
    if (!currentMessage) { setDisplayedText(''); setIsTyping(false); return; }
    clearInterval(typingTimer.current); setDisplayedText(''); setIsTyping(true);
    let str = '';
    typingTimer.current = setInterval(() => {
      if (str.length < currentMessage.text.length) { str += currentMessage.text.charAt(str.length); setDisplayedText(str); }
      else { clearInterval(typingTimer.current); setDisplayedText(currentMessage.text); setIsTyping(false); }
    }, 25);
    return () => clearInterval(typingTimer.current);
  }, [currentMessage]);

  useEffect(() => {
    const h = (e) => { if (currentMessage && (e.key === 'Enter' || e.key === ' ')) { handleNextMessage(); e.preventDefault(); e.stopPropagation(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [currentMessage, handleNextMessage]);

  const moveRoom = (dir) => {
    if (isTransitioning || currentMessage || activeFile || isGameOver) return;
    const next = roomIndex + dir;
    if (next < 0 || next >= ROOMS.length) return;
    setIsTransitioning(true); setIsBlackout(true);
    setTimeout(() => { setRoomIndex(next); setIsBlackout(false); }, 300);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const handleChipClick = (chip, e) => {
    e.stopPropagation();
    if (currentMessage || isTransitioning || activeFile || isGameOver || collectedChips.has(chip.id)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    const nextCount = chipCount + 1;
    setCollectedChips(p => new Set([...p, chip.id]));
    setPendingParticle({ sx, sy, type: 'chip' });
    const lv = Math.min(chipCount, NAGISA_CHIP.length - 1);
    const sysLine = { speaker: 'システム', role: 'SYSTEM', text: `セキュリティコードの断片を入手：${chip.label}` };
    if (nextCount >= totalChips) { showMessages([sysLine, ...NAGISA_CHIP[lv], ...NAGISA_GATE]); setTimeout(() => setGateUnlocked(true), 5000); }
    else { showMessages([sysLine, ...NAGISA_CHIP[lv]]); }
  };

  const handleFileClick = (file, e) => {
    e.stopPropagation();
    if (currentMessage || isTransitioning || activeFile || isGameOver || collectedFiles.has(file.id)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    setCollectedFiles(p => new Set([...p, file.id]));
    setPendingParticle({ sx, sy, type: 'file' });
    setActiveFile(file);
  };

  const closeActiveFile = () => {
    setActiveFile(null);
    const lv = Math.min(collectedFiles.size - 1, NAGISA_FILE.length - 1);
    showMessages(NAGISA_FILE[lv] || NAGISA_FILE[0]);
  };

  const handleParticleComplete = useCallback((id) => { setAnimations(p => p.filter(a => a.id !== id)); }, []);

  const handlePointerDown = (e) => { if (currentMessage || activeFile || isTransitioning || isGameOver || e.target.closest('button')) return; setIsDragging(true); lastMousePos.current = { x: e.clientX, y: e.clientY }; };
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e) => {
    if (currentMessage || activeFile || isTransitioning || isGameOver || !isDragging) return;
    const dx = e.clientX - lastMousePos.current.x, dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setLightX(prev => Math.max(0, Math.min(window.innerWidth, prev - dx * 1.5)));
    setLightY(prev => Math.max(0, Math.min(window.innerHeight, prev - dy * 1.5)));
  };

  const renderSpot = (item, type, handler) => {
    const isCollected = type === 'chip' ? collectedChips.has(item.id) : collectedFiles.has(item.id);
    const isChip = type === 'chip';
    return (
      <button key={item.id} onClick={(e) => handler(item, e)} disabled={isCollected}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none z-20 flex items-center justify-center group" style={item.pos}>
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
      <div ref={containerRef} className="absolute inset-0 w-full h-full select-none z-10" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <div style={{ perspective: '1000px' }} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute w-[180%] h-[180%] -left-[40%] -top-[40%] transition-transform duration-150 ease-out" style={{ transform: `translateX(${xRatio * -maxPanX}px) translateY(${yRatio * -maxPanY}px) rotateX(${yRatio * -2}deg) rotateY(${xRatio * 4}deg)` }}>
            <img src={assetPath(currentRoom.bg)} alt="bg" className="absolute inset-0 w-full h-full object-cover select-none" />
            <div className="absolute inset-0 z-20 pointer-events-auto">
              {currentRoomItems.chips.map(c => renderSpot(c, 'chip', handleChipClick))}
              {currentRoomItems.files.map(f => renderSpot(f, 'file', handleFileClick))}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-30" />
        </div>
      </div>

      <div className={`absolute inset-0 bg-black z-[35] pointer-events-none transition-opacity duration-300 ${isBlackout ? 'opacity-100' : 'opacity-0'}`} />

      {chipCount >= 2 && (
        <div className="absolute inset-0 pointer-events-none z-[32]" style={{ background: chipCount >= 3 ? 'radial-gradient(ellipse at center, transparent 30%, rgba(99,50,150,0.25) 100%)' : 'radial-gradient(ellipse at center, transparent 50%, rgba(99,50,150,0.12) 100%)' }} />
      )}

      {!currentMessage && !isGameOver && (
        <div className="absolute top-4 lg:top-6 left-0 right-0 z-30 flex items-start justify-between px-2 pr-12 lg:px-8 pointer-events-none">
          <div className="glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <h2 className="text-[10px] lg:text-sm font-bold text-slate-800 tracking-[0.2em]">{currentRoom.name}</h2>
          </div>
          <div className="flex flex-col gap-1 lg:gap-2 items-end">
            <div className={`glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3 ${timeLeft <= 30 ? 'border-red-500/50 animate-pulse text-red-500' : 'text-slate-700'}`}>
              <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="text-[9px] lg:text-xs font-orbitron tracking-widest font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
            <div id="fcn-chip-counter" className="glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-sky-500" />
              <span className="text-[9px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">CHIP</span>
              <div className="flex items-center gap-1.5 lg:gap-2">{Array.from({ length: totalChips }, (_, i) => (<div key={i} className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < chipCount ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]' : 'bg-transparent border-white/30'}`} />))}</div>
            </div>
            <div id="fcn-file-counter" className="glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <FileText className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
              <span className="text-[9px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">FILE</span>
              <div className="flex items-center gap-1.5 lg:gap-2">{Array.from({ length: 4 }, (_, i) => (<div key={i} className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < fileCount ? 'bg-green-400 border-green-300 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-transparent border-white/30'}`} />))}</div>
            </div>
          </div>
        </div>
      )}

      {!currentMessage && !activeFile && !isGameOver && (
        <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/80 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 rounded-full flex items-center gap-3 pointer-events-none z-30" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 4, duration: 1 }}>
          <ArrowLeftRight className="w-4 h-4 animate-bounce" />
          DRAG TO EXPLORE
        </motion.div>
      )}

      {!currentMessage && !isGameOver && (
        <>
          {roomIndex > 0 && (<button onClick={() => moveRoom(-1)} disabled={isTransitioning} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-24 flex items-center justify-center glass-panel rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-200 disabled:opacity-30"><ChevronLeft className="w-8 h-8 text-white/80" /></button>)}
          {roomIndex < ROOMS.length - 1 && (<button onClick={() => moveRoom(1)} disabled={isTransitioning} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-24 flex items-center justify-center glass-panel rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-200 disabled:opacity-30"><ChevronRight className="w-8 h-8 text-white/80" /></button>)}
        </>
      )}

      {gateUnlocked && !currentMessage && (
        <motion.button onClick={() => onComplete({ chips: chipCount, files: fileCount })} className="absolute bottom-8 right-8 z-30 bg-cyan-900/60 backdrop-blur-sm border border-cyan-400/50 px-6 py-3 rounded-md text-cyan-200 font-orbitron text-sm tracking-widest hover:bg-cyan-700/60 hover:border-cyan-300 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(103,232,249,0.3)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          ゲートを開く <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}

      {currentMessage && !activeFile && <FCSprite currentMessage={currentMessage} />}
      {!activeFile && <FCDialogueBox 
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
      />}

      <AnimatePresence>{activeFile && <FCFileModal file={activeFile} onClose={closeActiveFile} />}</AnimatePresence>

      <AnimatePresence>
        {isGameOver && (
          <motion.div className="absolute inset-0 z-[70] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="text-red-500 text-4xl md:text-6xl font-orbitron tracking-[0.3em] font-bold mb-8 animate-pulse drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">SYSTEM DOWN</h2>
            <p className="text-red-200/80 font-noto tracking-widest mb-12">制限時間を超過しました。通信が途絶しました。</p>
            <button onClick={() => { setRoomIndex(0); setCollectedChips(new Set()); setCollectedFiles(new Set()); setGateUnlocked(false); setTimeLeft(180); setIsGameOver(false); setLightX(window.innerWidth / 2); setLightY(window.innerHeight / 2); }} className="px-8 py-3 bg-red-950/50 border border-red-500/50 hover:bg-red-900/80 hover:border-red-400 text-red-100 font-orbitron tracking-widest transition-all rounded">REBOOT (RETRY)</button>
          </motion.div>
        )}
      </AnimatePresence>

      {animations.map(anim => (<InfoParticle key={anim.id} startX={anim.startX} startY={anim.startY} targetX={anim.targetX} targetY={anim.targetY} color={anim.color} onComplete={() => handleParticleComplete(anim.id)} />))}
    </div>
  );
}
