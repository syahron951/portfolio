import Reveal from "@/components/Reveal";
import Chapter from "@/components/Chapter";
import FrontierMap from "@/components/FrontierMap";

// Chapter V — The Frontier. The dark = future; the frontier = possibility.
// The legend is now a functional instrument: three modes driving the star map.
export default function Frontier() {
    return (
        <Chapter id="frontier" roman="V" name="The Frontier">
            <Reveal delay={0.05}>
                <h2 className="display" style={{ marginTop: 26, marginBottom: 24, maxWidth: "20ch" }}>
                    One light charted. A whole frontier still dark.
                </h2>
            </Reveal>

            <Reveal delay={0.1}>
                <p className="body" style={{ fontSize: "1.12rem", marginBottom: 30 }}>
                    The dark isn&apos;t empty — it&apos;s everything I haven&apos;t built yet. I want to keep
                    charting it: more ownership, deeper engineering, and eventually starting things of my own.
                    I&apos;m early, and that&apos;s the point — the most interesting work is still ahead.
                </p>
            </Reveal>

            <Reveal delay={0.16}>
                <FrontierMap />
            </Reveal>

            <Reveal delay={0.22}>
                <p className="handoff">→ The signals I&apos;m reachable on</p>
            </Reveal>
        </Chapter>
    );
}
