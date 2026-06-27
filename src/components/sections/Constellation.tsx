import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import { site } from "@/config/site";

// Chapter VI — The Constellation. The network resolves into connected lights.
export default function Constellation() {
    return (
        <Chapter id="constellation" roman="VI" name="The Constellation">
            <Reveal delay={0.05}>
                <h2 className="display" style={{ marginTop: 22, marginBottom: 22, maxWidth: "16ch" }}>
                    Let&apos;s build something.
                </h2>
            </Reveal>

            <Reveal delay={0.1}>
                <p className="lead" style={{ marginBottom: 30 }}>
                    Open to opportunities, collaborations, and interesting problems. The fastest way to
                    reach me is email — or follow a signal in the constellation below.
                </p>
            </Reveal>

            <Reveal delay={0.14}>
                <a href={`mailto:${site.email}`} className="btn btn-primary" style={{ marginBottom: 36 }}>
                    {site.email}
                </a>
            </Reveal>

            <Reveal delay={0.18}>
                <ConstellationCanvas />
            </Reveal>

            {/* The voyage resolves — back to the spark it began with. */}
            <Reveal delay={0.24}>
                <div className="closer">
                    <span className="closer-spark" aria-hidden="true" />
                    <p className="closer-text">The journey is just beginning.</p>
                </div>
            </Reveal>

            <Reveal delay={0.28}>
                <p className="copyright">© {new Date().getFullYear()} {site.name} · Built in the open</p>
            </Reveal>

            <style>{`
                .closer { display: flex; align-items: center; gap: 14px; margin-top: 60px; padding-top: 30px; border-top: 1px solid var(--line); }
                .closer-spark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 12px var(--accent), 0 0 24px rgba(232,182,90,0.4); flex-shrink: 0; }
                .closer-text { font-family: var(--font-display); font-size: clamp(1.1rem, 2.4vw, 1.5rem); color: var(--text); letter-spacing: -0.01em; margin: 0; }
                .copyright { margin-top: 40px; font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.06em; color: var(--text-faint); }
            `}</style>
        </Chapter>
    );
}
