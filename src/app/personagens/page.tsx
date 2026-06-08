import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { CharacterShowcaseCard, type CharacterShowcase } from "@/components/CharacterShowcaseCard";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { loadSiteContent } from "@/lib/adminApi";

const currentCharacters: CharacterShowcase[] = [
  {
    name: "Rubens",
    functionLabel: "Protagonista",
    projectState: "Confirmado na Beta 0.1",
    badge: "Jogável",
    icon: "katana",
    visualKind: "rubens",
    description:
      "Personagem jogável do protótipo inicial. Rubens atravessa trilhas e clareiras do Bosque usando katana, Dash e leitura de rota.",
    betaRole: "Conduzir o jogador pela primeira leitura de movimentação, combate, exploração e progressão por habilidade.",
    abilities: ["Katana", "Dash", "Exploração", "Leitura de rotas"],
    altText: "Representação visual de Rubens, protagonista jogável de Tester."
  },
  {
    name: "Lucarelli",
    functionLabel: "Chefe",
    projectState: "Confirmado na Beta 0.1",
    badge: "Chefe inicial",
    icon: "boss",
    visualKind: "lucarelli",
    description:
      "Presença hostil ligada ao controle de passagem dentro do Bosque. Ele funciona como teste de domínio, tempo e leitura de arena.",
    betaRole: "Marcar o primeiro confronto importante da demo e validar se o jogador entendeu movimentação, ataque e posicionamento.",
    abilities: ["Pressão", "Investida", "Arena", "Bloqueio"],
    altText: "Representação visual de Lucarelli, chefe inicial de Tester."
  }
];

const enemyCharacters: CharacterShowcase[] = [
  {
    name: "Inimigos do Bosque",
    functionLabel: "Ameaças comuns",
    projectState: "Em teste na Beta 0.1",
    badge: "Inimigo",
    icon: "enemy",
    visualKind: "enemy",
    description:
      "Criaturas e presenças hostis usadas para ensinar ritmo, distância e cuidado durante a travessia das rotas iniciais.",
    betaRole: "Preparar o jogador para encontros maiores sem depender de explicações longas ou tutoriais excessivos.",
    abilities: ["Patrulha", "Pressão", "Interrupção", "Ritmo"],
    altText: "Representação visual dos inimigos comuns do Bosque da Névoa."
  }
];

const futureCharacters: CharacterShowcase[] = [
  {
    name: "Kin",
    functionLabel: "Reservado para futuro",
    projectState: "Fora da Beta 0.1",
    badge: "Reservado",
    icon: "future",
    visualKind: "future",
    description:
      "Reservado para etapa posterior do universo. Não faz parte do foco jogável atual e sua função narrativa permanece protegida.",
    betaRole: "Não participa da Beta 0.1 como personagem central. Serve apenas como sinal de expansão posterior do elenco.",
    abilities: ["Bloqueado", "Futuro", "Narrativa", "Mistério"],
    altText: "Representação visual reservada de Kin, personagem futuro de Tester."
  },
  {
    name: "Shico",
    functionLabel: "Reservado para futuro",
    projectState: "Fora da Beta 0.1",
    badge: "Reservado",
    icon: "fog",
    visualKind: "future",
    description:
      "Outro nome guardado para depois. Por enquanto, sua presença é uma reserva narrativa, não arte final nem promessa de participação.",
    betaRole: "Aparece apenas como reserva de universo, sem participação ativa prometida na build atual.",
    abilities: ["Bloqueado", "Futuro", "Névoa", "Segredo"],
    altText: "Representação visual reservada de Shico, personagem futuro de Tester."
  },
  {
    name: "Conteúdo reservado",
    functionLabel: "Arquivo reservado",
    projectState: "Fora da Beta 0.1",
    badge: "Reservado",
    icon: "lore",
    visualKind: "planned",
    description:
      "Espaço para nomes, ameaças e encontros que só serão definidos depois que o trecho inicial estiver validado.",
    betaRole: "Manter a página preparada para expansão sem prometer artes finais, funções definitivas ou presença na Beta 0.1.",
    abilities: ["Reservado", "Expansão", "Sem arte final", "A definir"],
    altText: "Representação visual abstrata de conteúdo planejado para personagens futuros."
  }
];

export const metadata: Metadata = {
  title: "Personagens",
  description: "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens reservados para depois da Beta 0.1 no universo de Tester.",
  alternates: { canonical: "/personagens" },
  openGraph: {
    title: "Personagens | Tester",
    description: "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens reservados para depois da Beta 0.1 no universo de Tester.",
    url: "/personagens"
  },
  twitter: {
    card: "summary_large_image",
    title: "Personagens | Tester",
    description: "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens reservados para depois da Beta 0.1 no universo de Tester."
  }
};

export default async function CharactersPage() {
  const siteContent = await loadSiteContent();
  const editableCharacters = siteContent.characters;
  const editableCurrentCharacters: CharacterShowcase[] = editableCharacters.current.length ? editableCharacters.current : currentCharacters;
  const editableEnemyCharacters: CharacterShowcase[] = editableCharacters.enemies.length ? editableCharacters.enemies : enemyCharacters;
  const editableFutureCharacters: CharacterShowcase[] = editableCharacters.future.length ? editableCharacters.future : futureCharacters;

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Personagens"
        description={editableCharacters.intro.description}
      />

      <SectionContainer>
        <GlowCard contentClassName="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(99,221,255,0.14),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(209,168,93,0.10),transparent_34%)]" />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{editableCharacters.intro.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{editableCharacters.intro.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{editableCharacters.intro.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                <GameGlyph name="katana" variant="plain" className="mb-2 h-5 w-5 text-cyan-100" />
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Jogável</p>
                <p className="mt-1 text-sm font-medium text-white">Rubens</p>
              </div>
              <div className="rounded-xl border border-amber-200/10 bg-black/20 px-4 py-3">
                <GameGlyph name="boss" variant="plain" className="mb-2 h-5 w-5 text-amber-100" />
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Chefe</p>
                <p className="mt-1 text-sm font-medium text-white">Lucarelli</p>
              </div>
              <div className="rounded-xl border border-purple-200/10 bg-black/20 px-4 py-3">
                <GameGlyph name="future" variant="plain" className="mb-2 h-5 w-5 text-purple-100" />
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Reservas</p>
                <p className="mt-1 text-sm font-medium text-white">Fora da Beta 0.1</p>
              </div>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Elenco atual" subtitle="Foco atual da Beta 0.1: protagonista jogável e primeiro confronto importante." />
        <div className="grid gap-4 lg:grid-cols-2">
          {editableCurrentCharacters.map((character) => (
            <CharacterShowcaseCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Ameaças do Bosque" subtitle="Inimigos e presenças usadas para ensinar ritmo, risco e leitura de espaço." />
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          {editableEnemyCharacters.map((character) => (
            <CharacterShowcaseCard key={character.name} character={character} />
          ))}
          <GlowCard contentClassName="flex h-full flex-col justify-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <GameGlyph name="fog" className="h-12 w-12 border-emerald-200/20 bg-emerald-300/10 text-emerald-100" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/80">Função de design</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Ameaças simples, leitura importante.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Os inimigos comuns não precisam revelar lore demais. Eles existem para criar pressão, ensinar distância e preparar o jogador para Lucarelli.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Reservado para depois" subtitle="Conteúdo reservado com detalhes preservados para manter mistério e evitar promessas prematuras." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {editableFutureCharacters.map((character) => (
            <CharacterShowcaseCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
