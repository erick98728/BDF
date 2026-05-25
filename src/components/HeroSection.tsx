"use client";

import { motion } from "framer-motion";
import { GameButton } from "./GameButton";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Site oficial · Em desenvolvimento</p>
        <h1 className="mt-3 text-5xl font-black text-white md:text-7xl">Tester</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-300">
          Um metroidvania sombrio sobre mistério, técnica e sobrevivência.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <GameButton href="/download">Baixar beta</GameButton>
          <GameButton href="/lore" variant="secondary">Conhecer o mundo</GameButton>
        </div>
      </motion.div>
    </section>
  );
}
