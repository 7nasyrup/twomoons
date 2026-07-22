const fs = require('fs');
let lines = fs.readFileSync('c:/Users/yomog/.gemini/antigravity-ide/scratch/twomoons/src/data/scenario.js', 'utf8').split('\n');

let startIdx = -1;
for(let i = 8000; i < lines.length; i++) {
  if (lines[i].includes('"――突然変なことに巻き込んで済まないね、朔良。"')) {
    startIdx = i;
    break;
  }
}

if (startIdx !== -1) {
  let objectStartIdx = startIdx;
  while(objectStartIdx > 0 && !lines[objectStartIdx].includes('{')) {
    objectStartIdx--;
  }
  
  // Create choice block
  const choiceBlock = `  {
    "scene": "月面",
    "type": "choice",
    "text": "手記の内容を読みますか？",
    "choices": [
      {
        "text": "読む",
        "targetLabel": "read_professors_note_3"
      },
      {
        "text": "スキップする",
        "targetLabel": "skip_professors_note_3"
      }
    ]
  },`;
  
  lines.splice(objectStartIdx, 0, choiceBlock);
  
  // Re-find the first line of the note since indices shifted
  startIdx += choiceBlock.split('\n').length;
  objectStartIdx += choiceBlock.split('\n').length;
  
  // Add read label and showItem
  for (let i = objectStartIdx; i <= startIdx + 5; i++) {
    if (lines[i].includes('"scene": "月面"')) {
      lines[i] = `    "label": "read_professors_note_3",\n    "scene": "手記",`;
    }
    if (lines[i].includes('"text": "――突然変なことに巻き込んで済まないね、朔良。"')) {
      lines[i] = `    "text": "――突然変なことに巻き込んで済まないね、朔良。",\n    "showItem": "/item/Message.png"`;
      break;
    }
  }
  
  // Change all subsequent 'scene: 月面' to 'scene: 手記' until the end of the note
  let endIdx = -1;
  for (let i = startIdx; i < lines.length; i++) {
    if (lines[i].includes('"text": "──ヒルミ"')) {
      endIdx = i;
      break;
    }
    if (lines[i].includes('"scene": "月面"')) {
      lines[i] = lines[i].replace('"scene": "月面"', '"scene": "手記"');
    }
  }
  
  if (endIdx !== -1) {
    let endObjectStartIdx = endIdx;
    while(endObjectStartIdx > 0 && !lines[endObjectStartIdx].includes('{')) {
      endObjectStartIdx--;
    }
    // ensure scene: 手記 for the last note object
    for (let i = endObjectStartIdx; i <= endIdx; i++) {
      if (lines[i].includes('"scene": "月面"')) {
        lines[i] = lines[i].replace('"scene": "月面"', '"scene": "手記"');
      }
    }
    
    // Find the next object (skip target)
    let nextObjectStartIdx = endIdx + 1;
    while(nextObjectStartIdx < lines.length && !lines[nextObjectStartIdx].includes('{')) {
      nextObjectStartIdx++;
    }
    
    if (nextObjectStartIdx < lines.length) {
      // insert label after {
      lines.splice(nextObjectStartIdx + 1, 0, `    "label": "skip_professors_note_3",`);
      
      // find end of next object to insert bg and hideItem
      let nextObjectEndIdx = nextObjectStartIdx + 1;
      while(nextObjectEndIdx < lines.length && !lines[nextObjectEndIdx].includes('}')) {
        nextObjectEndIdx++;
      }
      
      // insert before }
      lines.splice(nextObjectEndIdx, 0, `    "bg": "/scene/moon_surface.png",\n    "hideItem": true,`);
    }
  }

  fs.writeFileSync('c:/Users/yomog/.gemini/antigravity-ide/scratch/twomoons/src/data/scenario.js', lines.join('\n'), 'utf8');
  console.log("Successfully patched 3rd note.");
} else {
  console.log("Could not find 3rd note.");
}
