import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

// Helper function to get DB connection
const getDB = async (): Promise<D1Database | null> => {
  // Try Cloudflare Workers environment first
  const cloudflareDB = (globalThis as { DB?: D1Database }).DB
  if (cloudflareDB) return cloudflareDB

  // For local development, we'll use a mock or return null
  // In production, this will be available through Cloudflare Workers
  console.log('DB not available in local environment')
  return null
}

export const POST = async (req: NextRequest) => {
  const db = await getDB()
  if (!db) {
    // For local development, return a mock response
    const { content, category } = (await req.json()) as { content?: string; category?: string }
    if (!content || !category) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    
    console.log('Mock: Would insert prayer request:', { content, category })
    return new Response(JSON.stringify({ success: true, mock: true }), { status: 201 })
  }

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
  const db = await getDB()
  if (!db) {
    // For local development, return mock data
    console.log('Mock: Returning mock prayer requests')
    return new Response(JSON.stringify({ 
      requests: [
        {
          id: 1,
          content: "Please pray for my family's health and safety",
          category: "Health & Healing",
          user_name: "Anonymous",
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          content: "Praying for peace in our community",
          category: "Community & World",
          user_name: "Anonymous", 
          created_at: new Date().toISOString()
        }
      ]
    }), { status: 200 })
  }

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
