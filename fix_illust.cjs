const fs = require('fs');
let code = fs.readFileSync('src/data/scenario.js', 'utf8');

// Single character replacements
code = code.replace(
  /"showIllust": \[\s*"([A-Za-z_]+)"\s*\],\s*"illustPositions": \{\s*"[A-Za-z]+": (\d)\s*\}/g,
  '"showIllust": [\n      "$1$2"\n    ]'
);

// Two character replacements
code = code.replace(
  /"showIllust": \[\s*"([A-Za-z_]+)",\s*"([A-Za-z_]+)"\s*\],\s*"illustPositions": \{\s*"[A-Za-z]+": (\d),\s*"[A-Za-z]+": (\d)\s*\}/g,
  '"showIllust": [\n      "$1$3",\n      "$2$4"\n    ]'
);

fs.writeFileSync('src/data/scenario.js', code);
console.log('Fixed illustPositions format.');
