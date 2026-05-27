import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/GlowCard";
import { CharacterCard } from "@/components/CharacterCard";
import { DevlogCard } from "@/components/DevlogCard";
import { GameButton } from "@/components/GameButton";
import { GameGlyph } from "@/components/GameGlyph";
import { SectionContainer } from "@/components/SectionContainer";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { characters, devlogs, homeFeatures } from "@/data/site";

export const metadata: Metadata = {
  title: "Início",
  description: "Portal oficial de Tester, metroidvania 2D sombrio com beta, lore, personagens e devlog de desenvolvimento.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Início | Tester",
    description: "Portal oficial de Tester, metroidvania 2D sombrio com beta, lore, personagens e devlog de desenvolvimento.",
    url: "/"
  },
  twitter: {
    card: "summary",
    title: "Tester | Site Oficial",
    description: "Portal oficial de Tester, metroidvania 2D sombrio com beta, lore, personagens e devlog de desenvolvimento."
  }
};

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <GameGlyph name="fog" className="h-12 w-12" />
            <p className="text-slate-300">
              Você avança por regiões interconectadas, enfrenta criaturas hostis e desbloqueia habilidades para abrir novos caminhos.
              O objetivo desta fase é construir uma experiência sólida, coerente e desafiadora, sem promessas exageradas.
            </p>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Recursos do jogo" subtitle="Pilares centrais da experiência planejada para a versão beta." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map((feature) => (
            <GlowCard key={feature.title} contentClassName="flex min-h-[178px] flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="max-w-[13rem] text-lg font-semibold text-white">{feature.title}</h3>
                <GameGlyph name={feature.icon} />
              </div>
              <p className="mt-auto text-sm leading-6 text-slate-300">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Bosque da Névoa Perdida" subtitle="A primeira área jogável de Tester." />
        <GlowCard>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <GameGlyph name="ruin" className="h-12 w-12 border-amber-200/20 bg-amber-300/10 text-amber-100" />
            <p className="text-slate-300">
              Uma floresta esquecida, coberta por névoa densa, com trilhas quebradas, caminhos ocultos e criaturas que patrulham as
              ruínas. Cada clareira esconde segredos que exigem atenção, domínio de movimentação e leitura de ambiente.
            </p>
          </div>
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
          <div className="mx-auto mb-6 flex max-w-md justify-center gap-3 rounded-2xl border border-cyan-200/10 bg-black/15 p-3">
            <GameGlyph name="download" />
            <GameGlyph name="feedback" className="border-purple-200/20 bg-purple-300/10 text-purple-100" />
            <GameGlyph name="beta" className="border-amber-200/20 bg-amber-300/10 text-amber-100" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <GameButton href="/download">Ver status do beta</GameButton>
            <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Devlog" subtitle="Atualizações recentes do desenvolvimento." />
        <div className="grid gap-4 md:grid-cols-3">{devlogs.map((d) => <DevlogCard key={d.title} {...d} />)}</div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
