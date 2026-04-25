'use client';

import ThemeProvider from './ThemeProvider';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * ClientLayout — Client-side wrapper yang menggabungkan:
 * 1. ThemeProvider (context tema)
 * 2. Navbar (logo + theme toggle)
 * 3. Content area
 */
export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <Navbar />

      {/* ══════════════════ CONTENT ══════════════════ */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
    </ThemeProvider>
  );
}
