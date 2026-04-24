'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * ThemeContext
 * Menyediakan state tema (dark/light) ke seluruh aplikasi.
 * - Default mengikuti system preference (prefers-color-scheme)
 * - Preferensi disimpan di localStorage agar persisten
 * - Transisi smooth saat ganti tema via CSS transition
 */
const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

/**
 * Hook untuk mengakses tema dari ThemeContext.
 * @returns {{ theme: 'dark' | 'light', toggleTheme: () => void }}
 */
export function useTheme() {
  return useContext(ThemeContext);
}

const STORAGE_KEY = 'aksara-jawa-theme';

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // ══════════════════════════════════════════
  // Inisialisasi tema saat mount (client-side only)
  // Prioritas: localStorage > system preference > default 'dark'
  // ══════════════════════════════════════════
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
    setMounted(true);
  }, []);

  // ══════════════════════════════════════════
  // Apply class "dark" pada <html> setiap kali tema berubah
  // ══════════════════════════════════════════
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Hindari flash of wrong theme — render children hanya setelah mount
  // Tapi tetap render container agar nggak ada layout shift
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`transition-colors duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
