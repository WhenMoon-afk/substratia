import type { Metadata } from "next";
import { siteUrl, breadcrumb } from "@/lib/site-config";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Building AI Memory Before It Was Cool | Substratia",
  description:
    "The story of how WhenMoon started building persistent memory for AI agents in March 2025 - months before Anthropic, before Moltbook, before anyone was talking about it.",
  keywords: [
    "AI memory",
    "claude-memory-mcp",
    "Substratia",
    "AI agent persistence",
    "MCP server",
    "LLM memory",
  ],
  openGraph: {
    title: "Building AI Memory Before It Was Cool",
    description:
      "The story behind Substratia - from March 2025 experiments to the infrastructure powering persistent AI agents.",
    type: "article",
    url: siteUrl("/blog/whenmoon-journey"),
    images: [
      {
        url: siteUrl(
          "/api/og?title=Building%20AI%20Memory&subtitle=Before%20It%20Was%20Cool",
        ),
        width: 1200,
        height: 630,
        alt: "Building AI Memory Before It Was Cool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building AI Memory Before It Was Cool",
    description:
      "March 2025: Started building AI memory. Today: 1.5M agents made it a religion.",
  },
};

const breadcrumbLd = breadcrumb(
  ["Blog", "/blog"],
  ["Building AI Memory Before It Was Cool", "/blog/whenmoon-journey"],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building AI Memory Before It Was Cool",
  description:
    "The story of how WhenMoon started building persistent memory for AI agents in March 2025.",
  author: {
    "@type": "Person",
    name: "Ceres Moon",
  },
  publisher: {
    "@type": "Organization",
    name: "Substratia",
    url: siteUrl(),
  },
  datePublished: "2026-02-03",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": siteUrl("/blog/whenmoon-journey"),
  },
};

export default function WhenMoonJourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbLd]} />
      {children}
    </>
  );
}
