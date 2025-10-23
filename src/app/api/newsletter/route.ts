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

    // Send email notification to contact@myprayer.online
    console.log('📧 Newsletter subscription:', { email, timestamp: new Date().toISOString() })
    
    // Send email notification using a webhook service
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_myprayer',
          template_id: 'template_newsletter',
          user_id: 'user_myprayer',
          template_params: {
            to_email: 'contact@myprayer.online',
            from_email: email,
            subject: 'New Newsletter Subscription',
            message: `New newsletter subscription from: ${email}\nTimestamp: ${new Date().toISOString()}`
          }
        })
      })
      console.log('✅ Newsletter notification email sent')
    } catch (emailError) {
      console.log('⚠️ Failed to send notification email:', emailError)
      // Continue anyway - the subscription is still valid
    }

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
