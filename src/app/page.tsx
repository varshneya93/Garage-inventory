'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ContactForm } from '@/components/contact-form'
import { ProjectGallery } from '@/components/project-gallery'
import { SearchInterface } from '@/components/search-interface'

type Theme = 'light' | 'dark' | 'pastel' | 'bold' | 'glass'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)
  const [counter3, setCounter3] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [theme, setTheme] = useState<Theme>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [imageWidth, setImageWidth] = useState(0)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light'
    setTheme(savedTheme)
    document.documentElement.className = savedTheme === 'dark' ? 'dark' : savedTheme === 'pastel' ? 'theme-pastel' : savedTheme === 'bold' ? 'theme-bold' : savedTheme === 'glass' ? 'theme-glass' : ''
    
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme === 'dark' ? 'dark' : theme === 'pastel' ? 'theme-pastel' : theme === 'bold' ? 'theme-bold' : theme === 'glass' ? 'theme-glass' : ''
  }, [theme])

  // Preload images
  useEffect(() => {
    const images = [
      'https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1e2b0478c76ab4391293b_image-01.jpg',
      'https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1e2b0ccd947662b8af1db_image-02.jpg',
      'https://cdn.prod.website-files.com/68a23142177dc57b2d0b92c8/68a23291ebc8cd2d4b795276_11677013.jpg',
      'https://cdn.prod.website-files.com/68a23142177dc57b2d0b92c8/68a23261d001c130cc37db3f_79f3875a-e37c-4808-ab5a-0012b885cd.jpg',
      'https://cdn.prod.website-files.com/68a23142177dc57b2d0b92c8/68a231ccccfcae2e34c71a77_2b9b2cfb-2e46-4091-b84a.jpg',
      'https://images.unsplash.com/photo-1559028006-44a26f564a87?w=800&h=600&fit=crop'
    ]

    let loadedCount = 0
    const totalImages = images.length

    const handleImageLoad = () => {
      loadedCount++
      if (loadedCount === totalImages) {
        setImagesLoaded(true)
      }
    }

    images.forEach(src => {
      const img = new Image()
      img.onload = handleImageLoad
      img.onerror = handleImageLoad // Count as loaded even on error
      img.src = src
    })
  }, [])

  // Animate image width from 0% to 100% to 0% with lazy easing
  // Switch images only after complete cycle
  useEffect(() => {
    let progress = 0
    const duration = 4000 // 4 seconds for full cycle (open + close)
    const startTime = Date.now()
    let lastCycleCount = 0
    
    // Easing function for lazy/smooth effect
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2
    }
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const totalCycles = Math.floor(elapsed / duration)
      progress = (elapsed % duration) / duration
      
      // Switch image only when a complete cycle finishes
      if (totalCycles > lastCycleCount) {
        setCurrentImage((prev) => (prev + 1) % 2)
        lastCycleCount = totalCycles
      }
      
      // Create a 0 -> 1 -> 0 pattern
      const normalizedProgress = progress < 0.5 
        ? progress * 2 
        : (1 - progress) * 2
      
      // Apply easing
      const easedProgress = easeInOutCubic(normalizedProgress)
      const width = easedProgress * 100
      
      setImageWidth(width)
      requestAnimationFrame(animate)
    }
    
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate counters when in view
            const target1 = 7
            const target2 = 50
            const target3 = 15
            
            let current1 = 0
            let current2 = 0
            let current3 = 0
            
            const increment1 = Math.ceil(target1 / 50)
            const increment2 = Math.ceil(target2 / 50)
            const increment3 = Math.ceil(target3 / 50)
            
            const timer = setInterval(() => {
              current1 = Math.min(current1 + increment1, target1)
              current2 = Math.min(current2 + increment2, target2)
              current3 = Math.min(current3 + increment3, target3)
              
              setCounter1(current1)
              setCounter2(current2)
              setCounter3(current3)
              
              if (current1 >= target1 && current2 >= target2 && current3 >= target3) {
                clearInterval(timer)
              }
            }, 30)
          }
        })
      },
      { threshold: 0.5 }
    )

    const counterSection = document.getElementById('counters')
    if (counterSection) {
      observer.observe(counterSection)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'work']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cycleTheme = () => {
    const themes: Theme[] = ['light', 'dark', 'pastel', 'bold', 'glass']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  // Loading screen component
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <div className="text-center space-y-8">
          <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <h1 className="text-2xl font-bold animate-pulse">Loading Portfolio...</h1>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${theme === 'glass' ? 'theme-glass' : ''}`} style={{ backgroundColor: 'var(--hero-bg)', color: 'var(--hero-text)' }}>
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md shadow-sm' : ''}`} 
        style={{ backgroundColor: scrolled ? 'var(--background)' : 'transparent' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold" role="img" aria-label="Ryan Logo">Ryan</div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              <a 
                href="#home" 
                className={`hover:opacity-70 transition-opacity ${activeSection === 'home' ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                role="menuitem"
                aria-current={activeSection === 'home' ? 'page' : undefined}
              >
                Home
              </a>
              <a 
                href="#about" 
                className={`hover:opacity-70 transition-opacity ${activeSection === 'about' ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                role="menuitem"
                aria-current={activeSection === 'about' ? 'page' : undefined}
              >
                About me
              </a>
              <a 
                href="#work" 
                className={`hover:opacity-70 transition-opacity ${activeSection === 'work' ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                role="menuitem"
                aria-current={activeSection === 'work' ? 'page' : undefined}
              >
                Work
              </a>
              <Button 
                onClick={() => setShowSearch(true)}
                className="rounded-full px-4 py-2 transition-all duration-300 hover:scale-105"
                variant="outline"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                aria-label="Search"
              >
                🔍
              </Button>
              <Button 
                onClick={cycleTheme}
                className="rounded-full px-4 py-2 transition-all duration-300 hover:scale-105"
                variant="outline"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                🎨
              </Button>
              <Button 
                onClick={() => setShowContactForm(true)}
                className={`rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 ${theme === 'glass' ? 'glass-button glow-hover' : ''}`}
                style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
              >
                Get in touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative z-50"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`bg-current transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                  <span className={`bg-current transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-current transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          />
          <div 
            id="mobile-menu"
            className="fixed right-0 top-0 h-full w-64 max-w-full" 
            style={{ backgroundColor: 'var(--background)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col p-6 pt-20 h-full">
              <nav className="flex flex-col space-y-6" role="menubar" aria-orientation="vertical">
                <a 
                  href="#home" 
                  className={`text-lg font-medium hover:opacity-70 transition-opacity ${activeSection === 'home' ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#about" 
                  className={`text-lg font-medium hover:opacity-70 transition-opacity ${activeSection === 'about' ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About me
                </a>
                <a 
                  href="#work" 
                  className={`text-lg font-medium hover:opacity-70 transition-opacity ${activeSection === 'work' ? 'opacity-100 font-semibold' : 'opacity-80'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Work
                </a>
                <Button 
                  onClick={() => {
                    setShowSearch(true)
                    setMobileMenuOpen(false)
                  }}
                  className="rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 w-full"
                  variant="outline"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  🔍 Search
                </Button>
                <Button 
                  onClick={cycleTheme}
                  className="rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 w-full"
                  variant="outline"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  🎨 Theme
                </Button>
                <Button 
                  onClick={() => {
                    setShowContactForm(true)
                    setMobileMenuOpen(false)
                  }}
                  className={`rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 w-full ${theme === 'glass' ? 'glass-button glow-hover' : ''}`}
                  style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  Get in touch
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20" aria-labelledby="hero-title">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full" id="main-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="overflow-hidden">
                <h1 id="hero-title" className="text-6xl lg:text-8xl font-bold transform translate-y-0 animate-fade-in">
                  Digital
                </h1>
              </div>
              
              {/* Profile Image */}
              <div className="relative w-full h-96 lg:h-[500px] overflow-hidden rounded-lg">
                {!imagesLoaded ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  <div className="relative w-full h-full">
                    <div 
                      style={{ 
                        width: `${imageWidth}%`, 
                        height: '100%', 
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        overflow: 'hidden'
                      }}
                    >
                      <img 
                        src="https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1e2b0478c76ab4391293b_image-01.jpg"
                        alt="Profile"
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          height: '100%',
                          width: 'auto',
                          maxWidth: 'none'
                        }}
                        className={`transition-opacity duration-1000 ${currentImage === 0 ? 'opacity-100' : 'opacity-0'}`}
                      />
                      <img 
                        src="https://cdn.prod.website-files.com/68a1c165154550987a80046f/68a1e2b0ccd947662b8af1db_image-02.jpg"
                        alt="Profile"
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                          height: '100%',
                          width: 'auto',
                          maxWidth: 'none'
                        }}
                        className={`transition-opacity duration-1000 ${currentImage === 1 ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="overflow-hidden">
                  <h1 className="text-6xl lg:text-8xl font-bold transform translate-y-0 animate-fade-in">
                    Designer
                  </h1>
                </div>
                <span className="text-2xl">ⓒ</span>
              </div>
            </div>

            {/* Right Content - Social Links */}
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="flex flex-col space-y-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z"/>
                  </svg>
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.9887 11.5716C19.9029 9.94513 19.3313 8.44745 18.4163 7.22097C18.1749 7.48407 17.8785 7.7698 17.4957 8.09159C16.5881 8.85458 15.4887 9.54307 14.1834 10.101C14.3498 10.4506 14.5029 10.7899 14.6376 11.1098L14.6388 11.1125C14.6652 11.1742 14.6879 11.2306 14.7321 11.3418C14.7379 11.3562 14.7433 11.3697 14.7485 11.3825C16.2621 11.2122 17.8576 11.2749 19.4049 11.4845C19.6106 11.5123 19.805 11.5415 19.9887 11.5716ZM10.6044 4.1213C10.7783 4.36621 10.9602 4.62859 11.1803 4.95378C11.7929 5.8589 12.396 6.81391 12.9604 7.79507C13.0749 7.99416 13.187 8.19289 13.2964 8.39112C14.5193 7.90993 15.5296 7.30281 16.3438 6.62486C16.6731 6.35063 16.9383 6.093 17.1403 5.86972C15.7501 4.70277 13.9571 4 12 4C11.524 4 11.0576 4.04158 10.6044 4.1213ZM4.25266 9.99755C4.83145 9.98452 5.48467 9.94941 6.29303 9.87518C7.90024 9.72758 9.54141 9.46249 11.1549 9.05274C10.5719 8.03721 9.93888 7.02331 9.29452 6.05378C8.98479 5.58775 8.68357 5.14992 8.45484 4.82642C6.39541 5.84613 4.83794 7.72658 4.25266 9.99755ZM5.78366 17.036C6.17111 16.4693 6.68061 15.8314 7.35797 15.1374C8.81199 13.6478 10.5286 12.4878 12.5139 11.8473C12.5417 11.8391 12.5604 11.8336 12.576 11.829C12.411 11.4651 12.2562 11.1405 12.1003 10.8342C10.2643 11.3687 8.3303 11.703 6.40279 11.8762C5.46319 11.9606 4.62005 11.9981 4 12.0044C4.00102 13.9112 4.66915 15.662 5.78366 17.036ZM15.0045 19.4166C14.9001 18.8745 14.7669 18.2706 14.5899 17.574C14.2689 16.3112 13.8668 15.012 13.373 13.7078C11.3712 14.4343 9.77574 15.4974 8.54309 16.7649C7.94904 17.3757 7.51244 17.9537 7.22642 18.4203C8.55892 19.4127 10.2109 20 12 20C13.0626 20 14.0769 19.7928 15.0045 19.4166ZM16.8778 18.3414C18.4073 17.1632 19.4985 15.444 19.8652 13.4703C19.5253 13.3865 19.094 13.3005 18.6196 13.2346C17.5756 13.0897 16.5014 13.0655 15.4409 13.2018C15.8933 14.4764 16.2642 15.7332 16.5608 16.9361C16.6903 17.4614 16.7958 17.9358 16.8778 18.3414ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"/>
                  </svg>
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.44262 5.34998C8.08197 5.34998 8.67213 5.39945 9.21311 5.54786C9.7541 5.6468 10.1967 5.84468 10.5902 6.09203C10.9836 6.33938 11.2787 6.68566 11.4754 7.13089C11.6721 7.57612 11.7705 8.12029 11.7705 8.71393C11.7705 9.40651 11.623 10.0002 11.2787 10.4454C10.9836 10.8906 10.4918 11.2864 9.90164 11.5832C10.7377 11.8305 11.377 12.2758 11.7705 12.8694C12.1639 13.463 12.4098 14.2051 12.4098 15.0461C12.4098 15.7387 12.2623 16.3323 12.0164 16.827C11.7705 17.3217 11.377 17.7669 10.9344 18.0638C10.4918 18.3606 9.95082 18.6079 9.36066 18.7563C8.77049 18.9047 8.18033 19.0037 7.59016 19.0037H1V5.34998H7.44262ZM7.04918 10.8906C7.59016 10.8906 8.03279 10.7422 8.37705 10.4949C8.72131 10.2475 8.86885 9.80227 8.86885 9.2581C8.86885 8.96128 8.81967 8.66446 8.72131 8.46658C8.62295 8.2687 8.47541 8.12029 8.27869 7.97188C8.08197 7.87294 7.88525 7.774 7.63934 7.72453C7.39344 7.67506 7.14754 7.67506 6.85246 7.67506H4V10.8906H7.04918ZM7.19672 16.7281C7.4918 16.7281 7.78689 16.6786 8.03279 16.6291C8.27869 16.5797 8.52459 16.4807 8.72131 16.3323C8.91803 16.1839 9.06557 16.0355 9.21311 15.7881C9.31148 15.5408 9.40984 15.244 9.40984 14.8977C9.40984 14.2051 9.21312 13.7104 8.81967 13.3641C8.42623 13.0673 7.88525 12.9189 7.2459 12.9189H4V16.7281H7.19672ZM16.6885 16.6786C17.082 17.0744 17.6721 17.2722 18.459 17.2722C19 17.2722 19.4918 17.1238 19.8852 16.8765C20.2787 16.5797 20.5246 16.2828 20.623 15.986H23.0328C22.6393 17.1733 22.0492 18.0143 21.2623 18.5585C20.4754 19.0532 19.541 19.35 18.4098 19.35C17.6229 19.35 16.9344 19.2016 16.2951 18.9542C15.6557 18.7069 15.1639 18.3606 14.7213 17.8659C14.2787 17.4206 13.9344 16.8765 13.7377 16.2334C13.4918 15.5903 13.3934 14.8977 13.3934 14.1062C13.3934 13.3641 13.4918 12.6715 13.7377 12.0284C13.9836 11.3853 14.3279 10.8411 14.7705 10.3464C15.2131 9.90121 15.7541 9.50545 16.3443 9.2581C16.9836 9.01075 17.6229 8.86234 18.4098 8.86234C19.2459 8.86234 19.9836 9.01075 20.623 9.35704C21.2623 9.70333 21.7541 10.0991 22.1475 10.6927C22.541 11.2369 22.8361 11.88 23.0328 12.5726C23.1311 13.2652 23.1803 13.9577 23.1311 14.7493H16C16 15.5408 16.2951 16.2828 16.6885 16.6786ZM19.7869 11.4843C19.4426 11.138 18.9016 10.9401 18.2623 10.9401C17.8197 10.9401 17.4754 11.039 17.1803 11.1874C16.8852 11.3358 16.6885 11.5337 16.4918 11.7316C16.2951 11.9295 16.1967 12.1768 16.1475 12.4242C16.0984 12.6715 16.0492 12.8694 16.0492 13.0673H20.4754C20.3771 12.3252 20.1311 11.8305 19.7869 11.4843ZM15.459 6.2899H20.9672V7.62559H15.459V6.2899Z"/>
                  </svg>
                </a>
              </div>
              
              {/* Animated Circle Text */}
              <div className="relative w-32 h-32">
                <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                  <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"></path>
                  </defs>
                  <text className="fill-current text-xs font-medium uppercase tracking-wider">
                    <textPath href="#circle" startOffset="0%">
                      • Digital Designer • Creative Portfolio • Visual Stories • 
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>
              
              {/* Theme Indicator */}
              <div className="text-center">
                <div className="text-sm opacity-70 mb-2">Theme: {theme}</div>
                <Button 
                  onClick={cycleTheme}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  Change Theme
                </Button>
              </div>
              
              {/* Scroll Down Indicator */}
              <div className="animate-bounce">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Text Banner */}
      <section className="py-8 overflow-hidden" style={{ backgroundColor: 'var(--accent-color)' }}>
        <div className="relative">
          <div className="flex animate-scroll-left whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-8 mx-8">
                <h2 className="text-4xl font-bold">Crafting</h2>
                <h2 className="text-4xl font-bold opacity-60">©visual</h2>
                <h2 className="text-4xl font-bold">stories ✺</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20" style={{ backgroundColor: 'var(--section-bg)', color: 'var(--section-text)' }} aria-labelledby="about-title">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="text-lg font-medium">• I'm Ryan</div>
            
            <div className="space-y-8">
              <h2 id="about-title" className="text-3xl font-bold mb-6 sr-only">About Me</h2>
              <p className="text-lg leading-relaxed">
                A digital designer passionate about crafting visual experiences that blend creativity, strategy, and technology. My work focuses on turning ideas into intuitive designs that connect with people and elevate brands.
              </p>
              
              {/* Counters */}
              <div id="counters" className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold">
                    +{counter1}
                  </div>
                  <div className="text-sm opacity-70">
                    Years of experience in digital design.
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold">
                    +{counter2}
                  </div>
                  <div className="text-sm opacity-70">
                    Projects delivered for global clients.
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold">
                    +{counter3}
                  </div>
                  <div className="text-sm opacity-70">
                    Design awards for creativity and innovation.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="mt-16" />
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20" style={{ backgroundColor: 'var(--accent-color)' }} aria-labelledby="work-title">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-end mb-16">
            <div className="text-lg">2025©</div>
            <div className="text-center">
              <h2 id="work-title" className="text-5xl lg:text-6xl font-bold">Selected</h2>
              <h2 className="text-5xl lg:text-6xl font-bold">Work</h2>
            </div>
            <div className="text-right text-4xl font-bold opacity-30">04</div>
          </div>
          
          {/* Work Grid - Dynamic Project Gallery */}
          <ProjectGallery theme={theme} imagesLoaded={imagesLoaded} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm">© 2025 Ryan. All rights reserved.</p>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm 
          onClose={() => setShowContactForm(false)} 
          theme={theme}
        />
      )}

      {/* Search Interface */}
      {showSearch && (
        <SearchInterface 
          onClose={() => setShowSearch(false)} 
          theme={theme}
        />
      )}

    </div>
  )
}