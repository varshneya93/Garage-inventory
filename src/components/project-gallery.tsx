'use client'

import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface ProjectGalleryProps {
  theme: string
  imagesLoaded: boolean
}

const projects = [
  {
    id: 1,
    title: 'Brand Identity',
    category: 'Branding',
    image: 'https://cdn.prod.website-files.com/68a23142177dc57b2d0b92c8/68a23291ebc8cd2d4b795276_11677013.jpg',
    year: '2024'
  },
  {
    id: 2,
    title: 'Digital Experience',
    category: 'Web Design',
    image: 'https://cdn.prod.website-files.com/68a23142177dc57b2d0b92c8/68a23261d001c130cc37db3f_79f3875a-e37c-4808-ab5a-0012b885cd.jpg',
    year: '2024'
  },
  {
    id: 3,
    title: 'Visual Campaign',
    category: 'Marketing',
    image: 'https://cdn.prod.website-files.com/68a23142177dc57b2d0b92c8/68a231ccccfcae2e34c71a77_2b9b2cfb-2e46-4091-b84a.jpg',
    year: '2023'
  },
  {
    id: 4,
    title: 'Product Launch',
    category: 'UI/UX',
    image: 'https://images.unsplash.com/photo-1559028006-44a26f564a87?w=800&h=600&fit=crop',
    year: '2023'
  }
]

export function ProjectGallery({ theme, imagesLoaded }: ProjectGalleryProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="work-card group cursor-pointer"
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            {!imagesLoaded ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="work-card-image w-full h-full object-cover"
                />
                <div className="work-card-overlay">
                  <div className="work-card-view text-center">
                    <div 
                      className={`text-6xl font-bold mb-2 ${theme === 'glass' ? 'glow' : ''}`}
                      style={{ color: 'var(--primary-foreground)' }}
                    >
                      VIEW
                    </div>
                    <div className="text-sm opacity-80" style={{ color: 'var(--primary-foreground)' }}>
                      {project.category}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-sm opacity-70">{project.category}</p>
            </div>
            <div className="text-sm opacity-50">{project.year}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
