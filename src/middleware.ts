import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSecurityHeaders, getContentSecurityPolicy } from '@/lib/security';
import { apiRateLimiter, contactFormRateLimiter, authRateLimiter } from '@/lib/rate-limit';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Apply security headers to all responses
  const securityHeaders = getSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Apply Content Security Policy
  response.headers.set('Content-Security-Policy', getContentSecurityPolicy());

  // Apply rate limiting based on route
  if (request.nextUrl.pathname.startsWith('/api/')) {
    let rateLimiter = apiRateLimiter;
    
    // Use stricter rate limiting for sensitive endpoints
    if (request.nextUrl.pathname.startsWith('/api/contact')) {
      rateLimiter = contactFormRateLimiter;
    } else if (request.nextUrl.pathname.startsWith('/api/auth')) {
      rateLimiter = authRateLimiter;
    }

    const rateLimitResult = rateLimiter.check(request);

    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.reset).toISOString());

    if (!rateLimitResult.success) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.',
          },
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
            ...Object.fromEntries(
              Object.entries(securityHeaders).map(([k, v]) => [k, v])
            ),
          },
        }
      );
    }
  }

  // Block requests with suspicious patterns
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /acunetix/i,
    /nessus/i,
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(userAgent))) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Access denied',
        },
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
