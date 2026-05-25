import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/GlowCard";
import { CharacterCard } from "@/components/CharacterCard";
import { DevlogCard } from "@/components/DevlogCard";
import { GameButton } from "@/components/GameButton";
import { SectionContainer } from "@/components/SectionContainer";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { characters, devlogs, homeFeatures } from "@/data/site";


export const metadata: Metadata = { title: "Início", description: "Portal oficial do metroidvania Tester.", openGraph: { title: "Início | Tester", description: "Portal oficial do metroidvania Tester." } };

export default function HomePage() {
  return (
    <AnimatedPageWrapper>
      <HeroSection />

      <SectionContainer>
        <SectionTitle
          title="Sobre o jogo"
          subtitle="Tester é um metroidvania 2D em desenvolvimento, focado em exploração, combate técnico e atmosfera sombria."
        />
        <GlowCard>
          <p className="text-slate-300">
            Você avança por regiões interconectadas, enfrenta criaturas hostis e desbloqueia habilidades para abrir novos caminhos.
            O objetivo desta fase é construir uma experiência sólida, coerente e desafiadora, sem promessas exageradas.
          </p>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Recursos do jogo" subtitle="Pilares centrais da experiência planejada para a versão beta." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map((feature) => (
            <GlowCard key={feature.title}>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Bosque da Névoa Perdida" subtitle="A primeira área jogável de Tester." />
        <GlowCard>
          <p className="text-slate-300">
            Uma floresta esquecida, coberta por névoa densa, com trilhas quebradas, caminhos ocultos e criaturas que patrulham as
            ruínas. Cada clareira esconde segredos que exigem atenção, domínio de movimentação e leitura de ambiente.
          </p>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Personagens" subtitle="Nomes confirmados e espaço para os próximos capítulos do jogo." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((c) => (
            <CharacterCard key={c.name} {...c} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <div className="text-center">
          <SectionTitle
            title="Participe do beta"
            subtitle="Tester está em desenvolvimento. Seu feedback ajuda a equilibrar combate, progressão e leitura do mundo."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <GameButton href="/download">Entrar no beta</GameButton>
            <GameButton href="/download" variant="secondary">Baixar beta</GameButton>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Devlog" subtitle="Atualizações recentes do desenvolvimento (conteúdo fictício inicial)." />
        <div className="grid gap-4 md:grid-cols-3">{devlogs.map((d) => <DevlogCard key={d.title} {...d} />)}</div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
