import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

// We will dynamically import pdfjs-dist inside the function to avoid Next.js SSR errors with DOMMatrix

/**
 * Parse file content to text
 * @param {File} file 
 * @param {Function} onProgress Optional callback for progress (e.g., OCR)
 * @returns {Promise<string>}
 */
export async function parseFileToText(file, onProgress) {
  const type = file.type;
  const name = file.name.toLowerCase();

  try {
    // 1. Text File
    if (type === 'text/plain' || name.endsWith('.txt')) {
      return await file.text();
    }

    // 2. Word Document (DOCX)
    if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || name.endsWith('.docx')) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }

    // 3. PDF Document
    if (type === 'application/pdf' || name.endsWith('.pdf')) {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
      }
      return fullText;
    }

    // 4. Image (OCR using Tesseract)
    if (type.startsWith('image/')) {
      if (onProgress) onProgress(0);
      const worker = await Tesseract.createWorker({
        logger: m => {
          if (m.status === 'recognizing text' && onProgress) {
            onProgress(m.progress);
          }
        }
      });
      await worker.loadLanguage('eng+ind');
      await worker.initialize('eng+ind');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      return text;
    }

    throw new Error('Format file tidak didukung.');
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error('Gagal membaca file: ' + error.message);
  }
}
