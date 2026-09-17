const fs = require('fs');
const path = require('path');

const componentsDir = 'c:\\Users\\yomog\\.gemini\\antigravity-ide\\scratch\\twomoons\\src\\components';

const files = fs.readdirSync(componentsDir).filter(f => f.startsWith('Battle') && f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace attack3.mp3 calls to include volume 2.5
  content = content.replace(
    /playSE\(\s*assetPath\('([^']+attack3\.mp3)'\)\s*\)/g,
    "playSE(assetPath('$1'), null, false, 2.5)"
  );
  content = content.replace(
    /playSE\(\s*'([^']+attack3\.mp3)'\s*\)/g,
    "playSE('$1', null, false, 2.5)"
  );
  
  // Replace Onoma-Syakiin05-1(Heavy).mp3 calls to include volume 2.5
  content = content.replace(
    /playSE\(typeof assetPath === 'function' \? assetPath\('([^']+)'\) : '([^']+)'\)/g,
    "playSE(typeof assetPath === 'function' ? assetPath('$1') : '$2', null, false, 2.5)"
  );
  content = content.replace(
    /playSE\(\s*'([^']+Onoma-Syakiin05-1\(Heavy\)\.mp3)'\s*\)/g,
    "playSE('$1', null, false, 2.5)"
  );

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Update volume complete.');
