import { GameGlyph, type GameGlyphName } from "./GameGlyph";
import { GlowCard } from "./GlowCard";

export function DevlogCard({ title, date, excerpt, icon }: { title: string; date: string; excerpt: string; icon: GameGlyphName }) {
  return (
    <GlowCard contentClassName="flex flex-col">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-cyan-300">{date}</p>
        <GameGlyph name={icon} className="h-10 w-10" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{excerpt}</p>
    </GlowCard>
  );
}
