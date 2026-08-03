import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { LoreMapPanel } from "@/components/LoreMapPanel";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { loadSiteContent } from "@/lib/adminApi";

const worldPillars: {
  title: string;
  eyebrow: string;
  text: string;
  icon: GameGlyphName;
}[] = [
  {
    title: "Vestígios",
    eyebrow: "Exploração",
    icon: "ruin",
    text: "Marcas, rotas quebradas e símbolos incompletos sugerem uma história anterior sem explicar tudo de imediato.",
  },
  {
    title: "Técnica",
    eyebrow: "Progressão",
    icon: "katana",
    text: "As habilidades mostram domínio, abrem novas leituras do mapa e mudam a forma de enfrentar o Bosque.",
  },
  {
    title: "Névoa",
    eyebrow: "Atmosfera",
    icon: "fog",
    text: "O mistério permanece controlado, preservando perguntas importantes para versões futuras.",
  },
];

const bosqueFragments: { title: string; text: string; icon: GameGlyphName }[] =
  [
    {
      title: "Névoa constante",
      icon: "fog",
      text: "A percepção de profundidade, risco e distância nunca parece totalmente confiável.",
    },
    {
      title: "Trilhas conectadas",
      icon: "map",
      text: "Atalhos, retornos e passagens dependem de atenção e uso de habilidades.",
    },
    {
      title: "Ruínas discretas",
      icon: "ruin",
      text: "Marcas antigas indicam que o Bosque já tinha um propósito antes da chegada de Rubens.",
    },
    {
      title: "Presenças hostis",
      icon: "enemy",
      text: "Criaturas e bloqueios ensinam ritmo, leitura de arena e cuidado com avanço apressado.",
    },
  ];

const techniques: {
  title: string;
  tag: string;
  text: string;
  icon: GameGlyphName;
}[] = [
  {
    title: "Katana",
    tag: "Combate",
    icon: "katana",
    text: "Base do confronto direto. Foca precisão, controle de espaço e decisão rápida contra ameaças do Bosque.",
  },
  {
    title: "Dash",
    tag: "Mobilidade",
    icon: "dash",
    text: "Avanço curto que muda a leitura do mapa, permite novas rotas e altera a forma de atravessar perigos.",
  },
  {
    title: "Leitura de rotas",
    tag: "Exploração",
    icon: "map",
    text: "A progressão depende de observar bloqueios, retornar a pontos antigos e ler atalhos, símbolos e clareiras.",
  },
  {
    title: "Técnicas futuras",
    tag: "Bloqueado",
    icon: "future",
    text: "Habilidades ainda em validação, reservadas para ampliar combate, travessia e rotas sem antecipar spoilers.",
  },
];

const timeline: {
  title: string;
  label: string;
  icon: GameGlyphName;
  text: string;
}[] = [
  {
    title: "Antes da Névoa",
    label: "Registro 01",
    icon: "lore",
    text: "Fragmentos antigos mencionam um bosque usado como passagem, treino e observação silenciosa.",
  },
  {
    title: "Sinais quebrados",
    label: "Registro 02",
    icon: "ruin",
    text: "Marcas no ambiente começam a perder sentido claro, como se parte da memória do lugar tivesse sido apagada.",
  },
  {
    title: "Névoa em avanço",
    label: "Registro 03",
    icon: "fog",
    text: "A região fica mais densa, hostil e incerta. Caminhos simples passam a exigir leitura e retorno.",
  },
  {
    title: "A chegada de Rubens",
    label: "Registro 04",
    icon: "katana",
    text: "Rubens entra sem todas as respostas, guiado por técnica, instinto e necessidade de avançar.",
  },
  {
    title: "O bloqueio de Lucarelli",
    label: "Registro 05",
    icon: "boss",
    text: "Uma presença impede a passagem e transforma a progressão em teste de domínio, não apenas força.",
  },
  {
    title: "Depois do Dash",
    label: "Registro 06",
    icon: "dash",
    text: "Rotas antes fechadas passam a fazer sentido, mas nem toda passagem revela o que realmente esconde.",
  },
];

const mysteries = [
  "O que altera os caminhos do Bosque?",
  "Por que algumas rotas parecem ter sido apagadas?",
  "Lucarelli protege uma passagem ou impede algo de sair?",
  "O Bosque foi abandonado, guardado ou esquecido?",
];

