export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Arquivo da Névoa</p>
      <h1 className="mt-2 text-4xl font-bold text-white">{title}</h1>
      <p className="mt-3 max-w-2xl text-slate-300">{description}</p>
    </section>
  );
}
