# GIF to JSON Conversion Functionality

## Overview

The GIF to JSON converter extracts frame-by-frame data from animated GIF files and converts them into a structured JSON format. This is useful for:

- Creating custom animation players
- Analyzing frame timing and sequences
- Reconstructing animations in Canvas, WebGL, or CSS
- Building animation frameworks
- Frame-by-frame image analysis

## Features

### ✅ Complete Implementation

- **File Upload**: Drag & drop or click to upload GIF files (up to 50MB)
- **Frame Extraction**: Extracts all frames from GIF with timing data
- **JSON Output**: Structured JSON with frame data, delays, and metadata
- **Preview System**: Live preview of extracted frames with playback controls
- **Multiple Output Formats**:
  - Base64 encoded images in JSON
  - Separate PNG files + metadata JSON (ZIP download)
- **Quality Control**: Adjustable compression settings
- **Validation**: File type, size, and dimension validation
- **Progress Tracking**: Real-time processing progress with time estimates

### 🎯 Key Capabilities

- Processes GIFs up to 500 frames
- Handles dimensions up to 2048x2048 pixels
- Preserves frame timing (delay values)
- Extracts positioning data (x, y coordinates)
- Includes disposal method information
- Maintains aspect ratios and transparency

## Usage

### 1. Access the Tool

Navigate to `/gif-to-json` in your Pixel Craft application.

### 2. Upload a GIF

- Drag and drop a GIF file onto the upload zone, or
- Click to browse and select a GIF file
- Maximum file size: 50MB
- Supported format: .gif only

### 3. Configure Settings (Optional)

- **Output Format**: Choose between base64 JSON or separate files
- **Quality Preset**: High Quality, Balanced, or Compact
- **Include Metadata**: File information and creation date
- **Compress Frames**: Reduce file size with compression

### 4. Process and Download

- Processing starts automatically after upload
- View live preview of extracted frames
- Download JSON file with frame data
- Download ZIP file with separate PNG frames (optional)

## JSON Output Structure

```json
{
  "width": 300,
  "height": 200,
  "frameCount": 12,
  "duration": 1200,
  "loopCount": 0,
  "frames": [
    {
      "index": 0,
      "delay": 100,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
      "width": 300,
      "height": 200,
      "x": 0,
      "y": 0,
      "disposal": 2
    }
    // ... more frames
  ],
  "metadata": {
    "size": 1024000,
    "created": "2023-12-07T10:30:00.000Z",
    "format": "gif",
    "filename": "animation.gif"
  }
}
```

### Field Descriptions

- `width/height`: GIF dimensions in pixels
- `frameCount`: Total number of frames
- `duration`: Total animation duration in milliseconds
- `loopCount`: Number of loops (0 = infinite)
- `frames[].index`: Frame sequence number
- `frames[].delay`: Frame display duration in milliseconds
- `frames[].image`: Base64 encoded PNG image data
- `frames[].x/y`: Frame position offset
- `frames[].disposal`: Disposal method for frame

## Using the JSON Data

### Canvas Animation Example

```javascript
const gifData = await fetch('frames.json').then(r => r.json());
let currentFrame = 0;

function animate() {
  const frame = gifData.frames[currentFrame];
  const img = new Image();

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, frame.x, frame.y);

    currentFrame = (currentFrame + 1) % gifData.frameCount;
    setTimeout(animate, frame.delay);
  };

  img.src = frame.image;
}

animate();
```

### CSS Animation Generation

```javascript
function generateCSSKeyframes(gifData) {
  const keyframes = gifData.frames
    .map((frame, index) => {
      const percentage = (index / gifData.frameCount) * 100;
      return `${percentage}% { background-image: url('${frame.image}'); }`;
    })
    .join('\n');

  return `@keyframes gif-animation {\n${keyframes}\n}`;
}
```

## Technical Implementation

### Libraries Used

- **gifuct-js**: GIF parsing and frame extraction
- **Canvas API**: Frame rendering and base64 conversion
- **JSZip**: ZIP file generation for separate frame downloads
- **React**: UI components and state management

### Processing Pipeline

1. File validation (type, size, dimensions)
2. GIF parsing with gifuct-js
3. Frame decompression and extraction
4. Canvas rendering for each frame
5. Base64 encoding or blob generation
6. JSON structure assembly
7. Preview generation

### Performance Considerations

- Processing time scales with file size and frame count
- Large GIFs (>10MB) may take several seconds
- Memory usage increases with frame count
- Canvas operations are synchronous and block UI

## Navigation Integration

The GIF to JSON converter is integrated into the main navigation:

- Added to the main menu as "GIF to JSON"
- Included in sitemap for SEO
- Available in the features grid on homepage

## Error Handling

The system handles various error conditions:

- Invalid file formats
- Files too large (>50MB)
- Too many frames (>500)
- Dimensions too large (>2048px)
- Processing errors with user-friendly messages
- Network timeouts and browser limitations

## Future Enhancements

Potential improvements for future versions:

- WebWorker processing for better performance
- Additional output formats (sprite sheets, WebP)
- Frame filtering and selection options
- Batch processing of multiple GIFs
- Animation optimization tools
- Frame interpolation and smoothing

## Testing

To test the functionality:

1. Prepare various GIF files (different sizes, frame counts)
2. Test with small simple GIFs first
3. Try larger, more complex animations
4. Verify JSON structure matches expected format
5. Test preview functionality and downloads
6. Check error handling with invalid files
