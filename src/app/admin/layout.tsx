import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administração",
  description: "Painel administrativo privado para gerenciar usuários, permissões e conteúdo público de Tester.",
  alternates: { canonical: "/admin" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
