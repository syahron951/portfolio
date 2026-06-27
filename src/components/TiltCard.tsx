"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Card that tilts in 3D toward the pointer with a moving glare highlight
 * (matches the design's data-tilt/data-glare behavior). Transform-only, so it
 * never gates content visibility. Disabled under prefers-reduced-motion.
 */
export default function TiltCard({
    children,
    className,
    style,
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    as?: "div" | "article";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    const reduce = () =>
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: React.PointerEvent) => {
        const el = ref.current;
        if (!el || reduce()) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 9;
        const ry = (px - 0.5) * 11;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        el.style.borderColor = "var(--accent-line)";
        if (glareRef.current) {
            glareRef.current.style.opacity = "0.85";
            glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(232,182,90,0.20), transparent 55%)`;
        }
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
        el.style.borderColor = "";
        if (glareRef.current) glareRef.current.style.opacity = "0";
    };

    return (
        <Tag
            ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
            className={className}
            style={{ position: "relative", transformStyle: "preserve-3d", willChange: "transform", ...style }}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
        >
            <div
                ref={glareRef}
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, borderRadius: "inherit", opacity: 0, pointerEvents: "none", mixBlendMode: "screen", transition: "opacity .2s" }}
            />
            {children}
        </Tag>
    );
}
