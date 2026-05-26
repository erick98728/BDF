import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria de Tester com screenshots, conceitos, personagens, cenários e registros visuais do desenvolvimento.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galeria | Tester",
    description: "Galeria de Tester com screenshots, conceitos, personagens, cenários e registros visuais do desenvolvimento.",
    url: "/galeria"
  },
  twitter: {
    card: "summary",
    title: "Galeria | Tester",
    description: "Galeria de Tester com screenshots, conceitos, personagens, cenários e registros visuais do desenvolvimento."
  }
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
