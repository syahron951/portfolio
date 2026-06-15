"use client";

import { useState, useEffect } from "react";
import { site } from "@/config/site";
import { chapters } from "@/lib/chapters";

// Clear, skimmable labels (the `nav` field) mapped to the cinematic chapters.
const LINKS = chapters
    .filter((c) => c.id !== "ignition")
    .map((c) => ({ href: `#${c.id}`, label: c.nav }));

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                background: scrolled ? "rgba(8,9,13,0.82)" : "transparent",
                backdropFilter: scrolled ? "blur(14px)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
                borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
                transition: "background 0.3s ease, border-color 0.3s ease",
            }}
        >
            <nav
                className="container"
                aria-label="Primary"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}
            >
                <a href="#ignition" style={{
                    fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem",
                    letterSpacing: "0.04em", color: "var(--text)", textDecoration: "none",
                }}>
                    {site.shortName}<span style={{ color: "var(--accent)" }}>.</span>
                </a>

                {/* Desktop */}
                <ul className="nav-desktop" style={{ display: "none", listStyle: "none", alignItems: "center", gap: 30, margin: 0 }}>
                    {LINKS.map((l) => (
                        <li key={l.href}>
                            <a href={l.href} style={{
                                fontFamily: "var(--font-mono)", fontSize: "0.74rem",
                                letterSpacing: "0.12em", textTransform: "uppercase",
                                color: "var(--text-dim)", textDecoration: "none",
                                transition: "color 0.18s ease",
                            }}
                               onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                               onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}>
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile toggle */}
                <button
                    className="nav-toggle"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    style={{
                        display: "flex", flexDirection: "column", gap: 5, padding: 8,
                        background: "none", border: "none", cursor: "pointer",
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <span key={i} style={{
                            display: "block", width: 22, height: 1.5, background: "var(--text)",
                            transition: "transform 0.2s ease, opacity 0.2s ease",
                            transform: open ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none") : "none",
                            opacity: open && i === 1 ? 0 : 1,
                        }} />
                    ))}
                </button>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="container" style={{ paddingBottom: 20, paddingTop: 4 }}>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4, margin: 0 }}>
                        {LINKS.map((l) => (
                            <li key={l.href}>
                                <a href={l.href} onClick={() => setOpen(false)} style={{
                                    display: "block", padding: "10px 0",
                                    fontFamily: "var(--font-mono)", fontSize: "0.9rem",
                                    letterSpacing: "0.1em", textTransform: "uppercase",
                                    color: "var(--text-dim)", textDecoration: "none",
                                }}>
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <style>{`@media (min-width: 760px){ .nav-desktop{ display:flex !important; } .nav-toggle{ display:none !important; } }`}</style>
        </header>
    );
}
