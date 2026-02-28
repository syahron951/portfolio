"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useApp } from "@/context/Appcontext";

const skills = {
    Frontend: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript",      level: 90 },
        { name: "TailwindCSS",     level: 92 },
        { name: "Framer Motion",   level: 80 },
    ],
    Backend: [
        { name: "Node.js / Express", level: 90 },
        { name: "MongoDB",           level: 85 },
        { name: "PostgreSQL",        level: 80 },
        { name: "Redis",             level: 75 },
    ],
    Tools: [
        { name: "Git / GitHub", level: 95 },
        { name: "Docker",       level: 75 },
        { name: "Vercel / AWS", level: 85 },
        { name: "Linux / CLI",  level: 80 },
    ],
};

const catColors: Record<string, string> = { Frontend: "var(--cyan)", Backend: "var(--purple)", Tools: "var(--pink)" };

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
    return (
        <motion.div className="skill-row"
                    initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.4, delay }}>
            <div className="skill-row-header">
                <span className="skill-name">{name}</span>
                <span className="skill-pct">{level}%</span>
            </div>
            <div className="skill-track">
                <motion.div className="skill-fill"
                            initial={{ width: 0 }} whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }} transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }} />
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    const { t } = useApp();
    const tlKeys = ["tl.1", "tl.2", "tl.3", "tl.4"];
    const years = ["2024", "2022", "2021", "2020"];
    const [photoError, setPhotoError] = useState(false);

    const infoGrid = [
        { labelKey: "about.location", value: "Indonesia 🇮🇩" },
        { labelKey: "about.exp",      value: "3+ " + t("about.exp") },
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
                                            alt="Syahroni"
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
                            <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: 4 }}>Syahroni</h2>
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
                                <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: catColors[cat], marginBottom: 20 }}>{cat}</h3>
                                {items.map((s, si) => <SkillBar key={s.name} name={s.name} level={s.level} delay={si * 0.08} />)}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="section-header">
                        <span className="section-label">{t("about.exp.label")}</span>
                        <h2 className="section-title">{t("about.exp.title")} <span style={{ color: "var(--purple)" }}>{t("about.timeline")}</span></h2>
                        <div className="section-divider purple" />
                    </div>
                    <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
                        <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, var(--cyan), var(--purple), transparent)" }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingLeft: 56 }}>
                            {tlKeys.map((k, i) => (
                                <motion.div key={k}
                                            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                            style={{ position: "relative" }}>
                                    <div style={{ position: "absolute", left: -44, top: 18, width: 10, height: 10, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 12px var(--cyan)" }} />
                                    <div style={{ padding: "20px 24px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)" }}>
                                        <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--cyan)", marginBottom: 4 }}>{years[i]}</div>
                                        <div style={{ fontFamily: "Orbitron, monospace", fontSize: "0.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>{t(`${k}.title`)}</div>
                                        <div style={{ fontFamily: "Exo 2, sans-serif", fontSize: "0.78rem", color: "var(--purple)", marginBottom: 8 }}>{t(`${k}.company`)}</div>
                                        <p className="body-text" style={{ fontSize: "0.82rem" }}>{t(`${k}.desc`)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
            <style>{`@keyframes spin-ring{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}`}</style>
        </section>
    );
}