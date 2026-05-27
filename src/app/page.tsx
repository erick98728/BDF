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
        <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/85">Trilha do beta</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-amber-100/80">Rotas em teste</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <AnimatedPageWrapper>
      <HeroSection />

      <SectionContainer>
        <SectionTitle
          title="O que é Tester?"
          subtitle="Um metroidvania 2D sombrio em desenvolvimento, construído em torno de exploração, técnica e atmosfera."
        />
        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
          <GlowCard contentClassName="flex h-full flex-col justify-between p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <GameGlyph name="fog" className="h-14 w-14" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Arquivo principal</p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Mistério, katana e caminhos ocultos.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  Tester acompanha Rubens atravessando o Bosque da Névoa Perdida, uma primeira área pensada para testar movimentação, combate e leitura de mapa sem entregar todas as respostas de uma vez.
                </p>
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
                  <p className="mt-2 text-xs leading-5 text-slate-400">{pillar.description}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          <GlowCard contentClassName="flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-amber-200/80">Estado atual</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Beta 0.1 em preparação</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A Home apresenta o projeto como site oficial, mas mantém claro que o jogo ainda está em desenvolvimento e depende de testes para evoluir.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Área inicial</p>
                <p className="mt-1 text-sm font-medium text-slate-100">Bosque da Névoa Perdida</p>
              </div>
              <div className="rounded-xl border border-cyan-200/10 bg-black/20 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Objetivo do beta</p>
                <p className="mt-1 text-sm font-medium text-slate-100">Validar combate, mapa e clareza visual</p>
              </div>
            </div>
          </GlowCard>
        </div>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Recursos do jogo" subtitle="Pilares centrais da experiência planejada para a versão beta." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map((feature) => (
            <GlowCard key={feature.title} contentClassName="flex min-h-[190px] flex-col">
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
        <SectionTitle title="Bosque da Névoa Perdida" subtitle="A primeira área jogável de Tester, apresentada como um espaço denso, conectado e misterioso." />
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <AbstractMapPanel />
          <GlowCard contentClassName="flex h-full flex-col justify-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <GameGlyph name="ruin" className="h-12 w-12 border-amber-200/20 bg-amber-300/10 text-amber-100" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Região inicial</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Uma trilha tomada por névoa.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  Uma floresta esquecida, coberta por névoa densa, com trilhas quebradas, caminhos ocultos e criaturas que patrulham ruínas. Cada clareira esconde segredos que exigem atenção, domínio de movimentação e leitura de ambiente.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
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
        <GlowCard contentClassName="relative overflow-hidden p-5 text-center sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,221,255,0.16),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(168,85,247,0.12),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mx-auto mb-5 flex w-fit justify-center gap-3 rounded-2xl border border-cyan-200/10 bg-black/20 p-3">
              <GameGlyph name="download" />
              <GameGlyph name="feedback" className="border-purple-200/20 bg-purple-300/10 text-purple-100" />
              <GameGlyph name="beta" className="border-amber-200/20 bg-amber-300/10 text-amber-100" />
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Painel oficial do beta</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Participe quando a build estiver liberada.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Tester ainda está em desenvolvimento. A página de download mostra o status do beta, e o feedback ajuda a equilibrar combate, progressão e leitura do mundo.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <GameButton href="/download">Ver status do beta</GameButton>
              <GameButton href="/feedback" variant="secondary">Enviar feedback</GameButton>
            </div>
          </div>
        </GlowCard>
      </SectionContainer>

      <SectionContainer withDivider>
        <SectionTitle title="Devlog" subtitle="Atualizações recentes do desenvolvimento." />
        <div className="grid gap-4 md:grid-cols-3">{devlogs.map((d) => <DevlogCard key={d.title} {...d} />)}</div>
      </SectionContainer>
    </AnimatedPageWrapper>
  );
}
