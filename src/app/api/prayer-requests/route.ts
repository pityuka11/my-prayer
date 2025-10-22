import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database, CloudflareEnvWithDB } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting prayer request POST...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      console.log('🔍 Cloudflare context env keys:', Object.keys(env || {}))
      
      if ((env as CloudflareEnvWithDB)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as CloudflareEnvWithDB).DB)
      } else {
        console.log('⚠️ No DB binding found in Cloudflare context')
        console.log('🔍 Available env bindings:', Object.keys(env || {}))
      }
    } catch (error) {
      console.log('⚠️ Error accessing Cloudflare context:', error)
      
      // Fallback: try direct globalThis access
      const globalDB = (globalThis as { DB?: D1Database }).DB
      if (globalDB) {
        console.log('✅ Found database in globalThis.DB (fallback)')
        db.setDB(globalDB)
      } else {
        console.log('⚠️ No database found in any location')
      }
    }
    
    const { content, category, displayName } = (await req.json()) as { 
      content?: string
      category?: string
      displayName?: string
    }

    if (!content || !category) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    console.log('Inserting prayer request:', { content, category, displayName })
    await dbHelpers.insertPrayerRequest(content, category, displayName)
    console.log('Prayer request inserted successfully')

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error inserting prayer request:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const GET = async () => {
  try {
    console.log('🚀 Starting prayer request GET...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      console.log('🔍 Cloudflare context env keys:', Object.keys(env || {}))
      
      if ((env as CloudflareEnvWithDB)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as CloudflareEnvWithDB).DB)
      } else {
        console.log('⚠️ No DB binding found in Cloudflare context')
        console.log('🔍 Available env bindings:', Object.keys(env || {}))
      }
    } catch (error) {
      console.log('⚠️ Error accessing Cloudflare context:', error)
      
      // Fallback: try direct globalThis access
      const globalDB = (globalThis as { DB?: D1Database }).DB
      if (globalDB) {
        console.log('✅ Found database in globalThis.DB (fallback)')
        db.setDB(globalDB)
      } else {
        console.log('⚠️ No database found in any location')
      }
    }
    
    console.log('Fetching prayer requests')
    const requests = await dbHelpers.getPrayerRequests()
    console.log('Prayer requests fetched:', requests?.length || 0)

    return new Response(JSON.stringify({ requests }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error fetching prayer requests:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
