"use client";

import { useEffect, useRef, useState } from "react";

type ModeId = "light" | "dark" | "frontier";

const MODES: { id: ModeId; name: string; desc: string; caption: string }[] = [
    {
        id: "light",
        name: "Light",
        desc: "what I've built",
        caption:
            "Two real lights so far — Lumero, a business platform in production, and this site, built in the open. A small map, but every star on it is real.",
    },
    {
        id: "dark",
        name: "Dark",
        desc: "what's still ahead",
        caption:
            "Most of the map is honest darkness — deeper systems, bigger products, harder problems. Not built yet, and not pretended otherwise. Sweep the dark to sense what's out there.",
    },
    {
        id: "frontier",
        name: "The frontier",
        desc: "possibility",
        caption:
            "Direction, not claims: more ownership, deeper engineering, and eventually founding something of my own. Move across the map — chart possible routes.",
    },
];

// Fixed, honest map data. Built = real. Future = unnamed possibility, never claimed.
const BUILT = [
    { x: 0.24, y: 0.4, r: 5, label: "LUMERO" },
    { x: 0.36, y: 0.64, r: 3.4, label: "ODYSSEY · THIS SITE" },
];
const FUTURE = [
    { x: 0.55, y: 0.24, r: 2.6 }, { x: 0.63, y: 0.58, r: 2.2 }, { x: 0.7, y: 0.36, r: 2.8 },
    { x: 0.76, y: 0.72, r: 2.0 }, { x: 0.82, y: 0.22, r: 2.4 }, { x: 0.87, y: 0.52, r: 2.2 },
    { x: 0.92, y: 0.34, r: 1.8 }, { x: 0.6, y: 0.82, r: 1.9 }, { x: 0.95, y: 0.75, r: 2.0 },
];
const SECTOR: Record<ModeId, string> = {
    light: "SECTOR · CHARTED",
    dark: "SECTOR · UNCHARTED",
    frontier: "SECTOR · POSSIBLE",
};

const RGB = "232,182,90";
const gold = (a: number) => `rgba(${RGB},${a})`;
const dim = (a: number) => `rgba(170,176,189,${a})`;

/**
 * The Frontier map — the chapter's legend made functional. Three modes
 * (Light / Dark / The frontier) drive a 2D-canvas star map:
 * - Light: the two real built stars glow, labeled and linked.
 * - Dark: the map dims to unlit outlines — the honest unbuilt.
 * - Frontier: possibility points breathe; dashed routes chart intent.
 * Cursor acts as a scanner (lens glow / dark-reveal / route-plotting).
 *
 * Modes crossfade smoothly (weights lerped per frame). Buttons are real,
 * keyboard-accessible controls; captions are real DOM text. Canvas is
 * decorative (aria-hidden). Reduced motion: instant switches, static frames.
 */
