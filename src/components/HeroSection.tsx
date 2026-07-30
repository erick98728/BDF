"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ForestSigil } from "./ForestSigil";
import { GameButton } from "./GameButton";
import { GameGlyph } from "./GameGlyph";

const heroStats = [
  { label: "Beta", value: "0.1 em preparação", icon: "beta" as const },
  { label: "Plataforma", value: "Windows", icon: "platform" as const },
  { label: "Foco", value: "Exploração e feedback", icon: "feedback" as const }
];

function HeroVisual() {
  return (
    <div className="pointer-events-none relative mx-auto mt-8 h-[280px] max-w-[430px] sm:h-[350px] lg:mt-0" aria-hidden="true">
      <div className="absolute inset-[-10%] rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(99,221,255,0.16),transparent_38%),radial-gradient(circle_at_68%_22%,rgba(168,85,247,0.16),transparent_36%),radial-gradient(circle_at_44%_80%,rgba(209,168,93,0.10),transparent_34%)] blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/[0.12] bg-black/[0.12] shadow-[inset_0_0_42px_rgba(99,221,255,0.06),0_0_60px_rgba(99,221,255,0.07)] sm:h-72 sm:w-72" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border border-amber-200/[0.14] bg-amber-300/[0.025]" />
      <div className="absolute left-[14%] top-[12%] h-16 w-16 rounded-full border border-purple-200/[0.10] bg-purple-300/[0.08] blur-[1px]" />
      <div className="absolute bottom-[12%] right-[8%] h-20 w-20 rounded-full border border-cyan-200/[0.10] bg-cyan-300/[0.07] blur-[1px]" />
      <div className="absolute left-[10%] right-[12%] top-[54%] h-12 rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-200/[0.14] to-transparent blur-2xl" />
      <div className="absolute left-[18%] right-[8%] top-[64%] h-10 rotate-[6deg] bg-gradient-to-r from-transparent via-purple-300/[0.13] to-transparent blur-2xl" />
      <ForestSigil className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.78]" />
      <div className="absolute left-[10%] top-[66%] rounded-2xl border border-cyan-200/[0.12] bg-[#050914]/60 px-3 py-2 shadow-[0_0_22px_rgba(99,221,255,0.1)] backdrop-blur-md">
        <GameGlyph name="map" variant="plain" className="h-6 w-6 text-cyan-100" />
      </div>
      <div className="absolute right-[11%] top-[18%] rounded-2xl border border-amber-200/[0.12] bg-[#050914]/60 px-3 py-2 shadow-[0_0_22px_rgba(209,168,93,0.1)] backdrop-blur-md">
        <GameGlyph name="ruin" variant="plain" className="h-6 w-6 text-amber-100" />
      </div>
      <div className="absolute bottom-[9%] left-[42%] rounded-2xl border border-purple-200/[0.12] bg-[#050914]/60 px-3 py-2 shadow-[0_0_22px_rgba(168,85,247,0.11)] backdrop-blur-md">
        <GameGlyph name="dash" variant="plain" className="h-6 w-6 text-purple-100" />
      </div>
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden min-h-[calc(100vh-72px)] py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(99,221,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(88,51,140,0.18),transparent_34%),radial-gradient(circle_at_68%_78%,rgba(209,168,93,0.08),transparent_34%)]" />
      <div className="absolute inset-x-[-12vw] bottom-0 h-36 bg-gradient-to-b from-transparent via-[#050914]/18 to-transparent blur-xl" />
      <div className="absolute left-[-8rem] top-12 hidden h-72 w-72 rounded-full bg-purple-400/[0.08] blur-3xl md:block" />
      <div className="absolute right-[-8rem] top-0 hidden h-80 w-80 rounded-full bg-cyan-300/[0.08] blur-3xl md:block" />
      <div className="absolute bottom-14 right-[8vw] hidden h-28 w-72 rotate-[-10deg] bg-gradient-to-r from-transparent via-amber-200/[0.08] to-transparent blur-2xl lg:block" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
            <div className="mb-5 inline-flex items-center gap-3 rounded-[1440px] border border-[#cecece] bg-transparent px-[11px] py-[5px] text-[11px] font-normal uppercase tracking-[-0.02em] text-white">
              <span className="h-px w-4 bg-[#cc6437]" />
              Site oficial · Em desenvolvimento
            </div>
            <h1 className="max-w-3xl text-[clamp(3.5rem,12vw,9rem)] font-normal uppercase leading-[0.9] tracking-[-0.04em] text-white">Protótipo</h1>
            <p className="mt-4 max-w-2xl font-[var(--font-pragmatica)] text-base leading-7 text-slate-200 normal-case sm:text-lg sm:leading-8">
              Um metroidvania sombrio de exploração e combate, perdido entre ruínas, névoa e segredos de um bosque antigo.
            </p>

            <div className="mt-7 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="rounded-[10px] border border-[#cecece]/20 bg-[#272a2a] px-3 py-3">
                  <div className="flex items-center gap-2">
                    <GameGlyph name={item.icon} variant="plain" className="h-4 w-4 text-cyan-200" />
                    <p className="text-[11px] uppercase tracking-[0.12em] text-cyan-200/75">{item.label}</p>
                  </div>
                  <p className="mt-1 font-normal text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
              <GameButton href="/download">Ver status do beta</GameButton>
              <GameButton href="/lore" variant="secondary">Conhecer o mundo</GameButton>
            </div>
          </motion.div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, ease: "easeOut" }}>
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
