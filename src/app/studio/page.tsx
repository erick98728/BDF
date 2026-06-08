import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameButton } from "@/components/GameButton";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const philosophy: { title: string; text: string; icon: GameGlyphName }[] = [
  {
    title: "Aprender criando",
    icon: "tool",
    text: "Cada versão do projeto serve para testar ideias, corrigir problemas reais e transformar estudo em experiência jogável."
  },
  {
    title: "Criar um universo próprio",
    icon: "lore",
    text: "Tester busca uma identidade própria, com clima sombrio, exploração conectada e personagens que crescem junto com o jogo."
  },
  {
    title: "Valorizar feedback",
    icon: "feedback",
    text: "O ciclo de teste existe para ouvir jogadores, encontrar problemas de clareza e melhorar ritmo, combate, mapa e dificuldade."
  },
  {
    title: "Evoluir a cada versão",
    icon: "build",
    text: "A prioridade é avançar de forma consistente, sem fingir que tudo está pronto antes da hora."
  },
  {
    title: "Construir com comunidade",
    icon: "user",
    text: "Amigos, testers e jogadores interessados ajudam a perceber detalhes que passam despercebidos durante o desenvolvimento."
  }
];

const tools: { name: string; description: string; icon: GameGlyphName }[] = [
  { name: "Unity", icon: "tool", description: "Base do jogo 2D e das cenas de teste." },
  { name: "C#", icon: "build", description: "Lógica de jogador, inimigos, checkpoints e sistemas." },
  { name: "GitHub", icon: "checklist", description: "Controle de versão, organização e histórico do projeto." },
  { name: "Next.js", icon: "platform", description: "Site oficial, páginas públicas e portal de teste." },
  { name: "Documentação", icon: "lore", description: "Planejamento de mapa, feedback, download e evolução." }
];

export const metadata: Metadata = {
  title: "Studio",
  description: "Conheça a visão independente por trás de Tester, um jogo indie brasileiro em protótipo jogável, feedback e evolução real.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Studio | Tester",
    description: "Conheça a visão independente por trás de Tester, um jogo indie brasileiro em protótipo jogável, feedback e evolução real.",
    url: "/studio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio | Tester",
    description: "Conheça a visão independente por trás de Tester, um jogo indie brasileiro em protótipo jogável, feedback e evolução real."
  }
};

export default function StudioPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Studio"
        description="Desenvolvimento independente, aprendizado técnico e construção gradual de um universo próprio."
      />

      <SectionContainer>
        <SectionTitle title="Sobre o projeto" subtitle="Tester é um jogo indie em protótipo jogável, criado com foco em evolução real." />
        <GlowCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <GameGlyph name="studio" />
            <div className="space-y-4 text-slate-300">
              <p>
                Tester é um metroidvania 2D sombrio em construção, com foco inicial no Bosque da Névoa Perdida, combate com katana,
                Dash, checkpoints e leitura de rota. O projeto está em ciclo de protótipo jogável, por isso cada página,
                sistema e área testável existe para validar uma parte pequena da experiência.
              </p>
              <p>
                A proposta não é parecer um estúdio gigante, e sim apresentar um projeto autoral de forma séria, honesta e organizada.
                O objetivo é evoluir o jogo por versões, validar ideias com jogadores e transformar feedback em ajustes concretos de controle, mapa e clareza.
              </p>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Sobre o desenvolvedor" subtitle="Uma apresentação profissional, sem expor dados pessoais sensíveis." />
        <GlowCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <GameGlyph name="user" className="border-emerald-200/20 bg-emerald-300/10 text-emerald-100" />
            <div className="space-y-4 text-sm leading-6 text-slate-300">
              <p>
                Tester é conduzido por um desenvolvedor indie brasileiro em formação, interessado em programação, jogos, narrativa e
                criação de experiências interativas. O projeto funciona como um espaço de aprendizado prático, onde código, design,
                documentação e testes se encontram em um produto real.
              </p>
              <p>
                A responsabilidade inicial envolve estruturar sistemas no Unity, organizar o projeto no GitHub, criar documentação,
                montar o site oficial e preparar uma build interna que possa ser testada por pessoas próximas antes de qualquer divulgação maior.
              </p>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Filosofia do projeto" subtitle="Princípios que orientam cada versão de Tester." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((item) => (
            <GlowCard key={item.title} contentClassName="flex min-h-[164px] flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <GameGlyph name={item.icon} />
              </div>
              <p className="mt-auto text-sm leading-6 text-slate-300">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Ferramentas" subtitle="Base técnica e criativa usada no desenvolvimento do jogo e do site." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool) => (
            <GlowCard key={tool.name} contentClassName="flex min-h-[154px] flex-col items-center text-center">
              <GameGlyph name={tool.icon} className="mb-3" />
              <p className="text-sm font-semibold text-slate-100">{tool.name}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{tool.description}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Como o projeto evolui" subtitle="A construção de Tester é dividida em etapas claras e testáveis. O roadmap público separa o que já funciona, o que está em teste e o que fica para depois." />
        <div className="grid gap-4 md:grid-cols-3">
          <GlowCard contentClassName="flex min-h-[170px] flex-col">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Etapa 1</p>
              <GameGlyph name="build" />
            </div>
            <h3 className="text-lg font-semibold text-white">Demo jogável</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Consolidar movimentação, combate, mapa inicial, boss, checkpoints e feedback básico.</p>
          </GlowCard>
          <GlowCard contentClassName="flex min-h-[170px] flex-col">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Etapa 2</p>
              <GameGlyph name="beta" />
            </div>
            <h3 className="text-lg font-semibold text-white">Beta fechado</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Liberar um trecho fechado para pessoas próximas, coletar bugs e entender onde controle, mapa ou arena ainda confundem.</p>
          </GlowCard>
          <GlowCard contentClassName="flex min-h-[170px] flex-col">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Etapa 3</p>
              <GameGlyph name="future" />
            </div>
            <h3 className="text-lg font-semibold text-white">Expansão</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Melhorar visual, narrativa ambiental, rotas e sistemas depois que a Beta 0.1 estiver validada.</p>
          </GlowCard>
        </div>
        <div className="mt-5">
          <GameButton href="/roadmap" variant="secondary">Ver roadmap completo</GameButton>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-16 text-center">
          <SectionTitle
            title="Acompanhe o desenvolvimento"
            subtitle="Se você gosta de projetos autorais, acompanhe as próximas versões de Tester e participe com feedback quando a build estiver disponível."
          />
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