export const metadata: Metadata = {
  title: "Lore",
  description:
    "Conheça o Bosque da Névoa Perdida, os mistérios e a lore atmosférica de Protótipo sem revelar spoilers grandes da jornada.",
  alternates: { canonical: "/lore" },
  openGraph: {
    title: "Lore | Protótipo",
    description:
      "Conheça o Bosque da Névoa Perdida, os mistérios e a lore atmosférica de Protótipo sem revelar spoilers grandes da jornada.",
    url: "/lore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lore | Protótipo",
    description:
      "Conheça o Bosque da Névoa Perdida, os mistérios e a lore atmosférica de Protótipo sem revelar spoilers grandes da jornada.",
  },
};

export default async function LorePage() {
  const siteContent = await loadSiteContent();

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Lore"
        description="O mundo de Protótipo guarda memórias, técnicas e sombras que ainda não foram reveladas por completo."
      />

      <SectionContainer>
        <SectionTitle
          title="Mundo"
          subtitle="Um universo em construção, apresentado por rotas, ruínas, bloqueios e fragmentos de memória."
        />
        <div className="lore-opening" data-fx-reveal="chapter">
          <div className="lore-opening__story">
            <div className="editorial-lead">
              <GameGlyph
                name="lore"
                variant="plain"
                className="editorial-lead__glyph fx-record-symbol"
              />
              <div>
                <p className="editorial-label">{siteContent.lore.eyebrow}</p>
                <h2>{siteContent.lore.title}</h2>
                <p>{siteContent.lore.description}</p>
              </div>
            </div>

            <div className="lore-pillars">
              {worldPillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="lore-pillar"
                  data-fx-reveal="record"
                >
                  <span className="lore-pillar__index fx-record-symbol" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="editorial-label">{pillar.eyebrow}</p>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </div>
                  <GameGlyph
                    name={pillar.icon}
                    variant="plain"
                    className="lore-pillar__glyph fx-record-symbol"
                  />
                </article>
              ))}
            </div>
          </div>

          <aside className="lore-note" data-fx-reveal="record">
            <p className="editorial-label">Tom narrativo</p>
            <h3>Nada é explicado cedo demais.</h3>
            <p>
              A narrativa preserva respostas importantes para depois. A Beta 0.1
              foca em atmosfera, leitura de rota e progressão inicial dentro do
              Bosque.
            </p>
            <blockquote>O objetivo é sugerir, não revelar tudo.</blockquote>
          </aside>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Bosque da Névoa Perdida"
          subtitle="Mapa simbólico da primeira região, feito para ambientação e leitura visual, não como mapa real completo."
        />
        <LoreMapPanel />
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Fragmentos do Bosque"
          subtitle="Elementos de ambientação que sustentam o mistério da região inicial."
        />
        <ol className="fragment-index">
          {bosqueFragments.map((fragment, index) => (
            <li key={fragment.title} data-fx-reveal="record">
              <span className="fragment-index__number fx-record-symbol">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{fragment.title}</h3>
                <p>{fragment.text}</p>
              </div>
              <GameGlyph
                name={fragment.icon}
                variant="plain"
                className="fragment-index__glyph fx-record-symbol"
              />
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Técnicas"
          subtitle="Poder, mobilidade e progressão apresentados sem revelar toda a jornada."
        />
        <div className="technique-ledger">
          {techniques.map((technique, index) => (
            <article
              key={technique.title}
              className="technique-record"
              data-fx-reveal="record"
            >
              <div className="technique-record__mark fx-record-symbol">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <GameGlyph
                  name={technique.icon}
                  variant="plain"
                  className="technique-record__glyph"
                />
              </div>
              <div>
                <p className="editorial-label">{technique.tag}</p>
                <h3>{technique.title}</h3>
                <p>{technique.text}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Registros do Bosque"
          subtitle="Eventos ambientais com pistas concretas, preservando respostas centrais e evitando spoilers grandes."
        />
        <div className="lore-timeline-shell" data-fx-timeline="lore">
          <span className="lore-timeline__progress" aria-hidden="true" />
          <ol className="lore-timeline">
            {timeline.map((item, index) => (
              <li
                key={item.title}
                data-fx-reveal="record"
                data-fx-timeline-node="record"
              >
                <div className="lore-timeline__node fx-record-symbol" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="lore-timeline__record">
                  <GameGlyph
                    name={item.icon}
                    variant="plain"
                    className="lore-timeline__glyph fx-record-symbol"
                  />
                  <div>
                    <p className="editorial-label">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Perguntas em aberto"
          subtitle="Perguntas que sustentam a jornada sem antecipar respostas definitivas."
        />
        <ol className="mystery-list">
          {mysteries.map((question, index) => (
            <li key={question} data-fx-reveal="record">
              <span className="fx-record-symbol">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{question}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
