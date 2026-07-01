"use client";

import { useEffect, useRef } from "react";

/**
 * WebGL star-voyage background v2 — "real space".
 * - Custom shader stars: round, softly glowing, per-star twinkle + size variation
 *   (fixes the square default-Points look).
 * - Volumetric nebula clouds (layered additive sprites, gold + cool blue).
 * - Hyperspace streaks that ignite with scroll velocity (warp).
 * - Camera roll + pointer parallax + warp FOV for a real "flying" feel.
 * - Waypoint glows (the worlds ahead) gently orbiting.
 *
 * Three.js is dynamically imported (code-splits out of the initial bundle).
 * Decorative only (aria-hidden). Guards: prefers-reduced-motion renders one
 * static frame; loop pauses on tab blur; pixel ratio capped at 2; all counts
 * scale down on small screens; full dispose() on unmount.
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

        let cleanup: (() => void) | null = null;

        (async () => {
            const THREE = await import("three");
            if (disposed) return;

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            renderer.setSize(window.innerWidth, window.innerHeight, false);
            renderer.setClearColor(0x08090d, 1);

            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x08090d, 0.0011);
            const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 2600);

            const DEPTH = 1700;
            const travel = DEPTH - 360;
            const small = window.innerWidth < 760;

            // ─── Stars: round, twinkling shader points ───
            const N = small ? 2600 : 5200;
            const accent = new THREE.Color(0xe8b65a);
            const palette = [new THREE.Color(0xffffff), new THREE.Color(0xfbe9c8), new THREE.Color(0xdfe7ff), accent];

            const pos = new Float32Array(N * 3);
            const col = new Float32Array(N * 3);
            const size = new Float32Array(N);
            const phase = new Float32Array(N);
            for (let i = 0; i < N; i++) {
                const a = Math.random() * Math.PI * 2;
                const rad = 60 + Math.pow(Math.random(), 0.6) * 460;
                pos[i * 3] = Math.cos(a) * rad;
                pos[i * 3 + 1] = Math.sin(a) * rad;
                pos[i * 3 + 2] = -Math.random() * DEPTH;
                const c = palette[Math.floor(Math.random() * (Math.random() < 0.18 ? 4 : 3))];
                col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
                size[i] = 1.0 + Math.pow(Math.random(), 2.4) * 3.4; // mostly small, a few bright
                phase[i] = Math.random() * Math.PI * 2;
            }
            const starGeo = new THREE.BufferGeometry();
            starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            starGeo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
            starGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
            starGeo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
            const starMat = new THREE.ShaderMaterial({
                uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
                transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
                vertexShader: `
                    attribute vec3 aColor; attribute float aSize; attribute float aPhase;
                    uniform float uTime; uniform float uPR;
                    varying vec3 vColor; varying float vTw;
                    void main(){
                        vColor = aColor;
                        float tw = 0.72 + 0.28 * sin(uTime * 1.6 + aPhase);
                        vTw = tw;
                        vec4 mv = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = min(aSize * tw * uPR * (300.0 / -mv.z), 15.0 * uPR);
                        gl_Position = projectionMatrix * mv;
                    }`,
                fragmentShader: `
                    varying vec3 vColor; varying float vTw;
                    void main(){
                        float d = length(gl_PointCoord - 0.5);
                        float a = smoothstep(0.5, 0.02, d);
                        a *= a;
                        gl_FragColor = vec4(vColor * (0.75 + 0.45 * vTw), a);
                    }`,
            });
            const stars = new THREE.Points(starGeo, starMat);
            scene.add(stars);

            // ─── Nebula clouds: layered additive gradient sprites ───
            const makeNebulaTexture = (r: number, g: number, b: number) => {
                const c = document.createElement("canvas");
                c.width = 256; c.height = 256;
                const x = c.getContext("2d")!;
                for (let i = 0; i < 16; i++) {
                    const px = 128 + (Math.random() - 0.5) * 130;
                    const py = 128 + (Math.random() - 0.5) * 130;
                    const pr = 30 + Math.random() * 85;
                    const grad = x.createRadialGradient(px, py, 0, px, py, pr);
                    grad.addColorStop(0, `rgba(${r},${g},${b},${0.05 + Math.random() * 0.06})`);
                    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
                    x.fillStyle = grad;
                    x.fillRect(0, 0, 256, 256);
                }
                return new THREE.CanvasTexture(c);
            };
            const goldTex = makeNebulaTexture(232, 182, 90);
            const blueTex = makeNebulaTexture(140, 170, 255);
            const nebulae: InstanceType<typeof THREE.Sprite>[] = [];
            const NB = small ? 4 : 7;
            for (let i = 0; i < NB; i++) {
                const m = new THREE.SpriteMaterial({
                    map: i % 2 === 0 ? goldTex : blueTex,
                    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
                    opacity: 0.5 + Math.random() * 0.3,
                    rotation: Math.random() * Math.PI * 2,
                });
                const s = new THREE.Sprite(m);
                const ang = Math.random() * Math.PI * 2;
                const rad = 130 + Math.random() * 300;
                s.position.set(Math.cos(ang) * rad, Math.sin(ang) * rad * 0.7, -180 - Math.random() * 1350);
                const sc = 420 + Math.random() * 420;
                s.scale.set(sc, sc, 1);
                scene.add(s);
                nebulae.push(s);
            }

            // ─── Hyperspace streaks (visible only at warp velocity) ───
            const SN = small ? 40 : 90;
            const sp = new Float32Array(SN * 2 * 3);
            for (let i = 0; i < SN; i++) {
                const a = Math.random() * Math.PI * 2;
                const rad = 40 + Math.pow(Math.random(), 0.7) * 380;
                const z = -Math.random() * DEPTH;
                const len = 70 + Math.random() * 120;
                const x = Math.cos(a) * rad, y = Math.sin(a) * rad;
                sp.set([x, y, z, x, y, z + len], i * 6);
            }
            const streakGeo = new THREE.BufferGeometry();
            streakGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
            const streakMat = new THREE.LineBasicMaterial({ color: 0xffe9c4, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
            const streaks = new THREE.LineSegments(streakGeo, streakMat);
            scene.add(streaks);

            // ─── Waypoint glows = the worlds you fly toward ───
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
            const waypoints: { s: InstanceType<typeof THREE.Sprite>; bx: number; by: number }[] = [];
            for (let i = 0; i < 5; i++) {
                const wm = new THREE.SpriteMaterial({ map: glowTex, color: accent, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7 });
                const s = new THREE.Sprite(wm);
                const ang = Math.random() * Math.PI * 2;
                const bx = Math.cos(ang) * 120, by = Math.sin(ang) * 80;
                s.position.set(bx, by, -300 - i * 300);
                const sc = 80 + Math.random() * 50;
                s.scale.set(sc, sc, 1);
                scene.add(s);
                waypoints.push({ s, bx, by });
            }

            const render = (t: number) => {
                camera.position.z = -dispProgress * travel;
                const tx = mx * 38, ty = -my * 26;
                camera.position.x += (tx - camera.position.x) * 0.05;
                camera.position.y += (ty - camera.position.y) * 0.05;
                camera.lookAt(mx * 26, -my * 18, camera.position.z - 240);
                // subtle banking roll as the voyage progresses
                camera.rotateZ(Math.sin(dispProgress * Math.PI * 2) * 0.03 + mx * 0.012);
                if (!reduce) {
                    const targetFov = 72 + Math.min(vel * 2600, 24);
                    camera.fov += (targetFov - camera.fov) * 0.08;
                    camera.updateProjectionMatrix();
                    stars.rotation.z = t * 0.008;
                    starMat.uniforms.uTime.value = t;
                    streakMat.opacity = Math.min(vel * 2400, 0.55);
                    nebulae.forEach((s, i) => { s.material.rotation += 0.0004 * (i % 2 === 0 ? 1 : -1); });
                    waypoints.forEach((w, i) => {
                        w.s.material.opacity = 0.45 + 0.3 * Math.sin(t * 0.8 + i);
                        w.s.position.x = w.bx + Math.sin(t * 0.15 + i) * 9;
                        w.s.position.y = w.by + Math.cos(t * 0.12 + i * 1.7) * 7;
                    });
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
                starGeo.dispose();
                starMat.dispose();
                streakGeo.dispose();
                streakMat.dispose();
                goldTex.dispose();
                blueTex.dispose();
                glowTex.dispose();
                nebulae.forEach((s) => s.material.dispose());
                waypoints.forEach((w) => w.s.material.dispose());
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
