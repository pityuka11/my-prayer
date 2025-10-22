import type { D1Database } from '@/lib/types'

// Database abstraction layer for OpenNext/Cloudflare Workers
class DatabaseService {
  private db: D1Database | null = null

  constructor() {
    this.initializeDB()
  }

  private initializeDB() {
    console.log('🔍 Initializing database connection...')
    console.log('🌍 Environment check:', {
      hasGlobalThis: typeof globalThis !== 'undefined',
      hasProcess: typeof process !== 'undefined',
      hasWindow: typeof window !== 'undefined',
      nodeEnv: typeof process !== 'undefined' ? process.env.NODE_ENV : 'not available'
    })
    
    // Try multiple ways to access the D1 database
    if (typeof globalThis !== 'undefined') {
      console.log('✅ globalThis is available')
      
      // Method 1: Direct globalThis access
      const globalDB = (globalThis as { DB?: D1Database }).DB
      console.log('🔍 globalThis.DB:', globalDB ? 'Found' : 'Not found')
      console.log('🔍 globalThis keys:', Object.keys(globalThis).filter(key => key.includes('DB') || key.includes('d1')))
      this.db = globalDB || null
      
      // Method 2: Try process.env (for some deployments)
      if (!this.db && typeof process !== 'undefined' && process.env?.DB) {
        console.log('🔍 Found DB in process.env')
        this.db = process.env.DB as unknown as D1Database
      }
      
      // Method 3: Try window object (browser context)
      if (!this.db && typeof window !== 'undefined') {
        const windowDB = (window as { DB?: D1Database }).DB
        console.log('🔍 window.DB:', windowDB ? 'Found' : 'Not found')
        this.db = windowDB || null
      }
      
      // Method 4: Try different property names
      if (!this.db) {
        console.log('🔍 Trying alternative property names...')
        const altNames = ['d1', 'D1', 'database', 'DATABASE']
        for (const name of altNames) {
          const altDB = (globalThis as any)[name]
          if (altDB) {
            console.log(`🔍 Found database at globalThis.${name}`)
            this.db = altDB
            break
          }
        }
      }
    } else {
      console.log('❌ globalThis is not available')
    }
    
    console.log('📊 Database initialization result:', this.db ? 'SUCCESS' : 'FAILED')
    if (this.db) {
      console.log('🎉 Database connection established!')
      console.log('🔍 Database methods:', Object.getOwnPropertyNames(this.db))
    } else {
      console.log('💥 No database connection found')
      console.log('🔍 Available globalThis properties:', Object.keys(globalThis).slice(0, 20))
    }
  }

  getDB(): D1Database | null {
    // If database is not available, try to reinitialize
    if (!this.db) {
      console.log('🔄 Database not available, attempting reinitialization...')
      this.initializeDB()
    }
    return this.db
  }

  // Method to set database from external context (for Cloudflare Workers)
  setDB(database: D1Database) {
    console.log('🔧 Setting database from external context')
    this.db = database
  }

  async executeQuery<T = unknown>(query: string, ...params: unknown[]): Promise<T[]> {
    if (!this.db) {
      throw new Error('Database not available')
    }

    try {
      const stmt = this.db.prepare(query)
      if (params.length > 0) {
        const boundStmt = stmt.bind(...params)
        const result = await boundStmt.all()
        return result.results as T[]
      } else {
        const result = await stmt.all()
        return result.results as T[]
      }
    } catch (error) {
      console.error('Database query error:', error)
      throw error
    }
  }

  async executeMutation(query: string, ...params: unknown[]): Promise<void> {
    console.log('🔄 Executing mutation:', query.substring(0, 50) + '...')
    console.log('📝 Parameters:', params)
    
    if (!this.db) {
      console.log('❌ Database not available for mutation')
      throw new Error('Database not available')
    }

    try {
      console.log('🔧 Preparing statement...')
      const stmt = this.db.prepare(query)
      
      if (params.length > 0) {
        console.log('🔗 Binding parameters...')
        const boundStmt = stmt.bind(...params)
        console.log('▶️ Running bound statement...')
        const result = await boundStmt.run()
        console.log('✅ Mutation result:', result)
      } else {
        console.log('▶️ Running statement without parameters...')
        const result = await stmt.all()
        console.log('✅ Mutation result:', result)
      }
      
      console.log('🎉 Mutation completed successfully!')
    } catch (error) {
      console.error('💥 Database mutation error:', error)
      console.error('📊 Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        query: query.substring(0, 100),
        params: params
      })
      throw error
    }
  }
}

// Export singleton instance
export const db = new DatabaseService()

// Helper functions for common operations
export const dbHelpers = {
  async insertPrayerRequest(content: string, category: string, displayName?: string) {
    return db.executeMutation(
      'INSERT INTO prayer_requests (user_id, content, category, display_name, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
      null, content, category, displayName || null
    )
  },

  async getPrayerRequests() {
    return db.executeQuery(
      'SELECT pr.*, COALESCE(NULLIF(pr.display_name, ""), COALESCE(u.name, "Anonymous")) as user_name FROM prayer_requests pr LEFT JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
    )
  },

  async insertUser(name: string, email: string, passwordHash: string) {
    return db.executeMutation(
      'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, datetime("now"))',
      name, email, passwordHash
    )
  },

  async getPrayerGoals() {
    return db.executeQuery('SELECT * FROM prayer_goals ORDER BY created_at DESC')
  },

  async insertPrayerGoal(title: string, description: string, category: string) {
    return db.executeMutation(
      'INSERT INTO prayer_goals (title, description, category, created_at) VALUES (?, ?, ?, datetime("now"))',
      title, description || '', category
    )
  }
}
