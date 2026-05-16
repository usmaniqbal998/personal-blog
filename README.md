# Field Notes

A personal blog about agentic AI and agentic workflows — built with Next.js, MDX, and Tailwind CSS.

Live at [fieldnotes.blog](https://fieldnotes.blog)

## Tech Stack

- **Next.js 16** — App Router, static export
- **TypeScript** — strict mode
- **Tailwind CSS v4** — CSS-based theme config
- **Velite** — MDX content layer (build-time)
- **Vercel** — hosting (free tier, static)

## Getting Started

```bash
# requires Node 22+
nvm use

# install dependencies
yarn

# start dev server (Velite watches content, Next.js serves pages)
yarn dev

# production build
yarn build
```

## Writing Posts

Create an MDX file in `content/posts/`:

```mdx
---
title: Your Post Title
slug: your-post-title
description: A short description for SEO and cards.
date: 2025-01-15
published: true
tags:
  - agents
  - workflows
---

Your content here. Supports all standard Markdown plus JSX components.
```

### Frontmatter Fields

| Field         | Type       | Required | Description                    |
| ------------- | ---------- | -------- | ------------------------------ |
| `title`       | `string`   | yes      | Post title                     |
| `slug`        | `string`   | yes      | URL slug (must be unique)      |
| `description` | `string`   | yes      | SEO description / card excerpt |
| `date`        | `string`   | yes      | Publish date (YYYY-MM-DD)      |
| `updated`     | `string`   | no       | Last updated date              |
| `published`   | `boolean`  | yes      | Set `false` to hide from site  |
| `tags`        | `string[]` | yes      | Topic tags                     |
| `image`       | `string`   | no       | Cover image path               |

## Project Structure

```
content/posts/       MDX blog posts
src/
  app/               Next.js App Router pages & layouts
  components/        React components
  fonts/             Local font files (Instrument Serif)
  lib/               Utilities and content helpers
.github/
  copilot-instructions.md   Copilot project conventions
  skills/                   On-demand Copilot skills
```

## Design System

The blog uses the **Field Notes** design system — a dark, electric-accented theme with 5 curated color palettes. Design tokens live in `src/app/globals.css` as Tailwind v4 `@theme` variables.

For UI work, load the Copilot skill at `.github/skills/field-notes-design/SKILL.md`.

## License

MIT
