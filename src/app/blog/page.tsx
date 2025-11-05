'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchPosts()
  }, [page, selectedCategory, selectedTag, searchQuery])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        status: 'PUBLISHED',
        page: page.toString(),
        limit: '9',
      })

      if (selectedCategory) {
        params.append('category', selectedCategory)
      }

      if (selectedTag) {
        params.append('tag', selectedTag)
      }

      if (searchQuery) {
        params.append('search', searchQuery)
      }

      const response = await fetch(`/api/blog?${params}`)
      const data = await response.json()

      if (data.success) {
        setPosts(data.data)
        setTotalPages(data.pagination.totalPages)

        // Extract unique categories and tags
        const allCategories = new Set<string>()
        const allTags = new Set<string>()
        data.data.forEach((post: BlogPost) => {
          post.categories.forEach(cat => allCategories.add(cat.name))
          post.tags.forEach(tag => allTags.add(tag.name))
        })
        setCategories(Array.from(allCategories))
        setTags(Array.from(allTags))
      }
    } catch (error) {
      console.error('Failed to fetch blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category)
    setSelectedTag(null)
    setPage(1)
  }

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag)
    setSelectedCategory(null)
    setPage(1)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Header */}
      <header className="py-20" style={{ backgroundColor: 'var(--hero-bg)', color: 'var(--hero-text)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold">Blog</h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Insights, stories, and thoughts on design, creativity, and technology
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full"
                  style={{ 
                    backgroundColor: 'var(--input)', 
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)'
                  }}
                />
              </div>
            </div>

            {/* Category Filters */}
            {categories.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 opacity-70">Categories</h3>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    onClick={() => handleCategoryFilter(null)}
                    size="sm"
                    style={selectedCategory === null ? { 
                      backgroundColor: 'var(--primary)', 
                      color: 'var(--primary-foreground)' 
                    } : {
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)'
                    }}
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => handleCategoryFilter(category)}
                      size="sm"
                      style={selectedCategory === category ? { 
                        backgroundColor: 'var(--primary)', 
                        color: 'var(--primary-foreground)' 
                      } : {
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                      }}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Filters */}
            {tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-3 opacity-70">Tags</h3>
                <div className="flex gap-2 flex-wrap">
                  {tags.slice(0, 10).map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => handleTagFilter(selectedTag === tag ? null : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading && posts.length === 0 ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
                  <Skeleton className="w-full h-48" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg opacity-70">No blog posts found</p>
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group rounded-lg overflow-hidden transition-transform hover:scale-105"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <article>
                    {/* Featured Image Placeholder */}
                    <div 
                      className="w-full h-48 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    >
                      <svg className="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                      </svg>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2 group-hover:opacity-80 transition-opacity">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="opacity-70 mb-3 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.slice(0, 2).map(cat => (
                          <Badge key={cat.id} variant="secondary" className="text-xs">
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                      {post.publishedAt && (
                        <p className="text-sm opacity-50">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1 || loading}
                variant="outline"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Previous
              </Button>
              <div className="flex items-center px-4">
                <span className="text-sm">
                  Page {page} of {totalPages}
                </span>
              </div>
              <Button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages || loading}
                variant="outline"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                Next
              </Button>
            </div>
          )}
        </div>
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
