# PixelCraft Design System

## Color Palette

PixelCraft uses a modern, professional color scheme built around two primary brand colors:

### Brand Colors

#### Primary Blue (#365BEB)

- **Hex**: `#365BEB`
- **HSL**: `hsl(225, 83%, 57%)`
- **Usage**: Main brand color, primary buttons, links, focus states
- **Accessibility**: WCAG AA compliant when used with white text

#### Secondary Purple (#803AEA)

- **Hex**: `#803AEA`
- **HSL**: `hsl(260, 67%, 58%)`
- **Usage**: Accent color, secondary buttons, highlights, gradients
- **Accessibility**: WCAG AA compliant when used with white text

### Color Scale

Both primary and secondary colors include a full scale from 50 to 900:

#### Primary Scale

- `--primary-50`: Very light blue tint
- `--primary-100`: Light blue tint
- `--primary-200`: Lighter blue
- `--primary-300`: Light blue
- `--primary-400`: Medium-light blue
- `--primary-500`: Base primary color (#365BEB)
- `--primary-600`: Medium-dark blue
- `--primary-700`: Dark blue
- `--primary-800`: Darker blue
- `--primary-900`: Very dark blue

#### Secondary Scale

- `--secondary-50`: Very light purple tint
- `--secondary-100`: Light purple tint
- `--secondary-200`: Lighter purple
- `--secondary-300`: Light purple
- `--secondary-400`: Medium-light purple
- `--secondary-500`: Base secondary color (#803AEA)
- `--secondary-600`: Medium-dark purple
- `--secondary-700`: Dark purple
- `--secondary-800`: Darker purple
- `--secondary-900`: Very dark purple

## CSS Classes

### Gradient Backgrounds

- `.gradient-primary`: Linear gradient from primary to secondary
- `.gradient-primary-soft`: Soft gradient with opacity
- `.gradient-primary-vertical`: Vertical gradient
- `.gradient-animated`: Animated gradient with movement

### Effects

- `.glow-primary`: Glowing effect using primary color
- `.glow-secondary`: Glowing effect using secondary color
- `.hover-lift`: Subtle hover lift effect with primary shadow
- `.glass`: Glass morphism effect
- `.glass-primary`: Glass effect with primary color tint

### Text

- `.text-gradient-primary`: Gradient text from primary to secondary
- `.focus-ring-primary`: Primary color focus ring

### Buttons

- `.btn-primary-gradient`: Gradient button with hover effects

### Cards

- `.card-enhanced`: Enhanced card with hover effects and primary accent

## Usage Guidelines

### Primary Color Usage

- Use for primary actions (main CTA buttons, submit buttons)
- Navigation active states
- Links and interactive elements
- Focus indicators
- Progress indicators

### Secondary Color Usage

- Use for secondary actions
- Accent elements
- Highlights and callouts
- Gradient combinations with primary
- Success states and positive feedback

### Gradients

- Combine primary and secondary for dynamic backgrounds
- Use sparingly for hero sections and key CTAs
- Ensure sufficient contrast for accessibility

### Dark Mode

All colors are automatically adjusted for dark mode with appropriate contrast ratios and opacity adjustments.

## Examples

### Hero Section

```tsx
<div className="gradient-primary p-8 rounded-xl glow-primary">
  <h1 className="text-gradient-primary">PixelCraft</h1>
  <button className="btn-primary-gradient">Get Started</button>
</div>
```

### Feature Cards

```tsx
<div className="card-enhanced hover-lift">
  <div className="gradient-primary-soft p-4 rounded-lg">
    <h3 className="text-primary font-bold">Feature Title</h3>
  </div>
</div>
```

### Form Elements

```tsx
<input className="focus-ring-primary border-primary/30" />
<button className="btn-primary-gradient">Submit</button>
```

## Accessibility

- All color combinations meet WCAG AA standards for contrast
- Focus indicators use primary color with sufficient contrast
- Dark mode automatically adjusts opacity and brightness
- Color is never the only means of conveying information

## Technical Implementation

Colors are defined as CSS custom properties (variables) in `globals.css` and can be used throughout the application via Tailwind CSS classes or custom CSS classes.

The color system is fully responsive to theme changes and automatically adapts between light and dark modes.
