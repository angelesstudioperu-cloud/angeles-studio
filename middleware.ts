import { NextResponse } from 'next/server';
import { securityHeaders } from './config/security-headers';

// Vinext currently discovers Next middleware through this filename. Keep this
// compatibility entry point until its Next 16 proxy convention is supported.
export function middleware() {
  const response = NextResponse.next();
  for (const { key, value } of securityHeaders({
    allowUnsafeEval: process.env.NODE_ENV === 'development',
  })) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|images/|brand/|favicon.svg|og.png|apple-touch-icon.png|icon-192.png|icon-512.png|site.webmanifest).*)'],
};
