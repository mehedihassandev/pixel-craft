import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { POST: ffmpegPost } = await import('./route-ffmpeg');
  return ffmpegPost(request);
}
