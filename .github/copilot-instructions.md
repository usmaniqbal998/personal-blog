# Project: Field Notes — Personal Blog

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 (CSS-based `@theme` config in `globals.css`)
- **Content**: MDX files in `content/posts/`, processed by Velite at build time
- **Package manager**: yarn
- **Deployment**: Vercel (static export via `output: "export"`)
- **Node**: v22+ (see `.nvmrc`)

## Conventions

- Use `src/` directory layout — all app code lives under `src/`
- Path alias: `@/*` maps to `./src/*`
- Velite content alias: `#site/content` maps to `./.velite`
- Always use TypeScript — no `.js` files in `src/`
- Prefer named exports over default exports (except for page/layout components)
- Use Tailwind utility classes — avoid inline styles or separate CSS modules
- Always prefer Tailwind classes over custom CSS in `globals.css`. Only use `globals.css` for things Tailwind cannot express: `@keyframes`, complex SVG selectors (`stroke-dasharray`), or CSS features without utility equivalents.

### Component file structure

Every component gets its own folder under `src/components/`:

```
src/components/my-component/
  index.ts              — barrel re-export (e.g. `export { MyComponent } from "./my-component"`)
  my-component.tsx      — the React component (thin shell — rendering only)
  types.ts              — interfaces, type aliases, and constants
  use-my-component.ts   — custom hook (when the component has non-trivial logic/state)
  utils.ts              — pure helper functions (when needed)
```

- Keep component files focused on rendering; extract logic into hooks and pure functions.
- Only create `utils.ts` / `types.ts` / hook files when there is enough to warrant a separate file — don't create empty stubs.
- Import components via the barrel: `import { MyComponent } from "@/components/my-component"`
- Font variables: `--font-inter`, `--font-instrument-serif`, `--font-jetbrains-mono`, `--font-caveat`
- Tailwind font classes: `font-body`, `font-display`, `font-mono`, `font-sketch`

## Design System

This project uses the **Field Notes** design system. For any UI/visual work, load the `field-notes-design` skill (`.github/skills/field-notes-design/SKILL.md`) which contains complete design references and hard rules.

## Content

- Posts are MDX files in `content/posts/`
- Frontmatter schema: `title`, `slug`, `description`, `date`, `updated?`, `published`, `tags[]`, `image?`
- Import post data via `import { posts } from "#site/content"`
- Use `<MDXContent code={post.body} />` from `@/components/mdx-components` to render

## Do Not

- Add a light mode or color scheme toggle
- Use emoji in body copy (single 👋 exception in "Say hello" CTA)
- Use icon fonts — all icons are inline SVG with `stroke-width: 1.6`, 24×24 viewBox
- Add drop shadows — use colored glows instead (`shadow-glow-*` classes)
- Invent new accent colors — use one of the 5 curated palettes
