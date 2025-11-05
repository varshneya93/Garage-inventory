# Security Guide

This document outlines the security measures implemented in the Portfolio Platform and best practices for maintaining security.

## Table of Contents

1. [Security Features](#security-features)
2. [Input Validation & Sanitization](#input-validation--sanitization)
3. [Rate Limiting](#rate-limiting)
4. [CSRF Protection](#csrf-protection)
5. [File Upload Security](#file-upload-security)
6. [Monitoring & Logging](#monitoring--logging)
7. [Security Headers](#security-headers)
8. [Best Practices](#best-practices)

## Security Features

### Implemented Security Measures

- **Input Validation**: Comprehensive validation using Zod schemas
- **Input Sanitization**: Automatic sanitization of user inputs to prevent XSS
- **Rate Limiting**: IP-based rate limiting for all API endpoints
- **CSRF Protection**: Token-based CSRF protection for state-changing operations
- **File Upload Security**: Malware scanning and file type validation
- **Security Headers**: Comprehensive security headers on all responses
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **Authentication**: NextAuth.js with role-based access control
- **Error Tracking**: Centralized error logging and monitoring
- **Security Event Logging**: Tracking of suspicious activities

## Input Validation & Sanitization

### Validation

All API endpoints use Zod schemas for input validation:

```typescript
import { contactFormSchema } from '@/lib/validation';

const validatedData = contactFormSchema.parse(body);
```

### Sanitization

Input sanitization is applied automatically:

```typescript
import { sanitizeInput, sanitizeObject } from '@/lib/security';

// Sanitize a single string
const clean = sanitizeInput(userInput);

// Sanitize an entire object
const cleanData = sanitizeObject(requestBody);
```

### What Gets Sanitized

- HTML tags (`<`, `>`)
- JavaScript protocols (`javascript:`, `data:text/html`)
- Event handlers (`onclick=`, `onerror=`, etc.)
- Null bytes
- Path traversal attempts (`../`)

## Rate Limiting

### Rate Limit Tiers

Different endpoints have different rate limits:

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| General API | 60 requests | 1 minute |
| Contact Form | 5 submissions | 1 hour |
| Authentication | 5 attempts | 15 minutes |
| File Upload | 10 uploads | 1 minute |

### Rate Limit Headers

All API responses include rate limit information:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 2024-01-01T12:00:00.000Z
```

### Handling Rate Limits

When rate limited, the API returns:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later."
  }
}
```

Response includes `Retry-After` header with seconds to wait.

## CSRF Protection

### How It Works

1. Server generates a CSRF token for each session
2. Token is stored server-side and sent to client
3. Client includes token in state-changing requests
4. Server validates token before processing request

### Implementation

```typescript
import { generateCsrfToken, validateCsrfToken } from '@/lib/security';

// Generate token
const token = generateCsrfToken(sessionId);

// Validate token
const isValid = validateCsrfToken(sessionId, token);
```

### Client-Side Usage

Include CSRF token in requests:

```typescript
// In header
headers: {
  'X-CSRF-Token': csrfToken
}

// Or in body
body: JSON.stringify({
  _csrf: csrfToken,
  // ... other data
})
```

## File Upload Security

### Security Measures

1. **File Type Validation**: Only allowed MIME types accepted
2. **File Size Limits**: 10MB per file, 50MB total per request
3. **Malware Scanning**: Basic signature detection
4. **Filename Sanitization**: Remove path traversal attempts
5. **Extension Validation**: Ensure extension matches MIME type
6. **Executable Detection**: Block executable file signatures

### Allowed File Types

- Images: JPEG, PNG, WebP, GIF, SVG
- Documents: PDF, DOC, DOCX (if enabled)

### Usage

```typescript
import { validateFileUpload, scanFileForMalware } from '@/lib/security';

// Validate file
const validation = validateFileUpload(file);
if (!validation.valid) {
  throw new Error(validation.error);
}

// Scan for malware
const scanResult = await scanFileForMalware(file);
if (!scanResult.safe) {
  throw new Error(scanResult.reason);
}
```

### Blocked Patterns

- Executable files (.exe, .bat, .sh, .ps1, etc.)
- Double extensions (image.jpg.exe)
- Executable signatures (PE, ELF, Mach-O)
- Suspicious content patterns

## Monitoring & Logging

### Error Tracking

All errors are automatically logged:

```typescript
import { monitoring } from '@/lib/monitoring';

try {
  // ... code
} catch (error) {
  monitoring.captureException(error, {
    userId: user.id,
    url: request.url,
    additionalData: { context: 'specific operation' }
  });
}
```

### Security Event Tracking

Security events are logged for audit:

```typescript
monitoring.trackSecurityEvent({
  type: 'rate_limit',
  severity: 'medium',
  details: {
    endpoint: '/api/contact',
    requestCount: 10
  },
  ipAddress: '192.168.1.1',
  userId: 'user123'
});
```

### Event Types

- `rate_limit`: Rate limit exceeded
- `csrf_failure`: CSRF token validation failed
- `auth_failure`: Authentication failed
- `suspicious_activity`: Suspicious patterns detected
- `file_upload_blocked`: File upload blocked by security scan

### Severity Levels

- `low`: Informational, no immediate action needed
- `medium`: Potential issue, monitor for patterns
- `high`: Suspicious activity, investigate
- `critical`: Active attack or breach attempt, immediate action required

### Viewing Logs

Admin users can view logs via API:

```bash
# Get error logs
GET /api/monitoring/errors?limit=50&offset=0

# Get security events
GET /api/monitoring/security?severity=high&limit=50
```

## Security Headers

### Applied Headers

All responses include security headers:

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: [detailed policy]
```

### Content Security Policy

The CSP restricts resource loading:

- Scripts: Self + trusted CDNs (Google Tag Manager, Plausible)
- Styles: Self + inline (for styled-components)
- Images: Self + data URIs + HTTPS
- Fonts: Self + data URIs
- Connections: Self + trusted APIs (GitHub, Twitter)

## Best Practices

### For Developers

1. **Always Validate Input**: Use Zod schemas for all user input
2. **Sanitize Output**: Escape HTML when rendering user content
3. **Use Parameterized Queries**: Prisma handles this automatically
4. **Check Authentication**: Use `requireAuth()` for protected routes
5. **Log Security Events**: Track suspicious activities
6. **Handle Errors Gracefully**: Don't expose sensitive information
7. **Keep Dependencies Updated**: Regularly update npm packages
8. **Review Code**: Conduct security reviews for sensitive features

### For Administrators

1. **Monitor Logs**: Regularly review error and security logs
2. **Update Credentials**: Rotate API keys and secrets regularly
3. **Review Access**: Audit user permissions periodically
4. **Backup Data**: Maintain regular database backups
5. **Test Security**: Conduct periodic security audits
6. **Stay Informed**: Keep up with security advisories

### Environment Variables

Secure sensitive configuration:

```bash
# Required for production
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Optional but recommended
SENTRY_DSN=
RATE_LIMIT_REDIS_URL=

# API Keys (store securely)
GITHUB_TOKEN=
SENDGRID_API_KEY=
```

### Production Checklist

- [ ] All environment variables configured
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Error tracking enabled (Sentry)
- [ ] Security headers verified
- [ ] File upload limits configured
- [ ] CSRF protection enabled
- [ ] Authentication tested
- [ ] Backup strategy in place
- [ ] Monitoring alerts configured

## Reporting Security Issues

If you discover a security vulnerability:

1. **Do not** open a public issue
2. Email security concerns to: [your-email]
3. Include detailed description and reproduction steps
4. Allow reasonable time for response before disclosure

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/advanced-features/security-headers)
- [Prisma Security](https://www.prisma.io/docs/concepts/components/prisma-client/security)
- [NextAuth.js Security](https://next-auth.js.org/configuration/options#security)
