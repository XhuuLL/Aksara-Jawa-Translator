'use client';

import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isMateriPage = pathname === '/materi';

  return (
    <nav className="sticky top-0 z-50 w-full
      bg-white/80 dark:bg-[#09090b]/80
      backdrop-blur-xl backdrop-saturate-150
      border-b border-zinc-200/50 dark:border-white/[0.05]
      transition-colors duration-300">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8
        h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 dark:bg-[#FFB800]/10 border border-amber-100 dark:border-[#FFB800]/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-javanese text-xl text-amber-500 dark:text-[#FFB800] leading-none pt-0.5">
              ꦲ
            </span>
          </div>

          <span className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
            Aksara Jawa
          </span>

          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px]
            font-bold tracking-wider uppercase
            bg-amber-100/50 dark:bg-[#FFB800]/10
            text-amber-700 dark:text-[#FFB800]
            border border-amber-200/50 dark:border-[#FFB800]/20">
            Beta
          </span>
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-2 sm:gap-3">

          <Link
            href={isMateriPage ? '/' : '/materi'}
            className="group flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full 
              border border-transparent hover:border-zinc-200 dark:hover:border-white/[0.08] 
              hover:bg-zinc-50 dark:hover:bg-white/[0.03] 
              text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-white 
              transition-all duration-300"
          >
            {isMateriPage ? (
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            ) : (
              <BookOpen className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            )}

            <span className="text-sm font-medium tracking-wide">
              {isMateriPage ? 'Kembali' : 'Pelajari Aksara'}
            </span>
          </Link>

          <div className="w-px h-4 bg-zinc-200 dark:bg-white/[0.1] mx-1"></div>

          <ThemeToggle />

        </div>
      </div>
    </nav>
  );
}