"use client";

import { useEffect, useRef } from "react";

/**
 * The Lumero "planet" — a GLSL-shaded sphere with a fresnel atmosphere and an
 * orbiting particle ring, draggable to orbit. The hero visual of the Charted
 * Lights chapter. Three.js is dynamically imported (shares the voyage chunk).
 *
 * Guards: prefers-reduced-motion renders one static frame (no auto-spin); loop
 * pauses on tab blur; pixel ratio capped at 2; resizes with its container.
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
            const group = new THREE.Group();
            scene.add(group);

            const surfMat = new THREE.ShaderMaterial({
                uniforms: { uGold: { value: ac }, uTime: { value: 0 } },
                vertexShader: `varying vec3 vN; varying vec3 vP;
                    void main(){ vN = normalize(normalMatrix*normal); vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
                fragmentShader: `varying vec3 vN; varying vec3 vP; uniform vec3 uGold; uniform float uTime;
                    void main(){
                        vec3 light = normalize(vec3(0.7,0.45,0.65));
                        float d = clamp(dot(normalize(vN), light), 0.0, 1.0);
                        float bands = sin(vP.y*9.0 + sin(vP.x*3.0 + uTime*0.2)*0.6);
                        vec3 deep = uGold*0.20;
                        vec3 dark = vec3(0.05,0.045,0.06);
                        vec3 base = mix(deep, uGold, smoothstep(-0.5,0.85,bands));
                        vec3 col = mix(dark, base, 0.30 + 0.70*d);
                        col += uGold*pow(1.0-d,3.0)*0.12;
                        gl_FragColor = vec4(col,1.0);
                    }`,
            });
            const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), surfMat);
            group.add(planet);

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

            const RN = 600;
            const rp = new Float32Array(RN * 3);
            for (let i = 0; i < RN; i++) {
                const a = Math.random() * Math.PI * 2;
                const r = 1.55 + Math.random() * 0.5;
                rp[i * 3] = Math.cos(a) * r;
                rp[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
                rp[i * 3 + 2] = Math.sin(a) * r;
            }
            const rgeo = new THREE.BufferGeometry();
            rgeo.setAttribute("position", new THREE.BufferAttribute(rp, 3));
            const rmat = new THREE.PointsMaterial({ size: 0.035, color: ac, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
            const ring = new THREE.Points(rgeo, rmat);
            ring.rotation.x = Math.PI * 0.46;
            group.add(ring);

            group.rotation.set(0.35, 0.4, 0.1);

            // drag to orbit
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
                    surfMat.uniforms.uTime.value = t;
                }
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
                atm.geometry.dispose();
                atmMat.dispose();
                rgeo.dispose();
                rmat.dispose();
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
