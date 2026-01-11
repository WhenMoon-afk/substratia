# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: AgentForge by Substratia

**Live Site**: https://substratia.io
**GitHub**: https://github.com/WhenMoon-afk/substratia

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
- **Framework**: Next.js 14 (Static Export)
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Hosting**: Cloudflare Pages
- **Domain**: substratia.io (Cloudflare)

### Directory Structure
```
src/
├── app/
│   ├── page.tsx              # Landing page with hero, features, testimonials
│   ├── builder/page.tsx      # Drag-and-drop agent config builder (LEAD MAGNET)
│   ├── templates/page.tsx    # Product listings (NEEDS: buy buttons)
│   ├── pricing/page.tsx      # Subscription tiers display
│   ├── docs/page.tsx         # Documentation/quick start guide
│   ├── blog/
│   │   ├── page.tsx                        # Blog index
│   │   ├── how-to-build-claude-agents/     # SEO post #1
│   │   ├── mastering-negative-prompts/     # SEO post #2
│   │   └── agents-md-vs-claude-md/         # SEO post #3
│   ├── api/subscribe/route.ts  # Email capture (NEEDS: backend integration)
│   ├── layout.tsx              # Root layout with metadata
│   └── not-found.tsx           # 404 page
├── components/
│   ├── Nav.tsx                 # Global navigation, shows "AgentForge by Substratia"
│   ├── AIAssistant.tsx         # Builder sidebar panel
│   └── DraggableCapability.tsx # Drag-and-drop capability cards
├── data/
│   └── presets.ts              # 28 capabilities, 13 rulesets definitions
└── globals.css                 # Tailwind config + custom CSS variables
```

### Key Data Structures

**presets.ts** contains:
- `capabilities`: Array of 28 agent capabilities (e.g., "code_review", "documentation")
- `rulesets`: Array of 13 guardrail rulesets (e.g., "security", "no_loops")

### Build Configuration

**next.config.js**:
- `output: 'export'` - Static HTML export for Cloudflare Pages
- `images.unoptimized: true` - Required for static export
- `basePath` and `assetPrefix` - Configured for production

---

## Current State

### Working Features
- Landing page with social proof sections
- Drag-and-drop agent configuration builder
- Capability and ruleset selection
- Live preview of generated config
- Export to clipboard/download
- Template gallery (display only)
- Blog with 3 SEO-optimized posts
- Responsive design

### Broken/Missing (Priority Fixes)
1. **Payment Integration** - No checkout flow
   - Need: Stripe Payment Links integration
   - Wire buy buttons on /templates page

2. **Email Capture** - Form submits but doesn't store
   - Need: Buttondown or ConvertKit integration
   - Current API route at `/api/subscribe/route.ts` does nothing

3. **Analytics** - No tracking
   - Need: Plausible or Umami

4. **Actual Products** - Templates are concepts only
   - Need: Downloadable files for paid products

---

## Branding

- **Parent**: Substratia (substrate-agnostic intelligence)
- **Product**: AgentForge
- **Tagline**: "Build production-ready AI agent configs in minutes"

### Colors
```css
--forge-dark: #0f0f1a
--forge-purple: #7c3aed
--forge-cyan: #00d4ff
```

### Logo Usage
Nav shows: `<span className="text-forge-cyan">Agent</span>Forge` with "by Substratia" subtitle

---

## SEO

### Metadata (in layout.tsx)
- Title: "Substratia AgentForge - Build Powerful AI Agents"
- Keywords: AI agents, CLAUDE.md, agents.md, prompt engineering, Claude Code

### Content
- `/public/sitemap.xml` - 7 URLs listed
- `/public/robots.txt` - Standard config
- 3 blog posts targeting long-tail keywords

### Pending
- Submit sitemap to Google Search Console
- Add structured data (JSON-LD)

---

## Integration Points

### Email Capture
Current: `src/app/api/subscribe/route.ts`
```typescript
// Currently just validates and returns success
// NEEDS: Buttondown API integration
```

### Payment
Current: None
Needed: Stripe Payment Links embedded or linked from /templates page

---

## Development Notes

### Static Export Constraints
- No server-side features (API routes only work in dev)
- All data must be available at build time
- Use client-side fetching for dynamic data

### Styling
- Tailwind with custom color palette
- Dark theme by default
- Responsive breakpoints: sm, md, lg

### State Management
- React useState for local component state
- No global state management (not needed for current scope)
