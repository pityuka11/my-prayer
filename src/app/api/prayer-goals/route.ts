import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const GET = async (req: NextRequest, { env }: { env: { DB: D1Database } }) => {
  // Access DB from Cloudflare Workers environment through env binding
  const db = env.DB
  if (!db) {
    console.error('Database not available in Cloudflare Workers environment')
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  try {
    console.log('Fetching prayer goals')
    const result = await db.prepare(
      'SELECT * FROM prayer_goals ORDER BY created_at DESC'
    ).all()

    console.log('Prayer goals fetched:', result.results?.length || 0)
    return new Response(JSON.stringify({ goals: result.results }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error fetching prayer goals:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const POST = async (req: NextRequest, { env }: { env: { DB: D1Database } }) => {
  // Access DB from Cloudflare Workers environment through env binding
  const db = env.DB
  if (!db) {
    console.error('Database not available in Cloudflare Workers environment')
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 })
  }

  const { title, description, category } = (await req.json()) as { 
    title?: string
    description?: string
    category?: string
  }
  
  if (!title || !category) {
    return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
  }

  try {
    console.log('Inserting prayer goal:', { title, description, category })
    await db.prepare(
      'INSERT INTO prayer_goals (title, description, category, created_at) VALUES (?, ?, ?, datetime("now"))'
    )
    .bind(title, description || '', category)
    .run()

    console.log('Prayer goal inserted successfully')
    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error inserting prayer goal:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
