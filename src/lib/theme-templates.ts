/**
 * Theme Templates and CSS Examples
 * Provides pre-built theme configurations and CSS snippets for users
 */

export const cssTemplates = {
  animations: `/* Smooth fade-in animation */
.fade-in {
  animation: fadeIn 0.6s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hover glow effect */
.glow-on-hover:hover {
  box-shadow: 0 0 20px var(--primary),
              0 0 40px var(--primary);
  transition: box-shadow 0.3s ease;
}`,

  glassmorphism: `/* Glass card effect */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Glass button */
.glass-button {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.glass-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}`,

  gradients: `/* Animated gradient background */
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

/* Text gradient */
.gradient-text {
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`,

  cards: `/* Enhanced card hover effect */
.enhanced-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.enhanced-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.enhanced-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.enhanced-card:hover::before {
  left: 100%;
}`,

  buttons: `/* Liquid button effect */
.liquid-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.liquid-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.liquid-button:hover::before {
  width: 300px;
  height: 300px;
}

.liquid-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}`,

  scrollbar: `/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: var(--muted);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 5px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}`,

  typography: `/* Enhanced typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading, inherit);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

body {
  font-family: var(--font-body, inherit);
  line-height: 1.6;
}

.text-balance {
  text-wrap: balance;
}

.text-gradient {
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`,
};

export const themePresets = {
  modern: {
    name: 'Modern Light',
    colors: {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.145 0 0)',
      primary: 'oklch(0.5 0.2 240)',
      primaryForeground: 'oklch(0.985 0 0)',
      secondary: 'oklch(0.97 0 0)',
      secondaryForeground: 'oklch(0.205 0 0)',
      accent: 'oklch(0.85 0.15 280)',
      accentForeground: 'oklch(0.145 0 0)',
      muted: 'oklch(0.97 0 0)',
      mutedForeground: 'oklch(0.556 0 0)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.145 0 0)',
      border: 'oklch(0.922 0 0)',
      input: 'oklch(0.922 0 0)',
      ring: 'oklch(0.5 0.2 240)',
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
  },
  dark: {
    name: 'Dark Mode',
    colors: {
      background: 'oklch(0.145 0 0)',
      foreground: 'oklch(0.985 0 0)',
      primary: 'oklch(0.7 0.2 200)',
      primaryForeground: 'oklch(0.145 0 0)',
      secondary: 'oklch(0.269 0 0)',
      secondaryForeground: 'oklch(0.985 0 0)',
      accent: 'oklch(0.6 0.2 280)',
      accentForeground: 'oklch(0.985 0 0)',
      muted: 'oklch(0.269 0 0)',
      mutedForeground: 'oklch(0.708 0 0)',
      card: 'oklch(0.205 0 0)',
      cardForeground: 'oklch(0.985 0 0)',
      border: 'oklch(1 0 0 / 10%)',
      input: 'oklch(1 0 0 / 15%)',
      ring: 'oklch(0.7 0.2 200)',
    },
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Roboto', sans-serif",
    },
  },
  vibrant: {
    name: 'Vibrant',
    colors: {
      background: 'oklch(0.98 0.02 280)',
      foreground: 'oklch(0.15 0.02 280)',
      primary: 'oklch(0.55 0.25 320)',
      primaryForeground: 'oklch(0.98 0.02 280)',
      secondary: 'oklch(0.6 0.2 200)',
      secondaryForeground: 'oklch(0.98 0.02 280)',
      accent: 'oklch(0.65 0.25 40)',
      accentForeground: 'oklch(0.15 0.02 280)',
      muted: 'oklch(0.9 0.05 280)',
      mutedForeground: 'oklch(0.5 0.05 280)',
      card: 'oklch(0.98 0.02 280)',
      cardForeground: 'oklch(0.15 0.02 280)',
      border: 'oklch(0.85 0.05 280)',
      input: 'oklch(0.85 0.05 280)',
      ring: 'oklch(0.55 0.25 320)',
    },
    fonts: {
      heading: "'Montserrat', sans-serif",
      body: "'Open Sans', sans-serif",
    },
  },
  minimal: {
    name: 'Minimal',
    colors: {
      background: 'oklch(0.99 0 0)',
      foreground: 'oklch(0.2 0 0)',
      primary: 'oklch(0.3 0 0)',
      primaryForeground: 'oklch(0.99 0 0)',
      secondary: 'oklch(0.95 0 0)',
      secondaryForeground: 'oklch(0.3 0 0)',
      accent: 'oklch(0.9 0 0)',
      accentForeground: 'oklch(0.3 0 0)',
      muted: 'oklch(0.95 0 0)',
      mutedForeground: 'oklch(0.5 0 0)',
      card: 'oklch(0.99 0 0)',
      cardForeground: 'oklch(0.2 0 0)',
      border: 'oklch(0.9 0 0)',
      input: 'oklch(0.9 0 0)',
      ring: 'oklch(0.3 0 0)',
    },
    fonts: {
      heading: "'Helvetica Neue', sans-serif",
      body: "'Helvetica Neue', sans-serif",
    },
  },
};

export const getCSSTemplate = (templateName: keyof typeof cssTemplates): string => {
  return cssTemplates[templateName] || '';
};

export const getThemePreset = (presetName: keyof typeof themePresets) => {
  return themePresets[presetName] || null;
};

export const getAllCSSTemplates = () => {
  return Object.entries(cssTemplates).map(([name, css]) => ({
    name,
    label: name.charAt(0).toUpperCase() + name.slice(1),
    css,
  }));
};

export const getAllThemePresets = () => {
  return Object.entries(themePresets).map(([key, preset]) => ({
    key,
    ...preset,
  }));
};
