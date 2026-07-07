import React from 'react';

export default function FuiShowcase({ onClose }) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#f4f4f5] text-[#1e293b] z-[100] overflow-y-auto font-orbitron select-none p-8 fui-grid-bg">
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-4 right-4 z-50 bg-[#e53935] text-white px-6 py-2 fui-clip-button hover:bg-[#b71c1c] transition-colors text-xs font-bold tracking-widest"
      >
        CLOSE SHOWCASE
      </button>

      <div className="max-w-4xl mx-auto space-y-12 pb-24 relative">
        
        {/* Title */}
        <div className="flex items-center space-x-4 mb-12">
          <div className="h-4 w-4 bg-[#e53935] fui-clip-basic" />
          <h2 className="text-2xl font-bold tracking-[0.3em] text-[#1e293b]">FUI COMPONENT SYSTEM</h2>
          <div className="flex-grow h-px bg-gray-300 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-1 bg-[#e53935]" />
          </div>
        </div>

        {/* Panel Type 1: Standard Module */}
        <div className="relative p-1 bg-gray-300 fui-clip-panel">
          <div className="bg-white p-6 fui-clip-panel h-48 relative flex flex-col justify-between">
            {/* Top Accents */}
            <div className="absolute top-0 left-8 w-24 h-1 bg-[#e53935]" />
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-1 bg-gray-200" />
                  ))}
                  <div className="w-4 h-1 bg-[#e53935]" />
                </div>
                <div className="text-[10px] text-gray-400 tracking-widest">SYS.MAIN.01</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-[#e53935] font-bold text-xs">STATUS: OPTIMAL</div>
                <div className="flex space-x-1 mt-1">
                  <div className="w-1 h-3 bg-gray-800" />
                  <div className="w-1 h-3 bg-gray-800" />
                  <div className="w-2 h-3 bg-gray-800" />
                  <div className="w-1 h-3 bg-gray-400" />
                  <div className="w-3 h-3 bg-[#e53935]" />
                </div>
              </div>
            </div>

            {/* Bottom details */}
            <div className="flex justify-between items-end border-t border-gray-100 pt-2">
              <div className="text-[10px] text-gray-400">INITIALIZING NEURAL NET...</div>
              <div className="text-2xl font-bold text-gray-200 tracking-tighter">01</div>
            </div>
          </div>
        </div>

        {/* Panel Type 2: Asymmetric with dark accent */}
        <div className="relative p-1 bg-gray-300 fui-clip-asymmetric">
          <div className="bg-white p-6 fui-clip-asymmetric relative min-h-[160px] flex">
            {/* Left black block */}
            <div className="w-8 bg-[#1e293b] absolute left-0 top-0 bottom-0 flex flex-col items-center py-4 space-y-2 text-white">
              <div className="text-[8px] -rotate-90 whitespace-nowrap mt-4">SEC-09</div>
              <div className="w-1 h-1 bg-[#e53935] mt-auto" />
              <div className="w-1 h-1 bg-gray-500" />
            </div>

            <div className="ml-12 w-full">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gray-100 px-3 py-1 fui-clip-header text-xs font-bold text-gray-500">
                  DATA_STREAM
                </div>
                <div className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 border border-gray-200">
                  FRQ: 144.02 MHz
                </div>
              </div>
              
              <div className="w-full h-12 bg-gray-50 border border-gray-100 relative overflow-hidden fui-dots-bg flex items-center px-4">
                <div className="text-[#e53935] font-bold text-sm tracking-widest">NO SIGNAL DETECTED</div>
                {/* scanning line */}
                <div className="absolute top-0 bottom-0 left-1/3 w-8 bg-gradient-to-r from-transparent via-[#e53935]/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Panel Type 3: Warning Box */}
        <div className="relative p-1 bg-[#e53935] fui-clip-basic">
          <div className="bg-white p-6 fui-clip-basic relative">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#e53935] fui-clip-basic flex items-center justify-center text-white text-2xl font-bold">
                !
              </div>
              <div>
                <h3 className="text-[#e53935] font-bold text-sm tracking-widest mb-1">CRITICAL SYSTEM FAILURE</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">
                  The primary wave resonance engine has encountered an unexpected desync. 
                  Please initiate manual override protocol immediately to prevent structural collapse.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cluster of smaller elements */}
        <div className="grid grid-cols-3 gap-6">
          {/* Small Box 1 */}
          <div className="relative p-px bg-gray-300 fui-clip-basic">
            <div className="bg-white h-32 fui-clip-basic p-4 flex flex-col justify-between">
              <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400">NODE A</div>
                <div className="text-sm font-bold">ONLINE</div>
              </div>
            </div>
          </div>

          {/* Small Box 2 */}
          <div className="relative p-px bg-[#e53935] fui-clip-basic">
            <div className="bg-white h-32 fui-clip-basic p-4 flex flex-col justify-between">
              <div className="w-6 h-6 border-2 border-[#e53935] rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#e53935] rounded-full animate-pulse" />
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#e53935]">NODE B</div>
                <div className="text-sm font-bold text-[#e53935]">WARNING</div>
              </div>
            </div>
          </div>

          {/* Square Target Box */}
          <div className="relative p-1 bg-gray-300 flex items-center justify-center h-32">
            <div className="bg-white w-full h-full p-2 relative flex items-center justify-center">
              {/* Crosshair corners */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-400" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-400" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-400" />
              
              {/* Center icon placeholder */}
              <div className="w-12 h-12 bg-gray-100 flex flex-wrap items-center justify-center gap-1 p-2">
                 <div className="w-3 h-3 bg-gray-300" />
                 <div className="w-3 h-3 bg-[#e53935]" />
                 <div className="w-3 h-3 bg-gray-300" />
                 <div className="w-3 h-3 bg-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Large Decorative Section Bottom */}
        <div className="flex justify-center mt-12 opacity-50">
           <div className="relative w-48 h-48">
              {/* Outer rotated square */}
              <div className="absolute inset-0 border border-gray-300 rotate-45" />
              {/* Inner square */}
              <div className="absolute inset-4 border border-gray-400" />
              {/* Center core */}
              <div className="absolute inset-16 bg-gray-200 fui-clip-basic flex items-center justify-center">
                <div className="w-2 h-2 bg-[#e53935]" />
              </div>
              
              {/* Tech lines radiating */}
              <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-gray-400 -translate-y-1/2 -translate-x-full" />
              <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-gray-400 -translate-y-1/2 translate-x-full" />
              <div className="absolute left-1/2 top-0 w-[1px] h-4 bg-gray-400 -translate-x-1/2 -translate-y-full" />
              <div className="absolute left-1/2 bottom-0 w-[1px] h-4 bg-gray-400 -translate-x-1/2 translate-y-full" />
           </div>
        </div>

      </div>
    </div>
  );
}
