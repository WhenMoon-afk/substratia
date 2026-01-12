import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Testimonials - Claude Code Consulting Success Stories | Substratia',
  description: 'See how teams and developers have improved their Claude Code workflows with our consulting services. Real results from real users.',
  keywords: ['Claude Code consulting', 'testimonials', 'case studies', 'AI consulting results', 'Claude Code training'],
  openGraph: {
    title: 'Claude Code Consulting Testimonials',
    description: 'Real results from developers and teams who improved their Claude Code workflows.',
    type: 'website',
    url: 'https://substratia.io/testimonials',
  },
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
