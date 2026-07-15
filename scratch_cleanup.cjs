const fs = require('fs');
let c = fs.readFileSync('src/data/scenario.js', 'utf8');

// Replace duplicate showIllust lines where the first one has comments and the second one does not, or similar.
// Basically: showIllust: ["..."] ... \n ... showIllust: ["..."]
c = c.replace(/(showIllust:\s*\[\"[^\"]+\"\][^\n]*)\n\s*showIllust:\s*\[\"[^\"]+\"\]/g, '$1');

fs.writeFileSync('src/data/scenario.js', c);
console.log("Cleanup complete!");
