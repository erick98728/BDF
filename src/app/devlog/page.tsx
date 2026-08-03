import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { devlogPosts } from "@/data/devlog";

const categoryGlyphs: Record<string, GameGlyphName> = {
  Mundo: "fog",
  Gameplay: "dash",
  Combate: "katana",
  Produção: "build",
};

export const metadata: Metadata = {
  title: "Devlog",
  description:
    "Acompanhe atualizações oficiais de desenvolvimento, progresso técnico, gameplay e decisões de produção do jogo indie Protótipo.",
  alternates: { canonical: "/devlog" },
  openGraph: {
    title: "Devlog | Protótipo",
    description:
      "Acompanhe atualizações oficiais de desenvolvimento, progresso técnico, gameplay e decisões de produção do jogo indie Protótipo.",
    url: "/devlog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devlog | Protótipo",
    description:
      "Acompanhe atualizações oficiais de desenvolvimento, progresso técnico, gameplay e decisões de produção do jogo indie Protótipo.",
  },
};

export default function DevlogPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Devlog"
        description="Acompanhe a evolução de Protótipo, versão por versão."
      />

      <SectionContainer>
        <SectionTitle
          title="Atualizações recentes"
          subtitle="Posts iniciais da jornada de desenvolvimento de Protótipo."
        />
        <ol className="devlog-ledger">
          {devlogPosts.map((post, index) => {
            const icon = categoryGlyphs[post.category] ?? "lore";
            return (
              <li key={post.slug}>
                <span className="devlog-ledger__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <article>
                  <div className="devlog-ledger__meta">
                    <span>{post.category}</span>
                    <time>{post.date}</time>
                  </div>
                  <h2>{post.title}</h2>
                  <p className="devlog-ledger__summary">{post.summary}</p>
                  <div className="devlog-ledger__facts">
                    <span>{post.content.length} seções completas</span>
                    <span>{post.progress.length} avanços registrados</span>
                  </div>
                  <Link
                    href={`/devlog/${post.slug}`}
                    className="devlog-ledger__link"
                  >
                    Ler mais
                  </Link>
                </article>
                <GameGlyph
                  name={icon}
                  variant="plain"
                  className="devlog-ledger__glyph"
                />
              </li>
            );
          })}
        </ol>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
