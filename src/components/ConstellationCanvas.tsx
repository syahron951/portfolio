"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";

const NODES = [
    { label: "GitHub", href: site.socials.github, x: 0.2, y: 0.32 },
    { label: "LinkedIn", href: site.socials.linkedin, x: 0.55, y: 0.66 },
    { label: "Instagram", href: site.socials.instagram, x: 0.82, y: 0.3 },
];

const RGB = "232,182,90"; // --accent
const rgba = (a: number) => `rgba(${RGB},${a})`;

/**
 * Interactive constellation — a 2D canvas where the real social links are
 * nodes connected by light, with cursor-reactive links and ambient stars.
 * Plain canvas (no Three.js). The links are real, focusable <a> elements;
 * the canvas is decorative (aria-hidden). Static under reduced motion.
 */
export default function ConstellationCanvas() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const nodes = [...wrap.querySelectorAll<HTMLAnchorElement>("[data-node]")];
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let W = 0, H = 0, raf = 0, running = true, disposed = false;
        const mouse = { x: -999, y: -999, on: false };
        let amb: { x: number; y: number; r: number; o: number; ph: number }[] = [];

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            W = r.width; H = r.height;
            canvas.width = W * dpr; canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            nodes.forEach((n) => {
                n.style.left = parseFloat(n.dataset.x!) * W + "px";
                n.style.top = parseFloat(n.dataset.y!) * H + "px";
            });
            amb = Array.from({ length: 36 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3, o: Math.random() * 0.5 + 0.15, ph: Math.random() * 6.28 }));
        };

        const npos = () => nodes.map((n) => ({ x: parseFloat(n.dataset.x!) * W, y: parseFloat(n.dataset.y!) * H, hot: n.dataset.hot === "1" }));

        const render = (t: number) => {
            ctx.clearRect(0, 0, W, H);
            amb.forEach((s) => {
                const tw = reduce ? 1 : Math.sin(t * 1.5 + s.ph) * 0.4 + 0.7;
                ctx.globalAlpha = s.o * tw; ctx.fillStyle = rgba(1);
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
            });
            ctx.globalAlpha = 1;
            const P = npos();
            for (let i = 0; i < P.length; i++) {
                for (let j = i + 1; j < P.length; j++) {
                    const hot = P[i].hot || P[j].hot;
                    ctx.strokeStyle = rgba(hot ? 0.5 : 0.16);
                    ctx.lineWidth = hot ? 1.4 : 0.8;
                    ctx.beginPath(); ctx.moveTo(P[i].x, P[i].y); ctx.lineTo(P[j].x, P[j].y); ctx.stroke();
                }
            }
            if (mouse.on) {
                P.forEach((p) => {
                    const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                    if (d < 220) {
                        ctx.strokeStyle = rgba((1 - d / 220) * 0.6);
                        ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y); ctx.stroke();
                    }
                });
                ctx.fillStyle = rgba(0.9);
                ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.5, 0, 6.283); ctx.fill();
            }
            P.forEach((p) => {
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.hot ? 26 : 16);
                g.addColorStop(0, rgba(p.hot ? 0.5 : 0.3)); g.addColorStop(1, rgba(0));
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.hot ? 26 : 16, 0, 6.283); ctx.fill();
            });
            // broadcasting pulse rings
            if (!reduce) {
                P.forEach((p, i) => {
                    const pu = (t * 0.4 + i * 0.37) % 1;
                    ctx.strokeStyle = rgba((1 - pu) * 0.28);
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.arc(p.x, p.y, 10 + pu * 42, 0, 6.283); ctx.stroke();
                });
            }
        };

        const onMove = (e: PointerEvent) => { const r = wrap.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; };
        const onLeave = () => { mouse.on = false; mouse.x = -999; mouse.y = -999; };
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);
        nodes.forEach((n) => {
            const enter = () => { n.style.borderColor = "var(--accent-line)"; n.style.boxShadow = "0 8px 24px " + rgba(0.18); n.dataset.hot = "1"; };
            const leave = () => { n.style.borderColor = "var(--line)"; n.style.boxShadow = "none"; n.dataset.hot = ""; };
            n.addEventListener("pointerenter", enter);
            n.addEventListener("pointerleave", leave);
            n.addEventListener("focus", enter);
            n.addEventListener("blur", leave);
        });

        const onVis = () => {
            if (document.hidden) { running = false; }
            else if (!reduce) { running = true; raf = requestAnimationFrame(loop); }
        };
        document.addEventListener("visibilitychange", onVis);

        const loop = () => {
            if (!running || disposed) return;
            render(performance.now() * 0.001);
            raf = requestAnimationFrame(loop);
        };

        const ro = new ResizeObserver(() => { resize(); if (reduce) render(0); });
        ro.observe(wrap);
        resize();
        if (reduce) render(0);
        else raf = requestAnimationFrame(loop);

        return () => {
            disposed = true; running = false;
            cancelAnimationFrame(raf);
            ro.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            wrap.removeEventListener("pointermove", onMove);
            wrap.removeEventListener("pointerleave", onLeave);
        };
    }, []);

    return (
        <div ref={wrapRef} style={{ position: "relative", width: "100%", height: 300, border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden", background: "rgba(10,11,15,0.4)" }}>
            <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
            {NODES.map((n) => (
                <a
                    key={n.label}
                    data-node={n.label}
                    data-x={n.x}
                    data-y={n.y}
                    href={n.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ position: "absolute", transform: "translate(-50%,-50%)", display: "flex", alignItems: "center", gap: 9, padding: "10px 15px", border: "1px solid var(--line)", borderRadius: 999, textDecoration: "none", background: "var(--bg-elev)", zIndex: 2, transition: "border-color .2s, box-shadow .2s" }}
                >
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-dim)" }}>{n.label} ↗</span>
                </a>
            ))}
        </div>
    );
}
