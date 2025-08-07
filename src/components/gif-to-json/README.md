# GIF to JSON Converter

A powerful tool for extracting frame-by-frame data from animated GIF files and converting them to structured JSON format.

## 🚀 Features

- **Frame Extraction**: Extract all frames from GIF animations with timing data
- **Multiple Output Formats**: Base64 JSON or separate PNG files with metadata
- **Preview System**: Live preview with playback controls for extracted frames
- **Quality Control**: Adjustable compression and quality settings
- **Validation**: Comprehensive file validation and error handling
- **Progress Tracking**: Real-time processing progress with time estimates

## 📋 Requirements

- GIF files only (.gif)
- Maximum file size: 50MB
- Maximum frames: 500
- Maximum dimensions: 2048x2048 pixels

## 🛠️ Technical Stack

- **gifuct-js**: GIF parsing and frame extraction
- **Canvas API**: Frame rendering and image conversion
- **JSZip**: ZIP file generation for bulk downloads
- **React**: UI components and state management
- **TypeScript**: Type safety and better DX

## 📁 File Structure

```
src/components/gif-to-json/
├── gif-to-json-form.tsx      # Main form component
├── gif-settings-panel.tsx    # Advanced settings panel
└── index.ts                  # Component exports

src/lib/
└── gif-processing.ts         # Core GIF processing logic

src/constants/
└── gif-to-json.ts           # Configuration constants

src/types/
└── gifuct-js.d.ts           # Type definitions for gifuct-js

src/app/(pages)/gif-to-json/
└── page.tsx                 # Next.js page component
```

## 🎯 Usage

1. Navigate to `/gif-to-json`
2. Upload a GIF file (drag & drop or click)
3. Configure processing options (optional)
4. Download JSON or ZIP with frames

## 📊 JSON Output Format

```json
{
  "width": 300,
  "height": 200,
  "frameCount": 12,
  "duration": 1200,
  "frames": [
    {
      "index": 0,
      "delay": 100,
      "image": "data:image/png;base64,...",
      "width": 300,
      "height": 200,
      "x": 0,
      "y": 0,
      "disposal": 2
    }
  ],
  "metadata": {
    "size": 1024000,
    "created": "2023-12-07T10:30:00.000Z",
    "format": "gif",
    "filename": "animation.gif"
  }
}
```

## 🔧 Configuration Options

- **Output Format**: Base64 JSON vs separate files
- **Quality**: High (95%), Balanced (80%), Compact (60%)
- **Metadata**: Include file information and timestamps
- **Compression**: Apply frame compression for smaller files
- **Frame Limit**: Process subset of frames (up to 500)

## 🎨 Use Cases

- **Animation Frameworks**: Custom animation players and engines
- **Game Development**: Sprite animations and character movement
- **Web Development**: CSS animations and Canvas-based animations
- **Analysis**: Frame timing analysis and optimization
- **Conversion**: Converting GIFs to other animation formats

## 🚧 Limitations

- Browser memory limitations for very large GIFs
- Processing time scales with file size and frame count
- Canvas operations are synchronous (blocks UI during processing)
- No support for GIF extensions beyond standard animation

## 🔮 Future Enhancements

- WebWorker support for background processing
- Sprite sheet generation
- Frame interpolation and smoothing
- Batch processing of multiple GIFs
- Advanced filtering and frame selection
- WebP and AVIF output formats
