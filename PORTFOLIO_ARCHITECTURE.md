# PORTFOLIO ARCHITECTURE

> Translates the creative direction into structure: sitemap, journey, sections, navigation, and information architecture.
> Core shift: **from a 4-route multi-page template → to one continuous, scroll-driven narrative**, with real depth available on demand.

---

## 1. Sitemap

### Primary surface — the narrative (single page, `/`)

A continuous scroll. Each chapter is a "scene," not a routed page. This is the whole experience for most visitors.

```
/  (the story — one continuous scroll)
├── 00 · Open / Origin
├── 01 · The Builder's Mind (Craft)
├── 02 · Creations (Proof)        ← peak; teases case studies
├── 03 · Vision / What's Next
└── 04 · Invitation (Contact)
```

### Secondary surfaces — depth on demand (real routes)

Only these earn a route, because they hold *real, deep* content that shouldn't bloat the main scroll:

```
/work/[slug]    → full case study for ONE real project (2–4 total)
/notes          → OPTIONAL. Only if writing will be maintained. Else omit.
/notes/[slug]   → individual real article
```

### Removed
- `/about` → folded into Origin + Builder's Mind on the main scroll.
- `/projects` (grid) → replaced by the Creations chapter + `/work/[slug]` case studies.
- `/blog` (fake) → removed; optionally reborn as `/notes` **only if real and maintained**.

> **Rule:** a route must justify itself with real, substantial content. No route exists to host a section that could live in the scroll, and no route hosts fabricated content.

---

## 2. User Journey

### The intended path (most visitors)
```
Land (0–3s)        → Origin hooks with one true, specific line. No forced gate.
Scroll (3–30s)     → Craft: how he thinks/builds. Builds interest + taste read.
Scroll (30–70s)    → Creations: real work, scroll-driven. Peak engagement + trust.
   ↳ optional dive → /work/[slug] for the full decision story.
Scroll (70–90s)    → Vision: trajectory. Earns "founder" read.
Arrive (90s+)      → Invitation: confident, specific CTA. Contact.
```

### Audience-specific reads (designed for, per the strategic review)
- **Recruiter (skims, ~20s):** must hit *real proof + clear role + one memorable thing* fast. Creations and the headline must survive a skim. No `demo.example.com` — every link must work.
- **Founder / Technical lead (evaluates judgment):** Builder's Mind + a case study's *decisions* section is for them. They're buying *how you think*, not feature counts.
- **Potential client (wants reliability + range):** Creations breadth + a clear, low-friction invitation.
- **Other developers (judge craft):** the site *itself* is the proof — its restraint, performance, and one signature interaction. They'll inspect, so the code and motion must be clean.

---

## 3. Section Breakdown (main scroll)

### 00 · Open / Origin
- **Job:** earn the second scroll in 3 seconds; establish *who* and *taste*.
- **Content:** canonical name (one form), a single specific positioning line (not "welcome to my portfolio"), one true origin beat. Confident, spacious, type-led.
- **Motion:** quiet, cinematic open. No forced preloader. If an intro moment is kept, it is <1s and instantly skippable.
- **Replaces:** current Hero (typewriter, badge, fake stats, spinning-ring avatar) — all removed.

### 01 · The Builder's Mind (Craft)
- **Job:** show *how he thinks and works* — the source of memorability and the founder/lead read.
- **Content:** a real point of view on building software; the actual tools/stack shown as *fluency*, not % bars; process and taste.
- **Motion:** scroll-driven reveal of ideas; layered depth; pacing with holds.
- **Replaces:** About bio + skill percentage bars (bars deleted entirely).

### 02 · Creations (Proof) — the peak
- **Job:** convert. Real work, shown with craft.
- **Content:** 2–4 **real** projects. Each card → problem, what it does, stack, real link (live or repo), real screenshot/video. Teases the full case study.
- **Structure:** featured project gets a large, scroll-driven editorial treatment; others are quieter but equally real.
- **Motion:** the signature scroll-driven moment lives here (camera-through-the-work feel).
- **Replaces:** the 6 fake emoji cards + `demo.example.com`. **Honesty gate: real only.**

