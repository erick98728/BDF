import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundFog } from "@/components/BackgroundFog";

const siteUrl = "https://bdf-auhi.vercel.app";
const siteDescription = "Site oficial de Tester, metroidvania 2D sombrio em desenvolvimento, com beta, lore, personagens, devlog e feedback.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Tester",
  title: {
    default: "Tester | Site Oficial",
    template: "%s | Tester"
  },
  description: siteDescription,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Tester | Site Oficial",
    description: siteDescription,
    url: siteUrl,
    siteName: "Tester",
    type: "website",
    locale: "pt_BR"
  },
  twitter: {
    card: "summary",
    title: "Tester | Site Oficial",
    description: siteDescription
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="page-shell">
        <BackgroundFog />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white">Pular para conteúdo</a>
        <Navbar />
        <main id="conteudo" className="mx-auto min-h-[70vh] max-w-6xl px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
