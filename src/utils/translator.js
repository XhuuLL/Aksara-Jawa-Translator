/**
 * translator.js
 * 
 * Modul utama untuk menerjemahkan teks Latin ke Aksara Jawa (Hanacaraka).
 * Menggunakan aturan dasar transliterasi aksara Jawa.
 * 
 * Alur translasi:
 * 1. Teks di-lowercase-kan
 * 2. Diparse menjadi token (suku kata)
 * 3. Setiap suku kata dikonversi ke aksara Jawa
 * 4. Konsonan mati ditangani dengan pangkon/pasangan
 */

import {
  AKSARA,
  AKSARA_SWARA,
  SANDHANGAN,
  PANGKON,
  VOWELS,
  KONSONAN_GABUNGAN,
  KONSONAN_MAP,
} from './mapping';

// ═══════════════════════════════════════════════════════════════
// FUNGSI UTILITAS
// ═══════════════════════════════════════════════════════════════

/**
 * Cek apakah karakter adalah huruf alfabet
 * @param {string} char - Karakter yang dicek
 * @returns {boolean}
 */
function isAlpha(char) {
  return /^[a-zéè]$/i.test(char);
}

/**
 * Cek apakah karakter adalah vokal
 * @param {string} char - Karakter yang dicek
 * @returns {boolean}
 */
function isVowel(char) {
  return VOWELS.has(char.toLowerCase());
}

/**
 * Cek apakah karakter adalah konsonan
 * @param {string} char - Karakter yang dicek
 * @returns {boolean}
 */
function isConsonant(char) {
  return isAlpha(char) && !isVowel(char);
}

// ═══════════════════════════════════════════════════════════════
// TOKENIZER
// Memecah teks menjadi token-token yang bisa diproses
// ═══════════════════════════════════════════════════════════════

/**
 * Tokenize teks Latin menjadi array of syllable objects.
 * 
 * Setiap token berupa objek:
 *   { type: 'syllable', consonant: string, vowel: string }
 *   { type: 'space' }
 *   { type: 'other', value: string }
 * 
 * @param {string} text - Teks Latin input
 * @returns {Array<Object>} Array of token objects
 */
function tokenize(text) {
  const tokens = [];
  const str = text.toLowerCase();
  let i = 0;

  while (i < str.length) {
    const char = str[i];

    // Spasi → token spasi
    if (char === ' ') {
      tokens.push({ type: 'space' });
      i++;
      continue;
    }

    // Karakter non-alfabet → skip
    if (!isAlpha(char)) {
      tokens.push({ type: 'other', value: char });
      i++;
      continue;
    }

    // Vokal mandiri (tanpa konsonan sebelumnya)
    if (isVowel(char)) {
      tokens.push({ type: 'syllable', consonant: null, vowel: char });
      i++;
      continue;
    }

    // Konsonan: cek konsonan gabungan (ng, ny, th, dh, sy)
    let consonant = null;
    let consumed = 0;

    for (const combo of KONSONAN_GABUNGAN) {
      if (str.substring(i, i + combo.length) === combo) {
        // Untuk "ng", pastikan bukan "ny" yang lebih cocok
        // dan cek apakah bukan "ngg" (ng + g)
        if (combo === 'ng' && i + 2 < str.length) {
          const nextAfterNg = str[i + 2];
          // "ng" diikuti konsonan lain: tetap ng
          // "ng" diikuti vokal: tetap ng
          // "ngg": n + ga mati + ga (handled later)
          if (nextAfterNg === 'g') {
            // Ini "ngg" → pecah jadi "ng" + "g..."
            consonant = KONSONAN_MAP[combo];
            consumed = combo.length;
            break;
          }
        }
        consonant = KONSONAN_MAP[combo];
        consumed = combo.length;
        break;
      }
    }

    // Konsonan tunggal
    if (consonant === null) {
      const c = char;
      // Map konsonan tunggal ke key aksara
      const singleMap = {
        'h': 'ha', 'n': 'na', 'c': 'ca', 'r': 'ra', 'k': 'ka',
        'd': 'da', 't': 'ta', 's': 'sa', 'w': 'wa', 'l': 'la',
        'p': 'pa', 'j': 'ja', 'y': 'ya', 'm': 'ma', 'g': 'ga',
        'b': 'ba', 'f': 'fa', 'v': 'va', 'z': 'za', 'q': 'ka',
        'x': 'ka',
      };
      consonant = singleMap[c] || null;
      consumed = 1;
    }

    if (consonant === null) {
      tokens.push({ type: 'other', value: char });
      i++;
      continue;
    }

    i += consumed;

    // Cek apakah diikuti vokal
    if (i < str.length && isVowel(str[i])) {
      tokens.push({ type: 'syllable', consonant, vowel: str[i] });
      i++;
    } else {
      // Konsonan tanpa vokal (konsonan mati)
      tokens.push({ type: 'syllable', consonant, vowel: null });
    }
  }

  return tokens;
}

