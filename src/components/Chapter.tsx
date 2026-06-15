import type { ReactNode } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

type Tone = "spark" | "warm" | "steady" | "bright" | "dark" | "network";

/**
 * Chapter shell for the voyage. Renders a full-height scene with a numbered
 * header, a tone-based CSS atmosphere layer, and the chapter body.
 *
 * Server component — content is SSR'd and visible by default. (Scroll-linked
 * parallax is layered on in Milestone 2 via a separate client wrapper, never
 * gating content visibility.)
 */
export default function Chapter({
    id,
    roman,
    name,
    tone = "steady",
    children,
    full = false,
}: {
    id: string;
    roman: string;
    name: string;
    tone?: Tone;
    children: ReactNode;
    full?: boolean;
}) {
    return (
        <section
            id={id}
            data-chapter={id}
            className={`chapter chapter--${tone}`}
            aria-label={`Chapter ${roman}: ${name}`}
            style={full ? { minHeight: "100svh", display: "flex", alignItems: "center" } : undefined}
        >
            <div aria-hidden="true" className={`chapter-atmos chapter-atmos--${tone}`} />

            <Container>
                <Reveal>
                    <p className="chapter-kicker">
                        <span className="chapter-roman">{roman}</span>
                        <span className="chapter-rule" />
                        <span className="chapter-name">{name}</span>
                    </p>
                </Reveal>
                {children}
            </Container>
        </section>
    );
}
