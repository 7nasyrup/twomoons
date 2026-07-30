import { useEffect } from 'react';

export default function GoogleAnalytics() {
  useEffect(() => {
    const gaId = import.meta.env.NEXT_PUBLIC_GA_ID;
    if (!gaId) return;

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
