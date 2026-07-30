import Link from "next/link";
import { BetaBadge, TesterMark } from "./TesterVisualSystem";

const footerGroups = [
  {
    title: "Explorar",
    links: [
      ["Início", "/"],
      ["Lore", "/lore"],
      ["Personagens", "/personagens"],
      ["Galeria", "/galeria"],
    ],
  },
  {
    title: "Projeto",
    links: [
      ["Download", "/download"],
      ["Studio", "/studio"],
      ["Devlog", "/devlog"],
      ["Roadmap", "/roadmap"],
    ],
  },
  {
    title: "Participar",
    links: [
      ["Login", "/login"],
      ["Feedback", "/feedback"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-shell">
        <div className="site-footer__grid">
          <div>
            <div className="flex items-center gap-3">
              <TesterMark compact />
              <div>
                <p className="site-footer__name">
                  Estúdio Protótipo
                </p>
                <p className="site-footer__motto">
                  Toda névoa guarda uma verdade
                </p>
              </div>
            </div>
            <p className="site-footer__description">
              Site oficial do metroidvania 2D Protótipo, reunindo protótipo
              jogável, roadmap, devlog e feedback do ciclo fechado.
            </p>
            <div className="mt-4">
              <BetaBadge>Protótipo em validação</BetaBadge>
            </div>
          </div>

          <nav className="site-footer__nav" aria-label="Links do rodapé">
            {footerGroups.map((group) => (
              <div key={group.title} className="site-footer__group">
                <p className="site-footer__nav-title">{group.title}</p>
                <div className="site-footer__links">
                  {group.links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="site-footer__link"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__legal">
          <p>© 2026 Estúdio Protótipo. Todos os direitos reservados.</p>
          <p className="site-footer__status">
            Protótipo em validação
          </p>
        </div>
      </div>
    </footer>
  );
}
