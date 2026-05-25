import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { GlowCard } from "@/components/GlowCard";
import { CharacterCard } from "@/components/CharacterCard";
import { DevlogCard } from "@/components/DevlogCard";
import { GameButton } from "@/components/GameButton";
import { SectionContainer } from "@/components/SectionContainer";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { characters, devlogs } from "@/data/site";

export default function HomePage() {
  return (
    <AnimatedPageWrapper>
      <HeroSection />
      <SectionContainer>
        <SectionTitle title="Sobre o jogo" subtitle="Tester é uma jornada densa de exploração, combate técnico e mistério." />
        <GlowCard><p className="text-slate-300">No coração do Bosque da Névoa Perdida, cada ruína reage à sua presença. Desvende passagens ocultas, desbloqueie habilidades e sobreviva a entidades que lembram quem você foi.</p></GlowCard>
      </SectionContainer>
      <SectionContainer withDivider>
        <SectionTitle title="Personagens principais" />
        <div className="grid gap-4 md:grid-cols-3">{characters.map((c) => <CharacterCard key={c.name} {...c} />)}</div>
      </SectionContainer>
      <SectionContainer withDivider>
        <SectionTitle title="Lore resumida" />
        <GlowCard><p className="text-slate-300">A Névoa não surgiu naturalmente. Um pacto dourado corrompido rasgou o véu espiritual da floresta, prendendo almas entre planos. Tester começa quando uma voz ciana chama você pelo nome perdido.</p></GlowCard>
      </SectionContainer>
      <SectionContainer withDivider>
        <SectionTitle title="Devlog recente" />
        <div className="grid gap-4 md:grid-cols-3">{devlogs.map((d) => <DevlogCard key={d.title} {...d} />)}</div>
      </SectionContainer>
      <SectionContainer withDivider>
        <div className="pb-16 text-center">
          <SectionTitle title="Entre no beta fechado" subtitle="Teste primeiro, reporte direto ao estúdio e ajude a moldar o Bosque." />
          <GameButton href="/download">Quero participar</GameButton>
        </div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
