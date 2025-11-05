# Email Notification System - Quick Start Guide

## 5-Minute Setup

### Step 1: Choose Your Email Provider

Pick one of these options:

#### Option A: Resend (Easiest, Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env`:
```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"
```

#### Option B: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key with "Mail Send" permission
3. Add to `.env`:
```env
SENDGRID_API_KEY="SG.xxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"
```

#### Option C: Gmail (For Testing)
1. Enable 2FA on your Google account
2. Create an [App Password](https://support.google.com/accounts/answer/185833)
3. Add to `.env`:
```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
ADMIN_EMAIL="your-email@gmail.com"
```

### Step 2: Update Database

Run the migration to add the Subscriber table:
```bash
npm run db:push
```

### Step 3: Test It!

The system is now ready. Test by:
1. Submitting a contact form → Admin receives email
2. Subscribing to newsletter → Welcome email sent
3. Publishing a project → Subscribers notified

## Common Use Cases

### Send a Newsletter (Admin)
```bash
curl -X POST http://localhost:3000/api/newsletter/send \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Monthly Update",
    "content": "<h2>What'\''s New</h2><p>Check out our latest work!</p>"
  }'
```

### Subscribe a User
```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe"
  }'
```

### Respond to Inquiry (Admin)
```bash
curl -X POST http://localhost:3000/api/contact/inquiries/INQUIRY_ID/respond \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "response": "Thank you for your inquiry. Here'\''s my response..."
  }'
```

## Email Marketing Integration (Optional)

### Mailchimp
1. Get API key: Account > Extras > API keys
2. Get List ID: Audience > Settings
3. Add to `.env`:
```env
EMAIL_MARKETING_PROVIDER="mailchimp"
MAILCHIMP_API_KEY="your-key-us21"
MAILCHIMP_LIST_ID="your-list-id"
```

### ConvertKit
1. Get API key: Settings > Advanced > API Secret
2. Get Form ID: Forms > Select Form > Settings
3. Add to `.env`:
```env
EMAIL_MARKETING_PROVIDER="convertkit"
CONVERTKIT_API_KEY="your-key"
CONVERTKIT_FORM_ID="your-form-id"
```

## Troubleshooting

### Emails not sending?
- Check `.env` file has correct API keys
- Verify EMAIL_FROM domain is verified with provider
- Check console logs for error messages

### Emails going to spam?
- Verify your domain with SPF/DKIM records
- Use a professional email address
- Include unsubscribe links (already included)

### Need help?
See full documentation in `docs/EMAIL_NOTIFICATIONS.md`

## What's Included

✅ Contact form notifications to admin
✅ Automated welcome emails for subscribers
✅ Newsletter sending to all subscribers
✅ Project/blog publication notifications
✅ Inquiry response emails
✅ Professional HTML templates
✅ Unsubscribe functionality
✅ Mailchimp/ConvertKit integration
✅ Rate limiting and security

## Next Steps

1. Configure your email provider
2. Test the contact form
3. Set up email marketing (optional)
4. Customize email templates if needed
5. Start collecting subscribers!

For detailed documentation, see `docs/EMAIL_NOTIFICATIONS.md`
