export function BackgroundFog() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(99,221,255,0.12),transparent_28%),radial-gradient(circle_at_88%_16%,rgba(88,51,140,0.22),transparent_32%),radial-gradient(circle_at_70%_84%,rgba(18,70,48,0.18),transparent_34%)]" />
      <div className="absolute inset-x-0 top-24 h-28 rotate-[-4deg] bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-2xl" />
      <div className="absolute inset-x-0 bottom-24 h-32 rotate-[5deg] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent blur-2xl" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
    </div>
  );
}
