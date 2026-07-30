const fs = require('fs');
const path = require('path');
const scenarioPath = path.join('c:/Users/7nasy/projects/twomoons/src/data/scenario.js');
const content = fs.readFileSync(scenarioPath, 'utf8');
const json = content.replace('export const scenarioData = ', '').replace(/;$/, '');
const data = new Function('return ' + json)();

const routes = [
    {name: 'Nagisa', target: 'Nagisa', start: 1337, end: 1741},
    {name: 'Mika', target: 'Mika', start: 1742, end: 2056},
    {name: 'Mutsunori', target: 'Mutsunori', start: 2057, end: 2507},
    {name: 'Akane', target: 'Akane', start: 2508, end: 2788}
];

let changedCount = 0;

routes.forEach(r => {
    for(let i = r.start; i <= r.end; i++) {
        const obj = data[i];
        if (obj && obj.showIllust && obj.showIllust.length > 0) {
            // Check if target character is in showIllust
            const targetSprite = obj.showIllust.find(sprite => sprite.startsWith(r.target + '_'));
            if (targetSprite) {
                if (!obj.illustPositions) {
                    obj.illustPositions = {};
                }
                if (obj.illustPositions[r.target] !== 'center') {
                    obj.illustPositions[r.target] = 'center';
                    changedCount++;
                }
            }
        }
    }
});

console.log('Changed', changedCount, 'entries.');
const outputStr = 'export const scenarioData = ' + JSON.stringify(data, null, 2) + ';';
fs.writeFileSync(scenarioPath, outputStr, 'utf8');

