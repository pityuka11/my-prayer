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

const getDB = (): D1Database | undefined => {
  return (globalThis as any).DB
}

export const POST = async (req: NextRequest) => {
  const db = getDB()
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  try {
    const { content, userId } = (await req.json()) as { content?: string; userId?: number }
    if (!content || !userId) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    await db
      .prepare('INSERT INTO prayer_requests (user_id, content, created_at) VALUES (?, ?, datetime("now"))')
      .bind(userId, content)
      .run()

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const GET = async (_req: NextRequest) => {
  const db = getDB()
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  try {
    const result = await db
      .prepare(
        'SELECT pr.*, u.name as user_name FROM prayer_requests pr JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
      )
      .all()

    return new Response(JSON.stringify({ requests: result.results }), { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
