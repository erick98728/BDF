import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import "./dock-menu.css";
import "./effects.css";
import "./motion-system.css";
import "./motion-refinements.css";
import "./motion-optimization.css";
import "./motion-touch-optimization.css";
import "./design-system.css";
import { fontVariables } from "./fonts";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundFog } from "@/components/BackgroundFog";
import { CursorAura } from "@/components/CursorAura";
import { ImpactEffects } from "@/components/ImpactEffects";
import { RouteTransition } from "@/components/RouteTransition";
import { ScrollTimelineEffects } from "@/components/ScrollTimeline";

const siteUrl = "https://bdf-auhi.vercel.app";
const siteDescription = "Site oficial de Protótipo, metroidvania 2D sombrio em desenvolvimento, com beta fechado, lore, personagens, devlog, galeria e feedback.";
const openGraphImage = "/opengraph-image";
const twitterImage = "/twitter-image";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0b0b",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Protótipo",
  title: {
    default: "Protótipo | Site Oficial do Jogo Indie",
    template: "%s | Protótipo"
  },
  description: siteDescription,
  manifest: "/manifest.webmanifest",
  keywords: [
    "Protótipo",
    "jogo indie",
    "metroidvania",
    "metroidvania 2D",
    "jogo brasileiro",
    "testador beta",
    "devlog",
    "lore",
    "Bosque da Névoa Perdida"
  ],
  authors: [{ name: "Protótipo Studio" }],
  creator: "Protótipo Studio",
  publisher: "Protótipo Studio",
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
    title: "Protótipo | Site Oficial do Jogo Indie",
    description: siteDescription,
    url: siteUrl,
    siteName: "Protótipo",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: openGraphImage,
        width: 1200,
        height: 630,
        alt: "Preview oficial abstrato de Protótipo com névoa, runas e símbolo do jogo."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Protótipo | Site Oficial do Jogo Indie",
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
    title: "Protótipo",
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="page-shell">
        <ImpactEffects />
        <ScrollTimelineEffects />
        <CursorAura />
        <BackgroundFog />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white">Pular para conteúdo</a>
        <Navbar />
        <main id="conteudo" className="site-main">
          <Suspense
            fallback={
              <div className="route-transition-shell">
                <div className="route-transition-page">{children}</div>
              </div>
            }
          >
            <RouteTransition>{children}</RouteTransition>
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
