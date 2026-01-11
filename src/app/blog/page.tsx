import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - PromptForge | AI Agent Building Tips & Tutorials',
  description: 'Learn how to build powerful AI agents with our tutorials, tips, and best practices for Claude, GPT, and more.',
  keywords: 'AI agents, CLAUDE.md, agents.md, prompt engineering, tutorials, Claude Code',
}

const posts = [
  {
    slug: 'mastering-negative-prompts',
    title: 'Mastering Negative Prompts: The Secret to Reliable AI Agents',
    excerpt: 'Most developers focus on what they want AI to do. The pros focus on what it should never do. Learn how to write effective guardrails.',
    date: '2026-01-11',
    readTime: '10 min read',
    tags: ['Prompt Engineering', 'Safety', 'Best Practices'],
  },
  {
    slug: 'how-to-build-claude-agents',
    title: 'How to Build Claude Agents: A Complete Guide to CLAUDE.md',
    excerpt: 'Learn how to create powerful AI agents using CLAUDE.md files. This comprehensive guide covers capabilities, rulesets, and best practices.',
    date: '2026-01-11',
    readTime: '8 min read',
    tags: ['Claude', 'Tutorial', 'Beginner'],
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-300">
            Tutorials, tips, and best practices for building AI agents.
          </p>
        </div>

        {/* Posts */}
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-purple/50 transition-all"
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-forge-purple/20 text-forge-purple rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-forge-cyan transition-all">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-400 mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Ready to build your own AI agent?
          </p>
          <Link
            href="/builder"
            className="inline-block px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            Try the Free Builder
          </Link>
        </div>
      </div>
    </main>
  )
}
