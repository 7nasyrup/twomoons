const fs = require('fs');
let lines = fs.readFileSync('./src/data/scenario.js', 'utf8').split('\n');
for(let i=7082; i<=7197; i++) {
  if (lines[i].includes('"scene": "月面"')) {
    lines[i] = lines[i].replace('"scene": "月面"', '"scene": "手記"');
  }
}
fs.writeFileSync('./src/data/scenario.js', lines.join('\n'), 'utf8');
console.log("Fixed scenes");
