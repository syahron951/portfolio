# ODYSSEY — Hardening & Production-Readiness Report

> Role: Senior Frontend Engineer · Accessibility Auditor · Performance Engineer · QA Lead.
> Build audited: branch `claude/eager-antonelli-54b30a`, Next.js 16.1.6, single route `/`.
> Method: production build + bundle/asset measurement + dependency graph + code-level a11y/content/UX review.

> **Tooling caveat (honest):** a real headless Lighthouse / device-lab run was **not possible in this environment** (no Chrome/headless browser attaches here). The Lighthouse section below is a *code-grounded projection* with the concrete levers; numbers must be confirmed with an actual `lighthouse` run after deploy. Everything else is measured from the build output and source.

---

## Executive summary

The build is structurally sound (clean TypeScript, clean ESLint, semantic SSR, content visible-by-default, reduced-motion paths). The two material production problems are **weight**, not correctness:

1. **~900 KB of dead public assets** shipped but unreferenced.
2. **framer-motion (~219 KB uncompressed, the largest chunk)** pulled in for only a parallax layer and a progress bar — replaceable with ~40 lines of native rAF.

Plus a small batch of metadata/SEO and a11y polish. No redesign needed.

---

## 1. Lighthouse (projected, code-grounded)

| Category | Projected (now) | After HIGH fixes | Notes |
|---|---|---|---|
| **Performance** | ~82–90 | ~95+ | Dominated by JS weight (framer-motion). Text LCP (no images), low CLS. |
| **Accessibility** | ~92–96 | ~98+ | Semantic, AA contrast, skip link, focus rings. Minor gaps below. |
| **Best Practices** | ~95–100 | 100 | Remove dead assets; add `color-scheme`. |
| **SEO** | ~90 | ~100 | Missing `metadataBase`, robots, sitemap, OG image. |

| Issue | Severity | Impact | Fix complexity | Recommended action |
|---|---|---|---|---|
| framer-motion is the largest JS chunk for 2 trivial effects | **HIGH** | Perf score, TBT/INP, mobile CPU | Medium | Replace with native `requestAnimationFrame` scroll; drop the dependency |
| No `metadataBase` | **HIGH** | OG/Twitter URLs resolve wrong; SEO | Trivial | Add `metadataBase` to metadata |
| No `color-scheme: dark` / viewport theme | MED | Form controls, scrollbar flash, best-practices | Trivial | Add `viewport.colorScheme` + `themeColor` |
| No `robots`/`sitemap` | MED | Crawlability | Low | Add `app/robots.ts` + `app/sitemap.ts` (post-deploy URL) |
| No OG image | MED | Link-share preview is blank | Low–Med | Add a static/OG image later |

## 2. Mobile UX

| Issue | Severity | Impact | Complexity | Action |
|---|---|---|---|---|
| Mobile menu links ~40px tall (target < 44px) | MED | Touch ergonomics on small phones | Trivial | Increase padding to ≥44px |
| `case-grid` / `instruments-grid` collapse to 1-col only < 880px (tablets 768–880 get a single column) | LOW | Slightly sparse on tablet | Trivial | Optional 2-col tweak |
| Hero name `clamp(2.9rem…)` on ~320px phones | LOW | Tight but wraps (`text-wrap: balance`) | — | Acceptable; verify on 320px |
| Rail hidden < 1100px, top bar shown | — | Correct by design | — | OK |

## 3. Accessibility

| Issue | Severity | Impact | Complexity | Action |
|---|---|---|---|---|
| `.nav-toggle` button has no explicit `:focus-visible` style | MED | Keyboard users may not see focus on the hamburger | Trivial | Add focus-visible outline |
| Skip link targets `#ignition` (the section) not `#main` | LOW | Lands slightly below `<main>` start | Trivial | Point to `#main` |
| `--text-faint` (#7f8593) on small mono labels | LOW | ~5.1:1 — passes AA but close | — | Acceptable; monitor |
| Reduced motion | — | Handled in Reveal, Parallax, ScrollProgressBar, spark, twinkle, canvas | — | OK |
| Keyboard nav / focus rings / aria | — | Skip link, `aria-current`, `aria-hidden`, `aria-expanded`, landmarks present | — | OK |
| Heading order (1×h1, 5×h2, h3 cards) | — | Correct | — | OK |

## 4. Performance

| Issue | Severity | Impact | Complexity | Action |
|---|---|---|---|---|
| **Dead public assets:** `logo.png` (445 KB) + `logoS.png` (454 KB) unreferenced; create-next-app SVGs unused | **HIGH** | ~900 KB shipped to deploy for nothing | Trivial | Delete them |
| **framer-motion** dependency (~219 KB chunk) for parallax + progress bar | **HIGH** | First Load JS, TBT, mobile main-thread | Medium | Native rAF replacement; remove dep |
| ~8 scroll-linked parallax layers | LOW | Acceptable; transform-only, rAF-throttled | — | Keep (cheaper after rAF rewrite) |
| Canvas starfield | — | Already tamed (≤120/≤50, pause on blur, static under reduced-motion) | — | OK |
| Layout shift (CLS) | LOW | Transform/opacity only; `next/font` size-adjust; full-height hero | — | Low risk; verify |
| Animation cost | LOW | All GPU transform/opacity; no layout-animating props | — | OK |

## 5. Content (grammar / copy / narrative / tone)

| Issue | Severity | Impact | Complexity | Action |
|---|---|---|---|---|
| Slight phrase repetition — "things people use" (Ignition) / "things people actually use" (Escape Velocity) | LOW | Minor echo | Trivial | Optional reword |
| Grammar | — | Clean across all six chapters | — | OK |
| Narrative consistency | — | Spark → voyage → world → frontier → constellation → spark (closer callback) is coherent | — | OK |
| Tone | — | First-person, honest, ambitious; consistent; no fake authority/metrics | — | OK |
| Lumero facts | — | Owner-provided, verifiable; no invented stack/metrics | — | OK |

## 6. UX (dead ends / interactions / sections / transitions)

| Issue | Severity | Impact | Complexity | Action |
|---|---|---|---|---|
| Rail active-state at extreme top/bottom (rootMargin −45/−45) may briefly skip the last short chapter | LOW | Minor "active" flicker | Low | Acceptable; could tune |
| Footer has no in-page nav (only socials) | LOW | Minor; nav + rail cover it | — | Acceptable |
| Dead ends | — | None — all CTAs resolve; external links valid; mailto valid | — | OK |
| Transitions | — | Horizon line + tone shift; subtle but intentional | — | OK |

---

## Prioritized fix list

### HIGH (implement now)
1. **Delete dead public assets** (~900 KB) — `logo.png`, `logoS.png`, unused create-next-app SVGs.
2. **Remove framer-motion** — replace Parallax + ScrollProgressBar with native rAF scroll; drop the dependency.
3. **Add `metadataBase`** (+ `viewport.colorScheme: "dark"` / `themeColor`).

### MEDIUM (recommended, low-risk)
4. Nav-toggle `:focus-visible`; mobile menu touch targets ≥44px; skip-link → `#main`.
5. `app/robots.ts` + `app/sitemap.ts` (needs the final deploy URL).
6. OG image.

### LOW (optional)
7. Minor copy de-duplication; tablet 2-col grid tweak; rail edge tuning.

---

## What "production-ready" means here
After the HIGH fixes: deploy weight drops ~900 KB of assets + the largest JS dependency, OG/SEO resolves correctly, and the keyboard/focus gap closes — leaving a lean, accessible, semantic build whose remaining items are nice-to-haves, not blockers. Confirm with a real Lighthouse run post-deploy.
