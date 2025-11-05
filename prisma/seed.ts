import { PrismaClient, Role, Status, InquiryStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      name: 'Admin User',
      role: Role.ADMIN,
      settings: JSON.stringify({
        theme: 'dark',
        notifications: true,
      }),
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      description: 'A full-stack e-commerce platform with payment integration',
      content: `# E-Commerce Platform

A comprehensive e-commerce solution built with modern technologies.

## Features
- Product catalog with search and filtering
- Shopping cart and checkout flow
- Payment integration with Stripe
- Order management system
- Admin dashboard

## Technologies
- Next.js 15
- TypeScript
- Prisma
- Tailwind CSS
- Stripe API`,
      status: Status.PUBLISHED,
      featured: true,
      sortOrder: 1,
      publishedAt: new Date(),
      userId: adminUser.id,
      images: {
        create: [
          {
            url: '/images/projects/ecommerce-1.jpg',
            alt: 'E-commerce homepage',
            sortOrder: 1,
          },
          {
            url: '/images/projects/ecommerce-2.jpg',
            alt: 'Product detail page',
            sortOrder: 2,
          },
        ],
      },
      tags: {
        create: [
          { name: 'Next.js' },
          { name: 'TypeScript' },
          { name: 'E-commerce' },
          { name: 'Stripe' },
        ],
      },
      categories: {
        create: [
          { name: 'Web Development' },
          { name: 'Full Stack' },
        ],
      },
    },
  })

  const project2 = await prisma.project.create({
    data: {
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'A collaborative task management application with real-time updates',
      content: `# Task Management App

A modern task management solution for teams.

## Features
- Real-time collaboration
- Drag-and-drop task organization
- Team workspaces
- Activity tracking
- Mobile responsive

## Technologies
- React
- Node.js
- Socket.io
- MongoDB
- Material-UI`,
      status: Status.PUBLISHED,
      featured: true,
      sortOrder: 2,
      publishedAt: new Date(),
      userId: adminUser.id,
      images: {
        create: [
          {
            url: '/images/projects/taskapp-1.jpg',
            alt: 'Task board view',
            sortOrder: 1,
          },
        ],
      },
      tags: {
        create: [
          { name: 'React' },
          { name: 'Node.js' },
          { name: 'Socket.io' },
          { name: 'Real-time' },
        ],
      },
      categories: {
        create: [
          { name: 'Web Development' },
          { name: 'Productivity' },
        ],
      },
    },
  })

  const project3 = await prisma.project.create({
    data: {
      title: 'Weather Dashboard',
      slug: 'weather-dashboard',
      description: 'A beautiful weather dashboard with forecasts and historical data',
      content: `# Weather Dashboard

An elegant weather application with detailed forecasts.

## Features
- Current weather conditions
- 7-day forecast
- Historical weather data
- Location search
- Weather maps

## Technologies
- Vue.js
- OpenWeather API
- Chart.js
- Tailwind CSS`,
      status: Status.DRAFT,
      featured: false,
      sortOrder: 3,
      userId: adminUser.id,
      tags: {
        create: [
          { name: 'Vue.js' },
          { name: 'API Integration' },
          { name: 'Data Visualization' },
        ],
      },
      categories: {
        create: [
          { name: 'Web Development' },
        ],
      },
    },
  })

  console.log('✅ Created projects:', project1.title, project2.title, project3.title)

  // Create sample blog posts
  const blogPost1 = await prisma.blogPost.create({
    data: {
      title: 'Getting Started with Next.js 15',
      slug: 'getting-started-with-nextjs-15',
      excerpt: 'Learn about the new features and improvements in Next.js 15',
      content: `# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework.

## What's New

### 1. Improved Performance
The latest version includes significant performance optimizations...

### 2. Enhanced Developer Experience
New tooling and better error messages make development smoother...

### 3. Server Components
Better support for React Server Components...

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## Conclusion

Next.js 15 is a solid upgrade that brings meaningful improvements to both developers and end users.`,
      status: Status.PUBLISHED,
      featured: true,
      publishedAt: new Date(),
      userId: adminUser.id,
      tags: {
        create: [
          { name: 'Next.js' },
          { name: 'React' },
          { name: 'Tutorial' },
        ],
      },
      categories: {
        create: [
          { name: 'Web Development' },
          { name: 'Tutorials' },
        ],
      },
    },
  })

  const blogPost2 = await prisma.blogPost.create({
    data: {
      title: 'Building Accessible Web Applications',
      slug: 'building-accessible-web-applications',
      excerpt: 'Best practices for creating inclusive and accessible web experiences',
      content: `# Building Accessible Web Applications

Accessibility is not optional - it's essential for creating inclusive web experiences.

## Why Accessibility Matters

1. **Inclusive Design**: Everyone deserves access to your content
2. **Legal Requirements**: Many jurisdictions require accessibility compliance
3. **Better UX**: Accessible design benefits all users

## Key Principles

### Semantic HTML
Use proper HTML elements for their intended purpose...

### Keyboard Navigation
Ensure all functionality is accessible via keyboard...

### ARIA Labels
Use ARIA attributes when semantic HTML isn't enough...

## Testing Tools

- axe DevTools
- WAVE
- Screen readers (NVDA, JAWS, VoiceOver)

## Conclusion

Building accessible applications is a continuous process that requires attention and testing.`,
      status: Status.PUBLISHED,
      featured: false,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      userId: adminUser.id,
      tags: {
        create: [
          { name: 'Accessibility' },
          { name: 'Best Practices' },
          { name: 'UX' },
        ],
      },
      categories: {
        create: [
          { name: 'Web Development' },
          { name: 'Best Practices' },
        ],
      },
    },
  })

  console.log('✅ Created blog posts:', blogPost1.title, blogPost2.title)

  // Create sample contact inquiries
  const inquiry1 = await prisma.contactInquiry.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Project Inquiry',
      message: 'Hi, I would like to discuss a potential project collaboration. Are you available for freelance work?',
      status: InquiryStatus.NEW,
      userId: adminUser.id,
    },
  })

  const inquiry2 = await prisma.contactInquiry.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Speaking Opportunity',
      message: 'We are organizing a tech conference and would love to have you as a speaker. Please let me know if you are interested.',
      status: InquiryStatus.READ,
      userId: adminUser.id,
      responses: {
        create: [
          {
            message: 'Thank you for reaching out! I would be interested in learning more about the conference.',
          },
        ],
      },
    },
  })

  console.log('✅ Created contact inquiries:', inquiry1.name, inquiry2.name)

  // Create sample analytics events
  await prisma.analytics.createMany({
    data: [
      {
        event: 'page_view',
        page: '/',
        data: JSON.stringify({ referrer: 'google.com' }),
        userId: adminUser.id,
      },
      {
        event: 'project_view',
        page: '/projects/e-commerce-platform',
        data: JSON.stringify({ projectId: project1.id }),
        userId: adminUser.id,
      },
      {
        event: 'contact_form_submit',
        page: '/contact',
        data: JSON.stringify({ inquiryId: inquiry1.id }),
        userId: adminUser.id,
      },
    ],
  })

  console.log('✅ Created analytics events')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
