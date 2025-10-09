import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface Env {
  DB: D1Database;
}

export default async function handler(req: NextRequest, env: Env) {
  // In OpenNext worker, env is passed differently
  const db = env.DB || (globalThis as unknown as { DB?: D1Database }).DB;

  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 });
  }

  if (req.method === 'POST') {
    try {
      const body = (await req.json()) as { content?: string; userId?: number };
      const { content, userId } = body;

      if (!content || !userId) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
      }

      const stmt = db.prepare(
        'INSERT INTO prayer_requests (user_id, content, created_at) VALUES (?, ?, datetime("now"))'
      );
      await stmt.bind(userId, content).run();

      return new Response(JSON.stringify({ success: true }), { status: 201 });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  }

  if (req.method === 'GET') {
    try {
      const stmt = db.prepare(
        'SELECT pr.*, u.name as user_name FROM prayer_requests pr JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
      );
      const result = await stmt.bind().all();

      return new Response(JSON.stringify({ requests: result.results }), { status: 200 });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
}

type D1Database = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      run: () => Promise<{ success: boolean }>;
      all: () => Promise<{ results: unknown[] }>;
    };
  };
};
