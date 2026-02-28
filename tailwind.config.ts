import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["'Orbitron'", "monospace"],
                body: ["'Exo 2'", "sans-serif"],
                mono: ["'JetBrains Mono'", "monospace"],
            },
            colors: {
                space: {
                    black: "#030712",
                    deep: "#050b18",
                    navy: "#0a1628",
                    blue: "#0d2137",
                },
                nebula: {
                    cyan: "#00d4ff",
                    purple: "#7b2dff",
                    pink: "#ff2d7b",
                    gold: "#ffd700",
                },
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
                "star-twinkle": "twinkle 3s ease-in-out infinite",
                "text-shimmer": "shimmer 3s linear infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.8), 0 0 80px rgba(0, 212, 255, 0.4)" },
                },
                twinkle: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.3" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;