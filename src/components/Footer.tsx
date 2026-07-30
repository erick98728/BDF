import Link from "next/link";
import { BetaBadge, TesterMark } from "./TesterVisualSystem";

const footerLinks = [
  ["Início", "/"],
  ["Download", "/download"],
  ["Lore", "/lore"],
  ["Personagens", "/personagens"],
  ["Studio", "/studio"],
  ["Devlog", "/devlog"],
  ["Roadmap", "/roadmap"],
  ["Galeria", "/galeria"],
  ["Login", "/login"],
  ["Feedback", "/feedback"],
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
            <p className="site-footer__nav-title">
              Navegação rápida
            </p>
            <div className="site-footer__links">
              {footerLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="site-footer__link nav-link-fx"
                >
                  {label}
                </Link>
              ))}
            </div>
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
