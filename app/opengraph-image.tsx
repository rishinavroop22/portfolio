import { ImageResponse } from "next/og";

export const alt = "Rishi Navroop, software developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card, generated at build time.
export default function OpengraphImage() {
  const bars = Array.from({ length: 64 }, (_, i) => 18 + Math.round(60 * Math.abs(Math.sin(i * 0.37)) * Math.abs(Math.cos(i * 0.11))));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 30%, #2a1660 0%, #06050a 60%)",
          color: "#eceaf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#34e8ff" }}>Software developer</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Rishi Navroop</div>
          <div style={{ fontSize: 34, color: "#a6a3bc", marginTop: 20 }}>
            Backend systems, agentic LLM apps and speech analytics
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: h,
                background: i < 32 ? "#34e8ff" : "#ff3d9a",
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
