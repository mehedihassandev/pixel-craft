# Video Converter - Deployment Guide

## Overview

Your video converter is compatible with **Vercel** hosting and uses cloud-based processing for video conversion.

## ✅ What's Set Up

### 1. **Vercel-Compatible Setup**

- ✅ Optimized Next.js configuration
- ✅ Cloud-based video processing using Cloudinary
- ✅ Edge function optimization
- ✅ Automatic environment detection

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

## 📁 File Structure

```
src/app/api/video-converter/
├── route.ts          # Main route (environment detection)
└── route-ffmpeg.ts   # FFmpeg processing (local)

vercel.json           # Vercel configuration
```

## 🎯 Next Steps

### For Vercel Deployment:

1. Set up Cloudinary account
2. Add environment variables to Vercel
3. Test video conversion on your live site

## 🔍 Testing

### Test Vercel Build Locally:

```bash
npm run build
npm start
```

## 📋 Environment Variables

### Vercel (Required for video conversion):

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Optional:

```env
MAX_VIDEO_FILE_SIZE=524288000  # 500MB limit
```

## 🚨 Important Notes

1. **Vercel Limitations**:
   - 5-minute function timeout
   - Requires Cloudinary for processing
   - Serverless environment

2. **Automatic Environment Detection**:
   - App detects environment automatically
   - No code changes needed between deployments
   - Graceful error handling

Your video converter is now production-ready for Vercel! 🎉
