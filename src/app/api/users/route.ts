import { NextRequest } from 'next/server'

export const runtime = 'edge'

interface Env {
  DB: D1Database
}

export const POST = async (req: NextRequest, context: { env: Env }) => {
  const { env } = context

  try {
    const body = (await req.json()) as {
      email?: string
      passwordHash?: string
      name?: string
    }

    const { email, passwordHash, name } = body

    if (!email || !passwordHash || !name) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    const db = env?.DB

    if (!db) {
      return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
    }

    const stmt = db.prepare(
      'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, datetime("now"))'
    )
    await stmt.bind(name, email, passwordHash).run()

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    if (typeof message === 'string' && message.toLowerCase().includes('unique')) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 })
    }
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

type D1Database = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      run: () => Promise<{ success: boolean }>
    }
  }
}
