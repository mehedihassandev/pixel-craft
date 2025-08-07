import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect consolidated routes to photo editor
  const redirectRoutes = ['/image-optimization', '/image-compress', '/batch-processor'];

  if (redirectRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/photo-editor';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/image-optimization', '/image-compress', '/batch-processor'],
};
