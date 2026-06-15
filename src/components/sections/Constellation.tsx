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
            </Reveal>

            <style>{`
                .constellation { list-style: none; display: flex; flex-wrap: wrap; gap: 14px; margin: 0; }
                .node { display: inline-flex; align-items: center; gap: 10px; padding: 12px 18px; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; background: var(--bg-elev); transition: border-color .18s ease, transform .18s ease; }
                .node:hover { border-color: var(--accent-line); transform: translateY(-2px); }
                .node-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); }
                .node-label { font-family: var(--font-mono); font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-dim); }
                .node:hover .node-label { color: var(--accent); }
            `}</style>
        </Chapter>
    );
}
