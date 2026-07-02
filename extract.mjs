import { scenarioData } from './src/data/scenario.js';
import fs from 'fs';

const extracted = [];
scenarioData.forEach((scene, index) => {
    if (scene.role === 'MUTSUNORI' || scene.role === 'NAGISA') {
        extracted.push({
            index,
            role: scene.role,
            text: scene.text,
            currentIllust: scene.showIllust
        });
    }
});
fs.writeFileSync('extracted.json', JSON.stringify(extracted, null, 2));
