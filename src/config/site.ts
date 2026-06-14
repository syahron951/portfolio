// ─────────────────────────────────────────────────────────────────────────
// CANONICAL IDENTITY — single source of truth.
// Every component must read name / role / email / socials from here.
// This eliminates the previous 5-way split (SYAHRONI vs M.ABDULLAH SYAHRONI,
// github.com/syahroni111 vs github.com/syahroni, etc.).
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  /** Full canonical name. Use this for headings, metadata, copyright. */
  name: "M. Abdullah Syahroni",
  /** Compact form for tight UI (logo, mobile). */
  shortName: "Syahroni",
  /** Single-letter mark / favicon fallback. */
  initial: "S",

  /** Honest positioning — no fake seniority. */
  roles: ["Fullstack Developer", "Software Engineer"] as const,
  tagline: "Informatics Student · Fullstack Developer · Builder",

  location: "Indonesia",
  email: "m.abdullahsyahroni@gmail.com",

  // Real, verified handles. GitHub is now the canonical syahron951.
  socials: {
    github: "https://github.com/syahron951",
    linkedin: "https://www.linkedin.com/in/syahronii/",
    instagram: "https://www.instagram.com/m.a_syahroni/",
  },
} as const;

export type Site = typeof site;
