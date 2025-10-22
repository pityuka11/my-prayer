import type { D1Database } from '@/lib/types'

// Database abstraction layer for OpenNext/Cloudflare Workers
class DatabaseService {
  private db: D1Database | null = null

  constructor() {
    this.initializeDB()
  }

  private initializeDB() {
    // Try multiple ways to access the D1 database
    if (typeof globalThis !== 'undefined') {
      // Method 1: Direct globalThis access
      this.db = (globalThis as any).DB
      
      // Method 2: Try process.env (for some deployments)
      if (!this.db && typeof process !== 'undefined' && process.env?.DB) {
        this.db = process.env.DB as D1Database
      }
      
      // Method 3: Try window object (browser context)
      if (!this.db && typeof window !== 'undefined' && (window as any).DB) {
        this.db = (window as any).DB
      }
    }
  }

  getDB(): D1Database | null {
    return this.db
  }

  async executeQuery<T = any>(query: string, ...params: any[]): Promise<T[]> {
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

  async executeMutation(query: string, ...params: any[]): Promise<void> {
    if (!this.db) {
      throw new Error('Database not available')
    }

    try {
      const stmt = this.db.prepare(query)
      if (params.length > 0) {
        const boundStmt = stmt.bind(...params)
        await boundStmt.run()
      } else {
        await stmt.run()
      }
    } catch (error) {
      console.error('Database mutation error:', error)
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
