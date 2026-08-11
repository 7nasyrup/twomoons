const fs = require('fs');
const lines = fs.readFileSync('src/data/scenario.js', 'utf8').split('\n');
let indices = [];
lines.forEach((l, i) => {
  if (l.includes('ALL_FADE_OUT') || l.includes('FADE_TO_BLACK')) {
    indices.push(i);
  }
});
indices.slice(0, 5).forEach(idx => {
  console.log('--- FADE ---');
  console.log(lines.slice(idx, idx+15).join('\n'));
});
