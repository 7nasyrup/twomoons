const fs = require('fs');
let code = fs.readFileSync('src/hooks/useNovelEngine.js', 'utf8');

// Add visualLine update after bg transition logic
code = code.replace('setCurrentBg(newBg);\r\n      }', 'setCurrentBg(newBg);\n        setVisualLine(currentLine);\n      }\n    } else {\n      setVisualLine(currentLine);\n    }');

// Add visualLine update after blackout finishes
code = code.replace('setCurrentBg(nextBgRef.current);\r\n        // 暗転を解除', 'setCurrentBg(nextBgRef.current);\n        setVisualLine(currentLine);\n        // 暗転を解除');

// Export visualLine
code = code.replace('currentLine,\r\n    displayedText,', 'currentLine,\n    visualLine,\n    displayedText,');

fs.writeFileSync('src/hooks/useNovelEngine.js', code);
console.log('Update done');
