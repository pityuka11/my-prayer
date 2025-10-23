import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database, CloudflareEnvWithDB } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const GET = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting discussions GET...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      if ((env as CloudflareEnvWithDB)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as CloudflareEnvWithDB).DB)
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
    
    const url = new URL(req.url)
    const groupId = url.searchParams.get('groupId')
    
    if (!groupId) {
      return new Response(JSON.stringify({ error: 'Group ID required' }), { status: 400 })
    }
    
    console.log('Fetching discussions for group:', groupId)
    const discussions = await dbHelpers.getDiscussions(parseInt(groupId))
    console.log('Discussions fetched:', discussions?.length || 0)

    return new Response(JSON.stringify({ discussions }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error fetching discussions:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting discussions POST...')
    
    // Get Cloudflare context to access D1 binding
    try {
      const { env } = getCloudflareContext()
      if ((env as CloudflareEnvWithDB)?.DB) {
        console.log('✅ Found database in Cloudflare context env.DB')
        db.setDB((env as CloudflareEnvWithDB).DB)
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
    
    const { groupId, userId, userName, message } = (await req.json()) as { 
      groupId?: number
      userId?: number
      userName?: string
      message?: string
    }
    
    if (!groupId || !userName || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    console.log('Inserting discussion message:', { groupId, userId, userName, message })
    await dbHelpers.insertDiscussion(groupId, userId, userName, message)
    console.log('Discussion message inserted successfully')

    return new Response(JSON.stringify({ success: true }), { status: 201 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error inserting discussion message:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
