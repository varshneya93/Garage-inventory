# Portfolio Platform API Documentation

## Overview

This API provides comprehensive content management capabilities for the portfolio platform, including authentication, project management, blog management, and contact system functionality.

## Authentication

### Endpoints

- `POST /api/auth/register` - Register a new user
- `GET /api/auth/profile` - Get current user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication endpoints

### Authentication Flow

The API uses NextAuth.js with JWT-based session management. Protected routes require authentication, and admin routes require the ADMIN role.

## Projects API

### Endpoints

- `POST /api/projects` - Create a new project (admin only)
- `GET /api/projects` - List projects with filtering and pagination
- `GET /api/projects/[id]` - Get a specific project
- `PUT /api/projects/[id]` - Update a project (admin only)
- `DELETE /api/projects/[id]` - Delete a project (admin only)

### Query Parameters (GET /api/projects)

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `status` - Filter by status (DRAFT, PUBLISHED, ARCHIVED)
- `featured` - Filter by featured status (true/false)
- `category` - Filter by category name
- `tag` - Filter by tag name
- `search` - Search in title, description, and content

### Example Request

```json
POST /api/projects
{
  "title": "My Awesome Project",
  "slug": "my-awesome-project",
  "description": "A brief description",
  "content": "Full project content...",
  "status": "PUBLISHED",
  "featured": true,
  "tags": ["react", "typescript"],
  "categories": ["web-development"],
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Project screenshot",
      "sortOrder": 0
    }
  ]
}
```

## Blog API

### Endpoints

- `POST /api/blog` - Create a new blog post (admin only)
- `GET /api/blog` - List blog posts with filtering and pagination
- `GET /api/blog/[id]` - Get a specific blog post
- `PUT /api/blog/[id]` - Update a blog post (admin only)
- `DELETE /api/blog/[id]` - Delete a blog post (admin only)

### Query Parameters (GET /api/blog)

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `status` - Filter by status (DRAFT, PUBLISHED, ARCHIVED)
- `featured` - Filter by featured status (true/false)
- `category` - Filter by category name
- `tag` - Filter by tag name
- `search` - Search in title, excerpt, and content

### Example Request

```json
POST /api/blog
{
  "title": "Getting Started with Next.js",
  "slug": "getting-started-with-nextjs",
  "excerpt": "Learn the basics of Next.js",
  "content": "Full blog post content...",
  "status": "PUBLISHED",
  "featured": false,
  "tags": ["nextjs", "tutorial"],
  "categories": ["web-development"]
}
```

## Contact API

### Endpoints

- `POST /api/contact` - Submit a contact form (public)
- `GET /api/contact/inquiries` - List all inquiries (admin only)
- `GET /api/contact/inquiries/[id]` - Get a specific inquiry (admin only)
- `PUT /api/contact/inquiries/[id]` - Update inquiry status (admin only)
- `DELETE /api/contact/inquiries/[id]` - Delete an inquiry (admin only)

### Query Parameters (GET /api/contact/inquiries)

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `status` - Filter by status (NEW, READ, RESPONDED, CLOSED)
- `search` - Search in name, email, subject, and message

### Example Request

```json
POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a potential project..."
}
```

### Update Inquiry Status

```json
PUT /api/contact/inquiries/[id]
{
  "status": "RESPONDED",
  "response": "Thank you for your inquiry. I'll get back to you soon!"
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional details
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `VALIDATION_ERROR` - Invalid input data
- `NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Server error

## Success Responses

Successful responses follow this format:

```json
{
  "success": true,
  "data": {}, // Response data
  "pagination": { // For list endpoints
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Environment Variables

Required environment variables:

- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret key
- `NEXTAUTH_URL` - Application URL
- `ADMIN_EMAIL` - Admin email for notifications (optional)

## Notes

- All timestamps are in ISO 8601 format
- Slugs must be unique and URL-safe (lowercase, hyphens only)
- Images are referenced by URL (upload handling to be implemented)
- Email notifications are logged in development mode
- SQLite case-insensitive search uses `mode: "insensitive"` parameter
