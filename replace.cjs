const fs = require('fs');
let data = fs.readFileSync('src/data/scenario.js', 'utf8');
data = data.replace(/"bgNoFade"/g, '"bgCrossfade"');
fs.writeFileSync('src/data/scenario.js', data);
console.log('done');
