import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import { site } from "@/config/site";

// Chapter I — Ignition. The spark in the dark; the voyage begins.
export default function Ignition() {
    return (
        <section
            id="ignition"
            data-chapter="ignition"
            className="chapter chapter--spark"
            aria-label="Chapter I: Ignition"
            style={{ minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: 110 }}
        >
            <div aria-hidden="true" className="spark" />
            <Parallax className="chapter-atmos chapter-atmos--spark" from={30} to={-30} />

            <Container>
                <Reveal>
                    <p className="chapter-kicker">
                        <span className="chapter-roman">I</span>
                        <span className="chapter-rule" />
                        <span className="chapter-name">Ignition</span>
                    </p>
                </Reveal>

                <Reveal delay={0.06}>
                    <p className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
                        <span className="spark-dot" /> Available · {site.location}
                    </p>
                </Reveal>

                <Reveal delay={0.1}>
                    <h1 className="display" style={{ marginTop: 20, marginBottom: 18, maxWidth: "16ch" }}>
                        {site.name}
                    </h1>
                </Reveal>

                <Reveal delay={0.16}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: 26 }}>
                        {site.tagline}
                    </p>
                </Reveal>

                <Reveal delay={0.22}>
                    <p className="lead" style={{ marginBottom: 36 }}>
                        A single spark of curiosity, and a long way still to travel. I&apos;m at the
                        beginning of the journey — and already building real things that people use.
                    </p>
                </Reveal>

                <Reveal delay={0.28}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                        <a href="#charted-lights" className="btn btn-primary">See the first world</a>
                        <a href="#constellation" className="btn btn-ghost">Get in touch</a>
                    </div>
                </Reveal>
            </Container>

            <div aria-hidden="true" className="scroll-cue">Begin the voyage</div>

            <style>{`
                .spark {
                    position: absolute; top: 16%; left: 50%;
                    width: 480px; height: 480px; transform: translate(-50%, -50%);
                    background: radial-gradient(circle, rgba(232,182,90,0.18) 0%, rgba(232,182,90,0.06) 36%, transparent 70%);
                    pointer-events: none; z-index: 0;
                    animation: spark-breathe 6s ease-in-out infinite;
                }
                .spark-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: spark-blink 2.4s ease-in-out infinite; }
                .scroll-cue { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--text-faint); }
                @keyframes spark-breathe { 0%,100%{opacity:.7; transform:translate(-50%,-50%) scale(1);} 50%{opacity:1; transform:translate(-50%,-50%) scale(1.08);} }
                @keyframes spark-blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
                @media (prefers-reduced-motion: reduce){ .spark, .spark-dot { animation: none; } }
            `}</style>
        </section>
    );
}
