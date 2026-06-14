"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useApp } from "@/context/Appcontext";
import { site } from "@/config/site";

export default function Hero() {
    const { t, lang } = useApp();
    const roles = [...site.roles];

    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    useEffect(() => {
        setDisplayed("");
        setDeleting(false);
        setRoleIndex(0);
    }, [lang]);

    useEffect(() => {
        const current = roles[roleIndex];
        let timer: ReturnType<typeof setTimeout>;
        if (!deleting && displayed.length < current.length) {
            timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        } else if (!deleting && displayed.length === current.length) {
            timer = setTimeout(() => setDeleting(true), 2200);
        } else if (deleting && displayed.length > 0) {
            timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        } else {
            setDeleting(false);
            setRoleIndex(i => (i + 1) % roles.length);
        }
        return () => clearTimeout(timer);
    }, [displayed, deleting, roleIndex, roles]);

    return (
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", zIndex: 1 }}>
            {/* Grid overlay */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                opacity: 0.5,
            }} />

            <div className="page-container" style={{ paddingTop: 120, paddingBottom: 80, width: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center" }}>
                    <style>{`@media(min-width:1024px){.hero-grid{grid-template-columns:1fr auto!important;text-align:left!important}}`}</style>
                    <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center", textAlign: "center" }}>

                        {/* Text */}
                        <div>
                            {/* Badge */}
                            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                        style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 16px", borderRadius: 999, background: "rgba(0,150,220,0.08)", border: "1px solid var(--border-hover)" }}>
                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)", display: "inline-block", animation: "blink 2s ease infinite" }} />
                                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.66rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--cyan)" }}>
                                    {t("hero.available")}
                                </span>
                            </motion.div>

                            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                      style={{ fontFamily: "Exo 2, sans-serif", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--cyan)", opacity: 0.85, marginBottom: 8 }}>
                                {t("hero.welcome")}
                            </motion.p>

                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
                                       style={{ fontFamily: "Orbitron, monospace", fontSize: "clamp(2.4rem, 7vw, 5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 16 }}>
                                <span className="shimmer-text">{site.name.toUpperCase()}</span>
                            </motion.h1>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                        style={{ fontFamily: "Exo 2, sans-serif", fontSize: "clamp(1rem, 3vw, 1.35rem)", fontWeight: 500, color: "var(--text-primary)", marginBottom: 24, minHeight: "2em", display: "flex", alignItems: "center", justifyContent: "inherit", gap: 2 }}>
                                <span style={{ color: "var(--purple)" }}>{"<"}</span>
                                <span>{displayed}</span>
                                <span style={{ display: "inline-block", width: 2, height: "1.1em", background: "var(--cyan)", verticalAlign: "middle", animation: "blink 1s ease infinite" }} />
                                <span style={{ color: "var(--purple)" }}>{"/>"}</span>
                            </motion.div>

                            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                                      className="body-text" style={{ marginBottom: 32, fontSize: "1rem", maxWidth: 480 }}>
                                {t("hero.desc")}
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                                        style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "inherit", marginBottom: 44 }}>
                                <a href="/projects" className="btn-primary">{t("hero.cta.projects")}</a>
                                <a href="/about" className="btn-outline">{t("hero.cta.about")}</a>
                            </motion.div>
                        </div>

                        {/* Avatar with photo */}
                        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
                                    style={{ position: "relative", flexShrink: 0, display: "flex", justifyContent: "center" }}>
                            {[180, 225, 272].map((sz, ri) => (
                                <div key={ri} style={{
                                    position: "absolute", width: sz, height: sz, top: "50%", left: "50%",
                                    transform: "translate(-50%,-50%)",
                                    border: `1px solid ${ri === 0 ? "rgba(0,212,255,0.2)" : ri === 1 ? "rgba(123,45,255,0.15)" : "rgba(255,45,123,0.1)"}`,
                                    borderRadius: "50%",
                                    animation: `spin-ring ${10 + ri * 4}s linear infinite`,
                                    animationDirection: ri % 2 === 0 ? "normal" : "reverse",
                                }}>
                                    <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", top: -4, left: "50%", transform: "translateX(-50%)", background: ri === 0 ? "var(--cyan)" : ri === 1 ? "var(--purple)" : "var(--pink)", boxShadow: `0 0 10px ${ri === 0 ? "var(--cyan)" : ri === 1 ? "var(--purple)" : "var(--pink)"}` }} />
                                </div>
                            ))}
                            <div style={{
                                width: 178, height: 178, borderRadius: "50%",
                                background: "var(--surface)",
                                border: "2px solid var(--border-hover)",
                                boxShadow: "0 0 30px rgba(0,150,220,0.2), 0 0 60px rgba(120,40,220,0.12), var(--card-shadow)",
                                overflow: "hidden",
                                position: "relative", zIndex: 1,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                {!photoError ? (
                                    <img
                                        src="/logo.png"
                                        alt={site.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                                        onError={() => setPhotoError(true)}
                                    />
                                ) : (
                                    <span style={{ fontSize: 66 }}>👨‍💻</span>
                                )}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Scroll hint */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "Exo 2, sans-serif", fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--text-muted)" }}>Scroll</span>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--cyan), transparent)" }} />
            </motion.div>

            <style>{`
        @keyframes spin-ring { from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes blink     { 0%,100%{opacity:1}50%{opacity:0} }
      `}</style>
        </section>
    );
}