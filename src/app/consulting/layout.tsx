import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Code Consulting | Expert Setup, Training & Advisory',
  description: 'Get expert help with Claude Code. From initial setup and CLAUDE.md configuration to team workshops and ongoing advisory. Book a session today.',
  keywords: ['Claude Code consulting', 'Claude Code training', 'AI coding assistant help', 'CLAUDE.md expert', 'Claude Code workshop', 'AI developer training'],
  openGraph: {
    title: 'Claude Code Consulting | Expert Setup, Training & Advisory',
    description: 'Get expert help with Claude Code. From initial setup to team workshops.',
    type: 'website',
    url: 'https://substratia.io/consulting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Consulting',
    description: 'Expert help with Claude Code setup, training, and advisory.',
  },
}

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
