import React, { useState, useEffect, useRef, useCallback } from 'react';
import FCDialogueBox from './FCDialogueBox';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Shield, FileText, ArrowLeftRight, Clock, Sparkles, Circle, CheckCircle2 } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

// ─── 研究所エリア定義 ────────────────────────────────────────────────────────────
const ROOMS = [
  { id: 'lab1', name: 'エリア01 ／ 入口実験室', bg: '/scene/fragment_collect/laboratory1.jpg' },
  { id: 'lab2', name: 'エリア02 ／ 検体保管室', bg: '/scene/fragment_collect/The-Scary-Laboratory1.jpg' },
  { id: 'lab3', name: 'エリア03 ／ クローニング区画', bg: '/scene/fragment_collect/cloning-laboratory3.jpg' },
  { id: 'lab4', name: 'エリア04 ／ 管制塔コア', bg: '/scene/fragment_collect/Spacecraft-laboratory2.jpg' },
];

// ─── 睦典の台詞（チップ取得時） ───────────────────────────────────────
const MUTSUNORI_CHIP = [
  // 1つ目
  [
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_smile',
      text: '「よし、セキュリティコードの断片だ。……あ、ちょっと頭痛が」'
    },
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_smile',
      text: '「最近ちょっと物忘れが激しくてさ。気にしないでくれ」'
    }
  ],
  // 2つ目
  [
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_serious',
      text: '「チップ確保。……あれ、俺さっきどうやってアイツ倒したっけ？」'
    },
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_serious',
      text: '「傷は一瞬で治るのに、直前の戦闘の記憶が……いまいちぼやけるな」'
    }
  ],
  // 3つ目
  [
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_pout',
      text: '「……っ、朔良の顔が二重に見える。目を擦ったら治るか」'
    },
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_pout',
      text: '「手の感覚があんまりない。……異常じゃねぇよ、たぶん」'
    }
  ],
  // 4つ目以降
  [
    {
      speaker: '睦典', role: '睦典', illust: 'Mutsunori_pout',
      text: '「……。朔良、俺は大丈夫だから。先を急ごう」'
    }
  ]
];

// ファイル取得時
const MUTSUNORI_FILE = [
  [{
    speaker: '睦典', role: '睦典', illust: 'Mutsunori_serious',
    text: '「機密ファイル？　マジか。あとで中身を確認しろよ」'
  }],
  [{
    speaker: '睦典', role: '睦典', illust: 'Mutsunori_serious',
    text: '「……そのファイル、見ない方がいいかもな。いや、見ろ。情報は力だ」'
  }],
  [{
    speaker: '睦典', role: '睦典', illust: 'Mutsunori_serious',
    text: '「……ファイル。どこかで、似たような字を見た気がする。気のせいか」'
  }],
  [{
    speaker: '睦典', role: '睦典', illust: 'Mutsunori_pout',
    text: '「……ッ。そのファイル、俺の名前が書いてないか。……見なかったことにしろ」'
  }],
];

