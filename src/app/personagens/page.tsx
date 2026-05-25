import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

type CharacterEntry = {
  name: string;
  type: string;
  description: string;
  abilities: string[];
  status: string;
  accent: string;
};

const mainCharacters: CharacterEntry[] = [
  {
    name: "Rubens",
    type: "Protagonista",
    description: "Um jovem lutador em desenvolvimento, guiado por técnica, coragem e descoberta.",
    abilities: ["Katana", "Pulo", "Dash (desbloqueável)"],
    status: "Jogável no beta",
    accent: "from-cyan-300/30 via-cyan-500/10 to-transparent"
  },
  {
    name: "Lucarelli",
    type: "Chefe",
    description:
      "Guardião hostil do Bosque da Névoa Perdida, responsável por bloquear a passagem rumo ao domínio do Dash.",
    abilities: ["Ataque próximo", "Investida", "Defesa territorial"],
    status: "Presente no beta",
    accent: "from-amber-300/30 via-amber-500/10 to-transparent"
  },
  {
    name: "Inimigos do Bosque",
    type: "Criaturas hostis",
    description: "Seres simples, agressivos e espalhados pelas rotas do Bosque.",
    abilities: ["Pressão em grupo", "Ataque direto", "Patrulha de rota"],
    status: "Presentes no beta",
    accent: "from-emerald-300/30 via-emerald-500/10 to-transparent"
  }
];

const futureCharacters: CharacterEntry[] = [
  {
    name: "Kin",
    type: "Em desenvolvimento",
    description: "Perfil ainda bloqueado para evitar spoilers de progressão narrativa.",
    abilities: ["A definir", "A definir", "A definir"],
    status: "Em desenvolvimento",
    accent: "from-violet-300/25 via-violet-500/10 to-transparent"
  },
  {
    name: "Shico",
    type: "Em desenvolvimento",
    description: "Detalhes em preparação para próximas atualizações de conteúdo.",
    abilities: ["A definir", "A definir", "A definir"],
    status: "Em desenvolvimento",
    accent: "from-fuchsia-300/25 via-fuchsia-500/10 to-transparent"
  },
  {
    name: "Outros personagens",
    type: "Planejado",
    description: "Novos nomes serão liberados conforme o universo de Tester for expandido.",
    abilities: ["Conteúdo bloqueado", "Conteúdo bloqueado", "Conteúdo bloqueado"],
    status: "Em preparação",
    accent: "from-slate-300/20 via-slate-500/10 to-transparent"
  }
];

function DetailedCharacterCard({ character }: { character: CharacterEntry }) {
  return (
    <GlowCard>
      <div className={`mb-4 h-28 rounded-xl border border-white/10 bg-gradient-to-br ${character.accent}`} />
      <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">{character.type}</p>
      <h3 className="mt-1 text-xl font-semibold text-white">{character.name}</h3>
      <p className="mt-3 text-sm text-slate-300">{character.description}</p>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Habilidades</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
          {character.abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4 rounded-lg border border-cyan-200/15 bg-black/20 px-3 py-2">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Status</p>
        <p className="mt-1 text-sm font-medium text-slate-100">{character.status}</p>
      </div>
    </GlowCard>
  );
}


export const metadata: Metadata = { title: "Personagens", description: "Catálogo de personagens, inimigos e chefes de Tester.", openGraph: { title: "Personagens | Tester", description: "Catálogo de personagens, inimigos e chefes de Tester." } };

export default function CharactersPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader
        title="Personagens"
        description="Catálogo oficial de personagens, inimigos e chefes de Tester na fase beta."
      />

      <SectionContainer>
        <SectionTitle title="Elenco atual" subtitle="Perfis jogáveis e confrontos presentes no beta." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mainCharacters.map((character) => (
            <DetailedCharacterCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Personagens futuros" subtitle="Conteúdo bloqueado para preservar mistério e progressão." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {futureCharacters.map((character) => (
            <DetailedCharacterCard key={character.name} character={character} />
          ))}
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
