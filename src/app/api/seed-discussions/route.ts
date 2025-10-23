import { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { dbHelpers, db } from '@/lib/db'
import type { D1Database, CloudflareEnvWithDB } from '@/lib/types'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const POST = async () => {
  try {
    console.log('🚀 Starting discussion groups seeding...')
    
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
    
    // Sample discussion groups
    const sampleGroups = [
      {
        name: 'Daily Prayer Warriors',
        description: 'Join us for daily prayer sessions and share your prayer requests. We meet every morning at 7 AM EST.',
        category: 'Prayer'
      },
      {
        name: 'Faith & Family',
        description: 'Discuss topics related to raising children in faith, marriage, and family values. Share experiences and seek guidance.',
        category: 'Family'
      },
      {
        name: 'Bible Study Circle',
        description: 'Deep dive into Scripture together. We study one book at a time and discuss its meaning for our lives today.',
        category: 'Study'
      },
      {
        name: 'Young Adults Fellowship',
        description: 'A space for young adults (18-30) to connect, share struggles, and grow in faith together.',
        category: 'Fellowship'
      },
      {
        name: 'Healing & Recovery',
        description: 'Support group for those dealing with addiction, mental health, or other challenges. Find hope and healing in community.',
        category: 'Support'
      }
    ];

    console.log('Creating sample discussion groups...')
    
    for (const group of sampleGroups) {
      try {
        await dbHelpers.insertDiscussionGroup(group.name, group.description, group.category)
        console.log(`✅ Created group: ${group.name}`)
      } catch (error) {
        console.log(`⚠️ Error creating group ${group.name}:`, error)
      }
    }

    console.log('✅ Discussion groups seeding completed')

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Sample discussion groups created successfully',
      groupsCreated: sampleGroups.length
    }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error seeding discussion groups:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
