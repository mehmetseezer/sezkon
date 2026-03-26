import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 1. Check for standard Accept-Language based routing handled by next-intl first
  // However, next-intl does it internally. But if we want to override via IP...
  
  // Custom IP-based country detection
  const hasLocaleInPathname = routing.locales.some(
    (locale) => request.nextUrl.pathname.startsWith(`/${locale}/`) || request.nextUrl.pathname === `/${locale}`
  );

  if (!hasLocaleInPathname && request.nextUrl.pathname === '/') {
    // Check IP headers from Vercel or Cloudflare
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry');
    
    // If not Turkey AND not Turkish language, maybe fallback to EN otherwise TR
    // Next-intl already checks Accept-Language. So if we just let next-intl run, it uses Accept-Language.
    // If we want IP to override Accept-Language for the first visit:
    if (country && country !== 'TR') {
      // User is from outside Turkey, default to EN if no cookie exists
      const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
      if (!cookieLocale) {
        request.nextUrl.pathname = '/en';
        return NextResponse.redirect(request.nextUrl);
      }
    }
  }

  // Use default next-intl middleware (which handles Accept-Language robustly)
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en)/:path*']
};
