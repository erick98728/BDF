"use client";

import { motion } from "framer-motion";
import { GameButton } from "./GameButton";

export function HeroSection() {
  return (
    <section className="relative py-16 sm:py-20 md:py-28">
      <div className="absolute inset-x-0 bottom-8 h-px bg-gradient-to-r from-transparent via-cyan-200/18 to-transparent" />
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Site oficial · Em desenvolvimento</p>
        <h1 className="mt-4 text-5xl font-black tracking-wide text-white sm:text-6xl md:text-7xl">Tester</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
          Um metroidvania sombrio sobre mistério, técnica e sobrevivência.
        </p>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
          <GameButton href="/download">Ver status do beta</GameButton>
          <GameButton href="/lore" variant="secondary">Conhecer o mundo</GameButton>
        </div>
      </motion.div>
    </section>
  );
}
