const fs = require('fs');

const plot2Code = fs.readFileSync('src/components/BattleSystemPlot2.jsx', 'utf8');
const teamCode = fs.readFileSync('src/components/BattleTeamVsKimera.jsx', 'utf8');

const plot2ReturnStart = plot2Code.indexOf('return (');
const plot2ReturnEnd = plot2Code.lastIndexOf(');');
if (plot2ReturnStart === -1 || plot2ReturnEnd === -1) {
  console.error("Could not find return block in Plot2");
  process.exit(1);
}
let plot2UI = plot2Code.substring(plot2ReturnStart, plot2ReturnEnd + 2);

const teamReturnStart = teamCode.indexOf('return (');
const teamReturnEnd = teamCode.lastIndexOf(');');
if (teamReturnStart === -1 || teamReturnEnd === -1) {
  console.error("Could not find return block in TeamVsKimera");
  process.exit(1);
}

// 1. Replace the background image logic to use houkai.png and -translate-y-[15%] without scale
plot2UI = plot2UI.replace(
  /<img src="\/battle\/shopping\.png" alt="Background" className="absolute inset-0 w-full h-full object-cover scale-\[1\.15\] -translate-y-\[5%\]" \/>/g,
  '<img src="/battle/houkai.png" alt="Background" className="absolute inset-0 w-full h-full object-cover object-top -translate-y-[15%]" />'
);

// 2. Add scale-[2.0] object-bottom origin-bottom to the enemy image rendering
plot2UI = plot2UI.replace(
  /className={`w-full h-full object-contain drop-shadow-\[0_0_15px_rgba\(244,63,94,0\.3\)\] \${enemy\.isStunned \? 'opacity-70 grayscale-\[50%\]' : ''}`}/g,
  "className={`w-full h-full object-contain object-bottom origin-bottom scale-[2.0] drop-shadow-[0_0_15px_rgba(244,63,94,0.3)] ${enemy.isStunned ? 'opacity-70 grayscale-[50%]' : ''}`}"
);

// 3. Change HUD character to Sakura
plot2UI = plot2UI.replace(/\/character\/Mutsunori\/Mutsunori\.png/g, '/character/Sakura/Sakura.png');
plot2UI = plot2UI.replace(/alt="Mutsunori"/g, 'alt="Sakura"');
plot2UI = plot2UI.replace(/\/battle\/mutsunori\.png/g, '/battle/sakura.png');

const resultCode = teamCode.substring(0, teamReturnStart) + plot2UI + teamCode.substring(teamReturnEnd + 2);

fs.writeFileSync('src/components/BattleTeamVsKimera.jsx', resultCode);
console.log("UI replacement complete.");
