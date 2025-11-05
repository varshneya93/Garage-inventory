/**
 * Integration Tests for Portfolio Platform User Flows
 * Tests complete user journeys from public interface to admin dashboard
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Portfolio Platform Integration Tests', () => {
  beforeAll(async () => {
    // Ensure database is ready
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Public Interface User Flow', () => {
    test('Visitor can view published projects', async () => {
      const projects = await prisma.project.findMany({
        where: { status: 'PUBLISHED' },
        include: { images: true, tags: true }
      });

      expect(projects).toBeDefined();
      expect(Array.isArray(projects)).toBe(true);
    });

    test('Visitor can view published blog posts', async () => {
      const blogPosts = await prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        include: { tags: true }
      });

      expect(blogPosts).toBeDefined();
      expect(Array.isArray(blogPosts)).toBe(true);
    });

    test('Visitor can submit contact form', async () => {
      const inquiry = await prisma.contactInquiry.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Inquiry',
          message: 'This is a test message',
          status: 'NEW'
        }
      });

      expect(inquiry).toBeDefined();
      expect(inquiry.status).toBe('NEW');
      expect(inquiry.email).toBe('test@example.com');

      // Cleanup
      await prisma.contactInquiry.delete({ where: { id: inquiry.id } });
    });

    test('Analytics tracking records page views', async () => {
      const analyticsEvent = await prisma.analytics.create({
        data: {
          event: 'page_view',
          page: '/projects',
          data: { timestamp: new Date().toISOString() }
        }
      });

      expect(analyticsEvent).toBeDefined();
      expect(analyticsEvent.event).toBe('page_view');

      // Cleanup
      await prisma.analytics.delete({ where: { id: analyticsEvent.id } });
    });
  });

  describe('Admin Dashboard User Flow', () => {
    let testUser: any;

    beforeAll(async () => {
      // Create test admin user
      testUser = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
      });

      if (!testUser) {
        testUser = await prisma.user.create({
          data: {
            email: 'admin@test.com',
            name: 'Test Admin',
            role: 'ADMIN'
          }
        });
      }
    });

    test('Admin can create a new project', async () => {
      const project = await prisma.project.create({
        data: {
          title: 'Test Project',
          slug: 'test-project-' + Date.now(),
          description: 'Test project description',
          content: 'Test project content',
          status: 'DRAFT',
          userId: testUser.id
        }
      });

      expect(project).toBeDefined();
      expect(project.title).toBe('Test Project');
      expect(project.status).toBe('DRAFT');

      // Cleanup
      await prisma.project.delete({ where: { id: project.id } });
    });

    test('Admin can update project status to published', async () => {
      const project = await prisma.project.create({
        data: {
          title: 'Test Project for Update',
          slug: 'test-project-update-' + Date.now(),
          description: 'Test description',
          status: 'DRAFT',
          userId: testUser.id
        }
      });

      const updatedProject = await prisma.project.update({
        where: { id: project.id },
        data: { 
          status: 'PUBLISHED',
          publishedAt: new Date()
        }
      });

      expect(updatedProject.status).toBe('PUBLISHED');
      expect(updatedProject.publishedAt).toBeDefined();

      // Cleanup
      await prisma.project.delete({ where: { id: project.id } });
    });

    test('Admin can create and publish blog post', async () => {
      const blogPost = await prisma.blogPost.create({
        data: {
          title: 'Test Blog Post',
          slug: 'test-blog-post-' + Date.now(),
          excerpt: 'Test excerpt',
          content: 'Test blog content',
          status: 'PUBLISHED',
          publishedAt: new Date(),
          userId: testUser.id
        }
      });

      expect(blogPost).toBeDefined();
      expect(blogPost.status).toBe('PUBLISHED');

      // Cleanup
      await prisma.blogPost.delete({ where: { id: blogPost.id } });
    });

    test('Admin can view and manage contact inquiries', async () => {
      const inquiry = await prisma.contactInquiry.create({
        data: {
          name: 'Test Contact',
          email: 'contact@test.com',
          subject: 'Test Subject',
          message: 'Test message',
          status: 'NEW'
        }
      });

      const updatedInquiry = await prisma.contactInquiry.update({
        where: { id: inquiry.id },
        data: { status: 'READ', userId: testUser.id }
      });

      expect(updatedInquiry.status).toBe('READ');
      expect(updatedInquiry.userId).toBe(testUser.id);

      // Cleanup
      await prisma.contactInquiry.delete({ where: { id: inquiry.id } });
    });

    test('Admin can view analytics data', async () => {
      // Create test analytics events
      await prisma.analytics.createMany({
        data: [
          { event: 'page_view', page: '/projects' },
          { event: 'project_click', page: '/projects', data: { projectId: 'test' } },
          { event: 'contact_submit', page: '/contact' }
        ]
      });

      const analytics = await prisma.analytics.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' }
      });

      expect(analytics.length).toBeGreaterThan(0);

      // Cleanup
      await prisma.analytics.deleteMany({
        where: {
          event: { in: ['page_view', 'project_click', 'contact_submit'] }
        }
      });
    });
  });

  describe('Data Consistency Tests', () => {
    test('Project with images maintains referential integrity', async () => {
      const user = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      
      const project = await prisma.project.create({
        data: {
          title: 'Project with Images',
          slug: 'project-images-' + Date.now(),
          description: 'Test',
          userId: user!.id,
          images: {
            create: [
              { url: '/test1.jpg', alt: 'Test 1', sortOrder: 0 },
              { url: '/test2.jpg', alt: 'Test 2', sortOrder: 1 }
            ]
          }
        },
        include: { images: true }
      });

      expect(project.images.length).toBe(2);
      expect(project.images[0].projectId).toBe(project.id);

      // Cleanup - cascade delete should remove images
      await prisma.project.delete({ where: { id: project.id } });

      const orphanedImages = await prisma.projectImage.findMany({
        where: { projectId: project.id }
      });
      expect(orphanedImages.length).toBe(0);
    });

    test('Blog post with tags maintains relationships', async () => {
      const user = await prisma.user.findFirst({ where: { role: 'ADMIN' } });

      const blogPost = await prisma.blogPost.create({
        data: {
          title: 'Blog with Tags',
          slug: 'blog-tags-' + Date.now(),
          content: 'Test content',
          userId: user!.id,
          tags: {
            create: [
              { name: 'test-tag-1' },
              { name: 'test-tag-2' }
            ]
          }
        },
        include: { tags: true }
      });

      expect(blogPost.tags.length).toBe(2);

      // Cleanup
      await prisma.blogPost.delete({ where: { id: blogPost.id } });
    });
  });

  describe('Error Handling Tests', () => {
    test('Duplicate slug is prevented', async () => {
      const user = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      const slug = 'duplicate-test-' + Date.now();

      const project1 = await prisma.project.create({
        data: {
          title: 'First Project',
          slug: slug,
          description: 'Test',
          userId: user!.id
        }
      });

      await expect(
        prisma.project.create({
          data: {
            title: 'Second Project',
            slug: slug,
            description: 'Test',
            userId: user!.id
          }
        })
      ).rejects.toThrow();

      // Cleanup
      await prisma.project.delete({ where: { id: project1.id } });
    });

    test('Required fields are enforced', async () => {
      await expect(
        prisma.project.create({
          data: {
            // Missing required fields
            description: 'Test'
          } as any
        })
      ).rejects.toThrow();
    });
  });
});
