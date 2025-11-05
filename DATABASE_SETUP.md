# Database Setup Guide

This guide will help you set up the database for the Portfolio Platform.

## Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script:

```bash
chmod +x scripts/setup-database.sh
./scripts/setup-database.sh
```

This will:
1. Create `.env` file if it doesn't exist
2. Install dependencies
3. Generate Prisma Client
4. Create database migrations
5. Seed the database with sample data

### Option 2: Manual Setup

1. **Copy environment variables**:
   ```bash
   cp .env.example .env
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

4. **Create and apply migration**:
   ```bash
   npm run db:migrate
   ```
   When prompted, enter: `init_portfolio_schema`

5. **Seed the database**:
   ```bash
   npm run db:seed
   ```

## Database Schema

The database includes the following main entities:

### Users
- Admin and regular user accounts
- Role-based access control (USER, ADMIN)

### Projects
- Portfolio projects with rich content
- Support for images, tags, and categories
- Draft, published, and archived states

### Blog Posts
- Blog content with MDX support
- Tags and categories for organization
- SEO-friendly slugs

### Contact Inquiries
- Form submissions from visitors
- Status tracking (NEW, READ, RESPONDED, CLOSED)
- Response management

### Analytics
- User interaction tracking
- Page views and event logging
- Privacy-compliant data collection

## Sample Data

After seeding, you'll have:

- **Admin User**
  - Email: `admin@portfolio.com`
  - Role: ADMIN

- **Projects** (3 total)
  - E-Commerce Platform (Published, Featured)
  - Task Management App (Published, Featured)
  - Weather Dashboard (Draft)

- **Blog Posts** (2 total)
  - Getting Started with Next.js 15 (Published, Featured)
  - Building Accessible Web Applications (Published)

- **Contact Inquiries** (2 total)
  - Project inquiry from John Doe (NEW)
  - Speaking opportunity from Jane Smith (READ, with response)

## Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Create a new migration
npm run db:migrate

# Push schema changes (dev only, no migration)
npm run db:push

# Seed the database
npm run db:seed

# Reset database (drops all data and re-runs migrations)
npm run db:reset
```

## Environment Variables

Required variables in `.env`:

```env
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Optional variables for external services:

```env
# Email
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@yourportfolio.com"

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Social Media
GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"
```

## Troubleshooting

### "Cannot find module '@prisma/client'"

Run:
```bash
npm run db:generate
```

### "Database is locked"

Make sure no other processes are accessing the database. Stop the dev server and try again.

### Migration conflicts

If you have migration conflicts, you can reset the database:
```bash
npm run db:reset
```

**Warning**: This will delete all data!

### Seed script fails

Make sure you've run the migration first:
```bash
npm run db:migrate
npm run db:seed
```

## Next Steps

After setting up the database:

1. Review the schema in `prisma/schema.prisma`
2. Check the seed data in `prisma/seed.ts`
3. Start the development server: `npm run dev`
4. Access the application at `http://localhost:3000`

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project Requirements](.kiro/specs/portfolio-platform/requirements.md)
- [Project Design](.kiro/specs/portfolio-platform/design.md)
