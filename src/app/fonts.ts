import { Source_Sans_3, Inter } from "next/font/google";

// Headings — close to the brand's Myriad Pro.
export const heading = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// Body — Inter, with a Segoe UI system fallback (see tailwind.config.ts).
export const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
