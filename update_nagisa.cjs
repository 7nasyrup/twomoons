const fs = require('fs');

const path = 'src/components/FragmentCollectNagisa.jsx';
let code = fs.readFileSync(path, 'utf8');

// Replace NAGISA_FILE
const newNagisaFile = `const NAGISA_FILE = [
  [
    { speaker: '凪砂', role: 'NAGISA', illust: 'Nagisa_neutral', text: '「……何か見つけた？」' },
    { speaker: '朔良', role: 'SAKURA', illust: 'Nagisa_neutral', text: '「っ……！」' },
    { speaker: null, role: null, illust: 'Nagisa_neutral', text: '突然すぐ後ろから声がして、私は思わず肩を震わせた。振り返ると、凪砂さんがいつの間にかすぐ後ろに立っている。' },
    { speaker: '朔良', role: 'SAKURA', illust: 'Nagisa_neutral', text: '「お、脅かさないでください……！」' },
    { speaker: '凪砂', role: 'NAGISA', illust: 'Nagisa_smile', text: '「ごめんごめん。君、周りが見えなくなってたから」' },
    { speaker: null, role: null, illust: 'Nagisa_smile', text: '私は慌てて、手にしていた書類を胸元へ隠した。' },
    { speaker: '朔良', role: 'SAKURA', illust: 'Nagisa_smile', text: '（……あれ？）' },
    { speaker: null, role: null, illust: 'Nagisa_smile', text: 'どうして隠したんだろう。自分でも理由は分からない。\\nただ、この紙だけは──今は凪砂さんに見せたくない。' },
    { speaker: '凪砂', role: 'NAGISA', illust: 'Nagisa_serious', text: '「……隠すんだ」' },
    { speaker: null, role: null, illust: 'Nagisa_serious', text: '凪砂さんが小さく目を細める。その声には責める色も、興味本位の色もない。\\nただ、不思議そうだった。' },
    { speaker: '朔良', role: 'SAKURA', illust: 'Nagisa_serious', text: '「え、これは、その……」' },
    { speaker: null, role: null, illust: 'Nagisa_serious', text: '言葉に詰まる。理由を説明しようにも、私自身が理由を分かっていない。' },
    { speaker: null, role: null, illust: 'Nagisa_neutral', text: 'しばらく私を見つめていた凪砂さんは、小さく肩をすくめた。' },
    { speaker: '凪砂', role: 'NAGISA', illust: 'Nagisa_neutral', text: '「まぁいいや。君が見せたくないなら、無理に見る趣味はないし」' },
    { speaker: null, role: null, illust: 'Nagisa_neutral', text: 'そう言うと、何事もなかったように踵を返す。' },
    { speaker: '凪砂', role: 'NAGISA', illust: 'Nagisa_neutral', text: '「その代わり、手掛かりが見つかったらちゃんと教えて。二人しかいないんだから」' },
    { speaker: '朔良', role: 'SAKURA', illust: 'Nagisa_neutral', text: '「……はい」' },
    { speaker: null, role: null, illust: 'Nagisa_neutral', text: 'どこか胸の奥に引っかかる違和感を抱えたまま、私は書類をしまい、凪砂さんの後を追って研究所の奥へと歩き出した。' }
  ],
  [],
  []
];`;

code = code.replace(/const NAGISA_FILE = \[[\s\S]*?\];\n/, newNagisaFile + '\n');

// Replace ROOM_ITEMS
const newRoomItems = `const ROOM_ITEMS = {
  lab1: {
    chips: [{ id: 'chip_1', pos: { top: '45%', left: '28%' }, label: 'コード断片①' }],
    files: [{
      id: 'file_1', pos: { top: '62%', left: '65%' }, label: '書類 01',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【書類①：適応者臨床データ No.07593】' },
        { speaker: null, role: null, text: '対象者は周囲の------を、---常とは異な-------性あり。\\n---覚・聴---・--覚など複数の経路から、-------思われる反応を確認。' },
        { speaker: null, role: null, text: '※「自己」と「外---報-----については現在調査中――。\\n※一部データは損傷により判読不可。' },
      ],
    }],
  },
  lab2: {
    chips: [
      { id: 'chip_2', pos: { top: '38%', left: '20%' }, label: 'コード断片②' },
      { id: 'chip_3', pos: { top: '55%', left: '75%' }, label: 'コード断片③' },
    ],
    files: [{
      id: 'file_2', pos: { top: '30%', left: '50%' }, label: '書類 02',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【書類②：異能力解析報告書：感応型能力について】' },
        { speaker: null, role: null, text: '対象者の能力発動時、周------間に発生した精神的変---の関連---確認。\\nただし、取得してい------感情のみなのか、そ----上のものを含------不明。' },
        { speaker: null, role: null, text: '※長期間の使用による精神領域への影響について――' },
      ],
    }],
  },
  lab3: {
    chips: [{ id: 'chip_4', pos: { top: '50%', left: '35%' }, label: 'コード断片④' }],
    files: [{
      id: 'file_3', pos: { top: '35%', left: '68%' }, label: '書類 03',
      messages: [
        { speaker: 'システム', role: 'SYSTEM', text: '【書類③：研究員個人メモ】' },
        { speaker: null, role: null, text: '周囲------仕草、わず------な変化から、あまり------多くの--報を拾い続けている。\\nそのうち------の感情すら、見失------まうのではないだろうか。' },
        { speaker: null, role: null, text: '……もし彼を---めるものがあるとすれば、それは他----から与えられるものではなく……彼自身が心から選んだ――――。' },
      ],
    }],
  },
  lab4: {
    chips: [],
    files: [],
  },
};`;

code = code.replace(/const ROOM_ITEMS = \{[\s\S]*?\n\};\n/, newRoomItems + '\n');

// Replace "CONFIDENTIAL DATA" with "DOCUMENT"
code = code.replace(/CONFIDENTIAL DATA/g, 'DOCUMENT');

// Fix closeActiveFile logic
code = code.replace(
  /const closeActiveFile = \(\) => \{\n\s*setActiveFile\(null\);\n\s*const lv = Math\.min\(collectedFiles\.size - 1, NAGISA_FILE\.length - 1\);\n\s*showMessages\(NAGISA_FILE\[lv\] \|\| NAGISA_FILE\[0\]\);\n\s*\};/,
  \`const closeActiveFile = () => {
    setActiveFile(null);
    const lv = Math.min(collectedFiles.size - 1, NAGISA_FILE.length - 1);
    const msgs = NAGISA_FILE[lv];
    if (msgs && msgs.length > 0) {
      showMessages(msgs);
    } else {
      if (pendingParticle) {
        triggerParticle(pendingParticle.sx, pendingParticle.sy, pendingParticle.type);
        setPendingParticle(null);
      }
    }
  };\`/
);

fs.writeFileSync(path, code);
console.log('Update Nagisa done.');
