/**
 * Analytics tracking utilities for client-side event tracking
 */

export type AnalyticsEvent = 
  | 'page_view'
  | 'project_view'
  | 'project_click'
  | 'blog_view'
  | 'blog_click'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'search_query'
  | 'filter_applied'
  | 'external_link_click';

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  page?: string;
  data?: Record<string, any>;
}

/**
 * Check if user has consented to analytics tracking
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('analytics_consent');
  return consent === 'true';
}

/**
 * Set analytics consent
 */
export function setAnalyticsConsent(consent: boolean): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('analytics_consent', consent.toString());
  localStorage.setItem('analytics_consent_date', new Date().toISOString());
}

/**
 * Track an analytics event
 */
export async function trackEvent(
  event: AnalyticsEvent,
  data?: Record<string, any>
): Promise<void> {
  // Check consent first
  if (!hasAnalyticsConsent()) {
    return;
  }

  try {
    const eventData: AnalyticsEventData = {
      event,
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      data,
    };

    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
  } catch (error) {
    // Silently fail - don't disrupt user experience
    console.error('Analytics tracking error:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(page?: string): void {
  trackEvent('page_view', {
    page: page || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  });
}

/**
 * Track project interaction
 */
export function trackProjectView(projectId: string, projectTitle: string): void {
  trackEvent('project_view', {
    projectId,
    projectTitle,
  });
}

export function trackProjectClick(projectId: string, projectTitle: string): void {
  trackEvent('project_click', {
    projectId,
    projectTitle,
  });
}

/**
 * Track blog interaction
 */
export function trackBlogView(blogId: string, blogTitle: string): void {
  trackEvent('blog_view', {
    blogId,
    blogTitle,
  });
}

export function trackBlogClick(blogId: string, blogTitle: string): void {
  trackEvent('blog_click', {
    blogId,
    blogTitle,
  });
}

/**
 * Track contact form
 */
export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit');
}

export function trackContactFormSuccess(): void {
  trackEvent('contact_form_success');
}

/**
 * Track search
 */
export function trackSearch(query: string, resultsCount: number): void {
  trackEvent('search_query', {
    query,
    resultsCount,
  });
}

/**
 * Track filter application
 */
export function trackFilterApplied(filterType: string, filterValue: string): void {
  trackEvent('filter_applied', {
    filterType,
    filterValue,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, label?: string): void {
  trackEvent('external_link_click', {
    url,
    label,
  });
}
