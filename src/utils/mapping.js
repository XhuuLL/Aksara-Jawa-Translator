/**
 * mapping.js
 * 
 * Mapping lengkap aksara Jawa menggunakan Unicode block Javanese (U+A980–U+A9DF).
 * Referensi: Unicode Standard, Chapter 17 - Javanese Script
 */

// ═══════════════════════════════════════════════════════════════
// AKSARA DASAR (Base Characters / Carakan)
// Aksara dasar Jawa mengikuti urutan Ha-Na-Ca-Ra-Ka
// ═══════════════════════════════════════════════════════════════
export const AKSARA = {
  'ha': '\uA9B4',   // ꦲ - ha (aksara ha)
  'na': '\uA9A4',   // ꦤ - na
  'ca': '\uA9A0',   // ꦕ - ca (dipakai juga untuk "cha")
  'ra': '\uA9A7',   // ꦫ - ra
  'ka': '\uA99E',   // ꦏ - ka
  'da': '\uA9A2',   // ꦢ - da
  'ta': '\uA9A1',   // ꦠ - ta
  'sa': '\uA9B1',   // ꦱ - sa
  'wa': '\uA9B3',   // ꦮ - wa (dipakai juga untuk "v")
  'la': '\uA9A8',   // ꦭ - la
  'pa': '\uA9A5',   // ꦥ - pa
  'dha': '\uA9A3',  // ꦣ - dha (da mahaprana)
  'ja': '\uA99F',   // ꦗ - ja
  'ya': '\uA9AA',   // ꦪ - ya
  'nya': '\uA99B',  // ꦚ - nya
  'ma': '\uA9A9',   // ꦩ - ma
  'ga': '\uA99C',   // ꦒ - ga
  'ba': '\uA9A6',   // ꦧ - ba
  'tha': '\uA9AC',  // ꦛ - tha (ta mahaprana)
  'nga': '\uA99D',  // ꦔ - nga
  // Aksara tambahan
  'fa': '\uA9A5',   // ꦥ - fa (menggunakan pa, karena tidak ada di aksara Jawa)
  'va': '\uA9B3',   // ꦮ - va (menggunakan wa)
  'za': '\uA9B1',   // ꦱ - za (menggunakan sa)
};

// ═══════════════════════════════════════════════════════════════
// AKSARA VOKAL MANDIRI (Independent Vowels)
// Digunakan ketika vokal berdiri sendiri di awal kata
// ═══════════════════════════════════════════════════════════════
export const AKSARA_SWARA = {
  'a': '\uA984',    // ꦄ - aksara swara a
  'i': '\uA986',    // ꦆ - aksara swara i
  'u': '\uA988',    // ꦈ - aksara swara u
  'e': '\uA98A',    // ꦌ - aksara swara e (taling)
  'o': '\uA98E',    // ꦎ - aksara swara o
  'é': '\uA98A',    // alias untuk e (taling)
  'è': '\uA98C',    // ꦌ - aksara swara è (pepet)
};

// ═══════════════════════════════════════════════════════════════
// SANDHANGAN SWARA (Vowel Signs / Diacritics)
// Mengubah vokal inheren "a" menjadi vokal lain
// ═══════════════════════════════════════════════════════════════
export const SANDHANGAN = {
  'i': '\uA9B6',    // ꦶ - wulu (vokal i)
  'u': '\uA9B8',    // ꦸ - suku (vokal u)
  'e': '\uA9BA',    // ꦺ - taling (vokal é/e)
  'o': '\uA9BA\uA9B4', // ꦺꦴ - taling + tarung (vokal o)
  'é': '\uA9BA',    // taling (alias)
  'è': '\uA9BC',    // ꦼ - pepet (vokal e pepet)
};

// ═══════════════════════════════════════════════════════════════
// PANGKON (Virama)
// Tanda pembunuh aksara - menghilangkan vokal inheren
// ═══════════════════════════════════════════════════════════════
export const PANGKON = '\uA9C0'; // ꦀ - pangkon / patèn

// ═══════════════════════════════════════════════════════════════
// PASANGAN (Subscript / Conjunct Consonants)
// Konsonan bawah yang digunakan untuk konsonan mati + konsonan hidup
// ═══════════════════════════════════════════════════════════════
export const PASANGAN = {
  'ha': '\uA9C0\uA9B4',    // pangkon + ha
  'na': '\uA9C0\uA9A4',    // pangkon + na
  'ca': '\uA9C0\uA9A0',    // pangkon + ca
  'ra': '\uA9C0\uA9A7',    // pangkon + ra
  'ka': '\uA9C0\uA99E',    // pangkon + ka
  'da': '\uA9C0\uA9A2',    // pangkon + da
  'ta': '\uA9C0\uA9A1',    // pangkon + ta
  'sa': '\uA9C0\uA9B1',    // pangkon + sa
  'wa': '\uA9C0\uA9B3',    // pangkon + wa
  'la': '\uA9C0\uA9A8',    // pangkon + la
  'pa': '\uA9C0\uA9A5',    // pangkon + pa
  'dha': '\uA9C0\uA9A3',   // pangkon + dha
  'ja': '\uA9C0\uA99F',    // pangkon + ja
  'ya': '\uA9C0\uA9AA',    // pangkon + ya
  'nya': '\uA9C0\uA99B',   // pangkon + nya
  'ma': '\uA9C0\uA9A9',    // pangkon + ma
  'ga': '\uA9C0\uA99C',    // pangkon + ga
  'ba': '\uA9C0\uA9A6',    // pangkon + ba
  'tha': '\uA9C0\uA9AC',   // pangkon + tha
  'nga': '\uA9C0\uA99D',   // pangkon + nga
};

// ═══════════════════════════════════════════════════════════════
// KONSONAN GABUNGAN (Combined Consonants)
// Urutan penting: cek yang lebih panjang terlebih dahulu
// ═══════════════════════════════════════════════════════════════
export const KONSONAN_GABUNGAN = ['ng', 'ny', 'th', 'dh', 'sy'];

// Mapping konsonan gabungan ke key aksara
export const KONSONAN_MAP = {
  'ng': 'nga',
  'ny': 'nya',
  'th': 'tha',
  'dh': 'dha',
  'sy': 'sa',   // tidak ada aksara khusus, gunakan sa
};

// ═══════════════════════════════════════════════════════════════
// VOKAL SET
// ═══════════════════════════════════════════════════════════════
export const VOWELS = new Set(['a', 'i', 'u', 'e', 'o', 'é', 'è']);

// ═══════════════════════════════════════════════════════════════
// TANDA BACA JAWA (Javanese Punctuation)
// ═══════════════════════════════════════════════════════════════
export const PADA = {
  'koma': '\uA9C7',   // ꦇ - pada pangkat (comma equivalent)
  'titik': '\uA9C8',  // ꦈ - pada lingsa (period equivalent)
};
