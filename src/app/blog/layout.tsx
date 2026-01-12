import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Substratia | AI Memory Tools & Agent Building',
  description: 'Tutorials, comparisons, and best practices for AI memory tools, MCP servers, and agent configuration.',
  keywords: ['MCP memory server', 'Claude memory', 'AI agents', 'CLAUDE.md', 'prompt engineering', 'memory-mcp', 'Claude Code'],
  openGraph: {
    title: 'Substratia Blog - AI Memory Tools & Agent Building',
    description: 'Tutorials, tips, and best practices for building AI agents with Claude Code.',
    type: 'website',
    url: 'https://substratia.io/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
