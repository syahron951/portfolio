"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/data/projects";
import { site } from "@/config/site";
import { useApp } from "@/context/Appcontext";

export default function ProjectsPage() {
    const { t } = useApp();
    const [active, setActive] = useState("All");
    const filters = [t("proj.filter.all"), "live", "dev"];
    const filtered = active === t("proj.filter.all") || active === "All"
        ? projects
        : projects.filter(p => p.status === active);

    return (
        <section className="page-section">
            <div className="page-container">

                {/* Header */}
                <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <span className="section-label">{t("proj.label")}</span>
                    <h1 className="section-title">{t("proj.title")}</h1>
                    <p className="body-text" style={{ maxWidth: 480, margin: "12px auto 0" }}>{t("proj.desc")}</p>
                    <div className="section-divider purple" />
                </motion.div>

                {/* Filter */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                            style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 40 }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setActive(f)}
                                style={{
                                    padding: "8px 22px",
                                    fontFamily: "Exo 2, sans-serif", fontSize: "0.75rem", fontWeight: 600,
                                    letterSpacing: "0.15em", textTransform: "uppercase",
                                    borderRadius: 6, cursor: "pointer", transition: "all 0.2s ease",
                                    background: active === f ? "linear-gradient(135deg, rgba(0,150,220,0.15), rgba(100,40,220,0.15))" : "transparent",
                                    border: active === f ? "1px solid var(--border-hover)" : "1px solid var(--border)",
                                    color: active === f ? "var(--cyan)" : "var(--text-muted)",
                                    boxShadow: active === f ? "0 0 16px rgba(0,150,220,0.15)" : "none",
                                }}>
                            {f}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <div className="grid-3" style={{ marginBottom: 56 }}>
                    {filtered.map((project, i) => (
                        <motion.div key={project.id} className="card" style={{ overflow: "hidden" }}
                                    initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                                    whileHover={{ y: -6 }}>

                            {/* Image */}
                            <div style={{ height: 180, background: "var(--navy)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontSize: 52, filter: "drop-shadow(0 0 16px rgba(0,150,220,0.5))" }}>{project.emoji || "🚀"}</span>
                                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, var(--bg) 100%)", opacity: 0.7 }} />
                                {project.status && (
                                    <span style={{
                                        position: "absolute", top: 12, right: 12,
                                        padding: "3px 10px", borderRadius: 4,
                                        fontFamily: "JetBrains Mono, monospace", fontSize: "0.65rem",
                                        background: project.status === "live" ? "rgba(0,150,220,0.12)" : "rgba(100,40,220,0.12)",
                                        border: `1px solid ${project.status === "live" ? "var(--border-hover)" : "rgba(100,40,220,0.35)"}`,
                                        color: project.status === "live" ? "var(--cyan)" : "var(--purple)",
                                    }}>{project.status}</span>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ padding: "20px 22px 24px" }}>
                                <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: "0.84rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.4 }}>
                                    {project.title}
                                </h3>
                                <p className="body-text" style={{ fontSize: "0.82rem", marginBottom: 14 }}>{project.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                                    {project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                                <div style={{ display: "flex", gap: 10 }}>
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                           style={{ flex: 1, padding: "8px 0", textAlign: "center", borderRadius: 6, fontFamily: "Exo 2, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", background: "linear-gradient(135deg, rgba(0,150,220,0.15), rgba(100,40,220,0.15))", border: "1px solid var(--border-hover)", color: "var(--cyan)", transition: "all 0.2s ease" }}>
                                            {t("proj.demo")}
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                                           style={{ flex: 1, padding: "8px 0", textAlign: "center", borderRadius: 6, fontFamily: "Exo 2, sans-serif", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", border: "1px solid var(--border)", color: "var(--text-secondary)", transition: "all 0.2s ease" }}>
                                            {t("proj.github")}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ textAlign: "center" }}>
                    <p className="body-text" style={{ marginBottom: 20 }}>{t("proj.cta")}</p>
                    <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                        {t("proj.github.btn")}
                    </a>
                </motion.div>

            </div>
        </section>
    );
}