"use client";

import { useEffect, useState } from "react";
import { GameGlyph, type GameGlyphName } from "./GameGlyph";
import { GlowCard } from "./GlowCard";

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
    frame: "border-cyan-200/20 bg-cyan-300/10",
    glyph: "text-cyan-100",
    badge: "border-cyan-200/25 bg-cyan-300/10 text-cyan-100",
    aura: "bg-cyan-300/[0.18]",
    marker: "bg-cyan-200",
  },
  lucarelli: {
    frame: "border-amber-200/25 bg-amber-300/10",
    glyph: "text-amber-100",
    badge: "border-amber-200/30 bg-amber-300/10 text-amber-100",
    aura: "bg-amber-300/[0.18]",
    marker: "bg-amber-200",
  },
  enemy: {
    frame: "border-emerald-200/20 bg-emerald-300/10",
    glyph: "text-emerald-100",
    badge: "border-emerald-200/25 bg-emerald-300/10 text-emerald-100",
    aura: "bg-emerald-300/[0.16]",
    marker: "bg-emerald-200",
  },
  future: {
    frame: "border-purple-200/20 bg-purple-300/10",
    glyph: "text-purple-100",
    badge: "border-purple-200/25 bg-purple-300/10 text-purple-100",
    aura: "bg-purple-300/[0.16]",
    marker: "bg-purple-200",
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
      className={`premium-panel relative h-48 ${style.frame}`}
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
      className={`premium-panel relative h-48 ${style.frame}`}
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
  const cardVariant =
    emphasis === "featured"
      ? "highlight"
      : emphasis === "reserved"
        ? "flat"
        : "quiet";
  const visualClass =
    emphasis === "reserved" ? "opacity-75 grayscale-[0.15]" : "";

  return (
    <GlowCard
      variant={cardVariant}
      contentClassName={`flex h-full flex-col ${emphasis === "featured" ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}
    >
      <div className={visualClass}>
        <CharacterVisualMedia character={character} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${style.badge}`}
        >
          {character.badge}
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-slate-300">
          {character.projectState}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/75">
          {character.functionLabel}
        </p>
        <h3
          className={`${emphasis === "featured" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} mt-1 font-bold text-white`}
        >
          {character.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {character.description}
        </p>
      </div>

      <div
        className={`sub-card mt-5 px-4 py-3 ${emphasis === "reserved" ? "opacity-80" : ""}`}
      >
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
          Papel no beta
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-200">
          {character.betaRole}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
          Leitura rápida
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {character.abilities.map((ability) => (
            <span
              key={ability}
              className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300"
            >
              {ability}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}
