import { NextRequest } from 'next/server'

export const runtime = 'edge'

type D1Database = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      run: () => Promise<{ success: boolean }>
      all: () => Promise<{ results: unknown[] }>
    }
    all: () => Promise<{ results: unknown[] }>
  }
}

// Access Cloudflare D1 (env.DB) or fallback for local dev
const getDB = (): D1Database | undefined => {
  return (globalThis as any).DB
}

export const POST = async (req: NextRequest) => {
  const db = getDB()
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  try {
    const { email, passwordHash, name } = (await req.json()) as {
      email?: string
      passwordHash?: string
      name?: string
    }

    if (!email || !passwordHash || !name) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    try {
      await db
        .prepare(
          'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, datetime("now"))'
        )
        .bind(name, email, passwordHash)
        .run()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      if (typeof message === 'string' && message.toLowerCase().includes('unique')) {
        return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 })
      }
      throw err
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
