import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";
import { site } from "@/config/site";

// Chapter VI — The Constellation. The network resolves into connected lights.
const CHANNELS = [
    { label: "GitHub", href: site.socials.github },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Instagram", href: site.socials.instagram },
];

export default function Constellation() {
    return (
        <Chapter id="constellation" roman="VI" name="The Constellation" tone="network">
            <Reveal delay={0.05}>
                <h2 className="display" style={{ marginTop: 26, marginBottom: 22, maxWidth: "16ch" }}>
                    Let&apos;s build something.
                </h2>
            </Reveal>

            <Reveal delay={0.1}>
                <p className="lead" style={{ marginBottom: 34 }}>
                    Open to opportunities, collaborations, and interesting problems. The fastest way to
                    reach me is email — or follow a signal in the constellation below.
                </p>
            </Reveal>

            <Reveal delay={0.14}>
                <a href={`mailto:${site.email}`} className="btn btn-primary" style={{ marginBottom: 30 }}>
                    {site.email}
                </a>
            </Reveal>

            <Reveal delay={0.18}>
                <div className="constellation-wrap">
                    <span aria-hidden="true" className="constellation-line" />
                    <ul className="constellation" aria-label="Social channels">
                        {CHANNELS.map((c) => (
                            <li key={c.label}>
                                <a href={c.href} target="_blank" rel="noopener noreferrer" className="node">
                                    <span className="node-dot" aria-hidden="true" />
                                    <span className="node-label">{c.label} ↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Reveal>

            {/* The voyage resolves — back to the spark it began with. */}
            <Reveal delay={0.24}>
                <div className="closer">
                    <span className="closer-spark" aria-hidden="true" />
                    <p className="closer-text">The journey is just beginning.</p>
                </div>
            </Reveal>

            <style>{`
                .constellation-wrap { position: relative; display: inline-block; }
                .constellation-line { position: absolute; top: 50%; left: 6%; right: 6%; height: 1px; background: linear-gradient(90deg, transparent, var(--accent-line), transparent); z-index: 0; }
                .constellation { position: relative; z-index: 1; list-style: none; display: flex; flex-wrap: wrap; gap: 14px; margin: 0; }
                .node { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; background: var(--bg-elev); transition: border-color .18s ease, transform .18s ease; }
                .node:hover { border-color: var(--accent-line); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,182,90,0.12); }
                .node-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); }
                .node-label { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-dim); }
                .node:hover .node-label { color: var(--accent); }
                .closer { display: flex; align-items: center; gap: 14px; margin-top: 64px; padding-top: 30px; border-top: 1px solid var(--line); }
                .closer-spark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent), 0 0 24px rgba(232,182,90,0.4); flex-shrink: 0; }
                .closer-text { font-family: var(--font-display); font-size: clamp(1.1rem, 2.4vw, 1.5rem); color: var(--text); letter-spacing: -0.01em; }
            `}</style>
        </Chapter>
    );
}
