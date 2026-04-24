import { Geist, Noto_Sans_Javanese } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansJavanese = Noto_Sans_Javanese({
  variable: "--font-javanese",
  subsets: ["javanese"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Aksara Jawa — Penerjemah Latin ke Hanacaraka",
  description:
    "Konversi teks Latin ke Aksara Jawa (Hanacaraka) secara real-time. Aplikasi web modern untuk pelestarian budaya Jawa.",
  keywords: ["aksara jawa", "hanacaraka", "penerjemah", "translator", "javanese script"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${notoSansJavanese.variable} h-full antialiased`}
    >
      <head>
        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('aksara-jawa-theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
