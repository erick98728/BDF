export function BackgroundFog() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(99,221,255,0.12),transparent_28%),radial-gradient(circle_at_88%_16%,rgba(88,51,140,0.22),transparent_32%),radial-gradient(circle_at_70%_84%,rgba(18,70,48,0.18),transparent_34%)]" />
      <div className="fog-orb left-[8%] top-[18%] h-56 w-56" />
      <div className="fog-orb right-[4%] top-[38%] h-72 w-72 bg-[radial-gradient(circle,rgba(209,168,93,0.10),transparent_62%)]" />
      <div className="fog-orb bottom-[8%] left-[35%] h-64 w-64 bg-[radial-gradient(circle,rgba(88,51,140,0.18),transparent_62%)]" />
      <div className="absolute inset-x-0 top-24 h-28 rotate-[-4deg] bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-2xl" />
      <div className="absolute inset-x-0 top-[42%] h-20 rotate-[2deg] bg-gradient-to-r from-transparent via-purple-300/9 to-transparent blur-xl" />
      <div className="absolute inset-x-0 bottom-24 h-32 rotate-[5deg] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent blur-2xl" />
      <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(99,221,255,0.34)_1px,transparent_1px),radial-gradient(rgba(209,168,93,0.18)_1px,transparent_1px)] [background-position:0_0,22px_30px] [background-size:68px_68px,96px_96px]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_42%,rgba(0,0,0,0.34)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
    </div>
  );
}
