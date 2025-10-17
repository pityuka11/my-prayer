import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh', 'ro', 'hu'],
  defaultLocale: 'en',
});

// OpenNext middleware wrapper
export default async function middleware(request: NextRequest) {
  // Attach DB from globalThis if it exists in env
  // OpenNext provides bindings via globalThis during runtime automatically
  if (!(globalThis as any).DB && (globalThis as any).DB === undefined) {
    // in Pages Functions / Workers, env bindings should already exist
    // if not, you could attach a stub for local dev here
    // globalThis.DB = someMockDB;
  }

  // Call next-intl middleware
  return intlMiddleware(request); // only pass 1 argument!
}

// Matcher config stays the same
export const config = {
  matcher: ['/', '/(en|hu|es|fr|de|it|pt|ru|ja|ko|zh|ro)/:path*'],
};
