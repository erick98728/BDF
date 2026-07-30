"use client";

import { useEffect, useState } from "react";
import { GameGlyph, type GameGlyphName } from "./GameGlyph";

export type GalleryVisualKind =
  | "screenshot"
  | "concept"
  | "character"
  | "scene"
  | "video";

type GalleryVisualFrameProps = {
  kind: GalleryVisualKind;
  icon: GameGlyphName;
  label: string;
  status: "Prévia visual" | "Em desenvolvimento";
  size?: "card" | "modal";
  imageUrl?: string;
  altText?: string;
};

type VisualStyle = {
  frame: string;
  glyph: string;
  badge: string;
  glow: string;
  label: string;
};

const visualStyles: Record<GalleryVisualKind, VisualStyle> = {
  screenshot: {
    frame: "gallery-visual--route",
    glyph: "text-[var(--color-route-soft)]",
    badge: "text-[var(--color-route-soft)]",
    glow: "bg-[color:var(--color-route-subtle)]",
    label: "imagem real / screenshot",
  },
  concept: {
    frame: "gallery-visual--neutral",
    glyph: "text-[var(--color-text-muted)]",
    badge: "text-[var(--color-text-muted)]",
    glow: "bg-white/[0.05]",
    label: "conceito visual",
  },
  character: {
    frame: "gallery-visual--ember",
    glyph: "text-[var(--color-accent-soft)]",
    badge: "text-[var(--color-accent-soft)]",
    glow: "bg-[color:var(--surface-accent-subtle)]",
    label: "perfil de personagem",
  },
  scene: {
    frame: "gallery-visual--route",
    glyph: "text-[var(--color-route-soft)]",
    badge: "text-[var(--color-route-soft)]",
    glow: "bg-[color:var(--color-route-subtle)]",
    label: "cena / ambiente",
  },
  video: {
    frame: "gallery-visual--neutral",
    glyph: "text-[var(--color-text-muted)]",
    badge: "text-[var(--color-text-muted)]",
    glow: "bg-white/[0.05]",
    label: "vídeo planejado",
  },
};

function renderAbstractPreview(kind: GalleryVisualKind) {
  if (kind === "screenshot") {
    return (
      <>
        <path
          d="M34 146C72 106 112 129 148 88C184 47 231 70 262 116C288 155 326 132 356 86"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 10"
          opacity="0.56"
        />
        <path
          d="M54 166h248"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.22"
        />
        <circle cx="148" cy="88" r="7" fill="currentColor" opacity="0.5" />
        <circle cx="262" cy="116" r="5" fill="currentColor" opacity="0.36" />
      </>
    );
  }

  if (kind === "concept") {
    return (
      <>
        <path
          d="M92 56h176v112H92V56Z"
          stroke="currentColor"
          strokeWidth="1.8"
          opacity="0.42"
        />
        <path
          d="M122 86h82M122 110h116M122 134h68"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.36"
        />
        <path
          d="M258 74 286 102 258 130 230 102 258 74Z"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.5"
        />
        <path
          d="M70 170h220"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="7 9"
          opacity="0.26"
        />
      </>
    );
  }

  if (kind === "character") {
    return (
      <>
        <path
          d="M180 42 212 90 198 146 180 172 162 146 148 90 180 42Z"
          fill="currentColor"
          opacity="0.12"
        />
        <path
          d="M180 54v98"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.48"
        />
        <path
          d="M138 142 222 58"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.56"
        />
        <path
          d="M116 168h128"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.25"
        />
      </>
    );
  }

  if (kind === "scene") {
    return (
      <>
        <path
          d="M52 154C88 126 104 92 138 104C178 118 188 76 226 70C272 62 292 118 338 92"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.48"
        />
        <path
          d="M54 172h284"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.28"
        />
        <path
          d="M102 78 132 54 162 78 132 102 102 78Z"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.32"
        />
        <path
          d="M254 138c17-20 44-20 62 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.36"
        />
      </>
    );
  }

  return (
    <>
      <path
        d="M96 58h184v112H96V58Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.44"
      />
      <path
        d="M172 92 218 114 172 136V92Z"
        fill="currentColor"
        opacity="0.38"
      />
      <path
        d="M116 188h144"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M130 78h38M224 78h36M130 154h98"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.24"
      />
    </>
  );
}

export function GalleryVisualFrame({
  kind,
  icon,
  label,
  status,
  size = "card",
  imageUrl,
  altText,
}: GalleryVisualFrameProps) {
  const style = visualStyles[kind];
  const heightClass = size === "modal" ? "h-64 sm:h-80" : "h-56 sm:h-64";
  const iconClass = size === "modal" ? "h-16 w-16" : "h-10 w-10";
  const normalizedImageUrl = imageUrl?.trim();
  const safeAltText = altText?.trim() || label;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(normalizedImageUrl) && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [normalizedImageUrl]);

  return (
    <div
      className={`gallery-visual relative ${heightClass} ${style.frame}`}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- URLs da galeria são administráveis; `next/image` será avaliado após configurar domínios externos.
        <img
          src={normalizedImageUrl}
          alt={safeAltText}
          loading="lazy"
          decoding="async"
          data-fx-image="true"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div
        className={`absolute inset-0 ${showImage ? "bg-[linear-gradient(145deg,rgba(0,0,0,0.18),rgba(0,0,0,0.56))]" : "bg-[radial-gradient(circle_at_25%_18%,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_78%_78%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(145deg,transparent,rgba(0,0,0,0.38))]"}`}
      />
      {!showImage ? (
        <div
          className={`absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full ${style.glow} blur-2xl`}
        />
      ) : null}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:34px_34px]" />
      {!showImage ? (
        <svg
          viewBox="0 0 390 220"
          className={`absolute inset-0 h-full w-full ${style.glyph}`}
          fill="none"
          aria-hidden="true"
        >
          {renderAbstractPreview(kind)}
        </svg>
      ) : null}

      <div className="gallery-visual__glyph">
        <GameGlyph
          name={icon}
          variant="plain"
          className={`${iconClass} ${style.glyph}`}
        />
      </div>
      <div className="gallery-visual__label">
        {label}
      </div>
      <div className="gallery-visual__footer">
        <span className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
          {showImage ? "imagem real" : style.label}
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.12em] ${style.badge}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
