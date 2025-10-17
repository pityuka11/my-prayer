import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

const getDB = (): D1Database | undefined => {
  return globalThis.DB
}

export const GET = async () => {
  const db = getDB()
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  try {
    const result = await db.prepare(
      'SELECT * FROM prayer_goals ORDER BY created_at DESC'
    ).all()

    return new Response(JSON.stringify({ goals: result.results }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  const db = getDB()
  if (!db) return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })

  const { title, description, category } = (await req.json()) as { 
    title?: string
    description?: string
    category?: string
  }
  
  if (!title || !category) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })

  try {
    await db.prepare(
      'INSERT INTO prayer_goals (title, description, category, created_at) VALUES (?, ?, ?, datetime("now"))'
    )
    .bind(title, description || '', category)
    .run()

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
