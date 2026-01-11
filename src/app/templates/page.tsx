'use client'

import Link from 'next/link'

interface Template {
  id: string
  name: string
  description: string
  price: number
  category: 'starter' | 'professional' | 'enterprise'
  features: string[]
  popular?: boolean
  stripeLink?: string // Stripe Payment Link URL
}

const templates: Template[] = [
  {
    id: 'developer-agent-system',
    name: 'Developer Agent System',
    description: 'Complete system for building AI coding assistants. 5 production-ready agent configs with documentation.',
    price: 49,
    category: 'starter',
    features: [
      '5 complete CLAUDE.md configs',
      'Code review agent',
      'Documentation agent',
      'Testing agent',
      'Refactoring agent',
      'Security audit agent',
      'Integration guide'
    ],
    popular: true,
    stripeLink: undefined // Will be set once Stripe Payment Link is created
  },
  {
    id: 'autonomous-ops-system',
    name: 'Autonomous Operations System',
    description: 'Run AI agents continuously without human intervention. Self-analyze, self-correct, adapt.',
    price: 79,
    category: 'professional',
    features: [
      'Loop prevention guardrails',
      'Self-analysis protocol',
      'Progress tracking system',
      'Error recovery patterns',
      'Session handoff templates',
      'Escalation procedures'
    ]
  },
  {
    id: 'multi-agent-orchestrator',
    name: 'Multi-Agent Orchestrator',
    description: 'Coordinate multiple AI agents with hierarchical management. CEO/worker patterns.',
    price: 99,
    category: 'professional',
    features: [
      'Hierarchical agent architecture',
      'Inter-agent communication',
      'Task delegation system',
      'Performance metrics',
      'Conflict resolution',
      'Emergency protocols'
    ],
    popular: true
  },
  {
    id: 'complete-system',
    name: 'Substratia Complete Bundle',
    description: 'Everything we offer. All systems, all updates, priority support.',
    price: 199,
    category: 'enterprise',
    features: [
      'All current systems included',
      'All future systems included',
      'Priority email support',
      'Private Discord access',
      'Custom config review (1x)',
      'Lifetime updates'
    ],
    popular: true
  }
]

export default function TemplatesPage() {
  const starter = templates.filter(t => t.category === 'starter')
  const professional = templates.filter(t => t.category === 'professional')
  const enterprise = templates.filter(t => t.category === 'enterprise')

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-forge-purple/20 border border-forge-purple/50 rounded-full text-sm text-forge-purple mb-4">
            Production-ready agent systems
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Agent <span className="text-forge-cyan">Systems</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Complete, documented systems for building production AI agents. Not templates - full solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Lifetime access
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free updates
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              30-day money-back
            </div>
          </div>
        </div>

        {/* Starter */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-forge-cyan">Starter</span>
            <span className="text-sm font-normal text-gray-400">Get started with AI agent development</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starter.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* Professional */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-forge-purple">Professional</span>
            <span className="text-sm font-normal text-gray-400">Advanced systems for production use</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {professional.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* Enterprise */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-yellow-400">Enterprise</span>
            <span className="text-sm font-normal text-gray-400">Complete bundle with support</span>
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {enterprise.map(template => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Not sure which to choose?</h2>
          <p className="text-gray-300 mb-6">
            Try our free Agent Builder to create your own custom configuration.
          </p>
          <Link
            href="/builder"
            className="inline-block px-8 py-4 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold transition-all"
          >
            Try Free Builder
          </Link>
        </section>
      </div>
    </main>
  )
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-forge-purple/50 transition-all relative">
      {template.popular && (
        <span className="absolute -top-2 -right-2 px-3 py-1 bg-forge-cyan text-forge-dark text-xs font-bold rounded-full">
          POPULAR
        </span>
      )}
      <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{template.description}</p>

      <ul className="space-y-1 mb-6">
        {template.features.map((feature, i) => (
          <li key={i} className="text-sm text-gray-300 flex items-center gap-2">
            <span className="text-forge-cyan">+</span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">${template.price}</span>
        {template.stripeLink ? (
          <a
            href={template.stripeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-medium transition-all"
          >
            Buy Now
          </a>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-gray-600 cursor-not-allowed rounded-lg font-medium"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  )
}
