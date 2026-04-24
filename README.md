# 🈶 Aksara Jawa Translator

### Latin ↔ Aksara Jawa (Hanacaraka) Web App

Aplikasi web modern untuk menerjemahkan teks **Latin ke Aksara Jawa** dan sebaliknya secara real-time.
Dilengkapi dengan fitur input canggih seperti **kamera, upload gambar, dan file (PDF, DOCX, TXT)**.

---

## ✨ Demo Preview

> Aplikasi ini dirancang dengan UI modern seperti SaaS (inspirasi: Google Translate, Notion, ChatGPT)

---

## 🚀 Fitur Utama

### 🔄 Translasi Dua Arah

* Latin → Aksara Jawa
* Aksara Jawa → Latin

### ⚡ Real-Time Translation

* Hasil langsung muncul saat mengetik
* Tanpa reload halaman

---

### ⌨️ Keyboard Aksara Jawa

* Virtual keyboard lengkap
* Memudahkan input aksara tanpa install font tambahan

---

### 📸 Input Multi-Source (Fitur Unggulan)

#### 1. Kamera (Live Capture)

* Ambil foto langsung dari kamera
* Cocok untuk scan teks

#### 2. Upload Gambar

* Format: JPG, PNG, WEBP
* Preview langsung di UI

#### 3. Upload File

* 📄 PDF
* 📝 DOCX
* 📃 TXT

---

### 🧠 Parsing File Otomatis

* TXT → langsung dibaca
* PDF → menggunakan `pdf.js`
* DOCX → menggunakan `mammoth.js`

---

### 🎨 UI/UX Modern

* Dark / Light Mode
* Glassmorphism Design
* Responsive (Mobile Friendly)
* Smooth Animation

---

### 📋 Fitur Tambahan

* Copy hasil ke clipboard
* Download hasil
* Drag & Drop file
* Error handling input

---

## 🛠️ Tech Stack

### Frontend

* **Next.js (App Router)**
* **React.js**
* **Tailwind CSS**

### Library Tambahan

* `pdfjs-dist` → parsing PDF
* `mammoth` → parsing DOCX

---

## 📦 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/XhuuLL/Aksara-Jawa-Translator.git
cd aksara-jawa-translator
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Install Library Tambahan

```bash
npm install pdfjs-dist mammoth
```

---

### 4. Jalankan Project

```bash
npm run dev
```

Buka di browser:

```
http://localhost:3000
```

---

## 📁 Struktur Project

```
/src
 ├── app/
 │   └── page.js
 ├── components/
 │   ├── Translator.jsx
 │   ├── JavaneseKeyboard.jsx
 │   ├── CameraCapture.jsx
 │   ├── FileUpload.jsx
 │
 ├── utils/
 │   ├── translator.js
 │   ├── mapping.js
```

---

## 🧠 Cara Kerja Translasi

### Latin → Aksara Jawa

1. Input dipecah menjadi suku kata
2. Mapping ke aksara dasar
3. Tambahkan:

   * sandhangan (vokal)
   * pasangan (konsonan mati)
4. Output berupa Unicode aksara Jawa

---

### Aksara Jawa → Latin

1. Membaca unicode karakter
2. Deteksi:

   * aksara dasar
   * sandhangan
   * pasangan
3. Konversi kembali ke huruf Latin

---

## 📸 Fitur Kamera

Menggunakan:

```js
navigator.mediaDevices.getUserMedia()
```

### Catatan:

* Hanya berjalan di:

  * `localhost`
  * HTTPS (production)

---

## 📄 Parsing File

### PDF

Menggunakan:

```bash
pdfjs-dist
```

### DOCX

Menggunakan:

```bash
mammoth
```

---

## ⚠️ Limitasi

* Translasi belum 100% sempurna (rule-based)
* OCR (scan teks dari gambar) belum tersedia
* Parsing PDF tergantung struktur file

---

## 🔮 Roadmap

* [ ] OCR Aksara Jawa (scan dari gambar)
* [ ] AI-based translation (lebih akurat)
* [ ] Speech to Text
* [ ] Export ke gambar
* [ ] PWA (install sebagai app)

---

## 🤝 Kontribusi

Kontribusi sangat terbuka!

1. Fork repo
2. Buat branch baru
3. Commit perubahan
4. Submit Pull Request

---

## 📄 License

MIT License

---

## ❤️ Credits

Dibuat untuk melestarikan budaya Jawa

---
