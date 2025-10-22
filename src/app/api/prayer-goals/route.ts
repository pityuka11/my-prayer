import { NextRequest } from 'next/server'
import { dbHelpers } from '@/lib/db'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const GET = async () => {
  try {
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
