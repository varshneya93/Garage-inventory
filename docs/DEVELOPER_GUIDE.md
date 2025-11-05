# Developer Guide

This guide provides technical documentation for developers working on or extending the Portfolio Platform.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Development Setup](#development-setup)
4. [Database Schema](#database-schema)
5. [API Reference](#api-reference)
6. [Component Library](#component-library)
7. [State Management](#state-management)
8. [Authentication](#authentication)
9. [Testing](#testing)
10. [Performance Optimization](#performance-optimization)
11. [Deployment](#deployment)
12. [Contributing](#contributing)

## Architecture Overview

The Portfolio Platform is built with:

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                         │
│  (React Components, Next.js App Router, Tailwind CSS)   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                      API Layer                           │
│        (Next.js API Routes, Middleware, Validation)      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Business Logic                         │
│     (Services, Utilities, Integration Handlers)          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                           │
│              (Prisma ORM, Database)                      │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
portfolio-platform/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public)/          # Public routes
│   │   ├── admin/             # Admin dashboard routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── admin/            # Admin-specific components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Shared components
│   ├── lib/                   # Utilities and helpers
│   │   ├── auth.ts           # Authentication config
│   │   ├── db.ts             # Database client
│   │   ├── validation.ts     # Zod schemas
│   │   └── ...
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── middleware.ts          # Next.js middleware
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── public/                    # Static assets
├── tests/                     # Test files
├── docs/                      # Documentation
└── scripts/                   # Build and deployment scripts
```

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/portfolio-platform.git
   cd portfolio-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Initialize database:
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

6. Open http://localhost:3000

### Development Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests:
   ```bash
   npm test
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Commit changes:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

6. Push and create pull request

## Database Schema

### Core Models

#### User
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  settings  Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Project
```prisma
model Project {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  description String?
  content     String?
  status      Status    @default(DRAFT)
  featured    Boolean   @default(false)
  publishedAt DateTime?
  userId      String
  user        User      @relation(fields: [userId], references: [id])
}
```

### Database Operations

#### Creating Records
```typescript
const project = await prisma.project.create({
  data: {
    title: 'New Project',
    slug: 'new-project',
    userId: user.id,
    status: 'PUBLISHED'
  }
});
```

#### Querying Records
```typescript
const projects = await prisma.project.findMany({
  where: { status: 'PUBLISHED' },
  include: { images: true, tags: true },
  orderBy: { createdAt: 'desc' }
});
```

#### Updating Records
```typescript
const updated = await prisma.project.update({
  where: { id: projectId },
  data: { status: 'PUBLISHED' }
});
```

#### Deleting Records
```typescript
await prisma.project.delete({
  where: { id: projectId }
});
```

## API Reference

### Authentication

All admin API routes require authentication. Include session token in requests.

### Projects API

#### GET /api/projects
Get all projects (public: published only, admin: all)

**Query Parameters:**
- `status`: Filter by status (DRAFT, PUBLISHED, ARCHIVED)
- `featured`: Filter featured projects
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Response:**
```json
{
  "projects": [...],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

#### POST /api/projects
Create new project (admin only)

**Request Body:**
```json
{
  "title": "Project Title",
  "description": "Short description",
  "content": "Full content",
  "status": "DRAFT",
  "featured": false
}
```

#### PUT /api/projects/[id]
Update project (admin only)

#### DELETE /api/projects/[id]
Delete project (admin only)

### Blog API

Similar structure to Projects API.

### Contact API

#### POST /api/contact
Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Message content"
}
```

### Analytics API

#### POST /api/analytics/track
Track analytics event

**Request Body:**
```json
{
  "event": "page_view",
  "page": "/projects",
  "data": {}
}
```

#### GET /api/analytics/stats
Get analytics statistics (admin only)

## Component Library

### UI Components (shadcn/ui)

All UI components are in `src/components/ui/`:

- Button
- Input
- Card
- Dialog
- Form
- Table
- Toast
- And more...

### Custom Components

#### ProjectCard
```typescript
import { ProjectCard } from '@/components/project-card';

<ProjectCard
  project={project}
  onClick={() => handleClick(project.id)}
/>
```

#### BlogPost
```typescript
import { BlogPost } from '@/components/blog-post';

<BlogPost
  post={post}
  showExcerpt={true}
/>
```

### Creating New Components

1. Create component file:
   ```typescript
   // src/components/my-component.tsx
   export function MyComponent({ prop }: MyComponentProps) {
     return <div>{prop}</div>;
   }
   ```

2. Add TypeScript types:
   ```typescript
   interface MyComponentProps {
     prop: string;
   }
   ```

3. Export from index (if needed):
   ```typescript
   export { MyComponent } from './my-component';
   ```

## State Management

### Zustand Stores

#### Example Store
```typescript
// src/stores/project-store.ts
import { create } from 'zustand';

interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  }))
}));
```

#### Using Stores
```typescript
import { useProjectStore } from '@/stores/project-store';

function MyComponent() {
  const { projects, addProject } = useProjectStore();
  
  return <div>{projects.length} projects</div>;
}
```

## Authentication

### NextAuth Configuration

Configuration in `src/lib/auth.ts`:

```typescript
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Configuration
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // JWT callback
    },
    session: async ({ session, token }) => {
      // Session callback
    }
  }
};
```

### Protecting Routes

#### API Routes
```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Handle request
}
```

#### Pages
```typescript
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/api/auth/signin');
  }
  
  return <div>Admin Content</div>;
}
```

## Testing

### Unit Tests

```typescript
// tests/unit/utils.test.ts
import { describe, test, expect } from '@jest/globals';
import { slugify } from '@/lib/utils';

describe('slugify', () => {
  test('converts string to slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
});
```

### Integration Tests

```typescript
// tests/integration/api.test.ts
import { describe, test, expect } from '@jest/globals';

describe('Projects API', () => {
  test('GET /api/projects returns projects', async () => {
    const response = await fetch('http://localhost:3000/api/projects');
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data.projects)).toBe(true);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run integration tests
npm run test:integration
```

## Performance Optimization

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}
  loading="lazy"
/>
```

### Code Splitting

Use dynamic imports:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
```

### Caching

Implement caching strategies:

```typescript
// API route with caching
export async function GET(request: Request) {
  const data = await fetchData();
  
  return new Response(JSON.stringify(data), {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
```

### Database Optimization

```typescript
// Use select to limit fields
const projects = await prisma.project.findMany({
  select: {
    id: true,
    title: true,
    slug: true
  }
});

// Use pagination
const projects = await prisma.project.findMany({
  skip: (page - 1) * limit,
  take: limit
});
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

```bash
# Run deployment script
./scripts/deploy.sh

# Or manually
npm run build
npm run start
```

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Commit Convention

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Tests
- `chore:` Maintenance

### Pull Request Process

1. Create feature branch
2. Make changes
3. Write/update tests
4. Update documentation
5. Submit PR with description
6. Address review comments
7. Merge when approved

## Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Reset database
npm run db:reset
npm run db:push
npm run db:seed
```

**Build Errors**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**Type Errors**
```bash
# Regenerate Prisma client
npm run db:generate
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Support

For questions or issues:
- GitHub Issues: [repository-url]/issues
- Email: dev@your-domain.com
- Discord: [discord-invite-link]
