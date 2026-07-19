const fs = require('fs');

try {
  // Load local and cloned scenarios
  const localModule = require('./src/data/scenario.js');
  const localData = localModule.scenarioData;
  const cloneModule = require('./twomoons_full_clone/src/data/scenario.js');
  const cloneData = cloneModule.scenarioData;

  console.log(`Local length: ${localData.length}, Cloned length: ${cloneData.length}`);

  let cloneIdx = 0;
  let matchCount = 0;

  for (let i = 0; i < localData.length; i++) {
    const localItem = localData[i];
    let matchedItem = null;

    // Search for a match in the cloned data within a window
    for (let j = cloneIdx; j < Math.min(cloneIdx + 20, cloneData.length); j++) {
      const cloneItem = cloneData[j];
      if (localItem.text === cloneItem.text && localItem.speaker === cloneItem.speaker) {
        matchedItem = cloneItem;
        cloneIdx = j + 1; // Advance clone pointer
        break;
      }
    }

    if (matchedItem) {
      matchCount++;
      // Copy visual and logic properties from matchedItem to localItem
      // Overwrite or add properties, but preserve text and maybe choices texts
      const preserveKeys = ['text', 'choices', 'scene', 'speaker'];
      for (const key of Object.keys(matchedItem)) {
        if (!preserveKeys.includes(key)) {
          localItem[key] = matchedItem[key];
        }
      }
      
      // Specifically for background, we definitely want the matched item's bg
      if (matchedItem.bg) {
        localItem.bg = matchedItem.bg;
      }
    } else {
      // If we couldn't match, just leave localItem as is.
      // Or we can try matching just by text if speaker is missing
    }
  }

  console.log(`Matched ${matchCount} out of ${localData.length} local items.`);

  // Write back to src/data/scenario.js
  const fileContent = `export const scenarioData = ${JSON.stringify(localData, null, 2)};\n`;
  fs.writeFileSync('./src/data/scenario.js', fileContent, 'utf8');
  console.log("Successfully merged and wrote to src/data/scenario.js");

} catch (err) {
  console.error("Error during merge:", err);
}
