'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { GifJsonData } from '@/lib/gif-processing';
import { Play, Pause, RotateCcw, Upload, Download, Code, Eye } from 'lucide-react';

interface JsonPlaybackDemoProps {
  className?: string;
}

export function JsonPlaybackDemo({ className }: JsonPlaybackDemoProps) {
  const [jsonData, setJsonData] = useState<GifJsonData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || !jsonData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const frame = jsonData.frames[currentFrame];
      if (!frame) return;

      const img = new Image();
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw frame
        ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height);

        // Move to next frame
        setCurrentFrame(prev => (prev + 1) % jsonData.frameCount);

        // Schedule next frame
        intervalRef.current = setTimeout(animate, frame.delay);
      };
      img.src = frame.image;
    };

    animate();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentFrame, jsonData]);

  const handleJsonUpload = () => {
    try {
      const data = JSON.parse(jsonInput) as GifJsonData;

      // Basic validation
      if (!data.frames || !Array.isArray(data.frames)) {
        throw new Error('Invalid JSON: missing frames array');
      }

      if (!data.width || !data.height) {
        throw new Error('Invalid JSON: missing dimensions');
      }

      setJsonData(data);
      setCurrentFrame(0);
      setIsPlaying(false);
      setError(null);

      // Set canvas dimensions
      if (canvasRef.current) {
        canvasRef.current.width = data.width;
        canvasRef.current.height = data.height;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentFrame(0);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const downloadExampleCode = () => {
    const code = `// GIF JSON Playback Example
class GifPlayer {
  constructor(canvas, jsonData) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.jsonData = jsonData;
    this.currentFrame = 0;
    this.isPlaying = false;

    // Set canvas dimensions
    canvas.width = jsonData.width;
    canvas.height = jsonData.height;
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.animate();
  }

  pause() {
    this.isPlaying = false;
  }

  animate() {
    if (!this.isPlaying) return;

    const frame = this.jsonData.frames[this.currentFrame];
    const img = new Image();

    img.onload = () => {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw frame
      this.ctx.drawImage(img, frame.x, frame.y, frame.width, frame.height);

      // Next frame
      this.currentFrame = (this.currentFrame + 1) % this.jsonData.frameCount;

      // Schedule next animation
      setTimeout(() => this.animate(), frame.delay);
    };

    img.src = frame.image;
  }

  reset() {
    this.pause();
    this.currentFrame = 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

// Usage:
// const player = new GifPlayer(canvasElement, gifJsonData);
// player.play();`;

    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gif-player-example.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            JSON Playback Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Paste GIF JSON Data:</label>
            <Textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Paste the JSON output from GIF conversion here..."
              rows={8}
              className="font-mono text-xs"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleJsonUpload} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Load JSON
            </Button>
            <Button
              variant="outline"
              onClick={downloadExampleCode}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Example Code
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {jsonData && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Animation Preview
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{jsonData.frameCount} frames</Badge>
                <Badge variant="outline">
                  {jsonData.width}×{jsonData.height}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button onClick={togglePlayback} className="flex items-center gap-2">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>

              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>

              <div className="text-sm text-muted-foreground">
                Frame {currentFrame + 1} of {jsonData.frameCount}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-64 object-contain"
                  style={{
                    imageRendering: 'pixelated',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              Canvas-based playback using the JSON frame data
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
