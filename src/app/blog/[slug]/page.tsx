'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import ReactMarkdown from 'react-markdown'
import { SEOHead } from '@/components/seo-head'
import { generateBlogPostStructuredData } from '@/lib/seo'
import { trackBlogView } from '@/lib/analytics'

interface BlogTag {
  id: string
  name: string
}

interface BlogCategory {
  id: string
  name: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  status: string
  featured: boolean
  publishedAt: string | null
  tags: BlogTag[]
  categories: BlogCategory[]
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  useEffect(() => {
    if (post) {
      trackBlogView(post.id, post.title)
    }
  }, [post])

  const fetchPost = async (slug: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/blog?search=${slug}&status=PUBLISHED&limit=1`)
      const data = await response.json()

      if (data.success && data.data.length > 0) {
        const foundPost = data.data.find((p: BlogPost) => p.slug === slug)
        if (foundPost) {
          setPost(foundPost)
          // Fetch related posts based on categories
          if (foundPost.categories.length > 0) {
            fetchRelatedPosts(foundPost.id, foundPost.categories[0].name)
          }
        } else {
          setError('Blog post not found')
        }
      } else {
        setError('Blog post not found')
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error)
      setError('Failed to load blog post')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async (currentPostId: string, category: string) => {
    try {
      const response = await fetch(`/api/blog?category=${category}&status=PUBLISHED&limit=3`)
      const data = await response.json()

      if (data.success) {
        // Filter out current post
        const related = data.data.filter((p: BlogPost) => p.id !== currentPostId)
        setRelatedPosts(related.slice(0, 3))
      }
    } catch (error) {
      console.error('Failed to fetch related posts:', error)
    }
  }

  const handleShare = (platform: string) => {
    if (!post) return

    const url = window.location.href
    const title = post.title

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-1/2 mb-12" />
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl opacity-70">{error || 'Blog post not found'}</p>
          <Link href="/blog">
            <Button style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const structuredData = generateBlogPostStructuredData({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || undefined,
    content: post.content,
    slug: post.slug,
    publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
    updatedAt: new Date(),
    tags: post.tags,
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <SEOHead
        title={`${post.title} | Ryan Blog`}
        description={post.excerpt || post.content.slice(0, 160)}
        url={`/blog/${post.slug}`}
        type="article"
        structuredData={structuredData}
      />
      {/* Header */}
      <header className="py-12" style={{ backgroundColor: 'var(--hero-bg)', color: 'var(--hero-text)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 opacity-70 hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {post.categories.map(cat => (
                <Badge key={cat.id} variant="secondary">
                  {cat.name}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold">{post.title}</h1>
            
            {post.excerpt && (
              <p className="text-xl opacity-80">{post.excerpt}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm opacity-70">
              {post.publishedAt && (
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              <span>•</span>
              <span>{Math.ceil(post.content.length / 1000)} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <article className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold mb-3 opacity-70">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag.id} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="border-t border-b py-8 mb-12" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-lg font-semibold mb-4">Share this post</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874Z"/>
                </svg>
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyLink}
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group rounded-lg overflow-hidden transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--card)' }}
                  >
                    <div 
                      className="w-full h-32 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      <svg className="w-12 h-12 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      {relatedPost.publishedAt && (
                        <p className="text-sm opacity-50">
                          {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <footer className="py-12 mt-20" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm">© 2025 Ryan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
