export function MistDivider() {
  return (
    <div className="relative my-8 h-8 w-full overflow-hidden md:my-10">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-200/38 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-6 w-2/3 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-purple-300/12 to-transparent blur-md" />
      <div className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
    </div>
  );
}
