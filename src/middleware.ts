import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import type { D1Database } from '@/lib/types';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ro', 'hu'],
  defaultLocale: 'hu',
});

export default async function middleware(request: NextRequest) {
  if (!(globalThis as any).DB) {
    if ((globalThis as any).process?.env?.NODE_ENV !== 'production') {
      console.warn('Using mock DB for local development');

      const mockDb: D1Database = {
        prepare: async (_query: string) => ({
          all: async () => ({ results: [] }),
          run: async () => ({ success: true }),
          bind: () => ({
            all: async () => ({ results: [] }),
            run: async () => ({ success: true }),
          }),
        }),
        all: async () => ({ results: [] }),
      };

      (globalThis as any).DB = mockDb;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(hu|en|es|fr|de|it|pt|ru|ja|ko|zh|ro)/:path*'],
};
