"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import {
  GalleryVisualFrame,
  type GalleryVisualKind,
} from "@/components/GalleryVisualFrame";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { loadSiteContent } from "@/lib/adminApi";
import { defaultSiteContent } from "@/lib/defaultSiteContent";

type GalleryCategory =
  | "Todos"
  | "Screenshots"
  | "Conceitos"
  | "Personagens"
  | "Cenários"
  | "Vídeos";

type GalleryItem = {
  id: string;
  name: string;
  category: Exclude<GalleryCategory, "Todos">;
  status: "Prévia visual" | "Em desenvolvimento";
  description: string;
  icon: GameGlyphName;
  visualKind: GalleryVisualKind;
  detail: string;
  imageUrl?: string;
  altText?: string;
};

type FilterConfig = {
  label: GalleryCategory;
  icon: GameGlyphName;
  description: string;
};

const filters: FilterConfig[] = [
  { label: "Todos", icon: "gallery", description: "acervo" },
  { label: "Screenshots", icon: "gallery", description: "prints/previews" },
  { label: "Conceitos", icon: "ruin", description: "ideias" },
  { label: "Personagens", icon: "user", description: "elenco" },
  { label: "Cenários", icon: "fog", description: "ambientes" },
  { label: "Vídeos", icon: "platform", description: "clipes" },
];

const galleryItems: GalleryItem[] = [
  {
    id: "bosque-trilha-norte",
    name: "Bosque · Trilha Norte",
    category: "Screenshots",
    status: "Prévia visual",
    description:
      "Preview abstrato de iluminação e profundidade para uma trilha de progressão inicial.",
    detail:
      "Quando houver captura real cadastrada, ela substitui esta moldura; por enquanto o foco é leitura de trilha e profundidade.",
    icon: "fog",
    visualKind: "screenshot",
  },
  {
    id: "concept-ruinas",
    name: "Ruínas da Névoa",
    category: "Conceitos",
    status: "Em desenvolvimento",
    description:
      "Conceito visual de ruínas e símbolos para apoiar narrativa ambiental sem revelar respostas centrais.",
    detail:
      "Conceito abstrato para guiar tom, formas e sensação de vestígio antigo no Bosque.",
    icon: "ruin",
    visualKind: "concept",
  },
  {
    id: "rubens-pose",
    name: "Rubens · Pose Base",
    category: "Personagens",
    status: "Em desenvolvimento",
    description:
      "Exploração de silhueta e postura de combate para o protagonista em cenas de promoção.",
    detail:
      "Representação simbólica com katana e energia, sem substituir arte final do personagem.",
    icon: "katana",
    visualKind: "character",
  },
  {
    id: "clareira-hostil",
    name: "Clareira Hostil",
    category: "Cenários",
    status: "Prévia visual",
    description:
      "Bloco visual de ambiente com foco em contraste, risco de combate e rotas ocultas.",
    detail:
      "Prévia de clima e composição, pensada para sugerir perigo sem virar mapa completo da região.",
    icon: "enemy",
    visualKind: "scene",
  },
  {
    id: "teaser-devlog",
    name: "Teaser de Build",
    category: "Vídeos",
    status: "Em desenvolvimento",
    description:
      "Espaço reservado para clipes curtos quando houver captura real de gameplay.",
    detail:
      "Moldura planejada para vídeo futuro, sem simular material que ainda não foi capturado.",
    icon: "platform",
    visualKind: "video",
  },
  {
    id: "screenshot-atalho",
    name: "Atalho Pós-Dash",
    category: "Screenshots",
    status: "Prévia visual",
    description:
      "Preview de atalho liberado após progresso de mobilidade no Bosque.",
    detail:
      "Composição abstrata de rota e movimento, indicando progressão sem prometer layout final.",
    icon: "dash",
    visualKind: "screenshot",
  },
];

