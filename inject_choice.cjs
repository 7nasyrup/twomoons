const fs = require('fs');

let content = fs.readFileSync('src/data/scenario.js', 'utf8');

// The marker comment
const marker = "//ここで選択肢　睦則に連絡するかしないか。またそれによってこの行から1242行までのテキストが整合性がとれるようにして";

// We need to replace from the marker up to the end of the gate scene.
// Let's find the marker.
const startIndex = content.indexOf(marker);
if (startIndex === -1) {
    console.error("Marker not found!");
    process.exit(1);
}

// Find the end of the gate scene
const endMarker = '    text: "「ひええ、待ってよ朔良～！」",\n    illust: "Mutsunori_pout" // 慌てて焦るニュアンス\n    ,\n    showIllust: ["Mutsunori_pout"]\n  },';
const endIndexStr = content.indexOf(endMarker, startIndex);
if (endIndexStr === -1) {
    console.error("End marker not found!");
    process.exit(1);
}
const endIndex = endIndexStr + endMarker.length;

const originalChunk = content.substring(startIndex + marker.length, endIndex);

// Build PATH A
let pathA = originalChunk.replace(
    '    text: "微かに聞こえる、遠くの街のサイレンの音を子守唄代わりにしながら、私は祈るような気持ちで深い眠りへと落ちていった。"',
    `    label: "contact_mutsunori_path",
    text: "私は『無事だよ、心配かけてごめんね』と短いメッセージを送った。"
  },
  {
    scene: "朔良の部屋",
    text: "すぐに『よかった！俺も今夜は怖くて眠れないかも』と返信が来て、少しだけ頬が緩んだ。"
  },
  {
    scene: "朔良の部屋",
    text: "微かに聞こえる、遠くの街のサイレンの音を子守唄代わりにしながら、私は祈るような気持ちで深い眠りへと落ちていった。"`
);

pathA = pathA.replace(
    '    text: "「おはよう、ムッちゃん。凄い顔になってるよ」"',
    '    text: "「おはよう、ムッちゃん。メッセージくれた通り、凄い顔になってるよ」"'
);

pathA = pathA.replace(
    '    text: "「だってさぁ！ 朔良と別れたあと、うちの店のすぐ近くのブロックが封鎖されたんだよ！？ 防衛局のサイレンは鳴り響くし、ネット見たら【黒騎士】が【キメラ】の軍勢率いて現れたって書いてあるし！ 怖くて一睡もできなかったよ～！」",',
    '    text: "「だってさぁ！ 朔良と連絡取れたのは安心したけど、うちの店のすぐ近くのブロックが封鎖されたんだよ！？ 防衛局のサイレンは鳴り響くし、ネット見たら【黒騎士】が【キメラ】の軍勢率いて現れたって書いてあるし！ 怖くて一睡もできなかったよ～！」",'
);

pathA = pathA.replace(
    '    text: "「うん……。やっぱり家まで送ればよかったってすごい後悔して……」",',
    '    text: "「うん……。やっぱり家まで送ればよかったってすごい後悔して……連絡もらえて本当に安心したよ」",'
);

pathA = pathA.replace(
    '    text: "もしかして……眠れなかったのって、私を思ってくれてたからかな…？"\n  },\n  {\n    scene: "大学の正門前",\n    text: "そう考えると胸の中が暖かくなる。私のことを大切に思ってくれてる人がいるって、それだけでも生きる活力になる。それに、やっぱりムッちゃんって抜けてるところはあるけど、優しいんだな。と心から思う。"',
    '    text: "怖がりなくせに、私を心配してくれてたんだな…と胸の中が暖かくなる。私のことを大切に思ってくれてる人がいるって、それだけでも生きる活力になる。やっぱりムッちゃんって優しいんだな。と心から思う。"'
);

pathA += '\n  {\n    jumpTo: "morning_classroom_merge"\n  },';

// Build PATH B
let pathB = originalChunk.replace(
    '    text: "微かに聞こえる、遠くの街のサイレンの音を子守唄代わりにしながら、私は祈るような気持ちで深い眠りへと落ちていった。"',
    `    label: "dont_contact_mutsunori_path",
    text: "今はまだ、誰とも話す気分になれなかった。私はスマートフォンを枕元に置いた。"
  },
  {
    scene: "朔良の部屋",
    text: "微かに聞こえる、遠くの街のサイレンの音を子守唄代わりにしながら、私は祈るような気持ちで深い眠りへと落ちていった。"`
);

// The new block
const newBlock = `
  {
    scene: "朔良の部屋",
    type: "choice",
    text: "スマートフォンの画面を見つめる。……ムッちゃんに、メッセージを送ろうか。",
    choices: [
      { text: "睦典に連絡する", targetLabel: "contact_mutsunori_path" },
      { text: "今日はもう寝る", targetLabel: "dont_contact_mutsunori_path" }
    ]
  },
  // ================== 選択肢：睦典に連絡する ==================
${pathA}
  // ================== 選択肢：連絡しない ==================
${pathB}
  // ================== 合流地点 ==================
  {
    label: "morning_classroom_merge",`;

const finalContent = content.substring(0, startIndex) + marker + newBlock + content.substring(endIndex + 4); 
// endIndex + 4 to replace the next "  {" to safely inject the label. Wait, let's just replace safely.
// Let's do it better.

let afterText = content.substring(endIndex);
afterText = afterText.replace(/^\s*{\s*scene: "講義室",/, '  {\n    label: "morning_classroom_merge",\n    scene: "講義室",');

fs.writeFileSync('src/data/scenario.js', content.substring(0, startIndex) + marker + newBlock + afterText);
console.log("Successfully injected choice branching!");
