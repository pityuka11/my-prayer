import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
    const { email } = (await req.json()) as { email?: string }

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 })
    }

    // Send email to contact@myprayer.online
    // For now, we'll just log it. In production, you'd use an email service like SendGrid, Resend, etc.
    console.log('📧 Newsletter subscription:', { email, timestamp: new Date().toISOString() })
    
    // TODO: Implement actual email sending service
    // Example with a hypothetical email service:
    // await emailService.send({
    //   to: 'contact@myprayer.online',
    //   subject: 'New Newsletter Subscription',
    //   body: `New newsletter subscription from: ${email}`
    // })

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    }), { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Newsletter subscription error:', message)
    return new Response(JSON.stringify({ error: 'Failed to subscribe to newsletter' }), { status: 500 })
  }
}
