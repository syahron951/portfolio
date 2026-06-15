"use client";

import { useEffect, useState } from "react";
import { chapters } from "@/lib/chapters";

/**
 * Fixed vertical progress rail (desktop) — the "you are here" of the voyage.
 * Active chapter is detected with IntersectionObserver (passive, reads scroll;
 * no hijacking). Links jump via native anchors. Hidden on small screens.
 */
export default function ChapterProgress() {
    const [active, setActive] = useState(chapters[0].id);

    useEffect(() => {
        const sections = chapters
            .map((c) => document.getElementById(c.id))
            .filter((el): el is HTMLElement => Boolean(el));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target.id) setActive(visible.target.id);
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="rail" aria-label="Voyage progress">
            <ol className="rail-list">
                {chapters.map((c) => {
                    const isActive = c.id === active;
                    return (
                        <li key={c.id}>
                            <a
                                href={`#${c.id}`}
                                className={`rail-item${isActive ? " is-active" : ""}`}
                                aria-current={isActive ? "true" : undefined}
                            >
                                <span className="rail-dot" aria-hidden="true" />
                                <span className="rail-label">
                                    <span className="rail-roman">{c.roman}</span> {c.name}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
