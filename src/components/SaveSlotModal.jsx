import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, FolderOpen, X, Clock, MapPin, ChevronRight } from 'lucide-react';
import { assetPath } from '../utils/assetPath';

// ─── 定数 ────────────────────────────────────────────────────────────────────
export const SAVE_SLOT_COUNT = 10;
export const SAVE_KEY_PREFIX = 'twomoons_save_slot_';

// キャラクター設定（SpriteSlot.jsx と同じ定義）
const SPEAKER_CONFIGS = {
  "睦典":     { folder: "/character/Mutsunori", baseFileName: "Mutsunori", defaultExpression: "smile",        posX: "5%",  width: "45%" },
  "ヒルミ教授": { folder: "/character/Hirumi",   baseFileName: "Hirumi",    defaultExpression: "smile",        posX: "50%", width: "45%" },
  "ミカ":     { folder: "/character/Mika",      baseFileName: "Mika",      defaultExpression: "neutral",      posX: "50%", width: "45%" },
  "凪砂":     { folder: "/character/Nagisa",    baseFileName: "Nagisa",    defaultExpression: "neutral",      posX: "22%", width: "45%" },
  "大男":     { folder: "/character/Akane",     baseFileName: "Akane",     defaultExpression: "neutral",      posX: "22%", width: "45%" },
  "アカネ":   { folder: "/character/Akane",     baseFileName: "Akane",     defaultExpression: "neutral",      posX: "22%", width: "45%" },
  "満":       { folder: "/character/Michiru",   baseFileName: "Michiru",   defaultExpression: "smile",        posX: "15%", width: "45%" },
  "黒騎士":   { folder: "/character/Hirumi",    baseFileName: "Hirumi",    defaultExpression: "black_knight", posX: "15%", width: "45%" },
};

// ─── 全スロット読み込み ───────────────────────────────────────────────────────
export function loadAllSlots() {
  return Array.from({ length: SAVE_SLOT_COUNT }, (_, i) => {
    const raw = localStorage.getItem(`${SAVE_KEY_PREFIX}${i}`);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  });
}

