import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GameGlyph, type GameGlyphName } from "@/components/GameGlyph";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

type CharacterEntry = {
  name: string;
  type: string;
  description: string;
  role: string;
  abilities: string[];
  status: string;
  accent: string;
  icon: GameGlyphName;
  identity: string;
};

const mainCharacters: CharacterEntry[] = [
  {
    name: "Rubens",
    type: "Protagonista",
    description:
      "Rubens é o personagem jogável da fase beta. Ele entra no Bosque da Névoa Perdida ainda em processo de evolução, usando técnica, coragem e adaptação para atravessar uma região que não explica suas regras de forma direta.",
    role: "Conduzir o jogador pela primeira leitura de movimentação, exploração e progressão por habilidade.",
    abilities: ["Katana", "Pulo", "Dash desbloqueável", "Leitura de rotas"],
    status: "Jogável no beta",
    accent: "from-cyan-300/30 via-cyan-500/10 to-transparent",
    icon: "katana",
    identity: "Silhueta técnica, foco em corte limpo e mobilidade."
  },
  {
    name: "Lucarelli",
    type: "Chefe",
    description:
      "Lucarelli é uma presença ligada ao controle de passagem dentro do Bosque. Mais do que um desafio forte, ele funciona como teste de domínio: o jogador precisa entender movimentação, tempo e espaço antes de avançar.",
    role: "Bloquear a progressão inicial e marcar o primeiro encontro importante da demo.",
    abilities: ["Ataque próximo", "Investida", "Controle de arena", "Pressão territorial"],
    status: "Presente no beta",
    accent: "from-amber-300/30 via-amber-500/10 to-transparent",
    icon: "boss",
    identity: "Símbolo angular de chefe, pesado, sem representar arte final."
  },
  {
    name: "Inimigos do Bosque",
    type: "Criaturas do ambiente",
    description:
      "Os inimigos do Bosque são ameaças simples, mas importantes para ensinar ritmo, distância e cuidado. Eles aparecem em rotas de travessia, pontos de encontro e áreas que preparam o jogador para desafios maiores.",
    role: "Ensinar combate básico, cuidado com avanço apressado e controle de posição.",
    abilities: ["Pressão em grupo", "Ataque direto", "Patrulha de rota", "Interrupção de exploração"],
    status: "Presentes no beta",
    accent: "from-emerald-300/30 via-emerald-500/10 to-transparent",
    icon: "enemy",
    identity: "Máscara abstrata de ameaça comum, ligada ao ritmo do Bosque."
  }
];

const futureCharacters: CharacterEntry[] = [
  {
    name: "Kin",
    type: "Personagem futuro",
    description:
      "Kin está reservado para uma etapa posterior do universo de Tester. Sua função narrativa ainda não será detalhada para evitar antecipar conflitos, alianças ou mudanças de rota planejadas.",
    role: "Expandir o elenco e abrir novas possibilidades de história em versões futuras.",
    abilities: ["A definir", "A definir", "A definir"],
    status: "Em desenvolvimento",
    accent: "from-violet-300/25 via-violet-500/10 to-transparent",
    icon: "future",
    identity: "Forma bloqueada, sugerindo conteúdo futuro sem revelar design."
  },
  {
    name: "Shico",
    type: "Personagem futuro",
    description:
      "Shico também faz parte do planejamento futuro do projeto. Por enquanto, o perfil permanece controlado para manter o mistério e evitar promessas antes de a função no jogo estar definida.",
    role: "Aparecer em uma etapa posterior, conforme a lore e o mapa forem expandidos.",
    abilities: ["A definir", "A definir", "A definir"],
    status: "Em desenvolvimento",
    accent: "from-fuchsia-300/25 via-fuchsia-500/10 to-transparent",
    icon: "fog",
    identity: "Névoa e memória como leitura visual, sem arte final revelada."
  },
  {
    name: "Outros personagens",
    type: "Planejado",
    description:
      "Novos nomes serão liberados conforme o universo de Tester ganhar regiões, conflitos e objetivos mais claros. A prioridade atual é consolidar a primeira demo jogável.",
    role: "Ampliar o mundo sem comprometer o foco do beta inicial.",
    abilities: ["Conteúdo bloqueado", "Conteúdo bloqueado", "Conteúdo bloqueado"],
    status: "Em preparação",
    accent: "from-slate-300/20 via-slate-500/10 to-transparent",
    icon: "lore",
    identity: "Marcador de arquivo, usado apenas para indicar espaço reservado."
  }
];

function DetailedCharacterCard({ character }: { character: CharacterEntry }) {
  return (
    <GlowCard contentClassName="flex h-full flex-col">
      <div className={`relative mb-4 h-28 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${character.accent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.16),transparent_32%),linear-gradient(135deg,transparent,rgba(0,0,0,0.24))]" />
        <GameGlyph name={character.icon} variant="plain" className="absolute right-4 top-4 h-14 w-14 text-white/75 drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]" />
        <div className="absolute bottom-3 left-3 h-8 w-20 rounded-full border border-white/10 bg-black/20 blur-[1px]" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">{character.type}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{character.name}</h3>
        </div>
        <GameGlyph name={character.icon} className="h-10 w-10" />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{character.description}</p>

      <div className="mt-4 rounded-lg border border-cyan-200/15 bg-black/20 px-3 py-3">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Identidade visual</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{character.identity}</p>
      </div>

      <div className="mt-4 rounded-lg border border-cyan-200/15 bg-black/20 px-3 py-3">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Função no jogo</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">{character.role}</p>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Habilidades e leitura</p>
        <ul className="mt-2 grid gap-2 text-sm text-slate-300">
          {character.abilities.map((ability) => (
            <li key={ability} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">{ability}</li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-4">
        <div className="rounded-lg border border-amber-200/15 bg-black/20 px-3 py-2">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Status</p>
          <p className="mt-1 text-sm font-medium text-slate-100">{character.status}</p>
        </div>
      </div>
    </GlowCard>
  );
}

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
        <SectionTitle title="Elenco atual" subtitle="Perfis jogáveis, ameaças e encontros presentes no beta inicial." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mainCharacters.map((character) => (
            <DetailedCharacterCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Personagens futuros" subtitle="Conteúdo planejado com detalhes preservados para manter mistério e evitar spoilers." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {futureCharacters.map((character) => (
            <DetailedCharacterCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
