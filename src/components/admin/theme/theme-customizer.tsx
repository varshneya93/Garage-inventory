'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Palette, Type, Code, Eye, Save, Plus, Check, Trash2, Download, Upload, Copy } from 'lucide-react';
import { getAllCSSTemplates, getAllThemePresets } from '@/lib/theme-templates';

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
  id?: string;
  name: string;
  colors: ThemeColors;
  fonts?: ThemeFonts;
  customCss?: string;
  isActive: boolean;
}

const defaultColors: ThemeColors = {
  background: 'oklch(1 0 0)',
  foreground: 'oklch(0.145 0 0)',
  primary: 'oklch(0.205 0 0)',
  primaryForeground: 'oklch(0.985 0 0)',
  secondary: 'oklch(0.97 0 0)',
  secondaryForeground: 'oklch(0.205 0 0)',
  accent: 'oklch(0.97 0 0)',
  accentForeground: 'oklch(0.205 0 0)',
  muted: 'oklch(0.97 0 0)',
  mutedForeground: 'oklch(0.556 0 0)',
  card: 'oklch(1 0 0)',
  cardForeground: 'oklch(0.145 0 0)',
  border: 'oklch(0.922 0 0)',
  input: 'oklch(0.922 0 0)',
  ring: 'oklch(0.708 0 0)',
};

// Popular font options
const fontOptions = [
  { value: '', label: 'Default' },
  { value: "'Inter', sans-serif", label: 'Inter' },
  { value: "'Roboto', sans-serif", label: 'Roboto' },
  { value: "'Open Sans', sans-serif", label: 'Open Sans' },
  { value: "'Lato', sans-serif", label: 'Lato' },
  { value: "'Montserrat', sans-serif", label: 'Montserrat' },
  { value: "'Poppins', sans-serif", label: 'Poppins' },
  { value: "'Playfair Display', serif", label: 'Playfair Display' },
  { value: "'Merriweather', serif", label: 'Merriweather' },
  { value: "'Source Code Pro', monospace", label: 'Source Code Pro' },
  { value: "'JetBrains Mono', monospace", label: 'JetBrains Mono' },
];

// Color presets for quick selection
const colorPresets = {
  light: {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    primary: 'oklch(0.205 0 0)',
    primaryForeground: 'oklch(0.985 0 0)',
  },
  dark: {
    background: 'oklch(0.145 0 0)',
    foreground: 'oklch(0.985 0 0)',
    primary: 'oklch(0.922 0 0)',
    primaryForeground: 'oklch(0.205 0 0)',
  },
  blue: {
    background: 'oklch(0.98 0.01 240)',
    foreground: 'oklch(0.15 0.02 240)',
    primary: 'oklch(0.5 0.2 240)',
    primaryForeground: 'oklch(0.98 0.01 240)',
  },
  green: {
    background: 'oklch(0.98 0.01 140)',
    foreground: 'oklch(0.15 0.02 140)',
    primary: 'oklch(0.5 0.2 140)',
    primaryForeground: 'oklch(0.98 0.01 140)',
  },
  purple: {
    background: 'oklch(0.98 0.01 280)',
    foreground: 'oklch(0.15 0.02 280)',
    primary: 'oklch(0.5 0.2 280)',
    primaryForeground: 'oklch(0.98 0.01 280)',
  },
};

