import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BuildXWorks — Idea to live product. In weeks.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.35), transparent 60%), #0a0a0f",
          color: "white",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 22,
              color: "white",
              letterSpacing: -1,
            }}
          >
            BX
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
            BuildX<span style={{ color: "#a5b4fc" }}>Works</span>
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            <div>Idea to live product.</div>
            <div
              style={{
                background:
                  "linear-gradient(90deg, #818cf8 0%, #a78bfa 60%, #8b5cf6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              In weeks.
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 880,
              lineHeight: 1.35,
              fontWeight: 400,
            }}
          >
            End-to-end builds for founders — SaaS, consumer, e-commerce.
          </div>
        </div>

        {/* Bottom: proof */}
        <div
          style={{
            display: "flex",
            gap: 36,
            fontSize: 18,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 26 }}>3</span>
            <span>live products</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 26 }}>3,000+</span>
            <span>end users</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 26 }}>9.6/10</span>
            <span>verified NPS</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
