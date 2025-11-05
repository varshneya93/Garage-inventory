# Quick Start Guide

Get your Portfolio Platform up and running in minutes!

## Prerequisites

You need Node.js 18+ installed. If you don't have it:

### Install Node.js (Choose one method)

**Option 1: Using Homebrew (Recommended for macOS)**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

**Option 2: Download Installer**
1. Visit https://nodejs.org/
2. Download the macOS installer (LTS version)
3. Run the installer
4. Restart your terminal

**Option 3: Using nvm (Node Version Manager)**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal, then:
nvm install --lts
nvm use --lts
```

## Setup (After Node.js is installed)

### Automated Setup (Recommended)

Run the automated setup script:

```bash
./setup.sh
```

This will:
- ✅ Check Node.js installation
- ✅ Install all dependencies
- ✅ Set up environment variables
- ✅ Generate Prisma client
- ✅ Create and seed database
- ✅ Run health checks

### Manual Setup

If you prefer to set up manually:

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 3. Set up database
npm run db:generate
npm run db:push
npm run db:seed

# 4. Run health check
npm run health-check
```

## Start Development Server

```bash
npm run dev
```

Open your browser:
- **Public Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## Default Admin Credentials

After seeding, you can log in with:
- **Email**: Check the seed file or create a user
- **Password**: Check the seed file

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed database
npm run db:reset         # Reset database

# Testing
npm test                 # Run tests
npm run test:integration # Run integration tests
npm run health-check     # System health check

# Audits
npm run audit:performance    # Performance audit
npm run audit:accessibility  # Accessibility audit
npm run audit:all           # All audits
```

## Project Structure

```
portfolio-platform/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   └── lib/             # Utilities
├── prisma/              # Database schema
├── tests/               # Test files
├── docs/                # Documentation
└── public/              # Static assets
```

## Next Steps

1. **Customize Your Portfolio**
   - Log in to admin dashboard
   - Add your projects
   - Write blog posts
   - Customize theme

2. **Configure Integrations** (Optional)
   - GitHub API for repositories
   - Email service for notifications
   - Analytics tracking

3. **Deploy to Production**
   - See `docs/DEPLOYMENT.md` for deployment options
   - Vercel, Docker, or traditional VPS

## Documentation

- 📖 [Admin User Guide](docs/ADMIN_GUIDE.md) - How to use the admin dashboard
- 🛠️ [Developer Guide](docs/DEVELOPER_GUIDE.md) - Technical documentation
- 🚀 [Deployment Guide](docs/DEPLOYMENT.md) - Deploy to production
- 📚 [Full README](docs/README_PORTFOLIO.md) - Complete project overview

## Troubleshooting

### "npm: command not found"
Node.js is not installed. Follow the installation steps above.

### Database errors
```bash
npm run db:reset
npm run db:seed
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## Getting Help

- 📧 Check documentation in `docs/` folder
- 🐛 Review error logs in `dev.log`
- 💬 Open an issue on GitHub

## What's Included

✅ Complete portfolio management system
✅ Admin dashboard with full CRUD
✅ Blog with Markdown support
✅ Contact form with email notifications
✅ Analytics tracking
✅ Theme customization
✅ SEO optimization
✅ Responsive design
✅ Accessibility compliant
✅ Performance optimized
✅ Production ready

---

**Ready to build something amazing? Start with `./setup.sh` or `npm run dev`!** 🚀
