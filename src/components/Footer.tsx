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
    <footer className="mt-20 border-t border-cyan-200/10 bg-slate-950/35 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex flex-wrap gap-2">
          {footerLinks.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-lg px-2 py-1 text-xs text-slate-300 hover:bg-white/5 hover:text-cyan-100">
              {label}
            </Link>
          ))}
        </div>
        <p className="text-sm font-medium text-slate-300">Tester Studio</p>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Toda névoa guarda uma verdade</p>
        <p className="mt-1 text-xs text-slate-500">© 2026 Tester Studio. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
