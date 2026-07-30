import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse ou crie sua conta oficial de testador beta para acompanhar dashboard, download e feedback de Protótipo.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Login | Protótipo",
    description: "Acesse ou crie sua conta oficial de testador beta para acompanhar dashboard, download e feedback de Protótipo.",
    url: "/login"
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Protótipo",
    description: "Acesse ou crie sua conta oficial de testador beta para acompanhar dashboard, download e feedback de Protótipo."
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
