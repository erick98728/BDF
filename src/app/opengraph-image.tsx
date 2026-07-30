import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Protótipo, site oficial do jogo indie";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(145deg, #050914 0%, #081225 48%, #120b22 100%)",
          color: "#f2f6ff",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -120,
            background:
              "radial-gradient(circle at 22% 18%, rgba(99,221,255,0.34), transparent 30%), radial-gradient(circle at 78% 18%, rgba(168,85,247,0.30), transparent 32%), radial-gradient(circle at 72% 78%, rgba(209,168,93,0.20), transparent 28%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(rgba(99,221,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(209,168,93,0.14) 1px, transparent 1px)",
            backgroundSize: "76px 76px"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 84,
            width: 188,
            height: 188,
            borderRadius: 42,
            border: "2px solid rgba(99,221,255,0.36)",
            background: "rgba(99,221,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 48px rgba(99,221,255,0.16), inset 0 1px 0 rgba(255,255,255,0.10)"
          }}
        >
          <div
            style={{
              width: 126,
              height: 126,
              display: "flex",
              position: "relative"
            }}
          >
            <svg width="126" height="126" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 5 39 15v18L24 43 9 33V15L24 5Z" stroke="#63ddff" strokeWidth="1.8" opacity="0.88" strokeLinejoin="round" />
              <path d="M24 11v26" stroke="#d1a85d" strokeWidth="2.1" strokeLinecap="round" />
              <path d="M15 18 24 12l9 6" stroke="#f2f6ff" strokeWidth="1.7" opacity="0.72" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 30 24 36l9-6" stroke="#f2f6ff" strokeWidth="1.7" opacity="0.72" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 24h14" stroke="#63ddff" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M13 13 8 9M35 13l5-4M13 35l-5 4M35 35l5 4" stroke="#d1a85d" strokeWidth="1.2" opacity="0.62" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 92,
            right: 92,
            top: 310,
            height: 2,
            background: "linear-gradient(90deg, rgba(99,221,255,0.82), rgba(209,168,93,0.38), transparent)"
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 338,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ fontSize: 96, lineHeight: 1, fontWeight: 900, letterSpacing: 8 }}>PROTÓTIPO</div>
          <div style={{ marginTop: 22, fontSize: 24, letterSpacing: 5, color: "#bff4ff", fontWeight: 700 }}>
            SITE OFICIAL · BETA EM DESENVOLVIMENTO
          </div>
          <div style={{ marginTop: 26, maxWidth: 850, fontSize: 32, lineHeight: 1.35, color: "#bfcae8" }}>
            Metroidvania 2D sombrio com lore, devlog, personagens e feedback.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 82,
            bottom: 62,
            padding: "16px 24px",
            borderRadius: 999,
            border: "1px solid rgba(209,168,93,0.35)",
            background: "rgba(209,168,93,0.10)",
            color: "#ffe8b8",
            fontSize: 20,
            letterSpacing: 3,
            fontWeight: 700
          }}
        >
          TODA NÉVOA GUARDA UMA VERDADE
        </div>
      </div>
    ),
    size
  );
}
