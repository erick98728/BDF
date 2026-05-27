import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const worldPillars: { title: string; text: string; icon: GameGlyphName }[] = [
  {
    title: "Exploração por vestígios",
    icon: "ruin",
    text: "A história não é entregue de uma vez. O jogador entende o mundo por marcas no cenário, rotas bloqueadas, encontros e pequenas pistas deixadas no Bosque."
  },
  {
    title: "Técnica como linguagem",
    icon: "katana",
    text: "As habilidades não servem apenas para vencer combates. Elas também revelam domínio, disciplina e novas formas de atravessar regiões antes inacessíveis."
  },
  {
    title: "Mistério controlado",
    icon: "fog",
    text: "A lore preserva perguntas importantes para versões futuras, mantendo o beta focado em atmosfera, leitura de mundo e progressão inicial."
  }
];

const bosqueDetails = [
  "Névoa constante que muda a percepção de profundidade, risco e distância.",
  "Trilhas conectadas por atalhos, retornos estratégicos e passagens que dependem de habilidade.",
  "Criaturas hostis posicionadas para testar movimentação, tempo de ataque e leitura de arena.",
  "Ruínas discretas, marcas antigas e símbolos incompletos que sugerem uma história anterior à chegada de Rubens.",
  "Presença de Lucarelli como ponto de pressão narrativa e mecânica dentro da progressão do Bosque."
];

const techniques: { title: string; tag: string; text: string; icon: GameGlyphName }[] = [
  {
    title: "Katana",
    tag: "Combate",
    icon: "katana",
    text: "A base do confronto direto. Representa precisão, controle de espaço e decisão rápida contra inimigos do Bosque."
  },
  {
    title: "Dash",
    tag: "Mobilidade",
    icon: "dash",
    text: "Uma técnica de avanço curto que transforma a leitura do mapa, permite novas rotas e muda a forma de lidar com perigos."
  },
  {
    title: "Técnicas futuras",
    tag: "Bloqueado",
    icon: "future",
    text: "Habilidades ainda em desenvolvimento, planejadas para ampliar exploração, combate e segredos sem antecipar spoilers da jornada."
  }
];

const timeline = [
  { title: "Antes da Névoa", icon: "lore" as const, text: "Registros antigos citam um bosque vivo, usado como espaço de travessia, treino e observação silenciosa." },
  { title: "O avanço da corrupção", icon: "fog" as const, text: "A névoa se adensa, criaturas surgem em rotas críticas e as marcas do ambiente começam a perder sentido claro." },
  { title: "A chegada de Rubens", icon: "katana" as const, text: "Rubens entra na região sem todas as respostas, guiado por técnica, instinto e necessidade de avançar." },
  { title: "O bloqueio de Lucarelli", icon: "boss" as const, text: "Lucarelli ocupa um ponto decisivo do Bosque, funcionando como obstáculo, teste e sinal de que há algo maior além da primeira área." },
  { title: "O caminho além do Dash", icon: "dash" as const, text: "Com a nova mobilidade, rotas antes fechadas passam a fazer sentido, mas nem toda passagem revela imediatamente o que procura esconder." }
];

const mysteries = [
  "Quem ou o que mantém a névoa ativa?",
  "Por que Lucarelli protege uma passagem ligada ao Dash?",
  "O Bosque foi abandonado ou está sendo guardado?",
  "Até onde as técnicas de Rubens podem evoluir?"
];

export const metadata: Metadata = {
  title: "Lore",
  description: "Conheça o mundo, os mistérios e a primeira região de Tester sem revelar spoilers da jornada.",
  openGraph: {
    title: "Lore | Tester",
    description: "Conheça o mundo, os mistérios e a primeira região de Tester sem revelar spoilers da jornada."
  }
};

export default function LorePage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Lore"
        description="O mundo de Tester guarda memórias, técnicas e sombras que ainda não foram reveladas por completo."
      />

      <SectionContainer>
        <SectionTitle title="Mundo" subtitle="Um universo em desenvolvimento, construído por fragmentos, silêncio e descoberta." />
        <GlowCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <GameGlyph name="lore" />
            <div className="space-y-4 text-slate-300">
              <p>
                Tester acontece em um cenário marcado por ruínas, disciplina de combate e uma força ambiental que altera caminhos,
                criaturas e memórias. A narrativa é fragmentada de propósito: em vez de explicar tudo diretamente, o jogo convida o
                jogador a observar o cenário e montar suas próprias conexões.
              </p>
              <p>
                A primeira fase da história acompanha Rubens entrando em uma região tomada por névoa, onde cada nova técnica abre uma
                possibilidade de avanço, mas também revela que o Bosque guarda regras antigas e perigos ainda pouco compreendidos.
              </p>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Pilares narrativos" subtitle="Como o mundo de Tester deve ser sentido durante a exploração." />
        <div className="grid gap-4 md:grid-cols-3">
          {worldPillars.map((pillar) => (
            <GlowCard key={pillar.title} contentClassName="flex min-h-[190px] flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                <GameGlyph name={pillar.icon} />
              </div>
              <p className="mt-auto text-sm leading-6 text-slate-300">{pillar.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Bosque da Névoa Perdida" subtitle="Primeira região explorável, densa, conectada e perigosa." />
        <GlowCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <GameGlyph name="fog" className="border-cyan-200/25 bg-cyan-300/10 text-cyan-100" />
            <div>
              <p className="mb-4 text-sm leading-6 text-slate-300">
                O Bosque da Névoa Perdida é a porta de entrada do jogador no universo de Tester. Ele precisa parecer antigo, hostil e
                legível ao mesmo tempo, com rotas que ensinam movimentação, combate, retorno e uso de habilidades desbloqueáveis.
              </p>
              <ul className="grid gap-2 text-sm text-slate-300">
                {bosqueDetails.map((detail) => (
                  <li key={detail} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Técnicas" subtitle="Poder, mobilidade e progressão apresentados sem revelar toda a jornada." />
        <div className="grid gap-4 md:grid-cols-3">
          {techniques.map((technique) => (
            <GlowCard key={technique.title} contentClassName="flex min-h-[174px] flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">{technique.tag}</p>
                <GameGlyph name={technique.icon} />
              </div>
              <h3 className="text-lg font-semibold text-white">{technique.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{technique.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Linha do tempo" subtitle="Eventos vagos para preservar o mistério do enredo." />
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <GlowCard key={item.title}>
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-200/30 bg-cyan-300/10 text-xs text-cyan-200">
                  {index + 1}
                </div>
                <GameGlyph name={item.icon} className="hidden h-9 w-9 sm:inline-flex" />
                <div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{item.text}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Mistérios" subtitle="Perguntas que sustentam o clima da jornada sem antecipar respostas definitivas." />
        <div className="grid gap-4 sm:grid-cols-2">
          {mysteries.map((question) => (
            <GlowCard key={question} contentClassName="flex items-start gap-4">
              <GameGlyph name="fog" className="h-9 w-9" />
              <p className="text-sm font-medium leading-6 text-slate-200">{question}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
