import { site } from "@/config/site";

// Matches the design: "S" badge wordmark, three chapter links (hidden on small
// screens — the experience is a single scroll), and a Contact button.
// Server component: anchor links + CSS hover, no client JS.
export default function Navbar() {
    return (
        <header className="nav-header">
            <nav className="container" aria-label="Primary" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
                <a href="#ignition" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
                    <span className="nav-badge" aria-hidden="true">S</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-dim)" }}>
                        {site.shortName}
                    </span>
                </a>

                <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
                    <div className="nav-links" style={{ display: "none", alignItems: "center", gap: 24 }}>
                        <a className="nav-link" href="#instruments">Craft</a>
                        <a className="nav-link" href="#charted-lights">Work</a>
                        <a className="nav-link" href="#frontier">Vision</a>
                    </div>
                    <a className="nav-contact" href="#constellation">Contact</a>
                </div>
            </nav>

            <style>{`
                .nav-header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); background: linear-gradient(180deg, rgba(8,9,13,0.7), transparent); }
                .nav-badge { width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--accent-line); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 600; color: var(--accent); font-size: 15px; box-shadow: 0 0 18px rgba(232,182,90,0.25) inset; }
                .nav-link { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-faint); text-decoration: none; transition: color .2s; }
                .nav-link:hover { color: var(--accent); }
                .nav-contact { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #1a1206; background: var(--accent); padding: 9px 16px; border-radius: 7px; text-decoration: none; font-weight: 500; transition: background .2s; }
                .nav-contact:hover { background: var(--accent-bright); }
                .nav-link:focus-visible, .nav-contact:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
                @media (min-width: 760px){ .nav-links { display: flex !important; } }
            `}</style>
        </header>
    );
}
