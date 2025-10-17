import { NextRequest } from 'next/server'
import type { D1Database } from '@/lib/types'

// Helper function to get DB connection
const getDB = async (): Promise<D1Database | null> => {
  // Try Cloudflare Workers environment first
  const cloudflareDB = (globalThis as { DB?: D1Database }).DB
  if (cloudflareDB) return cloudflareDB

  // For local development, we'll use a mock or return null
  console.log('DB not available in local environment')
  return null
}

export const GET = async () => {
  const db = await getDB()
  if (!db) {
    // For local development, return mock prayer goals
    console.log('Mock: Returning mock prayer goals')
    return new Response(JSON.stringify({ 
      goals: [
        {
          id: 1,
          title: "Health & Healing",
          description: "Prayers for physical and mental health, recovery from illness, and overall well-being",
          category: "Health",
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: "Family & Relationships",
          description: "Prayers for family unity, relationships, marriage, and children",
          category: "Family",
          created_at: new Date().toISOString()
        },
        {
          id: 3,
          title: "Career & Work",
          description: "Prayers for job opportunities, career growth, workplace relationships, and financial stability",
          category: "Career",
          created_at: new Date().toISOString()
        }
      ]
    }), { status: 200 })
  }

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
  const db = await getDB()
  if (!db) {
    // For local development, return a mock response
    const { title, description, category } = (await req.json()) as { 
      title?: string
      description?: string
      category?: string
    }
    
    if (!title || !category) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    
    console.log('Mock: Would insert prayer goal:', { title, description, category })
    return new Response(JSON.stringify({ success: true, mock: true }), { status: 201 })
  }

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
