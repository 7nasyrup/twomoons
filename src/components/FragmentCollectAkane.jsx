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

// ─── アカネの台詞（チップ取得時） ────────────────────────────────────────────────
const AKANE_CHIP = [
  // 1つ目
  [
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……コードの断片だ。手間取るな」' },
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「さっさと次へ行くぞ。時間を無駄にするな」' },
  ],
  // 2つ目
  [
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……また一つ。思ったより手こずるな、この研究所は」' },
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「油断するなよ。まだ終わりじゃない」' },
  ],
  // 3つ目
  [
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……チップ確保。残り一つだ」' },
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……余計なものを見るな。先を急げ」' },
  ],
  // 4つ目以降
  [
    { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……。行くぞ」' },
  ],
];

// ─── ファイル取得時のアカネ台詞 ──────────────────────────────────────────────────
const AKANE_FILE = [
  [{ speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「機密ファイル……。あとで確認しろ。今は先を急ぐ」' }],
  [{ speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……そのファイル。中身は……あとでいい。今は関係ない」' }],
  [{ speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……っ。それは……捨てておけ。余計な情報だ」' }],
  [{ speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「……」\n「……見たのか。……まあ、いい。全部、知っておいた方がいいこともある」' }],
];

// ─── ゲート解錠時 ─────────────────────────────────────────────────────────────
const AKANE_GATE = [
  { speaker: 'アカネ', role: 'アカネ', illust: 'Akane_serious', text: '「コードが揃った。ゲートを開ける。遅れるな」' },
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
            text: '【機密ファイル 01 ／ 適応者登録記録：被験者"SA-002"の存在について】'
          },
          {
            speaker: null, role: null,
            text: '被験者コード：SA-002。登録年齢：7歳。性別：男。\n登録理由：異能自然発現の確認。能力概要：詳細は別紙「SA-002特別管理要項」参照のこと。\n備考：SA-001（登録年齢19歳、女性）との生物学的親族関係が認められる。具体的な続柄については、倫理委員会の勧告により当記録から除外。'
          },
          {
            speaker: null, role: null,
            text: '管理担当：R-012。\nステータス：【厳重管理中】\n\n（余白に走り書き）\n「……SA-001は、SA-002の存在を知らない。そのままでいい」'
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
            text: '【機密ファイル 02 ／ 新聞スクラップ：××市連続殺人事件（第三報）】'
          },
          {
            speaker: null, role: null,
            text: '（色あせた新聞の切り抜き。日付は十数年前）\n\n「──昨夜、××市△△区の自宅にて、30代女性の遺体が発見された。\n死因は鋭利な刃物による刺傷（複数箇所）。遺体の発見者は同居の長男（10代）とのみ発表されており、警察は事件との関連について調査中。\n被害者は元研究職に就いていたとされるが、詳細について遺族のプライバシー保護を理由に開示を拒否──」'
          },
          {
            speaker: null, role: null,
            text: '（余白に赤ペンで書き込み）\n\n「処理済み。遺族への接触は禁止。長男については継続監視対象とする。\n──この件は、研究所とは無関係」\n\n（赤いインクが滲んで、最後の一行は半ば判読不能になっている）'
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
            text: '【機密ファイル 03 ／ 被験者：アカネ・適応審査報告書】'
          },
          {
            speaker: null, role: null,
            text: '被験者コード：AK-007。審査年齢：16歳。\n異能検査結果：【陰性】──異能の発現、同調反応、潜在波形、いずれも検出されず。\n\n総合評価：《無能力者》\n研究所における適応者プログラムへの参加資格：なし。\n\n審査担当コメント：\n「検体としての価値はゼロ。ただし、他の適応者との接触・情報共有には細心の注意を要する。状況次第では排除も検討する」'
          },
          {
            speaker: null, role: null,
            text: '付記（別担当者の手書き）：\n「──彼が無能力である事実を、彼自身は知っているのだろうか。\n知らないまま使い続ける方が、都合がいい。\nそれにしても……あの目だけは、普通じゃない」'
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
            text: '【機密ファイル 04 ／ プロジェクト・ウェッジ（楔）：無能力者の特殊性について】'
          },
          {
            speaker: null, role: null,
            text: '考察：無能力者が持つ「中和・吸収」の特性について。\n\n適応者の異能が暴走・摩耗する際のトリガーは、一貫して「孤立」と「断絶」である。\n逆説的に、適応者が誰かと「繋がり続ける」ことができた場合──\n特に、異能を持たない（中和の器を持つ）者との深い情動的結合が達成された場合に限り、代償の進行が停止もしくは逆転するという仮説が成立する。'
          },
          {
            speaker: null, role: null,
            text: '付記：\n「AK-007は無能力者として研究所に"用済み"の烙印を押された。\nしかし、逆に言えば──彼こそが、特定の適応者にとっての《楔》になりうる存在である。\n\n本人への開示：【永久に見送り】\n理由：彼がその力を知れば、自らを犠牲にすることを、一秒も躊躇しないだろうから」'
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



// ─── キャラクタースプライト ───────────────────────────────────────────────────────
function FCSprite({ currentMessage }) {
  const illust = currentMessage?.illust;
  if (!illust) return null;
  const sepIdx = illust.indexOf('_');

  // 表情なし（"Akane"単体）の場合
  const base = sepIdx !== -1 ? illust.substring(0, sepIdx) : illust;
  const expression = sepIdx !== -1 ? illust.substring(sepIdx + 1) : 'neutral';

  const CFGS = {
    Akane: {
      folder: '/character/Akane',
      file: 'Akane',
      posClass: 'right-[5%] w-[45%] h-[95%]',
    },
  };
  const cfg = CFGS[base];
  if (!cfg) return null;

  const imgPath = `${cfg.folder}/${cfg.file}_${expression}.png`;

  return (
    <AnimatePresence>
      <motion.div
        key={illust}
        className={`absolute bottom-[-50px] flex flex-col justify-end items-center pointer-events-none z-20 ${cfg.posClass}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, filter: 'brightness(1) drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <img src={assetPath(imgPath)} alt={base} className="w-full h-full object-contain object-bottom" />
      </motion.div>
    </AnimatePresence>
  );
}

// ─── 機密ファイル用 モーダル ──────────────────────────────────────────────────────
function FCFileModal({ file, onClose }) {
  return (
    <motion.div
      className="absolute inset-0 z-[60] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <style>{`
        @media (max-width: 767px) {
          .mobile-scale-popup-wrapper {
            transform: scale(0.85);
          }
        }
      `}</style>
      <div className="w-full h-full max-w-2xl flex justify-center items-center mobile-scale-popup-wrapper md:transform-none origin-center transition-transform pointer-events-none">
        <motion.div
          className="relative w-full max-h-full bg-[#080c14]/95 border border-green-500/30 rounded shadow-[0_0_30px_rgba(74,222,128,0.1)] overflow-hidden flex flex-col pointer-events-auto"
          initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
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

// ─── メインコンポーネント ─────────────────────────────────────────────────────────
export default function FragmentCollectAkane({ onComplete, onSave, onLoad, onToggleSkip, onOpenLog, onToggleAuto, skipMode, autoMode }) {
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
        ? getTarget('fca-chip-counter', window.innerWidth / 2)
        : getTarget('fca-file-counter', window.innerWidth / 2 + 120);
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
    const lv = Math.min(chipCount, AKANE_CHIP.length - 1);
    const sysLine = { speaker: 'システム', role: 'SYSTEM', text: `セキュリティコードの断片を入手：${chip.label}` };
    if (nextCount >= totalChips) {
      showMessages([sysLine, ...AKANE_CHIP[lv], ...AKANE_GATE]);
      setTimeout(() => setGateUnlocked(true), 5000);
    } else {
      showMessages([sysLine, ...AKANE_CHIP[lv]]);
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
    const lv = Math.min(collectedFiles.size - 1, AKANE_FILE.length - 1);
    showMessages(AKANE_FILE[lv] || AKANE_FILE[0]);
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
            <div id="fca-chip-counter" className="glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sky-500" />
              <span className="text-[11px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">CHIP</span>
              <div className="flex items-center gap-1.5 lg:gap-2">
                {Array.from({ length: totalChips }, (_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < chipCount ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]' : 'bg-transparent border-white/30'}`} />
                ))}
              </div>
            </div>
            <div id="fca-file-counter" className="glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
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

      {/* ─── キャラクタースプライト ─── */}
      {currentMessage && !activeFile && <FCSprite currentMessage={currentMessage} />}

      {/* ─── メッセージウィンドウ ─── */}
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
