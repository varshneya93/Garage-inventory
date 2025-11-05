/**
 * Lighthouse CI Configuration
 * Defines performance budgets and audit settings
 */

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/blog',
        'http://localhost:3000/admin'
      ],
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        }
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        
        // Performance metrics
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        
        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'aria-valid-attr': 'error',
        'button-name': 'error',
        'link-name': 'error',
        
        // Best practices
        'errors-in-console': 'warn',
        'uses-http2': 'warn',
        'uses-passive-event-listeners': 'warn',
        
        // SEO
        'meta-description': 'error',
        'document-title': 'error',
        'robots-txt': 'warn',
        'canonical': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
