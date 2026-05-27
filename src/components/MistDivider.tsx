export function MistDivider() {
  return (
    <div className="relative my-6 h-14 w-full overflow-hidden opacity-60 md:my-8" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-10 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-px w-2/3 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200/14 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200/16 to-transparent blur-sm" />
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-cyan-200/14 bg-cyan-300/5" />
      <div className="absolute left-1/3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border border-amber-200/10" />
      <div className="absolute right-1/3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border border-amber-200/10" />
    </div>
  );
}
