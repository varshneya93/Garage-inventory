import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

interface RateLimitStore {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// In production, use Redis or similar distributed cache
const rateLimitStore = new Map<string, RateLimitStore>();

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  private getIdentifier(request: NextRequest): string {
    // Use IP address as identifier
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    return ip;
  }

  private cleanupExpiredEntries() {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  check(request: NextRequest): { success: boolean; limit: number; remaining: number; reset: number } {
    this.cleanupExpiredEntries();

    const identifier = this.getIdentifier(request);
    const now = Date.now();
    const resetTime = now + this.config.interval;

    let store = rateLimitStore.get(identifier);

    if (!store || now > store.resetTime) {
      store = {
        count: 1,
        resetTime,
      };
      rateLimitStore.set(identifier, store);

      return {
        success: true,
        limit: this.config.uniqueTokenPerInterval,
        remaining: this.config.uniqueTokenPerInterval - 1,
        reset: resetTime,
      };
    }

    store.count++;

    if (store.count > this.config.uniqueTokenPerInterval) {
      return {
        success: false,
        limit: this.config.uniqueTokenPerInterval,
        remaining: 0,
        reset: store.resetTime,
      };
    }

    return {
      success: true,
      limit: this.config.uniqueTokenPerInterval,
      remaining: this.config.uniqueTokenPerInterval - store.count,
      reset: store.resetTime,
    };
  }
}

// Predefined rate limiters for different endpoints
export const apiRateLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 60, // 60 requests per minute
});

export const contactFormRateLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 5, // 5 submissions per hour
});

export const authRateLimiter = new RateLimiter({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 5, // 5 attempts per 15 minutes
});

export const uploadRateLimiter = new RateLimiter({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 10, // 10 uploads per minute
});
