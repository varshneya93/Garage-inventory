# Theme Customization Guide

This guide explains how to use the enhanced theme customization system to personalize your portfolio's appearance.

## Overview

The theme customization system allows you to:
- Create and manage multiple themes
- Customize colors using OKLCH color format
- Select and preview fonts
- Add custom CSS for advanced styling
- Export and import themes
- Preview changes in real-time

## Accessing the Theme Customizer

Navigate to **Admin Dashboard → Settings → Theme** to access the theme customizer.

## Features

### 1. Theme Management

#### Creating a New Theme
1. Click the **"New"** button in the top toolbar
2. Enter a theme name
3. Configure colors, fonts, and custom CSS
4. Click **"Save"** to save your theme

#### Loading an Existing Theme
- Saved themes appear in the right sidebar
- Click on a theme name to load it into the editor
- The active theme is marked with a green checkmark

#### Activating a Theme
1. Load the theme you want to activate
2. Toggle the **"Set as Active"** switch in the Theme Actions card
3. Click **"Save"** to apply the theme to your public portfolio
4. Alternatively, click the checkmark icon next to a saved theme

#### Deleting a Theme
- Click the trash icon next to a theme in the sidebar
- Confirm the deletion
- Note: You cannot delete the currently active theme

### 2. Color Customization

#### Using Theme Presets
The **Colors** tab includes pre-built theme presets:
- **Modern Light**: Clean, professional light theme
- **Dark Mode**: Elegant dark theme with blue accents
- **Vibrant**: Colorful theme with bold colors
- **Minimal**: Simple, monochromatic theme

Click on a preset to apply it instantly. You can then customize individual colors.

#### Quick Color Adjustments
Use the quick color adjustment buttons to apply color schemes:
- Light
- Dark
- Blue
- Green
- Purple

#### Customizing Individual Colors
Each color variable can be customized:
- **Background**: Main background color
- **Foreground**: Main text color
- **Primary**: Primary brand color (buttons, links)
- **Secondary**: Secondary accent color
- **Accent**: Highlight color
- **Muted**: Subtle background color
- **Card**: Card background color
- **Border**: Border color
- And more...

#### OKLCH Color Format
Colors use the OKLCH format for better color consistency:
```
oklch(lightness chroma hue)
```
- **Lightness**: 0-1 (0 = black, 1 = white)
- **Chroma**: 0-0.4 (color intensity)
- **Hue**: 0-360 (color angle)

Examples:
- `oklch(0.5 0.2 240)` - Medium blue
- `oklch(0.9 0.1 140)` - Light green
- `oklch(0.2 0 0)` - Dark gray

### 3. Font Customization

#### Selecting Fonts
The **Fonts** tab provides:
- Dropdown menus with popular font options
- Custom input fields for any font family
- Live preview of selected fonts

#### Available Font Options
- Inter
- Roboto
- Open Sans
- Lato
- Montserrat
- Poppins
- Playfair Display
- Merriweather
- Source Code Pro
- JetBrains Mono

#### Custom Fonts
To use a custom font:
1. Enter the font family in the custom input field
2. Format: `'Font Name', fallback-family`
3. Example: `'My Custom Font', sans-serif`
4. Ensure the font is loaded via Google Fonts or hosted locally

#### Font Preview
The preview section shows how your selected fonts will look:
- Heading preview (large, bold text)
- Body text preview (paragraph text)

### 4. Custom CSS

#### CSS Templates
The **Custom CSS** tab includes ready-to-use templates:
- **Animations**: Fade-in effects and hover animations
- **Glassmorphism**: Glass card and button effects
- **Gradients**: Animated backgrounds and text gradients
- **Cards**: Enhanced card hover effects
- **Buttons**: Liquid button effects
- **Scrollbar**: Custom scrollbar styling
- **Typography**: Enhanced text styling

#### Using Templates
- Click the **copy icon** to copy a template to clipboard
- Click the **plus icon** to insert a template into the editor
- Templates can be combined and customized

