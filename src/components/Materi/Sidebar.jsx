'use client';

import { useEffect, useState, useRef } from 'react';

export default function Sidebar({ sections }) {
  const [activeId, setActiveId] = useState('');
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Auto scroll horizontal nav on mobile
            if (window.innerWidth < 1024 && scrollContainerRef.current) {
              const activeEl = document.getElementById(`nav-${entry.target.id}`);
              if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            }
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Horizontal Nav (sticky under main navbar) */}
      <div className="lg:hidden sticky top-[64px] z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/[0.05] -mx-6 px-6 sm:-mx-8 sm:px-8 mb-8">
        <nav ref={scrollContainerRef} className="flex overflow-x-auto no-scrollbar py-3 gap-2 scroll-smooth">
          {sections.map((section) => (
            <a
              key={section.id}
              id={`nav-${section.id}`}
              href={`#${section.id}`}
              onClick={(e) => handleScroll(e, section.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeId === section.id
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'
                }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block sticky top-32 w-64 h-[calc(100vh-8rem)] shrink-0 pr-8 overflow-y-auto no-scrollbar">
        <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-6 pl-3">
          On This Page
        </h3>
        <nav className="space-y-1 relative before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-zinc-200 dark:before:bg-white/10">
          {sections.map((section) => (
            <div key={section.id} className="relative">
              {/* Active line indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-px bg-amber-500 transition-transform duration-300 origin-top ${activeId === section.id ? 'scale-y-100' : 'scale-y-0'}`} />
              
              <a
                href={`#${section.id}`}
                onClick={(e) => handleScroll(e, section.id)}
                className={`group flex items-center justify-between px-4 py-2.5 rounded-r-xl text-sm font-medium transition-all duration-300
                  ${
                    activeId === section.id
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/5'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/5'
                  }`}
              >
                <span className="truncate">{section.title}</span>
              </a>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
