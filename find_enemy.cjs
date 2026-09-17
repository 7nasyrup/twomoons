const fs = require('fs');
['BattleFinalMichiru.jsx', 'BattleFinalMutsunori.jsx', 'BattleFinalAkane.jsx', 'BattleTeamVsKimera.jsx'].forEach(f => {
  const content = fs.readFileSync('src/components/' + f, 'utf-8');
  const lines = content.split('\n');
  const idx = lines.findIndex(l => (l.includes('<img') && l.includes('enemy.image')) || (l.includes('<img') && l.includes('boss.image')));
  if (idx !== -1) {
    console.log('--- ' + f + ' ---');
    for(let i=idx-15; i<=idx; i++) {
      console.log(i + ': ' + lines[i]);
    }
  } else {
    console.log('NOT FOUND in ' + f);
  }
});
