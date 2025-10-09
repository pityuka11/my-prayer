import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface Env {
  DB: D1Database;
}

export default async function handler(req: NextRequest, env: Env) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = (await req.json()) as { email?: string; passwordHash?: string; name?: string };
    const { email, passwordHash, name } = body;

    if (!email || !passwordHash || !name) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // In OpenNext worker, env is passed differently
    const db = env.DB || (globalThis as unknown as { DB?: D1Database }).DB;

    if (!db) {
      return new Response(JSON.stringify({ error: 'Database not available' }), { status: 500 });
    }

    const stmt = db.prepare(
      'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, datetime("now"))'
    );
    await stmt.bind(name, email, passwordHash).run();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    if (typeof message === 'string' && message.toLowerCase().includes('unique')) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 });
    }
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

type D1Database = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      run: () => Promise<{ success: boolean }>;
    };
  };
};
