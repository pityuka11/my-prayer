import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, ctx: { env: { DB: D1Database } }) {
  try {
    const body = await req.json();
    const { email, passwordHash } = body;
    if (!email || !passwordHash) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    await ctx.env.DB.prepare(
      'INSERT INTO users (email, password_hash, created_at) VALUES (?1, ?2, datetime("now"))'
    ).bind(email, passwordHash).run();

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

type D1Database = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      run: () => Promise<{ success: boolean }>
    }
  }
};
