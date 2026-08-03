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
  "Prévia visual": "text-[var(--color-route-soft)]",
  "Em desenvolvimento": "text-[var(--color-accent-soft)]",
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
        <div className="gallery-intro">
          <div className="gallery-intro__copy">
            <p className="editorial-label">{content.intro.eyebrow}</p>
            <h2>{content.intro.title}</h2>
            <p>{content.intro.description}</p>
          </div>
          <dl className="gallery-index">
            <div>
              <GameGlyph
                name="gallery"
                variant="plain"
                className="gallery-index__glyph"
              />
              <dt>Itens</dt>
              <dd>{editableGalleryItems.length} registros</dd>
            </div>
            <div>
              <GameGlyph
                name="beta"
                variant="plain"
                className="gallery-index__glyph gallery-index__glyph--ember"
              />
              <dt>Status</dt>
              <dd>Em produção</dd>
            </div>
            <div>
              <GameGlyph
                name="ruin"
                variant="plain"
                className="gallery-index__glyph gallery-index__glyph--muted"
              />
              <dt>Tipo</dt>
              <dd>Real, conceito ou preview</dd>
            </div>
          </dl>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Filtros visuais"
          subtitle="Filtre imagens reais cadastradas, conceitos e previews abstratos sem misturar com promessas de material final."
        />
        <div className="gallery-filters" role="group" aria-label="Filtrar galeria">
          {filters.map((filter) => {
            const active = filter.label === activeFilter;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
                aria-pressed={active}
                className="gallery-filter"
              >
                <span className="gallery-filter__label">
                  <GameGlyph
                    name={filter.icon}
                    variant="plain"
                    className="gallery-filter__glyph"
                  />
                  <span>{filter.label}</span>
                </span>
                <span className="gallery-filter__description">
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
        <div className="gallery-grid">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="gallery-entry"
              onClick={() => setSelected(item)}
              aria-label={`Abrir ${item.name}`}
            >
              <article>
                <GalleryVisualFrame
                  kind={item.visualKind}
                  icon={item.icon}
                  label={item.category}
                  status={item.status}
                  imageUrl={item.imageUrl}
                  altText={item.altText || item.name}
                />
                <div className="gallery-entry__meta">
                  <p>{item.category}</p>
                  <span className={statusStyles[item.status]}>
                    {item.status}
                  </span>
                </div>
                <h3>{item.name}</h3>
                <p className="gallery-entry__description">{item.description}</p>
                <p className="gallery-entry__action">
                  {item.imageUrl?.trim()
                    ? "Imagem real cadastrada"
                    : item.visualKind === "concept"
                      ? "Conceito visual"
                      : "Preview abstrato"}{" "}
                  · Abrir item
                </p>
              </article>
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

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-300">
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