// ゲート解錠時
const MUTSUNORI_GATE = [
  {
    speaker: '睦典', role: '睦典', illust: 'Mutsunori_happy',
    text: '「コードが揃った！　行くぞ朔良、ゲートを開ける！」'
  },
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
            text: '【機密ファイル 01 ／ 被験者：ムツノリ・異能初期設定】'
          },
          {
            speaker: null, role: null,
            text: '被験者コード：M-001。異能分類：《超再生／不死》。\n肉体の時間軸を任意の時点まで「巻き戻す」ことにより、いかなる損傷・欠損も瞬時に修復する。\n理論上、致死ダメージすら無効化できるチート級の性能と評価され、研究所より「最優先適応者」の認定を受ける。'
          },
          {
            speaker: null, role: null,
            text: '初回同期時の本人コメント（録音記録より抜粋）：\n「ああ、この能力マジでやばくない？　俺、死なないじゃん」\n\n…当時の本人に、その代償を知る術はなかった。'
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
            text: '【機密ファイル 02 ／ エラー報告：修復の等価交換】'
          },
          {
            speaker: null, role: null,
            text: '重大バグ報告 ／ 優先度：最高。\n被験者M-001の超再生機能に、想定外のエネルギー消費プロセスが確認された。\n肉体を「巻き戻す」際のエネルギー源として、脳内の記憶細胞――特に直近の出来事に関わる短期記憶、および自己同一性（アイデンティティ）に紐づく長期記憶の一部が、優先的に消費・消去されていることが判明。'
          },
          {
            speaker: null, role: null,
            text: '平易な言葉で言い換えれば：\n\n「治れば治るほど、彼は自分を忘れていく」\n\n被験者本人への開示：　──　【見送り】\n理由：研究上の継続使用に支障をきたす可能性があるため。'
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
            text: '【機密ファイル 03 ／ 適応者の末路：防衛兵器化】'
          },
          {
            speaker: null, role: null,
            text: '摩耗率が100%に達した場合の予測シミュレーション（機密）。\n\n記憶の摩耗が限界を超えた時点で、被験者の「自我」は消失する。\n残るのは、脳に焼き付いた本能的な防衛プログラムのみ。\n自律型の《防衛兵器》として再起動し、周囲を無差別に排除しようとする。'
          },
          {
            speaker: null, role: null,
            text: '研究所の内部評価（一行メモ）：\n「制御不能になる前に処分するか、兵器として運用するかを選択せよ」\n\n──　そこに、人として扱う選択肢は、どこにもなかった。'
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
            text: '【機密ファイル 04 ／ プロジェクト・ウェッジ（楔）：無能力者の適合性】'
          },
          {
            speaker: null, role: null,
            text: '仮説：適応者の暴走を止める「楔（ウェッジ）」の条件。\n\n超再生能力の暴走と記憶摩耗を止める理論的な方法が、ただ一つ存在する。\n適応者が「絶対に忘れたくないと強く願う精神的支柱（絶対の存在）」と出会い、強度の感情同調（シンクロ）を起こした場合――'
          },
          {
            speaker: null, role: null,
            text: '――無能力者の持つ「中和・吸収」の特性が《楔》として機能し、異能の代償を無効化できるという仮説が成立する。\n\nキー要素：無能力者の存在。感情の深さ。そして、互いに選び合う意志。\n\n（余白に走り書き）「──　つまり、誰かが彼を"選び続けること"が、唯一の解になりうる」'
          },
        ],
      },
    ],
  },
};

// ─── パーティクルアニメーション（SearchAndLearningと同じ演出） ─────────────────────
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
      <div style={{
        width: 16, height: 16, borderRadius: '50%', background: bgCol,
        boxShadow: `0 0 15px 5px ${glow}`
      }} />
      <div className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping" />
      <div className="absolute w-1.5 h-1.5 rounded-full bg-white" />
    </div>
  );
};



