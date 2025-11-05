# Email Notification System

This document describes the email notification system implemented in the portfolio platform.

## Overview

The email notification system provides comprehensive email functionality including:
- Contact form notifications
- Inquiry response emails
- Newsletter subscriptions
- Welcome emails for new subscribers
- Project and blog post publication notifications
- Integration with external email marketing services

## Email Providers

The system supports multiple email providers. Configure one of the following:

### 1. Resend (Recommended)

Resend is a modern email API with excellent deliverability and developer experience.

**Setup:**
1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add to `.env`:
```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"
```

**Features:**
- Simple API
- Excellent deliverability
- Built-in analytics
- Generous free tier

### 2. SendGrid

SendGrid is a robust email service with advanced features.

**Setup:**
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Add to `.env`:
```env
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"
```

### 3. SMTP

Use any SMTP server (Gmail, Outlook, custom server).

**Setup:**
```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
ADMIN_EMAIL="admin@yourdomain.com"
```

**Note:** For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833).

## Email Templates

The system includes professionally designed email templates for:

### 1. Contact Form Notifications
Sent to admin when someone submits the contact form.
- Includes sender details
- Full message content
- Direct link to admin dashboard
- Reply-to set to sender's email

### 2. Inquiry Response Emails
Sent to users when admin responds to their inquiry.
- Professional formatting
- Includes admin's response
- Reply-to set to admin email

### 3. Welcome Emails
Sent to new newsletter subscribers.
- Friendly welcome message
- Overview of what they'll receive
- Link to portfolio
- Unsubscribe option

### 4. Project Publication Notifications
Sent to subscribers when a new project is published.
- Project title and description
- Direct link to project
- Unsubscribe option

### 5. Blog Post Notifications
Sent to subscribers when a new blog post is published.
- Post title and excerpt
- Direct link to post
- Unsubscribe option

## Email Marketing Integration

The system can integrate with external email marketing services to sync subscribers.

### Mailchimp Integration

