import type { Metadata } from "next";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { GlowCard } from "@/components/GlowCard";
import { PageHeader } from "@/components/PageHeader";
import { SectionContainer } from "@/components/SectionContainer";
import { SectionTitle } from "@/components/SectionTitle";

const philosophy = [
  "Aprender criando",
  "Criar um universo próprio",
  "Valorizar feedback",
  "Evoluir a cada versão",
  "Construir com comunidade"
];

const tools = ["Unity", "C#", "GitHub", "Web", "Design e documentação"];


export const metadata: Metadata = { title: "Studio", description: "Sobre o desenvolvimento indie de Tester.", openGraph: { title: "Studio | Tester", description: "Sobre o desenvolvimento indie de Tester." } };

export default function StudioPage() {
  return (
    <AnimatedPageWrapper>
      <PageHeader title="Studio" description="Desenvolvimento independente com visão autoral, técnica e evolução contínua." />

      <SectionContainer>
        <SectionTitle title="Sobre o projeto" subtitle="Tester é um jogo independente em desenvolvimento." />
        <GlowCard>
          <p className="text-slate-300">
            O projeto nasceu como uma jornada prática de aprendizado e construção. Tester combina estudo técnico, direção criativa e
            iteração constante para formar um universo próprio, com identidade sombria e foco em gameplay consistente.
          </p>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Sobre o desenvolvedor" subtitle="Apresentação profissional, sem exposição de dados sensíveis." />
        <GlowCard>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>Desenvolvedor indie brasileiro.</li>
            <li>Estudante e criador em evolução contínua.</li>
            <li>Interesse em programação, jogos e narrativa interativa.</li>
            <li>Responsável pelo desenvolvimento inicial do projeto Tester.</li>
          </ul>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Filosofia do projeto" subtitle="Princípios que orientam cada versão de Tester." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {philosophy.map((item) => (
            <GlowCard key={item}>
              <p className="text-sm font-medium text-slate-200">{item}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Ferramentas" subtitle="Base técnica e criativa usada no desenvolvimento." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((tool) => (
            <GlowCard key={tool}>
              <p className="text-center text-sm font-semibold text-slate-100">{tool}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="pb-16 text-center">
          <SectionTitle
            title="Acompanhe o desenvolvimento"
            subtitle="Se você gosta de projetos autorais, acompanhe as próximas versões de Tester e participe com feedback."
          />
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
