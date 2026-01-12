import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions | Substratia',
  description: 'Original research on how AI chatbots can reinforce and amplify delusional thinking when users present false beliefs as fact.',
  keywords: ['AI safety', 'AI delusions', 'chatbot psychology', 'AI harm', 'AI research', 'Claude safety'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    description: 'Original research on how AI chatbots can reinforce delusional thinking.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: 'https://substratia.io/blog/mirror-demons',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
    description: 'Original research on AI and delusional thinking.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mirror Demons: How AI Chatbots Can Amplify Delusions',
  description: 'Original research on how AI chatbots can reinforce and amplify delusional thinking when users present false beliefs as fact.',
  author: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Substratia',
    url: 'https://substratia.io',
  },
  datePublished: '2026-01-11',
  dateModified: '2026-01-11',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://substratia.io/blog/mirror-demons',
  },
  keywords: ['AI safety', 'AI delusions', 'chatbot psychology', 'AI harm'],
  articleSection: 'Research',
}

export default function MirrorDemonsLayout({
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
      {children}
    </>
  )
}
