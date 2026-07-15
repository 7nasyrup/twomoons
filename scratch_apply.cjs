const fs = require('fs');

let lines = fs.readFileSync('src/data/scenario.js', 'utf8').split('\n');

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

function getExpression(name, text) {
    if (name === 'Mutsunori') {
        if (text.includes('よかった') || text.includes('安心')) return 'Mutsunori_smile';
        if (text.includes('！') || text.includes('っ') || text.includes('盾') || text.includes('離れ') || text.includes('うわ') || text.includes('ふざけんな')) return 'Mutsunori_serious';
        if (text.includes('？') || text.includes('ええ')) return 'Mutsunori_pout';
        return 'Mutsunori_smile';
    }
    if (name === 'Mika') {
        if (text.includes('！') || text.includes('チッ') || text.includes('クソ') || text.includes('逃げ') || text.includes('伏せ') || text.includes('離れ')) return 'Mika_serious';
        if (text.includes('あ…') || text.includes('！？')) return 'Mika_surprise';
        if (text.includes('ふふ') || text.includes('笑')) return 'Mika_smile';
        return 'Mika_neutral';
    }
    if (name === 'Nagisa') {
        if (text.includes('ふふ') || text.includes('デート') || text.includes('可愛い') || text.includes('綺麗') || text.includes('あはは') || text.includes('最高') || text.includes('安心') || text.includes('運命')) return 'Nagisa_smile';
        if (text.includes('チッ') || text.includes('面倒') || text.includes('邪魔') || text.includes('下がれ') || text.includes('ぐっ') || text.includes('はぁ') || text.includes('うるさい') || text.includes('終わりだ') || text.includes('危ない') || text.includes('クソ') || text.includes('バカ')) return 'Nagisa_serious';
        return 'Nagisa_neutral';
    }
    if (name === 'Akane') {
        return 'Akane_serious';
    }
    if (name === 'Hirumi') {
        if (text.includes('素晴らしい') || text.includes('ふふ')) return 'Hirumi_smile';
        return 'Hirumi_neutral';
    }
    if (name === 'BlackKnight') {
        return 'BlackKnight_serious';
    }
    if (name === 'Michiru') {
        if (text.includes('？') || text.includes('！') || text.includes('っ')) return 'Michiru_serious';
        return 'Michiru_smile';
    }
    return null;
}

let newLines = [];
let currentSpeaker = null;

// Before line 1927, just copy as is.
// Actually, the // ================== #14 逢瀬「時計塔の下で」 ================== is around line 1927.
// We'll just look for that exact comment to start processing, or just use index 1927 since it's close enough.
let startProcessing = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    newLines.push(line);

    if (line.includes('================== #14')) {
        startProcessing = true;
    }

    if (!startProcessing) continue;

    if (line.includes('speaker:')) {
        const match = line.match(/speaker:\s*"([^"]+)"/);
        if (match && target[match[1]]) {
            currentSpeaker = target[match[1]];
        } else {
            currentSpeaker = null;
        }
    }

    if (line.includes('text:') && currentSpeaker) {
        // Look ahead to see if showIllust or illust already exists for this block
        let hasIllust = false;
        for (let j = 1; j <= 4; j++) {
            if (i + j < lines.length) {
                if (lines[i + j].includes('showIllust:') || lines[i + j].includes('illust:')) {
                    hasIllust = true;
                    break;
                }
                if (lines[i + j].includes('}')) break; // End of object
            }
        }

        if (!hasIllust) {
            const expr = getExpression(currentSpeaker, line);
            if (expr) {
                // To maintain comma syntax properly:
                // If the text line ends with '",', we just insert showIllust below.
                // If it ends with '"', we need to append a comma to it!
                // Let's modify the last line in newLines.
                if (newLines[newLines.length - 1].trim().endsWith('"')) {
                    newLines[newLines.length - 1] += ',';
                }
                newLines.push(`    showIllust: ["${expr}"]`);
            }
        }
        currentSpeaker = null; // Reset until next speaker
    }
}

// Write the modified content back
fs.writeFileSync('src/data/scenario.js', newLines.join('\n'));
console.log('Applied showIllust properties.');
