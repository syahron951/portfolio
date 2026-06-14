import { site } from "@/config/site";

const SOCIALS = [
    { label: "GitHub", href: site.socials.github },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Instagram", href: site.socials.instagram },
];

export default function Footer() {
    return (
        <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--line)" }}>
            <div
                className="container"
                style={{
                    paddingBlock: 36,
                    display: "flex", flexWrap: "wrap", gap: 18,
                    alignItems: "center", justifyContent: "space-between",
                }}
            >
                <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>
                        {site.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-faint)", marginTop: 4 }}>
                        © {new Date().getFullYear()} · Built with Next.js
                    </div>
                </div>

                <ul style={{ listStyle: "none", display: "flex", gap: 22, margin: 0 }}>
                    {SOCIALS.map((s) => (
                        <li key={s.label}>
                            <a
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                                style={{
                                    fontFamily: "var(--font-mono)", fontSize: "0.74rem",
                                    letterSpacing: "0.08em", textTransform: "uppercase",
                                    color: "var(--text-dim)", textDecoration: "none",
                                }}
                            >
                                {s.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <style>{`.footer-link:hover{ color: var(--accent) !important; }`}</style>
        </footer>
    );
}
