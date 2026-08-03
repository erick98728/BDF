import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { devlogPosts } from "@/data/devlog";

const categoryIcons: Record<string, "fog" | "dash" | "katana" | "build"> = {
  Mundo: "fog",
  Gameplay: "dash",
  Combate: "katana",
  Produção: "build",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = devlogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Devlog",
      description: "Atualizações de desenvolvimento de Protótipo.",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/devlog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Protótipo`,
      description: post.summary,
      url: `/devlog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Protótipo`,
      description: post.summary,
    },
  };
}

export function generateStaticParams() {
  return devlogPosts.map((post) => ({ slug: post.slug }));
}

export default async function DevlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = devlogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  const icon = categoryIcons[post.category] ?? "build";

  return (
    <AnimatedPageWrapper>
      <PageHeader title={post.title} description={post.summary} />

      <SectionContainer>
        <GlowCard variant="panel" contentClassName="p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                {post.category}
              </p>
              <p className="mt-2 text-sm text-slate-400">{post.date}</p>
            </div>
            <GameGlyph name={icon} />
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {post.summary}
          </p>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="grid gap-5">
          {post.content.map((section) => (
            <GlowCard
              key={section.heading}
              variant="flat"
              contentClassName="p-5 sm:p-6"
            >
              <h2 className="text-xl font-semibold text-white">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="grid gap-4 lg:grid-cols-2">
          <DevlogListCard
            title="Progresso registrado"
            items={post.progress}
            tone="cyan"
          />
          <DevlogListCard
            title="Próximos passos"
            items={post.nextSteps}
            tone="gold"
          />
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}

function DevlogListCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "cyan" | "gold";
}) {
  const markerClass = tone === "cyan" ? "bg-cyan-200" : "bg-amber-200";

  return (
    <GlowCard variant="quiet" contentClassName="p-5 sm:p-6">
      <SectionTitle
        title={title}
        subtitle="Registro honesto do estado atual, sem promessa de versão final."
      />
      <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${markerClass}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </GlowCard>
  );
}
