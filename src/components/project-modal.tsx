'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import ReactMarkdown from 'react-markdown'

interface ProjectImage {
  id: string
  url: string
  alt: string | null
  sortOrder: number
}

interface ProjectTag {
  id: string
  name: string
}

interface ProjectCategory {
  id: string
  name: string
}

interface Project {
  id: string
  title: string
  slug: string
  description: string | null
  content: string | null
  status: string
  featured: boolean
  publishedAt: string | null
  images: ProjectImage[]
  tags: ProjectTag[]
  categories: ProjectCategory[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
  theme: string
}

export function ProjectModal({ project, onClose, theme }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowLeft') {
      handlePrevImage()
    } else if (e.key === 'ArrowRight') {
      handleNextImage()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div 
        className={`w-full max-w-5xl my-8 ${theme === 'glass' ? 'glass glow' : ''}`}
        style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 id="project-modal-title" className="text-3xl font-bold">{project.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Carousel */}
          {project.images.length > 0 && (
            <div className="relative">
              <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
                <img
                  src={project.images[currentImageIndex]?.url}
                  alt={project.images[currentImageIndex]?.alt || project.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Carousel Controls */}
                {project.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                      aria-label="Previous image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                      aria-label="Next image"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnail Strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex 
                          ? 'border-primary scale-105' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{ borderColor: index === currentImageIndex ? 'var(--primary)' : 'transparent' }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {project.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="opacity-80">{project.description}</p>
            </div>
          )}

          {/* Content */}
          {project.content && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="prose prose-sm max-w-none opacity-80">
                <ReactMarkdown>{project.content}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Categories and Tags */}
          <div className="flex flex-wrap gap-4">
            {project.categories.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 opacity-70">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map(cat => (
                    <Badge key={cat.id} variant="secondary">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {project.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 opacity-70">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag.id} variant="outline">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Published Date */}
          {project.publishedAt && (
            <div className="text-sm opacity-50">
              Published: {new Date(project.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
