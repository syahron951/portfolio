"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useApp } from "@/context/Appcontext";
import { site } from "@/config/site";

// Technology names only — the fabricated proficiency percentages were removed.
// TODO(human): confirm this list reflects what you actually use; edit freely.
const skills: Record<string, string[]> = {
    Frontend: ["React / Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    Backend:  ["Node.js / Express", "MongoDB", "PostgreSQL", "Redis"],
    Tools:    ["Git / GitHub", "Docker", "Vercel / AWS", "Linux / CLI"],
};

const catColors: Record<string, string> = { Frontend: "var(--cyan)", Backend: "var(--purple)", Tools: "var(--pink)" };

export default function AboutPage() {
    const { t } = useApp();
    const [photoError, setPhotoError] = useState(false);

    const infoGrid = [
        { labelKey: "about.location", value: "Indonesia 🇮🇩" },
        { labelKey: "about.focus",    value: t("about.focus.v") },
        { labelKey: "about.status",   value: t("about.status.v") },
    ];

    return (
        <section className="page-section">
            <div className="page-container">

                {/* Header */}
                <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <span className="section-label">{t("about.label")}</span>
                    <h1 className="section-title">{t("about.title")} <span className="shimmer-text">{t("about.title") === "ABOUT" ? "ME" : "SAYA"}</span></h1>
                    <div className="section-divider" />
                </motion.div>

                {/* Bio */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, marginBottom: 80, alignItems: "center" }}>
                    <style>{`@media(min-width:900px){.about-grid{grid-template-columns:1fr 1fr!important}}`}</style>
                    <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>

                        {/* Avatar with photo */}
                        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                                    style={{ display: "flex", justifyContent: "center" }}>
                            <div style={{ position: "relative" }}>
                                {[190, 236, 282].map((sz, ri) => (
                                    <div key={ri} style={{
                                        position: "absolute", width: sz, height: sz, top: "50%", left: "50%",
                                        transform: "translate(-50%,-50%)",
                                        border: `1px solid ${ri === 0 ? "rgba(0,212,255,0.15)" : ri === 1 ? "rgba(123,45,255,0.1)" : "rgba(255,45,123,0.08)"}`,
                                        borderRadius: "50%",
                                        animation: `spin-ring ${10 + ri * 4}s linear infinite`,
                                        animationDirection: ri % 2 === 0 ? "normal" : "reverse",
                                    }}>
                                        <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", top: -4, left: "50%", transform: "translateX(-50%)", background: ri === 0 ? "var(--cyan)" : ri === 1 ? "var(--purple)" : "var(--pink)", boxShadow: `0 0 10px ${ri === 0 ? "var(--cyan)" : ri === 1 ? "var(--purple)" : "var(--pink)"}` }} />
                                    </div>
                                ))}
                                <div style={{
                                    width: 180, height: 180, borderRadius: "50%",
                                    background: "var(--surface)",
                                    border: "2px solid var(--border-hover)",
                                    boxShadow: "0 0 30px rgba(0,150,220,0.2), var(--card-shadow)",
                                    overflow: "hidden",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative", zIndex: 1,
                                }}>
                                    {!photoError ? (
                                        <img
                                            src="/logo.png"
                                            alt={site.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                                            onError={() => setPhotoError(true)}
                                        />
                                    ) : (
                                        <span style={{ fontSize: 70 }}>👨‍💻</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Text */}
                        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
                            <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: 4 }}>{site.name}</h2>
                            <p style={{ fontFamily: "Exo 2, sans-serif", fontSize: "0.82rem", letterSpacing: "0.2em", color: "var(--cyan)", marginBottom: 20 }}>{t("about.role")}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                                {["about.bio1", "about.bio2", "about.bio3"].map(k => (
                                    <p key={k} className="body-text">{t(k)}</p>
                                ))}
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                {infoGrid.map(item => (
                                    <div key={item.labelKey} style={{ padding: "12px 16px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)" }}>
                                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.62rem", color: "var(--cyan)", opacity: 0.7, marginBottom: 4 }}>{t(item.labelKey)}</div>
                                        <div style={{ fontFamily: "Exo 2, sans-serif", fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Skills */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 80 }}>
                    <div className="section-header">
                        <span className="section-label">{t("about.tech.label")}</span>
                        <h2 className="section-title">{t("about.tech.title")} <span style={{ color: "var(--cyan)" }}>STACK</span></h2>
                        <div className="section-divider" />
                    </div>
                    <div className="grid-3">
                        {Object.entries(skills).map(([cat, items]) => (
                            <div key={cat} style={{ padding: "24px 26px", borderRadius: 12, background: "var(--surface)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                                <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: catColors[cat], marginBottom: 18 }}>{cat}</h3>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {items.map(name => <span key={name} className="tag">{name}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>
            <style>{`@keyframes spin-ring{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}`}</style>
        </section>
    );
}