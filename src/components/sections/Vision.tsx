import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Vision() {
    return (
        <section id="vision" className="section">
            <Container>
                <Reveal>
                    <p className="eyebrow">03 / What&apos;s Next</p>
                </Reveal>

                <Reveal delay={0.05}>
                    <h2 className="display" style={{ marginTop: 24, marginBottom: 24, maxWidth: "20ch" }}>
                        Lumero is the first charted world. There&apos;s a lot of dark left to fill in.
                    </h2>
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="body" style={{ fontSize: "1.12rem" }}>
                        I want to keep building real products — taking on more ownership, going deeper
                        technically, and growing into the kind of builder who starts things, not just
                        ships tickets. I&apos;m early, and that&apos;s the point: this is the beginning of a
                        long journey, and the most interesting work is still ahead.
                    </p>
                </Reveal>
            </Container>
        </section>
    );
}
