"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/Appcontext";

export default function FloatingControls() {
    const { theme, lang, toggleTheme, toggleLang } = useApp();
    const isDark = theme === "dark";

    return (
        <div className="floating-controls">

            {/* Theme button */}
            <motion.button
                className="ctrl-btn"
                onClick={toggleTheme}
                whileTap={{ scale: 0.88 }}
                title={isDark ? "Light Mode" : "Dark Mode"}
                style={{ borderColor: isDark ? "rgba(0,212,255,0.35)" : "rgba(50,120,220,0.35)" }}
            >
                {/* Tooltip */}
                <span className="tooltip">
          {isDark
              ? (lang === "en" ? "Light Mode" : "Mode Terang")
              : (lang === "en" ? "Dark Mode"  : "Mode Gelap")}
        </span>

                {/* Icon */}
                <span style={{ fontSize: 20, lineHeight: 1 }}>
          {isDark ? "☀️" : "🌙"}
        </span>

                {/* Glow ring */}
                <span style={{
                    position: "absolute", inset: -3,
                    borderRadius: "50%",
                    border: `1.5px solid ${isDark ? "rgba(0,212,255,0.2)" : "rgba(50,120,220,0.2)"}`,
                    pointerEvents: "none",
                    animation: "pulse-ring 2.5s ease infinite",
                }} />
            </motion.button>

            {/* Language button */}
            <motion.button
                className="ctrl-btn"
                onClick={toggleLang}
                whileTap={{ scale: 0.88 }}
                title={lang === "en" ? "Bahasa Indonesia" : "English"}
                style={{ borderColor: "rgba(123,45,255,0.35)" }}
            >
        <span className="tooltip">
          {lang === "en" ? "Bahasa Indonesia" : "Switch to English"}
        </span>

                <span style={{
                    fontFamily: "Orbitron, monospace",
                    fontSize: "0.6rem",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: isDark ? "#9b6dff" : "#5b1fd4",
                    lineHeight: 1,
                }}>
          {lang === "en" ? "ID" : "EN"}
        </span>

                {/* Glow ring */}
                <span style={{
                    position: "absolute", inset: -3,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(123,45,255,0.2)",
                    pointerEvents: "none",
                    animation: "pulse-ring 2.5s ease infinite 0.8s",
                }} />
            </motion.button>

            <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          50%  { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(1);   opacity: 0.6; }
        }
      `}</style>
        </div>
    );
}