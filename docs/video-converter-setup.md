# Video Format Converter - Setup Guide

## Prerequisites

### FFmpeg Installation

The video converter feature requires FFmpeg to be installed on your system. Follow the installation instructions for your operating system:

#### macOS

```bash
# Using Homebrew (recommended)
brew install ffmpeg

# Using MacPorts
sudo port install ffmpeg +universal
```

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install ffmpeg
```

#### Windows

1. Download FFmpeg from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
2. Extract the archive
3. Add the `bin` folder to your system PATH
4. Restart your terminal/command prompt

#### Docker (Alternative)

If you prefer using Docker, you can use the included Dockerfile:

```dockerfile
# Build the Docker image
docker build -t pixel-craft .

# Run the container
docker run -p 3000:3000 pixel-craft
```

Or use Docker Compose for easier management:

```bash
# Build and start the services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop the services
docker-compose down
```

The Docker setup includes:

- Node.js 18 Alpine base image
- FFmpeg pre-installed
- Optimized multi-stage build
- Health check endpoint
- Proper file permissions
- Volume mounting for temporary files

### Verify Installation

After installation, verify FFmpeg is working:

```bash
ffmpeg -version
```

## Environment Variables

### For Local/Docker Development

Create a `.env.local` file in your project root:

```env
# Optional: Set custom temp directory for video processing
VIDEO_TEMP_DIR=/tmp/video-conversions

# Optional: Set maximum file size (in bytes)
MAX_VIDEO_FILE_SIZE=524288000  # 500MB
```

### For Vercel Deployment

Add these environment variables in your Vercel dashboard:

```env
# Required for Cloudinary video processing on Vercel
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Set maximum file size (in bytes)
MAX_VIDEO_FILE_SIZE=524288000  # 500MB
```

## Deployment Options

### Option 1: Vercel (Recommended for most users)

**Pros:**

- Automatic deployments from GitHub
- Global CDN and edge functions
- Zero server management
- Automatic scaling

**Cons:**

- Requires cloud service (Cloudinary) for video processing
- Function timeout limits (5 minutes max)
- Limited to Vercel's infrastructure

**Setup:**

1. Connect your GitHub repository to Vercel
2. Set up Cloudinary account and get API credentials
3. Add environment variables in Vercel dashboard
4. Deploy automatically on git push

### Option 2: Docker Deployment

**Pros:**

- Full control over video processing (FFmpeg)
- Can run on any server/cloud provider
- No external dependencies for video conversion
- Better for complex video processing needs

**Cons:**

- Requires server management
- Higher resource requirements
- Manual scaling needed

**Setup:**

```bash
# Build and run with Docker
docker build -t pixel-craft .
docker run -p 3000:3000 pixel-craft

# Or use Docker Compose
docker-compose up --build
```

## Production Considerations

### Server Resources

- **RAM**: Video conversion is memory-intensive. Ensure adequate RAM (minimum 4GB recommended)
- **CPU**: Multi-core CPU recommended for faster processing
- **Storage**: Temporary storage space for input/output files

### Performance Optimization

1. **Background Processing**: For production, implement a queue system (Redis + Bull)
2. **Cloud Processing**: Consider using AWS Lambda with FFmpeg layers or specialized services
3. **Caching**: Implement file caching for frequently requested conversions

### Example Queue Implementation (Optional)

```bash
npm install bull redis
```

```typescript
// lib/video-queue.ts
import Queue from 'bull';
import { VideoConverter } from './video-converter';

const videoQueue = new Queue('video conversion', process.env.REDIS_URL);

videoQueue.process(async job => {
  const { inputPath, outputPath, options } = job.data;

  await VideoConverter.convertVideo(inputPath, outputPath, options, progress => {
    job.progress(progress.percent);
  });

  return { success: true, outputPath };
});

export default videoQueue;
```

## Security Considerations

1. **File Validation**: The application validates file types and sizes
2. **Temporary Files**: Files are automatically cleaned up after processing
3. **Rate Limiting**: Consider implementing rate limiting for API endpoints
4. **File Uploads**: Monitor and limit concurrent uploads

## Usage

1. Navigate to `/video-converter` in your application
2. Upload a video file (max 500MB)
3. Select output format and quality settings
4. Click "Convert Video"
5. Download the converted file

## Supported Formats

### Input Formats

- MP4, MOV, AVI, MKV, WebM, FLV, WMV

### Output Formats

- **MP4**: Best compatibility, H.264 codec
- **WebM**: Web-optimized, VP9 codec
- **MOV**: Apple QuickTime format
- **AVI**: Microsoft Video format
- **FLV**: Flash Video format
- **WMV**: Windows Media Video
- **GIF**: Animated GIF (limited to 30 seconds)

## Quality Settings

- **High Quality**: CRF 18, larger file size, best quality
- **Medium Quality**: CRF 23, balanced size and quality
- **Low Quality**: CRF 28, smaller file size, reduced quality

## Resolution Options

- Original resolution (no scaling)
- 1080p (1920x1080)
- 720p (1280x720)
- 480p (854x480)
- 360p (640x360)

## Troubleshooting

### Common Issues

1. **"FFmpeg not found" error**
   - Ensure FFmpeg is installed and in your system PATH
   - Restart your development server after installation

2. **Large file processing fails**
   - Check available RAM and disk space
   - Consider reducing video resolution or quality
   - Implement timeout handling for long conversions

3. **Conversion takes too long**
   - Use faster presets (medium instead of slow)
   - Reduce output quality
   - Consider cloud-based processing for large files

### Performance Tips

1. Use appropriate quality settings for your use case
2. Consider pre-processing videos to reduce size
3. Implement progress tracking for user feedback
4. Use background processing for large files

## API Usage

You can also use the video converter API directly:

```javascript
const formData = new FormData();
formData.append('file', videoFile);
formData.append('format', 'mp4');
formData.append('quality', 'medium');
formData.append('resolution', '720p');

const response = await fetch('/api/video-converter', {
  method: 'POST',
  body: formData,
});

const blob = await response.blob();
// Handle the converted video blob
```
