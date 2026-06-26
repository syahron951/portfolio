import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";

// Chapter III — Instruments. The craft that powers the voyage.
// Technology names only — no fabricated proficiency levels.
const skills: Record<string, string[]> = {
    Frontend: ["React / Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    Backend: ["Node.js / Express", "MongoDB", "PostgreSQL", "Redis"],
    Tools: ["Git / GitHub", "Docker", "Vercel / AWS", "Linux / CLI"],
};

const META = [
    { label: "Location", value: "Indonesia" },
    { label: "Focus", value: "Fullstack Web" },
    { label: "Status", value: "Student · Builder" },
];

export default function Instruments() {
    return (
        <Chapter id="instruments" roman="III" name="Instruments">
            <Reveal delay={0.05}>
                <h2 className="display" style={{ marginTop: 26, marginBottom: 22, maxWidth: "18ch" }}>
                    The instruments aboard the craft.
                </h2>
            </Reveal>
            <Reveal delay={0.1}>
                <p className="lead" style={{ marginBottom: 40 }}>
                    The tools I reach for — not as a checklist, but as what lets me travel: design,
                    build, ship, and keep things running.
                </p>
            </Reveal>

            <div className="instruments-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 22 }}>
                {Object.entries(skills).map(([cat, items], i) => (
                    <Reveal key={cat} delay={0.06 + i * 0.05}>
                        <div className="instrument-card">
                            <div className="instrument-cat">{cat}</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {items.map((s) => <span key={s} className="tag">{s}</span>)}
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.2}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 30, marginTop: 34 }}>
                    {META.map((m) => (
                        <div key={m.label}>
                            <div className="meta-label">{m.label}</div>
                            <div style={{ color: "var(--text)" }}>{m.value}</div>
                        </div>
                    ))}
                </div>
            </Reveal>

            <Reveal delay={0.26}>
                <p className="handoff">→ The first world I&apos;ve charted</p>
            </Reveal>

            <style>{`@media (min-width: 760px){ .instruments-grid{ grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
        </Chapter>
    );
}
