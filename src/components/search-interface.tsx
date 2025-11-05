'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchInterfaceProps {
  onClose: () => void
  theme: string
}

const searchResults = [
  { id: 1, title: 'Brand Identity Project', type: 'Project', url: '#work' },
  { id: 2, title: 'Digital Experience', type: 'Project', url: '#work' },
  { id: 3, title: 'About Me', type: 'Page', url: '#about' },
  { id: 4, title: 'Contact', type: 'Page', url: '#contact' },
  { id: 5, title: 'Visual Campaign', type: 'Project', url: '#work' },
]

export function SearchInterface({ onClose, theme }: SearchInterfaceProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(searchResults)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchResults)
    } else {
      const filtered = searchResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(0)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const handleSelect = (result: typeof searchResults[0]) => {
    window.location.hash = result.url
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div 
        className={`relative w-full max-w-2xl rounded-lg overflow-hidden ${theme === 'glass' ? 'glass' : ''}`}
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="flex items-center gap-4 p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search projects, pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Search input"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-xs opacity-50"
            aria-label="Close search (ESC)"
          >
            ESC
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center opacity-50">
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={`w-full text-left p-4 transition-colors ${
                    index === selectedIndex
                      ? 'bg-accent'
                      : 'hover:bg-accent/50'
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm opacity-50">{result.type}</div>
                    </div>
                    <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t text-xs opacity-50 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-muted">↑</kbd>
              <kbd className="px-2 py-1 rounded bg-muted">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-muted">↵</kbd>
              Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 rounded bg-muted">ESC</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  )
}
