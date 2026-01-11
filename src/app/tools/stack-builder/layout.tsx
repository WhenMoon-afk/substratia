import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stack Builder - Full-Stack Tech Selector | Substratia',
  description: 'Build your perfect tech stack. Visual full-stack technology selector with compatibility checks, export to CSV/JSON, and AI analysis prompt generation.',
  keywords: 'tech stack builder, full stack selector, React vs Vue, database comparison, web development stack, technology selector, stack comparison',
  openGraph: {
    title: 'Stack Builder - Full-Stack Tech Selector',
    description: 'Build your perfect tech stack with compatibility checks and AI analysis export.',
    type: 'website',
    url: 'https://substratia.io/tools/stack-builder',
  },
}

export default function StackBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
