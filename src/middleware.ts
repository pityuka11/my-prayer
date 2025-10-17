import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import type { D1Database } from '@/lib/types';

// --------------------
// 1️⃣ Setup next-intl middleware
// --------------------
const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ro', 'hu'],
  defaultLocale: 'en',
});

// --------------------
// 2️⃣ Middleware wrapper to attach DB
// --------------------
export default async function middleware(request: NextRequest) {
  if (!(globalThis as { DB?: D1Database }).DB) {
    // Local development mock DB
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Using mock DB for local development');

      const mockDb: D1Database = {
        prepare: (_: string) => ({
          all: async () => ({ results: [] }),
          run: async () => ({ success: true }),
          bind: (..._: readonly unknown[]) => ({
            all: async () => ({ results: [] }),
            run: async () => ({ success: true }),
          }),
        }),
      };

      // Assign to globalThis safely
      (globalThis as { DB?: D1Database }).DB = mockDb;
    }
  }

  // Call next-intl middleware
  return intlMiddleware(request);
}

// --------------------
// 3️⃣ Matcher config
// --------------------
export const config = {
  matcher: ['/', '/(en|hu|es|fr|de|it|pt|ru|ja|ko|zh|ro)/:path*'],
};
