const fs = require('fs');
const path = require('path');

const checkStr = `(localStorage.getItem('cleared_mutsunori_good_end') === 'true' || localStorage.getItem('cleared_mika_good_end') === 'true' || localStorage.getItem('cleared_nagisa_good_end') === 'true' || localStorage.getItem('cleared_akane_good_end') === 'true')`;

// 1. Remove BATTLE button in TitleScreen.jsx
const titlePath = path.join(__dirname, 'src', 'components', 'TitleScreen.jsx');
let titleCode = fs.readFileSync(titlePath, 'utf8');
titleCode = titleCode.replace(/\{\/\* Battle Test Button in Top-Left \*\/\}[\s\S]*?\{\/\* Buttons \/ Menu \*\/\}/s, '{/* Buttons / Menu */}');
fs.writeFileSync(titlePath, titleCode);
console.log('Updated TitleScreen.jsx');

// 2. Hide "探索をスキップ" in SearchAndLearning.jsx and WarehouseExploration.jsx
['SearchAndLearning.jsx', 'WarehouseExploration.jsx'].forEach(file => {
    const p = path.join(__dirname, 'src', 'components', file);
    if (fs.existsSync(p)) {
        let code = fs.readFileSync(p, 'utf8');
        
        // Let's use a regex to wrap the <motion.div> element directly following {/* Skip Button */}
        const parts = code.split(/\{\/\* Skip Button \*\/\}/);
        if (parts.length > 1) {
             code = code.replace(/(\{\/\* Skip Button \*\/\}\s*)(<motion\.div[\s\S]*?探索をスキップ<\/span>\s*<\/motion\.div>)/, 
                 `$1{${checkStr} && (\n$2\n)}`);
             fs.writeFileSync(p, code);
             console.log(`Updated ${file}`);
        } else {
             // Fallback
             code = code.replace(/(<motion\.div[^>]*>[\s\S]*?探索をスキップ<\/span>\s*<\/motion\.div>)/, 
                 `{${checkStr} && (\n$1\n)}`);
             fs.writeFileSync(p, code);
             console.log(`Updated ${file} (fallback)`);
        }
    }
});

// 3. Hide EXIT button in Battle*.jsx
const battleFiles = fs.readdirSync(path.join(__dirname, 'src', 'components'))
    .filter(f => f.startsWith('Battle') && f.endsWith('.jsx'));

battleFiles.forEach(file => {
    const p = path.join(__dirname, 'src', 'components', file);
    let code = fs.readFileSync(p, 'utf8');
    
    const exitBtnRegex = /(<button[^>]*>[\s]*EXIT[\s]*<\/button>)/g;
    
    // Check if it's already wrapped
    if (code.includes(`{${checkStr} && (`)) {
        console.log(`${file} is already updated`);
        return;
    }
    
    if (exitBtnRegex.test(code)) {
        code = code.replace(exitBtnRegex, `{${checkStr} && (\n          $1\n          )}`);
        fs.writeFileSync(p, code);
        console.log(`Updated ${file}`);
    } else {
        console.log(`No EXIT button found in ${file}`);
    }
});

console.log('Done.');
