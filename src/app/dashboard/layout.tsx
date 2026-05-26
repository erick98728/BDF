import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Painel do jogador para acompanhar acesso ao beta, download, checklist e feedback de Tester.",
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Dashboard | Tester",
    description: "Painel do jogador para acompanhar acesso ao beta, download, checklist e feedback de Tester.",
    url: "/dashboard"
  },
  twitter: {
    card: "summary",
    title: "Dashboard | Tester",
    description: "Painel do jogador para acompanhar acesso ao beta, download, checklist e feedback de Tester."
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
