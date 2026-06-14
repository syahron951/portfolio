# ODYSSEY — Production Bible

> **Author's chair:** Principal Engineer · Technical Architect · Production Director.
> **Mandate:** kill everything unrealistic. One solo student developer, limited time, limited budget.
> **Doctrine:** *A finished masterpiece beats an unfinished dream.* The goal is not the most impressive portfolio — it is the most **memorable portfolio that actually ships.**

> Source docs reviewed: `AUDIT_REPORT.md`, `ODYSSEY_VISION.md`, `ODYSSEY_FILM_DIRECTION.md`.

---

## 0. THE ONE DECISION THAT SAVES THIS PROJECT

The creative docs describe a film that *contains* a portfolio. As an engineer, I invert it:

> **Build the portfolio that contains a film.**

Concretely: **ship the "Briefing" first** — a complete, fast, accessible, honest single-scroll portfolio with real content (Lumero.id, identity, links, contact). It is simultaneously the MVP, the SEO base, the reduced-motion fallback, the recruiter express-lane, and the accessibility layer. *Then* layer ODYSSEY's cinema on top of it, scene by scene.

Why this is non-negotiable engineering:
- **It can never be "unfinished."** At every commit there is a shippable, excellent portfolio. The cinema is additive.
- **It de-risks the whole project.** The scary parts (scroll choreography, atmosphere, sound) sit *on top of* a working base, never *under* it.
- **It matches the budget.** A student can finish the Briefing in ~2–3 weeks. The film can grow for months — or stop any time — without leaving a crater.

Everything below serves this inversion.

---

## 1. WHAT ABSOLUTELY MUST EXIST (the non-negotiables)

If these aren't done, nothing else matters. These are the MVP.