export function ThemeCustomizer() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<Theme>({
    name: 'New Theme',
    colors: defaultColors,
    fonts: {},
    customCss: '',
    isActive: false,
  });
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      const response = await fetch('/api/theme?all=true');
      const data = await response.json();
      if (data.success) {
        const parsedThemes = data.themes.map((theme: any) => ({
          ...theme,
          colors: JSON.parse(theme.colors),
          fonts: theme.fonts ? JSON.parse(theme.fonts) : {},
        }));
        setThemes(parsedThemes);
      }
    } catch (error) {
      console.error('Error fetching themes:', error);
      toast.error('Failed to fetch themes');
    }
  };

  const handleColorChange = (key: keyof ThemeColors, value: string) => {
    setCurrentTheme((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const handleFontChange = (key: keyof ThemeFonts, value: string) => {
    setCurrentTheme((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, [key]: value },
    }));
  };

  const handlePreview = () => {
    setIsPreview(true);
    applyThemeToDOM(currentTheme);
    toast.info('Preview mode enabled');
  };

  const handleResetPreview = () => {
    setIsPreview(false);
    const activeTheme = themes.find((t) => t.isActive);
    if (activeTheme) {
      applyThemeToDOM(activeTheme);
    }
    toast.info('Preview reset');
  };

  const applyThemeToDOM = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    if (theme.fonts?.heading) {
      root.style.setProperty('--font-heading', theme.fonts.heading);
    }
    if (theme.fonts?.body) {
      root.style.setProperty('--font-body', theme.fonts.body);
    }

    let customStyleElement = document.getElementById('custom-theme-css');
    if (theme.customCss) {
      if (!customStyleElement) {
        customStyleElement = document.createElement('style');
        customStyleElement.id = 'custom-theme-css';
        document.head.appendChild(customStyleElement);
      }
      customStyleElement.textContent = theme.customCss;
    } else if (customStyleElement) {
      customStyleElement.remove();
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = currentTheme.id ? `/api/theme/${currentTheme.id}` : '/api/theme';
      const method = currentTheme.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentTheme),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Theme ${currentTheme.id ? 'updated' : 'created'} successfully`);
        fetchThemes();
        setIsPreview(false);
      } else {
        toast.error(data.error || 'Failed to save theme');
      }
    } catch (error) {
      console.error('Error saving theme:', error);
      toast.error('Failed to save theme');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateTheme = async (themeId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/theme/${themeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Theme activated successfully');
        fetchThemes();
        // Reload page to apply new theme
        window.location.reload();
      } else {
        toast.error(data.error || 'Failed to activate theme');
      }
    } catch (error) {
      console.error('Error activating theme:', error);
      toast.error('Failed to activate theme');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTheme = async (themeId: string) => {
    if (!confirm('Are you sure you want to delete this theme?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/theme/${themeId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Theme deleted successfully');
        fetchThemes();
        if (currentTheme.id === themeId) {
          handleNewTheme();
        }
      } else {
        toast.error(data.error || 'Failed to delete theme');
      }
    } catch (error) {
      console.error('Error deleting theme:', error);
      toast.error('Failed to delete theme');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setIsPreview(false);
  };

  const handleNewTheme = () => {
    setCurrentTheme({
      name: 'New Theme',
      colors: defaultColors,
      fonts: {},
      customCss: '',
      isActive: false,
    });
    setIsPreview(false);
  };

  const handleExportTheme = () => {
    const dataStr = JSON.stringify(currentTheme, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Theme exported successfully');
  };

  const handleImportTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setCurrentTheme({
          ...imported,
          id: undefined, // Remove ID to create new theme
          isActive: false,
        });
        toast.success('Theme imported successfully');
      } catch (error) {
        toast.error('Invalid theme file');
      }
    };
    reader.readAsText(file);
  };

  const applyColorPreset = (preset: keyof typeof colorPresets) => {
    setCurrentTheme((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...colorPresets[preset],
      },
    }));
    toast.info(`Applied ${preset} color preset`);
  };

  const applyThemePreset = (presetKey: string) => {
    const presets = getAllThemePresets();
    const preset = presets.find((p) => p.key === presetKey);
    if (preset) {
      setCurrentTheme({
        ...currentTheme,
        name: preset.name,
        colors: preset.colors as ThemeColors,
        fonts: preset.fonts,
      });
      toast.success(`Applied ${preset.name} theme preset`);
    }
  };

  const insertCSSTemplate = (templateCss: string) => {
    setCurrentTheme((prev) => ({
      ...prev,
      customCss: prev.customCss
        ? `${prev.customCss}\n\n${templateCss}`
        : templateCss,
    }));
    toast.success('CSS template inserted');
  };

  const copyCSSTemplate = (templateCss: string) => {
    navigator.clipboard.writeText(templateCss);
    toast.success('CSS template copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Theme Customizer</h2>
          <p className="text-muted-foreground">Customize your portfolio theme with colors, fonts, and custom CSS</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewTheme} variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
          <Button onClick={handleExportTheme} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <label>
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </span>
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={handleImportTheme}
              className="hidden"
            />
          </label>
          {isPreview && (
            <Button onClick={handleResetPreview} variant="outline" size="sm">
              Reset Preview
            </Button>
          )}
          <Button onClick={handlePreview} variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={loading} size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {isPreview && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <CardContent className="pt-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <Eye className="inline mr-2 h-4 w-4" />
              Preview mode is active. Changes are temporary until you save the theme.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Configure colors, fonts, and custom CSS for your theme</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="colors">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">
                  <Palette className="mr-2 h-4 w-4" />
                  Colors
                </TabsTrigger>
                <TabsTrigger value="fonts">
                  <Type className="mr-2 h-4 w-4" />
                  Fonts
                </TabsTrigger>
                <TabsTrigger value="custom">
                  <Code className="mr-2 h-4 w-4" />
                  Custom CSS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="theme-name">Theme Name</Label>
                  <Input
                    id="theme-name"
                    value={currentTheme.name}
                    onChange={(e) => setCurrentTheme({ ...currentTheme, name: e.target.value })}
                    placeholder="Enter theme name"
                  />
                </div>

                <Separator />

                <div>
                  <Label className="mb-3 block">Theme Presets</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start with a pre-built theme and customize it to your needs
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {getAllThemePresets().map((preset) => (
                      <Button
                        key={preset.key}
                        variant="outline"
                        size="sm"
                        onClick={() => applyThemePreset(preset.key)}
                        className="h-auto py-3 flex flex-col items-start"
                      >
                        <span className="font-medium">{preset.name}</span>
                        <div className="flex gap-1 mt-2">
                          {Object.values(preset.colors).slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded-full border"
                              style={{ background: color }}
                            />
                          ))}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-3 block">Quick Color Adjustments</Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(colorPresets).map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        onClick={() => applyColorPreset(preset as keyof typeof colorPresets)}
                      >
                        {preset.charAt(0).toUpperCase() + preset.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="mb-3 block">Theme Colors</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(currentTheme.colors).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key} className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={key}
                            value={value}
                            onChange={(e) => handleColorChange(key as keyof ThemeColors, e.target.value)}
                            className="flex-1 font-mono text-xs"
                            placeholder="oklch(0.5 0.2 240)"
                          />
                          <div
                            className="w-12 h-10 rounded border-2 border-border cursor-pointer hover:scale-105 transition-transform"
                            style={{ background: value }}
                            title={value}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Tip:</strong> Use OKLCH color format for better color consistency. 
                    Format: oklch(lightness chroma hue) where lightness is 0-1, chroma is 0-0.4, and hue is 0-360.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="fonts" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="heading-font">Heading Font</Label>
                    <Select
                      value={currentTheme.fonts?.heading || ''}
                      onValueChange={(value) => handleFontChange('heading', value)}
                    >
                      <SelectTrigger id="heading-font">
                        <SelectValue placeholder="Select heading font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={currentTheme.fonts?.heading || ''}
                      onChange={(e) => handleFontChange('heading', e.target.value)}
                      placeholder="Or enter custom font family"
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body-font">Body Font</Label>
                    <Select
                      value={currentTheme.fonts?.body || ''}
                      onValueChange={(value) => handleFontChange('body', value)}
                    >
                      <SelectTrigger id="body-font">
                        <SelectValue placeholder="Select body font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font.value} value={font.value}>
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={currentTheme.fonts?.body || ''}
                      onChange={(e) => handleFontChange('body', e.target.value)}
                      placeholder="Or enter custom font family"
                      className="mt-2"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Font Preview</Label>
                  <div className="p-6 border rounded-lg space-y-4">
                    <h1 
                      className="text-4xl font-bold"
                      style={{ fontFamily: currentTheme.fonts?.heading || 'inherit' }}
                    >
                      Heading Preview
                    </h1>
                    <p 
                      className="text-base"
                      style={{ fontFamily: currentTheme.fonts?.body || 'inherit' }}
                    >
                      This is a preview of the body text. The quick brown fox jumps over the lazy dog. 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> Make sure to include the font in your project using Google Fonts or 
                    by hosting the font files. Custom fonts may not display correctly if not properly loaded.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6 mt-6">
                <div>
                  <Label className="mb-3 block">CSS Templates</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Quick-start with pre-built CSS snippets for common effects
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {getAllCSSTemplates().map((template) => (
                      <div
                        key={template.name}
                        className="p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{template.label}</span>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyCSSTemplate(template.css)}
                              title="Copy to clipboard"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => insertCSSTemplate(template.css)}
                              title="Insert into editor"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <pre className="text-xs text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                          {template.css.split('\n')[0]}...
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="custom-css">Custom CSS Editor</Label>
                  <p className="text-sm text-muted-foreground">
                    Add custom CSS to further customize your theme. This CSS will be injected into the page.
                  </p>
                  <Textarea
                    id="custom-css"
                    value={currentTheme.customCss || ''}
                    onChange={(e) => setCurrentTheme({ ...currentTheme, customCss: e.target.value })}
                    placeholder="/* Enter custom CSS here */&#10;.custom-class {&#10;  /* your styles */&#10;}"
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-medium">CSS Tips:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Use CSS variables like var(--primary) to reference theme colors</li>
                    <li>Target specific sections with classes like .hero, .work-card, etc.</li>
                    <li>Add animations, transitions, or custom effects</li>
                    <li>Override default styles with higher specificity</li>
                    <li>Use the templates above as starting points</li>
                  </ul>
                </div>

                <div className="p-4 border-yellow-500 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Warning:</strong> Custom CSS can break your site if not used carefully. 
                    Always preview your changes before saving.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Saved Themes</CardTitle>
              <CardDescription>Manage your theme collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className="flex items-center gap-2 p-2 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Button
                      variant={theme.id === currentTheme.id ? 'default' : 'ghost'}
                      className="flex-1 justify-start"
                      size="sm"
                      onClick={() => handleLoadTheme(theme)}
                    >
                      {theme.name}
                      {theme.isActive && (
                        <Check className="ml-auto h-4 w-4 text-green-500" />
                      )}
                    </Button>
                    {!theme.isActive && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => theme.id && handleActivateTheme(theme.id)}
                          title="Activate theme"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => theme.id && handleDeleteTheme(theme.id)}
                          title="Delete theme"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
                {themes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No saved themes yet. Create your first theme!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Actions</CardTitle>
              <CardDescription>Quick actions for theme management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="active-toggle">Set as Active</Label>
                <Switch
                  id="active-toggle"
                  checked={currentTheme.isActive}
                  onCheckedChange={(checked) =>
                    setCurrentTheme({ ...currentTheme, isActive: checked })
                  }
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Active themes are applied to your public portfolio
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
