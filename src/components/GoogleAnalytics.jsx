import { useEffect } from 'react';

export default function GoogleAnalytics() {
  useEffect(() => {
    const gaId = import.meta.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

    // 1. URLに ?ignore_ga=true を付けてアクセスした場合、以降そのブラウザではカウントしないようにする
    if (window.location.search.includes('ignore_ga=true')) {
      localStorage.setItem('ignore_ga', 'true');
      alert('【開発者モード】\nこのブラウザからのアクセスは今後Googleアナリティクスでカウントされなくなりました！');
    }

    // 2. ローカルでのテスト中はカウントしない
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Google Analytics: Localhost detected. Tracking disabled.');
      return;
    }

    // すでに除外設定済みのブラウザならカウントしない
    if (localStorage.getItem('ignore_ga') === 'true') {
      console.log('Google Analytics: Developer mode detected. Tracking disabled.');
      return;
    }

    if (document.getElementById('ga-script')) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    const initScript = document.createElement('script');
    initScript.id = 'ga-init';
    initScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    `;
    document.head.appendChild(initScript);
  }, []);

  return null;
}
