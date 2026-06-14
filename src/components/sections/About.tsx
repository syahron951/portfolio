import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

// Technology names only — no fabricated proficiency levels.
// (Owner-confirmed list pending; see TODO in repo.)
const skills: Record<string, string[]> = {
    Frontend: ["React / Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    Backend: ["Node.js / Express", "MongoDB", "PostgreSQL", "Redis"],
    Tools: ["Git / GitHub", "Docker", "Vercel / AWS", "Linux / CLI"],
};

export default function About() {
    return (
        <section id="about" className="section">
            <Container>
                <Reveal>
                    <p className="eyebrow">01 / The Builder</p>
                </Reveal>

                <div style={{ display: "grid", gap: "clamp(32px, 6vw, 72px)", gridTemplateColumns: "1fr", marginTop: 26 }}>
                    <div className="about-grid" style={{ display: "grid", gap: "clamp(32px, 6vw, 72px)", gridTemplateColumns: "1fr" }}>

                        {/* Narrative */}
                        <div>
                            <Reveal delay={0.05}>
                                <h2 className="display" style={{ marginBottom: 24, maxWidth: "18ch" }}>
                                    Early in the journey. Already building real things.
                                </h2>
                            </Reveal>
                            <Reveal delay={0.1}>
                                <p className="body" style={{ marginBottom: 16 }}>
                                    I&apos;m {site.name}, an Informatics student who builds software — and I care more
                                    about shipping things people actually use than about collecting tutorials.
                                </p>
                            </Reveal>
                            <Reveal delay={0.14}>
                                <p className="body">
                                    I like the whole arc of building: understanding a real problem, making the
                                    technical decisions, shipping it, and keeping it running. Every project is a
                                    chance to think more like an engineer — and, eventually, a founder.
                                </p>
                            </Reveal>

                            <Reveal delay={0.18}>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 30 }}>
                                    <div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 6 }}>Location</div>
                                        <div style={{ color: "var(--text)" }}>{site.location}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 6 }}>Focus</div>
                                        <div style={{ color: "var(--text)" }}>Fullstack Web</div>
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 6 }}>Status</div>
                                        <div style={{ color: "var(--text)" }}>Student · Builder</div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Skills */}
                        <Reveal delay={0.1}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                                {Object.entries(skills).map(([cat, items]) => (
                                    <div key={cat}>
                                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>
                                            {cat}
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                            {items.map((s) => <span key={s} className="tag">{s}</span>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>

            <style>{`@media (min-width: 880px){ .about-grid{ grid-template-columns: 1.4fr 1fr !important; align-items: start; } }`}</style>
        </section>
    );
}
