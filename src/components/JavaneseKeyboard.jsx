'use client';

import React from 'react';

// ═══════════════════════════════════════════════════════════════
// DATA KEYBOARD
// ═══════════════════════════════════════════════════════════════
const CARAKAN = [
  ['ꦲ', 'ha'], ['ꦤ', 'na'], ['ꦕ', 'ca'], ['ꦫ', 'ra'], ['ꦏ', 'ka'],
  ['ꦢ', 'da'], ['ꦠ', 'ta'], ['ꦱ', 'sa'], ['ꦮ', 'wa'], ['ꦭ', 'la'],
  ['ꦥ', 'pa'], ['ꦣ', 'dha'], ['ꦗ', 'ja'], ['ꦪ', 'ya'], ['ꦚ', 'nya'],
  ['ꦩ', 'ma'], ['ꦒ', 'ga'], ['ꦧ', 'ba'], ['ꦛ', 'tha'], ['ꦔ', 'nga'],
];

const SANDHANGAN = [
  ['ꦶ', 'i (wulu)'], ['ꦸ', 'u (suku)'], ['ꦺ', 'e (taling)'], 
  ['ꦼ', 'e (pepet)'], ['ꦺꦴ', 'o (taling tarung)'], 
  ['ꦀ', 'pangkon (mati)'],
];

// ═══════════════════════════════════════════════════════════════
// KOMPONEN KEYBOARD
// ═══════════════════════════════════════════════════════════════
export default function JavaneseKeyboard({ onKeyPress, onBackspace, onClear, onSpace }) {
  
  return (
    <div className="w-full bg-zinc-100 dark:bg-zinc-800/80 p-3 sm:p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all duration-300">
      
      {/* ──── TABEL AKSARA DASAR (CARAKAN) ──── */}
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Aksara Dasar</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {CARAKAN.map(([aksara, label]) => (
            <button
              key={label}
              onClick={() => onKeyPress(aksara)}
              title={label}
              className="flex flex-col items-center justify-center py-2 sm:py-3 rounded-lg
                bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
                text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10
                hover:border-amber-300 dark:hover:border-amber-500/30
                active:scale-95 transition-all duration-200 cursor-pointer shadow-sm group"
            >
              <span className="font-javanese text-xl sm:text-2xl mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-300">{aksara}</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ──── SANDHANGAN ──── */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Sandhangan & Pangkon</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
            {SANDHANGAN.map(([aksara, label]) => (
              <button
                key={label}
                onClick={() => onKeyPress(aksara)}
                title={label}
                className="flex flex-col items-center justify-center py-2 sm:py-3 rounded-lg
                  bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
                  text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10
                  hover:border-amber-300 dark:hover:border-amber-500/30
                  active:scale-95 transition-all duration-200 cursor-pointer shadow-sm group relative"
              >
                <span className="font-javanese text-xl sm:text-2xl mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-300">
                  {/* Lingkaran putus-putus sebagai placeholder aksara dasar */}
                  <span className="text-zinc-300 dark:text-zinc-600 absolute opacity-30 select-none">◌</span>
                  {aksara}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate w-full text-center px-1">
                  {label.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ──── KONTROL ──── */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Kontrol</h4>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-[60px] sm:h-auto">
            <button
              onClick={onSpace}
              className="flex items-center justify-center py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm
                bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
                text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800
                active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              Spasi
            </button>
            <button
              onClick={onBackspace}
              className="flex items-center justify-center py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm
                bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
                text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10
                hover:border-amber-200 dark:hover:border-amber-500/30
                active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              Hapus (⌫)
            </button>
            <button
              onClick={onClear}
              className="flex items-center justify-center py-2 sm:py-3 rounded-lg font-medium text-xs sm:text-sm
                bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30
                text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20
                active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
