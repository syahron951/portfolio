import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";
import { site } from "@/config/site";

// Chapter II — Escape Velocity. Leaving the origin; the becoming.
export default function EscapeVelocity() {
    return (
        <Chapter id="escape-velocity" roman="II" name="Escape Velocity" tone="warm">
            <Reveal delay={0.05}>
                <h2 className="display" style={{ marginTop: 26, marginBottom: 24, maxWidth: "20ch" }}>
                    Leaving the familiar to build something.
                </h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="body" style={{ marginBottom: 16 }}>
                    I&apos;m {site.name}, an Informatics student who builds software — and I care more about
                    shipping things people actually use than about collecting tutorials. The further I go,
                    the more I want to own real problems end to end.
                </p>
            </Reveal>
            <Reveal delay={0.14}>
                <p className="body">
                    I like the whole arc of building: understanding a real need, making the technical
                    decisions, shipping it, and keeping it running. Every project pulls me a little
                    further from the ground — and a little closer to the kind of builder, and founder,
                    I want to become.
                </p>
            </Reveal>

            <Reveal delay={0.2}>
                <p className="handoff">→ The instruments that make the voyage possible</p>
            </Reveal>
        </Chapter>
    );
}
