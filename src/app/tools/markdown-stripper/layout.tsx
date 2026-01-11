import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Markdown Stripper - Remove Formatting Instantly | Substratia',
  description: 'Free tool to strip markdown formatting from text. Paste markdown, get clean plain text instantly. No signup required.',
  keywords: 'markdown stripper, remove markdown, plain text converter, strip formatting, markdown to text, remove markdown formatting',
  openGraph: {
    title: 'Markdown Stripper - Remove Formatting Instantly',
    description: 'Free tool to strip markdown formatting from text. Paste markdown, get clean plain text instantly.',
    type: 'website',
    url: 'https://substratia.io/tools/markdown-stripper',
  },
}

export default function MarkdownStripperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
