"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SliderProps {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  infinite?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  animation?: "slide" | "fade" | "cross";
  duration?: number;
  onSlideChange?: (index: number) => void;
}

export function Slider({
  children,
  className,
  autoplay = false,
  autoplayDelay = 3000,
  infinite = true,
  showArrows = true,
  showDots = true,
  animation = "slide",
  duration = 500,
  onSlideChange,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  const goToSlide = React.useCallback(
    (index: number) => {
      if (isTransitioning) return;

      let newIndex = index;
      if (infinite) {
        if (index < 0) newIndex = totalSlides - 1;
        if (index >= totalSlides) newIndex = 0;
      } else {
        if (index < 0) newIndex = 0;
        if (index >= totalSlides) newIndex = totalSlides - 1;
      }

      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);

      setTimeout(() => {
        setIsTransitioning(false);
      }, duration);
    },
    [isTransitioning, totalSlides, infinite, duration, onSlideChange]
  );

  const goToPrevious = React.useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  const goToNext = React.useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // Autoplay
  React.useEffect(() => {
    if (!autoplay) return;

    const startAutoplay = () => {
      timerRef.current = setInterval(() => {
        goToNext();
      }, autoplayDelay);
    };

    startAutoplay();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoplay, autoplayDelay, goToNext]);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay) {
      timerRef.current = setInterval(() => {
        goToNext();
      }, autoplayDelay);
    }
  };

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        goToPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        goToNext();
        break;
      case "Home":
        e.preventDefault();
        goToSlide(0);
        break;
      case "End":
        e.preventDefault();
        goToSlide(totalSlides - 1);
        break;
    }
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transition: `all ${duration}ms ease-in-out`,
    };

    if (animation === "fade") {
      return {
        ...baseStyle,
        opacity: index === currentIndex ? 1 : 0,
        zIndex: index === currentIndex ? 1 : 0,
      };
    }

    if (animation === "cross") {
      return {
        ...baseStyle,
        opacity: index === currentIndex ? 1 : 0,
        transform: `translateX(${(index - currentIndex) * 100}%)`,
        zIndex: index === currentIndex ? 1 : 0,
      };
    }

    // Default slide animation
    return {
      ...baseStyle,
      transform: `translateX(${(index - currentIndex) * 100}%)`,
    };
  };

  return (
    <div
      ref={sliderRef}
      className={cn("relative w-full overflow-hidden", className)}
      role="region"
      aria-label="carousel"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            style={getSlideStyle(index)}
            aria-hidden={index !== currentIndex}
            role="group"
            aria-label={`Slide ${index + 1} of ${totalSlides}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={goToPrevious}
            disabled={!infinite && currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white"
            onClick={goToNext}
            disabled={!infinite && currentIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {totalSlides}
      </div>
    </div>
  );
}

export function SliderSlide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      {children}
    </div>
  );
}
