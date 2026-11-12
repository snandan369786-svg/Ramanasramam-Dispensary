import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — 100% free medical care in Tiruvannamalai`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#132820",
        color: "#f8f5ee",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 56, height: 1, background: "#d6bf8f" }} />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            color: "#d6bf8f",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          {`A service of ${site.operator}`}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, lineHeight: 1.05 }}>
          Compassionate Healthcare.
        </div>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            color: "#d6bf8f",
            fontStyle: "italic",
          }}
        >
          A Service Without Boundaries.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(248,245,238,0.65)",
              marginTop: 8,
            }}
          >
            Tiruvannamalai, Tamil Nadu
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            color: "#132820",
            background: "#d6bf8f",
            padding: "14px 24px",
          }}
        >
          100% FREE MEDICAL CARE
        </div>
      </div>
    </div>,
    size,
  );
}
