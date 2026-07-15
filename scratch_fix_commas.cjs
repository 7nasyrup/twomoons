const fs = require('fs');
let lines = fs.readFileSync('src/data/scenario.js', 'utf8').split('\n');
let fixed = 0;

for (let i = 0; i < lines.length - 1; i++) {
    const trimmed = lines[i].trim();
    // If a line ends with a string quote
    if (trimmed.endsWith('"')) {
        const next = lines[i+1].trim();
        // and the next line is a property definition (starts with key:)
        if (next.match(/^[a-zA-Z0-9_]+:/)) {
            // It needs a comma!
            lines[i] = lines[i] + ',';
            console.log('Fixed missing comma at line ' + (i+1));
            fixed++;
        }
    }
}

if (fixed > 0) {
    fs.writeFileSync('src/data/scenario.js', lines.join('\n'));
}
console.log('Total fixed: ' + fixed);
