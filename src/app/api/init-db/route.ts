import { getCloudflareContext } from '@opennextjs/cloudflare'
import { db } from '@/lib/db'
import type { D1Database, CloudflareEnvWithDB } from '@/lib/types'

export const runtime = 'nodejs'

export const POST = async () => {
  try {
    console.log('🚀 Starting database schema initialization...')
    
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
    
    // Read and execute schema
    const schemaSQL = `
-- Drop existing tables if they exist
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS discussions;
DROP TABLE IF EXISTS discussion_groups;
DROP TABLE IF EXISTS prayer_goals;
DROP TABLE IF EXISTS prayer_requests;
DROP TABLE IF EXISTS users;

-- D1 schema for my_prayer
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS prayer_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  display_name TEXT,
  prayers INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS prayer_goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS discussion_groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS discussions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES discussion_groups (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS group_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  joined_at TEXT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES discussion_groups (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE(group_id, user_id)
);
`;

    console.log('Creating database tables...')
    await db.executeMutation(schemaSQL)
    console.log('✅ Database schema initialized successfully')

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Database schema initialized successfully'
    }), { status: 200 })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Error initializing database schema:', message)
    return new Response(JSON.stringify({ error: message }), { status: 500 })
  }
}
