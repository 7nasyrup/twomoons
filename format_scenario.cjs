const fs = require('fs');
let code = fs.readFileSync('src/data/scenario.js', 'utf8');

code = code.replace(/"showIllust": \["([^"]+)"\]/g, '"showIllust": [\n      "$1"\n    ]');
code = code.replace(/"showIllust": \["([^"]+)", "([^"]+)"\]/g, '"showIllust": [\n      "$1",\n      "$2"\n    ]');

code = code.replace(/"hideIllust": \["([^"]+)"\]/g, '"hideIllust": [\n      "$1"\n    ]');
code = code.replace(/"hideIllust": \["([^"]+)", "([^"]+)"\]/g, '"hideIllust": [\n      "$1",\n      "$2"\n    ]');

code = code.replace(/"illustPositions": \{ "([^"]+)": (\d) \}/g, '"illustPositions": {\n      "$1": $2\n    }');
code = code.replace(/"illustPositions": \{ "([^"]+)": (\d), "([^"]+)": (\d) \}/g, '"illustPositions": {\n      "$1": $2,\n      "$3": $4\n    }');

fs.writeFileSync('src/data/scenario.js', code);
console.log('Format fixed.');
