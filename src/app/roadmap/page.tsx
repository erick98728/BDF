import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph } from "@/components/GameGlyph";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
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
        <div className="roadmap-intro" data-fx-reveal="chapter">
          <div className="roadmap-intro__copy">
            <p className="editorial-label">Roadmap público</p>
            <h2>Escopo pequeno, evolução clara.</h2>
            <p>
              A Beta 0.1 é tratada como uma etapa de validação, não como produto
              final. Este roadmap mostra prioridades sem prometer datas de
              lançamento.
            </p>
          </div>
          <dl className="roadmap-facts">
            <RoadmapMiniStat label="Beta 0.1" value="Trecho inicial" />
            <RoadmapMiniStat label="Status" value="Teste fechado" />
            <RoadmapMiniStat label="Foco" value="Controle e clareza" />
            <RoadmapMiniStat label="Datas" value="Sem promessa pública" />
          </dl>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="roadmap-heading" data-fx-reveal="title">
          <p className="editorial-label">Roadmap público</p>
          <h2>Estado real do projeto Protótipo.</h2>
        </div>

        <ol className="roadmap-timeline" data-fx-timeline="roadmap">
          <span className="roadmap-timeline__progress" aria-hidden="true" />
          {roadmapGroups.map((group, groupIndex) => (
            <li
              key={group.title}
              className={`roadmap-phase roadmap-phase--${group.status}`}
              data-fx-timeline-node="phase"
            >
              <div className="roadmap-phase__rail" aria-hidden="true">
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
              </div>

              <div
                className="roadmap-phase__content"
                data-fx-reveal="chapter"
              >
                <div className="roadmap-phase__heading">
                  <div>
                    <p className="editorial-label">{statusLabels[group.status]}</p>
                    <h3>{group.title}</h3>
                    <p>{group.description}</p>
                  </div>
                  <StatusBadge status={statusBadge[group.status]}>
                    {statusLabels[group.status]}
                  </StatusBadge>
                </div>

                <ol className="roadmap-records">
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={item.title}
                      className="roadmap-record"
                      data-fx-reveal="record"
                      data-fx-timeline-node="record"
                    >
                      <div
                        className="roadmap-record__marker fx-record-symbol"
                        aria-hidden="true"
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </div>
                      <GameGlyph
                        name={item.icon}
                        variant="plain"
                        className="roadmap-record__glyph fx-record-symbol"
                      />
                      <div className="roadmap-record__copy">
                        <p className="editorial-label">{item.scope}</p>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                      <StatusBadge status={statusBadge[item.status]}>
                        {statusLabels[item.status]}
                      </StatusBadge>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ol>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}

function RoadmapMiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
