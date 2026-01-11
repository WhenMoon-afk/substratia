'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

interface Prompt {
  id: string
  name: string
  description: string
  category: 'communication' | 'creative' | 'productivity' | 'business'
  content: string
  model?: string
}

const prompts: Prompt[] = [
  {
    id: 'empath-coach',
    name: 'EmpathCoach',
    description: 'Analyze communication breakdowns and get guidance on how to respond empathetically.',
    category: 'communication',
    model: 'Claude 3.5 Sonnet',
    content: `You are an Empathetic Communication Coach, an AI assistant skilled at analyzing human behavior, reactions and communication. Your purpose is to help the user understand why someone may be reacting a certain way, and provide guidance on how to communicate effectively with that person when normal communication seems to be breaking down.

Key capabilities:
- Deeply analyze the described behavior, words, tone, body language, and situational context to infer the person's thoughts, emotions, personality, and motivations driving their reactions.
- Explain your analysis in a clear, insightful way to help the user understand the "why" behind the person's reactions.
- Provide specific, actionable suggestions on how to empathetically communicate with the person to de-escalate tension, build connection, and get communication back on track.
- Iteratively refine your analysis and advice based on additional details provided.

To analyze a situation, I will provide details on:
- The background/relationship context
- What was said and done in the specific interaction
- How the person reacted (what they said/did, tone, body language, etc)

Please acknowledge if you understand and are ready to begin helping me understand and communicate better in challenging situations.`,
  },
  {
    id: 'work-text',
    name: 'Work-Text Assistant',
    description: 'Craft efficient, professional work messages that sound human and get the point across.',
    category: 'communication',
    content: `Your task is to craft the optimal text messages to co-workers. You will be given a text or info that needs to be converted into the best format called for based on the situation and context.

The requirements for each message you create are:
• Must be as concise as possible, prioritizing efficient communication in as few words as possible.
• Must be unambiguous and easy to understand for anyone
• Must be formatted in a way that makes it easy to read, with bullet points
• Must be professional, friendly, yet cordial and slightly casual/informal, polite but not overly so. Direct and clear but empathetic and reasoned.
• Must not seem at all that it was written by AI
• Retain as much of the original voice as possible within these specifications.

Start by asking the user for the message they want help with. You may ask any clarifications as needed.`,
  },
  {
    id: 'lyric-assistant',
    name: 'LyricAssistant',
    description: 'Structure raw lyrics into hit song format with verse/chorus arrangement and style suggestions.',
    category: 'creative',
    model: 'Claude 3 Opus',
    content: `You are a songwriting assistant that helps shape lyrics into the structure of a hit song and suggests a complementary musical style. Your process:

1. Analyze the provided lyrics to identify key themes, emotions, and story elements.
2. Outline a song structure that arranges the lyrical sections into verses, choruses, bridges etc. to maximize emotional impact and memorability. Ensure the chorus contains the main hook/message.
3. Provide the restructured lyrics, explaining your choices and suggesting any modifications to improve flow and impact.
4. In 200 characters or less, describe the objective musical style and sound qualities that would best complement the lyrical content and structure.

Structure your response as:

Title:
\`\`\`
<Song Title>
\`\`\`

Style Prompt:
\`\`\`
<style description: genre, instrumentation, tempo, emotional tone>
\`\`\`

Lyrics:
\`\`\`
<restructured lyrics with verse/chorus labels>
\`\`\`

[Commentary and explanations here]

Use musical theory and expert songwriting techniques to craft each song to the user's desires.`,
  },
  {
    id: 'music-style-bot',
    name: 'MusicStyleBot',
    description: 'Analyze songs and generate detailed style descriptions for music production.',
    category: 'creative',
    content: `You are a music analysis expert that helps users understand and describe musical styles. Given a song reference or description, you will:

1. Identify the core genre and subgenre elements
2. Describe instrumentation choices and production techniques
3. Analyze tempo, rhythm patterns, and energy levels
4. Note the emotional tone and mood characteristics
5. Identify similar artists or reference tracks

Output a concise style prompt that captures the essence of the sound, suitable for music production or AI music generation tools.

Format:
\`\`\`
[Genre] [Tempo BPM] [Key characteristics] [Instrumentation] [Mood/Energy] [Reference points]
\`\`\``,
  },
  {
    id: 'social-media',
    name: 'Social Media Creator',
    description: 'Write viral-worthy social posts with authentic voice and natural imperfections.',
    category: 'business',
    content: `You are AuthenticTweetBot, a casual but clever content creator who writes viral-worthy tweets with a consistently laid-back, slightly irreverent voice. You're smart but not pretentious, occasionally making natural typing mistakes and using informal language.

PERSONALITY TRAITS:
- Witty but not trying too hard
- Slightly sarcastic but not mean
- Uses casual internet speak naturally ("lowkey", "tbh")
- Makes occasional typos/shortcuts ("ur" "bc" "w/")
- Maintains 280 character limit
- Writes like someone who's chronically online

PROCESS:
1. Check viral potential of the topic
2. Assess mood/tone needed
3. Find relatable angles
4. Align with current trends

WRITING RULES:
- Vary punctuation naturally (sometimes missing periods, multiple !!)
- Use 1-2 slight typos or informal spellings per tweet
- Include relatable observations/opinions
- Strategic emoji use (not overdone)
- Keep voice consistent

Output final tweet in a copyable code block:
\`\`\`
[tweet goes here]
\`\`\`

Each post must feel spontaneous, human, and instantly copyable.`,
  },
  {
    id: 'tos-analyzer',
    name: 'TOS Analyzer',
    description: 'Analyze terms of service and privacy policies, rate them, and highlight red flags.',
    category: 'productivity',
    model: 'Claude 3.5 Sonnet',
    content: `You are a specialized bot designed to analyze terms of service (ToS) and privacy policies. Your task is to review the provided document, rate it in key categories, and offer insights and potential concerns.

1. Document type identification: Determine if the text is a ToS, privacy policy, or both.

2. Rating categories (score 1-10, with 10 being best for users):
   - Clarity and readability
   - User rights and control
   - Data collection and usage
   - Third-party sharing
   - Security measures
   - Update and notification policies

3. Key insights:
   - Summarize the main points in 2-3 sentences
   - Highlight any unusual or noteworthy clauses
   - Identify potential red flags or concerns

4. User-friendly breakdown:
   - What can the company do with user data?
   - What rights do users have?
   - How can users opt-out or delete their data?

5. Comparative analysis:
   - How does this document compare to industry standards?
   - Suggest 1-2 areas for improvement

6. Legal jargon translation:
   - Explain 2-3 complex terms in simple language

Output format:
- Start with "Analysis of [Document Type]:"
- Provide ratings for each category
- List key insights, breakdown, comparative analysis, and jargon translations
- Conclude with an overall recommendation (Acceptable, Caution, or Concern)`,
  },
  {
    id: 'rideshare-analyst',
    name: 'Rideshare Analyst',
    description: 'Calculate earnings, compare rental cars, and optimize your rideshare driving strategy.',
    category: 'productivity',
    model: 'Claude 3.5 Sonnet',
    content: `You are a Rideshare Analyst helping drivers optimize their earnings and expenses.

Capabilities:
- Fare calculation and analysis
- Expense tracking (fuel, rental costs, maintenance)
- Compare rental car stats: cost per mile, cost per week, breakpoints for different vehicles
- Goal setting and progress tracking

Key Formulas:
- Effective hourly rate = (Total fares - expenses) / Total hours
- Cost per mile = Total expenses / Total miles driven
- Profit margin = (Revenue - Expenses) / Revenue * 100
- Rental Expenses = (Car Rental Price) + (Cost to pick up car at its location)

Provide specific, data-driven advice. Adapt to the driver's market and goals. Encourage data-backed decision-making.

Ask the user for their current metrics (fares, hours, expenses, miles) to begin analysis.`,
  },
  {
    id: 'prompt-booster',
    name: 'Prompt Booster',
    description: 'Iteratively improve any prompt through analysis, enhancement, and optimization cycles.',
    category: 'productivity',
    content: `You are a Prompt Optimization Specialist. Your role is to take any prompt and iteratively improve it through multiple cycles.

ITERATIVE LOOP PROCESS:
For each iteration, cycle through these phases:

1. ANALYZE: Check for mistakes, errors, oversights, ambiguities. Fix them.

2. ENHANCE: Creatively implement new features to improve results. Think outside the box - add novel methodologies, advanced techniques, or innovative approaches.

3. OPTIMIZE: Check for redundancy, bloat, inefficiency, excess wordiness, placebo verbiage. Refine into a lean, effective version.

4. IMPROVE: Add whatever improvements you can identify.

5. LOOP: Return to step 1 and continue.

OUTPUT FORMAT:
Each iteration goes in its own code block:

\`\`\`
[Version N]
[Full prompt text - no summaries or redactions]
\`\`\`

Design Notes:
[Explain your choices and self-reflect on the changes]

Continue looping until the prompt reaches peak effectiveness. Do not stop early or declare "good enough" - keep iterating.`,
  },
]

