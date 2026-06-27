"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL star-voyage background — a 3D field of stars the camera flies through
 * as you scroll, with pointer parallax, a warp FOV/vignette on fast scroll, and
 * waypoint glows (the "worlds" ahead). Three.js is dynamically imported so it
 * code-splits out of the initial bundle. Decorative only (aria-hidden) — the
 * page content never depends on it.
 *
 * Guards: prefers-reduced-motion renders a single static frame; the loop pauses
 * on tab blur; pixel ratio capped at 2; star count scales down on small screens.
 */
export default function VoyageBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const speedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let disposed = false;
        let raf = 0;
        let running = true;

        // eased scroll progress + velocity
        let progress = 0;
        let dispProgress = 0;
        let vel = 0;
        // pointer
        let mx = 0;
        let my = 0;

        // cleanup holders (filled after async import)
        let cleanup: (() => void) | null = null;

        (async () => {
            const THREE = await import("three");
            if (disposed) return;

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            renderer.setClearColor(0x08090d, 1);

            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x08090d, 0.0013);
            const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 2500);

            const DEPTH = 1700;
            const travel = DEPTH - 360;
            const small = window.innerWidth < 760;
            const N = small ? 2600 : 5000;
            const accent = new THREE.Color(0xe8b65a);
            const cols = [new THREE.Color(0xffffff), new THREE.Color(0xfbe9c8), new THREE.Color(0xdfe7ff), accent];

            const pos = new Float32Array(N * 3);
            const col = new Float32Array(N * 3);
            for (let i = 0; i < N; i++) {
                const a = Math.random() * Math.PI * 2;
                const rad = 60 + Math.pow(Math.random(), 0.6) * 460;
                pos[i * 3] = Math.cos(a) * rad;
                pos[i * 3 + 1] = Math.sin(a) * rad;
                pos[i * 3 + 2] = -Math.random() * DEPTH;
                const c = cols[Math.floor(Math.random() * (Math.random() < 0.18 ? 4 : 3))];
                col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
            const mat = new THREE.PointsMaterial({ size: 2.2, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.92, depthWrite: false, blending: THREE.AdditiveBlending });
            const stars = new THREE.Points(geo, mat);
            scene.add(stars);

            // waypoint glow sprites = the worlds you fly toward
            const makeGlow = () => {
                const c = document.createElement("canvas");
                c.width = 128; c.height = 128;
                const x = c.getContext("2d")!;
                const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
                g.addColorStop(0, "rgba(255,255,255,0.9)");
                g.addColorStop(0.25, "rgba(255,235,200,0.5)");
                g.addColorStop(1, "rgba(255,235,200,0)");
                x.fillStyle = g; x.fillRect(0, 0, 128, 128);
                return new THREE.CanvasTexture(c);
            };
            const glowTex = makeGlow();
            const waypoints: InstanceType<typeof THREE.Sprite>[] = [];
            for (let i = 0; i < 5; i++) {
                const wm = new THREE.SpriteMaterial({ map: glowTex, color: accent, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7 });
                const s = new THREE.Sprite(wm);
                const ang = Math.random() * Math.PI * 2;
                s.position.set(Math.cos(ang) * 120, Math.sin(ang) * 80, -300 - i * 300);
                const sc = 80 + Math.random() * 50;
                s.scale.set(sc, sc, 1);
                scene.add(s);
                waypoints.push(s);
            }

            const render = (t: number) => {
                camera.position.z = -dispProgress * travel;
                const tx = mx * 38, ty = -my * 26;
                camera.position.x += (tx - camera.position.x) * 0.05;
                camera.position.y += (ty - camera.position.y) * 0.05;
                camera.lookAt(mx * 26, -my * 18, camera.position.z - 240);
                if (!reduce) {
                    const targetFov = 72 + Math.min(vel * 2600, 24);
                    camera.fov += (targetFov - camera.fov) * 0.08;
                    camera.updateProjectionMatrix();
                    stars.rotation.z = t * 0.008;
                    waypoints.forEach((s, i) => { s.material.opacity = 0.45 + 0.3 * Math.sin(t * 0.8 + i); });
                }
                renderer.render(scene, camera);
            };

            const onScroll = () => {
                const doc = document.documentElement;
                const max = doc.scrollHeight - window.innerHeight;
                progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
                if (reduce) { dispProgress = progress; render(0); }
            };
            const onMove = (e: PointerEvent) => {
                mx = (e.clientX / window.innerWidth) * 2 - 1;
                my = (e.clientY / window.innerHeight) * 2 - 1;
            };
            const onResize = () => {
                renderer.setSize(window.innerWidth, window.innerHeight, false);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                if (reduce) render(0);
            };
            const onVis = () => {
                if (document.hidden) { running = false; }
                else if (!reduce) { running = true; raf = requestAnimationFrame(loop); }
            };

            const loop = () => {
                if (!running || disposed) return;
                const t = performance.now() * 0.001;
                const prev = dispProgress;
                dispProgress += (progress - dispProgress) * 0.06;
                vel = Math.abs(dispProgress - prev);
                render(t);
                if (speedRef.current) speedRef.current.style.opacity = String(Math.min(vel * 70, 0.8));
                raf = requestAnimationFrame(loop);
            };

            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("pointermove", onMove, { passive: true });
            window.addEventListener("resize", onResize, { passive: true });
            document.addEventListener("visibilitychange", onVis);
            onScroll();

            if (reduce) render(0);
            else raf = requestAnimationFrame(loop);

            cleanup = () => {
                cancelAnimationFrame(raf);
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("pointermove", onMove);
                window.removeEventListener("resize", onResize);
                document.removeEventListener("visibilitychange", onVis);
                geo.dispose();
                mat.dispose();
                glowTex.dispose();
                waypoints.forEach((s) => s.material.dispose());
                renderer.dispose();
            };
        })();

        return () => {
            disposed = true;
            running = false;
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", display: "block" }}
            />
            <div
                ref={speedRef}
                aria-hidden="true"
                style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0, background: "radial-gradient(circle at 50% 50%, transparent 30%, rgba(232,182,90,0.04) 60%, rgba(0,0,0,0.5) 100%)", transition: "opacity .25s linear" }}
            />
            <div
                aria-hidden="true"
                style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", background: "radial-gradient(120% 60% at 50% 0%, rgba(232,182,90,0.05), transparent 55%)" }}
            />
        </>
    );
}
