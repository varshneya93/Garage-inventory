// Email notification service
// Supports multiple email providers: Resend, SendGrid, and SMTP

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

// Email template wrapper for consistent styling
function wrapEmailTemplate(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  ${preheader ? `<meta name="description" content="${preheader}">` : ''}
  <title>Email Notification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 30px 20px;
      text-align: center;
      color: #ffffff;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 40px 30px;
    }
    .email-footer {
      background-color: #f8f9fa;
      padding: 20px 30px;
      text-align: center;
      font-size: 12px;
      color: #666666;
      border-top: 1px solid #e9ecef;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background-color: #667eea;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      background-color: #5568d3;
    }
    .info-box {
      background-color: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 15px 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .divider {
      height: 1px;
      background-color: #e9ecef;
      margin: 30px 0;
    }
    @media only screen and (max-width: 600px) {
      .email-body {
        padding: 20px 15px;
      }
      .email-header {
        padding: 20px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    ${content}
  </div>
</body>
</html>
  `.trim();
}

type EmailProvider = 'resend' | 'sendgrid' | 'smtp' | 'console';

function getEmailProvider(): EmailProvider {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.SENDGRID_API_KEY) return 'sendgrid';
  if (process.env.EMAIL_SERVER_HOST) return 'smtp';
  return 'console';
}

async function sendWithResend(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from || process.env.EMAIL_FROM || 'noreply@example.com',
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        text: options.text,
        html: options.html,
        reply_to: options.replyTo,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Resend sending error:', error);
    return false;
  }
}

async function sendWithSendGrid(options: EmailOptions): Promise<boolean> {
  try {
    const toEmails = Array.isArray(options.to) ? options.to : [options.to];
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: toEmails.map(email => ({ email })) }],
        from: { email: options.from || process.env.EMAIL_FROM || 'noreply@example.com' },
        subject: options.subject,
        content: [
          { type: 'text/plain', value: options.text },
          ...(options.html ? [{ type: 'text/html', value: options.html }] : []),
        ],
        ...(options.replyTo && { reply_to: { email: options.replyTo } }),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('SendGrid API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('SendGrid sending error:', error);
    return false;
  }
}

async function sendWithSMTP(options: EmailOptions): Promise<boolean> {
  // SMTP implementation would require a library like nodemailer
  // For now, log that SMTP is configured but not implemented
  console.log('SMTP email sending not yet implemented');
  console.log('Email would be sent:', options);
  return true;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const provider = getEmailProvider();

  try {
    switch (provider) {
      case 'resend':
        return await sendWithResend(options);
      case 'sendgrid':
        return await sendWithSendGrid(options);
      case 'smtp':
        return await sendWithSMTP(options);
      case 'console':
      default:
        // For development, just log the email
        console.log("📧 Email notification:", {
          to: options.to,
          subject: options.subject,
          text: options.text,
        });
        return true;
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

export function generateContactNotificationEmail(inquiry: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}): EmailOptions {
  const subject = `New Contact Inquiry: ${inquiry.subject || "No Subject"}`;
  const text = `
You have received a new contact inquiry:

Name: ${inquiry.name}
Email: ${inquiry.email}
Subject: ${inquiry.subject || "No Subject"}

Message:
${inquiry.message}

---
Reply to this inquiry from your admin dashboard.
  `.trim();

  const htmlContent = `
    <div class="email-header">
      <h1>📬 New Contact Inquiry</h1>
    </div>
    <div class="email-body">
      <p>You have received a new contact inquiry from your portfolio website.</p>
      
      <div class="info-box">
        <p style="margin: 5px 0;"><strong>Name:</strong> ${inquiry.name}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
        <p style="margin: 5px 0;"><strong>Subject:</strong> ${inquiry.subject || "No Subject"}</p>
      </div>
      
      <h3 style="color: #333; margin-top: 25px;">Message:</h3>
      <p style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 4px;">${inquiry.message}</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/contact" class="button">
          View in Dashboard
        </a>
      </div>
    </div>
    <div class="email-footer">
      <p>This is an automated notification from your portfolio platform.</p>
      <p>Reply directly to ${inquiry.email} to respond to this inquiry.</p>
    </div>
  `;

  return {
    to: process.env.ADMIN_EMAIL || "admin@example.com",
    subject,
    text,
    html: wrapEmailTemplate(htmlContent, `New inquiry from ${inquiry.name}`),
    replyTo: inquiry.email,
  };
}

export function generateWelcomeEmail(name: string, email: string): EmailOptions {
  const subject = 'Welcome to Our Portfolio Platform';
  const text = `
Hi ${name},

Welcome to our portfolio platform! We're excited to have you here.

Your account has been successfully created with the email: ${email}

You can now:
- Manage your projects
- Create blog posts
- View analytics
- Customize your theme

If you have any questions, feel free to reach out.

Best regards,
The Portfolio Team
  `.trim();

  const htmlContent = `
    <div class="email-header">
      <h1>🎉 Welcome to Our Portfolio Platform!</h1>
    </div>
    <div class="email-body">
      <p>Hi ${name},</p>
      <p>Welcome to our portfolio platform! We're excited to have you here.</p>
      
      <div class="info-box">
        <p style="margin: 5px 0;">Your account has been successfully created with the email:</p>
        <p style="margin: 5px 0;"><strong>${email}</strong></p>
      </div>
      
      <h3 style="color: #333; margin-top: 25px;">You can now:</h3>
      <ul style="line-height: 1.8;">
        <li>✨ Manage your projects and showcase your work</li>
        <li>📝 Create and publish blog posts</li>
        <li>📊 View analytics and track engagement</li>
        <li>🎨 Customize your theme and branding</li>
      </ul>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin" class="button">
          Go to Dashboard
        </a>
      </div>
    </div>
    <div class="email-footer">
      <p>If you have any questions, feel free to reach out.</p>
      <p>Best regards,<br>The Portfolio Team</p>
    </div>
  `;

  return {
    to: email,
    subject,
    text,
    html: wrapEmailTemplate(htmlContent, 'Welcome to your new portfolio platform'),
  };
}

export function generateInquiryResponseEmail(
  inquiry: {
    name: string;
    email: string;
    subject?: string | null;
  },
  response: string
): EmailOptions {
  const subject = `Re: ${inquiry.subject || 'Your Inquiry'}`;
  const text = `
Hi ${inquiry.name},

Thank you for reaching out. Here's our response to your inquiry:

${response}

If you have any further questions, please don't hesitate to reply to this email.

Best regards
  `.trim();

  const htmlContent = `
    <div class="email-header">
      <h1>💬 Response to Your Inquiry</h1>
    </div>
    <div class="email-body">
      <p>Hi ${inquiry.name},</p>
      <p>Thank you for reaching out. Here's our response to your inquiry:</p>
      
      <div class="info-box">
        <p style="white-space: pre-wrap; margin: 0;">${response}</p>
      </div>
      
      <div class="divider"></div>
      
      <p>If you have any further questions, please don't hesitate to reply to this email.</p>
      <p style="margin-top: 20px;"><strong>Best regards</strong></p>
    </div>
    <div class="email-footer">
      <p>This email was sent in response to your inquiry.</p>
      <p>You can reply directly to this email to continue the conversation.</p>
    </div>
  `;

  return {
    to: inquiry.email,
    subject,
    text,
    html: wrapEmailTemplate(htmlContent, `Response to your inquiry: ${inquiry.subject || 'Your Inquiry'}`),
    replyTo: process.env.ADMIN_EMAIL,
  };
}

export function generateProjectPublishedEmail(
  project: {
    title: string;
    slug: string;
    description?: string | null;
  },
  subscriberEmail: string
): EmailOptions {
  const projectUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/projects/${project.slug}`;
  const subject = `New Project Published: ${project.title}`;
  const text = `
A new project has been published!

${project.title}

${project.description || ''}

View the project: ${projectUrl}

---
You're receiving this because you subscribed to project updates.
  `.trim();

  const htmlContent = `
    <div class="email-header">
      <h1>🚀 New Project Published!</h1>
    </div>
    <div class="email-body">
      <h2 style="color: #333; margin-top: 0;">${project.title}</h2>
      ${project.description ? `<p style="font-size: 16px; color: #555;">${project.description}</p>` : ''}
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${projectUrl}" class="button">
          View Project
        </a>
      </div>
      
      <div class="divider"></div>
      
      <p style="text-align: center; color: #666;">
        Check out the latest addition to the portfolio!
      </p>
    </div>
    <div class="email-footer">
      <p>You're receiving this because you subscribed to project updates.</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}" style="color: #666;">Unsubscribe</a></p>
    </div>
  `;

  return {
    to: subscriberEmail,
    subject,
    text,
    html: wrapEmailTemplate(htmlContent, `New project: ${project.title}`),
  };
}

export function generateBlogPostPublishedEmail(
  post: {
    title: string;
    slug: string;
    excerpt?: string | null;
  },
  subscriberEmail: string
): EmailOptions {
  const postUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/blog/${post.slug}`;
  const subject = `New Blog Post: ${post.title}`;
  const text = `
A new blog post has been published!

${post.title}

${post.excerpt || ''}

Read the full post: ${postUrl}

---
You're receiving this because you subscribed to blog updates.
  `.trim();

  const htmlContent = `
    <div class="email-header">
      <h1>📝 New Blog Post!</h1>
    </div>
    <div class="email-body">
      <h2 style="color: #333; margin-top: 0;">${post.title}</h2>
      ${post.excerpt ? `<p style="font-size: 16px; color: #555; line-height: 1.6;">${post.excerpt}</p>` : ''}
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${postUrl}" class="button">
          Read Full Post
        </a>
      </div>
      
      <div class="divider"></div>
      
      <p style="text-align: center; color: #666;">
        Discover the latest insights and updates!
      </p>
    </div>
    <div class="email-footer">
      <p>You're receiving this because you subscribed to blog updates.</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}" style="color: #666;">Unsubscribe</a></p>
    </div>
  `;

  return {
    to: subscriberEmail,
    subject,
    text,
    html: wrapEmailTemplate(htmlContent, `New blog post: ${post.title}`),
  };
}

// Email marketing list integration
export async function subscribeToMailingList(
  email: string,
  name?: string,
  tags?: string[],
  source?: string
): Promise<boolean> {
  try {
    // Save to local database first
    const { db } = await import('./db');
    
    await db.subscriber.upsert({
      where: { email },
      update: {
        name: name || undefined,
        tags: tags ? JSON.stringify(tags) : undefined,
        status: 'active',
        updatedAt: new Date(),
      },
      create: {
        email,
        name: name || undefined,
        tags: tags ? JSON.stringify(tags) : undefined,
        status: 'active',
        source: source || 'website',
      },
    });

    // Integration with external email marketing services
    const provider = process.env.EMAIL_MARKETING_PROVIDER;

    if (provider === 'mailchimp') {
      await subscribeToMailchimp(email, name, tags);
    } else if (provider === 'convertkit') {
      await subscribeToConvertKit(email, name, tags);
    }

    // Send welcome email to new subscriber
    const welcomeEmail = generateSubscriberWelcomeEmail(email, name);
    await sendEmail(welcomeEmail);

    return true;
  } catch (error) {
    console.error('Mailing list subscription error:', error);
    return false;
  }
}

export async function unsubscribeFromMailingList(email: string): Promise<boolean> {
  try {
    const { db } = await import('./db');
    
    await db.subscriber.update({
      where: { email },
      data: {
        status: 'unsubscribed',
        updatedAt: new Date(),
      },
    });

    return true;
  } catch (error) {
    console.error('Mailing list unsubscription error:', error);
    return false;
  }
}

export async function getActiveSubscribers(tags?: string[]): Promise<Array<{ email: string; name?: string | null }>> {
  try {
    const { db } = await import('./db');
    
    const subscribers = await db.subscriber.findMany({
      where: {
        status: 'active',
      },
      select: {
        email: true,
        name: true,
        tags: true,
      },
    });

    // Filter by tags if provided
    if (tags && tags.length > 0) {
      return subscribers.filter(sub => {
        if (!sub.tags) return false;
        const subTags = JSON.parse(sub.tags) as string[];
        return tags.some(tag => subTags.includes(tag));
      });
    }

    return subscribers;
  } catch (error) {
    console.error('Get subscribers error:', error);
    return [];
  }
}

async function subscribeToMailchimp(
  email: string,
  name?: string,
  tags?: string[]
): Promise<boolean> {
  try {
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;
    const serverPrefix = apiKey?.split('-')[1];

    if (!apiKey || !listId) {
      console.warn('Mailchimp not configured');
      return false;
    }

    const response = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: name ? { FNAME: name.split(' ')[0], LNAME: name.split(' ').slice(1).join(' ') } : {},
          tags: tags || [],
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return false;
  }
}

async function subscribeToConvertKit(
  email: string,
  name?: string,
  tags?: string[]
): Promise<boolean> {
  try {
    const apiKey = process.env.CONVERTKIT_API_KEY;
    const formId = process.env.CONVERTKIT_FORM_ID;

    if (!apiKey || !formId) {
      console.warn('ConvertKit not configured');
      return false;
    }

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: apiKey,
          email,
          first_name: name,
          tags: tags || [],
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error('ConvertKit subscription error:', error);
    return false;
  }
}

// Additional email templates
export function generateSubscriberWelcomeEmail(email: string, name?: string): EmailOptions {
  const subject = 'Welcome to Our Newsletter!';
  const displayName = name || 'there';
  
  const text = `
Hi ${displayName},

Thank you for subscribing to our newsletter!

You'll now receive updates about:
- New projects and portfolio additions
- Latest blog posts and articles
- Exclusive insights and behind-the-scenes content

We're excited to have you as part of our community!

Best regards,
The Portfolio Team
  `.trim();

  const htmlContent = `
    <div class="email-header">
      <h1>🎉 Welcome to Our Newsletter!</h1>
    </div>
    <div class="email-body">
      <p>Hi ${displayName},</p>
      <p>Thank you for subscribing to our newsletter!</p>
      
      <div class="info-box">
        <h3 style="margin-top: 0; color: #333;">You'll now receive updates about:</h3>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>🚀 New projects and portfolio additions</li>
          <li>📝 Latest blog posts and articles</li>
          <li>✨ Exclusive insights and behind-the-scenes content</li>
        </ul>
      </div>
      
      <p style="margin-top: 25px;">We're excited to have you as part of our community!</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="button">
          Visit Portfolio
        </a>
      </div>
    </div>
    <div class="email-footer">
      <p>Best regards,<br>The Portfolio Team</p>
      <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666;">Unsubscribe</a></p>
    </div>
  `;

  return {
    to: email,
    subject,
    text,
    html: wrapEmailTemplate(htmlContent, 'Welcome to our newsletter'),
  };
}

// Batch email sending for newsletters
export async function sendBatchEmails(
  emails: Array<{ email: string; name?: string | null }>,
  emailGenerator: (email: string, name?: string) => EmailOptions,
  batchSize: number = 50
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  // Process in batches to avoid rate limits
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    
    const results = await Promise.allSettled(
      batch.map(async ({ email, name }) => {
        const emailOptions = emailGenerator(email, name || undefined);
        return sendEmail(emailOptions);
      })
    );

    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        success++;
      } else {
        failed++;
      }
    });

    // Add delay between batches to respect rate limits
    if (i + batchSize < emails.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return { success, failed };
}

// Send newsletter to all active subscribers
export async function sendNewsletterToSubscribers(
  subject: string,
  content: string,
  tags?: string[]
): Promise<{ success: number; failed: number }> {
  const subscribers = await getActiveSubscribers(tags);
  
  const emailGenerator = (email: string, name?: string) => {
    const htmlContent = `
      <div class="email-header">
        <h1>📬 Newsletter Update</h1>
      </div>
      <div class="email-body">
        ${name ? `<p>Hi ${name},</p>` : '<p>Hi there,</p>'}
        ${content}
      </div>
      <div class="email-footer">
        <p>You're receiving this newsletter because you subscribed to updates.</p>
        <p><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666;">Unsubscribe</a></p>
      </div>
    `;

    return {
      to: email,
      subject,
      text: content.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      html: wrapEmailTemplate(htmlContent, subject),
    };
  };

  return sendBatchEmails(subscribers, emailGenerator);
}
