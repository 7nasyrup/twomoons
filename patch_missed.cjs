const fs = require('fs');

['BattleFinalMichiru.jsx', 'BattleFinalMutsunori.jsx', 'BattleTeamVsKimera.jsx'].forEach(f => {
  let content = fs.readFileSync('src/components/' + f, 'utf-8');
  content = content.replace(/<img src=\{enemy\.image\} alt=\{enemy\.name\} className="([^"]*?)" \/>/g, '<img src={enemy.image} alt={enemy.name} className={`pointer-events-none select-none $1`} style={{ WebkitTouchCallout: \'none\' }} draggable="false" />');
  fs.writeFileSync('src/components/' + f, content);
  console.log('Patched ' + f);
});

// BattleFinalAkane.jsx uses enemy1, enemy2, enemy3
let akane = fs.readFileSync('src/components/BattleFinalAkane.jsx', 'utf-8');
[1, 2, 3].forEach(n => {
  akane = akane.replace(new RegExp(`<img src=\\{enemy${n}\\.image\\} alt=\\{enemy${n}\\.name\\} className=\\"([^"]*?)\\" \\/>`, 'g'), `<img src={enemy${n}.image} alt={enemy${n}.name} className={\`pointer-events-none select-none $1\`} style={{ WebkitTouchCallout: 'none' }} draggable="false" />`);
  akane = akane.replace(new RegExp(`<img src=\\{enemy${n}\\.image\\} alt=\\{enemy${n}\\.name\\} className=\\{\`([^\`]*?)\`\\} \\/>`, 'g'), `<img src={enemy${n}.image} alt={enemy${n}.name} className={\`pointer-events-none select-none $1\`} style={{ WebkitTouchCallout: 'none' }} draggable="false" />`);
});
fs.writeFileSync('src/components/BattleFinalAkane.jsx', akane);
console.log('Patched BattleFinalAkane.jsx');
