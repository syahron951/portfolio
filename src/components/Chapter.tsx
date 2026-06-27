import type { ReactNode } from "react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

/**
 * Chapter shell for the voyage. Renders a numbered header (roman + name) and
 * the chapter body. The atmospheric background is the shared WebGL star-voyage
 * (see VoyageBackground); chapters themselves are transparent so it shows through.
 *
 * Server component — content is SSR'd and visible by default.
 */
export default function Chapter({
    id,
    roman,
    name,
    children,
    full = false,
}: {
    id: string;
    roman: string;
    name: string;
    children: ReactNode;
    full?: boolean;
}) {
    return (
        <section
            id={id}
            data-chapter={id}
            className="chapter"
            aria-label={`Chapter ${roman}: ${name}`}
            style={full ? { minHeight: "100svh", display: "flex", alignItems: "center" } : undefined}
        >
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
