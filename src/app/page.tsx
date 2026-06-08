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
import { characters, devlogs, homeFeatures, homePillars } from "@/data/site";
import { loadSiteContent } from "@/lib/adminApi";

export const metadata: Metadata = {
  title: "Início",
  description: "Portal oficial de Tester, metroidvania 2D sombrio em protótipo jogável com trilhas conectadas, katana, Dash, devlog e roadmap público.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tester | Site Oficial do Jogo Indie",
    description: "Portal oficial de Tester, metroidvania 2D sombrio em protótipo jogável com trilhas conectadas, katana, Dash, devlog e roadmap público.",
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tester | Site Oficial do Jogo Indie",
    description: "Portal oficial de Tester, metroidvania 2D sombrio em protótipo jogável com trilhas conectadas, katana, Dash, devlog e roadmap público."
  }
};

function AbstractMapPanel() {
  return (
    <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-cyan-200/15 bg-black/20 p-5" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_22%,rgba(99,221,255,0.16),transparent_32%),radial-gradient(circle_at_76%_72%,rgba(209,168,93,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_38%)]" />
      <svg viewBox="0 0 360 230" className="relative h-full min-h-[210px] w-full text-cyan-100" fill="none">
        <path d="M36 174C78 116 114 154 145 103C174 57 218 71 245 104C271 137 298 124 326 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 10" opacity="0.66" />
        <path d="M71 184C91 165 115 166 132 185" stroke="#d1a85d" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M208 84C230 89 247 105 257 126" stroke="#a78bfa" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
        <circle cx="36" cy="174" r="8" fill="#63ddff" opacity="0.82" />
        <circle cx="145" cy="103" r="6" fill="#d1a85d" opacity="0.78" />
        <circle cx="245" cy="104" r="7" fill="#63ddff" opacity="0.7" />
        <circle cx="326" cy="72" r="9" fill="#a78bfa" opacity="0.72" />
        <path d="M128 58h48M140 72h25M226 164h54M238 178h30" stroke="#63ddff" strokeWidth="1.2" strokeLinecap="round" opacity="0.32" />
      </svg>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#050914]/70 px-3 py-2 backdrop-blur-md">
        <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/85">Trilha da build</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-amber-100/80">Rotas em teste</span>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const siteContent = await loadSiteContent();

  return (
    <AnimatedPageWrapper>
      <HeroSection />

      <div className="section-rhythm">
      <SectionContainer>
        <SectionTitle
          eyebrow="Visão geral"
          title="O que é Tester?"
          subtitle="Um metroidvania 2D sombrio em protótipo, focado em trilhas conectadas, combate de katana, Dash e leitura de rota."
        />
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <GlowCard variant="highlight" contentClassName="flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <GameGlyph name="fog" className="h-14 w-14" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">{siteContent.home.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{siteContent.home.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{siteContent.home.description}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {homePillars.map((pillar) => (
                <div key={pillar.title} className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/70">{pillar.eyebrow}</p>
                    <GameGlyph name={pillar.icon} variant="plain" className="h-5 w-5 text-cyan-100" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pillar.description}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard variant="panel" contentClassName="flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">Estado atual</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Protótipo Beta 0.1 em validação</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Este é o portal oficial do projeto. O trecho inicial está sendo preparado para teste fechado, com foco em controle, rota, arena e ciclo de feedback.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Área inicial</p>
                <p className="mt-1 text-sm font-medium text-slate-100">Bosque da Névoa Perdida</p>
              </div>
              <div className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Objetivo do teste</p>
                <p className="mt-1 text-sm font-medium text-slate-100">Validar katana, Dash, checkpoints e leitura de rota</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Protótipo" title="Sistemas em foco" subtitle="O que já orienta o protótipo jogável e o que ainda passa por ajuste." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map((feature) => (
            <GlowCard key={feature.title} variant="quiet" contentClassName="flex min-h-[190px] flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/65">Sistema</p>
                  <h3 className="mt-1 max-w-[13rem] text-lg font-semibold text-white">{feature.title}</h3>
                </div>
                <GameGlyph name={feature.icon} />
              </div>
              <p className="mt-auto text-sm leading-6 text-slate-300">{feature.description}</p>
            </GlowCard>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Área inicial" title="Bosque da Névoa Perdida" subtitle="Primeira área de validação: trilhas, clareiras, atalhos, bloqueios e arena inicial." />
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <AbstractMapPanel />
          <GlowCard variant="panel" contentClassName="flex h-full flex-col justify-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <GameGlyph name="ruin" className="h-12 w-12 border-amber-200/20 bg-amber-300/10 text-amber-100" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Região inicial</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Trilhas, clareiras e bloqueios legíveis.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  Uma floresta esquecida com trilhas quebradas, clareiras de combate, atalhos e criaturas próximas às ruínas. Cada bloqueio deve ajudar o jogador a entender movimentação, retorno e leitura de ambiente.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Elenco" title="Personagens" subtitle="Rubens e Lucarelli no foco atual; outros nomes ficam reservados para depois." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {characters.map((c) => (
            <CharacterCard key={c.name} {...c} />
          ))}
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <GlowCard variant="highlight" contentClassName="relative overflow-hidden p-5 text-center sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,221,255,0.16),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(168,85,247,0.12),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mx-auto mb-5 flex w-fit justify-center gap-3 rounded-2xl border border-cyan-200/10 bg-black/20 p-3">
              <GameGlyph name="download" />
              <GameGlyph name="feedback" className="border-purple-200/20 bg-purple-300/10 text-purple-100" />
              <GameGlyph name="beta" className="border-amber-200/20 bg-amber-300/10 text-amber-100" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Ciclo de teste fechado</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Acompanhe progresso, roadmap e feedback.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              O site mostra o estado da build interna, registra feedbacks e publica devlogs/roadmap para separar o que já funciona, o que está em teste e o que fica para depois.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <GameButton href="/roadmap">Ver roadmap</GameButton>
              <GameButton href="/devlog" variant="subtle">Ler devlog</GameButton>
              <GameButton href="/download" variant="ghost">Estado da build</GameButton>
              <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle eyebrow="Progresso" title="Devlog" subtitle="Atualizações recentes do desenvolvimento." />
        <div className="grid gap-4 md:grid-cols-3">{devlogs.map((d) => <DevlogCard key={d.title} {...d} />)}</div>
      </SectionContainer>
      </div>
    </AnimatedPageWrapper>
  );
}
