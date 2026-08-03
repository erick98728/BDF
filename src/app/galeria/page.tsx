"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import {
  GalleryModal,
  type GalleryModalItem,
} from "@/components/GalleryModal";
import {
  GalleryVisualFrame,
  type GalleryVisualKind,
} from "@/components/GalleryVisualFrame";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { motionDurations, motionEasings } from "@/lib/motion";
import { loadSiteContent } from "@/lib/adminApi";
import { defaultSiteContent } from "@/lib/defaultSiteContent";

type GalleryCategory =
  | "Todos"
  | "Screenshots"
  | "Conceitos"
  | "Personagens"
  | "Cenários"
  | "Vídeos";

type GalleryItem = Omit<GalleryModalItem, "category"> & {
  category: Exclude<GalleryCategory, "Todos">;
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
    visualKind: "screenshot" as GalleryVisualKind,
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
    visualKind: "concept" as GalleryVisualKind,
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
    visualKind: "character" as GalleryVisualKind,
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
    visualKind: "scene" as GalleryVisualKind,
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
    visualKind: "video" as GalleryVisualKind,
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
    visualKind: "screenshot" as GalleryVisualKind,
  },
];

const statusStyles: Record<GalleryItem["status"], string> = {
  "Prévia visual": "text-[var(--color-route-soft)]",
  "Em desenvolvimento": "text-[var(--color-accent-soft)]",
};

export default function GalleryPage() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("Todos");
  const [content, setContent] = useState({
    ...defaultSiteContent.gallery,
    items: galleryItems,
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    loadSiteContent().then((siteContent) => setContent(siteContent.gallery));
  }, []);

  const editableGalleryItems = content.items as GalleryItem[];

  const visibleItems = useMemo(
    () =>
      activeFilter === "Todos"
        ? editableGalleryItems
        : editableGalleryItems.filter((item) => item.category === activeFilter),
    [activeFilter, editableGalleryItems],
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    if (selectedIndex >= visibleItems.length) setSelectedIndex(null);
  }, [selectedIndex, visibleItems.length]);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <AnimatedPageWrapper>
      <PageHeader title="Galeria" description={content.intro.description} />

      <SectionContainer>
        <div className="gallery-intro" data-fx-reveal="chapter">
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
                data-fx-magnetic="true"
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
        <motion.div layout className="gallery-grid">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleItems.map((item) => (
              <motion.button
                layout
                key={item.id}
                type="button"
                className="gallery-entry"
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget;
                  setSelectedIndex(
                    visibleItems.findIndex((visible) => visible.id === item.id),
                  );
                }}
                aria-label={`Abrir ${item.name}`}
                data-fx-spotlight="true"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{
                  duration: reduceMotion ? 0 : motionDurations.feedback,
                  ease: motionEasings.standard,
                  layout: {
                    duration: reduceMotion ? 0 : motionDurations.enter,
                    ease: motionEasings.enter,
                  },
                }}
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
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionContainer>

      <AnimatePresence>
        {selectedIndex !== null && visibleItems[selectedIndex] ? (
          <GalleryModal
            key="gallery-modal"
            items={visibleItems}
            selectedIndex={selectedIndex}
            onSelectedIndexChange={setSelectedIndex}
            onClose={closeModal}
            returnFocusRef={returnFocusRef}
          />
        ) : null}
      </AnimatePresence>
    </AnimatedPageWrapper>
  );
}
