# External Service Integrations

This document provides comprehensive information about configuring and using external service integrations in the Portfolio Platform.

## Overview

The platform supports multiple external service integrations to enhance functionality:

- **GitHub**: Display repositories and contribution activity
- **Analytics**: Track visitor behavior with Google Analytics, Plausible, or Mixpanel
- **Email**: Send notifications via Resend, SendGrid, or SMTP
- **Email Marketing**: Sync subscribers with Mailchimp or ConvertKit
- **Social Media**: Display social media links and profiles

## Configuration

All integrations are configured through environment variables. See `.env.example` for a complete list.

### GitHub Integration

Display your GitHub repositories and contribution activity on your portfolio.

**Environment Variables:**
```bash
GITHUB_USERNAME="your-github-username"
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"  # Optional, increases rate limits
```

**Features:**
- Display recent repositories
- Show repository statistics (stars, forks, language)
- Display contribution activity
- Automatic caching (1 hour)

**API Endpoints:**
- `GET /api/integrations/github?action=repos&limit=6` - Get repositories
- `GET /api/integrations/github?action=profile` - Get user profile
- `GET /api/integrations/github?action=contributions` - Get contribution activity

**Components:**
```tsx
import { GitHubRepos } from '@/components/github-repos';

<GitHubRepos limit={6} />
```

**Getting a GitHub Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `public_repo` (for public repositories)
4. Copy the token and add to your `.env` file

### Analytics Integration

Track visitor behavior and portfolio performance with multiple analytics providers.

**Environment Variables:**
```bash
# Google Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="yourdomain.com"

# Mixpanel
NEXT_PUBLIC_MIXPANEL_TOKEN="your-mixpanel-token"
```

**Features:**
- Automatic page view tracking
- Custom event tracking
- Privacy-compliant (requires user consent)
- Multiple provider support (can use all simultaneously)

**Tracked Events:**
- Page views
- Project views and clicks
- Blog post views and clicks
- Contact form submissions
- Search queries
- Filter applications
- External link clicks

**Usage:**
```tsx
import { trackProjectView, trackContactFormSubmit } from '@/lib/analytics';

// Track project view
trackProjectView(projectId, projectTitle);

// Track contact form submission
trackContactFormSubmit();
```

**Privacy Compliance:**
- Users must consent to analytics tracking
- Consent banner displayed on first visit
- Preference stored in localStorage
- No tracking without consent

### Email Integration

Send email notifications for contact form submissions and other events.

**Environment Variables:**

**Option 1: Resend (Recommended)**
```bash
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
ADMIN_EMAIL="admin@yourdomain.com"
EMAIL_FROM="noreply@yourdomain.com"
```

**Option 2: SendGrid**
```bash
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxx"
ADMIN_EMAIL="admin@yourdomain.com"
EMAIL_FROM="noreply@yourdomain.com"
```

**Option 3: SMTP**
```bash
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
ADMIN_EMAIL="admin@yourdomain.com"
EMAIL_FROM="noreply@yourdomain.com"
```

**Features:**
- Contact form notifications
- Welcome emails for new users
- Inquiry response emails
- Project/blog post publication notifications
- HTML and plain text support

**Usage:**
```tsx
import { sendEmail, generateContactNotificationEmail } from '@/lib/email';

// Send contact notification
const emailOptions = generateContactNotificationEmail(inquiry);
await sendEmail(emailOptions);

// Send custom email
await sendEmail({
  to: 'user@example.com',
  subject: 'Welcome!',
  text: 'Welcome to our platform',
  html: '<h1>Welcome!</h1>',
});
```

**Setting up Resend:**
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Generate API key
4. Add to `.env` file

**Setting up SendGrid:**
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Verify sender identity
3. Generate API key
4. Add to `.env` file

### Email Marketing Integration

Sync newsletter subscribers with your email marketing platform.

**Environment Variables:**

**Mailchimp:**
```bash
EMAIL_MARKETING_PROVIDER="mailchimp"
MAILCHIMP_API_KEY="your-mailchimp-api-key"
MAILCHIMP_LIST_ID="your-list-id"
```

**ConvertKit:**
```bash
EMAIL_MARKETING_PROVIDER="convertkit"
CONVERTKIT_API_KEY="your-convertkit-api-key"
CONVERTKIT_FORM_ID="your-form-id"
```

**Features:**
- Automatic subscriber sync
- Tag support for segmentation
- Newsletter subscription API

**API Endpoint:**
- `POST /api/subscribe` - Subscribe to mailing list

**Usage:**
```tsx
import { subscribeToMailingList } from '@/lib/email';

await subscribeToMailingList(
  'user@example.com',
  'John Doe',
  ['newsletter', 'blog-updates']
);
```

