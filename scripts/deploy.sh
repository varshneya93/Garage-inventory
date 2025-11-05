#!/bin/bash

# Deployment Script for Portfolio Platform
# This script handles the deployment process

set -e

echo "=========================================="
echo "Portfolio Platform Deployment"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if production environment file exists
if [ ! -f .env.production ]; then
    echo -e "${RED}✗ .env.production file not found${NC}"
    echo "Please create .env.production from .env.production.example"
    exit 1
fi

echo -e "${GREEN}✓ Environment configuration found${NC}"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm ci --production=false
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Generate Prisma client
echo ""
echo "Generating Prisma client..."
npx prisma generate
echo -e "${GREEN}✓ Prisma client generated${NC}"

# Run database migrations
echo ""
echo "Running database migrations..."
npx prisma migrate deploy
echo -e "${GREEN}✓ Database migrations complete${NC}"

# Build the application
echo ""
echo "Building application..."
npm run build
echo -e "${GREEN}✓ Application built successfully${NC}"

# Run health check
echo ""
echo "Running health check..."
if npm run health-check; then
    echo -e "${GREEN}✓ Health check passed${NC}"
else
    echo -e "${RED}✗ Health check failed${NC}"
    exit 1
fi

# Run tests
echo ""
echo "Running tests..."
if npm test; then
    echo -e "${GREEN}✓ All tests passed${NC}"
else
    echo -e "${YELLOW}⚠ Some tests failed - review before deploying${NC}"
    read -p "Continue with deployment? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo -e "${GREEN}=========================================="
echo -e "✓ Deployment preparation complete!"
echo -e "==========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Review the build output"
echo "2. Test the production build locally: npm run start"
echo "3. Deploy to your hosting platform"
echo ""
