import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

// Chapter I — Ignition. The voyage begins (background is the WebGL star-voyage).
export default function Ignition() {
    return (
        <section
            id="ignition"
            data-chapter="ignition"
            className="chapter"
            aria-label="Chapter I: Ignition"
            style={{ minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: 110 }}
        >
            <Container>
                <Reveal>
                    <div className="ignition-top">
                        <p className="chapter-kicker">
                            <span className="chapter-roman">I</span>
                            <span className="chapter-rule" />
                            <span className="chapter-name">Ignition</span>
                        </p>
                        <span className="status">
                            <span className="spark-dot" /> Available for work
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <h1 className="display" style={{ marginTop: 28, marginBottom: 20, maxWidth: "15ch" }}>
                        {site.name}
                    </h1>
                </Reveal>

                <Reveal delay={0.14}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: 28 }}>
                        {site.tagline}
                    </p>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="lead" style={{ marginBottom: 38 }}>
                        A single spark of curiosity, and a long way still to travel. I&apos;m at the
                        beginning of the journey — and already building real things that people use.
                    </p>
                </Reveal>

                <Reveal delay={0.26}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                        <a href="#charted-lights" className="btn btn-primary">See the first world</a>
                        <a href="#constellation" className="btn btn-ghost">Get in touch</a>
                    </div>
                </Reveal>
            </Container>

            <div aria-hidden="true" className="scroll-cue">
                <span>Scroll to launch</span>
                <span className="scroll-line" />
            </div>

            <style>{`
                .spark-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: spark-blink 2.4s ease-in-out infinite; flex-shrink: 0; }
                .ignition-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
                .status { display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-dim); }
                .scroll-cue { position: absolute; bottom: 26px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.34em; text-transform: uppercase; color: var(--text-faint); }
                .scroll-line { width: 1px; height: 34px; background: linear-gradient(to bottom, var(--accent), transparent); animation: scroll-drift 1.9s ease-in-out infinite; }
                @keyframes spark-blink { 0%,100%{opacity:1;} 50%{opacity:.3;} }
                @keyframes scroll-drift { 0%{transform:translateY(-7px); opacity:.25;} 50%{opacity:1;} 100%{transform:translateY(7px); opacity:.25;} }
                @media (prefers-reduced-motion: reduce){ .spark-dot, .scroll-line { animation: none; } }
            `}</style>
        </section>
    );
}
