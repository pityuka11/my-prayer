import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database, CloudflareEnvWithDB } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting user registration POST...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      if ((env as CloudflareEnvWithDB)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as CloudflareEnvWithDB).DB)
      } else {
        console.log('⚠️ No DB binding found in Cloudflare context')
      }
    } catch (error) {
      console.log('⚠️ Error accessing Cloudflare context:', error)
      
      // Fallback: try direct globalThis access
      const globalDB = (globalThis as { DB?: D1Database }).DB
      if (globalDB) {
        console.log('✅ Found database in globalThis.DB (fallback)')
        db.setDB(globalDB)
      }
    }
    
    const { email, passwordHash, name } = (await req.json()) as {
      email?: string
      passwordHash?: string
      name?: string
    }

    if (!email || !passwordHash || !name) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    console.log('Inserting user:', { email, name })
    await dbHelpers.insertUser(name, email, passwordHash)
    console.log('User inserted successfully')

    // Send email notification to contact@myprayer.online
    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_myprayer',
          template_id: 'template_registration',
          user_id: 'user_myprayer',
          template_params: {
            to_email: 'contact@myprayer.online',
            from_email: email,
            subject: 'New User Registration',
            message: `New user registration:\nName: ${name}\nEmail: ${email}\nTimestamp: ${new Date().toISOString()}`
          }
        })
      })
      console.log('✅ Registration notification email sent')
    } catch (emailError) {
      console.log('⚠️ Failed to send notification email:', emailError)
      // Continue anyway - the registration is still valid
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (typeof message === 'string' && message.toLowerCase().includes('unique')) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 })
    }
    console.error('Error inserting user:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
