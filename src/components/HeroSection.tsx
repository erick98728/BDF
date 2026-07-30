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
      <svg
        viewBox="0 0 560 520"
        className="hero-visual__map"
        fill="none"
      >
        <path
          d="M24 403C98 351 124 384 181 309C224 252 211 197 284 172C356 147 394 199 438 133C471 84 512 94 548 47"
          className="hero-visual__route hero-visual__route--main"
        />
        <path
          d="M181 309C239 335 284 323 329 282C371 244 411 261 465 225"
          className="hero-visual__route hero-visual__route--secondary"
        />
        <path
          d="M284 172C252 124 222 99 166 87"
          className="hero-visual__route hero-visual__route--secondary"
        />
        <path
          d="M75 430h138M96 449h78M378 64h126M407 84h68"
          className="hero-visual__record-line"
        />
        <circle cx="181" cy="309" r="7" className="hero-visual__node" />
        <circle cx="284" cy="172" r="6" className="hero-visual__node" />
        <circle cx="438" cy="133" r="8" className="hero-visual__node hero-visual__node--active" />
      </svg>
      <ForestSigil className="hero-visual__sigil" />
      <span className="hero-visual__coordinate hero-visual__coordinate--origin">
        01 · Bosque
      </span>
      <span className="hero-visual__coordinate hero-visual__coordinate--ruin">
        Ruína
      </span>
      <span className="hero-visual__coordinate hero-visual__coordinate--route">
        Rota em teste
      </span>
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

        <a className="hero-section__next" href="#visao-geral">
          <span>Visão geral</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
