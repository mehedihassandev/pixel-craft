# ImageUploadZone Component

A reusable, feature-rich image upload zone component with drag-and-drop support, progress indicators, and validation.

## Features

- 🎯 **Drag & Drop Support** - Optional drag and drop functionality
- 📁 **Multiple or Single File Upload** - Configure for single or multiple file selection
- 📊 **Progress Indicators** - Built-in progress bar and estimated time display
- ✅ **File Validation** - Size and type validation with error messages
- 🎨 **Customizable UI** - Flexible styling and text customization
- ♿ **Accessible** - Screen reader friendly with proper ARIA attributes
- 🔒 **Loading States** - Disable during processing with visual feedback

## Usage

### Basic Single File Upload

```tsx
import { ImageUploadZone } from '@/components/ui/image-upload-zone';

const MyComponent = () => {
  const handleFilesSelected = (files: File[]) => {
    const file = files[0];
    // Process the file
    console.log('Selected file:', file);
  };

  return (
    <ImageUploadZone
      onFilesSelected={handleFilesSelected}
      accept="image/*"
      multiple={false}
      maxFileSize={10}
      title="Click to upload an image"
      subtitle="PNG, JPG, WebP up to 10MB"
    />
  );
};
```

### Multiple File Upload with Processing

```tsx
const MyComponent = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<FileValidationError[]>([]);

  const handleFilesSelected = async (files: File[]) => {
    setIsProcessing(true);
    setProgress(0);
    setErrors([]);

    // Process files...
    for (let i = 0; i < files.length; i++) {
      // Simulate processing
      setProgress(((i + 1) / files.length) * 100);
      // Process file...
    }

    setIsProcessing(false);
  };

  return (
    <ImageUploadZone
      onFilesSelected={handleFilesSelected}
      accept=".jpg,.jpeg,.png,.webp"
      multiple={true}
      maxFileSize={50}
      disabled={isProcessing}
      isProcessing={isProcessing}
      processingText="Compressing images..."
      progress={progress}
      validationErrors={errors}
      title="Drop your images here, or browse files"
      subtitle="Supports JPG, JPEG, PNG, WEBP • Max size: 50MB per file"
      supportedFormats="JPG, JPEG, PNG, WEBP"
    />
  );
};
```

### Disabled Drag & Drop (Click Only)

```tsx
<ImageUploadZone
  onFilesSelected={handleFilesSelected}
  accept="image/png"
  multiple={false}
  maxFileSize={10}
  enableDragDrop={false}
  title="Click to upload a PNG image"
  subtitle="PNG images only • Max size: 10MB"
/>
```

## Props

| Prop               | Type                      | Default                   | Description                            |
| ------------------ | ------------------------- | ------------------------- | -------------------------------------- |
| `onFilesSelected`  | `(files: File[]) => void` | **Required**              | Callback when files are selected       |
| `accept`           | `string`                  | `".jpg,.jpeg,.png,.webp"` | File input accept attribute            |
| `multiple`         | `boolean`                 | `false`                   | Allow multiple file selection          |
| `maxFileSize`      | `number`                  | `50`                      | Maximum file size in MB                |
| `maxFiles`         | `number`                  | `undefined`               | Maximum number of files (for multiple) |
| `title`            | `string`                  | Auto-generated            | Main upload text                       |
| `subtitle`         | `string`                  | Auto-generated            | Descriptive text below title           |
| `supportedFormats` | `string`                  | Auto-generated            | Supported formats display text         |
| `className`        | `string`                  | `undefined`               | Additional CSS classes                 |
| `disabled`         | `boolean`                 | `false`                   | Disable the upload zone                |
| `isProcessing`     | `boolean`                 | `false`                   | Show processing state                  |
| `processingText`   | `string`                  | `"Processing..."`         | Text during processing                 |
| `progress`         | `number`                  | `undefined`               | Progress percentage (0-100)            |
| `estimatedTime`    | `number`                  | `undefined`               | Estimated time remaining in seconds    |
| `validationErrors` | `FileValidationError[]`   | `[]`                      | Validation errors to display           |
| `enableDragDrop`   | `boolean`                 | `true`                    | Enable drag and drop functionality     |

## FileValidationError Interface

```tsx
interface FileValidationError {
  file: string; // File name
  error: string; // Error message
}
```

## Styling

The component uses Tailwind CSS classes and adapts to your theme. Key style points:

- **Multiple files**: Larger upload area with prominent drag & drop text
- **Single file**: Smaller, more compact upload area
- **Processing state**: Shows spinner and progress bar
- **Error state**: Red border and error messages below
- **Disabled state**: Reduced opacity and disabled cursor

## Examples in Codebase

See real implementations in:

- `src/components/image-compress/image-compression-form.tsx` - Multiple file upload
- `src/components/resize/image-resize-form.tsx` - Single file upload
- `src/components/background-remove/background-removal-form-wrapper.tsx` - Single file with processing
- `src/components/png-to-svg/png-to-svg.tsx` - Click-only upload
- `src/components/ocr/ocr-form.tsx` - Single file OCR
- `src/components/ocr/batch-ocr.tsx` - Multiple file batch processing