#### Writing Custom CSS
The CSS editor supports:
- Syntax highlighting
- Multi-line editing
- CSS variables (e.g., `var(--primary)`)
- Targeting specific elements

#### CSS Tips
- Use CSS variables to reference theme colors
- Target sections with classes like `.hero`, `.work-card`
- Add animations and transitions
- Override default styles with higher specificity
- Always preview changes before saving

#### Example Custom CSS
```css
/* Custom hero section styling */
.hero {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  padding: 100px 0;
}

/* Enhanced card hover effect */
.work-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Custom button style */
.custom-button {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
```

### 5. Preview Mode

#### Enabling Preview
1. Click the **"Preview"** button in the toolbar
2. Your changes are applied temporarily
3. A yellow banner indicates preview mode is active
4. Navigate your site to see changes in context

#### Resetting Preview
- Click **"Reset Preview"** to revert to the active theme
- Changes are not saved unless you click "Save"

#### Best Practices
- Always preview changes before saving
- Test on different pages (home, projects, blog)
- Check responsiveness on mobile devices
- Verify text readability and contrast

### 6. Import/Export

#### Exporting a Theme
1. Load the theme you want to export
2. Click the **"Export"** button
3. A JSON file is downloaded with your theme configuration
4. Share this file or use it as a backup

#### Importing a Theme
1. Click the **"Import"** button
2. Select a theme JSON file
3. The theme is loaded into the editor
4. Customize if needed and save as a new theme

#### Theme File Format
```json
{
  "name": "My Custom Theme",
  "colors": {
    "background": "oklch(1 0 0)",
    "foreground": "oklch(0.145 0 0)",
    ...
  },
  "fonts": {
    "heading": "'Inter', sans-serif",
    "body": "'Roboto', sans-serif"
  },
  "customCss": "/* custom styles */"
}
```

## Best Practices

### Color Selection
- Maintain sufficient contrast for accessibility (WCAG AA: 4.5:1 for text)
- Use consistent color schemes across your theme
- Test colors in both light and dark environments
- Consider color blindness when choosing colors

### Font Selection
- Limit to 2-3 font families maximum
- Pair serif and sans-serif fonts for contrast
- Ensure fonts are readable at all sizes
- Consider loading performance (fewer fonts = faster)

### Custom CSS
- Keep CSS organized with comments
- Use meaningful class names
- Avoid overly specific selectors
- Test across different browsers
- Minimize use of `!important`

### Performance
- Optimize custom CSS (remove unused styles)
- Limit the number of custom fonts
- Use CSS variables for consistency
- Test page load times after changes

### Accessibility
- Ensure text has sufficient contrast
- Test with screen readers
- Maintain keyboard navigation
- Use semantic HTML with your styles

## Troubleshooting

### Theme Not Applying
- Ensure the theme is marked as active
- Clear browser cache and reload
- Check browser console for errors
- Verify custom CSS syntax

### Colors Not Displaying Correctly
- Check OKLCH format syntax
- Ensure values are within valid ranges
- Test in different browsers
- Verify CSS variable references

### Fonts Not Loading
- Confirm font is properly loaded (Google Fonts or local)
- Check font family name spelling
- Verify font format syntax
- Test with fallback fonts

### Custom CSS Not Working
- Check for syntax errors
- Verify selector specificity
- Look for conflicting styles
- Use browser DevTools to debug

## Advanced Techniques

### Creating a Glass Theme
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}
```

### Animated Gradient Background
```css
.gradient-bg {
  background: linear-gradient(
    135deg,
    var(--primary),
    var(--secondary),
    var(--accent)
  );
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Custom Scrollbar
```css
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--muted);
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 5px;
}
```

## Support

For additional help:
- Check the [Developer Guide](./DEVELOPER_GUIDE.md)
- Review the [Admin Guide](./ADMIN_GUIDE.md)
- Inspect existing themes for examples
- Use browser DevTools to experiment

## Resources

- [OKLCH Color Picker](https://oklch.com/)
- [Google Fonts](https://fonts.google.com/)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
