# Slider Component Documentation

A modern, accessible, and customizable slider/carousel component for the Portfolio Platform.

## Features

✅ **Fully Accessible** - WCAG 2.1 AA compliant with keyboard navigation and screen reader support
✅ **Touch/Swipe Support** - Works seamlessly on mobile devices
✅ **Autoplay** - Optional automatic slide progression
✅ **Multiple Animations** - Slide, fade, and cross animations
✅ **Infinite Loop** - Optional infinite scrolling
✅ **Keyboard Navigation** - Arrow keys, Home, and End support
✅ **Customizable** - Flexible styling and configuration
✅ **TypeScript** - Full type safety
✅ **Performance Optimized** - Smooth transitions with CSS transforms

## Installation

The slider component is already included in your project at:
- `src/components/ui/slider.tsx`
- `src/components/examples/slider-example.tsx`

## Basic Usage

```tsx
import { Slider, SliderSlide } from "@/components/ui/slider";

export function MySlider() {
  return (
    <Slider className="h-[400px]">
      <SliderSlide>
        <div>Slide 1 Content</div>
      </SliderSlide>
      <SliderSlide>
        <div>Slide 2 Content</div>
      </SliderSlide>
      <SliderSlide>
        <div>Slide 3 Content</div>
      </SliderSlide>
    </Slider>
  );
}
```

## Props

### Slider Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Slider slides (use `SliderSlide` components) |
| `className` | `string` | `undefined` | Additional CSS classes |
| `autoplay` | `boolean` | `false` | Enable automatic slide progression |
| `autoplayDelay` | `number` | `3000` | Delay between slides in milliseconds |
| `infinite` | `boolean` | `true` | Enable infinite loop |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `showDots` | `boolean` | `true` | Show dot indicators |
| `animation` | `"slide" \| "fade" \| "cross"` | `"slide"` | Transition animation type |
| `duration` | `number` | `500` | Transition duration in milliseconds |
| `onSlideChange` | `(index: number) => void` | `undefined` | Callback when slide changes |

### SliderSlide Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Slide content |
| `className` | `string` | `undefined` | Additional CSS classes |

## Examples

### 1. Basic Image Slider

```tsx
import { Slider, SliderSlide } from "@/components/ui/slider";
import Image from "next/image";

export function ImageSlider() {
  return (
    <Slider className="h-[500px] rounded-lg">
      <SliderSlide>
        <Image
          src="/images/slide1.jpg"
          alt="Slide 1"
          fill
          className="object-cover"
        />
      </SliderSlide>
      <SliderSlide>
        <Image
          src="/images/slide2.jpg"
          alt="Slide 2"
          fill
          className="object-cover"
        />
      </SliderSlide>
    </Slider>
  );
}
```

### 2. Autoplay Slider with Fade Animation

```tsx
export function AutoplaySlider() {
  return (
    <Slider
      className="h-[400px]"
      autoplay
      autoplayDelay={5000}
      animation="fade"
      infinite
    >
      <SliderSlide className="bg-blue-500">
        <h2 className="text-white text-4xl">Slide 1</h2>
      </SliderSlide>
      <SliderSlide className="bg-green-500">
        <h2 className="text-white text-4xl">Slide 2</h2>
      </SliderSlide>
      <SliderSlide className="bg-purple-500">
        <h2 className="text-white text-4xl">Slide 3</h2>
      </SliderSlide>
    </Slider>
  );
}
```

### 3. Project Portfolio Slider

```tsx
export function ProjectSlider({ projects }) {
  return (
    <Slider
      className="h-[600px] rounded-xl shadow-2xl"
      autoplay
      autoplayDelay={4000}
      animation="slide"
      onSlideChange={(index) => {
        console.log(`Viewing project: ${projects[index].title}`);
      }}
    >
      {projects.map((project) => (
        <SliderSlide key={project.id}>
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
              <h3 className="text-white text-3xl font-bold mb-2">
                {project.title}
              </h3>
              <p className="text-white/90 text-lg mb-4">
                {project.description}
              </p>
              <button className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100">
                View Project
              </button>
            </div>
          </div>
        </SliderSlide>
      ))}
    </Slider>
  );
}
```

### 4. Testimonial Slider (No Arrows)

```tsx
export function TestimonialSlider({ testimonials }) {
  return (
    <Slider
      className="h-[300px] bg-white rounded-lg"
      autoplay
      autoplayDelay={6000}
      showArrows={false}
      animation="cross"
    >
      {testimonials.map((testimonial, index) => (
        <SliderSlide key={index} className="p-12">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-2xl italic mb-6">
              "{testimonial.quote}"
            </p>
            <p className="font-semibold text-lg">{testimonial.author}</p>
            <p className="text-gray-600">{testimonial.role}</p>
          </div>
        </SliderSlide>
      ))}
    </Slider>
  );
}
```

### 5. Hero Slider with Custom Controls

