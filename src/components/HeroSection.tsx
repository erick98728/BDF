"use client";

import { motion } from "framer-motion";
import { ForestSigil } from "./ForestSigil";
import { GameButton } from "./GameButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      <div className="absolute inset-x-0 bottom-8 h-px bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent" />
      <div className="absolute right-[-4rem] top-10 hidden opacity-90 md:block">
        <ForestSigil />
      </div>
      <div className="absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl md:left-auto md:right-12 md:translate-x-0" />
      <div className="absolute bottom-10 right-10 hidden h-28 w-72 rotate-[-10deg] bg-gradient-to-r from-transparent via-amber-200/10 to-transparent blur-xl md:block" />

      <motion.div className="relative z-10 max-w-3xl" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-200/20 bg-cyan-300/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_24px_rgba(99,221,255,0.08)]">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(99,221,255,0.8)]" />
          Site oficial · Em desenvolvimento
        </div>
        <h1 className="text-5xl font-black tracking-wide text-white drop-shadow-[0_0_28px_rgba(99,221,255,0.13)] sm:text-6xl md:text-7xl">Tester</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
          Um metroidvania sombrio sobre mistério, técnica e sobrevivência, perdido entre ruínas, névoa e ecos de um bosque antigo.
        </p>
        <div className="mt-7 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          {[
            ["Beta", "0.1 em preparação"],
            ["Plataforma", "Windows"],
            ["Foco", "Exploração e feedback"]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-cyan-200/12 bg-black/20 px-3 py-3 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.16em] text-cyan-200/75">{label}</p>
              <p className="mt-1 font-medium text-slate-100">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
          <GameButton href="/download">Ver status do beta</GameButton>
          <GameButton href="/lore" variant="secondary">Conhecer o mundo</GameButton>
        </div>
      </motion.div>
    </section>
  );
}
