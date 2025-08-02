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
import { APP_CONFIG, SUPPORTED_IMAGE_TYPES, UI_MESSAGES, generatePageMetadata } from '@/constants';
```

### Use in components

```typescript
// File validation
if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
  throw new Error(ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE(file.type));
}

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
