import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { StatusBadge } from "@/components/TesterVisualSystem";
import { roadmapGroups, type RoadmapStatus } from "@/data/roadmap";

const statusLabels: Record<RoadmapStatus, string> = {
  done: "Funcional",
  testing: "Em teste",
  next: "Próximo",
  future: "Futuro",
};

const statusBadge: Record<
  RoadmapStatus,
  "ready" | "warning" | "live" | "planned"
> = {
  done: "ready",
  testing: "warning",
  next: "live",
  future: "planned",
};

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Roadmap honesto de Protótipo, separando o que já existe, o que está em teste, próximas melhorias e ideias futuras sem data definida.",
  alternates: { canonical: "/roadmap" },
  openGraph: {
    title: "Roadmap | Protótipo",
    description:
      "Roadmap honesto de Protótipo, separando o que já existe, o que está em teste, próximas melhorias e ideias futuras sem data definida.",
    url: "/roadmap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap | Protótipo",
    description:
      "Roadmap honesto de Protótipo, separando o que já existe, o que está em teste, próximas melhorias e ideias futuras sem data definida.",
  },
};

export default function RoadmapPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Roadmap"
        description="Estado real do projeto Protótipo: o que já funciona, o que está em teste e o que fica para depois da Beta 0.1. Sem datas inventadas e sem promessa de versão final."
      />

      <SectionContainer>
        <GlowCard
          variant="panel"
          contentClassName="relative overflow-hidden p-5 sm:p-7"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(204,100,55,0.14),transparent_32%),radial-gradient(circle_at_86%_70%,rgba(251,191,36,0.10),transparent_34%)]" />
          <div className="relative z-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                Roadmap público
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Escopo pequeno, evolução clara.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A Beta 0.1 é tratada como uma etapa de validação, não como
                produto final. Este roadmap mostra prioridades sem prometer
                datas de lançamento.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <RoadmapMiniStat label="Beta 0.1" value="Trecho inicial" />
              <RoadmapMiniStat label="Status" value="Teste fechado" />
              <RoadmapMiniStat label="Foco" value="Controle e clareza" />
              <RoadmapMiniStat label="Datas" value="Sem promessa pública" />
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      {roadmapGroups.map((group) => (
        <SectionContainer key={group.title} withDivider>
          <SectionTitle title={group.title} subtitle={group.description} />
          <div className="grid gap-4 lg:grid-cols-3">
            {group.items.map((item) => (
              <GlowCard
                key={item.title}
                variant="flat"
                contentClassName="flex min-h-[250px] flex-col p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <GameGlyph name={item.icon} />
                  <StatusBadge status={statusBadge[item.status]}>
                    {statusLabels[item.status]}
                  </StatusBadge>
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">
                  {item.scope}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </GlowCard>
            ))}
          </div>
        </SectionContainer>
      ))}
    </AnimatedPageWrapper>
  );
}

function RoadmapMiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
