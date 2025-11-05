/**
 * Performance monitoring utilities for Core Web Vitals tracking
 */

export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Track Core Web Vitals and send to analytics
 */
export function reportWebVitals(metric: WebVitalsMetric): void {
  // Send to analytics endpoint
  if (typeof window !== 'undefined' && navigator.sendBeacon) {
    const body = JSON.stringify({
      event: 'web_vitals',
      data: {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      },
    });

    navigator.sendBeacon('/api/analytics/track', body);
  }
}

/**
 * Get performance rating based on thresholds
 */
export function getPerformanceRating(
  metric: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Monitor long tasks that block the main thread
 */
export function observeLongTasks(callback: (entries: PerformanceEntry[]) => void): void {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      callback(list.getEntries());
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (error) {
    // PerformanceObserver not supported
    console.warn('Long task monitoring not supported');
  }
}

/**
 * Monitor resource loading performance
 */
export function observeResourceTiming(callback: (entries: PerformanceResourceTiming[]) => void): void {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceResourceTiming[];
      callback(entries);
    });

    observer.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Resource timing monitoring not supported');
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics(): Record<string, number> {
  if (typeof window === 'undefined' || !window.performance) {
    return {};
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  const metrics: Record<string, number> = {};

  if (navigation) {
    metrics.dns = navigation.domainLookupEnd - navigation.domainLookupStart;
    metrics.tcp = navigation.connectEnd - navigation.connectStart;
    metrics.ttfb = navigation.responseStart - navigation.requestStart;
    metrics.download = navigation.responseEnd - navigation.responseStart;
    metrics.domInteractive = navigation.domInteractive - navigation.fetchStart;
    metrics.domComplete = navigation.domComplete - navigation.fetchStart;
    metrics.loadComplete = navigation.loadEventEnd - navigation.fetchStart;
  }

  paint.forEach((entry) => {
    if (entry.name === 'first-paint') {
      metrics.fp = entry.startTime;
    } else if (entry.name === 'first-contentful-paint') {
      metrics.fcp = entry.startTime;
    }
  });

  return metrics;
}

/**
 * Check if performance budget is exceeded
 */
export interface PerformanceBudget {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  bundleSize?: number;
}

export function checkPerformanceBudget(
  metrics: Record<string, number>,
  budget: PerformanceBudget
): { passed: boolean; violations: string[] } {
  const violations: string[] = [];

  if (budget.lcp && metrics.lcp > budget.lcp) {
    violations.push(`LCP exceeded: ${metrics.lcp}ms > ${budget.lcp}ms`);
  }

  if (budget.fid && metrics.fid > budget.fid) {
    violations.push(`FID exceeded: ${metrics.fid}ms > ${budget.fid}ms`);
  }

  if (budget.cls && metrics.cls > budget.cls) {
    violations.push(`CLS exceeded: ${metrics.cls} > ${budget.cls}`);
  }

  if (budget.fcp && metrics.fcp > budget.fcp) {
    violations.push(`FCP exceeded: ${metrics.fcp}ms > ${budget.fcp}ms`);
  }

  if (budget.ttfb && metrics.ttfb > budget.ttfb) {
    violations.push(`TTFB exceeded: ${metrics.ttfb}ms > ${budget.ttfb}ms`);
  }

  return {
    passed: violations.length === 0,
    violations,
  };
}

/**
 * Log performance metrics to console in development
 */
export function logPerformanceMetrics(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  const metrics = getPerformanceMetrics();
  console.group('⚡ Performance Metrics');
  console.table(metrics);
  console.groupEnd();
}
