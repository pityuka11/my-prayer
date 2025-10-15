import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

const getDB = (): D1Database | undefined => {
  return globalThis.DB
}

export const POST = async (req: NextRequest) => {
  const db = getDB()
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  const { email, passwordHash, name } = (await req.json()) as {
    email?: string
    passwordHash?: string
    name?: string
  }

  if (!email || !passwordHash || !name) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })

  try {
    await db.prepare(
      'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, datetime("now"))'
    )
    .bind(name, email, passwordHash)
    .run()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (typeof message === 'string' && message.toLowerCase().includes('unique')) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 })
    }
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }), { status: 201 })
}
