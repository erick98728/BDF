import Link from "next/link";

const footerLinks = [
  ["Home", "/"],
  ["Download", "/download"],
  ["Lore", "/lore"],
  ["Personagens", "/personagens"],
  ["Studio", "/studio"],
  ["Devlog", "/devlog"],
  ["Galeria", "/galeria"],
  ["Login", "/login"],
  ["Feedback", "/feedback"]
] as const;

export function Footer() {
  return (
    <footer className="mt-14 border-t border-cyan-200/12 bg-[#050914]/70 py-8 shadow-[0_-18px_45px_rgba(0,0,0,0.22)] sm:mt-20 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-7 md:grid-cols-[1.2fr_1.8fr] md:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-50">Tester Studio</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-cyan-200/80">Toda névoa guarda uma verdade</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              Site oficial do metroidvania 2D Tester, reunindo beta, lore, devlog e feedback da comunidade.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Navegação</p>
            <div className="mt-3 grid grid-cols-2 gap-2 min-[420px]:grid-cols-3 md:flex md:flex-wrap md:justify-end">
              {footerLinks.map(([label, href]) => (
                <Link key={href} href={href} className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-slate-300 transition hover:border-cyan-200/20 hover:bg-cyan-300/8 hover:text-cyan-50">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-cyan-200/10 pt-5 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tester Studio. Todos os direitos reservados.</p>
          <p className="uppercase tracking-[0.14em] text-slate-400">Beta em desenvolvimento</p>
        </div>
      </div>
    </footer>
  );
}
