interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: Date;
}

interface AnalyticsConfig {
  googleAnalyticsId?: string;
  plausibleDomain?: string;
  mixpanelToken?: string;
}

export class AnalyticsIntegration {
  private config: AnalyticsConfig;
  private initialized: boolean = false;

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  initialize() {
    if (this.initialized) return;

    // Initialize Google Analytics
    if (this.config.googleAnalyticsId && typeof window !== 'undefined') {
      this.initializeGoogleAnalytics();
    }

    // Initialize Plausible
    if (this.config.plausibleDomain && typeof window !== 'undefined') {
      this.initializePlausible();
    }

    this.initialized = true;
  }

  private initializeGoogleAnalytics() {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
    script.async = true;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', this.config.googleAnalyticsId);

    (window as any).gtag = gtag;
  }

  private initializePlausible() {
    const script = document.createElement('script');
    script.src = 'https://plausible.io/js/script.js';
    script.defer = true;
    script.setAttribute('data-domain', this.config.plausibleDomain!);
    document.head.appendChild(script);
  }

  trackPageView(url: string, title?: string) {
    // Google Analytics
    if (this.config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('config', this.config.googleAnalyticsId, {
        page_path: url,
        page_title: title,
      });
    }

    // Plausible (automatically tracks page views)
    if (this.config.plausibleDomain && (window as any).plausible) {
      (window as any).plausible('pageview');
    }
  }

  trackEvent(event: AnalyticsEvent) {
    // Google Analytics
    if (this.config.googleAnalyticsId && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.properties);
    }

    // Plausible
    if (this.config.plausibleDomain && (window as any).plausible) {
      (window as any).plausible(event.name, { props: event.properties });
    }

    // Also track in our internal analytics
    this.trackInternalEvent(event);
  }

  private async trackInternalEvent(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event.name,
          data: event.properties,
          page: window.location.pathname,
        }),
      });
    } catch (error) {
      console.error('Error tracking internal event:', error);
    }
  }

  trackProjectView(projectId: string, projectTitle: string) {
    this.trackEvent({
      name: 'project_view',
      properties: {
        project_id: projectId,
        project_title: projectTitle,
      },
    });
  }

  trackContactFormSubmit(success: boolean) {
    this.trackEvent({
      name: 'contact_form_submit',
      properties: {
        success,
      },
    });
  }

  trackBlogPostView(postId: string, postTitle: string) {
    this.trackEvent({
      name: 'blog_post_view',
      properties: {
        post_id: postId,
        post_title: postTitle,
      },
    });
  }

  trackSearch(query: string, resultsCount: number) {
    this.trackEvent({
      name: 'search',
      properties: {
        query,
        results_count: resultsCount,
      },
    });
  }
}

export function createAnalyticsIntegration() {
  const config: AnalyticsConfig = {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    mixpanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
  };

  return new AnalyticsIntegration(config);
}
