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

type HeroVisualProps = {
  reduceMotion: boolean;
};

function routeMotion(reduceMotion: boolean, delay: number) {
  return {
    initial: reduceMotion ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      duration: reduceMotion ? 0 : motionDurations.cinematic,
      delay: reduceMotion ? 0 : delay,
      ease: motionEasings.enter,
    },
  };
}

function HeroVisual({ reduceMotion }: HeroVisualProps) {
  return (
    <div className="hero-visual" aria-hidden="true">
      <motion.div
        className="hero-visual__halo"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : motionDurations.cinematic,
          ease: motionEasings.enter,
        }}
      />
      <svg
        viewBox="0 0 560 520"
        className="hero-visual__map"
        fill="none"
      >
        <motion.path
          d="M24 403C98 351 124 384 181 309C224 252 211 197 284 172C356 147 394 199 438 133C471 84 512 94 548 47"
          className="hero-visual__route hero-visual__route--main"
          {...routeMotion(reduceMotion, 0.12)}
        />
        <motion.path
          d="M181 309C239 335 284 323 329 282C371 244 411 261 465 225"
          className="hero-visual__route hero-visual__route--secondary"
          {...routeMotion(reduceMotion, 0.26)}
        />
        <motion.path
          d="M284 172C252 124 222 99 166 87"
          className="hero-visual__route hero-visual__route--secondary"
          {...routeMotion(reduceMotion, 0.34)}
        />
        <motion.path
          d="M75 430h138M96 449h78M378 64h126M407 84h68"
          className="hero-visual__record-line"
          {...routeMotion(reduceMotion, 0.42)}
        />
        {[
          { cx: 181, cy: 309, r: 7, active: false, delay: 0.38 },
          { cx: 284, cy: 172, r: 6, active: false, delay: 0.48 },
          { cx: 438, cy: 133, r: 8, active: true, delay: 0.58 },
        ].map((node) => (
          <motion.circle
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            className={`hero-visual__node${node.active ? " hero-visual__node--active" : ""}`}
            initial={reduceMotion ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : motionDurations.feedback,
              delay: reduceMotion ? 0 : node.delay,
              ease: motionEasings.enter,
            }}
          />
        ))}
      </svg>
      <div className="hero-visual__sigil">
        <motion.div
          className="hero-visual__sigil-motion"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: reduceMotion ? 0 : motionDurations.cinematic,
            delay: reduceMotion ? 0 : 0.3,
            ease: motionEasings.enter,
          }}
        >
          <ForestSigil className="!h-full !w-full" />
        </motion.div>
      </div>
      <motion.span
        className="hero-visual__coordinate hero-visual__coordinate--origin"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.5 }}
      >
        01 · Bosque
      </motion.span>
      <motion.span
        className="hero-visual__coordinate hero-visual__coordinate--ruin"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.58 }}
      >
        Ruína
      </motion.span>
      <motion.span
        className="hero-visual__coordinate hero-visual__coordinate--route"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 0.66 }}
      >
        Rota em teste
      </motion.span>
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
            <HeroVisual reduceMotion={reduceMotion} />
          </motion.div>
        </div>

        <motion.a
          className="hero-section__next"
          href="#visao-geral"
          initial={reduceMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : motionDurations.enter,
            delay: reduceMotion ? 0 : 0.72,
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
