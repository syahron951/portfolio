import type { ReactNode, CSSProperties } from "react";

/**
 * Entrance animation wrapper — robust by design.
 *
 * Content is VISIBLE BY DEFAULT. The fade-up is a pure-CSS enhancement
 * (see `.reveal` in globals.css) that uses `animation-fill-mode: both`, so it
 * always ends at opacity:1 — and never depends on JS, hydration, or an
 * IntersectionObserver to make content appear. Under prefers-reduced-motion the
 * animation is neutralized and content simply shows.
 *
 * (Replaces the prior Framer `whileInView` version, which baked opacity:0 into
 * SSR and left all content invisible when the client reveal didn't fire.)
 */
export default function Reveal({
    children,
    delay = 0,
    as: Tag = "div",
    className,
}: {
    children: ReactNode;
    delay?: number;
    as?: "div" | "span" | "li";
    className?: string;
}) {
    const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}s` } : undefined;
    return (
        <Tag className={`reveal${className ? ` ${className}` : ""}`} style={style}>
            {children}
        </Tag>
    );
}
