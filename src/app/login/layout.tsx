import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Entre ou crie sua conta para acessar o dashboard do beta de Tester quando a autenticação estiver ativa.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Login | Tester",
    description: "Entre ou crie sua conta para acessar o dashboard do beta de Tester quando a autenticação estiver ativa.",
    url: "/login"
  },
  twitter: {
    card: "summary",
    title: "Login | Tester",
    description: "Entre ou crie sua conta para acessar o dashboard do beta de Tester quando a autenticação estiver ativa."
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
