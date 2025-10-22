import { NextRequest } from 'next/server'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting prayer request POST...')
    
    // Try multiple ways to get the D1 database
    let foundDB: D1Database | null = null
    
    // Method 1: Direct globalThis access
    const globalDB = (globalThis as { DB?: D1Database }).DB
    if (globalDB) {
      console.log('✅ Found database in globalThis.DB')
      foundDB = globalDB
    }
    
    // Method 2: Try Cloudflare Workers env context
    if (!foundDB) {
      try {
        const cfEnv = (globalThis as Record<string, unknown>).env as Record<string, unknown> | undefined
        if (cfEnv?.DB) {
          console.log('✅ Found database in globalThis.env.DB')
          foundDB = cfEnv.DB as D1Database
        }
      } catch (error) {
        console.log('⚠️ Error accessing Cloudflare env:', error)
      }
    }
    
    // Method 3: Try process.env
    if (!foundDB && typeof process !== 'undefined' && process.env?.DB) {
      console.log('✅ Found database in process.env.DB')
      foundDB = process.env.DB as unknown as D1Database
    }
    
    if (foundDB) {
      console.log('🎉 Database found, setting it in db service')
      db.setDB(foundDB)
    } else {
      console.log('⚠️ No database found in any location, using fallback methods')
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
    
    // Try multiple ways to get the D1 database
    let foundDB: D1Database | null = null
    
    // Method 1: Direct globalThis access
    const globalDB = (globalThis as { DB?: D1Database }).DB
    if (globalDB) {
      console.log('✅ Found database in globalThis.DB')
      foundDB = globalDB
    }
    
    // Method 2: Try Cloudflare Workers env context
    if (!foundDB) {
      try {
        const cfEnv = (globalThis as Record<string, unknown>).env as Record<string, unknown> | undefined
        if (cfEnv?.DB) {
          console.log('✅ Found database in globalThis.env.DB')
          foundDB = cfEnv.DB as D1Database
        }
      } catch (error) {
        console.log('⚠️ Error accessing Cloudflare env:', error)
      }
    }
    
    // Method 3: Try process.env
    if (!foundDB && typeof process !== 'undefined' && process.env?.DB) {
      console.log('✅ Found database in process.env.DB')
      foundDB = process.env.DB as unknown as D1Database
    }
    
    if (foundDB) {
      console.log('🎉 Database found, setting it in db service')
      db.setDB(foundDB)
    } else {
      console.log('⚠️ No database found in any location, using fallback methods')
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
