import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Markdown Preview - Live Editor & Renderer | Substratia',
  description: 'Free live markdown preview tool. Edit markdown on the left, see rendered output on the right. Obsidian-style dual panel editor.',
  keywords: 'markdown preview, markdown editor, live markdown, markdown renderer, markdown viewer, obsidian style editor',
  openGraph: {
    title: 'Markdown Preview - Live Editor & Renderer',
    description: 'Free live markdown preview tool. Edit markdown on the left, see rendered output on the right. Instant rendering.',
    type: 'website',
    url: 'https://substratia.io/tools/markdown-preview',
  },
}

export default function MarkdownPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
