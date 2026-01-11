import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Prompt Optimizer - Build Better AI Prompts | Substratia',
  description: 'Free tool to optimize prompts for Claude Code. Thinking modes (ultrathink, thinkhard), autonomous loops, parallel execution, subagent patterns. Copy-paste ready.',
  keywords: 'Claude Code prompts, ultrathink, thinkhard, Claude Code optimizer, AI prompt builder, autonomous AI loops, parallel subagents, Claude Code tips',
  openGraph: {
    title: 'Claude Code Prompt Optimizer - Build Better AI Prompts',
    description: 'Optimize your Claude Code prompts with thinking modes, autonomous patterns, and parallel execution snippets.',
    type: 'website',
    url: 'https://substratia.io/tools/prompt-optimizer',
  },
}

export default function PromptOptimizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
