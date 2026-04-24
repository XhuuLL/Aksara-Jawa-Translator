'use client';

import ThemeProvider from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

/**
 * ClientLayout — Client-side wrapper yang menggabungkan:
 * 1. ThemeProvider (context tema)
 * 2. Navbar (logo + theme toggle)
 * 3. Content area
 */
export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav className="sticky top-0 z-50 w-full
        bg-white/80 dark:bg-zinc-950/80
        backdrop-blur-xl backdrop-saturate-150
        border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
          h-14 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="font-javanese text-xl text-amber-500 dark:text-amber-400 leading-none">
              ꦲ
            </span>
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">
              Aksara Jawa
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px]
              font-medium tracking-wider uppercase
              bg-amber-100 dark:bg-amber-500/10
              text-amber-700 dark:text-amber-400
              border border-amber-200/50 dark:border-amber-500/20">
              Beta
            </span>
          </div>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </nav>

      {/* ══════════════════ CONTENT ══════════════════ */}
      {children}
    </ThemeProvider>
  );
}
