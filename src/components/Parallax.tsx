"use client";

import { useRef, useEffect, type ReactNode } from "react";

/**
 * Scroll-LINKED parallax (not scroll hijacking) — native rAF implementation,
 * no animation library. Reads the element's position via getBoundingClientRect
 * on a passive scroll listener (throttled to one update per frame) and writes
 * only `transform` (GPU, no layout). Decorative/aria-hidden only, so it can
 * never gate content visibility. Static (no transform) under reduced motion.
 *
 * Mapping matches the previous Framer version: progress 0 when the element top
 * is at the viewport bottom, 1 when its bottom is at the viewport top, linearly
 * interpolated [from → to] in px.
 */
export default function Parallax({
    className,
    from = 40,
    to = -40,
    children,
}: {
    className?: string;
    from?: number;
    to?: number;
    children?: ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let raf = 0;
        let ticking = false;

        const update = () => {
            ticking = false;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || 1;
            const total = rect.height + vh;
            const p = total > 0 ? Math.min(1, Math.max(0, (vh - rect.top) / total)) : 0;
            const y = from + (to - from) * p;
            el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
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
    }, [from, to]);

    return <div ref={ref} className={className} aria-hidden="true">{children}</div>;
}