// ═══════════════════════════════════════════════════════════════
// KONVERTER AKSARA
// Mengubah token menjadi karakter aksara Jawa
// ═══════════════════════════════════════════════════════════════

/**
 * Dapatkan karakter aksara Jawa untuk sebuah konsonan
 * @param {string} consonantKey - Key konsonan (misal: 'ka', 'nga')
 * @returns {string} Karakter aksara Jawa
 */
function getAksara(consonantKey) {
  return AKSARA[consonantKey] || '';
}

/**
 * Dapatkan sandhangan (tanda vokal) untuk vokal tertentu
 * @param {string} vowel - Karakter vokal ('i', 'u', 'e', 'o')
 * @returns {string} Karakter sandhangan, atau '' jika vokal 'a'
 */
function getSandhangan(vowel) {
  if (!vowel || vowel === 'a') return ''; // 'a' adalah vokal default
  return SANDHANGAN[vowel] || '';
}

/**
 * Konversi array token menjadi string aksara Jawa.
 * 
 * Aturan konversi:
 * - Vokal mandiri → aksara swara
 * - Konsonan + vokal → aksara dasar + sandhangan
 * - Konsonan mati di akhir kata → aksara + pangkon
 * - Konsonan mati + konsonan lain → aksara + pangkon + aksara berikutnya
 * 
 * @param {Array<Object>} tokens - Array of token objects
 * @returns {string} String aksara Jawa
 */
function convertTokens(tokens) {
  let result = '';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'space') {
      result += ' ';
      continue;
    }

    if (token.type === 'other') {
      // Tetap masukkan karakter lain (angka, tanda baca)
      result += token.value;
      continue;
    }

    // type === 'syllable'
    const { consonant, vowel } = token;

    // Vokal mandiri (tanpa konsonan)
    if (consonant === null) {
      if (vowel && AKSARA_SWARA[vowel]) {
        result += AKSARA_SWARA[vowel];
      }
      continue;
    }

    // Konsonan + vokal
    if (vowel !== null) {
      result += getAksara(consonant) + getSandhangan(vowel);
      continue;
    }

    // Konsonan mati (tanpa vokal)
    // Cek apakah ini diikuti suku kata lain (untuk pasangan)
    const nextToken = tokens[i + 1];

    if (nextToken && nextToken.type === 'syllable' && nextToken.consonant !== null) {
      // Konsonan mati diikuti suku kata lain → gunakan aksara + pangkon
      result += getAksara(consonant) + PANGKON;
    } else {
      // Konsonan mati di akhir kata atau sebelum spasi → aksara + pangkon
      result += getAksara(consonant) + PANGKON;
    }
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════
// FUNGSI UTAMA
// ═══════════════════════════════════════════════════════════════

/**
 * Terjemahkan teks Latin ke Aksara Jawa (Hanacaraka).
 * 
 * @param {string} text - Teks Latin yang akan diterjemahkan
 * @returns {string} Teks dalam aksara Jawa (Unicode)
 * 
 * @example
 * translateLatinToJawa('kita makan')
 * // Returns aksara Jawa untuk "kita makan"
 * 
 * @example
 * translateLatinToJawa('ngopi')
 * // Returns aksara Jawa untuk "ngopi"
 */
export function translateLatinToJawa(text) {
  if (!text || typeof text !== 'string') return '';
  
  // Hapus whitespace berlebihan
  const cleaned = text.trim().replace(/\s+/g, ' ');
  
  if (cleaned.length === 0) return '';

  // Tokenize → Convert
  const tokens = tokenize(cleaned);
  return convertTokens(tokens);
}

/**
 * Validasi apakah input mengandung karakter yang bisa diterjemahkan
 * @param {string} text - Teks input
 * @returns {boolean} True jika ada karakter valid
 */
export function hasValidInput(text) {
  if (!text || typeof text !== 'string') return false;
  return /[a-zA-Z]/.test(text);
}
