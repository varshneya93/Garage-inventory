# Portfolio Platform

A comprehensive, production-ready portfolio management platform built with Next.js 15, Tailwind CSS, shadcn/ui, and TypeScript. Manage your projects, blog posts, and showcase your work with a powerful admin dashboard and beautiful public interface.

## ✨ Features

### 🎨 Public Interface
- **Project Gallery**: Showcase your work with filtering, search, and pagination
- **Blog System**: Share insights and improve SEO with a full-featured blog
- **Contact Form**: Receive inquiries with email notifications
- **Analytics Tracking**: Privacy-compliant visitor analytics
- **Theme Support**: Light/dark mode with customization options
- **Responsive Design**: Beautiful on all devices
- **SEO Optimized**: Meta tags, sitemaps, and structured data

### 🔐 Admin Dashboard
- **Project Management**: Full CRUD operations for portfolio projects
- **Blog Editor**: Rich text editor with Markdown support
- **Media Library**: Upload, organize, and optimize images
- **Contact Management**: View and respond to inquiries
- **Analytics Dashboard**: Visitor statistics and engagement metrics
- **Theme Customizer**: Real-time theme editing
- **User Management**: Role-based access control

### 🚀 Technical Features
- **Next.js 15**: App Router with server components
- **TypeScript**: Full type safety
- **Prisma ORM**: Type-safe database operations
- **NextAuth.js**: Secure authentication
- **shadcn/ui**: Beautiful, accessible components
- **Tailwind CSS**: Utility-first styling
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Performance**: Lighthouse score 90+
- **Accessibility**: WCAG 2.1 AA compliant

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn
- Database (SQLite for development, PostgreSQL/MySQL for production)

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio-platform.git
cd portfolio-platform

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

Required environment variables:
```env
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

Access admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

## 📁 Project Structure

```
portfolio-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public pages
│   │   ├── admin/             # Admin dashboard
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── admin/            # Admin components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...               # Shared components
│   ├── lib/                   # Utilities
│   ├── hooks/                 # Custom hooks
│   └── types/                 # TypeScript types
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
├── tests/                     # Test files
├── docs/                      # Documentation
├── public/                    # Static assets
└── scripts/                   # Build scripts
```

## 🎯 Usage

### Creating Your First Project

1. Log in to admin dashboard
2. Navigate to Projects
3. Click "Create New Project"
4. Fill in project details
5. Upload images
6. Publish or save as draft

### Writing a Blog Post

1. Go to Blog section in admin
2. Click "Create New Post"
3. Write content using Markdown editor
4. Add tags and categories
5. Set SEO metadata
6. Publish or schedule

### Managing Contact Inquiries

1. Navigate to Inquiries
2. View new submissions
3. Mark as read/responded
4. Add internal notes
5. Close when resolved

### Viewing Analytics

1. Go to Analytics dashboard
2. Select date range
3. View visitor statistics
4. Analyze popular content
5. Export data if needed

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run health check
npm run health-check

# Run performance audit
npm run audit:performance

# Run accessibility audit
npm run audit:accessibility
```

## 📊 Performance

The platform is optimized for performance:

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Meets all thresholds
- **Image Optimization**: Automatic format conversion
- **Code Splitting**: Dynamic imports for large components
- **Caching**: Strategic caching for API responses
- **Bundle Size**: Optimized with tree shaking

## ♿ Accessibility

Built with accessibility in mind:

- **WCAG 2.1 AA**: Compliant with accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets contrast requirements
- **Focus Indicators**: Visible focus states
- **Alt Text**: All images have descriptive alt text

## 🔒 Security

Security features included:

- **Authentication**: Secure session management with NextAuth.js
- **Authorization**: Role-based access control
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Built-in CSRF tokens
- **Rate Limiting**: API rate limiting
- **SQL Injection**: Protected by Prisma ORM
- **XSS Protection**: Content Security Policy

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t portfolio-platform .

# Run container
docker run -p 3000:3000 portfolio-platform
```

### Traditional VPS

```bash
# Run deployment script
./scripts/deploy.sh

# Or manually
npm run build
npm run start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📚 Documentation

- [Admin User Guide](./docs/ADMIN_GUIDE.md) - How to use the admin dashboard
- [Developer Guide](./docs/DEVELOPER_GUIDE.md) - Technical documentation
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deployment instructions
- [API Reference](./docs/API_REFERENCE.md) - API documentation

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Prisma](https://www.prisma.io/) - Database ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [React Hook Form](https://react-hook-form.com/) - Forms
- [Zod](https://zod.dev/) - Validation

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Z.ai](https://chat.z.ai) assistance
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Support

For support and questions:
- GitHub Issues: [repository-url]/issues
- Email: support@your-domain.com
- Documentation: [docs-url]

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Email marketing integration
- [ ] Social media auto-posting
- [ ] Advanced SEO tools
- [ ] A/B testing
- [ ] Custom domains
- [ ] White-label options

---

Built with ❤️ by [Your Name]
