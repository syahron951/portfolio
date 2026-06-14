import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

export default function Hero() {
    return (
        <section id="origin" className="section" style={{ minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: 120 }}>
            {/* The spark — pure CSS, static under reduced-motion */}
            <div aria-hidden="true" className="spark" />

            <Container>
                <Reveal>
                    <p className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span className="spark-dot" /> Available · {site.location}
                    </p>
                </Reveal>

                <Reveal delay={0.06}>
                    <h1 className="display" style={{ marginTop: 22, marginBottom: 18, maxWidth: "16ch" }}>
                        {site.name}
                    </h1>
                </Reveal>

                <Reveal delay={0.12}>
                    <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.95rem",
                        letterSpacing: "0.06em", color: "var(--accent)", marginBottom: 26,
                    }}>
                        {site.tagline}
                    </p>
                </Reveal>

                <Reveal delay={0.18}>
                    <p className="lead" style={{ marginBottom: 36 }}>
                        I&apos;m at the beginning of a long journey as a builder — and already shipping
                        real things. I design, build, and maintain software that people actually use.
                    </p>
                </Reveal>

                <Reveal delay={0.24}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                        <a href="#work" className="btn btn-primary">View Lumero</a>
                        <a href="#contact" className="btn btn-ghost">Get in touch</a>
                    </div>
                </Reveal>
            </Container>

            {/* Scroll cue */}
            <div aria-hidden="true" style={{
                position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
                fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.3em",
                textTransform: "uppercase", color: "var(--text-faint)",
            }}>
                Scroll
            </div>

            <style>{`
                .spark {
                    position: absolute; top: 14%; left: 50%;
                    width: 460px; height: 460px; transform: translate(-50%, -50%);
                    background: radial-gradient(circle, rgba(232,182,90,0.16) 0%, rgba(232,182,90,0.05) 35%, transparent 68%);
                    pointer-events: none; z-index: -1;
                    animation: spark-breathe 6s ease-in-out infinite;
                }
                .spark-dot {
                    width: 7px; height: 7px; border-radius: 50%;
                    background: var(--accent); box-shadow: 0 0 10px var(--accent);
                    animation: spark-blink 2.4s ease-in-out infinite;
                }
                @keyframes spark-breathe {
                    0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
                    50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
                }
                @keyframes spark-blink {
                    0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .spark, .spark-dot { animation: none; }
                }
            `}</style>
        </section>
    );
}
