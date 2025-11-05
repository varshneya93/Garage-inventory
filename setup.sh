#!/bin/bash

# Portfolio Platform - Complete Setup Script
# This script will set up everything needed to run the platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo "Portfolio Platform - Complete Setup"
echo -e "==========================================${NC}\n"

# Check if Node.js is installed
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js is not installed${NC}\n"
    echo -e "${YELLOW}Please install Node.js first:${NC}"
    echo "  Option 1 - Using Homebrew (recommended):"
    echo "    /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    echo "    brew install node"
    echo ""
    echo "  Option 2 - Download installer:"
    echo "    Visit https://nodejs.org/ and download the macOS installer"
    echo ""
    echo "  Option 3 - Using nvm:"
    echo "    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "    nvm install --lts"
    echo ""
    exit 1
fi

NODE_VERSION=$(node --version)
NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} installed${NC}"
echo -e "${GREEN}✓ npm ${NPM_VERSION} installed${NC}\n"

# Check Node.js version
REQUIRED_NODE_VERSION=18
CURRENT_NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$CURRENT_NODE_VERSION" -lt "$REQUIRED_NODE_VERSION" ]; then
    echo -e "${RED}✗ Node.js version $REQUIRED_NODE_VERSION or higher is required${NC}"
    echo -e "${YELLOW}Current version: ${NODE_VERSION}${NC}"
    echo "Please upgrade Node.js"
    exit 1
fi

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}\n"

# Check if .env file exists
echo -e "${BLUE}Setting up environment variables...${NC}"
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file from .env.example${NC}"
        echo -e "${YELLOW}⚠ Please edit .env file with your configuration${NC}\n"
    else
        echo -e "${YELLOW}⚠ No .env.example found, creating basic .env${NC}"
        cat > .env << 'EOF'
# Database
DATABASE_URL="file:./db/custom.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Optional: Email Service
# RESEND_API_KEY="your-resend-api-key"
# EMAIL_FROM="noreply@yourdomain.com"

# Optional: GitHub Integration
# GITHUB_TOKEN="your-github-token"
# GITHUB_USERNAME="your-username"
EOF
        echo -e "${GREEN}✓ Created basic .env file${NC}\n"
    fi
else
    echo -e "${GREEN}✓ .env file already exists${NC}\n"
fi

# Generate Prisma Client
echo -e "${BLUE}Generating Prisma client...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma client generated${NC}\n"

# Setup database
echo -e "${BLUE}Setting up database...${NC}"

# Create db directory if it doesn't exist
mkdir -p db

# Push database schema
echo "Pushing database schema..."
npx prisma db push --skip-generate
echo -e "${GREEN}✓ Database schema created${NC}\n"

# Seed database
echo -e "${BLUE}Seeding database with sample data...${NC}"
if [ -f prisma/seed.ts ]; then
    npm run db:seed
    echo -e "${GREEN}✓ Database seeded${NC}\n"
else
    echo -e "${YELLOW}⚠ No seed file found, skipping seeding${NC}\n"
fi

# Make scripts executable
echo -e "${BLUE}Setting up scripts...${NC}"
chmod +x scripts/*.sh 2>/dev/null || true
chmod +x tests/*.sh 2>/dev/null || true
echo -e "${GREEN}✓ Scripts are executable${NC}\n"

# Run health check
echo -e "${BLUE}Running system health check...${NC}"
if npm run health-check; then
    echo -e "${GREEN}✓ Health check passed${NC}\n"
else
    echo -e "${YELLOW}⚠ Health check had warnings (this is normal for first setup)${NC}\n"
fi

# Summary
echo -e "${GREEN}=========================================="
echo "✓ Setup Complete!"
echo -e "==========================================${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo "  1. Review and update .env file with your configuration"
echo "  2. Start the development server:"
echo -e "     ${GREEN}npm run dev${NC}"
echo ""
echo "  3. Open your browser to:"
echo -e "     ${GREEN}http://localhost:3000${NC} - Public site"
echo -e "     ${GREEN}http://localhost:3000/admin${NC} - Admin dashboard"
echo ""
echo -e "${BLUE}Useful commands:${NC}"
echo "  npm run dev              - Start development server"
echo "  npm run build            - Build for production"
echo "  npm run start            - Start production server"
echo "  npm test                 - Run tests"
echo "  npm run health-check     - Check system health"
echo "  npm run audit:all        - Run performance & accessibility audits"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  docs/ADMIN_GUIDE.md      - Admin user guide"
echo "  docs/DEVELOPER_GUIDE.md  - Developer documentation"
echo "  docs/DEPLOYMENT.md       - Deployment guide"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}\n"
