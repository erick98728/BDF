"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ForestSigil } from "./ForestSigil";
import { GameButton } from "./GameButton";
import { GameGlyph } from "./GameGlyph";

const heroStats = [
  { label: "Beta", value: "0.1 em preparação", icon: "beta" as const },
  { label: "Plataforma", value: "Windows", icon: "platform" as const },
  { label: "Foco", value: "Exploração e feedback", icon: "feedback" as const },
];

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-visual__halo" />
      <div className="hero-visual__orbit hero-visual__orbit--outer" />
      <div className="hero-visual__orbit hero-visual__orbit--inner" />
      <ForestSigil className="hero-visual__sigil" />
      <div className="hero-visual__glyph hero-visual__glyph--map">
        <GameGlyph name="map" variant="plain" className="h-6 w-6" />
      </div>
      <div className="hero-visual__glyph hero-visual__glyph--ruin">
        <GameGlyph name="ruin" variant="plain" className="h-6 w-6" />
      </div>
      <div className="hero-visual__glyph hero-visual__glyph--dash">
        <GameGlyph name="dash" variant="plain" className="h-6 w-6" />
      </div>
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section">
      <div className="hero-section__ambient" aria-hidden="true" />
      <div className="content-shell hero-section__inner">
        <div className="hero-section__grid">
          <motion.div
            className="hero-section__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tester-kicker">Site oficial · Em desenvolvimento</p>
            <h1 className="hero-section__title">Protótipo</h1>
            <p className="hero-section__description">
              Um metroidvania sombrio de exploração e combate, perdido entre
              ruínas, névoa e segredos de um bosque antigo.
            </p>

            <div className="hero-section__stats">
              {heroStats.map((item) => (
                <div key={item.label} className="hero-stat">
                  <div className="hero-stat__label">
                    <GameGlyph
                      name={item.icon}
                      variant="plain"
                      className="h-4 w-4"
                    />
                    <span>{item.label}</span>
                  </div>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="hero-section__actions">
              <GameButton href="/download">Ver status do beta</GameButton>
              <GameButton href="/lore" variant="secondary">
                Conhecer o mundo
              </GameButton>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
