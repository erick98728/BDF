import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback",
  description: "Envie sua experiência com o beta de Tester, incluindo progresso, notas e sugestões de melhoria.",
  alternates: { canonical: "/feedback" },
  openGraph: {
    title: "Feedback | Tester",
    description: "Envie sua experiência com o beta de Tester, incluindo progresso, notas e sugestões de melhoria.",
    url: "/feedback"
  },
  twitter: {
    card: "summary",
    title: "Feedback | Tester",
    description: "Envie sua experiência com o beta de Tester, incluindo progresso, notas e sugestões de melhoria."
  }
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
