import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async (req: NextRequest, { env }: { env: { DB: D1Database } }) => {
  // Access DB from Cloudflare Workers environment through env binding
  const db = env.DB
  if (!db) {
    console.error('Database not available in Cloudflare Workers environment')
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  const { content, category, displayName } = (await req.json()) as { content?: string; category?: string; displayName?: string }
  if (!content || !category) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
  }

  try {
    console.log('Inserting prayer request:', { content, category, displayName })
    await db.prepare('INSERT INTO prayer_requests (user_id, content, category, display_name, created_at) VALUES (?, ?, ?, ?, datetime("now"))')
      .bind(null, content, category, displayName ?? null)
      .run()

    console.log('Prayer request inserted successfully')
    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error inserting prayer request:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const GET = async (req: NextRequest, { env }: { env: { DB: D1Database } }) => {
  // Access DB from Cloudflare Workers environment through env binding
  const db = env.DB
  if (!db) {
    console.error('Database not available in Cloudflare Workers environment')
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  try {
    console.log('Fetching prayer requests')
    const result = await db.prepare(
      'SELECT pr.*, COALESCE(NULLIF(pr.display_name, ""), COALESCE(u.name, "Anonymous")) as user_name FROM prayer_requests pr LEFT JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
    ).all()

    console.log('Prayer requests fetched:', result.results?.length || 0)
    return new Response(JSON.stringify({ requests: result.results }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error fetching prayer requests:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
