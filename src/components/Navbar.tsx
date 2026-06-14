"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/Appcontext";
import { site } from "@/config/site";

/* ─── Star data for modal (generated once) ─── */
const MODAL_STARS = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: (i * 137.5) % 100,
    top:  (i * 97.3)  % 100,
    size: (i % 3 === 0) ? 1.8 : (i % 2 === 0) ? 1.2 : 0.8,
    opacity: 0.2 + (i % 5) * 0.1,
    dur: 1.5 + (i % 4) * 0.6,
}));

/* ─── Contact Modal ─── */
function ContactModal({ onClose, lang }: { onClose: () => void; lang: string }) {
    const [name,    setName]    = useState("");
    const [email,   setEmail]   = useState("");
    const [message, setMessage] = useState("");
    const [status,  setStatus]  = useState<"idle"|"sent">("idle");
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) onClose();
    };

    const handleSend = () => {
        if (!name.trim() || !email.trim() || !message.trim()) return;
        const subject = encodeURIComponent(`[Portfolio] ${name} — Collab Request`);
        const body    = encodeURIComponent(`Dari: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setStatus("sent");
    };

    const T = (en: string, id: string) => lang === "en" ? en : id;

    return (
        <motion.div
            ref={overlayRef}
            className="contact-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOverlayClick}
        >
            <motion.div
                className="contact-modal"
                initial={{ scale: 0.88, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.88, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onClick={e => e.stopPropagation()}
            >
                {/* ── Starfield ── */}
                <div className="contact-modal-stars">
                    {MODAL_STARS.map(s => (
                        <motion.div key={s.id}
                                    style={{
                                        position: "absolute",
                                        left: `${s.left}%`, top: `${s.top}%`,
                                        width: s.size, height: s.size,
                                        borderRadius: "50%", background: "#fff",
                                    }}
                                    animate={{ opacity: [s.opacity*0.3, s.opacity, s.opacity*0.3] }}
                                    transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}
                    {/* Nebula accents */}
                    <div style={{ position:"absolute", top:-40, left:-40, width:160, height:160, borderRadius:"50%",
                        background:"radial-gradient(circle,rgba(0,212,255,0.10) 0%,transparent 70%)", pointerEvents:"none" }} />
                    <div style={{ position:"absolute", bottom:-40, right:-40, width:180, height:180, borderRadius:"50%",
                        background:"radial-gradient(circle,rgba(123,45,255,0.12) 0%,transparent 70%)", pointerEvents:"none" }} />
                </div>

                {/* ── Content ── */}
                <div className="contact-modal-content">

                    {/* Header */}
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                        <div>
                            <span style={{
                                display:"block", fontFamily:"JetBrains Mono,monospace",
                                fontSize:"0.58rem", letterSpacing:"0.3em", textTransform:"uppercase",
                                color:"#00d4ff", opacity:0.75, marginBottom:4,
                            }}>
                                🚀 {T("Incoming Transmission","Transmisi Masuk")}
                            </span>
                            <h2 style={{
                                fontFamily:"Orbitron,monospace", fontSize:"1.05rem", fontWeight:900,
                                color:"#e8f0ff", lineHeight:1.2,
                            }}>
                                {T("Collab With Me","Kolaborasi Bareng")}
                            </h2>
                        </div>

                        {/* ✕ Close */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            style={{
                                flexShrink:0, marginTop:2,
                                width:30, height:30, borderRadius:"50%",
                                border:"1px solid rgba(0,212,255,0.22)",
                                background:"rgba(0,212,255,0.05)",
                                cursor:"pointer",
                                display:"flex", alignItems:"center", justifyContent:"center",
                                color:"rgba(160,200,255,0.65)",
                                fontSize:"0.9rem", lineHeight:1,
                                transition:"all 0.18s ease",
                            }}
                            onMouseEnter={e => {
                                const b = e.currentTarget;
                                b.style.background   = "rgba(255,45,100,0.18)";
                                b.style.borderColor  = "rgba(255,45,100,0.55)";
                                b.style.color        = "#ff2d7b";
                                b.style.transform    = "scale(1.1)";
                            }}
                            onMouseLeave={e => {
                                const b = e.currentTarget;
                                b.style.background   = "rgba(0,212,255,0.05)";
                                b.style.borderColor  = "rgba(0,212,255,0.22)";
                                b.style.color        = "rgba(160,200,255,0.65)";
                                b.style.transform    = "scale(1)";
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(0,212,255,0.28),transparent)", marginBottom:18 }} />

                    {status === "sent" ? (
                        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                                    style={{ textAlign:"center", padding:"20px 0" }}>
                            <div style={{ fontSize:36, marginBottom:10 }}>🛸</div>
                            <p style={{ fontFamily:"Orbitron,monospace", fontSize:"0.85rem", fontWeight:700,
                                color:"#00d4ff", marginBottom:6 }}>
                                {T("Message Launched!","Pesan Diluncurkan!")}
                            </p>
                            <p style={{ fontFamily:"Exo 2,sans-serif", fontSize:"0.78rem",
                                color:"rgba(180,215,255,0.55)" }}>
                                {T("Your email client will open.","Aplikasi email Anda akan terbuka.")}
                            </p>
                        </motion.div>
                    ) : (
                        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

                            {/* Name + Email row */}
                            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                                {([
                                    { label: T("NAME","NAMA"), ph: T("Your name","Nama kamu"),
                                        val: name, set: setName, type:"text" },
                                    { label:"EMAIL", ph:"email@you.com",
                                        val: email, set: setEmail, type:"email" },
                                ] as const).map(f => (
                                    <div key={f.label}>
                                        <label style={{ display:"block", fontFamily:"JetBrains Mono,monospace",
                                            fontSize:"0.56rem", letterSpacing:"0.22em", textTransform:"uppercase",
                                            color:"#00d4ff", opacity:0.7, marginBottom:4 }}>
                                            {f.label}
                                        </label>
                                        <input
                                            type={f.type}
                                            placeholder={f.ph}
                                            value={f.val}
                                            onChange={e => (f.set as (v:string)=>void)(e.target.value)}
                                            style={{ width:"100%", padding:"9px 11px", borderRadius:6,
                                                fontSize:"0.8rem" }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Message */}
                            <div>
                                <label style={{ display:"block", fontFamily:"JetBrains Mono,monospace",
                                    fontSize:"0.56rem", letterSpacing:"0.22em", textTransform:"uppercase",
                                    color:"#00d4ff", opacity:0.7, marginBottom:4 }}>
                                    {T("MESSAGE","PESAN")}
                                </label>
                                <textarea
                                    placeholder={T("Tell me about your project or idea...","Ceritakan proyek atau ide kamu...")}
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    rows={3}
                                    style={{ width:"100%", padding:"9px 11px", borderRadius:6,
                                        resize:"vertical", fontSize:"0.8rem",
                                        color:"#cde6ff",
                                        background:"rgba(10,20,45,0.9)",
                                        border:"1px solid rgba(0,212,255,0.14)" }}
                                />
                            </div>

                            {/* Send button */}
                            <button
                                onClick={handleSend}
                                disabled={!name.trim()||!email.trim()||!message.trim()}
                                className="btn-primary"
                                style={{ justifyContent:"center", marginTop:2,
                                    opacity:(!name.trim()||!email.trim()||!message.trim()) ? 0.45 : 1 }}
                            >
                                🚀 {T("Send Message","Kirim Pesan")}
                            </button>
                        </div>
                    )}

                    {/* Divider */}
                    <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(123,45,255,0.28),transparent)",
                        margin:"16px 0 14px" }} />

                    {/* Social links */}
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:12 }}>
                        <span style={{ fontFamily:"JetBrains Mono,monospace", fontSize:"0.54rem",
                            letterSpacing:"0.2em", color:"rgba(140,190,255,0.35)" }}>
                            {T("FIND ME","TEMUKAN")}
                        </span>
                        {[
                            { href:site.socials.linkedin, label:"LinkedIn",
                                icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                            { href:site.socials.github, label:"GitHub",
                                icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
                            { href:site.socials.instagram, label:"Instagram",
                                icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
                        ].map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                               title={s.label}
                               style={{
                                   width:34, height:34, borderRadius:8,
                                   display:"flex", alignItems:"center", justifyContent:"center",
                                   color:"rgba(150,200,255,0.5)",
                                   border:"1px solid rgba(0,212,255,0.14)",
                                   background:"rgba(0,212,255,0.03)",
                                   textDecoration:"none",
                                   transition:"all 0.18s ease",
                               }}
                               onMouseEnter={e => {
                                   const a = e.currentTarget;
                                   a.style.color       = "#00d4ff";
                                   a.style.borderColor = "rgba(0,212,255,0.4)";
                                   a.style.background  = "rgba(0,212,255,0.10)";
                                   a.style.transform   = "translateY(-2px)";
                               }}
                               onMouseLeave={e => {
                                   const a = e.currentTarget;
                                   a.style.color       = "rgba(150,200,255,0.5)";
                                   a.style.borderColor = "rgba(0,212,255,0.14)";
                                   a.style.background  = "rgba(0,212,255,0.03)";
                                   a.style.transform   = "none";
                               }}>
                                {s.icon}
                            </a>
                        ))}
                    </div>

                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─── Navbar ─── */
export default function Navbar() {
    const pathname = usePathname();
    const [scrolled,     setScrolled]     = useState(false);
    const [menuOpen,     setMenuOpen]     = useState(false);
    const [contactOpen,  setContactOpen]  = useState(false);
    const { t, lang } = useApp();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { href:"/",         label:t("nav.home") },
        { href:"/about",    label:t("nav.about") },
        { href:"/projects", label:t("nav.projects") },
    ];

    // Both themes: always a dark navy nav background
    const navBg = scrolled
        ? "rgba(5,10,22,0.94)"
        : "rgba(5,10,22,0.52)";

    return (
        <>
            <motion.nav
                initial={{ y:-80, opacity:0 }}
                animate={{ y:0,  opacity:1 }}
                transition={{ duration:0.7, ease:"easeOut" }}
                style={{
                    position:"fixed", top:0, left:0, right:0, zIndex:50,
                    background: navBg,
                    backdropFilter:"blur(20px)",
                    WebkitBackdropFilter:"blur(20px)",
                    borderBottom: scrolled
                        ? "1px solid rgba(0,212,255,0.16)"
                        : "1px solid transparent",
                    transition:"all 0.3s ease",
                }}
            >
                <div className="page-container"
                     style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:68 }}>

                    {/* Logo */}
                    <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{
                            width:34, height:34, borderRadius:"50%",
                            overflow:"hidden",
                            border:"2px solid var(--cyan)",
                            boxShadow:"0 0 14px rgba(0,150,220,0.4)",
                            flexShrink:0,
                        }}>
                            <img
                                src="/logoS.png"
                                alt={site.name}
                                style={{ width:"100%", height:"100%", objectFit:"cover" }}
                                onError={e => {
                                    const t = e.currentTarget as HTMLImageElement;
                                    t.style.display = "none";
                                    const p = t.parentElement!;
                                    p.style.background = "linear-gradient(135deg,#00d4ff,#7b2dff)";
                                    p.style.display    = "flex";
                                    p.style.alignItems = "center";
                                    p.style.justifyContent = "center";
                                    p.innerHTML = '<span style="font-family:Orbitron,monospace;font-weight:900;font-size:0.8rem;color:white">S</span>';
                                }}
                            />
                        </div>
                        <span style={{
                            fontFamily:"Orbitron,monospace", fontWeight:700, fontSize:"0.95rem",
                            letterSpacing:"0.15em", color:"var(--text-primary)",
                        }}>{site.shortName}</span>
                    </Link>

                    {/* Desktop links */}
                    <div style={{ display:"none", alignItems:"center", gap:28 }} className="desk-nav">
                        <style>{`@media(min-width:768px){.desk-nav{display:flex!important}.mob-btn{display:none!important}}`}</style>
                        {links.map(link => (
                            <Link key={link.href} href={link.href}
                                  className={`nav-link${pathname===link.href?" active":""}`}>
                                {link.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => setContactOpen(true)}
                            style={{
                                padding:"8px 20px",
                                fontFamily:"Exo 2,sans-serif", fontSize:"0.75rem", fontWeight:700,
                                letterSpacing:"0.15em", textTransform:"uppercase",
                                color:"var(--cyan)",
                                border:"1px solid var(--border-hover)",
                                borderRadius:5, background:"rgba(0,150,220,0.06)",
                                transition:"all 0.2s ease", cursor:"pointer",
                            }}
                            onMouseEnter={e => {
                                const b = e.currentTarget as HTMLButtonElement;
                                b.style.background = "rgba(0,150,220,0.12)";
                                b.style.boxShadow  = "0 0 18px rgba(0,150,220,0.25)";
                            }}
                            onMouseLeave={e => {
                                const b = e.currentTarget as HTMLButtonElement;
                                b.style.background = "rgba(0,150,220,0.06)";
                                b.style.boxShadow  = "none";
                            }}>
                            {t("nav.contact")}
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)}
                            style={{ background:"none", border:"none", cursor:"pointer",
                                display:"flex", flexDirection:"column", gap:5, padding:8 }}>
                        {[0,1,2].map(i => (
                            <motion.span key={i}
                                         style={{ display:"block", width:22, height:1, background:"var(--cyan)" }}
                                         animate={menuOpen
                                             ? (i===0?{rotate:45,y:6}:i===1?{opacity:0}:{rotate:-45,y:-6})
                                             : {rotate:0,y:0,opacity:1}} />
                        ))}
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ height:0, opacity:0 }}
                            animate={{ height:"auto", opacity:1 }}
                            exit={{ height:0, opacity:0 }}
                            style={{ overflow:"hidden",
                                background:"rgba(5,10,22,0.97)",
                                borderTop:"1px solid var(--border)" }}>
                            <div className="page-container"
                                 style={{ paddingTop:16, paddingBottom:20,
                                     display:"flex", flexDirection:"column", gap:16 }}>
                                {links.map(link => (
                                    <Link key={link.href} href={link.href}
                                          onClick={() => setMenuOpen(false)}
                                          style={{ textDecoration:"none",
                                              fontFamily:"Exo 2,sans-serif", fontSize:"0.85rem",
                                              letterSpacing:"0.2em", textTransform:"uppercase",
                                              color: pathname===link.href ? "var(--cyan)" : "var(--text-secondary)",
                                              padding:"6px 0" }}>
                                        {link.label}
                                    </Link>
                                ))}
                                <button
                                    onClick={() => { setMenuOpen(false); setContactOpen(true); }}
                                    style={{ textAlign:"left", background:"none", border:"none",
                                        fontFamily:"Exo 2,sans-serif", fontSize:"0.85rem",
                                        letterSpacing:"0.2em", textTransform:"uppercase",
                                        color:"var(--cyan)", padding:"6px 0", cursor:"pointer" }}>
                                    {t("nav.contact")}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Contact Modal */}
            <AnimatePresence>
                {contactOpen && (
                    <ContactModal onClose={() => setContactOpen(false)} lang={lang} />
                )}
            </AnimatePresence>
        </>
    );
}