const fs = require('fs');
const path = require('path');

const componentsDir = 'c:\\Users\\yomog\\.gemini\\antigravity-ide\\scratch\\twomoons\\src\\components';

const files = fs.readdirSync(componentsDir).filter(f => f.startsWith('Battle') && f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace normal attack sound
  content = content.replace(/\+game_sword\.mp3/g, 'attack3.mp3');
  
  // Replace special move sound
  const ultimatePattern = /setUltimateFlash\(true\);/g;
  const ultimateSE = "if (typeof playSE === 'function') playSE(typeof assetPath === 'function' ? assetPath('/assets/audio/bgm/Onoma-Syakiin05-1(Heavy).mp3') : '/assets/audio/bgm/Onoma-Syakiin05-1(Heavy).mp3');";
  
  if (ultimatePattern.test(content)) {
    if (!content.includes('Onoma-Syakiin05-1(Heavy).mp3')) {
      content = content.replace(/setUltimateFlash\(true\);/g, `setUltimateFlash(true);\n    ${ultimateSE}`);
    }
  }

  if (file === 'BattleStaffRhythm.jsx') {
    if (!content.includes('Onoma-Syakiin05-1(Heavy).mp3')) {
      content = content.replace(
        /setBattlePhase\('ultimate'\);/g,
        `setBattlePhase('ultimate');\n    if (typeof playSE === 'function') playSE('/assets/audio/bgm/Onoma-Syakiin05-1(Heavy).mp3');`
      );
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Update complete.');
