'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import ShareButton from '@/components/ShareButton'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Open source memory tools for AI assistants',
    features: [
      'momentum - Context recovery in <5ms',
      'memory-mcp - Persistent memory across sessions',
      'AgentForge visual builder',
      '100 cloud memories',
      'Export to .md files',
      'Community support on GitHub',
    ],
    cta: 'Get Started',
    href: '/dashboard',
    tier: 'free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'Cloud sync and dashboard for serious users',
    features: [
      'Everything in Free',
      'Unlimited cloud memories',
      'Memory dashboard & analytics',
      'Automatic backups',
      'Priority email support',
      'Early access to new features',
    ],
    cta: 'Subscribe',
    href: '/api/stripe/checkout',
    tier: 'pro',
    featured: true,
  },
  {
    name: 'Teams',
    price: '$19',
    period: '/seat/month',
    description: 'Shared memory for teams building AI at scale',
    features: [
      'Everything in Pro',
      'Shared team memory',
      'Admin controls & permissions',
      'SSO integration',
      'API access',
      'SLA guarantee',
      'Dedicated support',
    ],
    cta: 'Contact Us',
    href: 'mailto:hello@substratia.io',
    tier: 'team',
    featured: false,
  },
]

export default function PricingPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [autoCheckoutTriggered, setAutoCheckoutTriggered] = useState(false)

  // Function to start checkout process
  const startCheckout = async (tier: string) => {
    setLoading(tier)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  // Auto-trigger checkout if user just signed in with subscribe intent
  useEffect(() => {
    if (!isLoaded || !isSignedIn || autoCheckoutTriggered) return

    const params = new URLSearchParams(window.location.search)
    if (params.get('intent') === 'subscribe') {
      // Remove intent from URL to prevent re-triggering
      window.history.replaceState({}, '', '/pricing')
      // Mark as triggered and start checkout
      setAutoCheckoutTriggered(true)
      startCheckout('pro')
    }
  }, [isLoaded, isSignedIn, autoCheckoutTriggered])

  const handleSubscribe = async (tier: string) => {
    if (!isLoaded) return

    if (!isSignedIn) {
      // Redirect to sign in with return URL including subscribe intent
      window.location.href = `/sign-in?redirect_url=${encodeURIComponent('/pricing?intent=subscribe')}`
      return
    }

    startCheckout(tier)
  }

  return (
    <main className="min-h-screen text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <ShareButton title="Pricing - Substratia" />
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Open Source <span className="text-forge-cyan">+ Pro</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Core memory tools are free and open source forever.
            Pro adds cloud sync, dashboard, and team features.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Subscription Tiers */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              id={tier.name.toLowerCase()}
              className={`rounded-2xl p-8 scroll-mt-24 ${
                tier.featured
                  ? 'bg-gradient-to-b from-forge-purple/30 to-forge-dark border-2 border-forge-purple relative'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-forge-purple rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-gray-400">{tier.period}</span>}
              </div>
              <p className="text-gray-400 mb-6">{tier.description}</p>

              {/* Button - different behavior based on tier */}
              {tier.tier === 'pro' ? (
                <button
                  onClick={() => handleSubscribe('pro')}
                  disabled={loading === 'pro'}
                  className={`w-full text-center py-3 rounded-lg font-semibold transition-all mb-8 ${
                    tier.featured
                      ? 'bg-forge-purple hover:bg-forge-purple/80 disabled:opacity-50'
                      : 'bg-white/10 hover:bg-white/20 disabled:opacity-50'
                  }`}
                >
                  {loading === 'pro' ? 'Loading...' : tier.cta}
                </button>
              ) : tier.tier === 'team' ? (
                <a
                  href={tier.href}
                  className={`block text-center py-3 rounded-lg font-semibold transition-all mb-8 ${
                    tier.featured
                      ? 'bg-forge-purple hover:bg-forge-purple/80'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <Link
                  href={tier.href}
                  className={`block text-center py-3 rounded-lg font-semibold transition-all mb-8 ${
                    tier.featured
                      ? 'bg-forge-purple hover:bg-forge-purple/80'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {tier.cta}
                </Link>
              )}

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-forge-cyan flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Open Source Commitment */}
        <div className="max-w-3xl mx-auto mb-24 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-forge-cyan">Open Source</span> Commitment
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Our core tools — momentum and memory-mcp — are MIT licensed and will remain free forever.
            We believe AI memory should be accessible to everyone. Pro features fund continued development
            while keeping the foundation open.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/WhenMoon-afk/momentum"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
            >
              momentum on GitHub
            </a>
            <a
              href="https://github.com/WhenMoon-afk/claude-memory-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
            >
              memory-mcp on GitHub
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="text-forge-cyan">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                id: 'faq-free',
                q: 'Are the free tools actually free?',
                a: 'Yes! momentum and memory-mcp are open source under MIT license. You can use, modify, and distribute them freely. Free tier includes 100 cloud memories.',
              },
              {
                id: 'faq-pro',
                q: 'What does Pro add over Free?',
                a: 'Pro gives you unlimited cloud memories (free is limited to 100), a web dashboard to view and manage memories, automatic backups, and priority support. The core tools remain the same.',
              },
              {
                id: 'faq-cancel',
                q: 'Can I cancel anytime?',
                a: 'Yes! You can cancel your Pro subscription anytime. You\'ll keep Pro features until the end of your billing period, then revert to Free tier.',
              },
              {
                id: 'faq-selfhost',
                q: 'Can I self-host instead of using Pro?',
                a: 'Absolutely! All tools are open source. Pro is a convenience layer for those who want cloud sync and managed infrastructure without self-hosting.',
              },
              {
                id: 'faq-payment',
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards via Stripe. Enterprise/Teams customers can pay via invoice.',
              },
            ].map((faq) => (
              <div key={faq.id} id={faq.id} className="bg-white/5 border border-white/10 rounded-xl p-6 scroll-mt-24">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Give Your AI a Memory</h2>
          <p className="text-gray-400 mb-8">Start with free open-source tools. Upgrade to Pro when you need cloud sync.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/builder"
              className="px-8 py-4 bg-forge-purple hover:bg-forge-purple/80 rounded-lg font-semibold text-lg transition-all"
            >
              Try AgentForge Free
            </Link>
            <a
              href="https://github.com/WhenMoon-afk/momentum"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-lg font-semibold text-lg transition-all"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
