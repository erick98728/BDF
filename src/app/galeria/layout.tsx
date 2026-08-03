import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Vitrine visual de Protótipo com previews abstratos de screenshots, conceitos, personagens, cenários e vídeos em desenvolvimento.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galeria | Protótipo",
    description: "Vitrine visual de Protótipo com previews abstratos de screenshots, conceitos, personagens, cenários e vídeos em desenvolvimento.",
    url: "/galeria"
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeria | Protótipo",
    description: "Vitrine visual de Protótipo com previews abstratos de screenshots, conceitos, personagens, cenários e vídeos em desenvolvimento."
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
