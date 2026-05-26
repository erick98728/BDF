"use client";

import { useMemo, useState } from "react";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

type GalleryCategory = "Todos" | "Screenshots" | "Conceitos" | "Personagens" | "Cenários" | "Vídeos";

type GalleryItem = {
  id: string;
  name: string;
  category: Exclude<GalleryCategory, "Todos">;
  status: "Prévia visual" | "Em desenvolvimento";
  accent: string;
  description: string;
};

const filters: GalleryCategory[] = ["Todos", "Screenshots", "Conceitos", "Personagens", "Cenários", "Vídeos"];

const galleryItems: GalleryItem[] = [
  {
    id: "bosque-trilha-norte",
    name: "Bosque · Trilha Norte",
    category: "Screenshots",
    status: "Prévia visual",
    accent: "from-cyan-300/30 via-cyan-500/10 to-transparent",
    description: "Registro preliminar de iluminação e profundidade da névoa em rota de progressão inicial."
  },
  {
    id: "concept-ruinas",
    name: "Ruínas da Névoa",
    category: "Conceitos",
    status: "Em desenvolvimento",
    accent: "from-purple-300/30 via-purple-500/10 to-transparent",
    description: "Estudo visual de ruínas e símbolos para reforçar leitura narrativa sem exposição total da lore."
  },
  {
    id: "rubens-pose",
    name: "Rubens · Pose Base",
    category: "Personagens",
    status: "Em desenvolvimento",
    accent: "from-amber-300/30 via-amber-500/10 to-transparent",
    description: "Exploração de silhueta e postura de combate para o protagonista em cenas de promoção."
  },
  {
    id: "clareira-hostil",
    name: "Clareira Hostil",
    category: "Cenários",
    status: "Prévia visual",
    accent: "from-emerald-300/30 via-emerald-500/10 to-transparent",
    description: "Bloco visual de ambiente com foco em contraste, risco de combate e rotas ocultas."
  },
  {
    id: "teaser-devlog",
    name: "Teaser de Build",
    category: "Vídeos",
    status: "Em desenvolvimento",
    accent: "from-fuchsia-300/30 via-fuchsia-500/10 to-transparent",
    description: "Área reservada para futuros clipes de progresso técnico e demonstração de gameplay."
  },
  {
    id: "screenshot-atalho",
    name: "Atalho Pós-Dash",
    category: "Screenshots",
    status: "Prévia visual",
    accent: "from-sky-300/30 via-sky-500/10 to-transparent",
    description: "Preview de rota alternativa desbloqueada após progresso de mobilidade no Bosque."
  }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("Todos");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const visibleItems = useMemo(
    () => (activeFilter === "Todos" ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)),
    [activeFilter]
  );

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Galeria"
        description="Imagens do desenvolvimento, conceitos e registros do mundo de Tester."
      />

      <SectionContainer>
        <SectionTitle title="Filtros visuais" subtitle="Selecione uma categoria para navegar pelo acervo em produção." />
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] transition ${
                  active
                    ? "border-cyan-200/50 bg-cyan-300/15 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Acervo visual" subtitle="Prévias preparadas para receber artes finais, prints e vídeos." />
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <button key={item.id} type="button" className="h-full w-full text-left" onClick={() => setSelected(item)}>
              <GlowCard contentClassName="flex h-full flex-col">
                <div className={`mb-4 h-36 shrink-0 rounded-xl border border-white/10 bg-gradient-to-br ${item.accent}`} />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/85">{item.category}</p>
                  <span className="rounded-full border border-purple-200/20 bg-purple-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-purple-100">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.name}</h3>
                <p className="mt-auto pt-3 text-sm text-slate-300">Clique para visualizar detalhes</p>
              </GlowCard>
            </button>
          ))}
        </div>
      </SectionContainer>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8" onClick={() => setSelected(null)}>
          <div className="w-full max-w-2xl" onClick={(event) => event.stopPropagation()}>
            <GlowCard>
              <div className={`mb-4 h-48 rounded-xl border border-white/10 bg-gradient-to-br sm:h-56 ${selected.accent}`} />
              <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/85">{selected.category}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{selected.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{selected.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-purple-200/90">Status: {selected.status}</p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-5 min-h-11 rounded-lg border border-cyan-200/35 bg-cyan-300/12 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/20"
              >
                Fechar preview
              </button>
            </GlowCard>
          </div>
        </div>
      ) : null}
    </AnimatedPageWrapper>
  );
}
