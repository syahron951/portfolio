"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/context/Appcontext";

interface Star {
    x: number; y: number;
    originalX: number; originalY: number;
    size: number; opacity: number;
    speed: number; color: string;
    twinkleOffset: number;
}
interface ShootingStar {
    x: number; y: number;
    length: number; speed: number;
    opacity: number; angle: number;
    trail: { x: number; y: number }[];
}

export default function SpaceBackground() {
    const { theme } = useApp();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef  = useRef({ x: -9999, y: -9999 });
    const starsRef  = useRef<Star[]>([]);
    const shootRef  = useRef<ShootingStar[]>([]);
    const animRef   = useRef<number>(0);
    const timeRef   = useRef(0);
    const themeRef  = useRef(theme);

    useEffect(() => { themeRef.current = theme; }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Dark mode star colors
        const DARK_COLORS  = ["#ffffff","#00d4ff","#7b2dff","#ff2d7b","#aad4ff","#ffd700"];
        // Light mode (bright navy bg) — vivid bright stars so they're clearly visible
        const LIGHT_COLORS = ["#ffffff","#38bdf8","#a78bfa","#f472b6","#93c5fd","#fde68a","#86efac"];

        const resize = () => {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initStars = () => {
            starsRef.current = Array.from({ length: 350 }, () => {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const colors = themeRef.current === "light" ? LIGHT_COLORS : DARK_COLORS;
                return {
                    x, y, originalX: x, originalY: y,
                    size: Math.random() * 2.5 + 0.4,
                    opacity: Math.random() * 0.85 + 0.15,
                    speed: Math.random() * 0.12 + 0.02,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    twinkleOffset: Math.random() * Math.PI * 2,
                };
            });
        };

        const spawnShooting = () => {
            const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
            shootRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                length: Math.random() * 130 + 80,
                speed: Math.random() * 8 + 6,
                opacity: 1, angle, trail: [],
            });
        };

        const animate = () => {
            timeRef.current += 0.016;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isLight = themeRef.current === "light";

            // Background — both modes use deep navy space look
            const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
            if (isLight) {
                // Deep navy, slightly more blue than dark mode
                bg.addColorStop(0,   "#060d1e");
                bg.addColorStop(0.45,"#080f24");
                bg.addColorStop(1,   "#060d1e");
            } else {
                bg.addColorStop(0,   "#030712");
                bg.addColorStop(0.5, "#050b18");
                bg.addColorStop(1,   "#030712");
            }
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Nebula glows
            const drawNebula = (x: number, y: number, r: number, color: string) => {
                const g = ctx.createRadialGradient(x, y, 0, x, y, r);
                g.addColorStop(0, color);
                g.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            };

            if (isLight) {
                // Brighter nebulas for navy bg so they're visible
                drawNebula(canvas.width*0.15, canvas.height*0.3, canvas.width*0.38, "rgba(56,189,248,0.07)");
                drawNebula(canvas.width*0.85, canvas.height*0.7, canvas.width*0.42, "rgba(167,139,250,0.09)");
                drawNebula(canvas.width*0.5,  canvas.height*0.5, canvas.width*0.5,  "rgba(244,114,182,0.05)");
            } else {
                drawNebula(canvas.width*0.15, canvas.height*0.3, canvas.width*0.35, "rgba(123,45,255,0.06)");
                drawNebula(canvas.width*0.85, canvas.height*0.7, canvas.width*0.4,  "rgba(0,212,255,0.05)");
                drawNebula(canvas.width*0.5,  canvas.height*0.5, canvas.width*0.5,  "rgba(255,45,123,0.03)");
            }

            // Stars
            const REPEL = 120;
            const colors = isLight ? LIGHT_COLORS : DARK_COLORS;
            starsRef.current.forEach(star => {
                const dx   = star.originalX - mouseRef.current.x;
                const dy   = star.originalY - mouseRef.current.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < REPEL) {
                    const f = (REPEL - dist) / REPEL;
                    star.x = star.originalX + (dx/dist)*f*25;
                    star.y = star.originalY + (dy/dist)*f*25;
                } else {
                    star.x += (star.originalX - star.x) * 0.05;
                    star.y += (star.originalY - star.y) * 0.05;
                }
                star.originalX += star.speed * 0.1;
                star.originalY += star.speed * 0.05;
                if (star.originalX > canvas.width)  star.originalX = 0;
                if (star.originalY > canvas.height) star.originalY = 0;

                // re-pick color on theme change
                if (isLight  && DARK_COLORS.includes(star.color))  star.color = colors[Math.floor(Math.random()*colors.length)];
                if (!isLight && LIGHT_COLORS.includes(star.color)) star.color = colors[Math.floor(Math.random()*colors.length)];

                const twinkle = Math.sin(timeRef.current*2 + star.twinkleOffset)*0.3 + 0.7;
                ctx.save();
                ctx.globalAlpha = star.opacity * twinkle;
                // More glow in light mode so stars are vivid against navy
                if (star.size > 1.2) {
                    ctx.shadowColor = star.color;
                    ctx.shadowBlur  = isLight ? 10 : 6;
                }
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
                ctx.fill();
                ctx.restore();
            });

            // Shooting stars
            if (Math.random() < 0.004) spawnShooting();
            shootRef.current = shootRef.current.filter(s => {
                s.trail.unshift({ x: s.x, y: s.y });
                if (s.trail.length > 20) s.trail.pop();
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                s.opacity -= 0.018;
                if (s.opacity <= 0 || s.x > canvas.width+100 || s.y > canvas.height+100) return false;
                if (s.trail.length > 1) {
                    const last = s.trail[s.trail.length-1];
                    const grad = ctx.createLinearGradient(last.x, last.y, s.x, s.y);
                    grad.addColorStop(0, "rgba(200,230,255,0)");
                    grad.addColorStop(1, isLight
                        ? `rgba(147,197,253,${s.opacity})`
                        : `rgba(180,230,255,${s.opacity})`);
                    ctx.save();
                    ctx.strokeStyle = grad;
                    ctx.lineWidth   = 1.5;
                    ctx.shadowColor = isLight ? "#38bdf8" : "#00d4ff";
                    ctx.shadowBlur  = 8;
                    ctx.beginPath();
                    ctx.moveTo(last.x, last.y);
                    s.trail.forEach(p => ctx.lineTo(p.x, p.y));
                    ctx.stroke();
                    ctx.restore();
                }
                return true;
            });

            animRef.current = requestAnimationFrame(animate);
        };

        resize();
        initStars();
        animate();

        const onMouse  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        const onResize = () => { resize(); initStars(); };
        window.addEventListener("mousemove", onMouse);
        window.addEventListener("resize",    onResize);
        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("mousemove", onMouse);
            window.removeEventListener("resize",    onResize);
        };
    }, []); // eslint-disable-line

    return (
        <canvas
            ref={canvasRef}
            id="star-canvas"
            style={{ position:"fixed", top:0, left:0, width:"100%", height:"100%", zIndex:0, pointerEvents:"none" }}
        />
    );
}