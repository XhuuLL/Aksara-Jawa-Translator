import Translator from "@/components/Translator";

/**
 * Halaman utama aplikasi Aksara Jawa Translator.
 */
export default function Home() {
  return (
    <main className="flex-1 flex items-start justify-center pt-10 md:pt-16 pb-8">
      <Translator />
    </main>
  );
}
