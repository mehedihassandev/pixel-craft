# Video Converter - Deployment Guide

## Overview

Your video converter is now compatible with both **Vercel** (your current hosting) and **Docker** deployments. The application automatically detects the environment and uses the appropriate processing method.

## ✅ What's Set Up

### 1. **Vercel-Compatible Setup**

- ✅ Conditional Next.js config (no standalone output for Vercel)
- ✅ Cloud-based video processing using Cloudinary
- ✅ Edge function optimization
- ✅ Automatic environment detection

### 2. **Docker Setup**

- ✅ Production Dockerfile with FFmpeg
- ✅ Development Docker Compose
- ✅ Multi-stage build optimization
- ✅ Health check endpoint

### 3. **GitHub Actions CI/CD**

- ✅ Automated testing and linting
- ✅ Docker build verification
- ✅ Vercel deployment pipeline
- ✅ Optional Docker registry push

## 🚀 Deployment Options

### Option A: Vercel (Current/Recommended)

**Your app will work on Vercel, but needs Cloudinary setup:**

1. **Create Cloudinary Account** (free tier available):
   - Go to [cloudinary.com](https://cloudinary.com)
   - Create account and get credentials

2. **Add Environment Variables in Vercel**:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Create Upload Preset in Cloudinary**:
   - Go to Settings > Upload presets
   - Create preset named `video_processing`
   - Set it to `unsigned`

4. **Deploy**:
   - Push to GitHub (automatic deployment)

### Option B: Docker (Full Control)

**For complete FFmpeg control without external dependencies:**

```bash
# Local development
docker-compose -f docker-compose.dev.yml up

# Production deployment
docker-compose up --build
```

## 🔧 How It Works

### Environment Detection

```typescript
const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  // Use Cloudinary for video processing
} else {
  // Use FFmpeg for local processing
}
```

### Vercel Flow

1. User uploads video →
2. Validate file →
3. Send to Cloudinary →
4. Return processed video URL

### Docker Flow

1. User uploads video →
2. Save to temp directory →
3. Process with FFmpeg →
4. Return processed file

## 📁 File Structure

```
src/app/api/video-converter/
├── route.ts          # Main route (environment detection)
└── route-ffmpeg.ts   # FFmpeg processing (Docker)

docker-compose.yml     # Production Docker setup
docker-compose.dev.yml # Development Docker setup
Dockerfile            # Production container
Dockerfile.dev        # Development container
vercel.json           # Vercel configuration
```

## 🎯 Next Steps

### For Vercel Deployment (Immediate):

1. Set up Cloudinary account
2. Add environment variables to Vercel
3. Test video conversion on your live site

### For Docker Deployment (Optional):

1. Use provided Docker files for local development
2. Deploy to your preferred cloud provider
3. Set up CI/CD with GitHub Actions

## 🔍 Testing

### Test Vercel Build Locally:

```bash
npm run build
npm start
```

### Test Docker Build:

```bash
docker-compose up --build
```

### Test CI/CD:

- Create PR → Automatic testing
- Merge to main → Automatic deployment

## 📋 Environment Variables

### Vercel (Required for video conversion):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Optional (Both platforms):

```env
MAX_VIDEO_FILE_SIZE=524288000  # 500MB limit
```

## 🚨 Important Notes

1. **Vercel Limitations**:
   - 5-minute function timeout
   - Requires Cloudinary for processing
   - Serverless environment

2. **Docker Benefits**:
   - No external dependencies
   - Full FFmpeg control
   - Unlimited processing time
   - Complete customization

3. **Automatic Fallback**:
   - App detects environment automatically
   - No code changes needed between deployments
   - Graceful error handling

Your video converter is now production-ready for both platforms! 🎉
