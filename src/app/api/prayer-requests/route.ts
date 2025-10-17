import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

export const POST = async (req: NextRequest) => {
  // Access DB from globalThis in Cloudflare Workers environment
  const db = (globalThis as { DB?: D1Database }).DB
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  const { content, category } = (await req.json()) as { content?: string; category?: string }
  if (!content || !category) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })

  try {
    await db.prepare('INSERT INTO prayer_requests (user_id, content, category, created_at) VALUES (?, ?, ?, datetime("now"))')
      .bind(null, content, category)
      .run()

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const GET = async () => {
  // Access DB from globalThis in Cloudflare Workers environment
  const db = (globalThis as { DB?: D1Database }).DB
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  try {
    const result = await db.prepare(
      'SELECT pr.*, COALESCE(u.name, "Anonymous") as user_name FROM prayer_requests pr LEFT JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
    ).all()

    return new Response(JSON.stringify({ requests: result.results }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
