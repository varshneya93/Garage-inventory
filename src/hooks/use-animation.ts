/**
 * Animation Hooks
 * React hooks for animations and transitions
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  AnimationController,
  animateValue,
  easings,
  smoothScrollTo,
  observeIntersection,
} from "@/lib/animation-utils";

/**
 * Hook for animated values
 */
export function useAnimatedValue(
  targetValue: number,
  options: {
    duration?: number;
    easing?: (t: number) => number;
    onComplete?: () => void;
  } = {}
) {
  const [value, setValue] = useState(targetValue);
  const controllerRef = useRef<AnimationController | null>(null);
  const previousValueRef = useRef(targetValue);

  useEffect(() => {
    if (previousValueRef.current === targetValue) return;

    // Stop previous animation
    controllerRef.current?.stop();

    // Start new animation
    controllerRef.current = animateValue(
      previousValueRef.current,
      targetValue,
      options.duration ?? 500,
      setValue,
      {
        easing: options.easing ?? easings.easeInOut,
        onComplete: options.onComplete,
      }
    );

    previousValueRef.current = targetValue;

    return () => {
      controllerRef.current?.stop();
    };
  }, [targetValue, options.duration, options.easing, options.onComplete]);

  return value;
}

/**
 * Hook for scroll animations
 */
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const cleanup = observeIntersection(
      element,
      (isIntersecting) => {
        if (isIntersecting) {
          setIsVisible(true);
          if (options.triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!options.triggerOnce || !hasTriggered) {
          setIsVisible(false);
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin,
      }
    );

    return cleanup;
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce, hasTriggered]);

  return isVisible;
}

/**
 * Hook for smooth scrolling
 */
export function useSmoothScroll() {
  const scrollTo = useCallback(
    (
      target: HTMLElement | string,
      options: {
        duration?: number;
        offset?: number;
        easing?: (t: number) => number;
        onComplete?: () => void;
      } = {}
    ) => {
      const element =
        typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;

      return smoothScrollTo(element, options);
    },
    []
  );

  return scrollTo;
}

/**
 * Hook for counter animation
 */
export function useCountUp(
  end: number,
  options: {
    start?: number;
    duration?: number;
    decimals?: number;
    autoStart?: boolean;
  } = {}
) {
  const {
    start = 0,
    duration = 2000,
    decimals = 0,
    autoStart = true,
  } = options;

  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const controllerRef = useRef<AnimationController | null>(null);

  const startAnimation = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    controllerRef.current = animateValue(
      start,
      end,
      duration,
      (value) => {
        setCount(Number(value.toFixed(decimals)));
      },
      {
        easing: easings.easeOutQuad,
        onComplete: () => setIsAnimating(false),
      }
    );
  }, [start, end, duration, decimals, isAnimating]);

  const reset = useCallback(() => {
    controllerRef.current?.stop();
    setCount(start);
    setIsAnimating(false);
  }, [start]);

  useEffect(() => {
    if (autoStart) {
      startAnimation();
    }

    return () => {
      controllerRef.current?.stop();
    };
  }, [autoStart, startAnimation]);

  return {
    count,
    isAnimating,
    start: startAnimation,
    reset,
  };
}

/**
 * Hook for fade in/out animations
 */
export function useFadeAnimation(
  isVisible: boolean,
  options: {
    duration?: number;
    easing?: (t: number) => number;
  } = {}
) {
  const opacity = useAnimatedValue(isVisible ? 1 : 0, {
    duration: options.duration ?? 300,
    easing: options.easing ?? easings.easeInOut,
  });

  return {
    opacity,
    style: {
      opacity,
      transition: `opacity ${options.duration ?? 300}ms`,
    },
  };
}

/**
 * Hook for slide animations
 */
export function useSlideAnimation(
  isVisible: boolean,
  direction: "up" | "down" | "left" | "right" = "up",
  options: {
    duration?: number;
    distance?: number;
  } = {}
) {
  const { duration = 500, distance = 20 } = options;
  const offset = useAnimatedValue(isVisible ? 0 : distance, {
    duration,
    easing: easings.easeOutQuad,
  });

  const getTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${offset}px)`;
      case "down":
        return `translateY(-${offset}px)`;
      case "left":
        return `translateX(${offset}px)`;
      case "right":
        return `translateX(-${offset}px)`;
    }
  };

  return {
    offset,
    style: {
      transform: getTransform(),
      opacity: isVisible ? 1 : 0,
      transition: `all ${duration}ms`,
    },
  };
}

/**
 * Hook for spring animations
 */
export function useSpring(
  targetValue: number,
  options: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  } = {}
) {
  const { stiffness = 170, damping = 26, mass = 1 } = options;
  const [value, setValue] = useState(targetValue);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const spring = -stiffness * (value - targetValue);
      const damper = -damping * velocityRef.current;
      const acceleration = (spring + damper) / mass;

      velocityRef.current += acceleration * deltaTime;
      const newValue = value + velocityRef.current * deltaTime;

      setValue(newValue);

      // Continue animation if not settled
      if (Math.abs(newValue - targetValue) > 0.01 || Math.abs(velocityRef.current) > 0.01) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetValue, stiffness, damping, mass, value]);

  return value;
}

/**
 * Hook for parallax effect
 */
export function useParallax(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return {
    offset,
    style: {
      transform: `translateY(${offset}px)`,
    },
  };
}

/**
 * Hook for mouse position tracking
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

/**
 * Hook for hover animations
 */
export function useHoverAnimation(
  ref: React.RefObject<HTMLElement>,
  options: {
    scale?: number;
    duration?: number;
  } = {}
) {
  const { scale = 1.05, duration = 200 } = options;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref]);

  return {
    isHovered,
    style: {
      transform: `scale(${isHovered ? scale : 1})`,
      transition: `transform ${duration}ms ease-out`,
    },
  };
}
