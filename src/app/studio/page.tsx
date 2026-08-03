import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameButton } from "@/components/GameButton";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const philosophy: { title: string; text: string; icon: GameGlyphName }[] = [
  {
    title: "Aprender criando",
    icon: "tool",
    text: "Cada versão do projeto serve para testar ideias, corrigir problemas reais e transformar estudo em experiência jogável.",
  },
  {
    title: "Criar um universo próprio",
    icon: "lore",
    text: "Protótipo busca uma identidade própria, com clima sombrio, exploração conectada e personagens que crescem junto com o jogo.",
  },
  {
    title: "Valorizar feedback",
    icon: "feedback",
    text: "O ciclo de teste existe para ouvir jogadores, encontrar problemas de clareza e melhorar ritmo, combate, mapa e dificuldade.",
  },
  {
    title: "Evoluir a cada versão",
    icon: "build",
    text: "A prioridade é avançar de forma consistente, sem fingir que tudo está pronto antes da hora.",
  },
  {
    title: "Construir com comunidade",
    icon: "user",
    text: "Amigos, testadores e jogadores interessados ajudam a perceber detalhes que passam despercebidos durante o desenvolvimento.",
  },
];

const tools: { name: string; description: string; icon: GameGlyphName }[] = [
  {
    name: "Unity",
    icon: "tool",
    description: "Base do jogo 2D e das cenas de teste.",
  },
  {
    name: "C#",
    icon: "build",
    description: "Lógica de jogador, inimigos, checkpoints e sistemas.",
  },
  {
    name: "GitHub",
    icon: "checklist",
    description: "Controle de versão, organização e histórico do projeto.",
  },
  {
    name: "Next.js",
    icon: "platform",
    description: "Site oficial, páginas públicas e portal de teste.",
  },
  {
    name: "Documentação",
    icon: "lore",
    description: "Planejamento de mapa, feedback, download e evolução.",
  },
];

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Conheça a visão independente por trás de Protótipo, um jogo indie brasileiro em protótipo jogável, feedback e evolução real.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Studio | Protótipo",
    description:
      "Conheça a visão independente por trás de Protótipo, um jogo indie brasileiro em protótipo jogável, feedback e evolução real.",
    url: "/studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio | Protótipo",
    description:
      "Conheça a visão independente por trás de Protótipo, um jogo indie brasileiro em protótipo jogável, feedback e evolução real.",
  },
};

export default function StudioPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Studio"
        description="Desenvolvimento independente, aprendizado técnico e construção gradual de um universo próprio."
      />

      <SectionContainer>
        <SectionTitle
          title="Sobre o projeto"
          subtitle="Protótipo é um jogo indie em protótipo jogável, criado com foco em evolução real."
        />
        <article className="studio-manifesto">
          <GameGlyph
            name="studio"
            variant="plain"
            className="studio-manifesto__glyph"
          />
          <div>
            <p>
              Protótipo é um metroidvania 2D sombrio em construção, com foco
              inicial no Bosque da Névoa Perdida, combate com katana, Dash,
              checkpoints e leitura de rota. O projeto está em ciclo de
              protótipo jogável, por isso cada página, sistema e área testável
              existe para validar uma parte pequena da experiência.
            </p>
            <p>
              A proposta não é parecer um estúdio gigante, e sim apresentar um
              projeto autoral de forma séria, honesta e organizada. O objetivo
              é evoluir o jogo por versões, validar ideias com jogadores e
              transformar feedback em ajustes concretos de controle, mapa e
              clareza.
            </p>
          </div>
        </article>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Sobre o desenvolvedor"
          subtitle="Uma apresentação profissional, sem expor dados pessoais sensíveis."
        />
        <article className="studio-manifesto studio-manifesto--secondary">
          <GameGlyph
            name="user"
            variant="plain"
            className="studio-manifesto__glyph"
          />
          <div>
            <p>
              Protótipo é conduzido por um desenvolvedor indie brasileiro em
              formação, interessado em programação, jogos, narrativa e criação
              de experiências interativas. O projeto funciona como um espaço
              de aprendizado prático, onde código, design, documentação e testes
              se encontram em um produto real.
            </p>
            <p>
              A responsabilidade inicial envolve estruturar sistemas no Unity,
              organizar o projeto no GitHub, criar documentação, montar o site
              oficial e preparar uma build interna que possa ser testada por
              pessoas próximas antes de qualquer divulgação maior.
            </p>
          </div>
        </article>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Filosofia do projeto"
          subtitle="Princípios que orientam cada versão de Protótipo."
        />
        <ol className="studio-principles">
          {philosophy.map((item, index) => (
            <li key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <GameGlyph name={item.icon} variant="plain" />
            </li>
          ))}
        </ol>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Ferramentas"
          subtitle="Base técnica e criativa usada no desenvolvimento do jogo e do site."
        />
        <dl className="studio-tools">
          {tools.map((tool) => (
            <div key={tool.name}>
              <GameGlyph name={tool.icon} variant="plain" />
              <dt>{tool.name}</dt>
              <dd>{tool.description}</dd>
            </div>
          ))}
        </dl>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Como o projeto evolui"
          subtitle="A construção de Protótipo é dividida em etapas claras e testáveis. O roadmap público separa o que já funciona, o que está em teste e o que fica para depois."
        />
        <ol className="studio-evolution">
          <li>
            <div>
              <p className="editorial-label">Etapa 1</p>
              <GameGlyph name="build" variant="plain" />
            </div>
            <h3>Demo jogável</h3>
            <p>
              Consolidar movimentação, combate, mapa inicial, boss, checkpoints
              e feedback básico.
            </p>
          </li>
          <li>
            <div>
              <p className="editorial-label">Etapa 2</p>
              <GameGlyph name="beta" variant="plain" />
            </div>
            <h3>Beta fechado</h3>
            <p>
              Liberar um trecho fechado para pessoas próximas, coletar bugs e
              entender onde controle, mapa ou arena ainda confundem.
            </p>
          </li>
          <li>
            <div>
              <p className="editorial-label">Etapa 3</p>
              <GameGlyph name="future" variant="plain" />
            </div>
            <h3>Expansão</h3>
            <p>
              Melhorar visual, narrativa ambiental, rotas e sistemas depois que
              a Beta 0.1 estiver validada.
            </p>
          </li>
        </ol>
        <div className="mt-5">
          <GameButton href="/roadmap" variant="secondary">
            Ver roadmap completo
          </GameButton>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-16 text-center">
          <SectionTitle
            title="Acompanhe o desenvolvimento"
            subtitle="Se você gosta de projetos autorais, acompanhe as próximas versões de Protótipo e participe com feedback quando a build estiver disponível."
          />
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