export default function FrontierMap() {
    const [mode, setMode] = useState<ModeId>("light");
    const modeRef = useRef<ModeId>("light");
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderRef = useRef<(t: number) => void>(() => {});
    const reduceRef = useRef(false);

    useEffect(() => {
        modeRef.current = mode;
        if (reduceRef.current) renderRef.current(0); // instant static switch
    }, [mode]);

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        reduceRef.current = reduce;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let W = 0, H = 0, raf = 0, running = true, disposed = false;
        const mouse = { x: -999, y: -999, on: false };
        const mix: Record<ModeId, number> = { light: 1, dark: 0, frontier: 0 };
        let dust: { x: number; y: number; r: number; o: number; ph: number }[] = [];

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            W = r.width; H = r.height;
            canvas.width = W * dpr; canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dust = Array.from({ length: 44 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + 0.3, o: Math.random() * 0.4 + 0.1, ph: Math.random() * 6.28 }));
        };

        const render = (t: number) => {
            // ease mode weights (instant under reduced motion)
            const target = modeRef.current;
            (Object.keys(mix) as ModeId[]).forEach((k) => {
                const goal = k === target ? 1 : 0;
                mix[k] += (goal - mix[k]) * (reduce ? 1 : 0.08);
            });
            const wL = mix.light, wD = mix.dark, wF = mix.frontier;

            ctx.clearRect(0, 0, W, H);

            // background wash — warms with light, deepens with dark
            const bg = ctx.createLinearGradient(0, 0, 0, H);
            bg.addColorStop(0, `rgba(232,182,90,${0.035 * wL + 0.02 * wF})`);
            bg.addColorStop(1, `rgba(0,0,0,${0.25 * wD + 0.08})`);
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // ambient dust
            dust.forEach((s) => {
                const tw = reduce ? 1 : Math.sin(t * 1.3 + s.ph) * 0.4 + 0.7;
                ctx.globalAlpha = s.o * tw * (0.5 + 0.5 * (wL + wF));
                ctx.fillStyle = gold(1);
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
            });
            ctx.globalAlpha = 1;

            // the edge of the charted — a dashed meridian
            const edgeA = 0.22 * (wD + wF);
            if (edgeA > 0.01) {
                ctx.strokeStyle = gold(edgeA);
                ctx.lineWidth = 1;
                ctx.setLineDash([3, 7]);
                ctx.beginPath(); ctx.moveTo(W * 0.47, 12); ctx.lineTo(W * 0.47, H - 12); ctx.stroke();
                ctx.setLineDash([]);
            }

            const B = BUILT.map((p) => ({ ...p, px: p.x * W, py: p.y * H }));
            const F = FUTURE.map((p) => ({ ...p, px: p.x * W, py: p.y * H }));

            // link between the built stars
            ctx.strokeStyle = gold(0.4 * wL);
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(B[0].px, B[0].py); ctx.lineTo(B[1].px, B[1].py); ctx.stroke();

            // possible routes (frontier): dashed lines from Lumero toward the dark
            if (wF > 0.02) {
                ctx.setLineDash([4, 6]);
                [0, 2, 4].forEach((i) => {
                    ctx.strokeStyle = gold(0.3 * wF);
                    ctx.beginPath(); ctx.moveTo(B[0].px, B[0].py); ctx.lineTo(F[i].px, F[i].py); ctx.stroke();
                });
                ctx.setLineDash([]);
            }

            // built stars — bright in light mode, quiet in dark
            B.forEach((p, i) => {
                const pulse = reduce ? 1 : 1 + Math.sin(t * 2 + i * 1.4) * 0.12;
                const glowR = p.r * (2.6 + 1.6 * wL) * pulse;
                const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowR * 2.6);
                g.addColorStop(0, gold(0.5 * (0.45 + 0.55 * wL)));
                g.addColorStop(1, gold(0));
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(p.px, p.py, glowR * 2.6, 0, 6.283); ctx.fill();
                ctx.fillStyle = gold(0.6 + 0.4 * wL);
                ctx.beginPath(); ctx.arc(p.px, p.py, p.r * (0.7 + 0.3 * wL) * pulse, 0, 6.283); ctx.fill();
                // labels
                const la = 0.85 * wL + 0.3 * wF;
                if (la > 0.02) {
                    ctx.font = "600 10px ui-monospace, SFMono-Regular, monospace";
                    ctx.fillStyle = dim(la);
                    ctx.fillText(p.label, p.px + 12, p.py + 3);
                }
            });

            // future points — outlines in dark, breathing glows in frontier
            F.forEach((p, i) => {
                const revealBoost = mouse.on ? Math.max(0, 1 - Math.hypot(p.px - mouse.x, p.py - mouse.y) / 140) : 0;
                // unlit outline (dark)
                const oa = (0.4 + 0.5 * revealBoost) * wD + 0.12 * wF;
                if (oa > 0.02) {
                    ctx.strokeStyle = dim(oa);
                    ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.arc(p.px, p.py, p.r + 2.5, 0, 6.283); ctx.stroke();
                }
                // possibility glow (frontier)
                const br = reduce ? 0.35 : 0.25 + 0.18 * Math.sin(t * 1.5 + i * 1.1);
                const fa = (br + 0.4 * revealBoost) * wF + 0.05 * wL;
                if (fa > 0.02) {
                    const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, p.r * 5);
                    g.addColorStop(0, gold(fa));
                    g.addColorStop(1, gold(0));
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.arc(p.px, p.py, p.r * 5, 0, 6.283); ctx.fill();
                    ctx.fillStyle = gold(Math.min(1, fa * 1.6));
                    ctx.beginPath(); ctx.arc(p.px, p.py, p.r * 0.75, 0, 6.283); ctx.fill();
                }
            });

            // cursor scanner
            if (mouse.on) {
                if (wL > 0.05) {
                    const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 90);
                    g.addColorStop(0, gold(0.07 * wL));
                    g.addColorStop(1, gold(0));
                    ctx.fillStyle = g;
                    ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 90, 0, 6.283); ctx.fill();
                }
                if (wF > 0.05) {
                    ctx.setLineDash([3, 5]);
                    F.forEach((p) => {
                        const d = Math.hypot(p.px - mouse.x, p.py - mouse.y);
                        if (d < 170) {
                            ctx.strokeStyle = gold((1 - d / 170) * 0.55 * wF);
                            ctx.lineWidth = 1;
                            ctx.beginPath(); ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.px, p.py); ctx.stroke();
                        }
                    });
                    ctx.setLineDash([]);
                }
                ctx.fillStyle = gold(0.9 * (wF + wD * 0.6 + wL * 0.4));
                ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 2.2, 0, 6.283); ctx.fill();
            }

            // sector readout (crossfades between modes)
            ctx.font = "600 10px ui-monospace, SFMono-Regular, monospace";
            (Object.keys(SECTOR) as ModeId[]).forEach((k) => {
                const a = mix[k] * 0.55;
                if (a > 0.03) { ctx.fillStyle = gold(a); ctx.fillText(SECTOR[k], 14, 22); }
            });
        };
        renderRef.current = render;

        const onMove = (e: PointerEvent) => { const r = wrap.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; if (reduce) render(0); };
        const onLeave = () => { mouse.on = false; mouse.x = -999; mouse.y = -999; if (reduce) render(0); };
        wrap.addEventListener("pointermove", onMove);
        wrap.addEventListener("pointerleave", onLeave);

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

    const active = MODES.find((m) => m.id === mode)!;

    return (
        <div>
            {/* Mode controls — the legend, made functional */}
            <div role="group" aria-label="Frontier map view" className="fm-controls">
                {MODES.map((m) => (
                    <button
                        key={m.id}
                        type="button"
                        aria-pressed={mode === m.id}
                        onClick={() => setMode(m.id)}
                        className={`fm-btn${mode === m.id ? " is-active" : ""}`}
                    >
                        <span className={`fm-key fm-key--${m.id}`} aria-hidden="true" />
                        <b>{m.name}</b>
                        <span className="fm-desc">— {m.desc}</span>
                    </button>
                ))}
            </div>

            {/* The map */}
            <div ref={wrapRef} className="fm-map">
                <canvas ref={canvasRef} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
            </div>

            {/* Live caption — real DOM text, changes with mode */}
            <p key={mode} className="fm-caption" aria-live="polite">{active.caption}</p>

            <style>{`
                .fm-controls { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
                .fm-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 11px 18px; border-radius: 999px; cursor: pointer;
                    background: rgba(14,16,22,0.5); border: 1px solid var(--line);
                    font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-dim);
                    transition: border-color .22s ease, background .22s ease, color .22s ease, transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s ease;
                }
                .fm-btn b { color: var(--text); font-weight: 500; }
                .fm-desc { color: var(--text-faint); }
                .fm-btn:hover { border-color: var(--accent-line); transform: translateY(-2px); }
                .fm-btn.is-active { border-color: var(--accent-line); background: var(--accent-soft); box-shadow: 0 6px 22px rgba(232,182,90,0.14); }
                .fm-btn.is-active b { color: var(--accent-bright); }
                .fm-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
                .fm-key { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; transition: box-shadow .22s ease; }
                .fm-key--light { background: var(--accent); }
                .fm-key--dark { background: transparent; border: 1px solid var(--line-strong); }
                .fm-key--frontier { background: var(--accent-soft); border: 1px solid var(--accent-line); }
                .fm-btn.is-active .fm-key--light { box-shadow: 0 0 10px var(--accent); }
                .fm-btn.is-active .fm-key--frontier { box-shadow: 0 0 8px rgba(232,182,90,0.5); }
                .fm-map { position: relative; width: 100%; height: 320px; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: rgba(10,11,15,0.4); cursor: crosshair; }
                @media (max-width: 700px){ .fm-map { height: 250px; } }
                .fm-caption { margin: 16px 0 0; max-width: 62ch; font-size: 0.95rem; line-height: 1.7; color: var(--text-dim); animation: fm-fade .5s ease both; }
                @keyframes fm-fade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
            `}</style>
        </div>
    );
}
