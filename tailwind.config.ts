import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette (charte graphique Kinesis).
        kinesis: {
          violet: "#5400AD", // primary — titles, CTA, fil, accents
          "violet-light": "#BFA0E8",
          "violet-pale": "#E2A9F1",
          "violet-wash": "#F2EEFA", // very pale panels / backgrounds
          green: "#3EA935", // TODO: confirm exact hex from logo SVG
          "green-soft": "#7BC86C",
          grey: "#4C5563", // secondary text
          "grey-soft": "#686867",
          ink: "#26215C", // strong titles (very dark violet)
        },
        // Neutrals.
        surface: "#F7F6FB", // soft violet-tinted background
        line: "#ECEAF3", // borders
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: [
          "var(--font-body)",
          "Segoe UI",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      maxWidth: {
        "6xl": "72rem",
        prose: "60ch",
      },
      // Editorial type scale — contrast of sizes + whitespace carry the design.
      fontSize: {
        display: [
          "clamp(2.4rem, 6vw, 4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.6rem, 3.5vw, 2.4rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        pole: [
          "clamp(1.05rem, 2.2vw, 1.35rem)",
          { lineHeight: "1.2", fontWeight: "500" },
        ],
        kicker: [
          "0.72rem",
          { lineHeight: "1", letterSpacing: "0.18em", fontWeight: "600" },
        ],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
