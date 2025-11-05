# Deployment Guide

This guide covers deploying the Portfolio Platform to production.

## Prerequisites

- Node.js 18+ installed
- Database (SQLite for development, PostgreSQL/MySQL recommended for production)
- Domain name configured
- SSL certificate (handled by most hosting platforms)

## Environment Configuration

1. Copy the production environment template:
   ```bash
   cp .env.production.example .env.production
   ```

2. Fill in all required environment variables:
   - `DATABASE_URL`: Your production database connection string
   - `NEXTAUTH_URL`: Your production domain URL
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - Email service credentials (Resend or SendGrid)
   - Optional: GitHub, Analytics, Social Media API keys

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications.

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

4. Configure environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.production`

5. Configure database:
   - For SQLite: Use Vercel's file system (limited)
   - Recommended: Use Vercel Postgres or external database

### Option 2: Docker

1. Build Docker image:
   ```bash
   docker build -t portfolio-platform .
   ```

2. Run container:
   ```bash
   docker run -p 3000:3000 \
     --env-file .env.production \
     portfolio-platform
   ```

3. Use Docker Compose for production:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Option 3: Traditional VPS (DigitalOcean, AWS EC2, etc.)

1. SSH into your server:
   ```bash
   ssh user@your-server-ip
   ```

2. Clone repository:
   ```bash
   git clone https://github.com/your-username/portfolio-platform.git
   cd portfolio-platform
   ```

3. Install dependencies:
   ```bash
   npm ci --production=false
   ```

4. Set up environment:
   ```bash
   cp .env.production.example .env.production
   nano .env.production  # Edit with your values
   ```

5. Run deployment script:
   ```bash
   ./scripts/deploy.sh
   ```

6. Set up process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

7. Configure Nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. Set up SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Database Migration

### For Production Database

1. Update `DATABASE_URL` in `.env.production` to your production database

2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

3. Seed initial data (optional):
   ```bash
   npm run db:seed
   ```

### Backup Strategy

Set up automated backups:

```bash
# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

Example backup script:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
# Upload to S3 or backup service
```

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test database connection
- [ ] Run health check: `npm run health-check`
- [ ] Test authentication flow
- [ ] Verify email notifications work
- [ ] Test file uploads
- [ ] Check analytics tracking
- [ ] Verify SSL certificate
- [ ] Test all critical user flows
- [ ] Monitor error logs
- [ ] Set up monitoring alerts

## Monitoring

### Application Monitoring

1. Set up error tracking (Sentry):
   ```bash
   npm install @sentry/nextjs
   ```

2. Configure in `next.config.ts`:
   ```typescript
   const { withSentryConfig } = require('@sentry/nextjs');
   
   module.exports = withSentryConfig({
     // Your Next.js config
   }, {
     // Sentry config
   });
   ```

### Performance Monitoring

Monitor these metrics:
- Response times
- Error rates
- Database query performance
- Memory usage
- CPU usage

### Log Management

Set up log aggregation:
```bash
# Using PM2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## Scaling

### Horizontal Scaling

1. Use load balancer (Nginx, AWS ALB)
2. Deploy multiple instances
3. Use shared database
4. Implement session store (Redis)

### Database Scaling

1. Enable connection pooling
2. Add read replicas
3. Implement caching (Redis)
4. Optimize queries

## Rollback Procedure

If deployment fails:

1. Revert to previous version:
   ```bash
   git revert HEAD
   npm run build
   pm2 restart portfolio
   ```

2. Restore database backup if needed:
   ```bash
   psql $DATABASE_URL < backup_YYYYMMDD_HHMMSS.sql
   ```

## Troubleshooting

### Build Fails

- Check Node.js version: `node --version`
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check database server is running
- Verify network connectivity
- Check firewall rules

### Performance Issues

- Run performance audit: `npm run audit:performance`
- Check database query performance
- Enable caching
- Optimize images
- Use CDN for static assets

## Security Checklist

- [ ] All environment variables are secure
- [ ] Database credentials are not exposed
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Input validation is in place
- [ ] File upload security is configured
- [ ] Security headers are set
- [ ] Dependencies are up to date

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Support

For deployment issues:
1. Check logs: `pm2 logs portfolio`
2. Run health check: `npm run health-check`
3. Review error tracking dashboard
4. Contact support team

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Prisma Production Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management)
- [Vercel Documentation](https://vercel.com/docs)
