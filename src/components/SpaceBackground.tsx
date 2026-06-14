"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number; y: number;
    size: number; opacity: number;
    drift: number; twinkleOffset: number;
    color: string;
}

/**
 * Tamed atmospheric starfield (MVP).
 * - One canvas, one rAF loop.
 * - Reduced particle counts (≤120 desktop / ≤50 mobile).
 * - Paused on tab blur (visibilitychange).
 * - Fully static (single paint, no animation) under prefers-reduced-motion.
 * - Dark-only, restrained warm/white palette (no neon).
 */
export default function SpaceBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const COLORS = ["#ffffff", "#fbe9c8", "#dfe7ff", "#ffd79a"];
        let stars: Star[] = [];
        let raf = 0;
        let t = 0;
        let running = true;

        const count = () => (window.innerWidth < 700 ? 50 : 120);

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const init = () => {
            const w = window.innerWidth, h = window.innerHeight;
            stars = Array.from({ length: count() }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 1.6 + 0.4,
                opacity: Math.random() * 0.6 + 0.25,
                drift: Math.random() * 0.04 + 0.01,
                twinkleOffset: Math.random() * Math.PI * 2,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }));
        };

        const paint = (animated: boolean) => {
            const w = window.innerWidth, h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            // subtle vignette glow toward the top (the "first light")
            const g = ctx.createRadialGradient(w * 0.5, h * 0.08, 0, w * 0.5, h * 0.08, h * 0.7);
            g.addColorStop(0, "rgba(232,182,90,0.05)");
            g.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);

            for (const s of stars) {
                const tw = animated ? Math.sin(t * 1.5 + s.twinkleOffset) * 0.3 + 0.7 : 1;
                ctx.globalAlpha = s.opacity * tw;
                ctx.fillStyle = s.color;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
                if (animated) {
                    s.y += s.drift;
                    if (s.y > h) s.y = 0;
                }
            }
            ctx.globalAlpha = 1;
        };

        const loop = () => {
            if (!running) return;
            t += 0.016;
            paint(true);
            raf = requestAnimationFrame(loop);
        };

        const onVisibility = () => {
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(raf);
            } else if (!reduce) {
                running = true;
                raf = requestAnimationFrame(loop);
            }
        };

        const onResize = () => { resize(); init(); if (reduce) paint(false); };

        resize();
        init();
        if (reduce) {
            paint(false); // single static frame
        } else {
            raf = requestAnimationFrame(loop);
        }
        window.addEventListener("resize", onResize);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return <canvas ref={canvasRef} id="star-canvas" aria-hidden="true" />;
}
