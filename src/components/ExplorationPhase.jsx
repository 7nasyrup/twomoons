import React, { useState, useEffect, useRef } from 'react';
import { Map, MapPin, Building, TreePine, ShoppingBag, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOCATIONS = [
  { id: 'street', title: '商店街', icon: ShoppingBag, targetLabel: 'explore_street_1' },
  { id: 'park', title: '公園', icon: TreePine, targetLabel: 'explore_park_1' },
  { id: 'mall', title: '大型ショッピングモール', icon: Building, targetLabel: 'explore_mall_1' },
  { id: 'university', title: '大学周辺', icon: GraduationCap, targetLabel: 'explore_university_1' },
];

export default function ExplorationPhase({ flags, setFlags, onSelectLocation, onFinishExploration }) {
  const [show, setShow] = useState(false);

  const visitedCount = LOCATIONS.filter(loc => flags[`visited_${loc.id}`]).length;
  const remainingActions = 2 - visitedCount;

  const isSelecting = useRef(false);

  useEffect(() => {
    if (isSelecting.current) return;
    // Check if we already visited 2 places
    if (visitedCount >= 2) {
      onFinishExploration();
    } else {
      setShow(true);
    }
  }, [visitedCount, onFinishExploration]);

  const handleSelect = (loc) => {
    if (flags[`visited_${loc.id}`] || isSelecting.current) return;
    
    isSelecting.current = true;
    setFlags(prev => ({
      ...prev,
      [`visited_${loc.id}`]: true
    }));
    setShow(false);
    setTimeout(() => {
      onSelectLocation(loc.targetLabel);
    }, 500); // 選択後のアニメーション待ち
  };

  if (!show) return null;

  return (
    <div className="absolute inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center font-mplus">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white/95 w-[80%] max-w-2xl rounded-xl shadow-2xl p-8 border border-slate-200"
      >
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200 text-slate-800">
          <Map className="w-8 h-8 text-sky-600" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-wider flex items-center gap-4">
              行き先を選択
              <span className="text-sm font-medium px-3 py-1 bg-sky-100 text-sky-700 rounded-full tracking-normal">
                残り行動回数: {remainingActions}回
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">調査したい場所を選んでください</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {LOCATIONS.map((loc) => {
            const isVisited = flags[`visited_${loc.id}`];
            const Icon = loc.icon;

            return (
              <button
                key={loc.id}
                onClick={() => handleSelect(loc)}
                disabled={isVisited}
                className={`relative overflow-hidden group p-6 rounded-lg border-2 text-left transition-all duration-300
                  ${isVisited 
                    ? 'border-slate-200 bg-slate-100/50 cursor-not-allowed opacity-50' 
                    : 'border-slate-300 bg-white hover:border-sky-500 hover:shadow-md hover:-translate-y-1'
                  }
                `}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-3 rounded-full ${isVisited ? 'bg-slate-200 text-slate-400' : 'bg-sky-50 text-sky-600 group-hover:bg-sky-100 group-hover:scale-110 transition-transform'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${isVisited ? 'text-slate-500' : 'text-slate-800'}`}>
                      {loc.title}
                    </h3>
                    {isVisited && (
                      <span className="text-xs font-bold text-slate-400 tracking-wider">探索済み</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
