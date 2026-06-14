import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

// All content below is owner-provided and verifiable. No metrics or stack are
// fabricated. Deeper engineering detail lives in LUMERO_CASE_STUDY.md and will
// be surfaced in a future iteration once provided.

const ROLE = [
    "Website development",
    "Website maintenance",
    "Feature implementation",
    "Technical improvements",
    "ERP customization & development",
    "Supporting operational workflows",
];

export default function Work() {
    return (
        <section id="work" className="section">
            <Container>
                <Reveal>
                    <p className="eyebrow">02 / The Work · Charted World 01</p>
                </Reveal>

                {/* Title row */}
                <Reveal delay={0.05}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 16, marginTop: 22, marginBottom: 8 }}>
                        <h2 className="display" style={{ marginBottom: 0 }}>Lumero</h2>
                        <a href="https://lumero.id" target="_blank" rel="noopener noreferrer" className="link"
                           style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                            lumero.id ↗
                        </a>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                        <span className="spark-dot-sm" />
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-faint)" }}>
                            Live · actively maintained · a real business platform
                        </span>
                    </div>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="lead" style={{ marginBottom: 40 }}>
                        Lumero is a food &amp; beverage business specializing in Korean Potato Mozzarella
                        Bread, operating across multiple locations. I build and maintain its platform —
                        not a demo, not a practice project: real deployment, real customers, real upkeep.
                    </p>
                </Reveal>

                {/* Case-study panel */}
                <div className="case-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }}>
                    <Reveal delay={0.06}>
                        <article className="case-card">
                            <h3 className="case-h">Context</h3>
                            <p className="case-p">
                                A growing, multi-location F&amp;B brand needs more than a menu page. Lumero&apos;s
                                platform spans a customer-facing website and an F&amp;B ERP that supports daily
                                operations.
                            </p>
                        </article>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <article className="case-card">
                            <h3 className="case-h">The problem</h3>
                            <p className="case-p">
                                The website carries real business goals — brand presence, customer information,
                                membership acquisition, store discovery, and marketing — while operations across
                                locations need reliable systems behind the scenes.
                            </p>
                        </article>
                    </Reveal>

                    <Reveal delay={0.14}>
                        <article className="case-card">
                            <h3 className="case-h">My role</h3>
                            <p className="case-p" style={{ marginBottom: 14 }}>
                                I&apos;m the developer responsible for the website — I built it and I maintain it —
                                and I help develop and adapt the open-source-based F&amp;B ERP that supports operations.
                            </p>
                            <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8, margin: 0 }}>
                                {ROLE.map((r) => <li key={r} className="tag">{r}</li>)}
                            </ul>
                        </article>
                    </Reveal>
                </div>

                <Reveal delay={0.1}>
                    <div style={{ marginTop: 36 }}>
                        <a href="https://lumero.id" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Visit Lumero ↗
                        </a>
                    </div>
                </Reveal>
            </Container>

            <style>{`
                .spark-dot-sm { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); flex-shrink: 0; }
                .case-card { background: var(--bg-elev); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 26px 28px; height: 100%; }
                .case-h { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
                .case-p { color: var(--text-dim); line-height: 1.7; font-size: 0.98rem; }
                @media (min-width: 880px){ .case-grid{ grid-template-columns: repeat(3, 1fr) !important; } }
            `}</style>
        </section>
    );
}
