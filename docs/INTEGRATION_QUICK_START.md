# Integration Quick Start Guide

This guide helps you quickly set up external service integrations for your portfolio platform.

## Prerequisites

- Admin access to the portfolio platform
- Access to external service accounts (GitHub, email provider, etc.)

## Quick Setup Steps

### 1. GitHub Integration (5 minutes)

**What you get:** Display your repositories on your portfolio

1. Add to `.env`:
   ```bash
   GITHUB_USERNAME="your-username"
   GITHUB_TOKEN="ghp_xxxx"  # Optional but recommended
   ```

2. Get GitHub token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Select scope: `public_repo`
   - Copy token to `.env`

3. Use in your pages:
   ```tsx
   import { GitHubRepos } from '@/components/github-repos';
   
   <GitHubRepos limit={6} />
   ```

### 2. Email Notifications (10 minutes)

**What you get:** Receive contact form submissions via email

**Option A: Resend (Recommended)**

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Generate API key
4. Add to `.env`:
   ```bash
   RESEND_API_KEY="re_xxxx"
   ADMIN_EMAIL="your@email.com"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

**Option B: SendGrid**

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify sender identity
3. Generate API key
4. Add to `.env`:
   ```bash
   SENDGRID_API_KEY="SG.xxxx"
   ADMIN_EMAIL="your@email.com"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

### 3. Analytics (5 minutes)

**What you get:** Track visitor behavior and portfolio performance

**Option A: Google Analytics**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (starts with G-)
3. Add to `.env`:
   ```bash
   NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
   ```

**Option B: Plausible (Privacy-focused)**

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Add to `.env`:
   ```bash
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"
   ```

### 4. Social Media Links (2 minutes)

**What you get:** Display social media icons with links

Add to `.env`:
```bash
TWITTER_USERNAME="your-handle"
LINKEDIN_PROFILE="your-profile-id"
INSTAGRAM_USERNAME="your-username"
```

Use in your pages:
```tsx
import { SocialLinks } from '@/components/social-links';

<SocialLinks />
```

### 5. Email Marketing (Optional, 10 minutes)

**What you get:** Sync newsletter subscribers to your email list

**Option A: Mailchimp**

1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Create an audience
3. Get API key: Account → Extras → API keys
4. Get List ID: Audience → Settings → Audience name and defaults
5. Add to `.env`:
   ```bash
   EMAIL_MARKETING_PROVIDER="mailchimp"
   MAILCHIMP_API_KEY="xxxx"
   MAILCHIMP_LIST_ID="xxxx"
   ```

**Option B: ConvertKit**

1. Sign up at [convertkit.com](https://convertkit.com)
2. Create a form
3. Get API key: Settings → Advanced → API Secret
4. Get Form ID from form settings
5. Add to `.env`:
   ```bash
   EMAIL_MARKETING_PROVIDER="convertkit"
   CONVERTKIT_API_KEY="xxxx"
   CONVERTKIT_FORM_ID="xxxx"
   ```

## Verify Setup

### Via Admin Dashboard

1. Log in to admin dashboard
2. Go to Configuration → Integrations (`/admin/integrations`)
3. Click "Test Connections"
4. Verify all integrations show green checkmarks

### Via Command Line

```bash
# Check integration status
curl http://localhost:3000/api/integrations/status?action=validate
```

## Common Issues

### GitHub: "Rate limit exceeded"
- **Solution:** Add `GITHUB_TOKEN` to increase limits from 60 to 5,000 requests/hour

### Email: "Emails not sending"
- **Solution:** Verify `ADMIN_EMAIL` is set and email provider credentials are correct

### Analytics: "Not tracking"
- **Solution:** Users must consent to analytics. Check consent banner is showing.

### Social: "Links not showing"
- **Solution:** Set at least one social media username in `.env`

## Environment Variables Checklist

Copy this to your `.env` file and fill in the values:

```bash
# Required for basic functionality
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Email (Required - choose one)
ADMIN_EMAIL="your@email.com"
EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="re_xxxx"
# OR
# SENDGRID_API_KEY="SG.xxxx"

# GitHub (Optional but recommended)
GITHUB_USERNAME="your-username"
GITHUB_TOKEN="ghp_xxxx"

# Analytics (Optional but recommended)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
# OR
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"

# Social Media (Optional)
TWITTER_USERNAME="your-handle"
LINKEDIN_PROFILE="your-profile-id"
INSTAGRAM_USERNAME="your-username"

# Email Marketing (Optional)
EMAIL_MARKETING_PROVIDER="mailchimp"
MAILCHIMP_API_KEY="xxxx"
MAILCHIMP_LIST_ID="xxxx"
```

## Next Steps

1. ✅ Set up required integrations (Email)
2. ✅ Set up recommended integrations (GitHub, Analytics)
3. ✅ Test all integrations via admin dashboard
4. ✅ Add components to your pages
5. ✅ Monitor integration status regularly

## Support

- Full documentation: `docs/INTEGRATIONS.md`
- Admin dashboard: `/admin/integrations`
- API documentation: See `docs/INTEGRATIONS.md`

## Security Reminders

- ⚠️ Never commit `.env` file to version control
- ⚠️ Use environment variables for all API keys
- ⚠️ Rotate API keys regularly
- ⚠️ Use read-only tokens when possible
