# Animation Utilities Documentation

Modern TypeScript implementation of animation and state management utilities, replacing the Webflow bundle with clean, maintainable code.

## Overview

This replaces the minified Webflow JavaScript bundle with three modern modules:
1. **animation-utils.ts** - Animation and easing functions
2. **state-utils.ts** - Immutable state management
3. **use-animation.ts** - React hooks for animations

## Animation Utilities

### Bezier Easing

Create custom easing functions using cubic bezier curves:

```typescript
import { createBezierEasing, easings } from "@/lib/animation-utils";

// Create custom easing
const customEasing = createBezierEasing(0.42, 0, 0.58, 1);

// Use predefined easings
const eased = easings.easeInOut(0.5); // Returns eased value
```

### Available Easings

- `linear` - No easing
- `easeIn` - Accelerating from zero velocity
- `easeOut` - Decelerating to zero velocity
- `easeInOut` - Acceleration until halfway, then deceleration
- `easeInQuad`, `easeOutQuad`, `easeInOutQuad` - Quadratic
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic` - Cubic
- `easeInQuart`, `easeOutQuart`, `easeInOutQuart` - Quartic

### Animation Controller

Control animations with start, pause, resume, and stop:

```typescript
import { AnimationController, easings } from "@/lib/animation-utils";

const controller = new AnimationController(
  1000, // duration in ms
  (progress) => {
    // Update callback (0 to 1)
    element.style.opacity = String(progress);
  },
  () => {
    // Complete callback
    console.log("Animation complete!");
  },
  easings.easeInOut // easing function
);

controller.start();
controller.pause();
controller.resume();
controller.stop();
```

### Animate Value

Animate a numeric value:

```typescript
import { animateValue, easings } from "@/lib/animation-utils";

animateValue(
  0, // from
  100, // to
  1000, // duration
  (value) => {
    // Update callback
    element.textContent = Math.round(value).toString();
  },
  {
    easing: easings.easeOutQuad,
    onComplete: () => console.log("Done!"),
  }
);
```

### Smooth Scroll

Smooth scroll to an element:

```typescript
import { smoothScrollTo, easings } from "@/lib/animation-utils";

const element = document.getElementById("target");

smoothScrollTo(element, {
  duration: 800,
  offset: 100, // pixels from top
  easing: easings.easeInOutQuad,
  onComplete: () => console.log("Scrolled!"),
});
```

### Performance Utilities

```typescript
import { debounce, throttle } from "@/lib/animation-utils";

// Debounce - wait for inactivity
const debouncedSearch = debounce((query: string) => {
  performSearch(query);
}, 300);

// Throttle - limit execution rate
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 100);
```

### Intersection Observer

Observe when elements enter viewport:

```typescript
import { observeIntersection } from "@/lib/animation-utils";

const cleanup = observeIntersection(
  element,
  (isIntersecting) => {
    if (isIntersecting) {
      element.classList.add("visible");
    }
  },
  {
    threshold: 0.5, // 50% visible
    rootMargin: "0px 0px -100px 0px",
  }
);

// Cleanup when done
cleanup();
```

## State Management Utilities

### Immutable Operations

```typescript
import { clone, merge, setIn, getIn, updateIn } from "@/lib/state-utils";

// Clone
const cloned = clone(originalObject);

// Merge
const merged = merge(obj1, obj2, obj3);

// Set nested value
const updated = setIn(state, ["user", "profile", "name"], "John");

// Get nested value
const name = getIn(state, ["user", "profile", "name"]);

// Update nested value
const incremented = updateIn(state, ["count"], (val) => val + 1);
```

### Array Utilities

```typescript
import { arrayUtils } from "@/lib/state-utils";

const arr = [1, 2, 3];

arrayUtils.addLast(arr, 4); // [1, 2, 3, 4]
arrayUtils.addFirst(arr, 0); // [0, 1, 2, 3]
arrayUtils.removeLast(arr); // [1, 2]
arrayUtils.removeFirst(arr); // [2, 3]
arrayUtils.insert(arr, 1, 1.5); // [1, 1.5, 2, 3]
arrayUtils.removeAt(arr, 1); // [1, 3]
arrayUtils.replaceAt(arr, 1, 5); // [1, 5, 3]
arrayUtils.move(arr, 0, 2); // [2, 3, 1]
arrayUtils.toggle(arr, 2); // Add or remove 2
```

### Object Utilities

```typescript
import { omit, pick } from "@/lib/state-utils";

const obj = { a: 1, b: 2, c: 3 };

omit(obj, ["b"]); // { a: 1, c: 3 }
pick(obj, ["a", "c"]); // { a: 1, c: 3 }
```

### Simple Store

```typescript
import { createStore } from "@/lib/state-utils";

const store = createStore(
  { count: 0 }, // initial state
  (state, action) => {
    // reducer
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 };
      default:
        return state;
    }
  }
);

