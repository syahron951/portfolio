"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -100, y: -100 });
    const ring = useRef({ x: -100, y: -100 });
    const animRef = useRef<number>(0);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            if (dotRef.current) {
                dotRef.current.style.left = pos.current.x + "px";
                dotRef.current.style.top = pos.current.y + "px";
            }
            ring.current.x += (pos.current.x - ring.current.x) * 0.12;
            ring.current.y += (pos.current.y - ring.current.y) * 0.12;
            if (ringRef.current) {
                ringRef.current.style.left = ring.current.x + "px";
                ringRef.current.style.top = ring.current.y + "px";
            }
            animRef.current = requestAnimationFrame(animate);
        };

        const handleEnter = () => {
            if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(2)";
            if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1.5)";
        };
        const handleLeave = () => {
            if (dotRef.current) dotRef.current.style.transform = "translate(-50%,-50%) scale(1)";
            if (ringRef.current) ringRef.current.style.transform = "translate(-50%,-50%) scale(1)";
        };

        document.addEventListener("mousemove", moveCursor);
        document.querySelectorAll("a, button").forEach((el) => {
            el.addEventListener("mouseenter", handleEnter);
            el.addEventListener("mouseleave", handleLeave);
        });

        animRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener("mousemove", moveCursor);
            cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="custom-cursor" />
            <div ref={ringRef} className="custom-cursor-ring" />
        </>
    );
}