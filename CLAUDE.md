# CLAUDE.md - Substratia AgentForge

## Live Site
**https://substratia.io**

## Quick Commands
```bash
bun install        # Install deps
bun run dev        # Dev server (localhost:3000)
bun run build      # Production build
bun run lint       # Linter
```

## Deploy
Push to master → Cloudflare Pages auto-deploys in ~90s

```bash
git add -A && git commit -m "feat: description" && git push origin master
```

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── builder/page.tsx      # Free drag-and-drop builder (LEAD MAGNET)
│   ├── templates/page.tsx    # Product listings (NEEDS BUY BUTTONS)
│   ├── pricing/page.tsx      # Subscription tiers
│   ├── docs/page.tsx         # Documentation
│   ├── blog/                  # SEO content (3 posts)
│   └── api/subscribe/route.ts # Email capture (NEEDS BACKEND)
├── components/
│   ├── Nav.tsx               # "AgentForge by Substratia"
│   ├── AIAssistant.tsx       # Builder sidebar
│   └── DraggableCapability.tsx
├── data/
│   └── presets.ts            # 28 capabilities, 13 rulesets
└── globals.css               # Tailwind + custom styles
```

## Branding
- **Parent**: Substratia (substrate-agnostic intelligence)
- **Product**: AgentForge
- **Domain**: substratia.io
- **Colors**: Deep indigo (#1a1a2e), Cyan (#00d4ff), Purple (#7c3aed)

## What Works
- Landing page with social proof
- Drag-and-drop agent builder
- Template gallery (display only)
- Blog with 3 SEO posts
- Pricing page (display only)
- Email form (submits but doesn't store)

## What's Broken/Missing
1. **Payment** - No checkout, can't buy anything
2. **Email** - Form submits to API that does nothing
3. **Analytics** - No tracking
4. **Products** - Templates listed but not downloadable

## Priority Fixes
1. Integrate LemonSqueezy/Paddle for payments
2. Add buy buttons that actually work
3. Connect email to Buttondown/ConvertKit
4. Add Plausible/Umami analytics

## SEO Content
- `/blog/how-to-build-claude-agents` - Claude agent tutorial
- `/blog/mastering-negative-prompts` - Negative prompt guide
- `/blog/agents-md-vs-claude-md` - File comparison guide

## Sitemap
Located at `/public/sitemap.xml` - needs submitting to Google Search Console
