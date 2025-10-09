import { NextRequest } from 'next/server'
import type { D1Database, GlobalWithD1 } from '@/lib/types'

export const runtime = 'edge'

const getDB = (): D1Database | undefined => {
  return (globalThis as GlobalWithD1).DB
}

export const POST = async (req: NextRequest) => {
  const db = getDB()
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  const { content, userId } = (await req.json()) as { content?: string; userId?: number }
  if (!content || !userId) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })

  await db.prepare('INSERT INTO prayer_requests (user_id, content, created_at) VALUES (?, ?, datetime("now"))')
    .bind(userId, content)
    .run()

  return new Response(JSON.stringify({ success: true }), { status: 201 })
}

// Remove unused parameter to fix `_req` warning
export const GET = async () => {
  const db = getDB()
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  const result = await db.prepare(
    'SELECT pr.*, u.name as user_name FROM prayer_requests pr JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
  ).all()

  return new Response(JSON.stringify({ requests: result.results }), { status: 200 })
}
