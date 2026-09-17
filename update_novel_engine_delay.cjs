const fs = require('fs');
let code = fs.readFileSync('src/hooks/useNovelEngine.js', 'utf8');

// The string to find
const searchStr1 = "setCurrentBg(nextBgRef.current);\n        setVisualLine(currentLine);\n        // 暗転を解除";
const replaceStr1 = "setCurrentBg(nextBgRef.current);\n        setTimeout(() => setVisualLine(currentLine), 200);\n        // 暗転を解除";

const searchStr1_CRLF = "setCurrentBg(nextBgRef.current);\r\n        setVisualLine(currentLine);\r\n        // 暗転を解除";
const replaceStr1_CRLF = "setCurrentBg(nextBgRef.current);\r\n        setTimeout(() => setVisualLine(currentLine), 200);\r\n        // 暗転を解除";

const searchStr2 = "setCurrentBg(newBg);\n        setVisualLine(currentLine);";
const replaceStr2 = "setCurrentBg(newBg);\n        setTimeout(() => setVisualLine(currentLine), 200);";

const searchStr2_CRLF = "setCurrentBg(newBg);\r\n        setVisualLine(currentLine);";
const replaceStr2_CRLF = "setCurrentBg(newBg);\r\n        setTimeout(() => setVisualLine(currentLine), 200);";

code = code.replace(searchStr1, replaceStr1);
code = code.replace(searchStr1_CRLF, replaceStr1_CRLF);
code = code.replace(searchStr2, replaceStr2);
code = code.replace(searchStr2_CRLF, replaceStr2_CRLF);

fs.writeFileSync('src/hooks/useNovelEngine.js', code);
console.log('useNovelEngine.js delayed update done');