// ─── 日時フォーマット ─────────────────────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}  ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// ─── サムネイル合成コンポーネント ─────────────────────────────────────────────
function SceneThumbnail({ data }) {
  // presentCharacters から立ち絵パスを解決
  const sprites = (data.presentCharacters || []).map(charKey => {
    const base = charKey.split('_')[0];
    const cfg = SPEAKER_CONFIGS[base];
    if (!cfg) return null;
    const underscoreIdx = charKey.indexOf('_');
    const expression = underscoreIdx !== -1
      ? charKey.substring(underscoreIdx + 1)
      : cfg.defaultExpression;
    return {
      src: assetPath(`${cfg.folder}/${cfg.baseFileName}_${expression}.png`),
      posX: cfg.posX,
      width: cfg.width,
      key: charKey,
    };
  }).filter(Boolean);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 背景 */}
      {data.bgPath && (
        <img
          src={data.bgPath}
          alt="背景"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.88)' }}
        />
      )}

      {/* キャラクター立ち絵（本編と同じ下揃え、少しはみ出す） */}
      {sprites.map(sp => (
        <img
          key={sp.key}
          src={sp.src}
          alt={sp.key}
          className="absolute object-contain object-bottom pointer-events-none"
          style={{
            left: sp.posX,
            width: sp.width,
            height: '135%',
            bottom: '-10%',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
          }}
        />
      ))}

      {/* アイテム表示 */}
      {data.displayedItem && (
        <img
          src={data.displayedItem}
          alt="アイテム"
          className="absolute inset-0 m-auto object-contain"
          style={{
            maxWidth: '50%',
            maxHeight: '60%',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.6))',
          }}
        />
      )}

      {/* 右端フェード（テキスト領域との境界をなじませる） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent 55%, rgba(255,255,255,0.75) 100%)' }}
      />
    </div>
  );
}

// ─── メインモーダル ───────────────────────────────────────────────────────────
export default function SaveSlotModal({ mode, onClose, onSelectSlot, slots }) {
  const isSave = mode === 'save';
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <AnimatePresence>
      {/* バックドロップ */}
      <motion.div
        className="fixed inset-0 z-[300] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* パネル本体：ゲーム本編と同じ白いフロストガラス */}
        <motion.div
          className="relative w-full max-w-2xl mx-4"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(231,202,177,0.5)',
          }}
          initial={{ scale: 0.95, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 16, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── ヘッダー（スピーカー名プレートと同じデザイン） ── */}
          <div className="flex items-center justify-between px-8 pt-8 pb-4">
            <div className="inline-flex items-center gap-2.5 bg-white border border-slate-200 text-slate-800 text-sm font-bold tracking-[0.15em] px-6 py-2.5 rounded-xl shadow-sm font-noto">
              {isSave
                ? <><Save size={15} className="text-sky-400" /> セーブデータ</>
                : <><FolderOpen size={15} className="text-indigo-400" /> ロードデータ</>
              }
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-all duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* 区切り線 */}
          <div className="mx-8 h-px bg-slate-100" />

          {/* スロット一覧（スクロール対応） */}
          <div className="px-8 py-5 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {slots.map((slot, i) => (
              <SlotCard
                key={i}
                index={i}
                data={slot}
                mode={mode}
                isHovered={hoveredIdx === i}
                onHover={() => setHoveredIdx(i)}
                onLeave={() => setHoveredIdx(null)}
                onSelect={() => onSelectSlot(i, slot)}
              />
            ))}
          </div>

          {/* フッター */}
          <div className="px-8 pb-6 pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-sm font-noto font-bold tracking-wide transition-all duration-200 shadow-sm"
            >
              閉じる
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── スロットカード ────────────────────────────────────────────────────────────
function SlotCard({ index, data, mode, isHovered, onHover, onLeave, onSelect }) {
  const isEmpty = !data;
  const isSave = mode === 'save';
  const isDisabled = !isSave && isEmpty;

  return (
    <motion.button
      className="w-full text-left rounded-xl overflow-hidden flex items-stretch focus:outline-none"
      style={{
        height: 110,
        border: isHovered && !isDisabled
          ? `1.5px solid ${isSave ? 'rgba(56,189,248,0.5)' : 'rgba(99,102,241,0.4)'}`
          : '1.5px solid rgba(0,0,0,0.07)',
        background: isHovered && !isDisabled
          ? isSave ? 'rgba(240,249,255,0.97)' : 'rgba(245,243,255,0.97)'
          : 'rgba(255,255,255,0.75)',
        boxShadow: isHovered && !isDisabled
          ? `0 4px 20px ${isSave ? 'rgba(56,189,248,0.12)' : 'rgba(99,102,241,0.12)'}`
          : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'default' : 'pointer',
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={isDisabled ? undefined : onSelect}
      whileTap={isDisabled ? {} : { scale: 0.985 }}
    >
      {/* ── サムネイル（背景＋立ち絵＋アイテムの合成表示） ── */}
      <div
        className="shrink-0 relative overflow-hidden rounded-l-xl"
        style={{ width: 176, minHeight: 99, background: '#dde3ed' }}
      >
        {data ? (
          <SceneThumbnail data={data} />
        ) : (
          // 空スロットのプレースホルダー
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: isSave ? 'rgba(56,189,248,0.1)' : 'rgba(148,163,184,0.1)' }}
            >
              {isSave
                ? <Save size={18} className="text-sky-300" />
                : <span className="text-slate-300 text-lg">—</span>
              }
            </div>
          </div>
        )}

        {/* スロット番号バッジ */}
        <div
          className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center font-orbitron font-bold text-[11px] z-10"
          style={{
            background: isEmpty
              ? 'rgba(100,116,139,0.5)'
              : isSave ? 'rgba(14,165,233,0.9)' : 'rgba(99,102,241,0.9)',
            color: 'white',
            backdropFilter: 'blur(4px)',
          }}
        >
          {index + 1}
        </div>
      </div>

      {/* ── テキスト情報 ── */}
      <div className="flex-1 flex flex-col justify-center px-5 py-3 min-w-0">
        {isEmpty ? (
          <div>
            <p className="font-noto text-sm text-slate-400">
              {isSave ? '── 空きスロット ──' : '── データなし ──'}
            </p>
            {isSave && (
              <p className="text-[11px] text-slate-400 font-noto mt-1">
                ここに新しくセーブできます
              </p>
            )}
          </div>
        ) : (
          <>
            {/* シーン名 */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <MapPin size={11} className="text-slate-400 shrink-0" />
              <p className="text-slate-800 text-sm font-noto font-bold truncate">
                {data.sceneName || `ステップ ${data.step}`}
              </p>
            </div>
            {/* 日時 */}
            <div className="flex items-center gap-1.5 mb-2">
              <Clock size={10} className="text-slate-400 shrink-0" />
              <p className="text-slate-500 text-[11px] font-orbitron tracking-wider">
                {formatDate(data.savedAt)}
              </p>
            </div>
            {/* セリフテキスト */}
            {data.currentText && (
              <div className="mt-1">
                {data.currentSpeaker && (
                  <span className="inline-block text-[10px] text-slate-500 font-noto font-bold mb-0.5">
                    {data.currentSpeaker}
                  </span>
                )}
                <p
                  className="font-noto text-slate-600 leading-snug"
                  style={{
                    fontSize: 10.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {data.currentText}
                </p>
              </div>
            )}
            {/* 上書きバッジ（SAVEモードのみ） */}
            {isSave && (
              <div className="mt-2">
                <span
                  className="inline-block text-[10px] font-noto px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(251,191,36,0.12)',
                    color: '#d97706',
                    border: '1px solid rgba(251,191,36,0.3)',
                  }}
                >
                  上書き
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── 右矢印インジケーター ── */}
      {!isDisabled && (
        <div className="shrink-0 flex items-center pr-4">
          <motion.div
            animate={{ x: isHovered ? 2 : 0, opacity: isHovered ? 1 : 0.25 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight
              size={18}
              className={isSave ? 'text-sky-400' : 'text-indigo-400'}
            />
          </motion.div>
        </div>
      )}
    </motion.button>
  );
}
