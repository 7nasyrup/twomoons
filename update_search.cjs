const fs = require('fs');
const path = 'src/components/SearchAndLearning.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. moon.jpg -> moon.png
content = content.replace(/'\/scene\/moon\.jpg'/g, "'/scene/moon.png'");

// 2. Resize marks
// w-14 h-14 -> w-10 h-10
content = content.replace(/w-14 h-14/g, 'w-10 h-10');
// Circle w-10 h-10 -> w-6 h-6
content = content.replace(/Circle className={`w-10 h-10/g, 'Circle className={`w-6 h-6');
// CheckCircle2 w-5 h-5 -> w-4 h-4
content = content.replace(/CheckCircle2 className="absolute text-cyan-300 w-5 h-5/g, 'CheckCircle2 className="absolute text-cyan-300 w-4 h-4');

// 3. Update the dialogue box at the bottom to have bright UI and HUD buttons
const oldDialog = `{/* --- Game Main Dialogue Box style Overlay (Clean AR Style) --- */}
      {currentMessage && (
        <div
          onClick={handleNextMessage}
          className="absolute inset-x-8 md:inset-x-24 bottom-12 z-50 flex flex-col justify-end glass-panel rounded-[2rem] pt-8 pb-10 px-10 md:px-16 cursor-pointer"
        >
          {/* Speaker name Plate (Sticking out) - Always visible */}
          <div className="absolute -top-5 left-6 md:left-10 h-[40px] flex items-center z-10">
            <div className={\`bg-slate-800 border border-white/60 text-white text-sm font-bold tracking-[0.2em] px-6 py-2 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.5)] min-w-[180px] h-full flex items-center justify-center gap-2\`}>
              {currentMessage?.role === 'info' && currentMessage?.speaker && <Sparkles className="w-4 h-4 text-white" />}
              {currentMessage?.speaker || ""}
            </div>
          </div>

          {/* Text content */}
          <div className="min-h-[100px] flex items-start pt-2">
            {currentMessage.role === 'sakura' ? (
              <p className="text-gray-100 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-2 rounded-full bg-white/60 ml-2 align-middle animate-pulse" />
                )}
              </p>
            ) : (
              <p className="text-gray-100 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line">
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-200/60 ml-2 align-middle animate-pulse" />
                )}
              </p>
            )}
          </div>

          {/* Next Indicator */}
          {!isTyping && (
            <div className="absolute bottom-10 right-10 animate-bounce">
              <ChevronRight className="w-6 h-6 text-white/50" />
            </div>
          )}
        </div>
      )}`;

const newDialog = `{/* --- Game Main Dialogue Box style Overlay --- */}
      {currentMessage && (
        <div className="absolute bottom-0 left-0 right-0 z-50 font-noto">
          <div
            className="relative glass-panel rounded-xl pt-8 pb-10 px-10 md:px-16 mx-8 md:mx-24 mb-12 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            onClick={handleNextMessage}
          >
            {/* Speaker name Plate (Sticking out) - Always visible */}
            <div className="absolute -top-5 left-6 md:left-10 h-[40px] flex items-center z-10">
              <div className="bg-white text-slate-800 text-base font-bold tracking-[0.2em] px-6 py-2 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.05)] min-w-[180px] h-full flex items-center justify-center gap-2">
                {currentMessage?.role === 'info' && currentMessage?.speaker && <Sparkles className="w-4 h-4 text-sky-500" />}
                {currentMessage?.speaker || (currentMessage?.role === 'sakura' ? '朔良' : '')}
              </div>
            </div>

            {/* Text content */}
            <div className="h-[100px] flex items-start pt-2">
              <p className="text-slate-800 text-lg md:text-xl leading-[2.2] font-noto tracking-wide whitespace-pre-line">
                {displayedText}
                {isTyping && (
                  <motion.span
                    className="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 ml-2 align-middle"
                    animate={{ opacity: [1, 0.2] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </p>
            </div>

            {/* Next Indicator */}
            {!isTyping && (
              <motion.div
                className="absolute bottom-12 right-10"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronRight size={24} className="text-slate-400" />
              </motion.div>
            )}

            {/* HUD Buttons (Bottom Right, sticking out) */}
            <div className="absolute bottom-0 right-6 md:right-10 translate-y-[50%] flex gap-2 z-20">
              <HudButton icon={<BookOpen size={14} />} label="LOG" onClick={() => console.log('Log placeholder')} />
              <HudButton icon={<EyeOff size={14} />} label="HIDE" onClick={() => console.log('Hide placeholder')} />
              <HudButton icon={<FastForward size={14} />} label="AUTO" onClick={() => console.log('Auto placeholder')} />
              <HudButton icon={<LogOut size={14} />} label="EXIT" onClick={() => console.log('Exit placeholder')} />
            </div>
          </div>
        </div>
      )}`;

content = content.replace(oldDialog, newDialog);

// 4. Update imports
const oldImport = "import { Tv, BookOpen, CheckCircle2, ChevronRight, Camera, Sparkles, Circle } from 'lucide-react';";
const newImport = "import { Tv, BookOpen, CheckCircle2, ChevronRight, Camera, Sparkles, Circle, EyeOff, FastForward, LogOut } from 'lucide-react';";
content = content.replace(oldImport, newImport);

// 5. Append HudButton component
const hudButtonCode = `

function HudButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
      className={\`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest font-noto
                  transition-all duration-300 shadow-sm backdrop-blur-md
                  \${active
          ? 'bg-slate-100 text-slate-800'
          : 'bg-white/90 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }\`}
    >
      {icon}
      {label}
    </button>
  );
}`;

if (!content.includes('function HudButton')) {
  content += hudButtonCode;
}

fs.writeFileSync(path, content);
console.log("Updated SearchAndLearning.jsx");
