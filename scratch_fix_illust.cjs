const fs = require('fs');

let content = fs.readFileSync('src/data/scenario.js', 'utf8');

// Replace illust: "Name_expr" with showIllust: ["Name_expr"]
content = content.replace(/illust:\s*"([^"]+)"(.*?)(\r?\n)/g, (match, p1, p2, p3) => {
    return `showIllust: ["${p1}"]${p2}${p3}`;
});

// Also fix hideillust: true if there are any
content = content.replace(/hideillust:\s*true/g, 'hideIllust: true');

fs.writeFileSync('src/data/scenario.js', content);
console.log('Done replacing illust with showIllust');
