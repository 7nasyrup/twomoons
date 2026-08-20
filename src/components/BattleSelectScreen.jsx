import React from 'react';

export default function BattleSelectScreen({ onSelect, onCancel }) {
  const battleSystems = [
    { id: 'proto1', name: 'Proto 01: ターン制サポートバトル', description: '既存のシステム（睦典1vs1）' },
    { id: 'proto2', name: 'Proto 02: レゾナンス・チューニング', description: '味方の攻撃タイミングに波形を合わせてダメージを増幅' },
    { id: 'proto3', name: 'Proto 03: 五線譜リズムバトル', description: '五線譜を流れる音符に合わせて方向キーを押して敵の攻撃を弾き返す' },
    { id: 'proto4', name: 'Proto 04: 新規プロット用（プロット4）', description: 'プロット1をベースにした新しいバトルシステム用' },
  ];

  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center font-noto z-[100] p-4">
      <h2 className="text-cyan-200 text-3xl font-black mb-8 tracking-widest border-b border-cyan-800 pb-2">
        BATTLE PROTOTYPE SELECT
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {battleSystems.map((sys) => (
          <button
            key={sys.id}
            onClick={() => !sys.disabled && onSelect(sys.id)}
            disabled={sys.disabled}
            className={`flex flex-col items-start p-4 border rounded-xl transition-all ${
              sys.disabled 
                ? 'bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed opacity-50' 
                : 'bg-slate-800 border-cyan-700 text-cyan-100 hover:bg-slate-700 hover:border-cyan-400 hover:scale-105'
            }`}
          >
            <span className="font-bold text-lg mb-1">{sys.name}</span>
            <span className="text-xs opacity-70">{sys.description}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={onCancel}
        className="mt-12 px-8 py-3 bg-slate-800 border border-slate-600 text-slate-300 rounded-full hover:bg-slate-700 hover:text-white transition-all text-sm tracking-widest"
      >
        RETURN TO TITLE
      </button>
    </div>
  );
}
