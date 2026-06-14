import { Project } from "@/types/project";

// ─────────────────────────────────────────────────────────────────────────
// REAL PROJECTS ONLY.
// The six previous entries were fabricated and pointed at demo.example.com —
// removed in Phase 0.
//
// Lumero is the first real "charted world" (see LUMERO_CASE_STUDY.md).
// Everything below is from owner-provided, verifiable information.
//
// NOTE(human): the `tech` stack was not provided yet — left empty rather than
// guessed. Fill in the actual technologies used for the website and ERP.
// ─────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "lumero",
    title: "Lumero",
    description:
      "A real food & beverage platform for Lumero — a Korean Potato Mozzarella Bread business operating across multiple locations. I build and maintain the website (brand presence, customer information, membership acquisition, store discovery, marketing) and help develop and customize the open-source-based F&B ERP behind day-to-day operations.",
    // TODO(human): add the real technologies used (website + ERP).
    tech: [],
    emoji: "🌐",
    demo: "https://lumero.id",
    status: "live",
    featured: true,
  },
];
