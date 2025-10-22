import { NextRequest } from 'next/server'
import { db } from '@/lib/db'

// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export const GET = async () => {
  try {
    console.log('🧪 Testing database connection...')
    
    const dbInstance = db.getDB()
    if (!dbInstance) {
      console.log('❌ Database instance not available')
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Database not available',
        debug: 'DB instance is null'
      }), { status: 500 })
    }

    console.log('✅ Database instance found, testing query...')
    
    // Test a simple query
    const result = await dbInstance.prepare('SELECT 1 as test').all()
    console.log('📊 Test query result:', result)

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database connection working',
      testResult: result,
      timestamp: new Date().toISOString()
    }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('💥 Database test error:', message)
    console.error('📊 Full error:', e)
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: message,
      timestamp: new Date().toISOString()
    }), { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    console.log('🧪 Testing database write...',req.json)
    
    const dbInstance = db.getDB()
    if (!dbInstance) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Database not available'
      }), { status: 500 })
    }

    // Test inserting a simple record
    const testData = {
      content: 'Test prayer request',
      category: 'Test',
      displayName: 'Test User'
    }

    console.log('📝 Test data:', testData)
    
    const result = await dbInstance.prepare(
      'INSERT INTO prayer_requests (user_id, content, category, display_name, created_at) VALUES (?, ?, ?, ?, datetime("now"))'
    ).bind(null, testData.content, testData.category, testData.displayName).run()

    console.log('✅ Test insert result:', result)

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database write test successful',
      insertResult: result,
      timestamp: new Date().toISOString()
    }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('💥 Database write test error:', message)
    console.error('📊 Full error:', e)
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: message,
      timestamp: new Date().toISOString()
    }), { status: 500 })
  }
}
