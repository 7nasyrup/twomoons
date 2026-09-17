import { useEffect, useRef } from 'react';
import { assetPath } from '../utils/assetPath';
import { SPEAKER_CONFIGS, SPEAKER_TO_ROMAJI } from '../utils/characterUtils';

export function usePreloader(scenarioData, currentStep) {
  const preloadedUrls = useRef(new Set());

  useEffect(() => {
    if (!scenarioData || !Array.isArray(scenarioData) || currentStep === undefined) return;

    // 先読みするステップ数 (メモリリーク・PWAのクラッシュ対策で30->10に削減)
    const LOOKAHEAD = 10;
    const endStep = Math.min(currentStep + LOOKAHEAD, scenarioData.length);
    
    const urlsToPreload = [];

    const addUrl = (url) => {
      if (url && !preloadedUrls.current.has(url) && url !== 'black' && url !== 'none') {
        // 特別な背景表現などを除外
        if (url.includes('cyber_classroom') || url.includes('giant_blue_moon') || url.includes('school_gate_evening') || url.includes('town_dark') || url.includes('rooftop')) {
           // CSS rendering fallbacks do not necessarily have images, but if they do, we'll try to preload them anyway if assetPath resolves it to a file
           if (!url.includes('.')) return; 
        }
        urlsToPreload.push(assetPath(url));
      }
    };

    const getSpritePath = (charRaw) => {
      let c = charRaw;
      const match = charRaw.match(/^(.+?_(?:bake|yami)\d)([1-6])$/) || charRaw.match(/^((?!.*_(?:bake|yami)\d$).+?)([1-6])$/);
      if (match) c = match[1];
      
      const rawBase = c.split('_')[0];
      const baseName = SPEAKER_TO_ROMAJI[rawBase] || rawBase;
      const config = SPEAKER_CONFIGS[baseName];
      if (!config) return null;

      let expression = config.defaultExpression;
      if (c && c.includes('_')) {
        expression = c.split('_').slice(1).join('_');
        if (expression.match(/^[a-zA-Z]+[0-9]+$/) && !expression.startsWith('bake') && !expression.startsWith('yami')) {
          const m = expression.match(/^([a-zA-Z]+)([0-9]+)$/);
          if (m) expression = m[1];
        }
      }

      let imagePath = `${config.folder}/${config.baseFileName}${expression ? `_${expression}` : ''}.png`;
      if (baseName === "BlackKnight") {
        if (expression === "attack") {
          imagePath = `${config.folder}/BlackKnight_attack.png`;
        } else {
          imagePath = `${config.folder}/BlackKnight.png`;
        }
      }
      return imagePath;
    };

    for (let i = currentStep + 1; i < endStep; i++) {
      const line = scenarioData[i];
      if (!line) continue;

      // 背景 (bg)
      if (line.bg && line.bg.includes('/')) {
        addUrl(line.bg);
      }

      // 立ち絵 (showIllust, illust)
      if (Array.isArray(line.showIllust)) {
        line.showIllust.forEach(charRaw => {
          const path = getSpritePath(charRaw);
          if (path) addUrl(path);
        });
      }
      if (line.illust) {
         const path = getSpritePath(line.illust);
         if (path) addUrl(path);
      }
      if (line.speaker_sprite) {
         const path = getSpritePath(line.speaker_sprite);
         if (path) addUrl(path);
      }
      if (line.showItem) {
         // showItem はパスであることが多い（ex: /item/smartphone.png）
         addUrl(line.showItem);
      }
    }

    // 実際のプリロード処理
    urlsToPreload.forEach(url => {
      preloadedUrls.current.add(url);
      const img = new Image();
      img.src = url;
    });

  }, [scenarioData, currentStep]);
}
