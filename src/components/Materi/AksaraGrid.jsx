'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function AksaraGrid({ data, columns = 5 }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    10: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-10',
  };

  return (
    <div className={`grid ${gridCols[columns] || 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'} gap-4 sm:gap-5`}>
      {data.map((item, index) => (
        <button
          key={index}
          onClick={() => handleCopy(item.jawa || item.simbol, index)}
          title={`Salin ${item.latin || item.nama}`}
          className="relative group flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl
            bg-white dark:bg-zinc-900/40 backdrop-blur-md
            border border-zinc-200/50 dark:border-white/5
            hover:bg-amber-50/50 dark:hover:bg-amber-500/5
            hover:border-amber-200 dark:hover:border-amber-500/30
            hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]
            hover:-translate-y-1 active:scale-[0.98]
            transition-all duration-300 ease-out cursor-pointer overflow-hidden"
        >
          {/* Subtle glow effect behind character on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent dark:group-hover:from-amber-500/10 transition-colors duration-500" />

          {/* Copy Indicator Tooltip */}
          <div className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
            copiedIndex === index 
              ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 opacity-100 scale-100' 
              : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 text-zinc-400 dark:text-zinc-500 hover:text-amber-500 dark:hover:text-amber-400'
          }`}>
            {copiedIndex === index ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </div>

          <span className="relative z-10 font-javanese text-4xl sm:text-5xl text-zinc-800 dark:text-zinc-200
            group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300
            drop-shadow-sm group-hover:drop-shadow-md my-3">
            {item.jawa || item.simbol}
          </span>
          <span className="relative z-10 text-[13px] sm:text-sm text-zinc-500 dark:text-zinc-400 font-semibold tracking-widest mt-1">
            {item.latin || item.nama}
          </span>
          
          {item.keterangan && (
            <span className="relative z-10 text-[11px] text-zinc-400 dark:text-zinc-500/80 mt-2 text-center leading-relaxed max-w-[120px]">
              {item.keterangan}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
