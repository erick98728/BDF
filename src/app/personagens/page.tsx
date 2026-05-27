import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { CharacterShowcaseCard, type CharacterShowcase } from "@/components/CharacterShowcaseCard";
import { GameGlyph } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const currentCharacters: CharacterShowcase[] = [
  {
    name: "Rubens",
    functionLabel: "Protagonista",
    projectState: "Confirmado no beta",
    badge: "Jogável",
    icon: "katana",
    visualKind: "rubens",
    description:
      "Personagem jogável da fase beta. Rubens entra no Bosque da Névoa Perdida ainda em evolução, guiado por técnica, coragem e adaptação.",
    betaRole: "Conduzir o jogador pela primeira leitura de movimentação, combate, exploração e progressão por habilidade.",
    abilities: ["Katana", "Dash", "Exploração", "Leitura de rotas"]
  },
  {
    name: "Lucarelli",
    functionLabel: "Chefe",
    projectState: "Confirmado no beta",
    badge: "Chefe do beta",
    icon: "boss",
    visualKind: "lucarelli",
    description:
      "Presença hostil ligada ao controle de passagem dentro do Bosque. Ele funciona como teste de domínio, tempo e leitura de arena.",
    betaRole: "Marcar o primeiro confronto importante da demo e validar se o jogador entendeu movimentação, ataque e posicionamento.",
    abilities: ["Pressão", "Investida", "Arena", "Bloqueio"]
  }
];

const enemyCharacters: CharacterShowcase[] = [
  {
    name: "Inimigos do Bosque",
    functionLabel: "Ameaças comuns",
    projectState: "Presentes no beta",
    badge: "Inimigo",
    icon: "enemy",
    visualKind: "enemy",
    description:
      "Criaturas e presenças hostis usadas para ensinar ritmo, distância e cuidado durante a travessia das rotas iniciais.",
    betaRole: "Preparar o jogador para encontros maiores sem depender de explicações longas ou tutoriais excessivos.",
    abilities: ["Patrulha", "Pressão", "Interrupção", "Ritmo"]
  }
];

const futureCharacters: CharacterShowcase[] = [
  {
    name: "Kin",
    functionLabel: "Personagem futuro",
    projectState: "Em desenvolvimento",
    badge: "Planejado",
    icon: "future",
    visualKind: "future",
    description:
      "Reservado para uma etapa posterior do universo de Tester. A função narrativa permanece protegida para evitar antecipar conflitos ou alianças.",
    betaRole: "Não participa do beta inicial como personagem central. Serve como sinal de expansão futura do elenco.",
    abilities: ["Bloqueado", "Futuro", "Narrativa", "Mistério"]
  },
  {
    name: "Shico",
    functionLabel: "Personagem futuro",
    projectState: "Em desenvolvimento",
    badge: "Planejado",
    icon: "fog",
    visualKind: "future",
    description:
      "Outro nome planejado para o futuro do projeto. Por enquanto, sua presença é tratada como mistério e não como arte final revelada.",
    betaRole: "Aparecer apenas como planejamento de universo, sem prometer participação ativa na build atual.",
    abilities: ["Bloqueado", "Futuro", "Névoa", "Segredo"]
  },
  {
    name: "Conteúdo planejado",
    functionLabel: "Arquivo reservado",
    projectState: "Em preparação",
    badge: "Planejado",
    icon: "lore",
    visualKind: "planned",
    description:
      "Espaço para novos personagens, ameaças e encontros que serão definidos conforme o mapa, a lore e o beta evoluírem.",
    betaRole: "Manter a página preparada para expansão sem inventar artes finais, funções definitivas ou promessas grandes demais.",
    abilities: ["Reservado", "Expansão", "Sem arte final", "A definir"]
  }
];

export const metadata: Metadata = {
  title: "Personagens",
  description: "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens futuros planejados para Tester.",
  openGraph: {
    title: "Personagens | Tester",
    description: "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens futuros planejados para Tester."
  }
};

export default function CharactersPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Personagens"
        description="Catálogo oficial de personagens, inimigos e chefes de Tester, com foco no conteúdo confirmado para a fase beta."
      />

      <SectionContainer>
        <GlowCard contentClassName="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_10%,rgba(99,221,255,0.14),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(209,168,93,0.10),transparent_34%)]" />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Arquivo de elenco</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Perfis visuais sem arte final.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Os cards usam símbolos, silhuetas e marcas abstratas para apresentar função, estado do projeto e papel no beta sem fingir que as artes finais já existem.
              </p>
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
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Futuros</p>
                <p className="mt-1 text-sm font-medium text-white">Kin e Shico</p>
              </div>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Elenco atual" subtitle="Personagens e encontros confirmados para a experiência inicial do beta." />
        <div className="grid gap-4 lg:grid-cols-2">
          {currentCharacters.map((character) => (
            <CharacterShowcaseCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Ameaças do Bosque" subtitle="Inimigos e presenças usadas para ensinar ritmo, risco e leitura de espaço." />
        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          {enemyCharacters.map((character) => (
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
        <SectionTitle title="Personagens futuros" subtitle="Conteúdo planejado com detalhes preservados para manter mistério e evitar promessas prematuras." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {futureCharacters.map((character) => (
            <CharacterShowcaseCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
