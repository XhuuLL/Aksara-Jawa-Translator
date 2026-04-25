import Link from 'next/link';
import { BookOpen, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/Materi/Sidebar';
import Section from '@/components/Materi/Section';
import AksaraGrid from '@/components/Materi/AksaraGrid';
import CopyButton from '@/components/Materi/CopyButton';

export const metadata = {
  title: 'Materi Aksara Jawa Lengkap | Hanacaraka',
  description: 'Pusat pembelajaran Aksara Jawa (Hanacaraka) yang lengkap, terstruktur, dan modern. Belajar Carakan, Pasangan, Sandhangan, dan Angka Jawa.',
};

const CARAKAN_DATA = [
  { latin: 'ha', jawa: 'ꦲ' }, { latin: 'na', jawa: 'ꦤ' }, { latin: 'ca', jawa: 'ꦕ' }, { latin: 'ra', jawa: 'ꦫ' }, { latin: 'ka', jawa: 'ꦏ' },
  { latin: 'da', jawa: 'ꦢ' }, { latin: 'ta', jawa: 'ꦠ' }, { latin: 'sa', jawa: 'ꦱ' }, { latin: 'wa', jawa: 'ꦮ' }, { latin: 'la', jawa: 'ꦭ' },
  { latin: 'pa', jawa: 'ꦥ' }, { latin: 'dha', jawa: 'ꦣ' }, { latin: 'ja', jawa: 'ꦗ' }, { latin: 'ya', jawa: 'ꦪ' }, { latin: 'nya', jawa: 'ꦚ' },
  { latin: 'ma', jawa: 'ꦩ' }, { latin: 'ga', jawa: 'ꦒ' }, { latin: 'ba', jawa: 'ꦧ' }, { latin: 'tha', jawa: 'ꦛ' }, { latin: 'nga', jawa: 'ꦔ' },
];

const PASANGAN_DATA = [
  { latin: 'ha', jawa: '꧀ꦲ' }, { latin: 'na', jawa: '꧀ꦤ' }, { latin: 'ca', jawa: '꧀ꦕ' }, { latin: 'ra', jawa: '꧀ꦫ' }, { latin: 'ka', jawa: '꧀ꦏ' },
  { latin: 'da', jawa: '꧀ꦢ' }, { latin: 'ta', jawa: '꧀ꦠ' }, { latin: 'sa', jawa: '꧀ꦱ' }, { latin: 'wa', jawa: '꧀ꦮ' }, { latin: 'la', jawa: '꧀ꦭ' },
  { latin: 'pa', jawa: '꧀ꦥ' }, { latin: 'dha', jawa: '꧀ꦣ' }, { latin: 'ja', jawa: '꧀ꦗ' }, { latin: 'ya', jawa: '꧀ꦪ' }, { latin: 'nya', jawa: '꧀ꦚ' },
  { latin: 'ma', jawa: '꧀ꦩ' }, { latin: 'ga', jawa: '꧀ꦒ' }, { latin: 'ba', jawa: '꧀ꦧ' }, { latin: 'tha', jawa: '꧀ꦛ' }, { latin: 'nga', jawa: '꧀ꦔ' },
];

const SANDHANGAN_VOKAL = [
  { nama: 'Wulu', latin: 'i', simbol: 'ꦶ', keterangan: 'Di atas aksara' },
  { nama: 'Suku', latin: 'u', simbol: 'ꦸ', keterangan: 'Di bawah aksara' },
  { nama: 'Taling', latin: 'é / è', simbol: 'ꦺ', keterangan: 'Di depan aksara' },
  { nama: 'Taling Tarung', latin: 'o', simbol: 'ꦺꦴ', keterangan: 'Mengapit aksara' },
  { nama: 'Pepet', latin: 'e', simbol: 'ꦼ', keterangan: 'Di atas aksara' },
];

const ANGKA_JAWA = [
  { latin: '1', jawa: '꧑' }, { latin: '2', jawa: '꧒' }, { latin: '3', jawa: '꧓' }, { latin: '4', jawa: '꧔' }, { latin: '5', jawa: '꧕' },
  { latin: '6', jawa: '꧖' }, { latin: '7', jawa: '꧗' }, { latin: '8', jawa: '꧘' }, { latin: '9', jawa: '꧙' }, { latin: '0', jawa: '꧐' }
];

const SECTIONS = [
  { id: 'pengertian', title: 'Pengertian' },
  { id: 'sejarah', title: 'Sejarah Singkat' },
  { id: 'jenis-aksara', title: 'Jenis-Jenis Aksara' },
  { id: 'aksara-carakan', title: 'Aksara Carakan' },
  { id: 'sandhangan', title: 'Sandhangan' },
  { id: 'pasangan', title: 'Pasangan' },
  { id: 'angka-jawa', title: 'Angka Jawa' },
  { id: 'contoh-penulisan', title: 'Contoh Penulisan' }
];

export default function MateriPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 selection:bg-amber-500/30">
      {/* ══════════════════════════ HERO SECTION ══════════════════════════ */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b border-zinc-200/50 dark:border-white/[0.05] bg-white dark:bg-[#09090b]">
        {/* Subtle Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] to-transparent dark:from-amber-500/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-amber-400/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-yellow-400/10 dark:bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 flex flex-col items-center text-center">
          <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-10 self-center">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            <span>Kembali ke Translator</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8
            bg-amber-50 dark:bg-amber-500/10 
            border border-amber-200/50 dark:border-amber-500/20
            text-amber-700 dark:text-amber-400 text-xs font-semibold tracking-widest uppercase shadow-sm">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Pusat Edukasi</span>
          </div>

          <div className="relative">
            <div className="absolute -inset-x-8 -inset-y-8 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent blur-2xl rounded-full opacity-0 md:opacity-100 pointer-events-none" />
            <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05] max-w-4xl mx-auto">
              Aksara Jawa <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-300 drop-shadow-sm">
                (Hanacaraka)
              </span>
            </h1>
          </div>

          <p className="mt-8 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mx-auto">
            Sistem tulisan tradisional Jawa yang kaya akan sejarah dan filosofi. Pelajari dasar-dasar penulisan, sandhangan, hingga pasangan dengan antarmuka modern.
          </p>
        </div>
      </section>

      {/* ══════════════════════════ MAIN CONTENT ══════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        <Sidebar sections={SECTIONS} />

        <main className="flex-1 w-full min-w-0 max-w-[800px] xl:max-w-[880px]">
          
          <Section id="pengertian" title="Pengertian Aksara Jawa">
            <p>
              <strong>Aksara Jawa</strong>, dikenal juga sebagai <em>Hanacaraka</em> atau <em>Carakan</em>, adalah sistem tulisan abugida yang digunakan untuk menulis bahasa Jawa, serta beberapa bahasa daerah lain seperti bahasa Sunda dan bahasa Sasak.
            </p>
            <p>
              Aksara ini merupakan turunan dari aksara Brahmi melalui aksara Kawi yang pernah digunakan secara luas di Nusantara. Dalam aksara Jawa, setiap huruf dasar merepresentasikan sebuah suku kata dengan vokal inheren /a/ atau /ɔ/ (bergantung pada dialek), yang dapat diubah dengan menggunakan tanda diakritik yang disebut <em>Sandhangan</em>.
            </p>
          </Section>

          <Section id="sejarah" title="Sejarah Singkat">
            <p>Evolusi aksara Jawa melalui rentang sejarah yang panjang, berawal dari pengaruh India hingga menjadi bentuk yang kita kenal sekarang.</p>
            
            <div className="mt-10 space-y-8 relative before:absolute before:inset-y-2 before:left-5 before:w-px before:bg-gradient-to-b before:from-amber-500/20 before:via-amber-500/50 before:to-amber-500/20">
              <div className="relative flex items-start group">
                <div className="absolute left-5 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-[3px] border-[#fafafa] dark:border-[#09090b] bg-amber-500 text-white shadow-sm ring-1 ring-zinc-200 dark:ring-white/10 group-hover:scale-110 group-hover:shadow-amber-500/20 transition-all duration-300 z-10 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="pl-12 w-full">
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/[0.05] shadow-sm hover:shadow-md hover:border-amber-200 dark:hover:border-amber-500/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Abad ke-4 M</span>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Aksara Brahmi & Pallawa</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">Masuknya pengaruh aksara dari India Selatan yang menjadi cikal bakal aksara di Nusantara.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative flex items-start group">
                <div className="absolute left-5 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-[3px] border-[#fafafa] dark:border-[#09090b] bg-amber-500 text-white shadow-sm ring-1 ring-zinc-200 dark:ring-white/10 group-hover:scale-110 group-hover:shadow-amber-500/20 transition-all duration-300 z-10 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="pl-12 w-full">
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/[0.05] shadow-sm hover:shadow-md hover:border-amber-200 dark:hover:border-amber-500/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Abad ke-8 M</span>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Aksara Kawi</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">Berkembang pada masa Kerajaan Mataram Kuno, digunakan pada banyak prasasti batu dan lempeng tembaga.</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start group">
                <div className="absolute left-5 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-[3px] border-[#fafafa] dark:border-[#09090b] bg-amber-500 text-white shadow-sm ring-1 ring-zinc-200 dark:ring-white/10 group-hover:scale-110 group-hover:shadow-amber-500/20 transition-all duration-300 z-10 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="pl-12 w-full">
                  <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/[0.05] shadow-sm hover:shadow-md hover:border-amber-200 dark:hover:border-amber-500/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Abad ke-15 M</span>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Aksara Jawa Modern</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">Mulai mengambil bentuk yang melengkung dan khas seperti yang digunakan pada sastra keraton Mataram Islam.</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="jenis-aksara" title="Jenis-Jenis Aksara">
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {[
                { title: 'Aksara Carakan', desc: 'Aksara dasar yang terdiri dari 20 huruf (ha-na-ca-ra-ka...). Digunakan untuk penulisan kata-kata bahasa Jawa pada umumnya.' },
                { title: 'Aksara Murda', desc: 'Berfungsi seperti huruf kapital. Biasanya digunakan untuk menuliskan nama orang penting, gelar, atau nama tempat.' },
                { title: 'Aksara Swara', desc: 'Aksara vokal mandiri (A, I, U, E, O). Digunakan untuk menulis kata serapan dari bahasa asing agar pelafalannya jelas.' },
                { title: 'Aksara Rekan', desc: 'Aksara tambahan (rekaan) yang dibuat untuk menuliskan konsonan serapan dari bahasa Arab atau asing (seperti f, kh, dz).' }
              ].map((item, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-white/[0.05] shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-none dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all duration-500"></div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-3 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="aksara-carakan" title="Aksara Carakan (Dasar)">
            <p>Terdiri dari 20 aksara dasar yang membentuk urutan abjad Jawa. <em>Klik pada karakter untuk menyalin.</em></p>
            <div className="mt-8">
              <AksaraGrid data={CARAKAN_DATA} columns={5} />
            </div>
            
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-amber-50/80 dark:bg-amber-500/5 border border-amber-200/60 dark:border-amber-500/20 text-zinc-700 dark:text-zinc-300 text-base shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                <BookOpen className="w-32 h-32 text-amber-900 dark:text-amber-500" />
              </div>
              <div className="relative z-10">
                <strong className="flex items-center gap-2 mb-3 text-lg font-extrabold text-amber-900 dark:text-amber-400">
                  <Sparkles className="w-5 h-5" /> Filosofi Hanacaraka
                </strong>
                <p className="mb-4 leading-relaxed">Urutan abjad ini membentuk sebuah puisi (pangkur) yang menceritakan mitos Aji Saka dan dua utusannya (Dora dan Sembada):</p>
                <ul className="space-y-3 font-medium">
                  <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">•</span><span><strong className="text-zinc-900 dark:text-zinc-100">Ha-Na-Ca-Ra-Ka:</strong> Ada sebuah utusan.</span></li>
                  <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">•</span><span><strong className="text-zinc-900 dark:text-zinc-100">Da-Ta-Sa-Wa-La:</strong> Mereka saling bertengkar/berselisih.</span></li>
                  <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">•</span><span><strong className="text-zinc-900 dark:text-zinc-100">Pa-Dha-Ja-Ya-Nya:</strong> Mereka sama-sama sakti.</span></li>
                  <li className="flex items-start gap-3"><span className="text-amber-500 mt-1">•</span><span><strong className="text-zinc-900 dark:text-zinc-100">Ma-Ga-Ba-Tha-Nga:</strong> Inilah mayat-mayat mereka (sama-sama mati).</span></li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="sandhangan" title="Sandhangan (Vokal & Tanda Baca)">
            <p>Aksara dasar selalu berbunyi "a". Untuk mengubah bunyi vokalnya menjadi i, u, e, atau o, digunakan tanda baca yang disebut <em>Sandhangan Vokal</em> (Sandhangan Swara).</p>
            <div className="mt-8">
              <AksaraGrid data={SANDHANGAN_VOKAL} columns={5} />
            </div>
            <div className="mt-6 p-5 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-white/[0.05]">
              <p>Selain vokal, ada juga sandhangan panyigeg wanda (penutup suku kata) seperti <strong className="text-zinc-900 dark:text-white">Cecak</strong> (ꦁ) untuk -ng, <strong className="text-zinc-900 dark:text-white">Layar</strong> (ꦂ) untuk -r, dan <strong className="text-zinc-900 dark:text-white">Wignyan</strong> (ꦃ) untuk -h.</p>
            </div>
          </Section>

          <Section id="pasangan" title="Pasangan">
            <p>Dalam tulisan Jawa, spasi antar kata tidak digunakan (<em>scriptio continua</em>). Untuk "mematikan" (menghilangkan vokal dasar) aksara sebelumnya agar menjadi konsonan mati di tengah kalimat, digunakan <strong>Pasangan</strong>.</p>
            <p>Setiap dari 20 aksara Carakan memiliki bentuk Pasangannya masing-masing. Pasangan biasanya ditulis di bawah atau di samping aksara yang "dimatikan".</p>
            <div className="mt-8">
              <AksaraGrid data={PASANGAN_DATA} columns={5} />
            </div>
          </Section>

          <Section id="angka-jawa" title="Angka Jawa">
            <p>Angka Jawa memiliki bentuk yang menyerupai beberapa aksara dasar. Oleh karena itu, dalam penulisannya, angka Jawa wajib diapit oleh tanda <strong>Pada Pangkat</strong> (꧇...꧇) agar tidak membingungkan pembaca.</p>
            <div className="mt-8">
              <AksaraGrid data={ANGKA_JAWA} columns={5} />
            </div>
          </Section>

          <Section id="contoh-penulisan" title="Contoh Penulisan">
            <p>Berikut adalah beberapa contoh kata dan kalimat yang ditulis menggunakan Aksara Jawa beserta penerapannya.</p>
            
            <div className="mt-8 grid gap-4">
              {[
                { latin: "Bapak", jawa: "ꦧꦥꦏ꧀" },
                { latin: "Mangan", jawa: "ꦩꦔꦤ꧀" },
                { latin: "Aku sinau basa Jawa", jawa: "ꦲꦏꦸꦱꦶꦤꦲꦸꦧꦱꦗꦮ" },
                { latin: "Sugeng rawuh", jawa: "ꦱꦸꦒꦼꦁꦫꦮꦸꦃ" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-white/[0.05] shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:shadow-none hover:shadow-md hover:border-amber-200 dark:hover:border-amber-500/30 group transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 overflow-hidden w-full">
                    <div className="flex items-center gap-4 w-full sm:w-48 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 shrink-0">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">{item.latin}</span>
                    </div>
                    <div className="flex items-center gap-4 sm:border-l border-zinc-100 dark:border-zinc-800 sm:pl-8">
                      <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 shrink-0 hidden sm:block" />
                      <span className="font-javanese text-3xl sm:text-4xl text-amber-600 dark:text-amber-400 truncate pt-1">{item.jawa}</span>
                    </div>
                  </div>
                  <CopyButton text={item.jawa} label="Salin" className="ml-4 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100" />
                </div>
              ))}
            </div>
          </Section>

        </main>
      </div>
    </div>
  );
}