### 03 · Vision / What's Next
- **Job:** earn "future founder" via *trajectory*, not title.
- **Content:** what he's building toward, the problems he wants to own, current direction. Forward-looking, specific.
- **Motion:** opening-up / horizon feel; the visual lifts.
- **Replaces:** the fabricated senior timeline (deleted). A real, short timeline of *genuine* milestones is optional and must be true.

### 04 · Invitation (Contact)
- **Job:** make contact feel like the natural end of the story.
- **Content:** one confident, specific CTA; real email; consistent socials (one GitHub handle); optional real availability status.
- **Motion:** calm landing; the signature accent resolves.
- **Keeps:** the contact-modal *pattern* (it's competent) — restyled to the new system, no fake "transmission" theming unless the metaphor is kept deliberately.

---

## 4. Navigation Strategy

- **Primary nav becomes a progress-aware story nav**, not a page menu. A minimal marker (chapter dots / a thin progress indicator / a small label that updates with the active scene) lets visitors orient and jump within the single scroll.
- **Persistent, low-profile contact affordance** (one corner element) so the CTA is always one click away without dominating.
- **Reduce floating controls.** Keep language toggle (real differentiator). Theme toggle stays **only if a real light mode ships** — otherwise remove it.
- **Anchor-based jumps** within the scroll (`#origin`, `#craft`, `#work`, `#vision`, `#contact`) for direct linking and skimmers.
- **`/work/[slug]` has a clear, calm way back** into the story (not a generic browser-back dependency).
- **Mobile:** the single-scroll model is *naturally* mobile-friendly — collapse the progress nav to a minimal indicator; ensure the signature interaction has a touch-appropriate fallback.

---

## 5. Information Architecture

### Content model (real data, typed)
```
Profile        → one canonical identity object (name, role, location, links, availability)
Project (real) → slug, title, oneLiner, problem, decisions[], stack[],
                 liveUrl?, repoUrl?, media[] (screenshots/video), outcome, learned
Note (optional)→ slug, title, date, body (MDX), real only
Chapter        → narrative content blocks for the scroll (origin, craft, vision copy)
```
- **Single source of truth** for identity — eliminates the 5-way name/handle/email split.
- **`media[]` replaces emoji.** Real screenshots via `next/image`.
- **No field exists to hold fabricated metrics.** If it's not real, it's not modeled.

### Architectural corrections (from audit)
- **Resolve the duplicate `Project` type.** `types/project.ts` and `data/projects.ts` define two incompatible `Project` interfaces — collapse to one.
- **Delete dead code** (`ProjectCard.tsx` is unused; `projects/page.tsx` inlines its own card).
- **Extract design tokens** — replace the dozens of duplicated inline `rgba(0,212,255,…)` literals with real tokens (CSS variables / Tailwind theme). One system, not scattered hex.
- **Reclaim Server Components** — only interactive pieces (smooth scroll, the signature interaction, the contact modal, toggles) are `'use client'`. Static narrative content renders on the server.
- **Internationalization** — move the inline `t()` dictionary to a proper i18n setup (e.g., next-intl) so the bilingual strength scales without a hand-rolled map.

### SEO / sharing IA (currently absent)
- Per-route metadata; Open Graph + Twitter cards (so links sent to recruiters preview well); a real OG image; `sitemap` and `robots`. Case studies (`/work/[slug]`) each get their own metadata — they're the most shareable, link-worthy surfaces.

---

## 6. Why this architecture serves the goal

- **Continuity** — one scroll *is* the "continuous experience" the brief demands; sections hand off instead of sitting as routed islands.
- **Trust** — the IA structurally forbids fake content (no model field for it, real-only Creations gate, working links).
- **Depth without bloat** — `/work/[slug]` holds the substance founders/leads want, off the critical skim path.
- **Memorability** — a single signature moment in Creations, plus a consistent identity, replaces "generic space template" as the thing people remember.
- **Maintainability** — one identity source, one token system, one type, real i18n, RSC where possible — so the craft is real *under the hood*, which other developers will notice.
