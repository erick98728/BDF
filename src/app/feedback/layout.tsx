import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Canal oficial para enviar feedback do beta de Protótipo, incluindo progresso, notas, bugs e sugestões de melhoria.",
  alternates: { canonical: "/feedback" },
  openGraph: {
    title: "Feedback | Protótipo",
    description: "Canal oficial para enviar feedback do beta de Protótipo, incluindo progresso, notas, bugs e sugestões de melhoria.",
    url: "/feedback"
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback | Protótipo",
    description: "Canal oficial para enviar feedback do beta de Protótipo, incluindo progresso, notas, bugs e sugestões de melhoria."
  }
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
