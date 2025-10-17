import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import type { D1Database } from '@/lib/types';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ro', 'hu'],
  defaultLocale: 'en',
});

export default async function middleware(request: NextRequest) {
  if (!(globalThis as any).DB) {
    // Attach a mock DB for local development
    if ((globalThis as any).process?.env?.NODE_ENV !== 'production') {
      console.warn('Using mock DB for local development');

      (globalThis as any).DB = {
        prepare: async (query: string) => ({
          all: async () => ({ results: [] }),
          run: async () => ({ success: true }),
          bind: (...args: any[]) => ({
            all: async () => ({ results: [] }),
            run: async () => ({ success: true }),
          }),
        }),
        all: async () => ({ results: [] }),
      } as unknown as D1Database; // ⚡ Cast via unknown to satisfy TypeScript
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|hu|es|fr|de|it|pt|ru|ja|ko|zh|ro)/:path*'],
};
