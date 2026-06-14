import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";

const CHANNELS = [
    { label: "GitHub", href: site.socials.github },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Instagram", href: site.socials.instagram },
];

export default function Contact() {
    return (
        <section id="contact" className="section" style={{ paddingBottom: "clamp(90px, 14vh, 160px)" }}>
            <Container>
                <Reveal>
                    <p className="eyebrow">04 / Connect</p>
                </Reveal>

                <Reveal delay={0.05}>
                    <h2 className="display" style={{ marginTop: 24, marginBottom: 22, maxWidth: "16ch" }}>
                        Let&apos;s build something.
                    </h2>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="lead" style={{ marginBottom: 34 }}>
                        Open to opportunities, collaborations, and interesting problems. The fastest way
                        to reach me is email — or find me on the channels below.
                    </p>
                </Reveal>

                <Reveal delay={0.14}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                        <a href={`mailto:${site.email}`} className="btn btn-primary">
                            {site.email}
                        </a>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
                            {CHANNELS.map((c) => (
                                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                                   className="footer-link"
                                   style={{
                                       fontFamily: "var(--font-mono)", fontSize: "0.78rem",
                                       letterSpacing: "0.08em", textTransform: "uppercase",
                                       color: "var(--text-dim)", textDecoration: "none",
                                   }}>
                                    {c.label} ↗
                                </a>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </Container>
        </section>
    );
}
