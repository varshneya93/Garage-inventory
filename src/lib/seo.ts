import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Generate metadata for Next.js pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/og-image.jpg',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    tags = [],
  } = config;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ryan-portfolio.vercel.app';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Ryan Portfolio',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      publishedTime,
      modifiedTime,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate JSON-LD structured data for a project
 */
export function generateProjectStructuredData(project: {
  id: string;
  title: string;
  description: string;
  images: Array<{ url: string; alt?: string }>;
  publishedAt?: Date;
  tags?: Array<{ name: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ryan-portfolio.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.images.map(img => 
      img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`
    ),
    datePublished: project.publishedAt?.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Ryan',
      jobTitle: 'Digital Designer & Creative Developer',
    },
    keywords: project.tags?.map(tag => tag.name).join(', '),
    url: `${baseUrl}/projects/${project.id}`,
  };
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateBlogPostStructuredData(post: {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  slug: string;
  publishedAt?: Date;
  updatedAt: Date;
  tags?: Array<{ name: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ryan-portfolio.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: 'Ryan',
      jobTitle: 'Digital Designer & Creative Developer',
    },
    keywords: post.tags?.map(tag => tag.name).join(', '),
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ryan-portfolio.vercel.app';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate robots meta tag content
 */
export function generateRobotsContent(options: {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
} = {}): string {
  const {
    index = true,
    follow = true,
    noarchive = false,
    nosnippet = false,
    noimageindex = false,
  } = options;

  const directives: string[] = [];
  
  directives.push(index ? 'index' : 'noindex');
  directives.push(follow ? 'follow' : 'nofollow');
  
  if (noarchive) directives.push('noarchive');
  if (nosnippet) directives.push('nosnippet');
  if (noimageindex) directives.push('noimageindex');

  return directives.join(', ');
}
