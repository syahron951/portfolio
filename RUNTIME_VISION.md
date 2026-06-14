# RUNTIME — Complete Experience Vision

> **One line:** Syahroni's portfolio is not a website about a developer. It is a living software system you *operate* — an environment that boots, holds real state, responds to you, and reveals depth as you explore. You don't read that he's capable. You experience proof of it.

> **Authored as:** Creative Director · Product Designer · Motion Designer · Senior Engineer.
> **Non-negotiable thesis:** the medium *is* the message. For a developer, the most persuasive possible artifact is an experience that could only have been built by someone genuinely good.

---

## 0. The Laws (every decision obeys these)

These exist because RUNTIME's one fatal risk is "clever but I can't find the work." Each law kills that risk.

1. **Clarity is the first law. The system is texture, never a toll.** A visitor who ignores every effect still gets WHO, WHAT, PROOF, and CONTACT in under 10 seconds. The system rewards exploration; it never gates value behind it.
2. **State is real. Nothing is faked.** Live clock, true status, real "currently building," real projects, real links. The aesthetic of a system is only premium if the system isn't lying. (This also permanently closes the `demo.example.com` credibility wound from the old site.)
3. **Two readings, one build.** An *ambient* reading for skimmers (the always-visible Spine) and a *deep* reading for the curious (the System: modules, inspector, command palette, signature demo). Same DOM, same content — different depth of engagement.
4. **The native cursor is sacred.** The cursor "instrument" is additive and optional. We never do `cursor:none`.
5. **Beauty must survive `prefers-reduced-motion`, touch, keyboard, and a slow connection.** If any of those breaks the experience, the design is wrong, not the user.
6. **Performance is part of the craft.** Founders and developers *will* open the network tab and Lighthouse. The system must be as well-built as it claims to be.

---

## 1. Narrative

The story is told through **operating a machine that is unmistakably Syahroni's**.

Most portfolios are monuments — polished tombstones of finished work, narrated in the past tense. RUNTIME is the opposite: a system that is **online right now**, that you've been given a window into. The narrative premise is *"you've connected to Syahroni's runtime."* It greets you with real state, lets you open its modules, run its processes (his real projects), inspect how it's built, and see where it's headed.

