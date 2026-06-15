"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-LINKED parallax (not scroll hijacking) — reads native scroll position
 * via Framer useScroll and translates a decorative layer as it passes through
 * the viewport. Intended for atmosphere/decoration only, so it can never gate
 * content visibility. Becomes a plain static element under reduced motion.
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
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [from, to]);

    if (reduce) {
        return <div ref={ref} className={className} aria-hidden="true">{children}</div>;
    }
    return (
        <motion.div ref={ref} className={className} style={{ y }} aria-hidden="true">
            {children}
        </motion.div>
    );
}