| Must-have | Why it's mandatory |
|---|---|
| **Honest identity, stated plainly** | M. Abdullah Syahroni · Informatics Student · Fullstack Developer · Builder. One canonical name/handle/email everywhere (fixes the audit's 5-way identity split). |
| **Lumero.id case study (real)** | The single most important content. Problem → decisions → screenshots → working link. This is the proof. |
| **Real, working links** | GitHub `github.com/syahron951`, LinkedIn, email. Zero dead links (kills the old `example.com` disaster permanently). |
| **One continuous scroll, dark cinematic aesthetic** | The narrative spine + the visual identity. Replaces 4 routed template pages. |
| **Beautiful typography + restrained color** | The cheapest, highest-leverage "premium" lever. Carries the experience before any motion. |
| **A contact path** | Real email / simple form. One tap. |
| **Mobile-first, fast, accessible, SSR** | Most visitors are on phones; recruiters skim in seconds; this also IS the reduced-motion/SEO base. |
| **One atmospheric signature** | A single, tamed canvas star/spark field (reuse the existing proven `SpaceBackground` code). The *one* "wow" texture — performance-budgeted. |

---

## 2. WHAT SHOULD BE POSTPONED (great, but not now → V2/V3)

These are real and good. They are *enhancements of a working base*, never blockers.

- Scroll-driven scene transitions / match cuts → **V2**
- Parallax depth / "camera-through-space" illusion (2D) → **V2**
- The "ignition" and "illuminate the frontier" interactions → **V2**
- The "constellation" treatment of social links → **V2**
- Sound design (ambient bed + UI SFX, opt-in) → **V2**
- Lumero.id "world arrival" cinematic sequence → **V2** (MVP ships a strong *static* case study)
- Bilingual EN/ID (proper i18n) → **V2** (real differentiator, but not MVP-critical; current inline `t()` is messy)
- True 3D / WebGL / React-Three-Fiber camera → **V3 (and likely never)**
- Original musical score / leitmotif composition → **V3, only if a composer collaborator appears**

---

## 3. WHAT SHOULD BE REMOVED ENTIRELY (the kill list)

Ruthless. These die now and do not come back.

| Killed | Reason |
|---|---|
| **Original 4-minute leitmotif score** | A solo student is not a film composer. Months of effort, zero shipping probability. Replace with licensed ambient + a few SFX (V2). |
| **WebGL/Three.js as the core rendering** | The #1 scope/performance/risk trap. The entire emotional payload is achievable in 2D (CSS + one canvas + scroll). 3D is V3-optional, not foundational. |
| **Literal "camera flying through 3D space"** | Replaced by 2D parallax + scale + opacity, which is ~10% of the cost for ~80% of the feeling. |
| **Custom cursor** | Audit flagged it; jank, a11y cost, near-zero value. Native cursor. |
| **Scroll-hijacking as a requirement** | Native scroll + scroll-*linked* animation. No nausea, no broken find-in-page/anchors. (Optional subtle smoothing in V2, gated by reduced-motion.) |
| **The rocket preloader intro** | Artificial latency. The film "begins" with content already present. |
| **Theme toggle / fake light mode** | It's a dark cinematic film. One mode. Removes a fake control. |
| **Skill % bars** | Meaningless, junior signal (audit). |
| **Blog** | Fake content factory (audit). Gone. Optional real "notes" only if ever maintained. |
| **All fabricated content** | Fake projects, fake timeline, fake stats. Non-negotiable deletion. |
| **Dead code:** unused `ProjectCard.tsx`, duplicate `Project` type | Technical hygiene from the audit. |

---

## 4–6. THE THREE VERSIONS

Each version is **independently shippable and complete.** Stopping after any one leaves a finished product.

### 4. MVP — "THE BRIEFING" *(ships first; the safety net)*
**Promise:** the fastest, clearest, most honest, best-looking student portfolio in the stack — already better than 95% of them.

- Single-scroll, server-rendered, dark cinematic narrative.
- Real content: identity, Lumero.id case study, real links, contact.
- Restrained premium typography + color; generous negative space.
- **One** tamed canvas star/spark field (reused, perf-budgeted, paused off-screen, off under reduced-motion).
- A simple, tasteful "spark" hero moment (CSS/Framer, not 3D).
- Mobile-first, accessible, fast, SEO + Open Graph.
- **Explicitly NOT in MVP:** scene transitions, parallax camera, sound, constellation, i18n, 3D.

**Definition of done:** a recruiter on a phone gets who/proof/contact in 8 seconds; Lighthouse green; works with JS off for content; reduced-motion clean. **This is a finished masterpiece by itself.**

### 5. V2 — "THE VOYAGE" *(the cinema, in 2D)*
**Promise:** now it *feels* like ODYSSEY — without ever touching WebGL.

- The six chapters become a **continuous scroll-driven journey** (Origin → Instruments → Charted Lights → Frontier → Constellation).
- **2D parallax depth + scale shifts** = the camera-movement illusion.
- **Scene transitions / match cuts** between chapters (scroll-linked).
- The **ignition** interaction (hero) and **illuminate-the-frontier** interaction.
- Lumero.id **"world arrival"** sequence (the peak).
- Socials as the **constellation**.
- **Sound design:** licensed ambient bed + a handful of UI SFX, **opt-in, off by default**.
- Bilingual EN/ID via proper i18n.

**Definition of done:** the emotional arc lands; 60fps scroll on a mid-range phone; every V2 layer degrades to the MVP cleanly.

### 6. V3 — "THE FILM" *(ambition; may never ship — and that's correct)*
**Promise:** the full cinematic dream, *only* if V1+V2 are shipped and stable and there's genuine appetite/help.

- WebGL/R3F true 3D depth on hero + frontier (with a 2D fallback always present).
- Original/commissioned score + full leitmotif system (needs a collaborator).
- Shader atmospherics, the most elaborate Lumero.id world, advanced sound mix.

**Production stance:** V3 is a *stretch goal*, not a plan. If it never happens, ODYSSEY is still a finished, memorable success at V2. Do not start V3 until V1 and V2 are live.

---

## 7. FEATURE LEDGER — Value / Complexity / Risk

Scale 1–5. **Value** = memorability/effectiveness. **Complexity** = build effort for a solo student. **Risk** = chance it eats the timeline, janks, or never finishes. Verdict follows.

| Feature | Value | Complexity | Risk | Verdict |
|---|:--:|:--:|:--:|---|
| Honest identity + real content | 5 | 2 | 1 | **MVP — MUST** |
| Lumero.id case study (static) | 5 | 2 | 1 | **MVP — MUST** |
| Real working links / contact | 5 | 1 | 1 | **MVP — MUST** |
| Single-scroll narrative IA | 4 | 2 | 2 | **MVP — MUST** |
| Premium type + color system (tokens) | 5 | 2 | 1 | **MVP — MUST** |
| Dark cinematic aesthetic | 5 | 2 | 1 | **MVP — MUST** |
| One tamed canvas star/spark field | 3 | 2 | 2 | **MVP — MUST (budgeted)** |
| Simple "spark" hero (CSS/Framer) | 4 | 2 | 2 | **MVP** |
| SSR + SEO + OG | 4 | 2 | 1 | **MVP — MUST** |
| Mobile-first + reduced-motion base | 5 | 2 | 1 | **MVP — MUST** |
| Scroll-driven parallax (2D camera illusion) | 4 | 3 | 3 | **V2** |
| Scene transitions / match cuts | 4 | 4 | 3 | **V2** |
| Ignition + frontier interactions | 4 | 3 | 3 | **V2** |
| Lumero.id cinematic "world arrival" | 4 | 3 | 3 | **V2** |
| Constellation socials | 3 | 3 | 2 | **V2** |
| Sound design (ambient + SFX, opt-in) | 3 | 3 | 3 | **V2** |
| Bilingual EN/ID (i18n) | 3 | 2 | 2 | **V2** |
| WebGL/R3F 3D camera | 3 | 5 | 5 | **V3 / likely cut** |
| Original score / leitmotif | 3 | 5 | 5 | **CUT (V3 only w/ composer)** |
| Smooth-scroll hijack (Lenis) as core | 2 | 3 | 4 | **CUT (V2 subtle, optional)** |
| Custom cursor | 1 | 2 | 3 | **CUT** |
| Theme toggle / light mode | 1 | 2 | 2 | **CUT** |
| Skill % bars | 1 | 1 | 2 | **CUT** |
| Blog | 1 | 2 | 3 | **CUT** |

**Reading the ledger:** everything scoring Value ≥4 with Complexity+Risk ≤4 is MVP. High-value/high-cost items are V2. Anything where Complexity *and* Risk are both 5 is cut or quarantined to a never-blocking V3.

---

## 8. TECHNICAL ARCHITECTURE

**Keep the stack; use it correctly.** (The audit showed the stack was fine; the *usage* was the problem.)

- **Framework:** Next.js (App Router) + React 19 + TypeScript. **Server Components by default**; `'use client'` only on interactive scenes (the audit's biggest perf miss was client-everything).
- **Styling:** Tailwind v4 as the **design-token system** (colors, type scale, spacing). Kill the dozens of duplicated inline `rgba()` literals. One source of truth.
- **Motion:** Framer Motion for component motion; **Framer `useScroll`/scroll-linked** for V2 scene choreography. Add Lenis *only* if native + scroll-linked proves insufficient, and only gated behind reduced-motion.
- **Atmosphere:** a **single `<canvas>`** (refactor the existing `SpaceBackground` — the best code in the repo). One `requestAnimationFrame`, paused on blur and when off-screen, capped particle counts, disabled under reduced-motion/save-data.
- **Content model:** typed content objects (or MDX for the Lumero.id case study). One canonical `identity` object. One `Project` type (the repo currently has two conflicting ones — collapse them).
- **Images:** `next/image` for all Lumero.id screenshots (the audit found ~900KB of raw PNGs). Modern formats, lazy.
- **Fonts:** `next/font` (drop the render-blocking Google `@import`).
- **Contact:** `mailto:` for MVP; a no-backend form service (e.g., Formspree-class) if a real form is wanted in V2. **No custom backend** — zero budget, zero maintenance.
- **i18n (V2):** a real library (next-intl class) replacing the hand-rolled `t()` dictionary.
- **Sound (V2):** a tiny audio layer, lazy-loaded, opt-in, with a persistent mute control.
- **Hosting:** Vercel free tier. CI = push to deploy.
- **Architecture principle:** **layered degradation.** Base = semantic SSR content (works with no JS). Layer 1 = MVP motion. Layer 2 = V2 cinema. Each layer is removable without breaking the one below.

---

## 9. PERFORMANCE BUDGET (hard targets, enforced)

| Metric | Target (MVP) | Target (V2) |
|---|---|---|
| **LCP** | < 2.0s | < 2.5s |
| **CLS** | < 0.05 | < 0.1 |
| **INP** | < 200ms | < 200ms |
| **Initial JS (gzip)** | < 120 KB | < 180 KB |
| **Lighthouse Perf (mobile)** | ≥ 90 | ≥ 85 |
| **Scroll framerate** | 60fps | 60fps (no long tasks > 50ms) |
| **Canvas particles** | ≤ 120 desktop / ≤ 50 mobile | same |
| **rAF loops** | exactly 1, paused off-screen/blur | 1 |

**Rules:** content is SSR and visible before JS. Heavy scenes (V2 cinema, sound, any 3D) are **lazy-loaded** and **never block first paint**. Honor `prefers-reduced-data`/`Save-Data`. The lean, fast build *is* part of the portfolio's argument — a CTO will check.

---

## 10. MOBILE-FIRST STRATEGY

Design the phone first; the desktop is the enhancement (recruiters open links on phones).

- **The journey is vertical.** Scroll down = travel onward. Every scene composes for a tall viewport.
- **First mobile screen = the Briefing essentials:** name, role, Lumero.id, contact — no interaction required.
- **Reduce, don't remove, the cinema on mobile:** fewer parallax layers, lighter canvas, simpler transitions — preserve the *arc and pacing*, cut the particle count.
- **Touch-native interactions** (tap to ignite, tap to illuminate); no hover dependencies.
- **Test on a real mid-range Android**, not just a flagship/simulator. If it janks there, it's not done.
- Touch targets ≥ 44px; respect safe-areas; no layout shift.

---

## 11. ACCESSIBILITY REQUIREMENTS (non-negotiable, every version)

- **`prefers-reduced-motion` → the MVP/Briefing static experience.** Because the base is built first and is already calm, the reduced-motion path is *free* and *designed*, not a broken cinema.
- **Semantic, server-rendered DOM** under all visuals: real headings, landmarks, reading order. Full story comprehensible to a screen reader.
- **Keyboard-operable:** advance the journey, reach every chapter, every link, without a mouse. Visible focus states.
- **WCAG AA contrast** for all real text (fixes the audit's 0.35-opacity body text).
- **Never meaning-by-color/light alone:** labels accompany state.
- **Sound off by default;** persistent mute; captions/transcript for any narrated audio.
- **Honor `Save-Data`.** Skip-to-content / "Briefing" control always reachable.

---

## 12. BUILD COMPLEXITY ESTIMATES

Relative effort for **one solo student**, T-shirt sized.

| Workstream | Size | Notes |
|---|---|---|
| Foundation cleanup (tokens, identity, dead code, RSC, images/fonts) | **S–M** | Mostly deletion + refactor; low risk, high payoff. |
| MVP content + Lumero.id case study | **M** | Bottleneck is *writing it well*, not coding. |
| MVP narrative scroll + aesthetic + canvas | **M** | Reuses existing canvas; CSS/Framer only. |
| MVP a11y + perf + SEO pass | **S–M** | Easier because the base is simple. |
| V2 scroll choreography (parallax, transitions) | **L** | The real engineering challenge; iterative. |
| V2 interactions (ignition, frontier, constellation) | **M–L** | Scope-controllable; can ship subsets. |
| V2 sound design | **S–M** | Asset-sourcing > coding. |
| V2 i18n | **S** | Mechanical once a library is in. |
| V3 (3D/score) | **XL** | Open-ended. Do not estimate; do not commit. |

---

## 13. ESTIMATED DEVELOPMENT TIMELINE

Assumes a student at **~10–15 focused hours/week.**

| Phase | Calendar | Outcome |
|---|---|---|
| **Phase 0 — Foundation & content** | Week 1 | Clean base, tokens, real identity, Lumero.id written, dead code gone. |
| **Phase 1 — MVP "The Briefing"** | Weeks 2–3 | **SHIP.** A finished, fast, accessible, honest, beautiful portfolio. Live. |
| *— breathe / get feedback —* | — | Real users see a *complete* thing. |
| **Phase 2 — V2 "The Voyage" (core)** | Weeks 4–7 | Scroll journey, parallax, transitions, Lumero arrival. Ship incrementally. |
| **Phase 3 — V2 polish** | Weeks 8–9 | Interactions, constellation, sound, i18n. **SHIP V2.** |
| **Phase 4 — V3 (optional/indefinite)** | Someday / never | Only if V1+V2 are live and stable. |

**Critical rule:** **deploy at the end of Phase 1.** Do not wait for the film. A live MVP at week 3 is worth infinitely more than a perfect V2 that's still "almost done" at week 12. Every phase ends in a deploy.

---

## 14. THE PRODUCTION DIRECTOR'S BOTTOM LINE

- The creative vision is genuinely strong. **The danger was never the idea — it was scope.**
- The film survives *as a feeling*, delivered in 2D, on top of a portfolio that's complete on day one.
- We cut the score, the 3D, the custom cursor, the scroll-hijack, and the preloader — and **lost almost none of the memorability**, because memorability lives in *honesty + pacing + one real proof + restraint*, not in WebGL.
- The honest dark frontier — the emotional core — costs almost nothing to build. The most moving idea is also the cheapest.

> **The contract:** ship "The Briefing" in three weeks. It is, by itself, a finished masterpiece. Then spend as long as you like turning it into a film — knowing that if you stop at any moment, what's live is already something you're proud of. That is how ODYSSEY actually gets finished.
