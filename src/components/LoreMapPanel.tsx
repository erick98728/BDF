import { GameGlyph, type GameGlyphName } from "./GameGlyph";

type InterestPoint = {
  label: string;
  detail: string;
  icon: GameGlyphName;
  tone: string;
};

const interestPoints: InterestPoint[] = [
  { label: "Clareira velada", detail: "ponto de entrada", icon: "fog", tone: "text-cyan-100" },
  { label: "Ruína partida", detail: "sinal antigo", icon: "ruin", tone: "text-amber-100" },
  { label: "Rota pós-Dash", detail: "passagem em teste", icon: "dash", tone: "text-purple-100" },
  { label: "Eco hostil", detail: "ameaça próxima", icon: "enemy", tone: "text-emerald-100" }
];

export function LoreMapPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-200/15 bg-black/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_0_40px_rgba(99,221,255,0.08)] sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(99,221,255,0.14),transparent_30%),radial-gradient(circle_at_72%_72%,rgba(209,168,93,0.10),transparent_32%),radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_38%)]" />
      <div className="absolute left-[-10%] right-[-10%] top-12 h-16 rotate-[-6deg] bg-gradient-to-r from-transparent via-cyan-200/12 to-transparent blur-2xl" />
      <div className="absolute left-[-8%] right-[-8%] bottom-16 h-20 rotate-[5deg] bg-gradient-to-r from-transparent via-purple-300/10 to-transparent blur-2xl" />

      <div className="relative grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="relative min-h-[280px] overflow-hidden rounded-xl border border-white/10 bg-[#050914]/45 p-3 sm:min-h-[330px]">
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px]" />
          <svg viewBox="0 0 440 320" className="relative h-full min-h-[260px] w-full text-cyan-100" fill="none" aria-hidden="true">
            <path d="M44 248C78 180 142 220 174 154C202 96 266 100 294 148C326 204 364 156 398 82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 11" opacity="0.68" />
            <path d="M82 254C116 230 144 236 169 264" stroke="#d1a85d" strokeWidth="1.4" strokeLinecap="round" opacity="0.46" />
            <path d="M182 151C212 168 236 168 265 146" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity="0.44" />
            <path d="M274 150C304 138 324 120 338 92" stroke="#63ddff" strokeWidth="1.2" strokeLinecap="round" opacity="0.36" />
            <path d="M116 88h78M130 105h44M278 232h84M294 248h42" stroke="#63ddff" strokeWidth="1" strokeLinecap="round" opacity="0.24" />
            <path d="M58 72 92 48 126 72 92 98 58 72Z" stroke="#d1a85d" strokeWidth="1" opacity="0.24" />
            <path d="M314 58 350 30 386 58 350 86 314 58Z" stroke="#63ddff" strokeWidth="1" opacity="0.26" />
            <circle cx="44" cy="248" r="8" fill="#63ddff" opacity="0.86" />
            <circle cx="174" cy="154" r="7" fill="#d1a85d" opacity="0.8" />
            <circle cx="294" cy="148" r="7" fill="#a78bfa" opacity="0.78" />
            <circle cx="398" cy="82" r="8" fill="#6ee7b7" opacity="0.7" />
          </svg>

          <div className="absolute left-[9%] top-[72%] h-9 w-9 rounded-xl border border-cyan-200/15 bg-[#050914]/80 p-2 backdrop-blur-md">
            <GameGlyph name="fog" variant="plain" className="h-full w-full text-cyan-100" />
          </div>
          <div className="absolute left-[38%] top-[43%] h-9 w-9 rounded-xl border border-amber-200/15 bg-[#050914]/80 p-2 backdrop-blur-md">
            <GameGlyph name="ruin" variant="plain" className="h-full w-full text-amber-100" />
          </div>
          <div className="absolute left-[65%] top-[42%] h-9 w-9 rounded-xl border border-purple-200/15 bg-[#050914]/80 p-2 backdrop-blur-md">
            <GameGlyph name="dash" variant="plain" className="h-full w-full text-purple-100" />
          </div>
          <div className="absolute right-[8%] top-[20%] h-9 w-9 rounded-xl border border-emerald-200/15 bg-[#050914]/80 p-2 backdrop-blur-md">
            <GameGlyph name="enemy" variant="plain" className="h-full w-full text-emerald-100" />
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-xl border border-cyan-200/10 bg-black/25 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/75">Mapa simbólico</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Não representa escala real do jogo. É uma leitura abstrata de caminhos, ruínas e bloqueios do beta.
            </p>
          </div>
          {interestPoints.map((point) => (
            <div key={point.label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <GameGlyph name={point.icon} variant="plain" className={`mt-0.5 h-5 w-5 ${point.tone}`} />
              <div>
                <h3 className="text-sm font-semibold text-white">{point.label}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{point.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
