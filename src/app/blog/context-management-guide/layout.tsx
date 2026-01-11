import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Ultimate Guide to Claude Code Context Management | Substratia',
  description: 'Master context window management in Claude Code. Learn techniques for preserving context, avoiding compaction issues, and maximizing your AI coding sessions.',
  keywords: ['Claude Code context', 'context window management', 'Claude Code compaction', 'AI coding context', 'Claude Code tips', 'context preservation', 'CLAUDE.md'],
  authors: [{ name: 'Substratia' }],
  openGraph: {
    title: 'The Ultimate Guide to Claude Code Context Management',
    description: 'Master context window management in Claude Code. Learn techniques for preserving context and maximizing your AI coding sessions.',
    type: 'article',
    publishedTime: '2026-01-11',
    authors: ['Substratia'],
    url: 'https://substratia.io/blog/context-management-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Ultimate Guide to Claude Code Context Management',
    description: 'Master context window management in Claude Code.',
  },
}

export default function ContextGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
