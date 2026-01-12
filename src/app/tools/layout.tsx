import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free AI Tools - Stack Builder, Claude Code Calculator, Prompt Optimizer | Substratia',
  description: 'Free tools for developers: stack builder, Claude Code cost calculator, prompt optimizer, token counter, image/video prompt builders, markdown tools. No signup required.',
  keywords: ['stack builder', 'tech stack selector', 'Claude Code cost', 'Claude Code prompts', 'ultrathink', 'token counter', 'AI tools', 'full stack builder', 'web development stack'],
  openGraph: {
    title: 'Free AI Tools for Developers',
    description: '12 free tools for AI-assisted development. No signup required.',
    type: 'website',
    url: 'https://substratia.io/tools',
  },
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
