import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import {
  CharacterShowcaseCard,
  type CharacterShowcase,
} from "@/components/CharacterShowcaseCard";
import { GameGlyph } from "@/components/GameGlyph";
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
    betaRole:
      "Conduzir o jogador pela primeira leitura de movimentação, combate, exploração e progressão por habilidade.",
    abilities: ["Katana", "Dash", "Exploração", "Leitura de rotas"],
    altText: "Representação visual de Rubens, protagonista jogável de Protótipo.",
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
    betaRole:
      "Marcar o primeiro confronto importante da demo e validar se o jogador entendeu movimentação, ataque e posicionamento.",
    abilities: ["Pressão", "Investida", "Arena", "Bloqueio"],
    altText: "Representação visual de Lucarelli, chefe inicial de Protótipo.",
  },
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
    betaRole:
      "Preparar o jogador para encontros maiores sem depender de explicações longas ou tutoriais excessivos.",
    abilities: ["Patrulha", "Pressão", "Interrupção", "Ritmo"],
    altText: "Representação visual dos inimigos comuns do Bosque da Névoa.",
  },
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
    betaRole:
      "Não participa da Beta 0.1 como personagem central. Serve apenas como sinal de expansão posterior do elenco.",
    abilities: ["Bloqueado", "Futuro", "Narrativa", "Mistério"],
    altText:
      "Representação visual reservada de Kin, personagem futuro de Protótipo.",
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
    betaRole:
      "Aparece apenas como reserva de universo, sem participação ativa prometida na build atual.",
    abilities: ["Bloqueado", "Futuro", "Névoa", "Segredo"],
    altText:
      "Representação visual reservada de Shico, personagem futuro de Protótipo.",
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
    betaRole:
      "Manter a página preparada para expansão sem prometer artes finais, funções definitivas ou presença na Beta 0.1.",
    abilities: ["Reservado", "Expansão", "Sem arte final", "A definir"],
    altText:
      "Representação visual abstrata de conteúdo planejado para personagens futuros.",
  },
];

export const metadata: Metadata = {
  title: "Personagens",
  description:
    "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens reservados para depois da Beta 0.1 no universo de Protótipo.",
  alternates: { canonical: "/personagens" },
  openGraph: {
    title: "Personagens | Protótipo",
    description:
      "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens reservados para depois da Beta 0.1 no universo de Protótipo.",
    url: "/personagens",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personagens | Protótipo",
    description:
      "Conheça Rubens, Lucarelli, inimigos do Bosque e personagens reservados para depois da Beta 0.1 no universo de Protótipo.",
  },
};

export default async function CharactersPage() {
  const siteContent = await loadSiteContent();
  const editableCharacters = siteContent.characters;
  const editableCurrentCharacters: CharacterShowcase[] = editableCharacters
    .current.length
    ? editableCharacters.current
    : currentCharacters;
  const editableEnemyCharacters: CharacterShowcase[] = editableCharacters
    .enemies.length
    ? editableCharacters.enemies
    : enemyCharacters;
  const editableFutureCharacters: CharacterShowcase[] = editableCharacters
    .future.length
    ? editableCharacters.future
    : futureCharacters;

  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Personagens"
        description={editableCharacters.intro.description}
      />

      <SectionContainer>
        <div className="dossier-intro">
          <div className="dossier-intro__copy">
            <p className="editorial-label">
              {editableCharacters.intro.eyebrow}
            </p>
            <h2>{editableCharacters.intro.title}</h2>
            <p>{editableCharacters.intro.description}</p>
          </div>
          <dl className="dossier-index">
            <div>
              <GameGlyph
                name="katana"
                variant="plain"
                className="dossier-index__glyph"
              />
              <dt>Jogável</dt>
              <dd>Rubens</dd>
            </div>
            <div>
              <GameGlyph
                name="boss"
                variant="plain"
                className="dossier-index__glyph dossier-index__glyph--ember"
              />
              <dt>Chefe</dt>
              <dd>Lucarelli</dd>
            </div>
            <div>
              <GameGlyph
                name="future"
                variant="plain"
                className="dossier-index__glyph dossier-index__glyph--muted"
              />
              <dt>Reservas</dt>
              <dd>Fora da Beta 0.1</dd>
            </div>
          </dl>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Elenco atual"
          subtitle="Foco atual da Beta 0.1: protagonista jogável e primeiro confronto importante."
        />
        <div className="character-dossier-grid character-dossier-grid--featured">
          {editableCurrentCharacters.map((character) => (
            <CharacterShowcaseCard
              key={character.name}
              character={character}
              emphasis="featured"
            />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Ameaças do Bosque"
          subtitle="Inimigos e presenças usadas para ensinar ritmo, risco e leitura de espaço."
        />
        <div className="character-threats">
          {editableEnemyCharacters.map((character) => (
            <CharacterShowcaseCard key={character.name} character={character} />
          ))}
          <aside className="character-design-note">
            <GameGlyph
              name="fog"
              variant="plain"
              className="character-design-note__glyph"
            />
            <div>
              <p className="editorial-label">Função de design</p>
              <h3>Ameaças simples, leitura importante.</h3>
              <p>
                  Os inimigos comuns não precisam revelar lore demais. Eles
                  existem para criar pressão, ensinar distância e preparar o
                  jogador para Lucarelli.
              </p>
            </div>
          </aside>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle
          title="Reservado para depois"
          subtitle="Conteúdo reservado com detalhes preservados para manter mistério e evitar promessas prematuras."
        />
        <div className="character-dossier-grid character-dossier-grid--reserved">
          {editableFutureCharacters.map((character) => (
            <CharacterShowcaseCard
              key={character.name}
              character={character}
              emphasis="reserved"
            />
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
