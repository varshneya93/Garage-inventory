#!/bin/bash

# Integration Test Runner Script
# This script runs all integration tests and generates a report

set -e

echo "=========================================="
echo "Portfolio Platform Integration Tests"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if database is ready
echo "Checking database connection..."
if npx prisma db push --skip-generate > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Database connection successful${NC}"
else
    echo -e "${RED}✗ Database connection failed${NC}"
    exit 1
fi

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate > /dev/null 2>&1
echo -e "${GREEN}✓ Prisma client generated${NC}"

# Run database migrations
echo "Running database migrations..."
npx prisma db push > /dev/null 2>&1
echo -e "${GREEN}✓ Database migrations complete${NC}"

# Seed test data
echo "Seeding test data..."
npm run db:seed > /dev/null 2>&1
echo -e "${GREEN}✓ Test data seeded${NC}"

echo ""
echo "Running integration tests..."
echo "=========================================="

# Run tests with coverage
if npm test -- --coverage --verbose; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo -e "✓ All integration tests passed!"
    echo -e "==========================================${NC}"
    echo ""
    echo "Coverage report generated in ./coverage"
    exit 0
else
    echo ""
    echo -e "${RED}=========================================="
    echo -e "✗ Some integration tests failed"
    echo -e "==========================================${NC}"
    echo ""
    echo "Check the output above for details"
    exit 1
fi
