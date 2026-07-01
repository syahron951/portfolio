"use client";

import { useEffect, useRef } from "react";

// Shared GLSL value-noise + fbm (cheap, no textures needed).
const NOISE_GLSL = `
float hash(vec3 p){ p = fract(p*0.3183099 + vec3(0.1,0.2,0.3)); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float noise(vec3 x){ vec3 i = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x), mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x), f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x), mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x), f.y), f.z); }
float fbm(vec3 p){ float v = 0.0; float a = 0.5; for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; } return v; }
`;

const SIMPLE_VERT = `
varying vec3 vN; varying vec3 vP;
void main(){ vN = normalize(normalMatrix*normal); vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }
`;

/**
 * The Lumero "planet" v2 — a living world:
 * - fbm-noise surface shader (organic banded storms, animated flow, day/night
 *   terminator, warm rim light).
 * - Night-side "city lights" — the ODYSSEY motif made literal: light = built.
 * - Drifting semi-transparent cloud shell.
 * - Two orbiting moons + a dual particle ring.
 * - Drag-to-orbit with eased momentum.
 *
 * Three.js dynamically imported (shares the voyage chunk). Guards: reduced-
 * motion static frame, pause on tab blur, ResizeObserver, DPR cap, dispose().
 */
export default function LumeroPlanet() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let disposed = false;
        let raf = 0;
        let running = true;
        let cleanup: (() => void) | null = null;

        (async () => {
            const THREE = await import("three");
            if (disposed) return;

            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
            const resize = () => { const w = canvas.clientWidth || 360; renderer.setSize(w, w, false); };
            resize();

            const scene = new THREE.Scene();
            const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
            cam.position.set(0, 0, 4.2);
            const ac = new THREE.Color(0xe8b65a);
            const group = new THREE.Group(); // planet system (drag target)
            scene.add(group);

            // ── Surface: fbm storms + terminator + night-side city lights ──
            const surfMat = new THREE.ShaderMaterial({
                uniforms: { uGold: { value: ac }, uTime: { value: 0 } },
                vertexShader: SIMPLE_VERT,
                fragmentShader: `
                    varying vec3 vN; varying vec3 vP; uniform vec3 uGold; uniform float uTime;
                    ${NOISE_GLSL}
                    void main(){
                        vec3 light = normalize(vec3(0.7,0.45,0.65));
                        float d = clamp(dot(normalize(vN), light), 0.0, 1.0);
                        float n = fbm(vP * 2.6 + vec3(0.0, uTime * 0.05, uTime * 0.02));
                        float bands = sin(vP.y * 7.0 + n * 4.0 + uTime * 0.1);
                        vec3 deep = uGold * 0.16;
                        vec3 dark = vec3(0.045, 0.04, 0.055);
                        vec3 base = mix(deep, uGold, smoothstep(-0.6, 0.9, bands));
                        base = mix(base, uGold * 1.15, smoothstep(0.62, 0.95, n) * 0.35);
                        vec3 col = mix(dark, base, 0.25 + 0.75 * d);
                        // night-side city lights — light = built
                        float night = pow(1.0 - d, 2.2);
                        float lights = step(0.86, noise(vP * 26.0));
                        col += uGold * lights * night * 0.5;
                        // warm rim
                        col += uGold * pow(1.0 - d, 3.0) * 0.14;
                        gl_FragColor = vec4(col, 1.0);
                    }`,
            });
            const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), surfMat);
            group.add(planet);

            // ── Drifting cloud shell ──
            const cloudMat = new THREE.ShaderMaterial({
                uniforms: { uTime: { value: 0 } },
                transparent: true, depthWrite: false,
                vertexShader: SIMPLE_VERT,
                fragmentShader: `
                    varying vec3 vN; varying vec3 vP; uniform float uTime;
                    ${NOISE_GLSL}
                    void main(){
                        float n = fbm(vP * 3.0 + vec3(uTime * 0.04, 0.0, uTime * 0.02));
                        float a = smoothstep(0.55, 0.85, n) * 0.30;
                        vec3 light = normalize(vec3(0.7,0.45,0.65));
                        float d = clamp(dot(normalize(vN), light), 0.0, 1.0);
                        vec3 col = mix(vec3(0.9,0.85,0.75), vec3(1.0,0.96,0.86), d);
                        gl_FragColor = vec4(col, a * (0.35 + 0.65 * d));
                    }`,
            });
            const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.045, 48, 48), cloudMat);
            group.add(clouds);

            // ── Fresnel atmosphere ──
            const atmMat = new THREE.ShaderMaterial({
                uniforms: { uGold: { value: ac } },
                transparent: true, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
                vertexShader: `varying vec3 vN; varying vec3 vV;
                    void main(){ vN = normalize(normalMatrix*normal); vec4 mv = modelViewMatrix*vec4(position,1.0); vV = mv.xyz; gl_Position = projectionMatrix*mv; }`,
                fragmentShader: `varying vec3 vN; varying vec3 vV; uniform vec3 uGold;
                    void main(){ vec3 V = normalize(-vV); float f = pow(1.0 - max(dot(normalize(vN),V),0.0), 3.0); gl_FragColor = vec4(uGold*f, f); }`,
            });
            const atm = new THREE.Mesh(new THREE.SphereGeometry(1.28, 48, 48), atmMat);
            group.add(atm);

            // ── Dual particle ring ──
            const makeRing = (count: number, rMin: number, rSpread: number, ySpread: number, size: number, opacity: number) => {
                const rp = new Float32Array(count * 3);
                for (let i = 0; i < count; i++) {
                    const a = Math.random() * Math.PI * 2;
                    const r = rMin + Math.random() * rSpread;
                    rp[i * 3] = Math.cos(a) * r;
                    rp[i * 3 + 1] = (Math.random() - 0.5) * ySpread;
                    rp[i * 3 + 2] = Math.sin(a) * r;
                }
                const g = new THREE.BufferGeometry();
                g.setAttribute("position", new THREE.BufferAttribute(rp, 3));
                const m = new THREE.PointsMaterial({ size, color: ac, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
                return new THREE.Points(g, m);
            };
            const ring = makeRing(600, 1.55, 0.5, 0.06, 0.035, 0.85);
            ring.rotation.x = Math.PI * 0.46;
            group.add(ring);
            const ring2 = makeRing(320, 1.42, 0.1, 0.03, 0.02, 0.45);
            ring2.rotation.x = Math.PI * 0.46;
            group.add(ring2);

            group.rotation.set(0.35, 0.4, 0.1);

            // ── Moons (orbit in scene space, independent of drag) ──
            const makeMoon = (radius: number, hex: number) => {
                const m = new THREE.ShaderMaterial({
                    uniforms: { uCol: { value: new THREE.Color(hex) } },
                    vertexShader: SIMPLE_VERT,
                    fragmentShader: `
                        varying vec3 vN; varying vec3 vP; uniform vec3 uCol;
                        void main(){
                            vec3 light = normalize(vec3(0.7,0.45,0.65));
                            float d = clamp(dot(normalize(vN), light), 0.0, 1.0);
                            gl_FragColor = vec4(uCol * (0.22 + 0.78 * d), 1.0);
                        }`,
                });
                return new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 24), m);
            };
            const moon1 = makeMoon(0.085, 0x9aa4b8);
            const moon2 = makeMoon(0.055, 0xc9b18a);
            scene.add(moon1, moon2);

            // ── Drag to orbit ──
            let drag = false;
            let vx = 0.004;
            let vy = 0;
            let lx = 0, ly = 0;
            const onDown = (e: PointerEvent) => { drag = true; lx = e.clientX; ly = e.clientY; canvas.style.cursor = "grabbing"; canvas.setPointerCapture(e.pointerId); };
            const onMoveP = (e: PointerEvent) => {
                if (!drag) return;
                const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
                group.rotation.y += dx * 0.008;
                group.rotation.x += dy * 0.008;
                vx = dx * 0.008; vy = dy * 0.008;
            };
            const end = () => { drag = false; canvas.style.cursor = "grab"; };
            canvas.addEventListener("pointerdown", onDown);
            canvas.addEventListener("pointermove", onMoveP);
            canvas.addEventListener("pointerup", end);
            canvas.addEventListener("pointercancel", end);
            canvas.addEventListener("pointerleave", () => { if (drag) end(); });

            const render = (t: number) => {
                if (!reduce) {
                    if (!drag) {
                        group.rotation.y += vx;
                        group.rotation.x += vy;
                        vx += (0.004 - vx) * 0.02;
                        vy += (0 - vy) * 0.04;
                    }
                    ring.rotation.z += 0.002;
                    ring2.rotation.z -= 0.0012;
                    clouds.rotation.y += 0.0005;
                    surfMat.uniforms.uTime.value = t;
                    cloudMat.uniforms.uTime.value = t;
                }
                const o1 = t * 0.32, o2 = t * 0.19 + 2.4;
                moon1.position.set(Math.cos(o1) * 2.15, Math.sin(o1) * 0.42, Math.sin(o1) * 2.15);
                moon2.position.set(Math.cos(o2) * 2.7, -Math.sin(o2) * 0.3, Math.sin(o2) * 2.7);
                renderer.render(scene, cam);
            };

            const ro = new ResizeObserver(() => { resize(); if (reduce) render(0); });
            ro.observe(canvas);

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

            if (reduce) render(0);
            else raf = requestAnimationFrame(loop);

            cleanup = () => {
                cancelAnimationFrame(raf);
                ro.disconnect();
                document.removeEventListener("visibilitychange", onVis);
                canvas.removeEventListener("pointerdown", onDown);
                canvas.removeEventListener("pointermove", onMoveP);
                canvas.removeEventListener("pointerup", end);
                canvas.removeEventListener("pointercancel", end);
                planet.geometry.dispose();
                surfMat.dispose();
                clouds.geometry.dispose();
                cloudMat.dispose();
                atm.geometry.dispose();
                atmMat.dispose();
                [ring, ring2].forEach((r) => { r.geometry.dispose(); (r.material as InstanceType<typeof THREE.PointsMaterial>).dispose(); });
                [moon1, moon2].forEach((m) => { m.geometry.dispose(); (m.material as InstanceType<typeof THREE.ShaderMaterial>).dispose(); });
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
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{ width: "100%", maxWidth: 420, aspectRatio: "1", display: "block", cursor: "grab", touchAction: "none" }}
            />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-faint)", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} /> Drag to orbit
            </p>
        </div>
    );
}
