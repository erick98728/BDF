import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundFog } from "@/components/BackgroundFog";

export const metadata: Metadata = {
  metadataBase: new URL("https://tester-game.vercel.app"),
  title: {
    default: "Tester | Site Oficial",
    template: "%s | Tester"
  },
  description: "Site oficial de Tester, metroidvania 2D sombrio em desenvolvimento.",
  openGraph: {
    title: "Tester | Site Oficial",
    description: "Acompanhe o desenvolvimento, lore, devlog e acesso ao beta de Tester.",
    type: "website",
    locale: "pt_BR"
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
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-black focus:px-3 focus:py-2 focus:text-white">Pular para conteúdo</a>
        <Navbar />
        <main id="conteudo" className="mx-auto max-w-6xl px-4 pb-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
