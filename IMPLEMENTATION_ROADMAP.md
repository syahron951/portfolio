# IMPLEMENTATION ROADMAP

> Sequenced plan to go from the current template to the reimagined experience.
> Ordered by *leverage*: the highest-trust, lowest-effort wins come first. Nothing here is code — it is the build sequence and priorities.
> **This roadmap is for discussion and approval. No implementation begins until the strategy is signed off.**

---

## Guiding principles for execution

1. **Content truth before craft.** A beautiful site full of fake links is worse than a plain site that's real. Real content is the prerequisite for everything else.
2. **One identity, one system, one source of truth** — fix the fractured brand and the scattered styles before adding new surface area.
3. **Ship the spine, then the cinema.** Get the honest narrative working with simple motion first; layer scroll-driven cinema once the story holds.
4. **Performance and accessibility are part of the craft**, not a cleanup phase. Other developers *will* inspect.

---

## PHASE 0 — Foundation & Truth (do first, highest leverage)

**Goal:** stop the bleeding (fabrication, fractured identity) and lay clean technical ground. Most of this is decisions + content, not heavy engineering.

**Content & brand (you, not the code):**
- [ ] Decide the **canonical identity**: one name form, one GitHub handle, one email, one avatar. (Removes the 5-way split.)
- [ ] Inventory **real work.** List every genuine project — even small, even unfinished. Pick the 2–4 strongest. For each: what problem, what decisions, what it does, real link/repo, real screenshot or 20s screen capture.
- [ ] Write the **real positioning line** and **one true origin beat**.
- [ ] Decide: **blog stays only if it will be maintained.** Default: remove.
- [ ] Decide: **real light mode or no theme toggle.**

**Technical hygiene (low risk, high payoff):**
- [ ] Remove all fabricated content: fake projects, `demo.example.com`, invented timeline, fake stats, fake blog.
- [ ] Delete dead code (`ProjectCard.tsx`) and resolve the duplicate `Project` type (`types/project.ts` vs `data/projects.ts`).
- [ ] Extract **design tokens** (colors, spacing, type scale) into one system; stop duplicating inline `rgba()` literals.
- [ ] Switch fonts to `next/font` (drop the render-blocking Google `@import`); pick the new typeface(s).
- [ ] Move the 444KB/454KB PNGs to `next/image` + modern formats; remove the missing `/socials/*.png` 404s.
- [ ] Add `prefers-reduced-motion` handling and pause-on-blur for any retained animation.

**Complexity:** Low (engineering) · High (your content effort).
**Exit criteria:** every link works, every claim is true, one identity everywhere, one token system. The site may still *look* like the old one — that's fine. It is now honest and clean.

---

## PHASE 1 — The Narrative Spine

**Goal:** convert 4 routed pages into one continuous, honest scroll. Story first, simple motion.

- [ ] Build the single-page structure: Origin → Craft → Creations → Vision → Invitation.
- [ ] Fold About into Origin + Builder's Mind. Delete the skill % bars; express craft as fluency + point of view.
- [ ] Build Creations from **real** projects; each teases a `/work/[slug]` case study.
- [ ] Implement `/work/[slug]` case-study route (problem → decisions → outcome → learned) for at least the one strongest project.
- [ ] Rebuild Vision around real trajectory (no fake senior timeline).
- [ ] Restyle the contact modal pattern into the new system; wire the consistent, real CTA.
- [ ] Replace page-menu nav with progress-aware story nav + anchor jumps + persistent contact affordance.
- [ ] Apply the new restrained visual system (single accent, editorial type, real whitespace, real screenshots).
- [ ] Reclaim Server Components for static narrative; keep `'use client'` only where interaction requires it.
- [ ] Add metadata, Open Graph/Twitter cards, OG image, sitemap, robots.

**Complexity:** Medium–High.
**Exit criteria:** a stranger can scroll once, understand who Syahroni is, see real proof, and want to make contact — with only simple, tasteful motion so far.

---

## PHASE 2 — The Cinema (scroll-driven motion & signature moment)

**Goal:** elevate the honest spine into the memorable, premium experience.

