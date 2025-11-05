/**
 * Animation Utilities
 * Modern TypeScript implementation of animation helpers
 */

/**
 * Bezier easing function generator
 * Creates cubic bezier easing functions for smooth animations
 */
export function createBezierEasing(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): (t: number) => number {
  // Validate input
  if (!(x1 >= 0 && x1 <= 1 && x2 >= 0 && x2 <= 1)) {
    throw new Error("Bezier x values must be in [0, 1] range");
  }

  // Linear case
  if (x1 === y1 && x2 === y2) {
    return (t: number) => t;
  }

  // Precompute samples
  const sampleValues = new Float32Array(11);
  for (let i = 0; i < 11; i++) {
    sampleValues[i] = calcBezier(i * 0.1, x1, x2);
  }

  function calcBezier(t: number, a1: number, a2: number): number {
    return ((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t * 3 * a1 * t;
  }

  function getSlope(t: number, a1: number, a2: number): number {
    return 3 * (1 - 3 * a2 + 3 * a1) * t * t + 2 * (3 * a2 - 6 * a1) * t + 3 * a1;
  }

  function getTForX(x: number): number {
    let intervalStart = 0;
    let currentSample = 1;
    const lastSample = 10;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= x; ++currentSample) {
      intervalStart += 0.1;
    }
    --currentSample;

    const dist = (x - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    const guessForT = intervalStart + dist * 0.1;
    const initialSlope = getSlope(guessForT, x1, x2);

    if (initialSlope >= 0.001) {
      return newtonRaphsonIterate(x, guessForT);
    } else if (initialSlope === 0) {
      return guessForT;
    } else {
      return binarySubdivide(x, intervalStart, intervalStart + 0.1);
    }
  }

  function newtonRaphsonIterate(x: number, guessT: number): number {
    for (let i = 0; i < 4; i++) {
      const currentSlope = getSlope(guessT, x1, x2);
      if (currentSlope === 0) return guessT;
      const currentX = calcBezier(guessT, x1, x2) - x;
      guessT -= currentX / currentSlope;
    }
    return guessT;
  }

  function binarySubdivide(x: number, a: number, b: number): number {
    let currentX: number;
    let currentT: number;
    let i = 0;

    do {
      currentT = a + (b - a) / 2;
      currentX = calcBezier(currentT, x1, x2) - x;
      if (currentX > 0) {
        b = currentT;
      } else {
        a = currentT;
      }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);

    return currentT;
  }

  return function (t: number): number {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return calcBezier(getTForX(t), y1, y2);
  };
}

/**
 * Common easing functions
 */
export const easings = {
  linear: (t: number) => t,
  easeIn: createBezierEasing(0.42, 0, 1, 1),
  easeOut: createBezierEasing(0, 0, 0.58, 1),
  easeInOut: createBezierEasing(0.42, 0, 0.58, 1),
  easeInQuad: createBezierEasing(0.55, 0.085, 0.68, 0.53),
  easeOutQuad: createBezierEasing(0.25, 0.46, 0.45, 0.94),
  easeInOutQuad: createBezierEasing(0.455, 0.03, 0.515, 0.955),
  easeInCubic: createBezierEasing(0.55, 0.055, 0.675, 0.19),
  easeOutCubic: createBezierEasing(0.215, 0.61, 0.355, 1),
  easeInOutCubic: createBezierEasing(0.645, 0.045, 0.355, 1),
  easeInQuart: createBezierEasing(0.895, 0.03, 0.685, 0.22),
  easeOutQuart: createBezierEasing(0.165, 0.84, 0.44, 1),
  easeInOutQuart: createBezierEasing(0.77, 0, 0.175, 1),
} as const;

/**
 * Animation frame utilities
 */
export class AnimationController {
  private rafId: number | null = null;
  private startTime: number | null = null;
  private pausedTime: number = 0;
  private isPaused: boolean = false;

  constructor(
    private duration: number,
    private onUpdate: (progress: number) => void,
    private onComplete?: () => void,
    private easing: (t: number) => number = easings.easeInOut
  ) {}

  start(): void {
    this.startTime = performance.now() - this.pausedTime;
    this.isPaused = false;
    this.animate();
  }

  pause(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isPaused = true;
    if (this.startTime !== null) {
      this.pausedTime = performance.now() - this.startTime;
    }
  }

  resume(): void {
    if (this.isPaused) {
      this.start();
    }
  }

  stop(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.startTime = null;
    this.pausedTime = 0;
    this.isPaused = false;
  }

  private animate = (): void => {
    if (this.startTime === null) return;

    const currentTime = performance.now();
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    const easedProgress = this.easing(progress);

    this.onUpdate(easedProgress);

    if (progress < 1) {
      this.rafId = requestAnimationFrame(this.animate);
    } else {
      this.onComplete?.();
      this.stop();
    }
  };
}

/**
 * Animate a value from start to end
 */
export function animateValue(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  options: {
    easing?: (t: number) => number;
    onComplete?: () => void;
  } = {}
): AnimationController {
  const { easing = easings.easeInOut, onComplete } = options;
  const range = to - from;

  const controller = new AnimationController(
    duration,
    (progress) => {
      const value = from + range * progress;
      onUpdate(value);
    },
    onComplete,
    easing
  );

  controller.start();
  return controller;
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  let lastResult: ReturnType<T>;

  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const context = this;

    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(context, args);

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }

    return lastResult;
  };
}

/**
 * Request animation frame with fallback
 */
export const raf =
  typeof window !== "undefined"
    ? window.requestAnimationFrame ||
      ((callback: FrameRequestCallback) => window.setTimeout(callback, 1000 / 60))
    : (callback: FrameRequestCallback) => setTimeout(callback, 1000 / 60);

/**
 * Cancel animation frame with fallback
 */
export const caf =
  typeof window !== "undefined"
    ? window.cancelAnimationFrame || clearTimeout
    : clearTimeout;

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(
  element: HTMLElement | null,
  options: {
    duration?: number;
    offset?: number;
    easing?: (t: number) => number;
    onComplete?: () => void;
  } = {}
): AnimationController | null {
  if (!element) return null;

  const {
    duration = 800,
    offset = 0,
    easing = easings.easeInOutQuad,
    onComplete,
  } = options;

  const startPosition = window.pageYOffset;
  const targetPosition = element.getBoundingClientRect().top + startPosition - offset;

  return animateValue(
    startPosition,
    targetPosition,
    duration,
    (value) => {
      window.scrollTo(0, value);
    },
    { easing, onComplete }
  );
}

/**
 * Intersection Observer helper
 */
export function observeIntersection(
  element: HTMLElement,
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        callback(entry.isIntersecting);
      });
    },
    {
      threshold: 0.1,
      ...options,
    }
  );

  observer.observe(element);

  return () => observer.disconnect();
}
