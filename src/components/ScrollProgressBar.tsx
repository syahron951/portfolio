"use client";

import { useRef, useEffect } from "react";

/**
 * Thin top progress bar — overall journey indicator (and the primary progress
 * cue on mobile, where the vertical rail is hidden). Native rAF, no animation
 * library; writes only `transform: scaleX()` (GPU). Decorative, aria-hidden.
 */
export default function ScrollProgressBar() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let raf = 0;
        let ticking = false;

        const update = () => {
            ticking = false;
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            el.style.transform = `scaleX(${p.toFixed(4)})`;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                raf = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return <div ref={ref} className="scroll-progress" aria-hidden="true" style={{ transform: "scaleX(0)" }} />;
}
