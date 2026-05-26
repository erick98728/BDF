import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { devlogPosts } from "@/data/devlog";

export const metadata: Metadata = {
  title: "Devlog",
  description: "Acompanhe atualizações de desenvolvimento e progresso do projeto Tester.",
  alternates: { canonical: "/devlog" },
  openGraph: {
    title: "Devlog | Tester",
    description: "Acompanhe atualizações de desenvolvimento e progresso do projeto Tester.",
    url: "/devlog"
  },
  twitter: {
    card: "summary",
    title: "Devlog | Tester",
    description: "Acompanhe atualizações de desenvolvimento e progresso do projeto Tester."
  }
};

export default function DevlogPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader title="Devlog" description="Acompanhe a evolução de Tester, versão por versão." />

      <SectionContainer>
        <SectionTitle title="Atualizações recentes" subtitle="Posts iniciais da jornada de desenvolvimento de Tester." />
        <div className="grid gap-4 md:grid-cols-2">
          {devlogPosts.map((post) => (
            <GlowCard key={post.slug}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-200/25 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-cyan-100">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400">{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm text-slate-300">{post.summary}</p>
              <Link
                href={`/devlog/${post.slug}`}
                className="mt-5 inline-flex rounded-lg border border-purple-300/30 bg-purple-300/10 px-4 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-300/20"
              >
                Ler mais
              </Link>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
