"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  cinematicContainer,
  cinematicItem,
  cinematicVisual,
  motionDurations,
  motionEasings,
} from "@/lib/motion";
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
        <circle
          cx="438"
          cy="133"
          r="8"
          className="hero-visual__node hero-visual__node--active"
        />
      </svg>
      <div className="hero-visual__sigil">
        <div className="hero-visual__sigil-motion">
          <ForestSigil className="!h-full !w-full" />
        </div>
      </div>
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
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="hero-section">
      <div className="hero-section__ambient" aria-hidden="true" />
      <div className="content-shell hero-section__inner">
        <div className="hero-section__grid">
          <motion.div
            className="hero-section__copy"
            variants={cinematicContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.p className="tester-kicker" variants={cinematicItem}>
              Site oficial · Em desenvolvimento
            </motion.p>
            <motion.h1 className="hero-section__title" variants={cinematicItem}>
              Protótipo
            </motion.h1>
            <motion.p
              className="hero-section__description"
              variants={cinematicItem}
            >
              Um metroidvania sombrio de exploração e combate, perdido entre
              ruínas, névoa e segredos de um bosque antigo.
            </motion.p>

            <motion.div
              className="hero-section__stats"
              variants={cinematicItem}
            >
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
            </motion.div>

            <motion.div
              className="hero-section__actions"
              variants={cinematicItem}
            >
              <GameButton href="/download">Ver status do beta</GameButton>
              <GameButton href="/lore" variant="secondary">
                Conhecer o mundo
              </GameButton>
            </motion.div>
          </motion.div>

          <motion.div
            variants={cinematicVisual}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <HeroVisual />
          </motion.div>
        </div>

        <motion.a
          className="hero-section__next"
          href="#visao-geral"
          initial={reduceMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : motionDurations.feedback,
            delay: reduceMotion ? 0 : 0.18,
            ease: motionEasings.enter,
          }}
        >
          <span>Visão geral</span>
          <span aria-hidden="true">↓</span>
        </motion.a>
      </div>
    </section>
  );
}
