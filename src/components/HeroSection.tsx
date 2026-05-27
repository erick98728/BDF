"use client";

import { motion } from "framer-motion";
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
    <div className="pointer-events-none relative mx-auto mt-10 h-[310px] max-w-[430px] sm:h-[360px] lg:mt-0" aria-hidden="true">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_40%,rgba(99,221,255,0.18),transparent_36%),radial-gradient(circle_at_68%_22%,rgba(168,85,247,0.2),transparent_34%),radial-gradient(circle_at_44%_80%,rgba(209,168,93,0.12),transparent_32%)] blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/15 bg-black/20 shadow-[inset_0_0_42px_rgba(99,221,255,0.08),0_0_60px_rgba(99,221,255,0.08)] sm:h-72 sm:w-72" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border border-amber-200/18 bg-amber-300/[0.03]" />
      <div className="absolute left-[14%] top-[12%] h-16 w-16 rounded-full border border-purple-200/15 bg-purple-300/10 blur-[1px]" />
      <div className="absolute bottom-[12%] right-[8%] h-20 w-20 rounded-full border border-cyan-200/15 bg-cyan-300/8 blur-[1px]" />
      <div className="absolute left-[10%] right-[12%] top-[54%] h-12 rotate-[-8deg] bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent blur-xl" />
      <div className="absolute left-[18%] right-[8%] top-[64%] h-10 rotate-[6deg] bg-gradient-to-r from-transparent via-purple-300/18 to-transparent blur-xl" />
      <ForestSigil className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-95" />
      <div className="absolute left-[10%] top-[66%] rounded-2xl border border-cyan-200/15 bg-[#050914]/70 px-3 py-2 shadow-[0_0_22px_rgba(99,221,255,0.12)] backdrop-blur-md">
        <GameGlyph name="map" variant="plain" className="h-6 w-6 text-cyan-100" />
      </div>
      <div className="absolute right-[11%] top-[18%] rounded-2xl border border-amber-200/15 bg-[#050914]/70 px-3 py-2 shadow-[0_0_22px_rgba(209,168,93,0.12)] backdrop-blur-md">
        <GameGlyph name="ruin" variant="plain" className="h-6 w-6 text-amber-100" />
      </div>
      <div className="absolute bottom-[9%] left-[42%] rounded-2xl border border-purple-200/15 bg-[#050914]/70 px-3 py-2 shadow-[0_0_22px_rgba(168,85,247,0.13)] backdrop-blur-md">
        <GameGlyph name="dash" variant="plain" className="h-6 w-6 text-purple-100" />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="absolute inset-x-0 bottom-8 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
      <div className="absolute left-[-6rem] top-12 hidden h-64 w-64 rounded-full bg-purple-400/10 blur-3xl md:block" />
      <div className="absolute right-[-5rem] top-0 hidden h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl md:block" />
      <div className="absolute bottom-14 right-16 hidden h-28 w-72 rotate-[-10deg] bg-gradient-to-r from-transparent via-amber-200/12 to-transparent blur-xl lg:block" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-200/20 bg-cyan-300/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_24px_rgba(99,221,255,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(99,221,255,0.8)]" />
            Site oficial · Em desenvolvimento
          </div>
          <h1 className="max-w-3xl text-5xl font-black tracking-wide text-white drop-shadow-[0_0_30px_rgba(99,221,255,0.16)] sm:text-6xl md:text-7xl">Tester</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Um metroidvania sombrio sobre mistério, técnica e sobrevivência, perdido entre ruínas, névoa e ecos de um bosque antigo.
          </p>

          <div className="mt-7 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="rounded-xl border border-cyan-200/12 bg-black/25 px-3 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <GameGlyph name={item.icon} variant="plain" className="h-4 w-4 text-cyan-200" />
                  <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/75">{item.label}</p>
                </div>
                <p className="mt-1 font-medium text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <GameButton href="/download">Ver status do beta</GameButton>
            <GameButton href="/lore" variant="secondary">Conhecer o mundo</GameButton>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, ease: "easeOut" }}>
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
