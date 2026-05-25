export function BackgroundFog() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-purple-700/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-900/30 blur-3xl" />
    </div>
  );
}
