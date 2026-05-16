---
name: field-notes-design
description: "Use when building UI components, pages, layouts, or styles for the Field Notes blog. Contains design tokens, typography system, component patterns (topbar, hero, posts, newsletter, now playing, code blocks, margin notes, clap heart), and hard brand rules. Invoke for any visual or layout work."
user-invocable: true
---

# Field Notes — Design System Skill

## When to use

- Building or modifying any UI component
- Creating new pages or sections
- Styling elements or adjusting layout
- Adding animations or interactions

## Design references

These are **visual specs only** — prototype HTML/React+Babel, NOT production code. Extract design intent, spacing, colors, and typography from them.

### Homepage

Read `claude-design/Blog Homepage.html` → loads `claude-design/styles.css` + `claude-design/components.jsx` + `claude-design/background.jsx`

**Sections**: topbar (brand mark + nav) → hero (portrait + bio) → posts list → newsletter card → now-playing widget → footer

### Post page

Read `claude-design/Blog Post.html` → loads `claude-design/post-styles.css` + `claude-design/post.jsx`

**Layout**: reading progress bar → breadcrumb → title block → 3-column grid (TOC rail | article body | margin notes rail) → engagement bar (clap heart) → share rail → next-post card → footer

### Tokens

Read `claude-design/colors_and_type.css` for every design token. These are already mapped to Tailwind in `src/app/globals.css` — use Tailwind classes, not raw CSS vars.

### Component specimens

Browse `claude-design/preview/` — one HTML card per token cluster or component for quick visual reference.

### Full design spec

Read `claude-design/README.md` for voice, visual foundations, iconography, and a full "what's NOT in this system" list.

Read `claude-design/design_handoff_ai_blog/README.md` for section-by-section specs with exact measurements.

## Procedure

1. Read `claude-design/README.md` first — understand the brand voice and visual foundations
2. Check `claude-design/colors_and_type.css` for exact token values
3. Consult the relevant HTML reference (`Blog Homepage.html` or `Blog Post.html`) for the component you're building
4. Browse `claude-design/preview/` for isolated component specimens if needed
5. Implement in Next.js App Router with TypeScript + Tailwind, following existing project patterns in `src/`

## Tailwind class mapping

| Design token    | Tailwind class                  | Value                       |
| --------------- | ------------------------------- | --------------------------- |
| `--bg`          | `bg-bg`                         | `#05060a`                   |
| `--bg-elev`     | `bg-bg-elev`                    | `#0a0c14`                   |
| `--fg`          | `text-fg`                       | `#e8eaf1`                   |
| `--fg-dim`      | `text-fg-dim`                   | `#8b91a8`                   |
| `--fg-faint`    | `text-fg-faint`                 | `#4a5068`                   |
| `--c1`          | `text-c1`, `bg-c1`, `border-c1` | Dynamic (default `#f472b6`) |
| `--c2`          | `text-c2`, `bg-c2`, `border-c2` | Dynamic (default `#8b5cf6`) |
| `--line`        | `border-line`                   | `rgba(140,150,180,0.08)`    |
| `--line-strong` | `border-line-strong`            | `rgba(140,150,180,0.16)`    |

### Typography

| Use               | Tailwind class                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| Display headlines | `font-display text-display-xl` (56px), `text-display-l` (44px), `text-display-m` (32px), `text-display-s` (22px) |
| Body text         | `font-body text-body-l` (16px), `text-body` (15px), `text-body-s` (13px)                                         |
| Metadata/labels   | `font-mono text-mono` (11px) `uppercase tracking-uppercase`                                                      |
| Eyebrows          | `font-mono text-[10.5px] uppercase tracking-[0.18em] text-c1`                                                    |
| Code              | `font-mono text-mono-l` (13px)                                                                                   |

### Spacing

| Token    | Tailwind class                 | Value |
| -------- | ------------------------------ | ----- |
| `--s-1`  | `p-s-1`, `m-s-1`, `gap-s-1`    | 4px   |
| `--s-2`  | `p-s-2`, `m-s-2`, `gap-s-2`    | 8px   |
| `--s-3`  | `p-s-3`, `m-s-3`, `gap-s-3`    | 14px  |
| `--s-4`  | `p-s-4`, `m-s-4`, `gap-s-4`    | 18px  |
| `--s-5`  | `p-s-5`, `m-s-5`, `gap-s-5`    | 22px  |
| `--s-6`  | `p-s-6`, `m-s-6`, `gap-s-6`    | 28px  |
| `--s-7`  | `p-s-7`, `m-s-7`, `gap-s-7`    | 36px  |
| `--s-8`  | `p-s-8`, `m-s-8`, `gap-s-8`    | 56px  |
| `--s-9`  | `p-s-9`, `m-s-9`, `gap-s-9`    | 72px  |
| `--s-10` | `p-s-10`, `m-s-10`, `gap-s-10` | 96px  |

### Glows (not shadows)

| Tailwind class      | Value                  |
| ------------------- | ---------------------- |
| `shadow-glow-c1`    | `0 0 12px` c1 at 60%   |
| `shadow-glow-c2`    | `0 0 12px` c2 at 60%   |
| `shadow-glow-soft`  | `0 0 24px` c1 at 25%   |
| `shadow-glow-hard`  | `0 4px 16px` c1 at 25% |
| `shadow-glow-press` | `0 6px 24px` c2 at 35% |

## Hard rules

- **Pure dark** `#05060a` page — never flat grey
- **Accents always a pair** — `--c1` + `--c2` from the 5 curated palettes only (Plasma / Electric / Voltage / Nebula / Terminal)
- **Glows replace drop-shadows** — use `shadow-glow-*` classes, never `shadow-md` etc.
- **No emoji in body copy** — the 👋 in the "Say hello" CTA is the only exception
- **Headlines**: sentence case, single `.hl` word, ends in a period
- **Uppercase + mono** is always letter-spaced `tracking-uppercase` (0.15em)
- **Inline SVG only** — no icon fonts, no emoji as icons — `stroke-width: 1.6`, 24×24 viewBox, `stroke="currentColor"`, no fill
- **Default palette**: Plasma (`c1: #f472b6`, `c2: #8b5cf6`)
- **No tables** — use code blocks or small lists instead
- **No colored left-border accent cards** — off-brand
- **No linear blue-to-purple SaaS gradients** — gradients are always paired analogous accents on dark
- **No more than two accent colors** visible at once

## Palettes

| Name     | c1        | c2        |
| -------- | --------- | --------- |
| Plasma   | `#f472b6` | `#8b5cf6` |
| Electric | `#22d3ee` | `#a855f7` |
| Voltage  | `#fde047` | `#22d3ee` |
| Nebula   | `#60a5fa` | `#c084fc` |
| Terminal | `#4ade80` | `#22d3ee` |