const statusStyles: Record<GalleryItem["status"], string> = {
  "Prévia visual": "border-cyan-200/25 bg-cyan-300/10 text-cyan-100",
  "Em desenvolvimento": "border-amber-200/25 bg-amber-300/10 text-amber-100",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("Todos");
  const [content, setContent] = useState({
    ...defaultSiteContent.gallery,
    items: galleryItems,
  });
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadSiteContent().then((siteContent) => setContent(siteContent.gallery));
  }, []);

  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  const editableGalleryItems = content.items as GalleryItem[];

  const visibleItems = useMemo(
    () =>
      activeFilter === "Todos"
        ? editableGalleryItems
        : editableGalleryItems.filter((item) => item.category === activeFilter),
    [activeFilter, editableGalleryItems],
  );

  return (
    <AnimatedPageWrapper>
      <PageHeader title="Galeria" description={content.intro.description} />

      <SectionContainer>
        <GlowCard
          variant="panel"
          contentClassName="relative overflow-hidden p-5 sm:p-7"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(204,100,55,0.14),transparent_30%),radial-gradient(circle_at_86%_68%,rgba(245,242,237,0.12),transparent_34%)]" />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                {content.intro.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {content.intro.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {content.intro.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                <GameGlyph
                  name="gallery"
                  variant="plain"
                  className="mb-2 h-5 w-5 text-cyan-100"
                />
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Itens
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {editableGalleryItems.length} registros
                </p>
              </div>
              <div className="rounded-xl border border-amber-200/10 bg-black/20 px-4 py-3">
                <GameGlyph
                  name="beta"
                  variant="plain"
                  className="mb-2 h-5 w-5 text-amber-100"
                />
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Em produção
                </p>
              </div>
              <div className="rounded-xl border border-purple-200/10 bg-black/20 px-4 py-3">
                <GameGlyph
                  name="ruin"
                  variant="plain"
                  className="mb-2 h-5 w-5 text-purple-100"
                />
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Tipo
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  Real, conceito ou preview
                </p>
              </div>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Filtros visuais"
          subtitle="Filtre imagens reais cadastradas, conceitos e previews abstratos sem misturar com promessas de material final."
        />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
          {filters.map((filter) => {
            const active = filter.label === activeFilter;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
                className={`min-h-14 rounded-xl border px-3 py-3 text-left transition ${
                  active
                    ? "border-cyan-200/55 bg-cyan-300/15 text-cyan-100 shadow-[0_0_24px_rgba(204,100,55,0.10)]"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-200/25 hover:bg-white/[0.07]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <GameGlyph
                    name={filter.icon}
                    variant="plain"
                    className="h-4 w-4"
                  />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                    {filter.label}
                  </span>
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-slate-500">
                  {filter.description}
                </span>
              </button>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Acervo visual do projeto"
          subtitle="Itens marcados como imagem real usam URL cadastrada; previews e conceitos permanecem identificados até haver captura final."
        />
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="h-full w-full text-left"
              onClick={() => setSelected(item)}
            >
              <GlowCard
                variant={item.imageUrl?.trim() ? "quiet" : "flat"}
                contentClassName="flex h-full min-h-[365px] flex-col p-4 sm:p-5"
              >
                <GalleryVisualFrame
                  kind={item.visualKind}
                  icon={item.icon}
                  label={item.category}
                  status={item.status}
                  imageUrl={item.imageUrl}
                  altText={item.altText || item.name}
                />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/85">
                    {item.category}
                  </p>
                  <span
                    className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.1em] ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
                <p className="mt-auto pt-4 text-xs uppercase tracking-[0.12em] text-slate-500">
                  {item.imageUrl?.trim()
                    ? "Imagem real cadastrada"
                    : item.visualKind === "concept"
                      ? "Conceito visual"
                      : "Preview abstrato"}{" "}
                  · Abrir item
                </p>
              </GlowCard>
            </button>
          ))}
        </div>
      </SectionContainer>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-5 backdrop-blur-sm sm:items-center sm:py-6"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`gallery-preview-title-${selected.id}`}
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <GlowCard contentClassName="p-4 sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">
                    Preview da galeria
                  </p>
                  <h3
                    id={`gallery-preview-title-${selected.id}`}
                    className="mt-1 text-2xl font-bold text-white sm:text-3xl"
                  >
                    {selected.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-lg text-slate-100 transition hover:bg-white/[0.10]"
                  aria-label="Fechar preview"
                >
                  ×
                </button>
              </div>

              <GalleryVisualFrame
                kind={selected.visualKind}
                icon={selected.icon}
                label={selected.category}
                status={selected.status}
                size="modal"
                imageUrl={selected.imageUrl}
                altText={selected.altText || selected.name}
              />

              <div className="mt-5 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Categoria
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {selected.category}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Status
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium ${selected.status === "Prévia visual" ? "text-cyan-100" : "text-amber-100"}`}
                  >
                    {selected.status}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Descrição
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selected.description}
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-purple-200/10 bg-purple-300/[0.04] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.14em] text-purple-200/80">
                  Observação
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selected.detail}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="mt-5 min-h-11 w-full rounded-lg border border-cyan-200/35 bg-cyan-300/12 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/20 sm:w-auto"
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
