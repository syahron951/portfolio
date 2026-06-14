import { Project } from "@/types/project";
import { site } from "@/config/site";

// ─────────────────────────────────────────────────────────────────────────
// REAL PROJECTS ONLY.
// The six previous entries (Nebula Commerce, Orbit Chat, Stellar CMS, etc.)
// were fabricated and pointed at https://demo.example.com — removed entirely.
//
// Lumero.id is the one real, known project. Its narrative content is left as
// an explicit TODO: it must be written truthfully by a human, not invented.
// Do NOT auto-fill description/tech/links with guesses.
// ─────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "lumero",
    title: "Lumero.id",
    // TODO(human): replace with a real, specific description —
    // what Lumero.id is, the problem it solves, and your role in building it.
    description:
      "TODO — add a real description of Lumero.id: what it is, the problem it solves, and your role.",
    // TODO(human): list the actual technologies used.
    tech: [],
    emoji: "🌐",
    // TODO(human): verify this resolves before publishing.
    demo: "https://lumero.id",
    // TODO(human): link the specific repository if public; otherwise remove.
    github: site.socials.github,
    status: "live",
    featured: true,
  },
];
