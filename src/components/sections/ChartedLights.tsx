import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import LumeroPlanet from "@/components/three/LumeroPlanet";

// Chapter IV — Charted Lights. Lumero, the first discovered world.
// All content owner-provided and verifiable. No fabricated metrics or stack.
const ROLE = ["Website development", "Maintenance", "Feature work", "ERP customization"];

export default function ChartedLights() {
    return (
        <section id="charted-lights" data-chapter="charted-lights" className="chapter" aria-label="Chapter IV: Charted Lights">
            <div className="container">
                {/* World grid: the story, and the world you've arrived at */}
                <div className="world-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
                    <div>
                        <Reveal>
                            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 10px" }}>
                                Charted World 01
                            </p>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 18, marginBottom: 8 }}>
                                <h2 className="display" style={{ marginBottom: 0, fontSize: "clamp(2.6rem, 6.5vw, 4.4rem)", lineHeight: 1 }}>Lumero</h2>
                                <a href="https://lumero.id" target="_blank" rel="noopener noreferrer" className="link" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                                    lumero.id ↗
                                </a>
                            </div>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                                <span className="spark-dot-sm" />
                                <span className="status-line">Live · actively maintained · a real business platform</span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="lead" style={{ maxWidth: "52ch", margin: 0 }}>
                                The first real light on the map. Lumero is a food &amp; beverage business specializing in
                                Korean Potato Mozzarella Bread, operating across multiple locations. I build and maintain
                                its platform — not a demo, not a practice project: real deployment, real customers, real upkeep.
                            </p>
                        </Reveal>
                    </div>

                    <LumeroPlanet />
                </div>

                {/* Case study */}
                <div className="case-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr", marginTop: 48 }}>
                    <Reveal delay={0.04}>
                        <TiltCard as="article" className="case-card">
                            <span className="case-edge" aria-hidden="true" />
                            <h3 className="case-h">Context</h3>
                            <p className="case-p">
                                A growing, multi-location F&amp;B brand needs more than a menu page. Lumero&apos;s
                                platform spans a customer-facing website and an F&amp;B ERP that supports daily operations.
                            </p>
                        </TiltCard>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <TiltCard as="article" className="case-card">
                            <span className="case-edge" aria-hidden="true" />
                            <h3 className="case-h">The problem</h3>
                            <p className="case-p">
                                The website carries real business goals — brand presence, customer information,
                                membership acquisition, store discovery, and marketing — while operations across
                                locations need reliable systems behind the scenes.
                            </p>
                        </TiltCard>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <TiltCard as="article" className="case-card">
                            <span className="case-edge" aria-hidden="true" />
                            <h3 className="case-h">My role</h3>
                            <p className="case-p" style={{ marginBottom: 14 }}>
                                I&apos;m the developer responsible for the website — I built it and I maintain it — and
                                I help develop and adapt the open-source-based F&amp;B ERP that supports operations.
                            </p>
                            <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8, margin: 0, padding: 0 }}>
                                {ROLE.map((r) => <li key={r} className="tag">{r}</li>)}
                            </ul>
                        </TiltCard>
                    </Reveal>
                </div>

                <Reveal delay={0.06}>
                    <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                        <a href="https://lumero.id" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Visit Lumero ↗
                        </a>
                        <p className="handoff" style={{ margin: 0 }}>→ Beyond the charted light, the frontier</p>
                    </div>
                </Reveal>
            </div>

            <style>{`
                .spark-dot-sm { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); flex-shrink: 0; }
                .status-line { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-faint); }
                .case-card {
                    background: var(--bg-elev); border: 1px solid var(--line);
                    border-radius: var(--radius-md); padding: 28px; height: 100%; overflow: hidden;
                    transition: transform .2s cubic-bezier(.22,1,.36,1), border-color .25s;
                }
                .case-edge { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), transparent 70%); opacity: 0.5; }
                .case-h { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin: 0 0 12px; }
                .case-p { color: var(--text-dim); line-height: 1.7; font-size: 0.98rem; margin: 0; }
                @media (min-width: 880px){
                    .world-grid{ grid-template-columns: 1.1fr 0.9fr !important; }
                    .case-grid{ grid-template-columns: repeat(3, 1fr) !important; }
                }
            `}</style>
        </section>
    );
}
