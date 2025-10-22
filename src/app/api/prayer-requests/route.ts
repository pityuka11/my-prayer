import { NextRequest } from 'next/server'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async (req: NextRequest, context?: { env?: { DB: D1Database } }) => {
  try {
    console.log('🚀 Starting prayer request POST...')
    
    // Try to get database from context first (OpenNext way)
    if (context?.env?.DB) {
      console.log('✅ Found database in context.env.DB')
      db.setDB(context.env.DB)
    } else {
      console.log('⚠️ No database found in context, using fallback methods')
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

export const GET = async (req: NextRequest, context?: { env?: { DB: D1Database } }) => {
  try {
    console.log('🚀 Starting prayer request GET...')
    
    // Try to get database from context first (OpenNext way)
    if (context?.env?.DB) {
      console.log('✅ Found database in context.env.DB')
      db.setDB(context.env.DB)
    } else {
      console.log('⚠️ No database found in context, using fallback methods')
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
