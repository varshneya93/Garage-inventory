#!/bin/bash

# Database Setup Script for Portfolio Platform
# This script sets up the database schema and seeds initial data

set -e

echo "🚀 Portfolio Platform - Database Setup"
echo "======================================"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your configuration."
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run db:generate
echo ""

# Create migration
echo "📝 Creating database migration..."
echo "   You will be prompted to name this migration."
echo "   Suggested name: init_portfolio_schema"
echo ""
npm run db:migrate
echo ""

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed
echo ""

echo "✅ Database setup complete!"
echo ""
echo "📊 Sample data created:"
echo "   - Admin user: admin@portfolio.com"
echo "   - 3 sample projects"
echo "   - 2 blog posts"
echo "   - 2 contact inquiries"
echo ""
echo "🎉 You're ready to start developing!"
echo ""
echo "Next steps:"
echo "   1. Update .env with your configuration"
echo "   2. Run 'npm run dev' to start the development server"
echo ""