// Subscribe to changes
const unsubscribe = store.subscribe((state) => {
  console.log("State:", state);
});

// Dispatch actions
store.dispatch({ type: "INCREMENT" });

// Get current state
const state = store.getState();

// Cleanup
unsubscribe();
```

### Function Composition

```typescript
import { compose, pipe } from "@/lib/state-utils";

const add1 = (x: number) => x + 1;
const multiply2 = (x: number) => x * 2;

// Compose (right to left)
const composed = compose(multiply2, add1);
composed(5); // (5 + 1) * 2 = 12

// Pipe (left to right)
const piped = pipe(add1, multiply2);
piped(5); // (5 + 1) * 2 = 12
```

### Memoization

```typescript
import { memoize, createSelector } from "@/lib/state-utils";

// Memoize function
const expensiveCalc = memoize((a: number, b: number) => {
  return a * b;
});

// Create selector with memoization
const selectUser = createSelector(
  (state: State) => state.users[state.currentUserId],
  (a, b) => a.id === b.id // custom equality
);
```

## React Animation Hooks

### useAnimatedValue

Animate a numeric value:

```typescript
import { useAnimatedValue } from "@/hooks/use-animation";

function Component() {
  const [target, setTarget] = useState(0);
  const value = useAnimatedValue(target, {
    duration: 500,
    easing: easings.easeInOut,
  });

  return <div style={{ opacity: value / 100 }}>Content</div>;
}
```

### useScrollAnimation

Trigger animations on scroll:

```typescript
import { useScrollAnimation } from "@/hooks/use-animation";

function Component() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(ref, {
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={isVisible ? "fade-in" : "fade-out"}>
      Content
    </div>
  );
}
```

### useSmoothScroll

Smooth scroll to elements:

```typescript
import { useSmoothScroll } from "@/hooks/use-animation";

function Component() {
  const scrollTo = useSmoothScroll();

  return (
    <button
      onClick={() =>
        scrollTo("#target", {
          duration: 800,
          offset: 100,
        })
      }
    >
      Scroll to Target
    </button>
  );
}
```

### useCountUp

Animated counter:

```typescript
import { useCountUp } from "@/hooks/use-animation";

function Component() {
  const { count, start, reset } = useCountUp(1000, {
    duration: 2000,
    decimals: 0,
    autoStart: false,
  });

  return (
    <div>
      <div>{count}</div>
      <button onClick={start}>Start</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### useFadeAnimation

Fade in/out:

```typescript
import { useFadeAnimation } from "@/hooks/use-animation";

function Component({ isVisible }: { isVisible: boolean }) {
  const { style } = useFadeAnimation(isVisible, {
    duration: 300,
  });

  return <div style={style}>Content</div>;
}
```

### useSlideAnimation

Slide animations:

```typescript
import { useSlideAnimation } from "@/hooks/use-animation";

function Component({ isVisible }: { isVisible: boolean }) {
  const { style } = useSlideAnimation(isVisible, "up", {
    duration: 500,
    distance: 20,
  });

  return <div style={style}>Content</div>;
}
```

### useSpring

Spring physics animations:

```typescript
import { useSpring } from "@/hooks/use-animation";

function Component() {
  const [target, setTarget] = useState(0);
  const value = useSpring(target, {
    stiffness: 170,
    damping: 26,
    mass: 1,
  });

  return <div style={{ transform: `translateX(${value}px)` }}>Content</div>;
}
```

### useParallax

Parallax scrolling effect:

```typescript
import { useParallax } from "@/hooks/use-animation";

function Component() {
  const { style } = useParallax(0.5);

  return <div style={style}>Parallax Content</div>;
}
```

### useHoverAnimation

Hover effects:

```typescript
import { useHoverAnimation } from "@/hooks/use-animation";

function Component() {
  const ref = useRef<HTMLDivElement>(null);
  const { style } = useHoverAnimation(ref, {
    scale: 1.05,
    duration: 200,
  });

  return (
    <div ref={ref} style={style}>
      Hover me!
    </div>
  );
}
```

## Migration from Webflow

### Before (Webflow)

```javascript
// Minified, hard to maintain
var e = {4345: function(e, t, i) {...}};
```

### After (Modern TypeScript)

```typescript
// Clean, typed, maintainable
import { animateValue, easings } from "@/lib/animation-utils";

animateValue(0, 100, 1000, (value) => {
  element.style.opacity = String(value / 100);
});
```

## Performance

All utilities are optimized for performance:
- ✅ Uses `requestAnimationFrame` for smooth animations
- ✅ Memoization to prevent unnecessary calculations
- ✅ Debounce and throttle for event handlers
- ✅ Immutable operations for predictable state
- ✅ TypeScript for compile-time optimization

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Examples

See the slider component (`src/components/ui/slider.tsx`) for real-world usage of these utilities.

## License

Part of the Portfolio Platform - MIT License
