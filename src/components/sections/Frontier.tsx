import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";

// Chapter V — The Frontier. The dark = future; the frontier = possibility.
export default function Frontier() {
    return (
        <Chapter id="frontier" roman="V" name="The Frontier" tone="dark">
            {/* faint, not-yet-lit points = futures */}
            <div aria-hidden="true" className="frontier-field">
                {[...Array(7)].map((_, i) => <span key={i} className={`frontier-point fp-${i}`} />)}
            </div>

            <Reveal delay={0.05}>
                <h2 className="display" style={{ marginTop: 26, marginBottom: 24, maxWidth: "20ch" }}>
                    One light charted. A whole frontier still dark.
                </h2>
            </Reveal>

            <Reveal delay={0.1}>
                <p className="body" style={{ fontSize: "1.12rem", marginBottom: 28 }}>
                    The dark isn&apos;t empty — it&apos;s everything I haven&apos;t built yet. I want to keep
                    charting it: more ownership, deeper engineering, and eventually starting things of my own.
                    I&apos;m early, and that&apos;s the point — the most interesting work is still ahead.
                </p>
            </Reveal>

            <Reveal delay={0.16}>
                <ul className="legend">
                    <li><span className="legend-key legend-light" /> Light — what I&apos;ve built</li>
                    <li><span className="legend-key legend-dark" /> Dark — what&apos;s still ahead</li>
                    <li><span className="legend-key legend-frontier" /> The frontier — possibility</li>
                </ul>
            </Reveal>

            <Reveal delay={0.22}>
                <p className="handoff">→ The signals I&apos;m reachable on</p>
            </Reveal>

            <style>{`
                .frontier-field { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
                .frontier-point { position: absolute; width: 3px; height: 3px; border-radius: 50%; background: var(--accent); opacity: 0.25; box-shadow: 0 0 6px var(--accent); }
                .fp-0{ top:22%; left:78%; } .fp-1{ top:40%; left:88%; } .fp-2{ top:64%; left:72%; }
                .fp-3{ top:30%; left:62%; opacity:.16; } .fp-4{ top:74%; left:84%; opacity:.16; }
                .fp-5{ top:54%; left:94%; opacity:.12; } .fp-6{ top:14%; left:68%; opacity:.12; }
                .legend { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 0; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-dim); }
                .legend li { display: flex; align-items: center; gap: 12px; }
                .legend-key { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
                .legend-light { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
                .legend-dark { background: transparent; border: 1px solid var(--line-strong); }
                .legend-frontier { background: var(--accent-soft); border: 1px solid var(--accent-line); }
            `}</style>
        </Chapter>
    );
}
