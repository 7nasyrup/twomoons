import React, { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if device is iOS (iPhone/iPad/iPod)
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    // Check if the app is already in standalone mode (added to home screen)
    const isInStandaloneMode = () => {
      return ('standalone' in window.navigator) && (window.navigator.standalone);
    };

    // If it's an iOS device and NOT in standalone mode, show the prompt
    if (isIos() && !isInStandaloneMode()) {
      setShowPrompt(true);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white text-slate-900 flex flex-col items-center justify-center p-6 text-center select-none touch-none">
      <div className="max-w-md w-full bg-slate-50 border border-slate-200 shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-6 relative">
        
        {/* Icon / Illustration area */}
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5m0 0l-3 3m3-3l3 3M4 15v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 9V7a2 2 0 012-2h12a2 2 0 012 2v2" />
          </svg>
        </div>

        <h1 className="text-xl font-bold tracking-wider">
          ホーム画面に追加して遊ぶ
        </h1>
        
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          快適にゲームをプレイするため、フルスクリーンでの起動が必須です。<br/><br/>
          画面下部（または上部）の<br/>
          <strong className="text-blue-600">「共有ボタン[↑]」</strong>をタップし、<br/>
          <strong className="text-blue-600">「ホーム画面に追加」</strong><br/>
          を選択して、ホーム画面からゲームを起動してください。
        </p>

        {/* Animated Arrow pointing down for iOS */}
        <div className="mt-8 flex flex-col items-center gap-2 animate-bounce text-blue-500">
          <span className="text-xs font-bold tracking-widest uppercase">Tap Here</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

      </div>
    </div>
  );
}
