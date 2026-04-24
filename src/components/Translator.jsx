'use client';

import { useState, useCallback, useRef } from 'react';
import { translateLatinToJawa, hasValidInput } from '@/utils/translator';

// ═══════════════════════════════════════════════════════════════
// ICON COMPONENTS (inline SVG untuk zero-dependency)
// ═══════════════════════════════════════════════════════════════

function CopyIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// AKSARA TABLE DATA
// ═══════════════════════════════════════════════════════════════
const AKSARA_TABLE = [
  ['ha', 'ꦲ'], ['na', 'ꦤ'], ['ca', 'ꦕ'], ['ra', 'ꦫ'], ['ka', 'ꦏ'],
  ['da', 'ꦢ'], ['ta', 'ꦠ'], ['sa', 'ꦱ'], ['wa', 'ꦮ'], ['la', 'ꦭ'],
  ['pa', 'ꦥ'], ['dha', 'ꦣ'], ['ja', 'ꦗ'], ['ya', 'ꦪ'], ['nya', 'ꦚ'],
  ['ma', 'ꦩ'], ['ga', 'ꦒ'], ['ba', 'ꦧ'], ['tha', 'ꦛ'], ['nga', 'ꦔ'],
];

// ═══════════════════════════════════════════════════════════════
// TRANSLATOR COMPONENT
// ═══════════════════════════════════════════════════════════════

/**
 * Komponen utama Translator — redesain premium SaaS-style.
 * Translasi Latin → Aksara Jawa secara real-time.
 */
