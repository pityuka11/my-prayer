import { NextRequest } from 'next/server';

declare const DB: D1Database; // Your D1 binding from Vercel

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; passwordHash?: string };
    const { email, passwordHash } = body;

    if (!email || !passwordHash) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    await DB.prepare(
      'INSERT INTO users (email, password_hash, created_at) VALUES (?1, ?2, datetime("now"))'
    ).bind(email, passwordHash).run();

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
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
