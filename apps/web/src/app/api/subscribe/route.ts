import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter (resets on cold start)
// For production, use Upstash Redis or Vercel Edge Config
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT = 5 // requests per window
const RATE_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT) {
    return false
  }

  record.count++
  return true
}

// In production, this would connect to an email service like ConvertKit, Buttondown, etc.
// For now, we'll just validate and return success

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Log for demo (in production, send to email service)
    console.log('New subscriber:', email)

    // In production, you would:
    // 1. Add to ConvertKit: await fetch('https://api.convertkit.com/v3/forms/FORM_ID/subscribe', {...})
    // 2. Or Buttondown: await fetch('https://api.buttondown.email/v1/subscribers', {...})
    // 3. Or send to your own database

    return NextResponse.json(
      { message: 'Successfully subscribed!', email },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
