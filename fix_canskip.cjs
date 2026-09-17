const fs = require('fs');
const path = require('path');

const checkStr = `(localStorage.getItem('cleared_mutsunori_good_end') === 'true' || localStorage.getItem('cleared_mika_good_end') === 'true' || localStorage.getItem('cleared_nagisa_good_end') === 'true' || localStorage.getItem('cleared_akane_good_end') === 'true')`;

['SearchAndLearning.jsx', 'WarehouseExploration.jsx'].forEach(file => {
    const p = path.join(__dirname, 'src', 'components', file);
    let code = fs.readFileSync(p, 'utf8');
    
    // Replace const [canSkip] = useState(...) with our check
    code = code.replace(/const \[canSkip\] = useState\([^)]*\);/g, `const [canSkip] = useState(() => ${checkStr});`);
    
    fs.writeFileSync(p, code);
    console.log(`Updated ${file}`);
});