// ─── キャラクタースプライト（本編SpriteSlot準拠） ───────────────────────────────
function FCSprite({ currentMessage }) {
  const illust = currentMessage?.illust;
  if (!illust) return null;
  const sepIdx = illust.indexOf('_');
  if (sepIdx === -1) return null;
  const base = illust.substring(0, sepIdx);
  const expression = illust.substring(sepIdx + 1);

  const CFGS = {
    Mutsunori: {
      folder: '/character/Mutsunori',
      file: 'Mutsunori',
      posClass: 'left-[5%] w-[45%] h-[95%]',
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

// ─── 機密ファイル用 モーダル ──────────────────────────────────────────────────
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
        {/* Header */}
        <div className="bg-green-950/40 border-b border-green-500/20 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-green-400" />
            <span className="text-green-100 font-orbitron tracking-widest text-sm">CONFIDENTIAL DATA</span>
          </div>
        </div>
        {/* Content */}
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
        {/* Footer */}
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

// ─── メインコンポーネント ────────────────────────────────────────────────────────
export default function FragmentCollect({ onComplete, onSave, onLoad, onToggleSkip, onOpenLog, onToggleAuto, skipMode, autoMode }) {
  const [roomIndex, setRoomIndex] = useState(0);
  const [collectedChips, setCollectedChips] = useState(new Set());
  const [collectedFiles, setCollectedFiles] = useState(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);

  // メッセージキュー
  const [messageQueue, setMessageQueue] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef(null);

  // ファイルモーダル用状態
  const [activeFile, setActiveFile] = useState(null);

  // パーティクル
  const [animations, setAnimations] = useState([]);
  const [pendingParticle, setPendingParticle] = useState(null);

  // ゲート解錠フラグ
  const [gateUnlocked, setGateUnlocked] = useState(false);



  // 視点移動（スポットライト）用状態
  const [lightX, setLightX] = useState(() => typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const [lightY, setLightY] = useState(() => typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const containerRef = useRef(null);

  // タイマー状態 (180秒 = 3分)
  const [timeLeft, setTimeLeft] = useState(180);
  const [isGameOver, setIsGameOver] = useState(false);

  // ─── ビューモード切替 ──────────────────────────────────────────────
  const USE_FPS_VIEW = true; // ★ true: FPS（疑似3D視点）、false: スキャナー（既存）
  const xRatio = typeof window !== 'undefined' ? (lightX / window.innerWidth) * 2 - 1 : 0;
  const yRatio = typeof window !== 'undefined' ? (lightY / window.innerHeight) * 2 - 1 : 0;
  
  // FPS視点の移動量（画面サイズの何割移動するか。数値を上げると移動範囲が広がる）
  const maxPanX = typeof window !== 'undefined' ? window.innerWidth * 0.35 : 0;
  const maxPanY = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 0;

  // ─── ハイド＆シーク（ステルス）用状態 ──────────────────────────────────────────
  const ENABLE_STEALTH_MODE = false; // ★ここを true にすると再び敵が出るようになります

  const [mutsunoriHealth, setMutsunoriHealth] = useState(3);
  const [isWarning, setIsWarning] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [damageEffect, setDamageEffect] = useState(false);
  const [enemyLeftEffect, setEnemyLeftEffect] = useState(false);
  const [graceExpired, setGraceExpired] = useState(false);

  const isHidingRef = useRef(isHiding);
  isHidingRef.current = isHiding;
  const isWarningRef = useRef(isWarning);
  isWarningRef.current = isWarning;

  const totalChips = 4;
  const chipCount = collectedChips.size;
  const fileCount = collectedFiles.size;
  const symptomLevel = Math.min(chipCount, 3);
  const currentRoom = ROOMS[roomIndex];
  const currentRoomItems = ROOM_ITEMS[currentRoom.id];

  // ─── ダメージ処理 ────────────────────────────────────────────────────────────
  const triggerDamage = useCallback(() => {
    setDamageEffect(true);
    setMutsunoriHealth(p => {
      const next = p - 1;
      if (next <= 0) {
        setIsGameOver(true);
      } else {
        showMessages([
          {
            speaker: '睦典', role: '睦典', illust: 'Mutsunori_pout',
            text: '「っ……！ あれ、俺……なんで血まみれなんだ……？」'
          }
        ]);
      }
      return next;
    });
    setTimeout(() => setDamageEffect(false), 300);
  }, []); // showMessages is already stable, but we can omit it if it doesn't change, actually we need to make sure showMessages is available or just let it be. Wait, let's include it in deps:

  const triggerDamageRef = useRef(triggerDamage);
  useEffect(() => { triggerDamageRef.current = triggerDamage; }, [triggerDamage]);

  // ─── 全体タイマー ──────────────────────────────────────────────
  useEffect(() => {
    if (gateUnlocked || currentMessage || activeFile || isGameOver || isTransitioning) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gateUnlocked, currentMessage, activeFile, isGameOver, isTransitioning]);

  // ─── 敵出現タイマー ──────────────────────────────────────────────
  useEffect(() => {
    if (!ENABLE_STEALTH_MODE) return;
    if (gateUnlocked || currentMessage || activeFile || isGameOver || isTransitioning || isWarning) return;

    // 8〜12秒後に次の敵が出現
    const delay = (Math.floor(Math.random() * 3) + 7) * 1000;
    const t = setTimeout(() => {
      setIsWarning(true);
    }, delay);

    return () => clearTimeout(t);
  }, [gateUnlocked, currentMessage, activeFile, isGameOver, isTransitioning, isWarning]);

  // ─── 敵の攻撃猶予（警告から3秒間はセーフ） ──────────────────────────────────
  useEffect(() => {
    if (!isWarning) {
      setGraceExpired(false);
      return;
    }
    const t = setTimeout(() => {
      setGraceExpired(true);
    }, 3000); // 3秒の猶予期間
    return () => clearTimeout(t);
  }, [isWarning]);

  // ─── 敵の攻撃判定 ──────────────────────────────────────────────
  useEffect(() => {
    // 猶予期間が過ぎており、かつハイドしていない場合はダメージ
    if (isWarning && graceExpired && !isHiding && !isGameOver) {
      triggerDamageRef.current();
      setIsWarning(false);
    }
  }, [isWarning, graceExpired, isHiding, isGameOver]);

  // ─── ハイド成功判定（1.8秒間ハイドし続ける） ──────────────────────────────────
  useEffect(() => {
    let t;
    if (isWarning && isHiding && !isGameOver) {
      t = setTimeout(() => {
        // 1.8秒間ハイドし続けたので回避成功
        setEnemyLeftEffect(true);
        setTimeout(() => setEnemyLeftEffect(false), 1500);
        setIsWarning(false);
      }, 1500);
    }
    return () => clearTimeout(t);
  }, [isWarning, isHiding, isGameOver]);

  // ─── 隠れるキーバインド (Hキー) ──────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'h' && !currentMessage && !activeFile && !isGameOver && !isTransitioning) {
        setIsHiding(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === 'h') {
        setIsHiding(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [currentMessage, activeFile, isGameOver, isTransitioning]);

  // ─── スキャナー設定 ────────────────────────────────────────────────────────
  const scannerSize = 250; // 固定サイズ
  const halfSize = scannerSize / 2;

  const clipPathStyle = (!isHiding) ? {
    clipPath: `inset(calc(${lightY}px - ${halfSize}px) calc(100% - ${lightX}px - ${halfSize}px) calc(100% - ${lightY}px - ${halfSize}px) calc(${lightX}px - ${halfSize}px))`,
    WebkitClipPath: `inset(calc(${lightY}px - ${halfSize}px) calc(100% - ${lightX}px - ${halfSize}px) calc(100% - ${lightY}px - ${halfSize}px) calc(${lightX}px - ${halfSize}px))`,
  } : {
    clipPath: `inset(100% 100% 100% 100%)`,
    WebkitClipPath: `inset(100% 100% 100% 100%)`,
  };

  // ─── ドラッグ視点移動ハンドラ ──────────────────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    if (currentMessage || activeFile || isTransitioning || isGameOver) return;
    // アイテム（ボタン）をクリックした場合はドラッグを開始しない
    if (e.target.closest('button')) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => setIsDragging(false);

  const handlePointerMove = (e) => {
    if (currentMessage || activeFile || isTransitioning || isGameOver) return;
    
    if (USE_FPS_VIEW) {
      if (!isDragging) return;
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      
      // ドラッグ方向と逆にカメラ（lightX/Y）を移動させることで画像を引っ張る感覚にする
      setLightX(prev => Math.max(0, Math.min(window.innerWidth, prev - deltaX * 1.5)));
      setLightY(prev => Math.max(0, Math.min(window.innerHeight, prev - deltaY * 1.5)));
    } else {
      // スキャナー用の既存ロジック
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const rawX = e.clientX - rect.left;
        const rawY = e.clientY - rect.top;
        setLightX(Math.max(halfSize, Math.min(rect.width - halfSize, rawX)));
        setLightY(Math.max(halfSize, Math.min(rect.height - halfSize, rawY)));
      } else {
        setLightX(e.clientX);
        setLightY(e.clientY);
      }
    }
  };

  // ─── HUD要素の座標取得 ──────────────────────────────────────────────────────────
  const getTarget = useCallback((elId, fallbackX) => {
    const el = document.getElementById(elId);
    if (el) {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return { x: fallbackX, y: 40 };
  }, []);

  // ─── パーティクル発火 ─────────────────────────────────────────────────────────
  const triggerParticle = useCallback((sx, sy, type) => {
    setTimeout(() => {
      const t = type === 'chip'
        ? getTarget('fc-chip-counter', window.innerWidth / 2)
        : getTarget('fc-file-counter', window.innerWidth / 2 + 120);
      setAnimations(prev => [...prev, {
        id: Date.now() + Math.random(),
        startX: sx, startY: sy,
        targetX: t.x, targetY: t.y,
        color: type === 'chip' ? 'cyan' : 'green',
      }]);
    }, 50);
  }, [getTarget]);

  // ─── メッセージ表示 ───────────────────────────────────────────────────────────
  const showMessages = useCallback((msgs) => {
    if (!msgs || msgs.length === 0) return;
    setMessageQueue(msgs.slice(1));
    setCurrentMessage(msgs[0]);
    setDisplayedText('');
    setIsTyping(true);
  }, []);

  // ─── 次のメッセージへ ─────────────────────────────────────────────────────────
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

  // ─── タイピングエフェクト ──────────────────────────────────────────────────────
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

  // ─── キーボードサポート ──────────────────────────────────────────────────────
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

  // ─── 部屋移動 ────────────────────────────────────────────────────────────────
  const moveRoom = (dir) => {
    if (isTransitioning || currentMessage || activeFile || isGameOver) return;
    const next = roomIndex + dir;
    if (next < 0 || next >= ROOMS.length) return;
    setIsTransitioning(true);
    setIsBlackout(true);
    setTimeout(() => {
      setRoomIndex(next);
      setIsBlackout(false);
    }, 300);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  // ─── チップクリック ──────────────────────────────────────────────────────────
  const handleChipClick = (chip, e) => {
    e.stopPropagation();
    if (currentMessage || isTransitioning || activeFile || isGameOver || collectedChips.has(chip.id)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    const nextCount = chipCount + 1;
    setCollectedChips(p => new Set([...p, chip.id]));
    setPendingParticle({ sx, sy, type: 'chip' });
    const lv = Math.min(chipCount, MUTSUNORI_CHIP.length - 1);
    const sysLine = {
      speaker: 'システム', role: 'SYSTEM',
      text: `セキュリティコードの断片を入手：${chip.label}`
    };
    if (nextCount >= totalChips) {
      showMessages([sysLine, ...MUTSUNORI_CHIP[lv], ...MUTSUNORI_GATE]);
      setTimeout(() => setGateUnlocked(true), 5000);
    } else {
      showMessages([sysLine, ...MUTSUNORI_CHIP[lv]]);
    }
  };

  // ─── ファイルクリック ─────────────────────────────────────────────────────────
  const handleFileClick = (file, e) => {
    e.stopPropagation();
    if (currentMessage || isTransitioning || activeFile || isGameOver || collectedFiles.has(file.id)) return;
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.left + r.width / 2, sy = r.top + r.height / 2;
    setCollectedFiles(p => new Set([...p, file.id]));
    setPendingParticle({ sx, sy, type: 'file' });
    setActiveFile(file); // メッセージキューではなくモーダルを開く
  };

  // ─── ファイルモーダルを閉じる ──────────────────────────────────────────────────
  const closeActiveFile = () => {
    setActiveFile(null);
    // モーダルを閉じた直後に睦典のコメントを発生させる
    const lv = Math.min(collectedFiles.size - 1, MUTSUNORI_FILE.length - 1);
    const talk = MUTSUNORI_FILE[lv] || MUTSUNORI_FILE[0];
    showMessages(talk);
  };

  // ─── パーティクル完了 ─────────────────────────────────────────────────────────
  const handleParticleComplete = useCallback((id) => {
    setAnimations(p => p.filter(a => a.id !== id));
  }, []);

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
      {/* Removed inline glass-panel style since it is globally defined in index.css */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full select-none z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ cursor: USE_FPS_VIEW ? (isDragging ? 'grabbing' : 'grab') : 'crosshair' }}
      >
        {USE_FPS_VIEW ? (
          <div style={{ perspective: '1000px' }} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div 
              className="absolute w-[180%] h-[180%] -left-[40%] -top-[40%] transition-transform duration-150 ease-out"
              style={{
                // 酔い対策：rotateを抑えつつ、ドラッグ時のレスポンスを確保するduration設定
                transform: `translateX(${xRatio * -maxPanX}px) translateY(${yRatio * -maxPanY}px) rotateX(${yRatio * -2}deg) rotateY(${xRatio * 4}deg)`
              }}
            >
              <img
                src={assetPath(currentRoom.bg)}
                alt="bg front"
                className="absolute inset-0 w-full h-full object-cover select-none"
              />
              {/* アイテムスポット */}
              <div className="absolute inset-0 z-20 pointer-events-auto" style={isHiding ? { display: 'none' } : {}}>
                {currentRoomItems.chips.map(c => renderSpot(c, 'chip', handleChipClick))}
                {currentRoomItems.files.map(f => renderSpot(f, 'file', handleFileClick))}
              </div>
            </div>
            {/* FPS用周辺減光（ビネット） */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-30" />
          </div>
        ) : (
          <>
            {/* 背景画像（常に明るく全体表示） */}
            <img
              src={assetPath(currentRoom.bg)}
              alt="bg blur"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
            />

            {/* ─── サイバースキャナーレンズ（UI・背景フィルター） ─── */}
            <div
              className="absolute pointer-events-none z-10 flex items-center justify-center border border-green-500/20"
              style={{
                width: scannerSize,
                height: scannerSize,
                left: lightX - halfSize,
                top: lightY - halfSize,
                backdropFilter: 'invert(1) hue-rotate(180deg) sepia(0.2) contrast(1.2)',
                WebkitBackdropFilter: 'invert(1) hue-rotate(180deg) sepia(0.2) contrast(1.2)'
              }}
            >
              {/* 四隅のレティクル */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400" />

              {/* 中央の十字 */}
              <div className="absolute w-8 h-[1px] bg-green-500/40" />
              <div className="absolute w-[1px] h-8 bg-green-500/40" />

              {/* 走査線エフェクト */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay" />
            </div>

            {/* ─── アイテムスポット（スキャナー内のみ表示・クリック可能） ─── */}
            <div className="absolute inset-0 z-20" style={clipPathStyle}>
              {currentRoomItems.chips.map(c => renderSpot(c, 'chip', handleChipClick))}
              {currentRoomItems.files.map(f => renderSpot(f, 'file', handleFileClick))}
            </div>
          </>
        )}
      </div>



      {/* 暗転オーバーレイ */}
      <div
        className={`absolute inset-0 bg-black z-[35] pointer-events-none transition-opacity duration-300 ${isBlackout ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* ─── ハイド中の暗転エフェクト ─── */}
      {isHiding && (
        <div className="absolute inset-0 bg-black/80 z-[36] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-200">
          {enemyLeftEffect ? (
            <span className="text-green-400 font-orbitron text-2xl tracking-[0.5em] animate-bounce drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]">CLEAR</span>
          ) : (
            <span className="text-blue-300 font-orbitron text-2xl tracking-[0.5em] animate-pulse">HIDING...</span>
          )}
        </div>
      )}

      {/* ─── 警告UI ─── */}
      {isWarning && (
        <div className="absolute inset-x-0 top-1/3 flex flex-col items-center justify-center pointer-events-none z-40">
          <div className="bg-red-900/80 border border-red-500 px-8 py-3 rounded-lg flex items-center gap-4 shadow-[0_0_40px_rgba(239,68,68,0.5)]" style={{ animation: 'pulse 0.5s ease-in-out infinite' }}>
            <Shield className="w-7 h-7 text-red-400 animate-ping" />
            <span className="text-red-100 font-bold text-lg tracking-[0.3em] font-orbitron">【警告】巡回兵器接近中...！</span>
          </div>
          <p className="mt-3 text-yellow-300/80 text-sm font-orbitron tracking-widest">[ H ] キーを長押しして隠れろ！</p>
        </div>
      )}

      {/* ─── ダメージエフェクト ─── */}
      {damageEffect && (
        <div className="absolute inset-0 bg-red-600/40 z-[100] pointer-events-none" />
      )}

      {/* ─── HIDE ボタン（画面右下） ─── */}
      {ENABLE_STEALTH_MODE && !currentMessage && !isGameOver && (
        <div className="absolute bottom-24 right-8 z-40">
          <button
            onPointerDown={() => { if (!currentMessage && !activeFile && !isGameOver && !isTransitioning) setIsHiding(true); }}
            onPointerUp={() => setIsHiding(false)}
            onPointerLeave={() => setIsHiding(false)}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 flex flex-col items-center justify-center font-orbitron font-bold text-sm md:text-base transition-all duration-150 select-none ${isHiding
              ? 'bg-blue-700/90 border-blue-300 text-white shadow-[0_0_25px_rgba(37,99,235,0.8)] scale-95'
              : isWarning
                ? 'bg-red-900/80 border-red-400 text-red-100 animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                : 'bg-black/60 border-gray-500/70 text-gray-400 hover:border-gray-300 hover:text-gray-200'
              }`}
          >
            <span>HIDE</span>
            <span className="text-[8px] tracking-widest opacity-70">[H]</span>
          </button>
        </div>
      )}

      {/* ドラッグ操作のチュートリアル */}
      {!currentMessage && !activeFile && !isGameOver && (
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-black/80 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 rounded-full flex items-center gap-3 pointer-events-none z-30 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <ArrowLeftRight className="w-4 h-4 animate-bounce" />
          {USE_FPS_VIEW ? 'DRAG TO EXPLORE' : 'MOVE MOUSE TO EXPLORE'}
        </motion.div>
      )}

      {/* ─── HUD上部（メッセージ中は非表示） ─── */}
      {!currentMessage && !isGameOver && (
        <div className="absolute top-4 lg:top-6 left-0 right-0 z-30 flex items-start justify-between px-2 pr-12 lg:px-8 pointer-events-none">
          {/* 左側：エリア名＋記憶ゲージ */}
          <div className="flex flex-col gap-2">
            {/* エリア名 */}
            <div className="glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <h2 className="text-[10px] lg:text-sm font-bold text-slate-800 tracking-[0.2em]">
                {currentRoom.name}
              </h2>
            </div>
            {/* 睦典の記憶（ライフ）ゲージ */}
            {ENABLE_STEALTH_MODE && (
            <div className="glass-panel px-3 py-1.5 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3 border border-red-700/30">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 text-red-400" />
              <span className="text-[8px] lg:text-[10px] font-orbitron text-red-500 tracking-widest font-bold">HP</span>
              <div className="flex gap-1 lg:gap-1.5">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`w-2 h-3 lg:w-3.5 lg:h-4 rounded-sm transition-all duration-500 ${i < mutsunoriHealth
                      ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
                      : 'bg-slate-200 border border-slate-300'
                      }`}
                  />
                ))}
              </div>
            </div>
            )}
          </div>

          {/* コレクション状況＆タイマー */}
          <div className="flex flex-col gap-1.5 lg:gap-2 items-end">
            {/* タイマー */}
            <div className={`glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3 transition-colors ${timeLeft <= 30 ? 'border-red-500/50 animate-pulse text-red-500' : 'text-slate-700'}`}>
              <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="text-[11px] lg:text-xs font-orbitron tracking-widest font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <div id="fc-chip-counter"
              className="glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <Shield className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sky-500" />
              <span className="text-[11px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">CHIP</span>
              <div className="flex items-center gap-1.5 lg:gap-2">
                {Array.from({ length: totalChips }, (_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < chipCount
                    ? 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]'
                    : 'bg-transparent border-white/30'}`}
                  />
                ))}
              </div>
            </div>
            <div id="fc-file-counter"
              className="glass-panel px-4 py-2 lg:px-6 lg:py-3 rounded-full flex items-center gap-2 lg:gap-3">
              <FileText className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-green-500" />
              <span className="text-[11px] lg:text-xs font-orbitron text-slate-600 tracking-widest font-bold">FILE</span>
              <div className="flex items-center gap-1.5 lg:gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full border transition-all duration-500 ${i < fileCount
                    ? 'bg-green-400 border-green-300 shadow-[0_0_8px_rgba(74,222,128,0.8)]'
                    : 'bg-transparent border-white/30'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ─── 左右移動ボタン（メッセージ中は非表示） ─── */}
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
          className="absolute bottom-8 right-8 z-30 bg-cyan-900/60 backdrop-blur-sm border border-cyan-400/50
                     px-6 py-3 rounded-md text-cyan-200 font-orbitron text-sm tracking-widest
                     hover:bg-cyan-700/60 hover:border-cyan-300 hover:text-white transition-all duration-200
                     flex items-center gap-2 shadow-[0_0_20px_rgba(103,232,249,0.3)]"
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
            <h2 className="text-red-500 text-4xl md:text-6xl font-orbitron tracking-[0.3em] font-bold mb-8 animate-pulse shadow-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">
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
                setMutsunoriHealth(3);
                setEnemyCounter(20);
                setIsWarning(false);
                setWarningCount(0);
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
