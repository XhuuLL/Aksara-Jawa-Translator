'use client';

function GithubIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.1-.34 6.33-1.53 6.33-6.98 0-1.55-.54-2.8-1.42-3.78.14-.35.62-1.79-.14-3.73 0 0-1.15-.37-3.77 1.4a12.48 12.48 0 0 0-6.8 0c-2.62-1.77-3.77-1.4-3.77-1.4-.76 1.94-.28 3.38-.14 3.73-.88.98-1.42 2.23-1.42 3.78 0 5.45 3.23 6.64 6.33 6.98-.84.7-1.05 1.9-1.05 3.02V22"/>
      <path d="M9 20c-4 1-5-2-7-2"/>
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TiktokIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 mb-8 pt-8 border-t border-zinc-200/50 dark:border-white/5 animate-fade-in-delay-3 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Dibuat Oleh Akhmad Fatkhul Arifin untuk melestarikan budaya Jawa
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Berdasarkan Materi dan Ilmu dari <a href="https://id.wikipedia.org/wiki/Aksara_Jawa" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300">Wikipedia</a>
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <a href="https://github.com/XhuuLL" target="_blank" rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-200/50 dark:hover:border-amber-500/30 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <GithubIcon className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.instagram.com/mynameisfatkhul?igsh=MTlxamRuNWM3MXF0Mw==" target="_blank" rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-200/50 dark:hover:border-amber-500/30 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <InstagramIcon className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://www.tiktok.com/@arifinnzz?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-200/50 dark:hover:border-amber-500/30 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <TiktokIcon className="h-4 w-4" />
            <span className="sr-only">TikTok</span>
          </a>
          <a href="https://www.linkedin.com/in/akhmad-fatkhul-arifin-632a383a6/" target="_blank" rel="noopener noreferrer" 
            className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-200/50 dark:hover:border-amber-500/30 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <LinkedinIcon className="h-4 w-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
