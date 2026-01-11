import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Cheat Sheet | Essential Commands & Tips',
  description: 'The ultimate Claude Code reference. Slash commands, keyboard shortcuts, CLAUDE.md tips, MCP configuration, and power user techniques. Free to download.',
  keywords: ['Claude Code cheat sheet', 'Claude Code commands', 'Claude Code shortcuts', 'CLAUDE.md reference', 'Claude Code tips', 'AI coding assistant guide'],
  openGraph: {
    title: 'Claude Code Cheat Sheet | Essential Commands & Tips',
    description: 'The ultimate Claude Code reference. Slash commands, shortcuts, CLAUDE.md tips, and more.',
    type: 'website',
    url: 'https://substratia.io/tools/cheat-sheet',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Cheat Sheet',
    description: 'The ultimate Claude Code quick reference guide.',
  },
}

export default function CheatSheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
