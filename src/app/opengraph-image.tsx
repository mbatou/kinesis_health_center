import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Dynamically generated Open Graph image (1200x630 PNG) — brand-aligned,
// avoids shipping a static asset. Used for social sharing previews.
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #5400AD 0%, #2c0060 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#7BC86C",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          CENTRE MÉDICAL · DAKAR
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            marginTop: 16,
            lineHeight: 1.1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            fontSize: 38,
            marginTop: 24,
            color: "#E2A9F1",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
