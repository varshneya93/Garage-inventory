'use client';

import { useEffect } from 'react';
import { monitoring } from '@/lib/monitoring';

export function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    const reportWebVitals = (metric: any) => {
      monitoring.trackWebVitals({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
      });
    };

    // Use Next.js built-in web vitals reporting
    if ('web-vitals' in window) {
      import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        onCLS(reportWebVitals);
        onFID(reportWebVitals);
        onFCP(reportWebVitals);
        onLCP(reportWebVitals);
        onTTFB(reportWebVitals);
      });
    }
  }, []);

  return null;
}
