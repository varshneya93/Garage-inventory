# Production Security Configuration

This guide covers security configurations and optimizations for production deployment.

## Pre-Deployment Security Checklist

### Environment Configuration

- [ ] All sensitive data moved to environment variables
- [ ] `.env` file added to `.gitignore`
- [ ] Production environment variables configured on hosting platform
- [ ] `NODE_ENV=production` set
- [ ] Database connection uses SSL/TLS
- [ ] API keys rotated from development values

### Authentication & Authorization

- [ ] `NEXTAUTH_SECRET` generated with strong random value
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] Session timeout configured appropriately
- [ ] Admin accounts use strong passwords
- [ ] Default/test accounts removed
- [ ] Role-based access control tested

### Rate Limiting

- [ ] Rate limits configured for production traffic
- [ ] Redis or similar distributed cache configured (recommended)
- [ ] Rate limit monitoring enabled
- [ ] IP whitelist configured for admin access (optional)

### File Upload Security

- [ ] File size limits configured
- [ ] Allowed file types restricted
- [ ] Upload directory permissions set correctly
- [ ] Malware scanning service integrated (recommended)
- [ ] CDN configured for serving uploaded files

### Monitoring & Logging

- [ ] Error tracking service configured (Sentry, etc.)
- [ ] Log aggregation service configured
- [ ] Security event alerts configured
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured

### Security Headers

- [ ] HTTPS enforced
- [ ] HSTS header enabled with appropriate max-age
- [ ] CSP configured for production domains
- [ ] Security headers tested with securityheaders.com

### Database Security

- [ ] Database backups automated
- [ ] Database access restricted by IP
- [ ] Database user has minimal required permissions
- [ ] Connection pooling configured
- [ ] Query logging enabled for audit

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Authentication
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://yourdomain.com"

# Application
NODE_ENV="production"
```

### Recommended Variables

```bash
# Error Tracking
SENTRY_DSN="https://your-sentry-dsn"
NEXT_PUBLIC_SENTRY_DSN="https://your-sentry-dsn"

# Email Service
SENDGRID_API_KEY="your-sendgrid-key"
EMAIL_FROM="noreply@yourdomain.com"

# External APIs
GITHUB_TOKEN="your-github-token"
TWITTER_BEARER_TOKEN="your-twitter-token"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"

# Rate Limiting (for distributed systems)
REDIS_URL="redis://user:password@host:6379"
```

### Generating Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate CSRF secret
openssl rand -hex 32

# Generate API key
openssl rand -base64 24
```

## Security Hardening

### 1. HTTPS Configuration

Ensure HTTPS is enforced:

```typescript
// next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ]
      }
    ]
  }
}
```

### 2. Content Security Policy

Update CSP for production domains:

```typescript
// src/lib/security.ts
export function getContentSecurityPolicy(): string {
  const policies = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://plausible.io https://yourdomain.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.github.com https://api.twitter.com https://yourdomain.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];
  return policies.join('; ');
}
```

### 3. Database Connection Pooling

Configure Prisma for production:

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### 4. Rate Limiting with Redis

For production, use Redis for distributed rate limiting:

```typescript
// src/lib/rate-limit-redis.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function checkRateLimit(
  key: string,
  limit: number,
  window: number
): Promise<{ success: boolean; remaining: number }> {
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  const ttl = await redis.ttl(key);
  
  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current),
  };
}
```

### 5. File Upload to Cloud Storage

Use cloud storage for production:

```typescript
// src/lib/storage.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read',
  });

  await s3Client.send(command);
  
  return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${filename}`;
}
```

## Monitoring Setup

### 1. Sentry Integration

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

### 2. Performance Monitoring

```typescript
// src/lib/performance-monitoring.ts
export function setupPerformanceMonitoring() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Monitor Long Tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          monitoring.trackPerformance({
            name: 'long-task',
            value: entry.duration,
            timestamp: Date.now(),
          });
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });

    // Monitor Resource Timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const resource = entry as PerformanceResourceTiming;
        if (resource.duration > 1000) {
          monitoring.trackPerformance({
            name: 'slow-resource',
            value: resource.duration,
            timestamp: Date.now(),
            metadata: {
              url: resource.name,
              type: resource.initiatorType,
            },
          });
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  }
}
```

### 3. Health Check Endpoint

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const checks = {
    database: false,
    timestamp: new Date().toISOString(),
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = true;
  } catch (error) {
    console.error('Database health check failed:', error);
  }

  const status = checks.database ? 200 : 503;

  return NextResponse.json(
    {
      status: checks.database ? 'healthy' : 'unhealthy',
      checks,
    },
    { status }
  );
}
```

## Security Incident Response

### 1. Incident Detection

Monitor for:
- Unusual spike in failed authentication attempts
- High rate of 4xx/5xx errors
- Suspicious file upload attempts
- Abnormal traffic patterns
- Database query anomalies

### 2. Response Procedure

1. **Identify**: Confirm the incident through logs and monitoring
2. **Contain**: Block malicious IPs, disable compromised accounts
3. **Investigate**: Analyze logs to understand scope and impact
4. **Remediate**: Fix vulnerabilities, update credentials
5. **Document**: Record incident details and response actions
6. **Review**: Conduct post-incident review and update procedures

### 3. Emergency Contacts

Maintain a list of:
- Security team contacts
- Hosting provider support
- Database administrator
- Third-party service providers

## Regular Security Maintenance

### Weekly Tasks

- Review error logs for anomalies
- Check security event logs
- Monitor rate limit violations
- Review failed authentication attempts

### Monthly Tasks

- Update dependencies (`npm audit fix`)
- Review and rotate API keys
- Audit user accounts and permissions
- Review and update security policies
- Test backup restoration

### Quarterly Tasks

- Conduct security audit
- Review and update CSP
- Penetration testing (recommended)
- Security training for team
- Disaster recovery drill

## Additional Recommendations

### 1. Web Application Firewall (WAF)

Consider using a WAF service:
- Cloudflare
- AWS WAF
- Akamai
- Imperva

### 2. DDoS Protection

Implement DDoS protection:
- Cloudflare DDoS protection
- AWS Shield
- Rate limiting at CDN level

### 3. Vulnerability Scanning

Regular scanning with:
- Snyk
- npm audit
- OWASP ZAP
- Burp Suite

### 4. Compliance

Ensure compliance with:
- GDPR (if serving EU users)
- CCPA (if serving California users)
- PCI DSS (if handling payments)
- SOC 2 (for enterprise customers)

## Resources

- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Prisma Security Guide](https://www.prisma.io/docs/guides/security)
