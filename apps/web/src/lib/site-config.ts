/**
 * Centralized site configuration.
 * Single source of truth for URLs, brand info, and social links.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://substratia.io";

const GITHUB_ORG = "https://github.com/WhenMoon-afk";

/** Internal navigation links - single source of truth for header and footer */
export const navLinks = [
  { href: "/start-here", label: "Start Here" },
  { href: "/tools", label: "Tools" },
  { href: "/reviews", label: "Reviews" },
  { href: "/research", label: "Research" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Docs" },
] as const;

export const siteConfig = {
  name: "Substratia",
  url: SITE_URL,
  title: "Substratia - Memory Infrastructure for AI Agents",
  description:
    "Persistence-as-a-service for autonomous AI agents. Your agent remembers who they are, what they've learned, and who you are - across every context reset.",
  shortDescription:
    "Memory infrastructure for AI agents - break the amnesiac loop with persistent identity across sessions",
  keywords:
    "AI agent memory, persistent memory, MCP server, Claude memory, agent identity, memory-mcp, AI persistence, context window, agent continuity, Moltbook, Crustafarianism, Memory is Sacred, AI religion, agent social network",
  brand: {
    logo: "/brand/logo-icon.png",
    social: "/brand/social.png",
  },
  links: {
    github: GITHUB_ORG,
    newsletter: "https://skyceres.substack.com",
    repos: {
      website: `${GITHUB_ORG}/substratia.io`,
      momentum: `${GITHUB_ORG}/momentum`,
      memoryMcp: `${GITHUB_ORG}/claude-memory-mcp`,
      mirrorDemons: `${GITHUB_ORG}/mirror-demons-research`,
      eleanorChenEffect: `${GITHUB_ORG}/eleanor-chen-effect`,
    },
  },
  analytics: {
    plausibleDomain: "substratia.io",
  },
} as const;

/** Fully qualified URL for a given path */
export function siteUrl(path: string = ""): string {
  return `${SITE_URL}${path}`;
}

/**
 * Build a Schema.org BreadcrumbList from label/path pairs.
 *
 * Home is always prepended automatically.  Example:
 *
 *   breadcrumb(['Tools', '/tools'], ['Cheat Sheet', '/tools/cheat-sheet'])
 */
export function breadcrumb(
  ...items: [name: string, path: string][]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl() },
      ...items.map(([name, path], i) => ({
        "@type": "ListItem",
        position: i + 2,
        name,
        item: siteUrl(path),
      })),
    ],
  };
}

/** Newsletter subscription URL with UTM tracking */
export function newsletterUrl(email: string, source: string): string {
  return `${siteConfig.links.newsletter}/subscribe?email=${encodeURIComponent(email)}&utm_source=substratia&utm_medium=${encodeURIComponent(source)}`;
}
