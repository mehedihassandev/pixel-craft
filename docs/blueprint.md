# **App Name**: Pixel Craft

## Core Features:

### Placeholder Generation Module:
- **Customizable Input Form**: React Hook Form with Zod validation for width, height, text, background color, and text color fields
- **Format Selection**: Dropdown menu to select image format (PNG, JPG, WebP) using shadcn/ui Select component
- **Live Preview**: Real-time preview using Next.js Image component that updates as user modifies input values
- **AI-Powered Font Sizing**: Genkit AI integration that intelligently recommends optimal font sizes based on image dimensions
- **Result Display**: Card-based layout displaying generated placeholder image with metadata
- **Copy URL Button**: Toast-enabled clipboard functionality for generated image URLs
- **Download Image**: Direct image download with proper MIME type handling

### Additional Image Processing Features:
- **AI Background Removal**: Client-side and API-based background removal using @imgly/background-removal
- **Image Compression**: Multi-format compression with quality controls and batch processing
- **OCR Text Recognition**: Tesseract.js integration for single and batch text extraction
- **Image Resizing**: Canvas-based resizing with multiple scaling methods (fit, fill, cover, crop)
- **PNG to SVG Conversion**: Vector conversion capabilities using imagetracer.js
- **Image Optimization**: WebP conversion and optimization for web performance

## Technical Architecture:

- **Framework**: Next.js 14 with TypeScript and Turbopack
- **UI Components**: shadcn/ui with Radix UI primitives and Tailwind CSS
- **Form Management**: React Hook Form with Zod schema validation
- **State Management**: React Context and custom hooks (use-image-compressor, use-app-stats)
- **AI Integration**: Google Genkit for font size suggestions and image processing recommendations
- **File Handling**: Canvas API, File API, and Blob manipulation for client-side processing
- **Styling**: Tailwind CSS with custom design tokens and responsive design

## Style Guidelines:

- **Design System**: Modern, clean interface using shadcn/ui components with consistent spacing and typography
- **Color Palette**: Dark/light mode support with CSS variables for theme switching
- **Typography**: Inter font family for optimal readability across all text elements
- **Layout**: Card-based modular design with clear visual hierarchy and generous whitespace
- **Interactive Elements**: Subtle hover animations, loading states, and toast notifications for user feedback
- **Icons**: Lucide React icons for consistent visual language (Copy, Download, Upload, Settings, etc.)
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support through Radix UI primitives