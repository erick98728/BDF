import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const philosophy = [
  {
    title: "Aprender criando",
    text: "Cada versão do projeto serve para testar ideias, corrigir problemas reais e transformar estudo em experiência jogável."
  },
  {
    title: "Criar um universo próprio",
    text: "Tester busca uma identidade própria, com clima sombrio, exploração conectada e personagens que crescem junto com o jogo."
  },
  {
    title: "Valorizar feedback",
    text: "O beta existe para ouvir jogadores, encontrar problemas de clareza e melhorar ritmo, combate, mapa e dificuldade."
  },
  {
    title: "Evoluir a cada versão",
    text: "A prioridade é avançar de forma consistente, sem fingir que tudo está pronto antes da hora."
  },
  {
    title: "Construir com comunidade",
    text: "Amigos, testers e jogadores interessados ajudam a perceber detalhes que passam despercebidos durante o desenvolvimento."
  }
];

const tools = [
  { name: "Unity", description: "Base do jogo 2D e das cenas de teste." },
  { name: "C#", description: "Lógica de jogador, inimigos, checkpoints e sistemas." },
  { name: "GitHub", description: "Controle de versão, organização e histórico do projeto." },
  { name: "Next.js", description: "Site oficial, páginas públicas e portal do beta." },
  { name: "Documentação", description: "Planejamento de mapa, feedback, download e evolução." }
];

export const metadata: Metadata = {
  title: "Studio",
  description: "Conheça a visão independente por trás de Tester, um metroidvania 2D em desenvolvimento.",
  openGraph: {
    title: "Studio | Tester",
    description: "Conheça a visão independente por trás de Tester, um metroidvania 2D em desenvolvimento."
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
        <SectionTitle title="Sobre o projeto" subtitle="Tester é um jogo indie em desenvolvimento, criado com foco em evolução real." />
        <GlowCard>
          <div className="space-y-4 text-slate-300">
            <p>
              Tester é um metroidvania 2D sombrio em construção, com foco inicial no Bosque da Névoa Perdida, combate com katana,
              progressão por habilidades e uma atmosfera de mistério. O projeto ainda está em fase de beta, por isso cada página,
              sistema e área jogável existe para testar uma parte da experiência final.
            </p>
            <p>
              A proposta não é parecer um estúdio gigante, e sim apresentar um projeto autoral de forma séria, honesta e organizada.
              O objetivo é evoluir o jogo por versões, validar ideias com jogadores e transformar feedback em melhoria concreta.
            </p>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Sobre o desenvolvedor" subtitle="Uma apresentação profissional, sem expor dados pessoais sensíveis." />
        <GlowCard>
          <div className="space-y-4 text-sm leading-6 text-slate-300">
            <p>
              Tester é conduzido por um desenvolvedor indie brasileiro em formação, interessado em programação, jogos, narrativa e
              criação de experiências interativas. O projeto funciona como um espaço de aprendizado prático, onde código, design,
              documentação e testes se encontram em um produto real.
            </p>
            <p>
              A responsabilidade inicial envolve estruturar sistemas no Unity, organizar o projeto no GitHub, criar documentação,
              montar o site oficial e preparar uma experiência de beta que possa ser testada por pessoas próximas antes de crescer.
            </p>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Filosofia do projeto" subtitle="Princípios que orientam cada versão de Tester." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((item) => (
            <GlowCard key={item.title}>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Ferramentas" subtitle="Base técnica e criativa usada no desenvolvimento do jogo e do site." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool) => (
            <GlowCard key={tool.name}>
              <p className="text-center text-sm font-semibold text-slate-100">{tool.name}</p>
              <p className="mt-2 text-center text-xs leading-5 text-slate-400">{tool.description}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Como o projeto evolui" subtitle="A construção de Tester é dividida em etapas claras e testáveis." />
        <div className="grid gap-4 md:grid-cols-3">
          <GlowCard>
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Etapa 1</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Demo jogável</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Consolidar movimentação, combate, mapa inicial, boss, checkpoints e feedback básico.</p>
          </GlowCard>
          <GlowCard>
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Etapa 2</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Beta fechado</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Liberar o jogo para pessoas próximas, coletar bugs e entender onde a experiência ainda confunde.</p>
          </GlowCard>
          <GlowCard>
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Etapa 3</p>
            <h3 className="mt-1 text-lg font-semibold text-white">Expansão</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">Melhorar visual, lore, personagens, novas rotas e sistemas antes de pensar em uma divulgação maior.</p>
          </GlowCard>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-16 text-center">
          <SectionTitle
            title="Acompanhe o desenvolvimento"
            subtitle="Se você gosta de projetos autorais, acompanhe as próximas versões de Tester e participe com feedback quando o beta estiver disponível."
          />
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