**Setting up Mailchimp:**
1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Create an audience (list)
3. Get API key from Account → Extras → API keys
4. Get List ID from Audience → Settings → Audience name and defaults
5. Add to `.env` file

**Setting up ConvertKit:**
1. Sign up at [convertkit.com](https://convertkit.com)
2. Create a form
3. Get API key from Settings → Advanced → API Secret
4. Get Form ID from form settings
5. Add to `.env` file

### Social Media Integration

Display social media links and profiles on your portfolio.

**Environment Variables:**
```bash
TWITTER_USERNAME="your-twitter-handle"
TWITTER_BEARER_TOKEN="your-twitter-bearer-token"  # Optional, for profile data
LINKEDIN_PROFILE="your-linkedin-profile-id"
LINKEDIN_ACCESS_TOKEN="your-linkedin-access-token"  # Optional
INSTAGRAM_USERNAME="your-instagram-username"
```

**Features:**
- Display social media links
- Show follower counts (with API tokens)
- Automatic icon rendering

**API Endpoint:**
- `GET /api/integrations/social?action=links` - Get social links
- `GET /api/integrations/social?action=twitter&username=handle` - Get Twitter profile
- `GET /api/integrations/social?action=linkedin&profile=id` - Get LinkedIn profile

**Components:**
```tsx
import { SocialLinks } from '@/components/social-links';

<SocialLinks showFollowers={true} />
```

## Admin Dashboard

The admin dashboard provides a comprehensive integration management interface at `/admin/integrations`.

**Features:**
- View integration status
- Test connections
- See configuration warnings and errors
- Detailed setup instructions

**Accessing:**
1. Log in to admin dashboard
2. Navigate to Configuration → Integrations
3. View status and test connections

## Testing Integrations

### Via Admin Dashboard
1. Go to `/admin/integrations`
2. Click "Test Connections"
3. View results for each integration

### Via API
```bash
# Get integration status
curl -X GET http://localhost:3000/api/integrations/status?action=status

# Validate configuration
curl -X GET http://localhost:3000/api/integrations/status?action=validate

# Test connections
curl -X GET http://localhost:3000/api/integrations/status?action=test
```

### Programmatically
```tsx
import { testIntegrations, validateIntegrationConfig } from '@/lib/integrations';

// Test all integrations
const results = await testIntegrations();

// Validate configuration
const validation = validateIntegrationConfig();
```

## Troubleshooting

### GitHub Integration

**Issue:** "GitHub integration not configured"
- **Solution:** Set `GITHUB_USERNAME` environment variable

**Issue:** Rate limit exceeded
- **Solution:** Add `GITHUB_TOKEN` to increase rate limits from 60 to 5000 requests/hour

### Analytics Integration

**Issue:** Analytics not tracking
- **Solution:** Check that user has consented to analytics (consent banner)

**Issue:** Google Analytics not loading
- **Solution:** Verify `NEXT_PUBLIC_GA_ID` is set and starts with "G-"

### Email Integration

**Issue:** Emails not sending
- **Solution:** Verify email provider credentials and `ADMIN_EMAIL` is set

**Issue:** "Email service not configured"
- **Solution:** Set at least one email provider (Resend, SendGrid, or SMTP)

### Social Media Integration

**Issue:** Social links not showing
- **Solution:** Set at least one social media username environment variable

**Issue:** Follower counts not displaying
- **Solution:** Add API tokens for respective platforms

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate API keys** regularly
4. **Use read-only tokens** when possible (e.g., GitHub)
5. **Enable rate limiting** for public endpoints
6. **Validate all inputs** before sending to external APIs
7. **Handle errors gracefully** to avoid exposing sensitive information

## Rate Limits

### GitHub API
- Without token: 60 requests/hour
- With token: 5,000 requests/hour
- Cached for 1 hour in the application

### Twitter API
- Varies by plan (check Twitter Developer Portal)

### Email Services
- Resend: Varies by plan
- SendGrid: Varies by plan
- Check your provider's documentation

## Support

For integration-specific issues:
- **GitHub**: [GitHub API Documentation](https://docs.github.com/en/rest)
- **Google Analytics**: [GA4 Documentation](https://developers.google.com/analytics)
- **Plausible**: [Plausible Documentation](https://plausible.io/docs)
- **Resend**: [Resend Documentation](https://resend.com/docs)
- **SendGrid**: [SendGrid Documentation](https://docs.sendgrid.com)
- **Mailchimp**: [Mailchimp API Documentation](https://mailchimp.com/developer/)
- **ConvertKit**: [ConvertKit API Documentation](https://developers.convertkit.com)

## Future Integrations

Planned integrations for future releases:
- Stripe for payments
- Cloudinary for advanced image management
- Algolia for advanced search
- Discord webhooks for notifications
- Slack integration for team notifications
