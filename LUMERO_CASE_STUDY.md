# Lumero — Case Study

> **The first charted world in ODYSSEY.** Lumero's first real, deployed business platform with ongoing responsibility — a milestone in the journey from learner to builder.

> **Source discipline:** every statement below is drawn from owner-provided, verifiable information. Sections (or parts) that require engineering specifics not yet provided are marked **`▢ NEEDS YOUR INPUT`** — they are deliberately *not* invented. No metrics or achievements are fabricated.

> **Positioning (hard rule):** present Lumero as **a real-world business platform that I actively build and maintain** — never as a "student project" or "practice project."

- **Project:** Lumero
- **Website:** https://lumero.id (live)
- **Status:** in active development and maintenance

---

## 1. Context

Lumero is a food & beverage business specializing in **Korean Potato Mozzarella Bread**, operating across **multiple locations**.

It is a **real business serving real customers** — not a tutorial, not a portfolio demo. The platform around it carries real-world requirements: real deployment, ongoing maintenance, and operational reliability.

The digital side of Lumero spans two surfaces:
- a **customer-facing website**, and
- an **F&B ERP system** supporting day-to-day operations.

I am the developer responsible for both surfaces (see §3).

---

## 2. Business Problem

A growing, multi-location F&B brand has needs that a single static page cannot meet. For Lumero, the website exists to support concrete business goals:

- **Brand presence** — a credible, consistent home for the brand online.
- **Customer information** — giving customers what they need to know about Lumero.
- **Membership acquisition** — converting visitors into members.
- **Store discovery** — helping customers find Lumero's locations.
- **Marketing activities** — supporting ongoing marketing.

In parallel, running operations across multiple locations creates a need for **reliable operational systems** — addressed by adapting an F&B ERP (see §7).

> The underlying problem: support a real, multi-location F&B business with a web presence that *acquires and informs customers* and operational tooling that *keeps day-to-day running reliably* — and keep both working over time, not just at launch.

---

## 3. My Role

I am **the developer responsible for the Lumero website** — I built it and I maintain it. I am also involved in **developing and adapting the F&B ERP** used for operations, which is based on open-source software.

My responsibilities:
- Website development
- Website maintenance
- Feature implementation
- Technical improvements
- ERP customization and development
- Supporting operational workflows

This is **ongoing responsibility for a live platform**, not a one-off build.

---

## 4. Technical Decisions

> Focus of this section: the *reasoning* behind the engineering choices.

**Verifiable decision (provided):**
- **Adapt open-source software for the ERP rather than build a bespoke system from scratch.** The F&B ERP is based on open-source software that I customize and develop on top of — a build-vs-adapt decision in favor of leveraging an existing foundation and tailoring it to Lumero's operational needs.

**`▢ NEEDS YOUR INPUT`** — to make this section strong, add the real decisions and *why* you made them, e.g.:
- Why the chosen website stack/framework (the trade-offs you weighed)?
- Hosting/deployment choice and why?
- Why this particular open-source ERP as the base (vs. alternatives)?
- Any decisions driven specifically by being multi-location or by operational reliability needs?

*(Do not list anything here that isn't true. The strength of the case study is honest reasoning, not breadth.)*

---

## 5. System Architecture

At a high level (verifiable), the platform has **two surfaces**: a public **customer-facing website** and an internal **F&B ERP** supporting operations.

**`▢ NEEDS YOUR INPUT`** — the concrete architecture, e.g.:
- How the website is built and served (framework, rendering approach, where it's hosted).
- How the ERP is deployed and where it runs.
- Whether the website and ERP integrate/share data, or are independent.
- Any services for membership, store/location data, or content.

*(A simple, accurate diagram of "what talks to what" is more impressive than an elaborate invented one.)*

---

## 6. Website Development

**Scope (provided):** the website supports brand presence, customer information, membership acquisition, store discovery, and marketing — and I handle its development, maintenance, feature implementation, and technical improvements on an ongoing basis.

**`▢ NEEDS YOUR INPUT`** — the engineering detail, e.g.:
- How membership acquisition works (form, flow, where data goes).
- How store discovery is implemented (location list/map, data source).
- Notable features you built and how.
- Performance, SEO, or reliability improvements you made.

---

## 7. ERP Development

**Scope (provided):** the F&B ERP is **based on open-source software**; I am involved in **developing and adapting** it, **customizing** it, and **supporting operational workflows**.

**`▢ NEEDS YOUR INPUT`** — the specifics, e.g.:
- Which open-source ERP is the base (only if you want it public).
- What you customized or extended, and why.
- Which operational workflows it supports (e.g., what the staff/operations actually use it for).
- How customizations are maintained across updates.

---

## 8. Challenges

**`▢ NEEDS YOUR INPUT`** — real challenges only. Honest difficulty is compelling; invented drama is not. Consider:
- A hard technical problem and how you worked through it.
- Constraints from running a *real* business (deployment, downtime, changing requirements).
- Anything about adapting open-source software that was non-trivial.

---

## 9. Outcomes

**Verifiable (provided):**
- The website is **live at https://lumero.id** and in real use.
- The platform is under **ongoing maintenance and active development** — real, continuing responsibility.

**`▢ NEEDS YOUR INPUT`** — only if you can verify it. **Do not invent metrics.** If you have real, accurate numbers (members, locations supported, uptime, etc.), add them; if not, leave this as the qualitative, true statement above.

---

## 10. What I Learned

**`▢ NEEDS YOUR INPUT`** — your genuine takeaways. The most credible version is specific and honest, e.g.:
- What building and maintaining a *real* platform taught you that a tutorial could not.
- What you learned about adapting open-source software to real operational needs.
- What you'd do differently next time.

---

## ODYSSEY connection — the first charted world

Within the ODYSSEY narrative, Lumero is **the first major charted world**: the first real business platform, the first deployed product carrying ongoing responsibility, and a genuine milestone in the journey as a builder. It is the brightest light in an otherwise-honest, still-being-charted universe — exactly the kind of real proof the experience is built around.

---

### Completion checklist (to finish this case study truthfully)
- [ ] §4 Technical Decisions — real choices + reasoning
- [ ] §5 System Architecture — accurate high-level structure
- [ ] §6 Website Development — how key features work
- [ ] §7 ERP Development — what was customized + workflows supported
- [ ] §8 Challenges — real problems solved
- [ ] §9 Outcomes — verifiable results only (no invented metrics)
- [ ] §10 What I Learned — genuine takeaways
- [ ] `src/data/projects.ts` — fill the real `tech` stack
