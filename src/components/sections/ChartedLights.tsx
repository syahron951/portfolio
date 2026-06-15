import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";
import Parallax from "@/components/Parallax";

// Chapter IV — Charted Lights. Lumero, the first discovered world.
// All content owner-provided and verifiable. No fabricated metrics or stack.
const ROLE = [
    "Website development",
    "Website maintenance",
    "Feature implementation",
    "Technical improvements",
    "ERP customization & development",
    "Supporting operational workflows",
];

export default function ChartedLights() {
    return (
        <Chapter id="charted-lights" roman="IV" name="Charted Lights" tone="bright">
            {/* The world the voyage arrives at — drifts slightly as you approach */}
            <Parallax className="world-glow" from={80} to={-80} />
            <Parallax className="world-ring" from={120} to={-120} />

            <Reveal delay={0.05}>
                <p className="world-tag">Charted World 01</p>
            </Reveal>

            <Reveal delay={0.08}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 18, marginTop: 10, marginBottom: 8 }}>
                    <h2 className="display" style={{ marginBottom: 0, fontSize: "clamp(2.6rem, 6.5vw, 4.4rem)" }}>Lumero</h2>
                    <a href="https://lumero.id" target="_blank" rel="noopener noreferrer" className="link"
                       style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                        lumero.id ↗
                    </a>
                </div>
            </Reveal>

            <Reveal delay={0.1}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 26 }}>
                    <span className="spark-dot-sm" />
                    <span className="status-line">Live · actively maintained · a real business platform</span>
                </div>
            </Reveal>

            <Reveal delay={0.12}>
                <p className="lead" style={{ marginBottom: 40 }}>
                    The first real light on the map. Lumero is a food &amp; beverage business specializing in
                    Korean Potato Mozzarella Bread, operating across multiple locations. I build and maintain
                    its platform — not a demo, not a practice project: real deployment, real customers, real upkeep.
                </p>
            </Reveal>

            <div className="case-grid" style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr" }}>
                <Reveal delay={0.06}>
                    <article className="case-card">
                        <h3 className="case-h">Context</h3>
                        <p className="case-p">
                            A growing, multi-location F&amp;B brand needs more than a menu page. Lumero&apos;s
                            platform spans a customer-facing website and an F&amp;B ERP that supports daily operations.
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
                            I&apos;m the developer responsible for the website — I built it and I maintain it — and
                            I help develop and adapt the open-source-based F&amp;B ERP that supports operations.
                        </p>
                        <ul style={{ listStyle: "none", display: "flex", flexWrap: "wrap", gap: 8, margin: 0 }}>
                            {ROLE.map((r) => <li key={r} className="tag">{r}</li>)}
                        </ul>
                    </article>
                </Reveal>
            </div>

            <Reveal delay={0.1}>
                <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
                    <a href="https://lumero.id" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Visit Lumero ↗
                    </a>
                    <p className="handoff" style={{ margin: 0 }}>→ Beyond the charted light, the frontier</p>
                </div>
            </Reveal>

            <style>{`
                .world-glow {
                    position: absolute; top: -60px; right: -140px;
                    width: 520px; height: 520px; border-radius: 50%;
                    background: radial-gradient(circle, rgba(232,182,90,0.16) 0%, rgba(232,182,90,0.05) 38%, transparent 68%);
                    pointer-events: none; z-index: 0;
                }
                .world-ring {
                    position: absolute; top: 30px; right: -40px;
                    width: 300px; height: 300px; border-radius: 50%;
                    border: 1px solid var(--accent-line); opacity: 0.35;
                    pointer-events: none; z-index: 0;
                }
                @media (max-width: 760px){ .world-ring { display: none; } }
                .world-tag { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--accent); }
                .spark-dot-sm { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); flex-shrink: 0; }
                .status-line { font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-faint); }
                .case-card {
                    position: relative; background: var(--bg-elev); border: 1px solid var(--line);
                    border-radius: var(--radius-md); padding: 28px 28px 26px; height: 100%; overflow: hidden;
                    transition: border-color 0.22s ease, transform 0.22s ease, background 0.22s ease;
                }
                .case-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), transparent 70%); opacity: 0.5; transition: opacity 0.22s ease; }
                .case-card:hover { border-color: var(--accent-line); transform: translateY(-3px); background: var(--bg-elev-2); }
                .case-card:hover::before { opacity: 1; }
                .case-h { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
                .case-p { color: var(--text-dim); line-height: 1.7; font-size: 0.98rem; }
                @media (min-width: 880px){ .case-grid{ grid-template-columns: repeat(3, 1fr) !important; } }
            `}</style>
        </Chapter>
    );
}
