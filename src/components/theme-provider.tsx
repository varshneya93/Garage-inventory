'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  ring: string;
}

interface ThemeFonts {
  heading?: string;
  body?: string;
}

interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts?: ThemeFonts;
  customCss?: string;
  isActive: boolean;
}

interface ThemeContextType {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
  previewTheme: (theme: Theme) => void;
  resetPreview: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [previewingTheme, setPreviewingTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch active theme on mount
    setIsLoading(true);
    fetch('/api/theme')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.theme) {
          const parsedTheme = {
            ...data.theme,
            colors: JSON.parse(data.theme.colors),
            fonts: data.theme.fonts ? JSON.parse(data.theme.fonts) : undefined,
          };
          setTheme(parsedTheme);
          applyTheme(parsedTheme);
        }
      })
      .catch((error) => console.error('Error fetching theme:', error))
      .finally(() => setIsLoading(false));
  }, []);

  const applyTheme = (themeToApply: Theme) => {
    const root = document.documentElement;
    
    // Apply colors
    Object.entries(themeToApply.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    // Apply fonts
    if (themeToApply.fonts?.heading) {
      root.style.setProperty('--font-heading', themeToApply.fonts.heading);
    }
    if (themeToApply.fonts?.body) {
      root.style.setProperty('--font-body', themeToApply.fonts.body);
    }

    // Apply custom CSS
    let customStyleElement = document.getElementById('custom-theme-css');
    if (themeToApply.customCss) {
      if (!customStyleElement) {
        customStyleElement = document.createElement('style');
        customStyleElement.id = 'custom-theme-css';
        document.head.appendChild(customStyleElement);
      }
      customStyleElement.textContent = themeToApply.customCss;
    } else if (customStyleElement) {
      customStyleElement.remove();
    }
  };

  const previewTheme = (themeToPreview: Theme) => {
    setPreviewingTheme(themeToPreview);
    applyTheme(themeToPreview);
  };

  const resetPreview = () => {
    if (theme) {
      applyTheme(theme);
    }
    setPreviewingTheme(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: previewingTheme || theme,
        setTheme,
        applyTheme,
        previewTheme,
        resetPreview,
      }}
    >
      {!isLoading && children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
