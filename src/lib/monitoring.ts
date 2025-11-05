// Production monitoring and error tracking

declare const process: any;

interface ErrorContext {
  userId?: string;
  url?: string;
  userAgent?: string;
  additionalData?: Record<string, any>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

export class MonitoringService {
  private static instance: MonitoringService;
  private sentryDsn?: string;
  private environment: string;

  private constructor() {
    if (typeof window === 'undefined') {
      // Server-side
      this.sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
      this.environment = process.env.NODE_ENV || 'development';
    } else {
      // Client-side
      this.sentryDsn = undefined;
      this.environment = 'development';
    }
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  // Error tracking
  captureException(error: Error, context?: ErrorContext) {
    console.error('Error captured:', error, context);

    // Always log to database for audit trail
    this.logToDatabase(error, context);

    // In production, send to error tracking service
    if (this.environment === 'production') {
      this.sendToSentry(error, context);
    }
  }

  // Capture message (for non-error events)
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext) {
    console.log(`[${level.toUpperCase()}] ${message}`, context);

    if (this.environment === 'production') {
      this.logMessageToDatabase(message, level, context);
    }
  }

  private async sendToSentry(error: Error, context?: ErrorContext) {
    if (!this.sentryDsn) return;

    try {
      // Simplified Sentry integration
      // In production, use @sentry/nextjs package
      await fetch(this.sentryDsn, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          context,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Failed to send error to Sentry:', err);
    }
  }

  private async logToDatabase(error: Error, context?: ErrorContext) {
    try {
      await fetch('/api/monitoring/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          name: error.name,
          context,
          timestamp: new Date().toISOString(),
          environment: this.environment,
        }),
      });
    } catch (err) {
      console.error('Failed to log error to database:', err);
    }
  }

  private async logMessageToDatabase(message: string, level: string, context?: ErrorContext) {
    try {
      await fetch('/api/monitoring/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          level,
          context,
          timestamp: new Date().toISOString(),
          environment: this.environment,
        }),
      });
    } catch (err) {
      console.error('Failed to log message to database:', err);
    }
  }

  // Performance monitoring
  trackPerformance(metric: PerformanceMetric) {
    console.log('Performance metric:', metric);

    if (this.environment === 'production') {
      this.sendPerformanceMetric(metric);
    }
  }

  private async sendPerformanceMetric(metric: PerformanceMetric) {
    try {
      await fetch('/api/monitoring/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      });
    } catch (err) {
      console.error('Failed to send performance metric:', err);
    }
  }

  // Core Web Vitals tracking
  trackWebVitals(metric: {
    name: string;
    value: number;
    id: string;
    rating: 'good' | 'needs-improvement' | 'poor';
  }) {
    this.trackPerformance({
      name: `web-vital-${metric.name}`,
      value: metric.value,
      timestamp: Date.now(),
      metadata: {
        id: metric.id,
        rating: metric.rating,
      },
    });
  }

  // API response time tracking
  trackApiResponseTime(endpoint: string, duration: number, statusCode: number) {
    this.trackPerformance({
      name: 'api-response-time',
      value: duration,
      timestamp: Date.now(),
      metadata: {
        endpoint,
        statusCode,
      },
    });
  }

  // Database query performance
  trackDatabaseQuery(query: string, duration: number) {
    this.trackPerformance({
      name: 'database-query',
      value: duration,
      timestamp: Date.now(),
      metadata: {
        query: query.substring(0, 100), // Truncate long queries
      },
    });
  }

  // Custom events
  trackEvent(eventName: string, properties?: Record<string, any>) {
    console.log('Event tracked:', eventName, properties);

    if (this.environment === 'production') {
      this.sendEvent(eventName, properties);
    }
  }

  private async sendEvent(eventName: string, properties?: Record<string, any>) {
    try {
      await fetch('/api/monitoring/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventName,
          properties,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Failed to send event:', err);
    }
  }

  // Health check
  async checkHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: Record<string, boolean>;
  }> {
    const checks: Record<string, boolean> = {};

    // Check database connection
    try {
      const dbResponse = await fetch('/api/health');
      checks.database = dbResponse.ok;
    } catch {
      checks.database = false;
    }

    // Check external services
    checks.externalServices = true; // Placeholder

    // Determine overall status
    const allHealthy = Object.values(checks).every((check) => check);
    const someHealthy = Object.values(checks).some((check) => check);

    return {
      status: allHealthy ? 'healthy' : someHealthy ? 'degraded' : 'unhealthy',
      checks,
    };
  }

  // Security event tracking
  trackSecurityEvent(event: {
    type: 'rate_limit' | 'csrf_failure' | 'auth_failure' | 'suspicious_activity' | 'file_upload_blocked';
    severity: 'low' | 'medium' | 'high' | 'critical';
    details: Record<string, any>;
    ipAddress?: string;
    userId?: string;
  }) {
    console.warn('Security event:', event);

    if (this.environment === 'production') {
      this.logSecurityEvent(event);
    }

    // Alert on critical events
    if (event.severity === 'critical') {
      this.captureMessage(
        `Critical security event: ${event.type}`,
        'error',
        { additionalData: event.details }
      );
    }
  }

  private async logSecurityEvent(event: any) {
    try {
      await fetch('/api/monitoring/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Failed to log security event:', err);
    }
  }

  // Resource usage tracking
  trackResourceUsage(metrics: {
    memory?: number;
    cpu?: number;
    diskSpace?: number;
    activeConnections?: number;
  }) {
    if (this.environment === 'production') {
      this.trackPerformance({
        name: 'resource-usage',
        value: metrics.memory || 0,
        timestamp: Date.now(),
        metadata: metrics,
      });
    }
  }
}

// Export singleton instance
export const monitoring = MonitoringService.getInstance();

// Helper function for API route timing
export function withTiming<T>(
  fn: () => Promise<T>,
  endpoint: string
): Promise<T> {
  const start = Date.now();
  return fn()
    .then((result) => {
      const duration = Date.now() - start;
      monitoring.trackApiResponseTime(endpoint, duration, 200);
      return result;
    })
    .catch((error) => {
      const duration = Date.now() - start;
      monitoring.trackApiResponseTime(endpoint, duration, 500);
      throw error;
    });
}

// Helper function for database query timing
export async function withQueryTiming<T>(
  fn: () => Promise<T>,
  queryName: string
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    monitoring.trackDatabaseQuery(queryName, duration);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    monitoring.trackDatabaseQuery(queryName, duration);
    throw error;
  }
}
