import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

// Premium type system, self-hosted via next/font (no render-blocking <link>).
// Orbitron / Exo 2 are retired.

export const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