export default function Translator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const inputRef = useRef(null);

  const PLACEHOLDER = 'Ketik teks Latin di sini...';

  // ══════════════════════════════════════════
  // Contoh teks
  // ══════════════════════════════════════════
  const examples = [
    { text: 'kita makan', label: 'kita makan' },
    { text: 'aku seneng', label: 'aku seneng' },
    { text: 'ngopi', label: 'ngopi' },
    { text: 'selamat pagi', label: 'selamat pagi' },
    { text: 'belajar aksara jawa', label: 'belajar aksara' },
  ];

  // ══════════════════════════════════════════
  // Real-time translation
  // ══════════════════════════════════════════
  const translate = useCallback((value) => {
    if (!value.trim()) {
      setOutputText('');
      setIsTranslating(false);
      return;
    }
    setIsTranslating(true);
    // Micro-delay simulasi untuk skeleton feel
    const timer = setTimeout(() => {
      setOutputText(translateLatinToJawa(value));
      setIsTranslating(false);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputText(value);
    translate(value);
  }, [translate]);

  // ══════════════════════════════════════════
  // Copy to clipboard
  // ══════════════════════════════════════════
  const handleCopy = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = outputText;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [outputText]);

  // ══════════════════════════════════════════
  // Clear input
  // ══════════════════════════════════════════
  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    inputRef.current?.focus();
  }, []);

  // ══════════════════════════════════════════
  // Handle example click
  // ══════════════════════════════════════════
  const handleExample = useCallback((text) => {
    setInputText(text);
    translate(text);
  }, [translate]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="text-center mb-10 md:mb-14 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
          bg-amber-500/10 dark:bg-amber-400/10
          border border-amber-200/40 dark:border-amber-500/20
          text-amber-700 dark:text-amber-300 text-xs font-medium tracking-wide">
          <SparklesIcon className="h-3.5 w-3.5" />
          Penerjemah Real-Time
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight
          text-zinc-900 dark:text-zinc-50 leading-[1.1]">
          Latin ke{' '}
          <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500
            dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400
            bg-clip-text text-transparent">
            Aksara Jawa
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Konversi teks Latin ke aksara Jawa (Hanacaraka) secara instan.
          <span className="hidden sm:inline"> Cukup ketik dan lihat hasilnya.</span>
        </p>
      </section>

      {/* ══════════════════════ EXAMPLES ══════════════════════════ */}
      <section className="mb-6 md:mb-8 animate-fade-in-delay-1">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Coba
          </span>
          {examples.map(({ text, label }) => (
            <button
              key={text}
              onClick={() => handleExample(text)}
              className="px-3.5 py-1.5 rounded-full text-[13px] font-medium
                bg-zinc-100 dark:bg-zinc-800/70
                text-zinc-600 dark:text-zinc-300
                border border-zinc-200/80 dark:border-zinc-700/60
                hover:bg-amber-50 dark:hover:bg-amber-500/10
                hover:text-amber-700 dark:hover:text-amber-300
                hover:border-amber-200 dark:hover:border-amber-500/30
                active:scale-[0.96]
                transition-all duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ══════════════════ TRANSLATOR CARDS ══════════════════════ */}
      <section className="animate-fade-in-delay-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 relative">

          {/* ──── CENTER ARROW (desktop only) ──── */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="h-10 w-10 rounded-full
              bg-white dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              shadow-lg dark:shadow-zinc-900/50
              flex items-center justify-center">
              <ArrowRightIcon className="h-4 w-4 text-amber-500" />
            </div>
          </div>

          {/* ──── INPUT CARD ──── */}
          <div className="relative group/card">
            {/* Gradient glow on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-400/20 via-transparent to-yellow-400/10
              opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />

            <div className="relative bg-white dark:bg-zinc-900/80 backdrop-blur-xl
              rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80
              shadow-sm dark:shadow-zinc-950/20
              p-5 sm:p-6 transition-all duration-300
              hover:shadow-md dark:hover:shadow-zinc-950/40
              hover:border-zinc-300/80 dark:hover:border-zinc-700/80">

              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-amber-400 dark:bg-amber-500 animate-pulse" />
                  <label htmlFor="latin-input"
                    className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
                    Teks Latin
                  </label>
                </div>
                {inputText && (
                  <button
                    onClick={handleClear}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium
                      text-zinc-400 dark:text-zinc-500
                      hover:text-red-500 dark:hover:text-red-400
                      hover:bg-red-50 dark:hover:bg-red-500/10
                      active:scale-95
                      transition-all duration-200 cursor-pointer"
                    aria-label="Hapus teks"
                  >
                    <XIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">Hapus</span>
                  </button>
                )}
              </div>

              {/* Textarea */}
              <textarea
                ref={inputRef}
                id="latin-input"
                value={inputText}
                onChange={handleInputChange}
                placeholder={PLACEHOLDER}
                rows={7}
                className="w-full rounded-xl p-4 text-base sm:text-lg leading-relaxed
                  bg-zinc-50 dark:bg-zinc-800/50
                  text-zinc-900 dark:text-zinc-100
                  placeholder-zinc-400 dark:placeholder-zinc-600
                  border border-zinc-200/70 dark:border-zinc-700/50
                  resize-none
                  focus:outline-none focus:ring-2
                  focus:ring-amber-400/30 dark:focus:ring-amber-500/25
                  focus:border-amber-300 dark:focus:border-amber-500/40
                  transition-all duration-300"
                spellCheck={false}
                autoComplete="off"
              />

              {/* Footer info */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-zinc-400 dark:text-zinc-600 tabular-nums">
                  {inputText.length} karakter
                </span>
                {inputText && !hasValidInput(inputText) && (
                  <span className="text-xs text-amber-600 dark:text-amber-400/80 font-medium">
                    Masukkan huruf Latin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ──── MOBILE ARROW ──── */}
          <div className="flex lg:hidden justify-center -my-1">
            <div className="h-8 w-8 rounded-full
              bg-white dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              shadow-sm
              flex items-center justify-center rotate-90">
              <ArrowRightIcon className="h-3.5 w-3.5 text-amber-500" />
            </div>
          </div>

          {/* ──── OUTPUT CARD ──── */}
          <div className="relative group/card">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-yellow-400/15 via-transparent to-amber-400/20
              opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none" />

            <div className="relative bg-white dark:bg-zinc-900/80 backdrop-blur-xl
              rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80
              shadow-sm dark:shadow-zinc-950/20
              p-5 sm:p-6 transition-all duration-300
              hover:shadow-md dark:hover:shadow-zinc-950/40
              hover:border-zinc-300/80 dark:hover:border-zinc-700/80">

              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-javanese text-sm text-amber-500 dark:text-amber-400">ꦲ</span>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
                    Aksara Jawa
                  </span>
                </div>
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                      transition-all duration-300 cursor-pointer active:scale-95
                      ${copied
                        ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/25'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-200 dark:hover:border-amber-500/30 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                      }`}
                    aria-label="Salin hasil"
                  >
                    {copied ? (
                      <><CheckIcon className="h-3.5 w-3.5" /> Tersalin!</>
                    ) : (
                      <><CopyIcon className="h-3.5 w-3.5" /> Salin</>
                    )}
                  </button>
                )}
              </div>

              {/* Output area */}
              <div className={`w-full rounded-xl p-4 min-h-[196px] sm:min-h-[208px]
                bg-zinc-50 dark:bg-zinc-800/50
                border border-zinc-200/70 dark:border-zinc-700/50
                flex items-start
                transition-all duration-300`}>
                {isTranslating ? (
                  /* Skeleton loading */
                  <div className="w-full space-y-3 animate-pulse">
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-700/60 rounded-lg w-3/4" />
                    <div className="h-8 bg-zinc-200 dark:bg-zinc-700/60 rounded-lg w-1/2" />
                  </div>
                ) : outputText ? (
                  <p className="font-javanese text-2xl sm:text-3xl md:text-4xl
                    text-amber-700 dark:text-amber-200
                    leading-loose break-all tracking-wide
                    animate-scale-in">
                    {outputText}
                  </p>
                ) : (
                  <p className="text-zinc-400 dark:text-zinc-600 text-base italic select-none">
                    Hasil aksara Jawa akan muncul di sini...
                  </p>
                )}
              </div>

              {/* Footer info */}
              <div className="mt-3">
                <span className="text-xs text-zinc-400 dark:text-zinc-600 tabular-nums">
                  {outputText.length > 0 ? `${outputText.length} karakter aksara` : 'Menunggu input'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════ HOW IT WORKS ═══════════════════════════ */}
      <section className="mt-10 md:mt-14 animate-fade-in-delay-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {[
            {
              step: '01',
              title: 'Ketik teks Latin',
              desc: 'Masukkan kata atau kalimat dalam huruf Latin biasa',
            },
            {
              step: '02',
              title: 'Translasi otomatis',
              desc: 'Aksara Jawa akan muncul secara real-time saat Anda mengetik',
            },
            {
              step: '03',
              title: 'Salin & gunakan',
              desc: 'Klik tombol salin untuk menyalin aksara ke clipboard',
            },
          ].map(({ step, title, desc }) => (
            <div key={step}
              className="relative p-5 sm:p-6 rounded-2xl
                bg-white dark:bg-zinc-900/60 backdrop-blur-sm
                border border-zinc-200/60 dark:border-zinc-800/60
                hover:border-zinc-300 dark:hover:border-zinc-700
                transition-all duration-300 group">
              <span className="text-4xl font-black
                text-zinc-100 dark:text-zinc-800/60
                group-hover:text-amber-100 dark:group-hover:text-amber-500/10
                transition-colors duration-300
                absolute top-4 right-5 select-none">
                {step}
              </span>
              <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1.5 relative">
                {title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed relative">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ AKSARA TABLE ═════════════════════════════ */}
      <section className="mt-6 md:mt-8 animate-fade-in-delay-3">
        <button
          onClick={() => setShowTable(!showTable)}
          className="w-full flex items-center justify-between p-5 sm:p-6 rounded-2xl
            bg-white dark:bg-zinc-900/60 backdrop-blur-sm
            border border-zinc-200/60 dark:border-zinc-800/60
            hover:border-zinc-300 dark:hover:border-zinc-700
            transition-all duration-300 cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <span className="font-javanese text-lg text-amber-500 dark:text-amber-400">ꦲꦤꦕ</span>
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Tabel Aksara Dasar (Carakan)
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 text-zinc-400 transition-transform duration-300
              ${showTable ? 'rotate-180' : 'rotate-0'}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Table content (animated reveal) */}
        <div className={`overflow-hidden transition-all duration-500 ease-out
          ${showTable ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2 sm:gap-3">
            {AKSARA_TABLE.map(([latin, jawa]) => (
              <div key={latin}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl
                  bg-white dark:bg-zinc-900/50
                  border border-zinc-200/50 dark:border-zinc-800/50
                  hover:border-amber-300 dark:hover:border-amber-500/30
                  hover:bg-amber-50/50 dark:hover:bg-amber-500/5
                  transition-all duration-200 group/cell">
                <span className="font-javanese text-xl sm:text-2xl
                  text-amber-600 dark:text-amber-300
                  group-hover/cell:text-amber-500 dark:group-hover/cell:text-amber-200
                  transition-colors">
                  {jawa}
                </span>
                <span className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-600 mt-1.5 font-medium uppercase">
                  {latin}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ════════════════════════════════ */}
      <footer className="text-center mt-12 md:mt-16 mb-8 animate-fade-in-delay-3">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent mx-auto mb-5" />
        <p className="text-sm text-zinc-400 dark:text-zinc-600">
          Dibuat dengan ❤️ untuk melestarikan budaya Jawa
        </p>
        <p className="text-xs text-zinc-300 dark:text-zinc-700 mt-1.5">
          Unicode Javanese Script · U+A980–U+A9DF
        </p>
      </footer>
    </div>
  );
}
