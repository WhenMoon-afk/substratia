import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Markdown Editors 2026 - Obsidian vs Notion vs Typora | Substratia',
  description: 'Compare the top markdown editors: Obsidian, Notion, Typora, VS Code, and iA Writer. Features, pricing, and which is best for notes, docs, and writing.',
  keywords: 'Obsidian, Notion, Typora, markdown editor, note taking app, VS Code markdown, iA Writer, best markdown editor, PKM tools',
  openGraph: {
    title: 'Best Markdown Editors 2026 - Complete Comparison',
    description: 'Compare Obsidian, Notion, Typora, VS Code, and iA Writer. Find the best markdown editor for your workflow.',
    type: 'article',
    url: 'https://substratia.io/reviews/markdown-editors',
  },
}

export default function MarkdownEditorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
