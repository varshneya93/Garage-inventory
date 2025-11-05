'use client';

import { useEffect } from 'react';
import { reportWebVitals, getPerformanceRating, logPerformanceMetrics } from '@/lib/performance';

export function PerformanceMonitor() {
  useEffect(() => {
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      logPerformanceMetrics();
    }

    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          
          if (lastEntry) {
            reportWebVitals({
              name: 'LCP',
              value: lastEntry.renderTime || lastEntry.loadTime,
              rating: getPerformanceRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
              delta: lastEntry.renderTime || lastEntry.loadTime,
              id: `v3-${Date.now()}-${Math.random()}`,
            });
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            reportWebVitals({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              rating: getPerformanceRating('FID', entry.processingStart - entry.startTime),
              delta: entry.processingStart - entry.startTime,
              id: `v3-${Date.now()}-${Math.random()}`,
            });
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Report CLS on page unload
        const reportCLS = () => {
          reportWebVitals({
            name: 'CLS',
            value: clsValue,
            rating: getPerformanceRating('CLS', clsValue),
            delta: clsValue,
            id: `v3-${Date.now()}-${Math.random()}`,
          });
        };

        window.addEventListener('beforeunload', reportCLS);
        window.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            reportCLS();
          }
        });

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              reportWebVitals({
                name: 'FCP',
                value: entry.startTime,
                rating: getPerformanceRating('FCP', entry.startTime),
                delta: entry.startTime,
                id: `v3-${Date.now()}-${Math.random()}`,
              });
            }
          });
        });
        fcpObserver.observe({ type: 'paint', buffered: true });

        // Time to First Byte (TTFB)
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          reportWebVitals({
            name: 'TTFB',
            value: ttfb,
            rating: getPerformanceRating('TTFB', ttfb),
            delta: ttfb,
            id: `v3-${Date.now()}-${Math.random()}`,
          });
        }

        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          fcpObserver.disconnect();
          window.removeEventListener('beforeunload', reportCLS);
        };
      } catch (error) {
        console.error('Performance monitoring error:', error);
      }
    }
  }, []);

  return null;
}
