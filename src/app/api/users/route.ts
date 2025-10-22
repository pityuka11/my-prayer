import { NextRequest } from 'next/server'
import { dbHelpers } from '@/lib/db'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
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
