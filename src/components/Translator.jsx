'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, FileText, Download, Trash2, UploadCloud, File as FileIcon, X as XIconLucide, Copy } from 'lucide-react';
import { translateLatinToJawa, translateJawaToLatin, hasValidInput, hasJavaneseInput } from '@/utils/translator';
import JavaneseKeyboard from './JavaneseKeyboard';
import CameraCapture from './CameraCapture';
import { parseFileToText } from '@/utils/fileParser';
import { toPng } from 'html-to-image';
import Link from 'next/link';

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

function SwapIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M7 10v12" />
      <path d="M11 18l-4 4-4-4" />
      <path d="M17 14V2" />
      <path d="M21 6l-4-4-4 4" />
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

function KeyboardIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" ry="2"/>
      <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M7 16h10"/>
    </svg>
  );
}

function LightningIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function LibraryIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="m16 6 4 14"/>
      <path d="M12 6v14"/>
      <path d="M8 8v12"/>
      <path d="M4 4v16"/>
    </svg>
  );
}

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
  const [mode, setMode] = useState('latin-to-jawa'); // 'latin-to-jawa' | 'jawa-to-latin'
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  
  // New States for Smart Input Workspace
  const [showCamera, setShowCamera] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [parseProgress, setParseProgress] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const isLatinToJawa = mode === 'latin-to-jawa';

  // ══════════════════════════════════════════
  // Contoh teks
  // ══════════════════════════════════════════
  const examples = [
    { text: 'Kita Makan', label: 'Kita Makan' },
    { text: 'Aku Seneng', label: 'Aku Seneng' },
    { text: 'Ngopi', label: 'Ngopi' },
    { text: 'Ibu Sedang Memasak', label: 'Ibu Sedang Memasak' },
    { text: 'Belajar Aksara Jawa', label: 'Belajar Aksara Jawa' },
  ];

  // ══════════════════════════════════════════
  // Real-time translation
  // ══════════════════════════════════════════
  const translate = useCallback((value, currentMode) => {
    if (!value.trim()) {
      setOutputText('');
      setIsTranslating(false);
      return;
    }
    setIsTranslating(true);
    // Micro-delay simulasi untuk skeleton feel
    const timer = setTimeout(() => {
      if (currentMode === 'latin-to-jawa') {
        setOutputText(translateLatinToJawa(value));
      } else {
        setOutputText(translateJawaToLatin(value));
      }
      setIsTranslating(false);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputText(value);
    translate(value, mode);
  }, [translate, mode]);

  // ══════════════════════════════════════════
  // Toggle Mode
  // ══════════════════════════════════════════
  const handleToggleMode = useCallback(() => {
    setMode((prev) => {
      const newMode = prev === 'latin-to-jawa' ? 'jawa-to-latin' : 'latin-to-jawa';
      // Swap input and output
      const tempInput = outputText;
      const tempOutput = inputText;
      setInputText(tempInput);
      setOutputText(tempOutput);
      return newMode;
    });
  }, [inputText, outputText]);

  // ══════════════════════════════════════════
  // Keyboard Handlers (Jawa to Latin)
  // ══════════════════════════════════════════
  const handleKeyboardPress = useCallback((char) => {
    const newVal = inputText + char;
    setInputText(newVal);
    translate(newVal, 'jawa-to-latin');
    inputRef.current?.focus();
  }, [inputText, translate]);

  const handleKeyboardBackspace = useCallback(() => {
    const newVal = inputText.slice(0, -1);
    setInputText(newVal);
    translate(newVal, 'jawa-to-latin');
    inputRef.current?.focus();
  }, [inputText, translate]);

  const handleKeyboardSpace = useCallback(() => {
    const newVal = inputText + ' ';
    setInputText(newVal);
    translate(newVal, 'jawa-to-latin');
    inputRef.current?.focus();
  }, [inputText, translate]);

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
  // File & Camera Handlers
  // ══════════════════════════════════════════
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File terlalu besar. Maksimal 5MB.');
      return;
    }

    const isImage = file.type.startsWith('image/');
    let previewUrl = null;
    if (isImage) {
      previewUrl = URL.createObjectURL(file);
    }
    
    setAttachedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      isImage,
      previewUrl
    });

    try {
      setIsTranslating(true);
      setParseProgress(0);
      const text = await parseFileToText(file, (progress) => {
        setParseProgress(Math.round(progress * 100));
      });
      setInputText(text);
      translate(text, mode);
    } catch (err) {
      alert(err.message);
      handleRemoveFile();
    } finally {
      setParseProgress(null);
      setIsTranslating(false);
    }
  };

  const handleRemoveFile = useCallback(() => {
    setAttachedFile((prev) => {
      if (prev?.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return null;
    });
    setInputText('');
    setOutputText('');
    setParseProgress(null);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // ══════════════════════════════════════════
  // Download Handlers
  // ══════════════════════════════════════════
  const handleDownloadImage = useCallback(async () => {
    if (!outputRef.current) return;
    try {
      const dataUrl = await toPng(outputRef.current, { quality: 0.95, backgroundColor: 'transparent' });
      const link = document.createElement('a');
      link.download = `terjemahan-jawa-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  }, []);

  const handleDownloadTxt = useCallback(() => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `terjemahan-jawa-${Date.now()}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  }, [outputText]);

  // ══════════════════════════════════════════
  // Clear input
  // ══════════════════════════════════════════
  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    handleRemoveFile();
    inputRef.current?.focus();
  }, [handleRemoveFile]);

  // ══════════════════════════════════════════
  // Handle example click
  // ══════════════════════════════════════════
  const handleExample = useCallback((text) => {
    if (mode === 'jawa-to-latin') {
      const jawaText = translateLatinToJawa(text);
      setInputText(jawaText);
      translate(jawaText, 'jawa-to-latin');
    } else {
      setInputText(text);
      translate(text, 'latin-to-jawa');
    }
  }, [translate, mode]);

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
          Konversi teks ke Aksara Jawa (Hanacaraka) secara instan.
          <span className="hidden sm:inline"> Dilengkapi dengan keyboard Aksara Jawa virtual.</span>
        </p>
      </section>

      {/* ══════════════════════ EXAMPLES ══════════════════════════ */}
      <section className="mb-6 md:mb-8 animate-fade-in-delay-1">
        <div className="flex flex-col items-center gap-4">
          
          {/* Mode Toggle Button */}
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isLatinToJawa ? 'bg-white dark:bg-zinc-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-zinc-500 dark:text-zinc-400'}`}>
              Latin
            </span>
            <button
              onClick={handleToggleMode}
              className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-90 transition-all text-zinc-400 hover:text-amber-500 cursor-pointer"
              title="Tukar Arah Terjemahan"
            >
              <SwapIcon className="h-5 w-5" />
            </button>
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${!isLatinToJawa ? 'bg-white dark:bg-zinc-700 text-amber-600 dark:text-amber-400 shadow-sm' : 'text-zinc-500 dark:text-zinc-400'}`}>
              Aksara Jawa
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
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
          <div 
            className={`relative group/card flex flex-col h-full rounded-2xl bg-white dark:bg-zinc-900/80 backdrop-blur-xl border transition-all duration-300 shadow-sm dark:shadow-zinc-950/20 ${isDragging ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-500/10' : 'border-zinc-200/80 dark:border-zinc-800/80 hover:shadow-md dark:hover:shadow-zinc-950/40 hover:border-zinc-300/80 dark:hover:border-zinc-700/80'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/20 rounded-t-2xl">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <button onClick={() => setShowCamera(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-amber-300 dark:hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition-all whitespace-nowrap">
                  <Camera className="w-3.5 h-3.5" /> Kamera
                </button>
                <button onClick={() => imageInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-amber-300 dark:hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition-all whitespace-nowrap">
                  <ImageIcon className="w-3.5 h-3.5" /> Gambar
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-amber-300 dark:hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 text-zinc-600 dark:text-zinc-400 text-xs font-medium transition-all whitespace-nowrap">
                  <FileText className="w-3.5 h-3.5" /> Dokumen
                </button>
                <input type="file" ref={imageInputRef} accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0])} />
                <input type="file" ref={fileInputRef} accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0])} />
              </div>
              {inputText && (
                <button onClick={handleClear} className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Hapus</span>
                </button>
              )}
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col">
              {attachedFile && (
                <div className="mb-4 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-between animate-fade-in group/file">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0">
                      {attachedFile.isImage ? (
                        <ImageIcon className="w-5 h-5 text-amber-500" />
                      ) : (
                        <FileIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{attachedFile.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{attachedFile.size}</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveFile} className="p-2 text-zinc-400 hover:text-red-500 bg-zinc-50 hover:bg-red-50 dark:bg-zinc-800/50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                    <XIconLucide className="w-4 h-4" />
                  </button>
                </div>
              )}

              {parseProgress !== null && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1 text-zinc-500 dark:text-zinc-400">
                    <span>Memproses dokumen...</span>
                    <span>{parseProgress}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${parseProgress}%` }} />
                  </div>
                </div>
              )}

              <textarea
                ref={inputRef}
                id="latin-input"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Masukkan Teks..."
                className={`w-full flex-1 min-h-[160px] p-4 rounded-2xl text-base sm:text-lg leading-relaxed bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all duration-300 ${!isLatinToJawa ? 'font-javanese text-2xl sm:text-3xl' : ''}`}
                spellCheck={false}
                autoComplete="off"
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <span className="text-xs text-zinc-400 dark:text-zinc-600 tabular-nums">
                  {inputText.length} karakter
                </span>
                {inputText && isLatinToJawa && !hasValidInput(inputText) && (
                  <span className="text-xs text-amber-600 dark:text-amber-400/80 font-medium">Masukkan Teks</span>
                )}
                {inputText && !isLatinToJawa && !hasJavaneseInput(inputText) && (
                  <span className="text-xs text-amber-600 dark:text-amber-400/80 font-medium">Masukkan Aksara Jawa</span>
                )}
              </div>
            </div>
            
            {isDragging && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-amber-500/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-amber-400/50">
                <div className="flex flex-col items-center text-amber-600 dark:text-amber-400">
                  <UploadCloud className="w-12 h-12 mb-2 animate-bounce" />
                  <span className="font-semibold">Lepaskan file di sini</span>
                </div>
              </div>
            )}
          </div>

          {/* ──── MOBILE ARROW / SWAP ──── */}
          <div className="flex lg:hidden justify-center -my-3 relative z-20">
            <button onClick={handleToggleMode} className="h-10 w-10 rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
              <SwapIcon className="h-5 w-5 rotate-90" />
            </button>
          </div>

          {/* ──── OUTPUT CARD ──── */}
          <div className="relative group/card flex flex-col h-full rounded-2xl bg-white dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm dark:shadow-zinc-950/20 transition-all duration-300 hover:shadow-md dark:hover:shadow-zinc-950/40 hover:border-zinc-300/80 dark:hover:border-zinc-700/80">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-800/20 rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                {!isLatinToJawa ? (
                  <span className="font-semibold text-sm text-amber-500 dark:text-amber-400">Aa</span>
                ) : (
                  <span className="font-javanese text-sm text-amber-500 dark:text-amber-400">ꦲ</span>
                )}
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide">
                  {isLatinToJawa ? 'Aksara Jawa' : 'Teks Latin'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {outputText && (
                  <>
                    <button onClick={isLatinToJawa ? handleDownloadImage : handleDownloadTxt} className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all" title="Download">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={handleCopy} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${copied ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10'}`} title="Copy">
                      {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col" ref={outputRef}>
              <div className="flex-1">
                {isTranslating ? (
                  <div className="w-full space-y-3 animate-pulse">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-700/60 rounded-md w-3/4" />
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-700/60 rounded-md w-1/2" />
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-700/60 rounded-md w-5/6" />
                  </div>
                ) : outputText ? (
                  <p className={`${isLatinToJawa ? 'font-javanese text-3xl sm:text-4xl' : 'text-lg sm:text-xl'} text-amber-700 dark:text-amber-200 leading-loose break-all tracking-wide animate-fade-in`}>
                    {outputText}
                  </p>
                ) : (
                  <p className="text-zinc-400 dark:text-zinc-600 text-base italic select-none">
                    Hasil terjemahan akan muncul di sini...
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                <span className="text-xs text-zinc-400 dark:text-zinc-600 tabular-nums">
                  {outputText.length > 0 ? `${outputText.length} karakter` : 'Menunggu input'}
                </span>
                {outputText && isLatinToJawa && (
                  <span className="text-[10px] text-amber-500/50 uppercase tracking-widest font-semibold">
                    Aksara Jawa Translator
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ KEYBOARD AKSARA JAWA ══════════════════ */}
      {!isLatinToJawa && (
        <section className="mt-4 md:mt-6 animate-fade-in-delay-2 w-full lg:w-1/2 lg:mr-auto lg:pr-2.5 relative z-20">
          <div className="sticky bottom-4 md:static">
            <JavaneseKeyboard
              onKeyPress={handleKeyboardPress}
              onBackspace={handleKeyboardBackspace}
              onClear={handleClear}
              onSpace={handleKeyboardSpace}
            />
          </div>
        </section>
      )}

      {/* ═════════════════ HOW IT WORKS ═══════════════════════════ */}
      <section className="mt-16 md:mt-24 animate-fade-in-delay-3">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Cara Kerja
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-2">
            Translasi teks dalam 3 langkah mudah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Subtle background glow for the whole section */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-yellow-500/5 dark:from-amber-500/10 dark:via-transparent dark:to-yellow-500/10 blur-3xl -z-10 rounded-full" />

          {[
            {
              step: '01',
              title: 'Ketik Teks',
              desc: 'Masukkan kata atau kalimat dalam huruf Latin biasa atau gunakan keyboard Aksara Jawa.',
              icon: KeyboardIcon,
            },
            {
              step: '02',
              title: 'Translasi Otomatis',
              desc: 'Teks akan langsung dikonversi secara real-time saat Anda mengetik, tanpa perlu memuat ulang.',
              icon: LightningIcon,
            },
            {
              step: '03',
              title: 'Salin & Gunakan',
              desc: 'Satu klik untuk menyalin hasilnya ke clipboard dan siap digunakan di mana saja.',
              icon: CopyIcon,
            },
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step}
              className="relative p-6 sm:p-8 rounded-3xl
                bg-white/80 dark:bg-white/[0.03] backdrop-blur-md
                border border-zinc-200/50 dark:border-white/10
                shadow-sm hover:shadow-xl hover:shadow-amber-500/5 dark:hover:shadow-amber-500/10
                hover:border-amber-400/50 dark:hover:border-amber-500/30
                hover:-translate-y-1 transition-all duration-500 group overflow-hidden">
              
              {/* Background Highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent dark:from-amber-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Step Number Background */}
              <span className="text-6xl sm:text-7xl font-black italic tracking-tighter
                text-transparent bg-clip-text bg-gradient-to-br from-zinc-300 to-zinc-100
                dark:from-zinc-700 dark:to-zinc-800
                group-hover:from-amber-200 group-hover:to-amber-100
                dark:group-hover:from-amber-500/40 dark:group-hover:to-amber-900/20
                opacity-40 group-hover:opacity-60 transition-all duration-500
                absolute -top-2 -right-2 select-none pointer-events-none">
                {step}
              </span>

              <div className="relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/5 flex items-center justify-center mb-6 text-zinc-500 dark:text-zinc-400 group-hover:text-amber-500 group-hover:bg-amber-50 dark:group-hover:bg-amber-500/10 group-hover:border-amber-200/50 dark:group-hover:border-amber-500/20 transition-all duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-300">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ CAMERA MODAL ══════════════════════════ */}
      {showCamera && (
        <CameraCapture 
          onCapture={(file) => {
            handleFileUpload(file);
          }} 
          onClose={() => setShowCamera(false)} 
        />
      )}
    </div>
  );
}
