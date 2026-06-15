"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Thin top progress bar — the overall journey indicator (and the primary
 * progress cue on mobile, where the vertical rail is hidden). Decorative,
 * scroll-linked, aria-hidden. No spring/autonomous animation, so it is inert
 * under reduced motion.
 */
export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
