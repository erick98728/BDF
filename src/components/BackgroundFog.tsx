import { GlowOrb } from "./GlowOrb";

export function BackgroundFog() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <GlowOrb className="-left-28 top-12 h-80 w-80 bg-cyan-400/18" />
      <GlowOrb className="right-[-8rem] top-24 h-96 w-96 bg-purple-700/26" />
      <GlowOrb className="bottom-[-6rem] left-1/3 h-80 w-80 bg-emerald-800/24" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(233,238,255,0.28)_1px,transparent_1px)] [background-size:30px_30px]" />
    </div>
  );
}
