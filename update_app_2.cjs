const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// The string to find
const searchStr1 = "const [visualLine, setVisualLine] = useState(null);";
const searchStr2 = "// Sync visual line with current line, but pause if bg is transitioning";
const searchStr3 = "}, [currentLine, currentStep, isBgTransitioning, currentBg]);";

let index1 = app.indexOf(searchStr1);
if (index1 !== -1) {
    let nextNewline = app.indexOf('\n', index1);
    app = app.substring(0, index1) + app.substring(nextNewline + 1);
}

let index2 = app.indexOf(searchStr2);
if (index2 !== -1) {
    let index3 = app.indexOf(searchStr3, index2);
    if (index3 !== -1) {
        let endIdx = index3 + searchStr3.length;
        let nextNewline = app.indexOf('\n', endIdx);
        app = app.substring(0, index2) + app.substring(nextNewline !== -1 ? nextNewline + 1 : endIdx);
    }
}

fs.writeFileSync('src/App.jsx', app);
console.log('App.jsx second update done');
