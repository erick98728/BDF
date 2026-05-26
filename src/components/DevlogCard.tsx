import { GlowCard } from "./GlowCard";

export function DevlogCard({ title, date, excerpt }: { title: string; date: string; excerpt: string }) {
  return (
    <GlowCard contentClassName="flex flex-col">
      <p className="text-xs text-cyan-300">{date}</p>
      <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{excerpt}</p>
    </GlowCard>
  );
}
