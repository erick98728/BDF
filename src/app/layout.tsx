import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundFog } from "@/components/BackgroundFog";
import { CursorAura } from "@/components/CursorAura";

const siteUrl = "https://bdf-auhi.vercel.app";
const siteDescription = "Site oficial de Tester, metroidvania 2D sombrio em desenvolvimento, com beta fechado, lore, personagens, devlog, galeria e feedback.";
const openGraphImage = "/opengraph-image";
const twitterImage = "/twitter-image";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050914",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tester",
  title: {
    default: "Tester | Site Oficial do Jogo Indie",
    template: "%s | Tester"
  },
  description: siteDescription,
  manifest: "/manifest.webmanifest",
  keywords: [
    "Tester",
    "jogo indie",
    "metroidvania",
    "metroidvania 2D",
    "jogo brasileiro",
    "beta tester",
    "devlog",
    "lore",
    "Bosque da Névoa Perdida"
  ],
  authors: [{ name: "Tester Studio" }],
  creator: "Tester Studio",
  publisher: "Tester Studio",
  category: "games",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: "Tester | Site Oficial do Jogo Indie",
    description: siteDescription,
    url: siteUrl,
    siteName: "Tester",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: "Preview oficial abstrato de Tester com névoa, runas e símbolo do jogo."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Tester | Site Oficial do Jogo Indie",
    description: siteDescription,
    images: [twitterImage]
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  },
  appleWebApp: {
    capable: true,
    title: "Tester",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="page-shell">
        <CursorAura />
        <BackgroundFog />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white">Pular para conteúdo</a>
        <Navbar />
        <main id="conteudo" className="mx-auto min-h-[70vh] max-w-6xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