- [ ] Add smooth scroll (Lenis) + scroll-driven engine (GSAP ScrollTrigger and/or Framer `useScroll`).
- [ ] Implement scene transitions between chapters (pinned sections, layered parallax, camera-through-the-story feel).
- [ ] Build the **one signature interactive moment** (repurpose the proven canvas skill — meaningful, not wallpaper), most likely in Creations.
- [ ] Apply cinematic pacing (holds, staged reveals) — replace default fade/slide everywhere it remains.
- [ ] Verify the full `prefers-reduced-motion` path renders a still-beautiful static experience.
- [ ] Performance pass: pause all loops on blur/off-screen; budget the signature interaction; Lighthouse/Core Web Vitals check.
- [ ] Restore the bilingual system properly (next-intl) so EN/ID scales across the new content.

**Complexity:** High.
**Exit criteria:** the brief's banned patterns are gone; motion tells the story; there is one thing visitors remember; performance and reduced-motion both hold.

---

## PHASE 3 — Polish, Proof & Iterate

**Goal:** finish to a premium bar and keep it real over time.

- [ ] Add remaining real case studies (`/work/[slug]`) one at a time.
- [ ] Optional `/notes` — only if writing is actually happening.
- [ ] Accessibility audit (contrast, focus states, keyboard path, the cursor decision, ARIA on the signature interaction).
- [ ] Cross-device/browser QA; mobile signature-interaction fallback.
- [ ] Real light mode (if chosen) or confirm toggle removal.
- [ ] Analytics on the real funnel (scroll depth, case-study opens, contact clicks) to learn what converts.
- [ ] Set a cadence to add real work as it ships — the site is a *living* build log, not a one-time artifact.

**Complexity:** Low–Medium, ongoing.

---

## Technical priorities (ranked)

1. **Eliminate fabricated content** — credibility is everything; this gates all value.
2. **One identity + one design-token system** — fix the fractured brand and the inline-style chaos.
3. **`next/font`, `next/image`, RSC reclaim** — real performance craft other devs will notice.
4. **Single-page narrative IA + `/work/[slug]`** — the structural heart of the experience.
5. **Scroll-driven motion engine (Lenis + GSAP/scroll)** — the cinematic layer.
6. **Accessibility + reduced-motion + metadata/OG** — the professionalism layer.

## Refactoring priorities (ranked)

1. Resolve duplicate `Project` type; delete unused `ProjectCard.tsx`.
2. Replace inline-style + duplicated hex with tokens (CSS vars / Tailwind theme).
3. Move inline `t()` dictionary → proper i18n (next-intl).
4. Reduce `'use client'` blast radius; server-render static content.
5. Consolidate the three rAF loops; gate on visibility + reduced-motion.
6. Replace `@import` fonts and raw `<img>` throughout.

## Stack recommendations (per brief's "real value only")

| Tech | Verdict | Why |
|---|---|---|
| **Next.js (App Router)** | **Keep** | Correct foundation; reclaim RSC + metadata. |
| **TypeScript** | **Keep** | Non-negotiable. |
| **Framer Motion** | **Keep** | Great for component/UI motion. |
| **Tailwind v4** | **Keep, actually use it** | Make it the token system; stop inlining styles. |
| **Lenis** | **Add** | Smooth scroll is the backbone of scroll-driven storytelling. |
| **GSAP + ScrollTrigger** | **Add** | Best-in-class scroll choreography / pinning / scene transitions. |
| **next-intl** (or similar) | **Add** | Scales the bilingual strength beyond a hand-rolled map. |
| **MDX** | **Add only if** `/notes` or rich case studies are real. | Authoring real long-form content. |
| **Three.js / React Three Fiber** | **Defer / probably skip** | Only if the *one* signature moment genuinely needs 3D. The proven 2D canvas skill likely suffices. Don't add 3D weight for decoration — that repeats the original mistake. |

---

## Estimated complexity (relative)

| Phase | Effort | Risk | Trust impact |
|---|---|---|---|
| **0 · Foundation & Truth** | Low (eng) / High (content) | Low | **Highest** |
| **1 · Narrative Spine** | Medium–High | Medium | High |
| **2 · Cinema** | High | Medium–High | Medium (multiplies Phase 1) |
| **3 · Polish & Iterate** | Low–Medium, ongoing | Low | Compounding |

**The honest truth about sequence:** Phase 0 delivers ~70% of the trust gain for ~20% of the effort. The cinematic motion (Phase 2) is what makes it *memorable* and *premium* — but it only matters once the content underneath is *real*. Build the honest spine first; never decorate an empty room again.

---

## Definition of done (the whole rebuild)

A first-time visitor, 90 seconds in, with no prior context, comes away thinking:
**"This person has taste. This is real. They think well. They're going somewhere. I want to talk to them."**

When that's reliably true across recruiter, founder, lead, client, and developer eyes — the rebuild is done.
