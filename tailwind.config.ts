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
          violet: "#5400AD", // primary — titles, CTA, accents
          "violet-light": "#BFA0E8",
          "violet-pale": "#E2A9F1",
          green: "#3EA935", // TODO: confirm exact hex from logo SVG
          "green-soft": "#7BC86C",
          grey: "#4C5563", // body / secondary titles
          "grey-soft": "#686867",
          ink: "#1E2230", // strong text
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
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
