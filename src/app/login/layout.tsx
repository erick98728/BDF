import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse ou crie sua conta oficial de beta tester para acompanhar dashboard, download e feedback de Tester.",
  alternates: { canonical: "/login" },
  openGraph: {
    title: "Login | Tester",
    description: "Acesse ou crie sua conta oficial de beta tester para acompanhar dashboard, download e feedback de Tester.",
    url: "/login"
  },
  twitter: {
    card: "summary_large_image",
    title: "Login | Tester",
    description: "Acesse ou crie sua conta oficial de beta tester para acompanhar dashboard, download e feedback de Tester."
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
