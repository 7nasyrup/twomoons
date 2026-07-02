/**
 * reformat.cjs
 * scenario.js の配列データを JavaScript の eval 相当でパースし、
 * 正規の 4 スペースインデントで書き直す。
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'scenario.js');
let src = fs.readFileSync(filePath, 'utf8');

// Export 行を除去して配列部分だけ取り出す
const match = src.match(/export\s+const\s+scenarioData\s*=\s*(\[[\s\S]*\])\s*;?\s*$/);
if (!match) {
  console.error('scenarioData の配列が見つかりませんでした。');
  process.exit(1);
}

let data;
try {
  // Node.js の Function コンストラクタで安全に評価
  data = new Function('return ' + match[1])();
} catch (e) {
  console.error('パースエラー:', e.message);
  process.exit(1);
}

console.log(`パース成功: ${data.length} エントリ`);

// オブジェクトを整形する関数（4スペース、ネスト対応）
function formatValue(val, indent) {
  const pad = ' '.repeat(indent);
  const padInner = ' '.repeat(indent + 4);

  if (val === null) return 'null';
  if (typeof val === 'boolean') return String(val);
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    // 改行を \n に、ダブルクォートをエスケープ
    const escaped = val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `"${escaped}"`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    // 短い配列はインラインで
    const inlineItems = val.map(v => formatValue(v, 0));
    const inline = '[' + inlineItems.join(', ') + ']';
    if (inline.length < 80) return inline;
    // 長い場合は複数行
    const items = val.map(v => padInner + formatValue(v, indent + 4));
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }
  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 0) return '{}';
    const entries = keys.map(k => {
      return padInner + k + ': ' + formatValue(val[k], indent + 4);
    });
    return '{\n' + entries.join(',\n') + '\n' + pad + '}';
  }
  return String(val);
}

// 配列全体を整形
const lines = data.map(entry => {
  const keys = Object.keys(entry);
  const entries = keys.map(k => {
    return '        ' + k + ': ' + formatValue(entry[k], 8);
  });
  return '    {\n' + entries.join(',\n') + '\n    }';
});

const output = 'export const scenarioData = [\n' + lines.join(',\n') + '\n];\n';

// バックアップ
fs.writeFileSync(filePath + '.bak', src, 'utf8');
fs.writeFileSync(filePath, output, 'utf8');

console.log('書き込み完了！ バックアップ: scenario.js.bak');
