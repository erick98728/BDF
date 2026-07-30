"use client";

import { useEffect, useState } from "react";
import { GameGlyph, type GameGlyphName } from "./GameGlyph";

export type CharacterVisualKind =
  | "rubens"
  | "lucarelli"
  | "enemy"
  | "future"
  | "planned";

export type CharacterShowcase = {
  name: string;
  functionLabel: string;
  projectState: string;
  badge: string;
  description: string;
  betaRole: string;
  abilities: string[];
  icon: GameGlyphName;
  visualKind: CharacterVisualKind;
  imageUrl?: string;
  altText?: string;
};

type VisualStyle = {
  frame: string;
  glyph: string;
  badge: string;
  aura: string;
  marker: string;
};

const visualStyles: Record<CharacterVisualKind, VisualStyle> = {
  rubens: {
    frame: "character-visual--route",
    glyph: "text-[var(--color-route-soft)]",
    badge: "border-[color:var(--color-route-border)] bg-[color:var(--color-route-subtle)] text-[var(--color-route-soft)]",
    aura: "bg-[color:var(--color-route-subtle)]",
    marker: "bg-[var(--color-route)]",
  },
  lucarelli: {
    frame: "character-visual--ember",
    glyph: "text-[var(--color-accent-soft)]",
    badge: "border-[color:var(--color-border-accent)] bg-[color:var(--surface-accent-subtle)] text-[var(--color-accent-soft)]",
    aura: "bg-[color:var(--surface-accent-subtle)]",
    marker: "bg-[var(--color-accent)]",
  },
  enemy: {
    frame: "character-visual--neutral",
    glyph: "text-[var(--color-text-muted)]",
    badge: "border-white/15 bg-white/[0.035] text-[var(--color-text-muted)]",
    aura: "bg-white/[0.06]",
    marker: "bg-[var(--color-text-muted)]",
  },
  future: {
    frame: "character-visual--neutral",
    glyph: "text-[var(--color-text-dim)]",
    badge: "border-white/10 bg-white/[0.025] text-[var(--color-text-dim)]",
    aura: "bg-white/[0.04]",
    marker: "bg-[var(--color-text-dim)]",
  },
  planned: {
    frame: "border-slate-200/15 bg-white/5",
    glyph: "text-slate-100",
    badge: "border-slate-200/15 bg-white/5 text-slate-200",
    aura: "bg-slate-300/10",
    marker: "bg-slate-300",
  },
};

