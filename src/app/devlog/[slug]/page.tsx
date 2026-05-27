import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { devlogPosts } from "@/data/devlog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = devlogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Devlog",
      description: "Atualizações de desenvolvimento de Tester."
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/devlog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Tester`,
      description: post.summary,
      url: `/devlog/${post.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Tester`,
      description: post.summary
    }
  };
}

export function generateStaticParams() {
  return devlogPosts.map((post) => ({ slug: post.slug }));
}

export default async function DevlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = devlogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <AnimatedPageWrapper>
      <PageHeader title={post.title} description="Post em preparação. Conteúdo completo será publicado após revisão." />
      <GlowCard>
        <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">{post.category}</p>
        <p className="mt-1 text-sm text-slate-400">{post.date}</p>
        <p className="mt-4 text-sm text-slate-300">{post.summary}</p>
      </GlowCard>
    </AnimatedPageWrapper>
  );
}