**Setup:**
1. Sign up at [mailchimp.com](https://mailchimp.com)
2. Get your API key: Account > Extras > API keys
3. Get your List ID: Audience > Settings > Audience name and defaults
4. Add to `.env`:
```env
EMAIL_MARKETING_PROVIDER="mailchimp"
MAILCHIMP_API_KEY="your-api-key-us21"
MAILCHIMP_LIST_ID="your-list-id"
```

**Features:**
- Automatic subscriber sync
- Tag support
- Segmentation
- Advanced analytics

### ConvertKit Integration

**Setup:**
1. Sign up at [convertkit.com](https://convertkit.com)
2. Get your API key: Settings > Advanced > API Secret
3. Get your Form ID: Forms > Select Form > Settings
4. Add to `.env`:
```env
EMAIL_MARKETING_PROVIDER="convertkit"
CONVERTKIT_API_KEY="your-api-key"
CONVERTKIT_FORM_ID="your-form-id"
```

**Features:**
- Creator-focused features
- Automation workflows
- Landing pages
- Tag-based segmentation

## API Endpoints

### Subscribe to Newsletter
```http
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "tags": ["blog", "projects"],
  "source": "homepage"
}
```

### Unsubscribe
```http
POST /api/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

Or via GET (for email links):
```
GET /api/unsubscribe?email=user@example.com
```

### Send Inquiry Response (Admin Only)
```http
POST /api/contact/inquiries/{id}/respond
Authorization: Bearer {token}
Content-Type: application/json

{
  "response": "Thank you for your inquiry..."
}
```

### Send Newsletter (Admin Only)
```http
POST /api/newsletter/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "subject": "Monthly Update",
  "content": "<h2>What's New</h2><p>...</p>",
  "tags": ["blog"]
}
```

### List Subscribers (Admin Only)
```http
GET /api/subscribers?status=active&page=1&limit=20
Authorization: Bearer {token}
```

## Database Schema

### Subscriber Model
```prisma
model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  tags      String?  // JSON array
  status    String   @default("active") // active, unsubscribed
  source    String?  // Where they subscribed from
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Usage Examples

### Sending a Contact Notification
```typescript
import { sendEmail, generateContactNotificationEmail } from '@/lib/email';

const inquiry = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Project Inquiry",
  message: "I'd like to discuss a project..."
};

const emailOptions = generateContactNotificationEmail(inquiry);
await sendEmail(emailOptions);
```

### Sending a Newsletter
```typescript
import { sendNewsletterToSubscribers } from '@/lib/email';

const result = await sendNewsletterToSubscribers(
  "Monthly Update - October 2025",
  "<h2>What's New</h2><p>Check out our latest projects...</p>",
  ["blog", "projects"] // Optional: filter by tags
);

console.log(`Sent to ${result.success} subscribers, ${result.failed} failed`);
```

### Subscribing a User
```typescript
import { subscribeToMailingList } from '@/lib/email';

await subscribeToMailingList(
  "user@example.com",
  "Jane Smith",
  ["blog", "projects"],
  "footer-form"
);
```

## Email Template Customization

All email templates use a consistent wrapper with professional styling. The templates are responsive and work across all major email clients.

### Template Structure
- Header with gradient background
- Body with content
- Footer with unsubscribe link
- Responsive design for mobile devices

### Customizing Templates

Edit the email generation functions in `src/lib/email.ts`:

```typescript
export function generateCustomEmail(data: any): EmailOptions {
  const htmlContent = `
    <div class="email-header">
      <h1>Your Custom Header</h1>
    </div>
    <div class="email-body">
      <p>Your content here...</p>
    </div>
    <div class="email-footer">
      <p>Footer content...</p>
    </div>
  `;

  return {
    to: data.email,
    subject: "Your Subject",
    text: "Plain text version",
    html: wrapEmailTemplate(htmlContent, "Preheader text"),
  };
}
```

## Best Practices

1. **Always provide plain text versions** - Some email clients don't support HTML
2. **Include unsubscribe links** - Required by law in many jurisdictions
3. **Use preheader text** - Improves open rates
4. **Test emails** - Send test emails before bulk sending
5. **Monitor deliverability** - Check spam scores and bounce rates
6. **Respect rate limits** - The system batches emails to avoid rate limits
7. **Handle failures gracefully** - Log errors and retry failed sends

## Troubleshooting

### Emails Not Sending

1. Check environment variables are set correctly
2. Verify API keys are valid
3. Check console logs for error messages
4. Ensure EMAIL_FROM domain is verified with your provider

### Emails Going to Spam

1. Verify your sending domain with SPF/DKIM records
2. Use a professional email address (not @gmail.com)
3. Avoid spam trigger words in subject lines
4. Include unsubscribe links
5. Maintain good sender reputation

### Subscriber Not Receiving Emails

1. Check subscriber status is "active"
2. Verify email address is correct
3. Check if email is in spam folder
4. Ensure external email marketing service is synced

## Rate Limits

The system implements batch sending to respect rate limits:
- Default batch size: 50 emails
- Delay between batches: 1 second
- Configurable in `sendBatchEmails()` function

## Security Considerations

1. **API Keys** - Never commit API keys to version control
2. **Email Validation** - All email addresses are validated
3. **Rate Limiting** - Contact form has rate limiting
4. **Unsubscribe** - Users can always unsubscribe
5. **Data Privacy** - Subscriber data is stored securely

## Migration Guide

To enable the email notification system on an existing installation:

1. Update Prisma schema with Subscriber model
2. Run database migration:
```bash
npm run db:push
```

3. Configure email provider in `.env`
4. Test email sending:
```bash
# Send a test email from admin dashboard
```

5. (Optional) Configure email marketing integration

## Support

For issues or questions:
- Check the [troubleshooting section](#troubleshooting)
- Review API documentation
- Check provider-specific documentation
- Contact support

## Future Enhancements

Potential improvements for future versions:
- Email scheduling
- A/B testing for newsletters
- Advanced segmentation
- Email analytics dashboard
- Template builder UI
- Automated drip campaigns
