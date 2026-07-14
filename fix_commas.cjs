const fs = require('fs');
let c = fs.readFileSync('src/data/scenario.js', 'utf8');
let fixed = c.replace(/}(\s*){/g, '},\n$1{');
if (fixed !== c) {
  fs.writeFileSync('src/data/scenario.js', fixed);
  console.log('Fixed missing commas');
} else {
  console.log('No missing commas found matching pattern');
}
