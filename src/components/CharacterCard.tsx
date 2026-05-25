import { GlowCard } from "./GlowCard";

export function CharacterCard({ name, role, bio }: { name: string; role: string; bio: string }) {
  return (
    <GlowCard>
      <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">{role}</p>
      <h3 className="mt-2 text-xl font-semibold text-white">{name}</h3>
      <p className="mt-3 text-sm text-slate-300">{bio}</p>
    </GlowCard>
  );
}