The persuasion is structural, not stated. The site never *claims* "I'm a senior-level builder" (the old site's fatal lie). It simply **is** something only a real builder could make — and lets you draw the conclusion yourself. That inference is far stronger than any sentence, and it's honest: it reframes "early student" into "watch what he can already build," which is the truth and the brief's actual goal.

**Brand truth carried throughout:** *early, but serious.* The system is young — it doesn't pretend to have a decade of uptime. But it is precise, alive, and clearly the work of someone who is going to matter. Trajectory over title.

---

## 2. Story Structure

Five modules — *processes the system runs* — replacing the old About/Skills/Projects/Blog/Contact. Each is a beat in the arc and hands off to the next.

| # | Module (system name) | Human meaning | Story beat |
|---|---|---|---|
| 00 | **`SYSTEM`** | Boot + identity | "You've connected. This is who's running." |
| 01 | **`CRAFT`** | How he works/thinks | "Here's how this machine operates." |
| 02 | **`WORK`** | Real projects (peak) | "Here are the processes it has shipped." |
| 03 | **`VISION`** | Roadmap / trajectory | "Here's what it's compiling next." |
| 04 | **`CONTACT`** | The uplink | "Open a channel." |

The framing is consistent (everything is a process/module/state), but the *content* is plain-spoken. The system metaphor is the **skin**; the skeleton underneath is a clean, conventional, legible portfolio. That duality is the whole trick.

---

## 3. User Journey — first visit to final contact

### Scene 1 — Connect (0–1.5s) · *the boot*
Not a loader. A **boot sequence** that produces real information and earns the next two seconds.

- A single cursor presence appears on ink. A short staged sequence registers the system coming online — but every line is *true telemetry*, rendered in monospace:
  - `connection established`
  - `operator: Syahroni · fullstack engineer`
  - `location: Indonesia · [live local time]`
  - `status: ● available`
  - `currently building: [real current focus]`
- **≤1.5s, skippable on any input, once per session** (sessionStorage). On reduced-motion or repeat visit, it resolves **instantly** to the booted state.
- The boot *is* the hero. By second 2 the visitor already knows who, what, where, and that he's available — before a single scroll. **The Spine is satisfied at boot.**

### Scene 2 — Orient (2–8s) · *the booted environment*
The system settles into its home state: the **Spine** is fully visible — name, one-line role, current focus, a clear path to WORK and CONTACT — wrapped in a quiet, alive environment (subtle telemetry breathing, the status LED pulsing once per ~4s like a real heartbeat). 

The emotional goal here is the pivot the old site never achieved: **"this is impressive *and* I immediately understand it."** Respect before exploration.

### Scene 3 — Explore CRAFT (8–30s)
The visitor opens (or scrolls into) `CRAFT`. They learn *how he thinks* — a real point of view on building software, his actual toolchain shown as fluency (never % bars), his working process. This is where *taste* and *judgment* live — the founder/lead bait. Motion here feels like the system *processing and disclosing*, not decorating.

### Scene 4 — Run WORK (30–70s) · *the peak*
The visitor enters `WORK` — real projects presented as **running processes**. They open one; it expands into an **inspector**: the problem, the key decisions, a live demo or real media, working links, what he learned. The **featured project is the signature interactive moment** (§Project Showcase). This is maximum engagement, maximum trust: the work is real, and it's genuinely good.

### Scene 5 — Read VISION (70–90s)
`VISION` shows trajectory — what he's building toward, the problems he wants to own. The system "looks forward." This earns the *future-founder* read emotionally, by showing direction and momentum rather than asserting a title.

### Scene 6 — Uplink / CONTACT (90s+)
Contact is the natural terminal state of the story — "open a channel." Confident, specific, frictionless: one canonical email, consistent socials, real availability, a downloadable résumé for the recruiter path. Reaching out feels like joining something already in motion.

**Power-user fast path (parallel, optional):** a command palette (`⌘K` / `Ctrl-K`) lets developers jump anywhere, run commands, and find easter eggs — present from boot, required by no one.

---

## 4. Visual Language

**Anti-brief: this is NOT the green-terminal hacker cliché, and NOT the old neon-starfield costume.** It is *premium system design* — what a beautifully made, genuinely usable dev tool or sci-fi OS looks like when a designer with restraint builds it.

- **Base:** deep, slightly warm ink (think near-black graphite, ~`#0A0B0D`), not cold navy. Calm, cinematic, expensive. Real depth via **elevation and hairline edges**, not glassmorphic blur soup.
- **Color discipline — the sophisticated move:** the UI is **monochrome** (a precise grayscale: ink → graphite → fog → off-white text at AA-compliant contrast). There is **exactly one accent**, and it is *reserved for meaning*: live/active/you-are-here state — the status LED, the active module, real-time telemetry. Because the accent only ever marks *aliveness*, it reads as **real signal, not decoration**. (Recommended accent: a single confident "signal" color — an electric green-cyan *or* a warm amber, chosen as a true status color, not a brand gradient. Retire cyan+purple+pink+gold entirely.)
- **Typography — the system's voice:**
  - A precise **neutral grotesk** for display and body. Headlines go *large and editorial* — type carries the drama the old glow tried and failed to carry.
  - A **true monospace** for all data, labels, telemetry, status, numbers, and metadata. Mono is the one deliberate "engineer" signal. Rule: **anything that is system state is set in mono.** This single rule does enormous identity work.
  - Retire Orbitron entirely. Sci-fi display fonts are the tell of a template.
- **Surface & texture:** fine grain/noise on the ink, an optional baseline grid that occasionally registers (the system "sees" its own structure), 1px hairline borders, panels that *mount with elevation*. Crisp, not soft.
- **The cursor instrument (desktop):** the native cursor stays; a subtle companion layer makes the cursor *context-aware* — it can show coordinates, register over interactive "nodes," become a "probe" on inspectable elements. Tasteful, fast, and **fully optional / off in reduced-effects mode**. This replaces the old laggy dot-ring gimmick with something that *means* something.
- **Imagery:** real screenshots, real UI, real product, shown in clean device/inspector frames. **Zero emoji-as-content.**

**Premium test:** before reading a word, a visitor should think *"this person has taste and control."* Restraint + precision + one meaningful accent achieves that; the old site's everything-glows achieved the opposite.

---

## 5. Motion Language

Motion is **system behavior**, never ornament. The governing idea: *the site feels alive and responsive because it is reacting to real state and to you.*

- **Everything has states:** `idle → focus/probe → active → transitioning`. Motion communicates which state a thing is in.
- **Boot:** staged "coming online," ≤1.5s, skippable, once/session (§Scene 1).
- **Module transitions = execution, not slides.** Opening a module *mounts a panel* with crisp spring physics and **content that streams in data-first** (telemetry/labels resolve, then content) — it feels like the system *running a process*, not a page fading in. This is the deliberate replacement for the brief-banned fade-in/slide-up/scroll-reveal default.
- **Ambient aliveness (subtle, constant, cheap):** the live clock ticks, the status LED pulses ~every 4s, a faint telemetry value breathes. Just enough to feel *online* — never enough to distract. All of it freezes under reduced-motion.
- **Scroll within modules:** smooth (Lenis), with reveals that feel like *progressive disclosure / processing* — the system handing you information in considered order, with cinematic holds and beats. Pacing has breath.
- **The signature moment** (in WORK): one genuinely interactive, real-time-responsive demo — the proven canvas/interactive skill repurposed into something *meaningful and inspectable* (you manipulate the actual product or a live system visualization). It is the thing people remember and the clearest single proof of skill.
- **Cursor & input feedback:** interactive nodes respond instantly to the probe; clicks feel like *commands executing* (precise, physical, sub-100ms perceived response).
- **Discipline:** one shared animation loop; **pause on tab blur and off-screen**; GPU-only transforms; strict budget on the signature demo. No three-rAF-loops-forever like the old build.
- **Reduced-motion:** instant boot, frozen telemetry, transitions become hard cuts, no parallax, signature demo falls back to a static, still-beautiful frame. **The reduced version is designed, not degraded.**

---

## 6. Information Architecture

**One environment. Modules within it. Real routes only for real depth.**

```
/                         → the RUNTIME environment (single, stateful)
   ├─ #system  (00)       → boot + identity (the Spine lives here)
   ├─ #craft   (01)       → how he works / thinks
   ├─ #work    (02)       → processes (real projects) — peak
   ├─ #vision  (03)       → roadmap / trajectory
   └─ #contact (04)       → uplink

/work/[slug]              → process inspector — full case study (real projects only)
/resume                   → (or a real downloadable file) — recruiter fast path
```

- **Persistent System Bar (the always-on Spine):** status LED + label (`● available`), operator name, live local time, `currently building: …`, and a one-tap CONTACT. Present in every state, on every device. This *is* the clarity guarantee — orientation never disappears.
- **Modules are addressable and deep-linkable** (`/#work`, `/work/orbit-chat`), back/forward works, every state is shareable. The system feels like software *and* behaves like good web.
- **Command palette (`⌘K`)** = navigation accelerator + power features + easter eggs. Optional, keyboard-first (also an accessibility asset, §9).
- **Removed:** the 4-route page split, the fake blog. **Corrected from the old codebase:** one canonical identity object (kills the 5-way name/handle/email split), one design-token system (kills the duplicated inline `rgba()` chaos), one `Project` type (the old repo had two conflicting ones), proper i18n for EN/ID, Server Components for static content, real metadata + Open Graph + sitemap.
- **Content model forbids fabrication by design** — there is no field to hold a fake metric; `WORK` only renders real, linkable processes; empty/partial states are handled honestly (`processes running: 3`).

---

## 7. Project Showcase Design

This is where RUNTIME wins or loses, so it gets the most specificity. **Projects are running processes.** Depth over quantity: **2–4 real ones**, never fictional, never `example.com`.

### The WORK module — process list
Each real project appears as an **active process row**, with *true* metadata in mono:
- name · `status: LIVE / BUILDING / ARCHIVED` (real) · primary stack · `last updated` · a one-line *what it does*.
- The status uses the meaning-accent LED **plus a text label** (never color alone). A `LIVE` process feels genuinely live.

### Opening a process — the Inspector
Selecting a process expands it (and `/work/[slug]` is the full page) into an **inspector**, structured to convert the two audiences that matter:
1. **What it is** — one honest sentence.
2. **The problem** — what real need it addressed.
3. **The decisions** *(founder/lead bait)* — the key tradeoffs he made and *why*. This is the judgment layer — what technical evaluators actually buy. The old site had none of this.
4. **The proof** — a **live embed/preview** where possible; otherwise real screenshots or a ≤30s screen capture. Working `liveUrl` / `repoUrl` only.
5. **What I learned** — honest, specific. Reinforces "serious, fast-learning."

### The featured process — the signature interaction
The single strongest real project is presented as the **interactive centerpiece**: not described but *operable in real time* — the visitor manipulates the actual product or a live system visualization of it. This is the memorable peak and the single most efficient proof of capability. It is the old starfield's engineering talent redirected from *wallpaper* to *evidence*.

### Honesty & empty-state law
Only real work ships. If there are three real projects, the system says three — and three excellent, deeply-told processes outperform six hollow cards every time. Scarcity of *real* proof reads as focus.

---

## 8. Mobile Experience

Mobile is treated as a **first-class console**, not a shrunk desktop — and it matters disproportionately because **recruiters frequently open links on a phone.** So the mobile Spine must hit hardest.

- **First screen after boot answers everything:** name, one-line role, `currently building`, status LED, and one-tap WORK + CONTACT — no interaction, no scroll required. Clarity law, enforced hardest here.
- **Layout:** single-column console. Modules become full-screen panels that mount with the same "execution" transition (tuned lighter). The System Bar collapses to a compact persistent strip (LED + time + contact).
- **Input model swap:** the desktop cursor-instrument is desktop-only. On touch it becomes **press-state feedback and tap-to-inspect** — taps feel like commands executing (crisp, physical, near-instant). Nodes respond to touch the way they respond to the probe.
- **Command palette** demotes to a small "run/search" affordance; mobile leads with the visible Spine, not the power layer.
- **Signature demo** ships a **touch-native version** (drag/tap interaction) or, where impractical, a tasteful auto-running reduced version with a "tap to interact" invite.
- **Performance budget is stricter on mobile:** lighter ambient telemetry, fewer particles, honor `Save-Data` and reduced-motion, lazy-load the heavy demo. Smoothness > richness on a phone.

---

## 9. Accessibility Strategy

RUNTIME's aesthetic is **presentational; the DOM underneath is clean, semantic, and fully operable.** The system skin must never cost a user the content. This section is a feature, not a compliance checkbox.

- **Native cursor preserved always.** Instrument is additive; off entirely in reduced-effects mode.
- **Keyboard-first, by design.** Every module opens/closes via keyboard. Panels manage focus correctly (trap while open, restore on close). The **command palette is itself a major a11y win** — keyboard users navigate faster than mouse users. Visible, high-contrast focus rings everywhere (the old site had none beyond inputs).
- **Semantic skeleton:** real heading hierarchy, landmark regions, modules as proper sections/dialogs with correct roles and labels. A screen reader gets a **linear, sensible narrative** that tells the same story without the chrome.
- **State is never color-alone:** every LED/accent signal is paired with text (`LIVE`, `available`). Telemetry that is purely decorative is `aria-hidden`; telemetry that carries meaning is labeled.
- **Contrast meets WCAG AA** for all text — explicitly fixing the old `--text-muted` at ~0.35 opacity that failed.
- **Real user controls in the System Bar** (not a fake toggle like the old "light mode"): a genuine **"reduce effects"** switch, plus automatic honoring of `prefers-reduced-motion` and `prefers-reduced-data`/`Save-Data`.
- **`prefers-reduced-motion`:** instant boot, frozen telemetry, cut transitions, static signature frame — a *designed* calm version.
- **Touch targets ≥44px; captions on any video; alt text on all real media.**

---

## 10. Recruiter Experience (the 10-second test)

Designed explicitly for the skimmer who will not interact and may be on a phone with 10 seconds. **They must succeed without touching anything.**

- **By second 2 (post-boot), the Spine has already answered:** WHO (name) · WHAT (one-line role + `currently building`) · AVAILABILITY (`● available`). **By second 10**, PROOF is one obvious tap away and the exits are unmissable.
- **Conventional affordances are always visible:** `View Work`, `Résumé`, `Contact` — the system never hides the door. Cleverness is never a prerequisite.
- **Every link works. A real résumé downloads. Contact is one action.** The `example.com` catastrophe is structurally impossible (real-only law).
- **The wow is a gift, not a toll.** If they ignore every animation and the command palette and the signature demo, they still leave with everything a hiring decision needs — *plus* a faint sense that this person is unusually good.

---

## 11. Founder / Technical-Lead Experience (depth + judgment)

Designed for the evaluator who is buying *how you think* and *what you can build* — and who **will inspect the craft.**

- **The site is the pitch.** They will view-source, open the network tab, run Lighthouse — and find clean semantics, RSC, `next/image`, real performance, accessible patterns. The build quality *is* the argument. (This is why §0 Law 6 exists.)
- **The Inspector's "decisions" layer** gives them the tradeoff-reasoning they actually evaluate — judgment, not feature lists.
- **The signature interactive demo** is undeniable, hands-on evidence of capability.
- **The command palette + easter eggs** reward the technical mind and manufacture word-of-mouth (`whoami`, `ls projects`, a hidden `sudo hire` flourish). Developers *share* things that delight other developers — that's distribution.
- **VISION** demonstrates ownership-level thinking and trajectory → the credible "future founder" read, earned by direction rather than claimed by title.

---

## 12. Emotional Arc

| Beat | Feeling | Engineered by |
|---|---|---|
| **Connect** | Intrigue — *"what is this? it's… alive."* | A boot that's real, fast, and unlike any portfolio they've seen. |
| **Orient** | Respect + relief — *"impressive **and** I instantly get it."* | The Spine resolving clearly inside a living environment. |
| **Craft** | Interest — *"he actually thinks well."* | Point of view + judgment, disclosed like processing. |
| **Work (peak)** | Admiration + trust — *"this is real, and it's genuinely good."* | Real projects + the hands-on signature demo. |
| **Vision** | Belief — *"he's going somewhere."* | Trajectory shown, not asserted. |
| **Contact** | Desire + connection — *"I want to be early to this person."* | A confident, frictionless uplink as the story's natural end. |
| **After leaving** | Memory of *the person* — *"the developer whose portfolio was a living system I actually wanted to play with."* | The whole system being unmistakably his, and unmistakably the work of someone good. |

The old site's lasting memory was *"a space portfolio"* — i.e., the template. RUNTIME's lasting memory is **Syahroni**.

---

## 13. Success Criteria (how we know it worked)

1. **Clarity holds:** a 10-second, no-interaction skim yields WHO/WHAT/PROOF/CONTACT. (If user-testing fails this, the system skin is too thick — thin it, don't ship it.)
2. **Every claim and link is real and works.** Zero fabrication. Zero dead links.
3. **It's memorable:** testers describe *the person* and *one specific moment*, not "a tech portfolio."
4. **It's premium:** first impression is "taste and control," pre-reading.
5. **It's technically impressive *and* sound:** Lighthouse/Core Web Vitals strong; full keyboard + reduced-motion + mobile parity.
6. **It converts the two audiences that matter:** a recruiter can act in 10 seconds; a founder finds real depth and judgment.

---

## Appendix — the one sentence that governs everything

> **RUNTIME must feel like a living software system — yet a stranger on a phone with ten seconds and no patience for cleverness must still walk away knowing exactly who Syahroni is, seeing real proof, and able to contact him in one tap.** Hold both at once, and the portfolio is unforgettable. Drop the second for the first, and it becomes the very thing the old site was: impressive-looking and empty. We do not drop the second.
