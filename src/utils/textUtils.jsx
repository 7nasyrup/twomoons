import React from 'react';

export function renderTextWithLinks(text) {
  if (!text) return text;
  
  const urlRegex = /(https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={i} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#00e5ff] hover:text-white underline decoration-[#00e5ff]/50 hover:decoration-white transition-colors cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}
