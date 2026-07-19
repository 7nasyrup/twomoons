const fs = require('fs');

const content = fs.readFileSync('src/data/scenario.js', 'utf8');

const lines = content.split('\n');

let currentScene = "";
let sceneCounts = {};
let monologueStreak = 0;
let maxMonologueStreak = 0;
let maxMonologueScene = "";
let maxMonologueStartLine = 0;

let currentStreakStart = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    const sceneMatch = line.match(/scene:\s*"([^"]+)"/);
    if (sceneMatch) {
        currentScene = sceneMatch[1];
        if (!sceneCounts[currentScene]) {
            sceneCounts[currentScene] = 0;
        }
    }

    if (line.includes('text:')) {
        sceneCounts[currentScene]++;
        
        let hasSpeaker = false;
        for (let j = Math.max(0, i - 3); j <= i; j++) {
            if (lines[j].includes('speaker:')) {
                hasSpeaker = true;
                break;
            }
        }
        
        if (!hasSpeaker) {
            if (monologueStreak === 0) currentStreakStart = i;
            monologueStreak++;
            if (monologueStreak > maxMonologueStreak) {
                maxMonologueStreak = monologueStreak;
                maxMonologueScene = currentScene;
                maxMonologueStartLine = currentStreakStart;
            }
        } else {
            if (monologueStreak > 5) {
                console.log(`Long monologue found in ${currentScene} at line ${currentStreakStart} (length: ${monologueStreak})`);
            }
            monologueStreak = 0;
        }
    }
}

console.log("\nTop 10 longest scenes (by text blocks):");
const sortedScenes = Object.entries(sceneCounts).sort((a, b) => b[1] - a[1]);
for (let i = 0; i < Math.min(10, sortedScenes.length); i++) {
    console.log(`${sortedScenes[i][0]}: ${sortedScenes[i][1]}`);
}