function AbstractSilhouette({
  kind,
  icon,
}: {
  kind: CharacterVisualKind;
  icon: GameGlyphName;
}) {
  const style = visualStyles[kind];

  return (
    <div
      className={`character-visual relative h-48 ${style.frame}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(145deg,transparent,rgba(0,0,0,0.34))]" />
      <div
        className={`absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full ${style.aura} blur-2xl`}
      />
      <svg
        viewBox="0 0 260 190"
        className={`absolute inset-0 h-full w-full ${style.glyph}`}
        fill="none"
      >
        {kind === "rubens" ? (
          <>
            <path
              d="M130 32 153 70 143 132 130 158 117 132 107 70 130 32Z"
              fill="currentColor"
              opacity="0.12"
            />
            <path
              d="M130 40v106"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.52"
            />
            <path
              d="M94 134 166 62"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.68"
            />
            <path
              d="M84 146 103 127"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.42"
            />
            <path
              d="M104 146h52"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.32"
            />
          </>
        ) : kind === "lucarelli" ? (
          <>
            <path
              d="M130 22 201 88 130 168 59 88 130 22Z"
              fill="currentColor"
              opacity="0.10"
            />
            <path
              d="M130 30 193 88 130 160 67 88 130 30Z"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.54"
            />
            <path
              d="M94 88h72"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.52"
            />
            <path
              d="M103 112c16-14 38-14 54 0"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.42"
            />
            <path
              d="M83 58 56 46M177 58l27-12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.38"
            />
          </>
        ) : kind === "enemy" ? (
          <>
            <path
              d="M79 126C86 70 174 70 181 126C166 150 94 150 79 126Z"
              fill="currentColor"
              opacity="0.12"
            />
            <path
              d="M88 124c16-45 68-45 84 0"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.54"
            />
            <path
              d="M95 140c22 16 48 16 70 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.38"
            />
            <path
              d="M101 86 78 56M159 86l23-30"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.38"
            />
            <circle
              cx="112"
              cy="119"
              r="3"
              fill="currentColor"
              opacity="0.66"
            />
            <circle
              cx="148"
              cy="119"
              r="3"
              fill="currentColor"
              opacity="0.66"
            />
          </>
        ) : kind === "future" ? (
          <>
            <path
              d="M130 32 168 70 154 132 130 160 106 132 92 70 130 32Z"
              stroke="currentColor"
              strokeWidth="1.8"
              opacity="0.42"
            />
            <path
              d="M100 86h60M112 112h36"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.30"
            />
            <path
              d="M130 52v24M130 122v24M98 99h24M138 99h24"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.46"
            />
            <path
              d="M82 154h96"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              opacity="0.34"
            />
          </>
        ) : (
          <>
            <path
              d="M82 52h96v98H82V52Z"
              stroke="currentColor"
              strokeWidth="1.8"
              opacity="0.34"
            />
            <path
              d="M104 76h52M104 101h52M104 126h32"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.40"
            />
            <path
              d="M70 150h120"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="7 9"
              opacity="0.30"
            />
            <path
              d="M130 34v24M130 144v22M98 100h-24M186 100h-24"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              opacity="0.36"
            />
          </>
        )}
      </svg>
      <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-[#080908]/70 p-3 backdrop-blur-md">
        <GameGlyph
          name={icon}
          variant="plain"
          className={`h-7 w-7 ${style.glyph}`}
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#080908]/80 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.30)] backdrop-blur-md">
        <span className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
          perfil visual
        </span>
        <span className={`h-2 w-2 rounded-full ${style.marker}`} />
      </div>
    </div>
  );
}

function CharacterVisualMedia({ character }: { character: CharacterShowcase }) {
  const style = visualStyles[character.visualKind];
  const normalizedImageUrl = character.imageUrl?.trim();
  const safeAltText = character.altText?.trim() || character.name;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(normalizedImageUrl) && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [normalizedImageUrl]);

  if (!showImage) {
    return (
      <AbstractSilhouette kind={character.visualKind} icon={character.icon} />
    );
  }

  return (
    <div
      className={`character-visual relative h-48 ${style.frame}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- URLs de personagens são administráveis; `next/image` será avaliado após configurar domínios externos. */}
      <img
        src={normalizedImageUrl}
        alt={safeAltText}
        loading="lazy"
        decoding="async"
        data-fx-image="true"
        onError={() => setImageFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(145deg,rgba(0,0,0,0.10),rgba(0,0,0,0.56))]" />
      <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-[#080908]/80 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-md">
        <GameGlyph
          name={character.icon}
          variant="plain"
          className={`h-7 w-7 ${style.glyph}`}
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#080908]/80 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.30)] backdrop-blur-md">
        <span className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
          imagem real
        </span>
        <span className={`h-2 w-2 rounded-full ${style.marker}`} />
      </div>
    </div>
  );
}

export function CharacterShowcaseCard({
  character,
  emphasis = "standard",
}: {
  character: CharacterShowcase;
  emphasis?: "featured" | "standard" | "reserved";
}) {
  const style = visualStyles[character.visualKind];
  const visualClass =
    emphasis === "reserved" ? "opacity-75 grayscale-[0.15]" : "";

  return (
    <article
      className={`character-dossier character-dossier--${emphasis}`}
      data-fx-reveal="card"
    >
      <div className={`character-dossier__visual ${visualClass}`}>
        <CharacterVisualMedia character={character} />
      </div>

      <div className="character-dossier__copy">
        <div className="character-dossier__badges">
          <span className={style.badge}>{character.badge}</span>
          <span>{character.projectState}</span>
        </div>

        <div className="character-dossier__identity">
          <p className="editorial-label">{character.functionLabel}</p>
          <h3>{character.name}</h3>
          <p>{character.description}</p>
        </div>

        <div className="character-dossier__role">
          <p className="editorial-label">Papel no beta</p>
          <p>{character.betaRole}</p>
        </div>

        <div className="character-dossier__abilities">
          <p className="editorial-label">Leitura rápida</p>
          <ul>
            {character.abilities.map((ability) => (
              <li key={ability}>
                {ability}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
