import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const removeBgForm = new FormData();
    removeBgForm.append('image_file', file);
    removeBgForm.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: removeBgForm,
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      let errorMsg = 'Background removal failed';
      try {
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          errorMsg = errData.errors?.[0]?.title || errData.message || errorMsg;
        } else {
          // If not JSON, try to get text content for better error message
          const textError = await response.text();
          if (textError && textError.length < 200) {
            errorMsg = textError;
          }
        }
      } catch (e) {
        // If parsing fails, use status-based error messages
        if (response.status === 402) {
          errorMsg = 'API quota exceeded. Please try again later.';
        } else if (response.status === 403) {
          errorMsg = 'Invalid API key or access denied.';
        } else if (response.status >= 500) {
          errorMsg = 'Service temporarily unavailable. Please try again.';
        }
      }
      return NextResponse.json({ error: errorMsg }, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: { 'Content-Type': 'image/png' },
    });
  } catch (error) {
    console.error('Background removal API error:', error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timeout. Please try again with a smaller image.' },
          { status: 408 }
        );
      }

      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Network error. Please check your connection and try again.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
