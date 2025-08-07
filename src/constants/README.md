# Constants Organization

This directory contains all constant data organized by functionality and purpose. This organization helps maintain consistency, makes updates easier, and provides a single source of truth for configuration values.

## File Structure

### Core Configuration

- **`app-config.ts`** - Main application configuration, URLs, structured data, theme settings
- **`metadata.ts`** - SEO metadata, page-specific metadata, social media configurations
- **`metadata-helpers.ts`** - Helper functions for generating metadata dynamically

### Data Validation & Processing

- **`file-validation.ts`** - File type validation, size limits, compression settings, OCR settings
- **`utils.ts`** - Utility constants for formatting, conversions, UI timing, validation patterns

### User Interface

- **`ui-messages.ts`** - All user-facing text, error messages, form labels, tooltips

### Processing and API Constants

- **`processing.ts`** - Processing timeouts, progress intervals, performance thresholds, queue settings
- **`api.ts`** - API endpoints, external URLs, HTTP status codes, content type validation
- **`mime-types.ts`** - MIME types for all supported file formats, validation patterns, data URI prefixes
- **`image-filters.ts`** - Image filter presets, filter ranges, processing constants, error messages
- **`analytics.ts`** - Statistics configuration, metrics, performance monitoring constants

### Feature-Specific Constants

- **`background-remove.ts`** - Background removal feature data
- **`contact.ts`** - Contact information and social links
- **`home.ts`** - Homepage features and content
- **`image-compress.ts`** - Image compression feature data
- **`ocr.ts`** - OCR feature data and settings
- **`png-to-svg.ts`** - PNG to SVG converter feature data
- **`stats.ts`** - Application statistics and metrics

### Site Structure

- **`sitemap.ts`** - Sitemap configuration and route definitions

### Central Export

- **`index.ts`** - Main export file for convenient imports

## Usage Examples

### Import specific constants

```typescript
import { SUPPORTED_IMAGE_TYPES, FILE_SIZE_LIMITS } from '@/constants/file-validation';
import { UI_MESSAGES } from '@/constants/ui-messages';
```

### Import from central index

```typescript
import {
  APP_CONFIG,
  SUPPORTED_IMAGE_TYPES,
  UI_MESSAGES,
  generatePageMetadata,
  API_ENDPOINTS,
  IMAGE_MIME_TYPES,
  FILTER_PRESETS,
  PERFORMANCE_THRESHOLDS,
} from '@/constants';
```

### Use in components

```typescript
// File validation
if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
  throw new Error(ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE(file.type));
}

// API calls
const response = await fetch(API_ENDPOINTS.BACKGROUND_REMOVE, {
  method: 'POST',
  body: formData,
});

// MIME types
const blob = new Blob([svg], { type: IMAGE_MIME_TYPES.SVG });

// File size validation
if (file.size > FILE_SIZE_LIMITS.TEN_MB) {
  setError('File size must be less than 10MB');
}

// Progress intervals
setInterval(() => {
  // update progress
}, PROGRESS_INTERVALS.DEFAULT_PROGRESS_INTERVAL);

// UI messages
const uploadText = `${UI_MESSAGES.CLICK_TO_SELECT} ${FILE_DESCRIPTIONS.SUPPORTED_FORMATS_BASIC}`;

// Generate page metadata
export const metadata = generatePageMetadata('png-to-svg');
```

## Benefits

1. **Single Source of Truth** - All constants are centralized and easy to find
2. **Type Safety** - Constants are properly typed with TypeScript
3. **Consistency** - Ensures consistent values across the application
4. **Maintainability** - Easy to update values in one place
5. **Reusability** - Constants can be reused across different components
6. **Documentation** - Clear organization makes the codebase self-documenting

## Adding New Constants

When adding new constants:

1. **Choose the right file** - Place constants in the most appropriate existing file
2. **Create new files if needed** - For new feature areas, create dedicated constant files
3. **Export from index.ts** - Add new files to the central export
4. **Use proper typing** - Use `as const` for immutable objects and arrays
5. **Document purpose** - Add comments explaining complex constants

## Migration Checklist

The following hardcoded values have been moved to constants:

- ✅ App metadata and SEO data
- ✅ Site configuration (URLs, structured data)
- ✅ File validation rules (supported types, size limits)
- ✅ Schema validation limits
- ✅ Image processing settings
- ✅ Sitemap and robots configuration
- ✅ UI messages and error strings
- ✅ Page-specific metadata
- ✅ Utility values (byte conversion, time constants)
- ✅ **API endpoints and external URLs**
- ✅ **MIME types and file format definitions**
- ✅ **Processing timeouts and performance thresholds**
- ✅ **Image filter presets and ranges**
- ✅ **Analytics and statistics configuration**
- ✅ **File size limits (10MB, 5MB, etc.)**
- ✅ **Progress intervals and simulation settings**
- ✅ **HTTP status codes and content type validation**

## Files Updated

The following files were updated to use constants:

- `src/app/layout.tsx` - Uses app config and metadata constants
- `src/app/sitemap.ts` - Uses sitemap configuration
- `src/app/robots.ts` - Uses robots configuration
- `src/app/(pages)/*/layout.tsx` - Uses page metadata constants
- `src/lib/schemas.ts` - Uses validation constants
- `src/hooks/use-image-compressor.ts` - Uses file validation constants
- `src/lib/compression-utils.ts` - Uses validation and performance constants
- `src/lib/utils.ts` - Uses byte conversion constants
- **`src/lib/image-filters.ts`** - Uses filter presets and processing constants
- **`src/lib/api-simulation.ts`** - Uses analytics and simulation constants
- **`src/lib/image-converter.ts`** - Uses API endpoints
- **`src/lib/performance-monitor.ts`** - Uses performance thresholds
- **`src/hooks/use-github-stats.ts`** - Uses API endpoints and formatting constants
- **`src/components/background-remove/`** - Uses file validation, API endpoints, and MIME types
- **`src/components/ocr/`** - Uses file validation, MIME types, and API constants
- **`src/components/png-to-svg/`** - Uses MIME types and file patterns
- **`src/components/video-converter/`** - Uses API endpoints and content type validation
- **`src/components/layout/footer.tsx`** - Uses external URL constants
