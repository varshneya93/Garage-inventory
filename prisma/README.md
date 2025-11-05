# Database Setup

This directory contains the Prisma schema and database configuration for the Portfolio Platform.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Initial Setup

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

3. **Create and apply migrations**:
   ```bash
   npm run db:migrate
   ```
   
   When prompted, enter a migration name like: `init_portfolio_schema`

4. **Seed the database** with sample data:
   ```bash
   npm run db:seed
   ```

## Database Commands

- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Create and apply a new migration
- `npm run db:push` - Push schema changes without creating a migration (dev only)
- `npm run db:seed` - Seed the database with sample data
- `npm run db:reset` - Reset database and re-run all migrations

## Schema Overview

The database includes the following models:

### Core Models
- **User** - User accounts with role-based access (USER, ADMIN)
- **Project** - Portfolio projects with images, tags, and categories
- **BlogPost** - Blog posts with tags and categories
- **ContactInquiry** - Contact form submissions with responses
- **Analytics** - User interaction tracking

### Supporting Models
- **ProjectImage** - Images associated with projects
- **ProjectTag** - Tags for categorizing projects
- **ProjectCategory** - Categories for organizing projects
- **BlogTag** - Tags for blog posts
- **BlogCategory** - Categories for blog posts
- **ContactResponse** - Responses to contact inquiries

## Enums

- **Role**: USER, ADMIN
- **Status**: DRAFT, PUBLISHED, ARCHIVED
- **InquiryStatus**: NEW, READ, RESPONDED, CLOSED

## Sample Data

The seed script creates:
- 1 admin user (admin@portfolio.com)
- 3 sample projects (2 published, 1 draft)
- 2 blog posts
- 2 contact inquiries
- Sample analytics events

## Environment Variables

Make sure your `.env` file contains:

```env
DATABASE_URL="file:./db/custom.db"
```

## Troubleshooting

### Migration Issues

If you encounter migration issues, you can reset the database:

```bash
npm run db:reset
```

This will:
1. Drop the database
2. Re-run all migrations
3. Run the seed script

### Prisma Client Not Found

If you get "Cannot find module '@prisma/client'", run:

```bash
npm run db:generate
```

### Database Locked

If you get "database is locked" errors, make sure no other processes are accessing the database file.
