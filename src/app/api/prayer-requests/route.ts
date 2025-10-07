import { NextRequest } from 'next/server';

declare const DB: D1Database;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { content?: string; userId?: number };
    const { content, userId } = body;

    if (!content || !userId) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    await DB.prepare(
      'INSERT INTO prayer_requests (user_id, content, created_at) VALUES (?1, ?2, datetime("now"))'
    ).bind(userId, content).run();

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await DB.prepare(
      'SELECT pr.*, u.name as user_name FROM prayer_requests pr JOIN users u ON pr.user_id = u.id ORDER BY pr.created_at DESC LIMIT 10'
    ).bind()
      .all();

    return new Response(JSON.stringify({ requests: result.results }), { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

type D1Database = {
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      run: () => Promise<{ success: boolean }>;
      all: () => Promise<{ results: unknown[] }>;
    };
  };
};
