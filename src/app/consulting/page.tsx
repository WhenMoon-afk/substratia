'use client'

import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

export default function ConsultingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'audit',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [responseMessage, setResponseMessage] = useState('')
  const [sharedSection, setSharedSection] = useState<string | null>(null)

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mreezwlv'

  // Handle URL hash navigation on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = window.location.hash.slice(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [])

  const shareSection = useCallback(async (sectionId: string) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`
    await navigator.clipboard.writeText(shareUrl)
    setSharedSection(sectionId)
    setTimeout(() => setSharedSection(null), 2000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.name) return

    setStatus('loading')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          source: 'consulting-page',
          interest: 'claude-code-consulting'
        }),
      })

      if (res.ok) {
        setStatus('success')
        setResponseMessage("Thanks! I'll get back to you within 24 hours.")
        setFormData({ name: '', email: '', company: '', service: 'audit', message: '' })
      } else {
        setStatus('error')
        setResponseMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setResponseMessage('Network error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen text-white relative">
      {/* Background */}
      <div className="neural-bg" />
      <div className="fixed inset-0 gradient-mesh pointer-events-none z-0" />

      {/* Hero */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-1 bg-forge-cyan/20 border border-forge-cyan/50 rounded-full text-sm text-forge-cyan mb-6">
              Expert Services
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
              Claude Code <span className="text-forge-cyan">Consulting</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get expert help with Claude Code. From initial setup and CLAUDE.md configuration
              to team workshops and ongoing advisory.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Daily Claude Code user
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Open source contributor
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Memory tools author
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Services
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Choose the level of support that fits your needs.
          </p>

          {/* Individual Services */}
          <div id="individual" className="mb-12 scroll-mt-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-xl font-semibold text-forge-purple">Individual Sessions</h3>
              <button
                onClick={() => shareSection('individual')}
                className={`px-2 py-1 text-xs rounded-lg transition-all ${
                  sharedSection === 'individual'
                    ? 'bg-green-500 text-white'
                    : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                }`}
              >
                {sharedSection === 'individual' ? 'Copied!' : 'Share'}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <ServiceCard
                title="Claude Code Audit"
                price="$150"
                duration="1 hour"
                description="Review your current setup, CLAUDE.md, and workflows. Get actionable recommendations."
                features={[
                  'Setup review',
                  'CLAUDE.md analysis',
                  'Workflow optimization tips',
                  'Written recommendations'
                ]}
              />
              <ServiceCard
                title="Setup Session"
                price="$200"
                duration="1.5 hours"
                highlight
                description="Hands-on configuration of Claude Code for your specific needs. Leave with a working setup."
                features={[
                  'Full setup walkthrough',
                  'Custom CLAUDE.md creation',
                  'MCP tools configuration',
                  'Best practices guidance'
                ]}
              />
              <ServiceCard
                title="Deep Dive"
                price="$350"
                duration="2 hours"
                description="Intensive session on a specific challenge. Complex workflows, debugging, or advanced features."
                features={[
                  'Problem-specific focus',
                  'Screen sharing & live coding',
                  'Advanced techniques',
                  'Follow-up documentation'
                ]}
              />
            </div>
          </div>

          {/* Team Services */}
          <div id="team" className="mb-12 scroll-mt-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-xl font-semibold text-forge-cyan">Team Training</h3>
              <button
                onClick={() => shareSection('team')}
                className={`px-2 py-1 text-xs rounded-lg transition-all ${
                  sharedSection === 'team'
                    ? 'bg-green-500 text-white'
                    : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                }`}
              >
                {sharedSection === 'team' ? 'Copied!' : 'Share'}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold">Team Workshop</h4>
                    <p className="text-forge-cyan font-bold text-2xl">$1,500</p>
                  </div>
                  <span className="text-sm text-gray-400">Half-day</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Half-day training for 5-15 developers. Cover fundamentals, best practices,
                  and team-specific workflows.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Claude Code fundamentals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Team workflow optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Hands-on exercises
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Q&A session
                  </li>
                </ul>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold">Full-Day Bootcamp</h4>
                    <p className="text-forge-cyan font-bold text-2xl">$3,000</p>
                  </div>
                  <span className="text-sm text-gray-400">Full day</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Comprehensive training from basics to advanced features. Includes lunch break
                  and afternoon deep-dives.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Everything in Workshop
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Advanced workflows
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    MCP & plugins deep-dive
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-forge-cyan">+</span>
                    Custom CLAUDE.md templates
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ongoing Support */}
          <div id="advisory" className="scroll-mt-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-xl font-semibold text-forge-purple">Ongoing Advisory</h3>
              <button
                onClick={() => shareSection('advisory')}
                className={`px-2 py-1 text-xs rounded-lg transition-all ${
                  sharedSection === 'advisory'
                    ? 'bg-green-500 text-white'
                    : 'bg-forge-cyan/20 hover:bg-forge-cyan/30 text-forge-cyan'
                }`}
              >
                {sharedSection === 'advisory' ? 'Copied!' : 'Share'}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="glass rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-2">Light</h4>
                <p className="text-forge-cyan font-bold text-2xl mb-2">$500<span className="text-sm text-gray-400">/mo</span></p>
                <p className="text-gray-400 text-sm mb-4">2 hours/month, async questions</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>+ Email support</li>
                  <li>+ Async questions</li>
                  <li>+ Monthly check-in</li>
                </ul>
              </div>
              <div className="gradient-border rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-2">Standard</h4>
                <p className="text-forge-cyan font-bold text-2xl mb-2">$1,200<span className="text-sm text-gray-400">/mo</span></p>
                <p className="text-gray-400 text-sm mb-4">5 hours/month, weekly sync</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>+ Everything in Light</li>
                  <li>+ Weekly video call</li>
                  <li>+ Priority response</li>
                  <li>+ Slack/Discord access</li>
                </ul>
              </div>
              <div className="glass rounded-2xl p-6">
                <h4 className="text-lg font-bold mb-2">Premium</h4>
                <p className="text-forge-cyan font-bold text-2xl mb-2">$2,500<span className="text-sm text-gray-400">/mo</span></p>
                <p className="text-gray-400 text-sm mb-4">10 hours/month, on-call support</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>+ Everything in Standard</li>
                  <li>+ On-call support</li>
                  <li>+ Team training included</li>
                  <li>+ Custom tooling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Work With Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-forge-cyan mb-4">Daily Practitioner</h3>
                <p className="text-gray-400">
                  I use Claude Code every day for real projects. I know what works,
                  what doesn&apos;t, and the shortcuts that save hours.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-forge-cyan mb-4">Open Source Contributor</h3>
                <p className="text-gray-400">
                  Author of <Link href="/templates" className="text-forge-cyan hover:underline">momentum</Link> and{' '}
                  <Link href="/templates" className="text-forge-cyan hover:underline">memory-mcp</Link> -
                  tools used by developers worldwide for Claude Code memory management.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-forge-cyan mb-4">Free Tools First</h3>
                <p className="text-gray-400">
                  Built <Link href="/tools" className="text-forge-cyan hover:underline">11 free tools</Link> for
                  the community. This consulting practice exists because I genuinely want to help developers succeed.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-forge-cyan mb-4">Honest Advice</h3>
                <p className="text-gray-400">
                  I&apos;ll tell you what you need to hear, not what you want to hear.
                  Sometimes Claude Code isn&apos;t the right tool - I&apos;ll say so.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative z-10 py-16" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Get Started
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Tell me about your needs and I&apos;ll get back to you within 24 hours.
            </p>

            {status === 'success' ? (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center text-green-300">
                {responseMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Interest</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all"
                    >
                      <option value="audit">Claude Code Audit ($150)</option>
                      <option value="setup">Setup Session ($200)</option>
                      <option value="deep-dive">Deep Dive ($350)</option>
                      <option value="workshop">Team Workshop ($1,500)</option>
                      <option value="bootcamp">Full-Day Bootcamp ($3,000)</option>
                      <option value="advisory">Ongoing Advisory</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tell me about your needs</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    placeholder="What are you hoping to achieve? What challenges are you facing?"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-forge-cyan transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-4 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all disabled:opacity-50 glow-cyan"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                </button>

                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">{responseMessage}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="relative z-10 py-16 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Not Ready for Consulting?</h2>
            <p className="text-gray-400 mb-8">
              Start with our free resources. When you&apos;re ready for personalized help, I&apos;ll be here.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/tools/cheat-sheet" className="glass rounded-xl p-6 hover:border-forge-cyan/50 transition-all text-left">
                <div className="text-forge-cyan text-2xl mb-3">📋</div>
                <h3 className="font-semibold mb-2">Cheat Sheet</h3>
                <p className="text-sm text-gray-400">Commands, shortcuts, and CLAUDE.md patterns on one page.</p>
              </Link>
              <Link href="/blog/context-management-guide" className="glass rounded-xl p-6 hover:border-forge-cyan/50 transition-all text-left">
                <div className="text-forge-cyan text-2xl mb-3">📖</div>
                <h3 className="font-semibold mb-2">Context Guide</h3>
                <p className="text-sm text-gray-400">12-min deep dive on managing context and avoiding compaction.</p>
              </Link>
              <Link href="/faq" className="glass rounded-xl p-6 hover:border-forge-cyan/50 transition-all text-left">
                <div className="text-forge-cyan text-2xl mb-3">❓</div>
                <h3 className="font-semibold mb-2">FAQ</h3>
                <p className="text-sm text-gray-400">Common questions about Claude Code, tools, and consulting.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <FAQItem
                question="What's included in a session?"
                answer="All sessions are conducted via video call with screen sharing. You'll get a recording of the session and any documentation or recommendations in writing. For Setup Sessions, you'll leave with a fully configured Claude Code environment."
              />
              <FAQItem
                question="Can you help with a specific problem?"
                answer="Yes! The Deep Dive session is designed for specific challenges. Whether it's debugging a complex workflow, configuring MCP tools, or optimizing your CLAUDE.md, we can focus on exactly what you need."
              />
              <FAQItem
                question="Do you offer team training remotely?"
                answer="Yes, all team workshops and bootcamps can be conducted remotely via video call. For larger teams or those preferring in-person training, contact me to discuss options."
              />
              <FAQItem
                question="What if Claude Code isn't right for my use case?"
                answer="I'll tell you honestly. During our initial conversation, if I think another tool would serve you better, I'll say so. I'm not here to sell you something you don't need."
              />
              <FAQItem
                question="How do I pay?"
                answer="After we confirm the scope and schedule, I'll send an invoice via Stripe. Payment is due before the session. For ongoing advisory, monthly billing is available."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Level Up?
            </h2>
            <p className="text-gray-400 mb-8">
              Whether you&apos;re just getting started or looking to optimize your team&apos;s workflow,
              I can help you get more from Claude Code.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-4 bg-forge-cyan text-forge-dark font-semibold rounded-xl hover:bg-forge-cyan/90 transition-all glow-cyan"
            >
              Book a Session
            </a>
            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500">
              <Link href="/tools" className="hover:text-white transition-all">
                Try Free Tools
              </Link>
              <Link href="/templates" className="hover:text-white transition-all">
                Explore Memory Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ServiceCard({
  title,
  price,
  duration,
  description,
  features,
  highlight = false
}: {
  title: string
  price: string
  duration: string
  description: string
  features: string[]
  highlight?: boolean
}) {
  return (
    <div className={`${highlight ? 'gradient-border' : 'glass'} rounded-2xl p-6 relative`}>
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-forge-cyan text-forge-dark text-xs font-semibold rounded-full">
          Most Popular
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-bold">{title}</h4>
          <p className="text-forge-cyan font-bold text-2xl">{price}</p>
        </div>
        <span className="text-sm text-gray-400">{duration}</span>
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <ul className="space-y-2 text-sm text-gray-300">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-forge-cyan">+</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between"
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-400 text-sm">
          {answer}
        </div>
      )}
    </div>
  )
}
