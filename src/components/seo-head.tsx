'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: any;
}

export function SEOHead({
  title,
  description,
  image = '/og-image.jpg',
  url,
  type = 'website',
  structuredData,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
      }
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', description);

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:type', type);
    if (url) {
      updateMetaTag('og:url', url);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Add structured data if provided
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-seo]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, image, url, type, structuredData]);

  return null;
}
