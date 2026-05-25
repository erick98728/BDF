import Link from "next/link";
import { GlowCard } from "@/components/GlowCard";

export default function NotFound() {
  return (
    <div className="py-24">
      <GlowCard>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Névoa instável</p>
        <h1 className="mt-2 text-4xl font-bold text-white">404 — Trilha não encontrada</h1>
        <p className="mt-3 text-slate-300">Esta rota se perdeu no Bosque da Névoa Perdida.</p>
        <Link href="/" className="mt-5 inline-flex rounded-lg border border-cyan-200/30 px-4 py-2 text-sm text-cyan-100">Voltar ao início</Link>
      </GlowCard>
    </div>
  );
}
