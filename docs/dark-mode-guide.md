# Dark Mode Implementation Guide

## Overview

This project now includes a comprehensive dark mode implementation using `next-themes` and Tailwind CSS. The implementation provides a clean, consistent dark theme across the entire application.

## Features Implemented

### 🌓 Theme Toggle Components

- **ThemeToggle**: A dropdown menu with Light, Dark, and System options
- **ThemeToggleSimple**: A simple button that toggles between light and dark modes
- Both components include smooth animations and proper accessibility

### 🎨 Theme Configuration

- **CSS Variables**: All colors are defined using CSS custom properties in `globals.css`
- **Tailwind Integration**: Configured with `darkMode: ['class']` for manual theme switching
- **System Preference**: Automatic detection and respect for user's system preference

### 🔧 Provider Setup

- **ThemeProvider**: Wraps the entire application with theme context
- **SSR Support**: Proper handling to prevent hydration mismatches
- **Persistence**: Theme choice is saved in localStorage

## Files Modified/Created

### New Files

1. `src/components/providers/theme-provider.tsx` - Theme context provider
2. `src/components/ui/theme-toggle.tsx` - Dropdown theme toggle
3. `src/components/ui/theme-toggle-simple.tsx` - Simple theme toggle button
4. `src/components/theme/index.ts` - Export barrel file

### Modified Files

1. `src/app/layout.tsx` - Added theme provider wrapper
2. `src/components/layout/header.tsx` - Added theme toggle to navigation
3. `src/app/globals.css` - Enhanced dark mode variables
4. `tailwind.config.ts` - Already configured for dark mode
5. Various components - Updated hardcoded colors to theme-aware classes

## Usage

### Adding Theme Toggle to Components

```tsx
import { ThemeToggleSimple } from '@/components/ui/theme-toggle-simple';

// Simple toggle button
<ThemeToggleSimple />;

// Or dropdown version
import { ThemeToggle } from '@/components/ui/theme-toggle';
<ThemeToggle />;
```

### Using Theme-Aware Colors

Instead of hardcoded colors, use semantic Tailwind classes:

```tsx
// ❌ Avoid hardcoded colors
<div className="bg-white text-black">

// ✅ Use theme-aware colors
<div className="bg-background text-foreground">

// ❌ Avoid specific gray shades
<span className="text-gray-500">

// ✅ Use semantic colors
<span className="text-muted-foreground">
```

### Common Theme-Aware Classes

- `bg-background` / `text-foreground` - Main background and text
- `bg-card` / `text-card-foreground` - Card backgrounds
- `bg-muted` / `text-muted-foreground` - Subdued content
- `bg-accent` / `text-accent-foreground` - Accent elements
- `border-border` - Consistent borders
- `bg-input` - Form inputs

## Color Palette

### Light Mode

- Background: `hsl(208 100% 97%)` - Very light blue-gray
- Foreground: `hsl(210 14% 20%)` - Dark blue-gray
- Primary: `hsl(16 100% 66%)` - Warm orange
- Secondary: `hsl(210 14% 53%)` - Medium blue-gray

### Dark Mode

- Background: `hsl(210 14% 10%)` - Very dark blue-gray
- Foreground: `hsl(0 0% 98%)` - Near white
- Primary: `hsl(16 100% 66%)` - Same warm orange
- Secondary: `hsl(210 14% 53%)` - Same medium blue-gray

## Component Examples

### Header Integration

The theme toggle is integrated into both desktop and mobile navigation:

- Desktop: Appears after main navigation items
- Mobile: Appears before the hamburger menu

### Existing Component Support

The following components already support dark mode:

- All UI components from shadcn/ui
- Background removal forms
- Image compression tools
- OCR components
- Photo editor
- Batch processor
- All layout components

## Best Practices

### 1. Always Use CSS Variables

```css
/* ✅ Good - uses CSS variables */
.my-component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* ❌ Avoid - hardcoded colors */
.my-component {
  background-color: #ffffff;
  color: #000000;
}
```

### 2. Test in Both Modes

Always test your components in both light and dark modes to ensure proper contrast and readability.

### 3. Use Semantic Color Names

Choose colors based on their purpose, not their appearance:

- `primary` for main actions
- `secondary` for secondary actions
- `muted` for less important content
- `destructive` for dangerous actions

### 4. Consider Accessibility

- Maintain proper contrast ratios in both modes
- Use semantic HTML and ARIA labels
- Test with screen readers

## Troubleshooting

### Hydration Mismatches

If you encounter hydration issues, ensure components that depend on theme are:

1. Marked with `'use client'`
2. Using the `useTheme` hook correctly
3. Handling the loading state properly

### SSR Issues

For components that use browser APIs (like `document`), add checks:

```tsx
if (typeof document !== 'undefined') {
  // Browser-only code
}
```

### Color Inconsistencies

If colors appear inconsistent:

1. Check if CSS variables are properly defined
2. Ensure Tailwind classes are being applied correctly
3. Verify dark mode classes are present in the HTML

## Future Enhancements

1. **Custom Theme Colors**: Allow users to customize accent colors
2. **Theme Presets**: Add predefined theme combinations
3. **Animation Preferences**: Respect user's motion preferences
4. **High Contrast Mode**: Add accessibility-focused theme variant

## Testing

To test the dark mode implementation:

1. Start the development server: `npm run dev`
2. Open http://localhost:3001
3. Click the theme toggle button in the header
4. Verify smooth transitions between themes
5. Test system preference detection
6. Check all pages and components for consistency

The implementation is complete and ready for production use!
