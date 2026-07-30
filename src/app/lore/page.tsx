import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
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
  accent: string;
}[] = [
  {
    title: "Katana",
    tag: "Combate",
    icon: "katana",
    accent: "border-cyan-200/20 bg-cyan-300/10 text-cyan-100",
    text: "Base do confronto direto. Foca precisão, controle de espaço e decisão rápida contra ameaças do Bosque.",
  },
  {
    title: "Dash",
    tag: "Mobilidade",
    icon: "dash",
    accent: "border-purple-200/20 bg-purple-300/10 text-purple-100",
    text: "Avanço curto que muda a leitura do mapa, permite novas rotas e altera a forma de atravessar perigos.",
  },
  {
    title: "Leitura de rotas",
    tag: "Exploração",
    icon: "map",
    accent: "border-amber-200/20 bg-amber-300/10 text-amber-100",
    text: "A progressão depende de observar bloqueios, retornar a pontos antigos e ler atalhos, símbolos e clareiras.",
  },
  {
    title: "Técnicas futuras",
    tag: "Bloqueado",
    icon: "future",
    accent: "border-slate-200/15 bg-white/5 text-slate-100",
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
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <GlowCard
            variant="panel"
            contentClassName="flex h-full flex-col justify-between"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <GameGlyph name="lore" className="h-12 w-12" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                  {siteContent.lore.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {siteContent.lore.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  {siteContent.lore.description}
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {worldPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/70">
                      {pillar.eyebrow}
                    </p>
                    <GameGlyph
                      name={pillar.icon}
                      variant="plain"
                      className="h-5 w-5 text-cyan-100"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard
            variant="quiet"
            contentClassName="flex h-full flex-col justify-center"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">
              Tom narrativo
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Nada é explicado cedo demais.
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              A narrativa preserva respostas importantes para depois. A Beta 0.1
              foca em atmosfera, leitura de rota e progressão inicial dentro do
              Bosque.
            </p>
            <div className="mt-5 rounded-xl border border-amber-200/10 bg-amber-300/5 px-4 py-3 text-sm leading-6 text-amber-50/90">
              O objetivo é sugerir, não revelar tudo.
            </div>
          </GlowCard>
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bosqueFragments.map((fragment) => (
            <GlowCard
              key={fragment.title}
              variant="flat"
              contentClassName="flex min-h-[172px] flex-col"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-white">
                  {fragment.title}
                </h3>
                <GameGlyph name={fragment.icon} />
              </div>
              <p className="mt-auto text-sm leading-6 text-slate-300">
                {fragment.text}
              </p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Técnicas"
          subtitle="Poder, mobilidade e progressão apresentados sem revelar toda a jornada."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techniques.map((technique) => (
            <GlowCard
              key={technique.title}
              variant="quiet"
              contentClassName="flex min-h-[210px] flex-col"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">
                    {technique.tag}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {technique.title}
                  </h3>
                </div>
                <GameGlyph name={technique.icon} className={technique.accent} />
              </div>
              <p className="mt-auto text-sm leading-6 text-slate-300">
                {technique.text}
              </p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Registros do Bosque"
          subtitle="Eventos ambientais com pistas concretas, preservando respostas centrais e evitando spoilers grandes."
        />
        <div className="relative">
          <div className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-transparent via-cyan-200/18 to-transparent md:block" />
          <div className="grid gap-4">
            {timeline.map((item, index) => (
              <GlowCard key={item.title} variant="flat">
                <div className="flex gap-4 md:items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <GameGlyph
                    name={item.icon}
                    className="hidden h-10 w-10 sm:inline-flex"
                  />
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/70">
                      {item.label}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {item.text}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Perguntas em aberto"
          subtitle="Perguntas que sustentam a jornada sem antecipar respostas definitivas."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {mysteries.map((question) => (
            <GlowCard
              key={question}
              variant="flat"
              contentClassName="flex items-start gap-4"
            >
              <GameGlyph name="fog" className="h-9 w-9" />
              <p className="text-sm font-medium leading-6 text-slate-200">
                {question}
              </p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
