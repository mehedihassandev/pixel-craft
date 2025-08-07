import { GifToJsonForm } from '@/components/gif-to-json';
import { JsonPlaybackDemo } from '@/components/gif-to-json/json-playback-demo';
import { generatePageMetadata } from '@/helper/metadata';
import { PAGE_METADATA_KEY } from '@/models/page-metadata';

export const metadata = generatePageMetadata(PAGE_METADATA_KEY.GIF_TO_JSON);

export default function GifToJsonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            GIF to JSON Converter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Extract frame-by-frame data from animated GIFs and convert to JSON format. Perfect for
            building custom animation players, analyzing frame timing, or reconstructing animations
            in web applications.
          </p>
        </div>

        {/* Main Form */}
        <GifToJsonForm />

        {/* Demo Section */}
        <div className="mt-16">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Test Your JSON Output</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Try the JSON playback demo to see how your converted data works in a Canvas-based
              animation player.
            </p>
          </div>
          <JsonPlaybackDemo />
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Frame-by-Frame Data</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Extract individual frame images, timing delays, and positioning data for each frame in
              your GIF animation.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customizable Output</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Choose between base64 encoded images in JSON or separate PNG files with metadata.
              Control quality and compression settings.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10M7 4v16a1 1 0 001 1h8a1 1 0 001-1V4M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h2M17 4h2a2 2 0 012 2v14a2 2 0 01-2 2h-2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Animation Reconstruction</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Use the JSON data to recreate animations in Canvas, WebGL, CSS animations, or custom
              animation frameworks.
            </p>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Usage Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">JSON Structure</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{`{
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
      "y": 0
    }
    // ... more frames
  ]
}`}</pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Canvas Animation Example</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{`// Animate frames on canvas
const gifData = await fetch('frames.json');
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
animate();`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
