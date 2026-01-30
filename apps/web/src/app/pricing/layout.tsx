import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Substratia | 100% Free & Open Source',
  description: 'All Substratia tools are 100% free and open source. No paid tiers, no subscriptions. MIT licensed developer tools for Claude Code.',
  keywords: ['Substratia pricing', 'free developer tools', 'open source', 'Claude Code tools', 'memory-mcp free', 'MIT licensed'],
  openGraph: {
    title: 'Substratia - 100% Free & Open Source',
    description: 'All tools are free, open source, and MIT licensed. No paid tiers.',
    type: 'website',
    url: 'https://substratia.io/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia - 100% Free & Open Source',
    description: 'All tools are free, open source, and MIT licensed. No paid tiers.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://substratia.io/pricing' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Substratia Developer Tools',
  description: 'All Substratia tools are 100% free and open source. MIT licensed developer tools for Claude Code.',
  url: 'https://substratia.io/pricing',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  )
}
