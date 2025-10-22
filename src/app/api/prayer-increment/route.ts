import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database, CloudflareEnvWithDB } from '@/lib/types'

export const runtime = 'nodejs'

export const POST = async (req: NextRequest) => {
  try {
    console.log('🚀 Starting prayer increment POST...')
    
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
    
    const { prayerRequestId } = (await req.json()) as { prayerRequestId?: number }

    if (!prayerRequestId) {
      return new Response(JSON.stringify({ error: 'Prayer request ID is required' }), { status: 400 })
    }

    console.log('Incrementing prayer count for ID:', prayerRequestId)
    await dbHelpers.incrementPrayerCount(prayerRequestId)
    console.log('Prayer count incremented successfully')

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error incrementing prayer count:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
