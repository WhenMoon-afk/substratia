import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Tool Reviews & Comparisons | Substratia',
  description: 'Honest reviews and side-by-side comparisons of AI tools. Image generators, video generators, memory servers, and more. Updated for 2026.',
  keywords: 'AI tool reviews, AI comparisons, best AI image generator, best AI video generator, Midjourney vs DALL-E, Runway vs Pika, AI tool comparison 2026',
  openGraph: {
    title: 'AI Tool Reviews & Comparisons',
    description: 'Honest reviews and side-by-side comparisons of AI tools. Find the best AI tools for your workflow.',
    type: 'website',
    url: 'https://substratia.io/reviews',
  },
}

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
