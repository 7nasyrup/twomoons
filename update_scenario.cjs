const fs = require('fs');
let code = fs.readFileSync('src/data/scenario.js', 'utf8');

function inject(textSnippet, injection) {
  // Find the object containing the textSnippet
  const regex = new RegExp(`(\\"text\\"\\s*:\\s*\\"[^\\"]*${textSnippet.replace(/[.*+?^$\{key\}()|[\\]\\\\]/g, '\\\\$&')}[^\\"]*\\"(?:,\\s*\\"[a-zA-Z0-9_]+\\"\\s*:\\s*[^,}]+)*)\\s*\\}`);
  code = code.replace(regex, `$1,\n${injection}\n  }`);
}

inject('「……っ、凪砂さん……！？」', `    "showIllust": ["Nagisa_neutral"],\n    "illustPositions": { "Nagisa": 3 }`);
inject('扉に鍵を掛けると、静かな室内には', `    "hideIllust": ["Nagisa"]`);
inject('その前で待っていたのは、ヒルミ教授だった。', `    "showIllust": ["Hirumi_neutral"],\n    "illustPositions": { "Hirumi": 4 }`);
inject('「お言葉ですが、仰っている意味がよく分かりません', `    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 2 }`);
inject('私が問いかけると、教授は穏やかに微笑んだ。', `    "showIllust": ["Nagisa_serious", "Hirumi_smile"],\n    "illustPositions": { "Nagisa": 2, "Hirumi": 4 }`);
inject('凪砂さんはため息をつきながらも、迷わずロケットへ向かう', `    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 3 }`);
inject('ロケット内部は、無機質な計器と二人分のシート', `    "hideIllust": ["Nagisa", "Hirumi"]`);
inject('「思ったんだけどさ。君と二人きりってことは', `    "showIllust": ["Nagisa_neutral"],\n    "illustPositions": { "Nagisa": 3 }`);

// for "……………" by Nagisa after the date line
code = code.replace(
  /(\\"text\\"\\s*:\\s*\\"「……………」\\"(?:,\\s*\\"[a-zA-Z0-9_]+\\"\\s*:\\s*[^,}]+)*)\\s*\\}/,
  `$1,\n    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 3 }\n  }`
);

inject('激しく揺れる機体の中、私は迫る死の恐怖', `    "hideIllust": ["Nagisa"]`);

// Wait, the text from the screenshot for row 11:
// 額の痛みに耐えながら身を起こすと、少し離れた場所で凪砂さんが壊れた制御パネルを調べていた。\n私に気づくと、静かに振り返る。
// In scenario.js, is it exactly this? Let me check line 7642 (or wherever it is). I will just use '額の痛みに耐えながら身を起こすと'
inject('額の痛みに耐えながら身を起こすと', `    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 3 }`);

inject('「起きた？寝坊助さん」', `    "showIllust": ["Nagisa_neutral"],\n    "illustPositions": { "Nagisa": 3 }`);

// Row 13: 「──っ、何……ここ」 (Actually in scenario.js it is 「───っ、何、ここ……」)
inject('何、ここ', `    "hideIllust": ["Nagisa"]`);

inject('冷たい声に我に返る。', `    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 3 }`);
inject('差し出そうとした、その瞬間', `    "hideIllust": ["Nagisa"]`);
inject('「こうしないと読めないでしょ？」', `    "showIllust": ["Nagisa_neutral"],\n    "illustPositions": { "Nagisa": 3 }`);

// 手記中:
inject('教授の手記には、研究所の最奥にある『コア』', `    "hideIllust": ["Nagisa"]`);
inject('「……フラグメントねぇ。面倒くさいことになったな」', `    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 3 }`);
inject('私がそう言うと、凪砂さんは少しだけ目を細めた', `    "showIllust": ["Nagisa_neutral"],\n    "illustPositions": { "Nagisa": 3 }`);
inject('そう言って、彼は迷いなく歩き始める', `    "hideIllust": ["Nagisa"]`);
inject('凪砂さんは施設を一瞥すると、小さく息をついた', `    "showIllust": ["Nagisa_serious"],\n    "illustPositions": { "Nagisa": 3 }`);

fs.writeFileSync('src/data/scenario.js', code);
console.log('Update done.');
