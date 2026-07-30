import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Painel privado do jogador para acompanhar acesso ao beta, download, checklist e feedback de Protótipo.",
  alternates: { canonical: "/dashboard" },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },
  openGraph: {
    title: "Dashboard | Protótipo",
    description: "Painel privado do jogador para acompanhar acesso ao beta, download, checklist e feedback de Protótipo.",
    url: "/dashboard"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | Protótipo",
    description: "Painel privado do jogador para acompanhar acesso ao beta, download, checklist e feedback de Protótipo."
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
