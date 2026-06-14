# ODYSSEY — Portfolio of M. Abdullah Syahroni

Personal portfolio. Built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

This repository is being rebuilt per the strategy/production documents in the
project root (`ODYSSEY_VISION.md`, `ODYSSEY_PRODUCTION_BIBLE.md`, etc.).
**Current stage: Phase 0 — Foundation & Content (complete).** The cinematic
experience (Phase 1+) is not built yet.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
```

## Project structure

```
src/
  app/                  # routes: / (Hero), /about, /projects
  components/           # Navbar, Footer, Hero, SpaceBackground, …
  config/site.ts        # ← canonical identity (name, email, socials). Edit here.
  context/Appcontext.tsx# theme + EN/ID language + translation dictionary
  data/projects.ts      # real projects only
  types/project.ts      # canonical Project type
```

## Editing identity & content

- **Identity** (name, email, GitHub/LinkedIn/Instagram): edit `src/config/site.ts`
  only. Every component reads from there.

## ⚠️ Human TODOs (do not auto-fill — must be truthful)

Real content is added only when verifiable; the rest is flagged, not invented:

- [x] **Lumero** description + live link — added (real, owner-provided).
- [ ] `src/data/projects.ts` — add Lumero's real **tech stack** (not provided yet).
- [ ] `LUMERO_CASE_STUDY.md` — complete the sections marked **`NEEDS YOUR INPUT`**
      (technical decisions, architecture, challenges, outcomes, learnings).
- [ ] `src/app/about/page.tsx` — confirm the skills list reflects what you
      actually use.

## Conventions

- **Design tokens** live as CSS variables in `src/app/globals.css`. Prefer
  tokens over raw hex/rgba in new code.
- **No fabricated content.** Every project, link, and claim must be real.
