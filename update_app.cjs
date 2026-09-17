const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Destructure visualLine
app = app.replace('    currentLine,\r\n    displayedText,', '    currentLine,\n    visualLine,\n    displayedText,');
app = app.replace('    currentLine,\n    displayedText,', '    currentLine,\n    visualLine,\n    displayedText,'); // handle both CRLF and LF

// 2. Remove force update
const forceUpdateRegex = /\s*\/\/\s*Force update visualLine immediately[\s\S]*?setVisualLine\(scenarioData\[targetStep\]\);/;
app = app.replace(forceUpdateRegex, '');

// 3. Remove visualLine useState and its useEffect
const visualLineStateRegex = /\s*const\s*\[visualLine,\s*setVisualLine\]\s*=\s*useState\(null\);[\s\S]*?setVisualLine\(currentLine\);\r?\n\s*\},\s*\[currentLine,\s*currentStep,\s*isBgTransitioning,\s*currentBg\]\);/;
app = app.replace(visualLineStateRegex, '');

fs.writeFileSync('src/App.jsx', app);
console.log('App.jsx updated');
