import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Substratia - Free & Open Source Developer Tools',
  description: 'All Substratia tools are free and open source. No paid tiers, no subscriptions needed. MIT licensed developer tools for Claude Code.',
  keywords: 'substratia, free developer tools, open source, Claude Code tools, AI memory, MIT licensed',
  openGraph: {
    title: 'Substratia - All Tools Are Free',
    description: 'All Substratia tools are free and open source. No paid tiers, no subscriptions.',
    type: 'website',
    url: 'https://substratia.io/pro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Substratia - All Tools Are Free',
    description: 'All Substratia tools are free and open source. No paid tiers, no subscriptions.',
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://substratia.io' },
    { '@type': 'ListItem', position: 2, name: 'Pro', item: 'https://substratia.io/pro' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Substratia - Free Developer Tools',
  description: 'All Substratia tools are free and open source. MIT licensed developer tools for Claude Code.',
  url: 'https://substratia.io/pro',
}

export default function ProLayout({
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
