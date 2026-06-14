// Canonical Project type — single source of truth for project data.
// Consumed by src/data/projects.ts (and any future project UI).
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  emoji?: string;
  /** Live site / demo URL. */
  demo?: string;
  /** Source repository URL. */
  github?: string;
  status?: "live" | "dev" | "archived";
  featured?: boolean;
}
