export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="py-16">
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="mt-3 max-w-2xl text-slate-300">{description}</p>
    </section>
  );
}
