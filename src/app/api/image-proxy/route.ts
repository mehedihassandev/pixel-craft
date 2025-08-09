import { NextRequest, NextResponse } from 'next/server';

// Simple, safe image proxy to work with strict COEP/COOP headers
// Only allows known placeholder domains to avoid open proxy abuse
const ALLOWED_HOSTS = new Set<string>([
  'placehold.co',
  'via.placeholder.com',
  'placeholder.com',
  'picsum.photos',
]);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get('url');

  if (!target) {
    return new NextResponse('Missing url', { status: 400 });
  }

  let upstreamUrl: URL;
  try {
    upstreamUrl = new URL(target);
  } catch {
    return new NextResponse('Invalid url', { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(upstreamUrl.hostname)) {
    return new NextResponse('Domain not allowed', { status: 400 });
  }

  try {
    const res = await fetch(upstreamUrl.toString(), {
      // Revalidate on the server; no credentials for third-party hosts
      cache: 'no-store',
      headers: {
        'User-Agent': 'PixelCraft Image Proxy',
        Accept: 'image/*,*/*;q=0.8',
      },
    });

    if (!res.ok || !res.body) {
      return new NextResponse(`Upstream error: ${res.status}`, { status: 502 });
    }

    const contentType = res.headers.get('content-type') ?? 'image/png';

    // Stream the image through with safe headers compatible with COEP
    return new NextResponse(res.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache a little to avoid hammering third-party services
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
        // Make it same-origin embeddable under COEP
        'Cross-Origin-Resource-Policy': 'same-origin',
      },
    });
  } catch (err) {
    return new NextResponse('Proxy fetch failed', { status: 500 });
  }
}
