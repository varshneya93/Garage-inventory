import { NextRequest, NextResponse } from 'next/server';
import { validateCsrfToken, getCsrfTokenFromRequest, sanitizeObject } from './security';
import { monitoring } from './monitoring';

export interface SecurityCheckResult {
  success: boolean;
  error?: NextResponse;
}

// CSRF protection middleware
export async function checkCsrf(request: NextRequest, sessionId?: string): Promise<SecurityCheckResult> {
  // Only check CSRF for state-changing methods
  if (!['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    return { success: true };
  }

  // Skip CSRF check for API routes that use other authentication methods
  const skipPaths = ['/api/auth/', '/api/webhook/'];
  if (skipPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return { success: true };
  }

  const token = getCsrfTokenFromRequest(request);
  const session = sessionId || request.cookies.get('session')?.value;

  if (!session || !token || !validateCsrfToken(session, token)) {
    monitoring.trackSecurityEvent({
      type: 'csrf_failure',
      severity: 'high',
      details: {
        path: request.nextUrl.pathname,
        method: request.method,
        hasToken: !!token,
        hasSession: !!session,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    });

    return {
      success: false,
      error: NextResponse.json(
        {
          success: false,
          error: {
            code: 'CSRF_TOKEN_INVALID',
            message: 'Invalid or missing CSRF token',
          },
        },
        { status: 403 }
      ),
    };
  }

  return { success: true };
}

// Input sanitization middleware
export async function sanitizeRequestBody<T = any>(request: NextRequest): Promise<T> {
  try {
    const body = await request.json();
    return sanitizeObject(body) as T;
  } catch (error) {
    throw new Error('Invalid request body');
  }
}

// Request validation middleware
export function validateRequestHeaders(request: NextRequest): SecurityCheckResult {
  // Check Content-Type for POST/PUT requests
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentType = request.headers.get('content-type');
    if (!contentType) {
      return {
        success: false,
        error: NextResponse.json(
          {
            success: false,
            error: {
              code: 'MISSING_CONTENT_TYPE',
              message: 'Content-Type header is required',
            },
          },
          { status: 400 }
        ),
      };
    }
  }

  // Check User-Agent
  const userAgent = request.headers.get('user-agent');
  if (!userAgent || userAgent.length < 5) {
    monitoring.trackSecurityEvent({
      type: 'suspicious_activity',
      severity: 'medium',
      details: {
        reason: 'Invalid or missing user agent',
        path: request.nextUrl.pathname,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    });
  }

  return { success: true };
}

// IP-based request tracking for abuse detection
const requestTracker = new Map<string, { count: number; firstRequest: number; suspicious: boolean }>();

export function trackRequestPattern(request: NextRequest): SecurityCheckResult {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
              request.headers.get('x-real-ip') || 
              'unknown';

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window

  let tracker = requestTracker.get(ip);

  if (!tracker || now - tracker.firstRequest > windowMs) {
    tracker = { count: 1, firstRequest: now, suspicious: false };
    requestTracker.set(ip, tracker);
  } else {
    tracker.count++;

    // Flag as suspicious if more than 100 requests per minute
    if (tracker.count > 100 && !tracker.suspicious) {
      tracker.suspicious = true;
      monitoring.trackSecurityEvent({
        type: 'suspicious_activity',
        severity: 'high',
        details: {
          reason: 'Excessive request rate',
          requestCount: tracker.count,
          timeWindow: `${windowMs}ms`,
        },
        ipAddress: ip,
      });
    }
  }

  // Cleanup old entries
  if (requestTracker.size > 10000) {
    const cutoff = now - windowMs;
    for (const [key, value] of requestTracker.entries()) {
      if (now - value.firstRequest > cutoff) {
        requestTracker.delete(key);
      }
    }
  }

  return { success: true };
}

// Combined security middleware
export async function applySecurityChecks(
  request: NextRequest,
  options?: {
    checkCsrf?: boolean;
    sanitizeBody?: boolean;
    validateHeaders?: boolean;
    trackPattern?: boolean;
  }
): Promise<{
  success: boolean;
  error?: NextResponse;
  sanitizedBody?: any;
}> {
  const opts = {
    checkCsrf: true,
    sanitizeBody: true,
    validateHeaders: true,
    trackPattern: true,
    ...options,
  };

  // Track request pattern
  if (opts.trackPattern) {
    const patternCheck = trackRequestPattern(request);
    if (!patternCheck.success) {
      return { success: false, error: patternCheck.error };
    }
  }

  // Validate headers
  if (opts.validateHeaders) {
    const headerCheck = validateRequestHeaders(request);
    if (!headerCheck.success) {
      return { success: false, error: headerCheck.error };
    }
  }

  // Check CSRF
  if (opts.checkCsrf) {
    const csrfCheck = await checkCsrf(request);
    if (!csrfCheck.success) {
      return { success: false, error: csrfCheck.error };
    }
  }

  // Sanitize body
  let sanitizedBody;
  if (opts.sanitizeBody && ['POST', 'PUT', 'PATCH'].includes(request.method)) {
    try {
      sanitizedBody = await sanitizeRequestBody(request);
    } catch (error) {
      return {
        success: false,
        error: NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_REQUEST_BODY',
              message: 'Invalid request body format',
            },
          },
          { status: 400 }
        ),
      };
    }
  }

  return { success: true, sanitizedBody };
}
