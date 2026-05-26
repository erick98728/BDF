export function MistDivider() {
  return (
    <div className="relative my-8 h-12 w-full overflow-hidden md:my-10" aria-hidden="true">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200/42 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-8 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-purple-300/14 to-transparent blur-lg" />
      <div className="absolute left-1/2 top-1/2 h-px w-36 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200/55 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-cyan-200/35 bg-cyan-300/5 shadow-[0_0_18px_rgba(99,221,255,0.18)]" />
      <div className="absolute left-[30%] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-amber-200/30" />
      <div className="absolute right-[30%] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border border-amber-200/30" />
    </div>
  );
}
