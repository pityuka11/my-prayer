import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const GET = async () => {
  try {
    console.log('🚀 Starting prayer goals GET...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      if ((env as any)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as any).DB as D1Database)
      } else {
        console.log('⚠️ No DB binding found in Cloudflare context')
      }
    } catch (error) {
      console.log('⚠️ Error accessing Cloudflare context:', error)
      
      // Fallback: try direct globalThis access
      const globalDB = (globalThis as { DB?: D1Database }).DB
      if (globalDB) {
        console.log('✅ Found database in globalThis.DB (fallback)')
        db.setDB(globalDB)
      }
    }
    
    console.log('Fetching prayer goals')
    const goals = await dbHelpers.getPrayerGoals()
    console.log('Prayer goals fetched:', goals?.length || 0)

    return new Response(JSON.stringify({ goals }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error fetching prayer goals:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting prayer goals POST...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      if ((env as any)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as any).DB as D1Database)
      } else {
        console.log('⚠️ No DB binding found in Cloudflare context')
      }
    } catch (error) {
      console.log('⚠️ Error accessing Cloudflare context:', error)
      
      // Fallback: try direct globalThis access
      const globalDB = (globalThis as { DB?: D1Database }).DB
      if (globalDB) {
        console.log('✅ Found database in globalThis.DB (fallback)')
        db.setDB(globalDB)
      }
    }
    
    const { title, description, category } = (await req.json()) as { 
      title?: string
      description?: string
      category?: string
    }
    
    if (!title || !category) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    console.log('Inserting prayer goal:', { title, description, category })
    await dbHelpers.insertPrayerGoal(title, description || '', category)
    console.log('Prayer goal inserted successfully')

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error inserting prayer goal:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
