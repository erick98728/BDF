export function MistDivider() {
  return (
    <div className="relative my-10 h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
      <div className="absolute inset-0 blur-sm bg-gradient-to-r from-transparent via-purple-300/15 to-transparent" />
    </div>
  );
}
