import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KustomByte - Web & Flutter UI Designer",
  description: "Portfolio de KustomByte - Développeur spécialisé en Flutter et développement web. Créateur d'expériences numériques modernes et interfaces utilisateur exceptionnelles.",
  keywords: ["Flutter", "Web Development", "UI Design", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "KustomByte" }],
  openGraph: {
    title: "KustomByte - Web & Flutter UI Designer",
    description: "Développeur spécialisé en Flutter et développement web",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KustomByte - Web & Flutter UI Designer",
    description: "Développeur spécialisé en Flutter et développement web",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Données structurées JSON-LD pour SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "KustomByte",
              "url": "https://kustombyte.com/",
              "image": "https://kustombyte.com/kustombyte.png",
              "jobTitle": "Web & Flutter UI Designer",
              "description": "Développeur spécialisé en Flutter et développement web. Créateur d'expériences numériques modernes et interfaces utilisateur exceptionnelles.",
              "sameAs": [
                "https://linktr.ee/KustomByte",
                "https://comeup.com/fr/profile/kustombyte"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip link pour l'accessibilité */}
        <a
          href="#main-content"
          className="skip-link absolute left-2 top-2 z-[1000] px-4 py-2 bg-primary text-black font-semibold rounded focus:outline-none focus:ring-4 focus:ring-primary transition-transform -translate-y-16 focus:translate-y-0 opacity-0 focus:opacity-100"
          tabIndex={0}
        >
          Aller au contenu principal
        </a>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
