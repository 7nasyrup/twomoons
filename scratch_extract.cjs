const fs = require('fs');
const lines = fs.readFileSync('src/data/scenario.js', 'utf8').split('\n');
const target = {
    '睦典': 'Mutsunori',
    'ヒルミ教授': 'Hirumi',
    'ミカ': 'Mika',
    '凪砂': 'Nagisa',
    '大男': 'Akane',
    'アカネ': 'Akane',
    '満': 'Michiru',
    '黒騎士': 'BlackKnight'
};

let out = [];
for (let i = 1927; i < lines.length; i++) {
    if (lines[i].includes('speaker:')) {
        const match = lines[i].match(/speaker:\s*"([^"]+)"/);
        if (match && target[match[1]]) {
            const textLine = lines.slice(i, i + 5).find(l => l.includes('text:'));
            if (textLine) {
                out.push({
                    line: i + 1, // 1-indexed to match text? No, line is 0-indexed in array. i is line number - 1. So line number in file is i + 1. Wait, let's just keep i.
                    name: target[match[1]],
                    text: textLine.trim()
                });
            }
        }
    }
}

fs.writeFileSync('scratch_dialogues.json', JSON.stringify(out, null, 2));
console.log("Done extracting " + out.length + " lines.");
