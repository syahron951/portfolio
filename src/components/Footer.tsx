"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/Appcontext";

/* SVG icon with optional image override */
function SocialIcon({ imgPath, label, svgIcon }: {
    imgPath: string; label: string; svgIcon: React.ReactNode
}) {
    const [err, setErr] = useState(false);
    if (!err) {
        return (
            <img
                src={imgPath}
                alt={label}
                width={17} height={17}
                style={{ objectFit:"contain",
                    filter:"brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(170deg)",
                    display:"block" }}
                onError={() => setErr(true)}
            />
        );
    }
    return <>{svgIcon}</>;
}

const GH = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);
const LI = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);
const IG = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const SOCIALS = [
    { label:"GitHub",    href:"https://github.com/syahroni111",      img:"/socials/github.png",    icon:GH },
    { label:"LinkedIn",  href:"https://www.linkedin.com/in/syahronii/", img:"/socials/linkedin.png",  icon:LI },
    { label:"Instagram", href:"https://www.instagram.com/m.a_syahroni/",   img:"/socials/instagram.png", icon:IG },
];

export default function Footer() {
    const { t } = useApp();

    const navLinks = [
        { href:"/",         label:t("nav.home") },
        { href:"/about",    label:t("nav.about") },
        { href:"/projects", label:t("nav.projects") },
    ];

    return (
        <footer style={{
            position:"relative", zIndex:1,
            borderTop:"1px solid var(--border)",
            background:"var(--surface)",
            backdropFilter:"blur(16px)",
            /* no extra min-height, no flex-grow — just wraps content */
        }}>
            <div className="page-container" style={{ paddingTop:32, paddingBottom:28 }}>

                <style>{`
                    @media(min-width:768px){
                        .footer-inner{
                            flex-direction:row !important;
                            justify-content:space-between !important;
                            align-items:center !important;
                        }
                    }
                `}</style>

                {/* Top row */}
                <div className="footer-inner"
                     style={{ display:"flex", flexDirection:"column",
                         gap:20, alignItems:"center", marginBottom:20 }}>

                    {/* Brand */}
                    <div style={{ textAlign:"center" }}>
                        <div style={{
                            fontFamily:"Orbitron,monospace", fontWeight:900,
                            fontSize:"1.1rem", letterSpacing:"0.15em",
                            color:"var(--cyan)", marginBottom:3,
                        }}>M.ABDULLAH SYAHRONI</div>
                        <p style={{
                            fontFamily:"Exo 2,sans-serif", fontSize:"0.68rem",
                            letterSpacing:"0.18em", color:"var(--text-muted)",
                        }}>{t("footer.role")}</p>
                    </div>

                    {/* Nav links */}
                    <div style={{ display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center" }}>
                        {navLinks.map(l => (
                            <Link key={l.href} href={l.href}
                                  style={{
                                      textDecoration:"none",
                                      fontFamily:"Exo 2,sans-serif", fontSize:"0.68rem",
                                      letterSpacing:"0.18em", textTransform:"uppercase",
                                      color:"var(--text-muted)", transition:"color 0.2s",
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.color="var(--cyan)"}
                                  onMouseLeave={e => e.currentTarget.style.color="var(--text-muted)"}>
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Social icons */}
                    <div style={{ display:"flex", gap:8 }}>
                        {SOCIALS.map(s => (
                            <a key={s.label} href={s.href}
                               target="_blank" rel="noopener noreferrer" title={s.label}
                               style={{
                                   width:36, height:36, borderRadius:7,
                                   display:"flex", alignItems:"center", justifyContent:"center",
                                   color:"var(--cyan)",
                                   border:"1px solid var(--border)",
                                   background:"transparent",
                                   textDecoration:"none",
                                   transition:"all 0.2s ease",
                               }}
                               onMouseEnter={e => {
                                   const a = e.currentTarget as HTMLAnchorElement;
                                   a.style.background   = "rgba(0,150,220,0.10)";
                                   a.style.borderColor  = "var(--border-hover)";
                                   a.style.transform    = "translateY(-2px)";
                               }}
                               onMouseLeave={e => {
                                   const a = e.currentTarget as HTMLAnchorElement;
                                   a.style.background   = "transparent";
                                   a.style.borderColor  = "var(--border)";
                                   a.style.transform    = "none";
                               }}>
                                <SocialIcon imgPath={s.img} label={s.label} svgIcon={s.icon} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height:1, background:"var(--border)", marginBottom:16 }} />

                {/* Copyright */}
                <p style={{
                    fontFamily:"JetBrains Mono,monospace", fontSize:"0.6rem",
                    color:"var(--text-muted)", textAlign:"center",
                }}>
                    {t("footer.copy")}
                </p>

            </div>
        </footer>
    );
}