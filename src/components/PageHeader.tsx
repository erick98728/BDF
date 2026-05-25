export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="py-14 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/90">Arquivo da Névoa</p>
      <h1 className="mt-3 text-4xl font-black tracking-wide text-white md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{description}</p>
    </section>
  );
}
