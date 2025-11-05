/**
 * Test setup and global configuration
 */

// Extend Jest matchers
expect.extend({
  toBeValidDate(received) {
    const pass = received instanceof Date && !isNaN(received.getTime());
    return {
      pass,
      message: () => pass
        ? `expected ${received} not to be a valid date`
        : `expected ${received} to be a valid date`
    };
  }
});

// Set test timeout
jest.setTimeout(30000);

// Mock environment variables for tests
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./db/test.db';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
