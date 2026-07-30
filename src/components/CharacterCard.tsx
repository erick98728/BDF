import { GameGlyph, type GameGlyphName } from "./GameGlyph";
import { GlowCard } from "./GlowCard";

export function CharacterCard({ name, role, bio, icon }: { name: string; role: string; bio: string; icon: GameGlyphName }) {
  return (
    <GlowCard variant="character" contentClassName="flex min-h-[12rem] flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">{role}</p>
          <h3 className="mt-2 break-words text-xl font-semibold text-white">{name}</h3>
        </div>
        <GameGlyph name={icon} className="border-emerald-200/20 bg-emerald-300/10 text-emerald-100" />
      </div>
      <p className="mt-auto text-sm leading-6 text-slate-300">{bio}</p>
    </GlowCard>
  );
}