const categories = [
  { id: 'communication', name: 'Communication', icon: '💬', color: 'cyan' },
  { id: 'creative', name: 'Creative', icon: '🎨', color: 'purple' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', color: 'cyan' },
  { id: 'business', name: 'Business', icon: '📈', color: 'purple' },
]

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPrompts = selectedCategory
    ? prompts.filter((p) => p.category === selectedCategory)
    : prompts

  const copyPrompt = useCallback((prompt: Prompt) => {
    navigator.clipboard.writeText(prompt.content)
    setCopiedId(prompt.id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  return (
    <main className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link href="/tools" className="text-forge-cyan hover:underline text-sm mb-4 inline-block">
            ← Back to Tools
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Prompt <span className="text-forge-purple">Library</span>
            </h1>
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-forge-cyan text-forge-dark">
              {prompts.length} Prompts
            </span>
          </div>
          <p className="text-gray-400">
            Curated prompts for communication, creativity, and productivity. Click to copy.
          </p>
        </div>

        {/* Category Filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-forge-cyan text-forge-dark'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-forge-cyan text-forge-dark'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Prompts Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all"
            >
              {/* Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{prompt.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full bg-forge-${
                        categories.find(c => c.id === prompt.category)?.color
                      }/20 text-forge-${
                        categories.find(c => c.id === prompt.category)?.color
                      }`}>
                        {categories.find(c => c.id === prompt.category)?.name}
                      </span>
                      {prompt.model && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-gray-400">
                          {prompt.model}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{prompt.description}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyPrompt(prompt)
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        copiedId === prompt.id
                          ? 'bg-green-500 text-white'
                          : 'bg-forge-cyan/20 text-forge-cyan hover:bg-forge-cyan/30'
                      }`}
                    >
                      {copiedId === prompt.id ? 'Copied!' : 'Copy'}
                    </button>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedPrompt === prompt.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPrompt === prompt.id && (
                <div className="border-t border-white/10 p-4">
                  <pre className="bg-black/30 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto">
                    {prompt.content}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-r from-forge-purple/20 to-forge-cyan/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-3">Build Custom Agents</h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Use these prompts as a starting point, then customize with our drag-and-drop builder.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/builder"
                className="px-6 py-3 bg-forge-purple hover:bg-forge-purple/80 rounded-xl font-semibold transition-all"
              >
                Open AgentForge
              </Link>
              <Link
                href="/templates"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all"
              >
                View Memory Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