```tsx
export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <Slider
        className="h-screen"
        autoplay
        autoplayDelay={7000}
        animation="fade"
        onSlideChange={setCurrentSlide}
      >
        <SliderSlide className="bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="text-white text-center">
            <h1 className="text-6xl font-bold mb-4">Welcome</h1>
            <p className="text-2xl">To our amazing portfolio</p>
          </div>
        </SliderSlide>
        <SliderSlide className="bg-gradient-to-r from-green-600 to-teal-600">
          <div className="text-white text-center">
            <h1 className="text-6xl font-bold mb-4">Explore</h1>
            <p className="text-2xl">Our latest projects</p>
          </div>
        </SliderSlide>
      </Slider>
      
      <div className="text-center mt-4">
        Current Slide: {currentSlide + 1}
      </div>
    </div>
  );
}
```

## Keyboard Navigation

The slider supports full keyboard navigation:

- **Arrow Left** - Go to previous slide
- **Arrow Right** - Go to next slide
- **Home** - Go to first slide
- **End** - Go to last slide
- **Tab** - Focus navigation controls

## Touch/Swipe Support

On touch devices:
- **Swipe Left** - Go to next slide
- **Swipe Right** - Go to previous slide

Minimum swipe distance: 50px

## Accessibility Features

### ARIA Attributes

The slider includes proper ARIA attributes:
- `role="region"` - Identifies the slider region
- `aria-label="carousel"` - Labels the carousel
- `aria-live="polite"` - Announces slide changes
- `aria-hidden` - Hides inactive slides from screen readers
- `aria-current` - Indicates current slide in dots
- `aria-label` on controls - Descriptive labels for buttons

### Screen Reader Support

- Announces current slide number and total slides
- Provides descriptive labels for all controls
- Hides inactive slides from screen readers
- Announces slide changes politely

### Keyboard Accessibility

- All controls are keyboard accessible
- Logical tab order
- Visible focus indicators
- Standard keyboard shortcuts

## Animation Types

### Slide (Default)
Slides horizontally from one slide to the next.
```tsx
<Slider animation="slide">
```

### Fade
Fades out current slide and fades in next slide.
```tsx
<Slider animation="fade">
```

### Cross
Combines slide and fade for a crossfade effect.
```tsx
<Slider animation="cross">
```

## Autoplay Behavior

When autoplay is enabled:
- Automatically advances to next slide after delay
- Pauses on mouse hover
- Pauses on keyboard focus
- Resumes when mouse leaves or focus is lost
- Respects infinite loop setting

```tsx
<Slider
  autoplay
  autoplayDelay={5000}  // 5 seconds
  infinite
>
```

## Styling

### Custom Styling

Add custom classes to the slider:

```tsx
<Slider className="h-[600px] rounded-2xl shadow-xl border-4 border-white">
```

### Custom Arrow Styling

The arrows use the Button component from shadcn/ui. You can customize them by modifying the Button component or by adding custom CSS.

### Custom Dot Styling

Dots can be styled using Tailwind classes. The component uses:
- `bg-white` for active dot
- `bg-white/50` for inactive dots
- `w-8` for active dot width
- `w-2` for inactive dot width

## Performance Optimization

The slider is optimized for performance:

1. **CSS Transforms** - Uses `transform` for smooth animations
2. **Transition Control** - Prevents rapid clicking during transitions
3. **Cleanup** - Properly cleans up timers and event listeners
4. **Memoization** - Uses React.useCallback for stable function references

## Best Practices

### 1. Set Explicit Height

Always set a height on the slider:
```tsx
<Slider className="h-[400px]">
```

### 2. Optimize Images

Use Next.js Image component for automatic optimization:
```tsx
<Image
  src="/image.jpg"
  alt="Description"
  fill
  className="object-cover"
  priority  // For above-the-fold images
/>
```

### 3. Limit Autoplay Delay

Don't make autoplay too fast:
```tsx
autoplayDelay={5000}  // Good: 5 seconds
autoplayDelay={1000}  // Bad: Too fast
```

### 4. Provide Alt Text

Always include descriptive alt text for images:
```tsx
<Image src="/project.jpg" alt="E-commerce website homepage" />
```

### 5. Test on Mobile

Always test touch/swipe functionality on actual mobile devices.

## Troubleshooting

### Slides Not Showing

Make sure to set a height on the slider:
```tsx
<Slider className="h-[400px]">
```

### Autoplay Not Working

Check that autoplay is enabled and delay is set:
```tsx
<Slider autoplay autoplayDelay={3000}>
```

### Images Not Loading

Use Next.js Image component with proper configuration:
```tsx
<Image src="/image.jpg" alt="..." fill className="object-cover" />
```

### Transitions Jerky

Reduce the number of slides or optimize images. Also check that duration is reasonable:
```tsx
<Slider duration={500}>  // 500ms is good
```

## Browser Support

The slider works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- `Button` - Used for navigation arrows
- `Image` - Next.js image optimization
- `Card` - Can be used within slides

## Examples in the Codebase

See `src/components/examples/slider-example.tsx` for complete working examples.

## Contributing

To improve the slider component:
1. Make changes in `src/components/ui/slider.tsx`
2. Test with examples in `slider-example.tsx`
3. Update this documentation
4. Submit a pull request

## License

Part of the Portfolio Platform - MIT License
