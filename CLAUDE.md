# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: AgentForge by Substratia

**Live Site**: https://substratia.io
**GitHub**: https://github.com/WhenMoon-afk/substratia

A drag-and-drop builder for creating production-ready AI agent configuration files (CLAUDE.md and agents.md).

---

## Quick Commands

```bash
bun install        # Install dependencies
bun run dev        # Dev server at localhost:3000
bun run build      # Production build (static export to /out)
bun run lint       # ESLint
```

## Deployment

Push to master → Cloudflare Pages auto-deploys in ~90s

```bash
git add -A && git commit -m "feat: description" && git push origin master
```

---

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router, Static Export)
- **Styling**: Tailwind CSS 3.4
- **Drag-and-Drop**: @dnd-kit (core + sortable)
- **Package Manager**: Bun
- **Hosting**: Cloudflare Pages
- **Domain**: substratia.io (Cloudflare)

### Path Alias
`@/*` → `./src/*` (configured in tsconfig.json)

### Directory Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/page.tsx      # Drag-and-drop config builder (core feature)
│   ├── templates/page.tsx    # Product listings
│   ├── pricing/page.tsx      # Subscription tiers
│   ├── docs/page.tsx         # Documentation
│   ├── blog/                  # 3 SEO posts
│   ├── api/subscribe/route.ts # Email capture (placeholder)
│   └── layout.tsx            # Root layout with metadata
├── components/
│   ├── Nav.tsx               # Global navigation
│   ├── AIAssistant.tsx       # Builder sidebar (mock responses)
│   └── DraggableCapability.tsx
├── data/
│   └── presets.ts            # 28 capabilities + 13 rulesets
└── globals.css               # Tailwind + custom CSS variables
```

### Key Data Structures (src/data/presets.ts)

```typescript
interface Capability {
  id: string
  name: string
  category: 'core' | 'safety' | 'behavior' | 'tools' | 'domain'
  description: string
  content: string  // Markdown content for generated config
}

interface Ruleset {
  id: string
  name: string
  type: 'positive' | 'negative'
  description: string
  rules: string[]
}
```

### Build Configuration (next.config.js)

- `output: 'export'` - Static HTML export to `/out` directory
- `images.unoptimized: true` - Required for static export
- `trailingSlash: true` - URL formatting for Cloudflare Pages

### Client vs Server Components
- **Client** ('use client'): builder/page.tsx, landing page, Nav.tsx
- **Server** (default): layout.tsx, blog pages, docs

---

## Static Export Constraints

API routes (`src/app/api/*`) only work during development. In production:
- Email form submits to placeholder endpoint
- All data must be available at build time
- Use client-side logic for interactivity

---

## Branding

- **Parent**: Substratia
- **Product**: AgentForge
- **Tagline**: "Build production-ready AI agent configs in minutes"

### Colors (tailwind.config.js)
```
forge-dark:   #1a1a2e
forge-purple: #7b2cbf
forge-cyan:   #00d9ff (brand accent)
```

---

## Missing Features (Revenue Blockers)

1. **Payment Integration** - Stripe Payment Links not wired to /templates
2. **Email Backend** - /api/subscribe does nothing (needs Buttondown/ConvertKit)
3. **Analytics** - No tracking (Plausible/Umami needed)
4. **Downloadable Products** - Templates are display-only concepts
