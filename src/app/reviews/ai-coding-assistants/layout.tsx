import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best AI Coding Assistants 2026 - Claude Code vs Cursor vs GitHub Copilot | Substratia',
  description: 'Compare the top AI coding assistants: Claude Code, Cursor, GitHub Copilot, Codeium, and Windsurf. Features, pricing, and which is best for your workflow.',
  keywords: 'Claude Code, Cursor AI, GitHub Copilot, Codeium, Windsurf, AI coding assistant, code completion, AI pair programming, best coding AI',
  openGraph: {
    title: 'Best AI Coding Assistants 2026 - Complete Comparison',
    description: 'Compare Claude Code, Cursor, GitHub Copilot, Codeium, and Windsurf. Find the best AI coding assistant for your needs.',
    type: 'article',
    url: 'https://substratia.io/reviews/ai-coding-assistants',
  },
}

export default function AICodingAssistantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
