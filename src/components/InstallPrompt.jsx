import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * InstallPrompt
 *
 * iOS:     縦向きでも即表示（Safari の「ホーム画面に追加」手順を案内）
 * Android: PortraitWarningOverlay が消えた後（横向きになった後）に表示
 *          「ブラウザで遊ぶ」か「インストール」かを選ばせる
 *
 * Props:
 *   landscapeReady (bool) - 横向きになったら true になる（Androidで使用）
 */
export default function InstallPrompt({ landscapeReady = false }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState(null); // 'ios' | 'android' | null
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installStep, setInstallStep] = useState('choice'); // 'choice' | 'ios-guide'
  const hasShown = useRef(false);

  // beforeinstallprompt を早めにキャッチ（Androidのみ発火）
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isAndroid = /android/.test(ua);
    const isStandalone =
      ('standalone' in window.navigator && window.navigator.standalone) ||
      window.matchMedia('(display-mode: standalone)').matches;

    // 既にスタンドアロン（インストール済み）なら何もしない
    if (isStandalone) return;

    // 一度「ブラウザで遊ぶ」を選んだらもう出さない
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) return;

    if (isIos) {
      setPlatform('ios');
      // iOS は縦横関係なく即表示
      setShowPrompt(true);
    } else if (isAndroid) {
      setPlatform('android');
      // Android は landscapeReady になってから表示（縦→横の後）
      // landscapeReady が既に true の場合も考慮
    }
  }, []);

  // Android: landscapeReady が true になった瞬間に一度だけ表示
  useEffect(() => {
    if (platform === 'android' && landscapeReady && !hasShown.current) {
      hasShown.current = true;
      setShowPrompt(true);
    }
  }, [platform, landscapeReady]);

  // 「ブラウザで遊ぶ」を選んだとき
  const handleDismiss = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setShowPrompt(false);
  };

  // 「インストール」を選んだとき
  const handleInstall = async () => {
    if (platform === 'android') {
      if (deferredPrompt) {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          localStorage.setItem('installPromptDismissed', 'true');
        }
        setShowPrompt(false);
      } else {
        // beforeinstallprompt が来ていない場合（条件不足など）は
        // ブラウザのメニューから追加するよう案内する
        setInstallStep('android-guide');
      }
    } else if (platform === 'ios') {
      setInstallStep('ios-guide');
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          key="install-prompt"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative max-w-sm w-full mx-4 rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              border: '1px solid rgba(0, 229, 255, 0.2)',
              boxShadow: '0 0 40px rgba(0, 229, 255, 0.1), 0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* 上部グロー */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #00e5ff, transparent)' }}
            />

            {installStep === 'choice' && (
              <ChoicePanel
                platform={platform}
                onInstall={handleInstall}
                onDismiss={handleDismiss}
              />
            )}

            {installStep === 'ios-guide' && (
              <IosGuidePanel onClose={handleDismiss} />
            )}

            {installStep === 'android-guide' && (
              <AndroidGuidePanel onClose={handleDismiss} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   選択パネル（共通）
───────────────────────────────────────────── */
function ChoicePanel({ platform, onInstall, onDismiss }) {
  return (
    <div className="p-8 flex flex-col items-center gap-6 text-center">
      {/* アイコン */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{
          background: 'rgba(0, 229, 255, 0.1)',
          border: '1px solid rgba(0, 229, 255, 0.3)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#00e5ff"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM12 2v1m0 18v1M4.22 4.22l.7.7m14.14 14.14.7.7M2 12h1m18 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-100 mb-1 tracking-wider font-noto">
          Two Moons
        </h2>
        <p className="text-sm text-slate-400 font-noto">
          プレイ方法を選択してください
        </p>
      </div>

      {/* ボタン：インストール */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onInstall}
        className="w-full py-4 rounded-xl font-bold text-sm tracking-widest font-noto"
        style={{
          background: 'linear-gradient(135deg, #00e5ff 0%, #0077ff 100%)',
          color: '#0f172a',
          boxShadow: '0 4px 20px rgba(0, 229, 255, 0.3)',
        }}
      >
        📲 ホーム画面にインストール
      </motion.button>

      {/* ボタン：ブラウザで遊ぶ */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onDismiss}
        className="w-full py-3 rounded-xl font-bold text-sm tracking-widest font-noto"
        style={{
          background: 'transparent',
          border: '1px solid rgba(148, 163, 184, 0.3)',
          color: '#94a3b8',
        }}
      >
        🌐 ブラウザでそのまま遊ぶ
      </motion.button>

      <p className="text-xs text-slate-600 font-noto leading-relaxed">
        インストールするとフルスクリーンで<br />快適に遊べます（通信不要）
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   iOS 案内パネル
───────────────────────────────────────────── */
function IosGuidePanel({ onClose }) {
  return (
    <div className="p-8 flex flex-col items-center gap-5 text-center">
      <h2 className="text-lg font-bold text-slate-100 font-noto tracking-wider">
        ホーム画面への追加手順
      </h2>
      <div className="flex flex-col gap-3 w-full text-left">
        {[
          { step: '①', text: 'Safari 下部の 共有ボタン [↑] をタップ' },
          { step: '②', text: '「ホーム画面に追加」を選択' },
          { step: '③', text: '右上の「追加」をタップして完了！' },
        ].map(({ step, text }) => (
          <div
            key={step}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.1)' }}
          >
            <span className="text-[#00e5ff] font-bold text-lg font-noto shrink-0">{step}</span>
            <span className="text-slate-300 text-sm font-noto">{text}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-col items-center gap-1 animate-bounce text-[#00e5ff]">
        <span className="text-xs font-bold tracking-widest font-noto">画面下部</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      <button
        onClick={onClose}
        className="mt-2 text-xs text-slate-500 font-noto underline underline-offset-2"
      >
        ブラウザで遊ぶ
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Android 案内パネル（beforeinstallprompt 未発火時のフォールバック）
───────────────────────────────────────────── */
function AndroidGuidePanel({ onClose }) {
  return (
    <div className="p-8 flex flex-col items-center gap-5 text-center">
      <h2 className="text-lg font-bold text-slate-100 font-noto tracking-wider">
        ホーム画面への追加手順
      </h2>
      <div className="flex flex-col gap-3 w-full text-left">
        {[
          { step: '①', text: 'Chrome 右上の ⋮（メニュー）をタップ' },
          { step: '②', text: '「アプリをインストール」または「ホーム画面に追加」を選択' },
          { step: '③', text: '「インストール」をタップして完了！' },
        ].map(({ step, text }) => (
          <div
            key={step}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(0, 229, 255, 0.05)', border: '1px solid rgba(0, 229, 255, 0.1)' }}
          >
            <span className="text-[#00e5ff] font-bold text-lg font-noto shrink-0">{step}</span>
            <span className="text-slate-300 text-sm font-noto">{text}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-2 text-xs text-slate-500 font-noto underline underline-offset-2"
      >
        ブラウザで遊ぶ
      </button>
    </div>
  );
}
