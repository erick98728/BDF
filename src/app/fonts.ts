import { Inter, Oswald, Roboto_Mono } from "next/font/google";

export const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial", "sans-serif"],
  variable: "--font-body-loaded",
});

export const displayFont = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
  variable: "--font-display-loaded",
});

export const monoFont = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "optional",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Courier New", "monospace"],
  variable: "--font-mono-loaded",
});

export const fontVariables = [
  bodyFont.variable,
  displayFont.variable,
  monoFont.variable,
].join(" ");
