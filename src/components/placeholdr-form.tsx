"use client";

import type { Dispatch, SetStateAction } from 'react';
import { useTransition } from 'react';
import type { PlaceholdrOptions } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { handleSuggestFontSize } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface PlaceholdrFormProps {
  options: PlaceholdrOptions;
  setOptions: Dispatch<SetStateAction<PlaceholdrOptions>>;
}

export default function PlaceholdrForm({ options, setOptions }: PlaceholdrFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleChange = (key: keyof PlaceholdrOptions, value: string | number | null) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleColorChange = (key: 'bgColor' | 'textColor', value: string) => {
    const cleanValue = value.startsWith('#') ? value.substring(1) : value;
    if (/^[0-9a-fA-F]{0,6}$/.test(cleanValue)) {
      handleChange(key, cleanValue);
    }
  };

  const onSuggestFontSize = () => {
    startTransition(async () => {
      const result = await handleSuggestFontSize({
        width: options.width,
        height: options.height,
        text: options.text,
      });

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'AI Suggestion Failed',
          description: result.error,
        });
      } else if (result.fontSize) {
        handleChange('fontSize', result.fontSize);
        toast({
          title: 'AI Suggestion Applied!',
          description: `Font size set to ${result.fontSize}px.`,
        });
      }
    });
  };

  return (
    <Card className="w-full shadow-lg border-2 border-transparent hover:border-primary/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Customize Your Placeholder</CardTitle>
        <CardDescription>Adjust the settings below to generate your image.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (px)</Label>
            <Input id="width" type="number" value={options.width} onChange={(e) => handleChange('width', e.target.valueAsNumber || 1)} min="1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (px)</Label>
            <Input id="height" type="number" value={options.height} onChange={(e) => handleChange('height', e.target.valueAsNumber || 1)} min="1" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select value={options.format} onValueChange={(value: PlaceholdrOptions['format']) => handleChange('format', value)}>
            <SelectTrigger id="format" className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpg">JPG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bgColor">Background Color</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
              <Input
                id="bgColor"
                value={options.bgColor}
                onChange={(e) => handleColorChange('bgColor', e.target.value)}
                className="pl-7 font-mono"
                maxLength={6}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
             <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">#</span>
              <Input
                id="textColor"
                value={options.textColor}
                onChange={(e) => handleColorChange('textColor', e.target.value)}
                className="pl-7 font-mono"
                maxLength={6}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="text">Optional Text</Label>
          <Input id="text" value={options.text} onChange={(e) => handleChange('text', e.target.value)} placeholder="Enter text..."/>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="fontSize">Font Size (px, optional)</Label>
                 <Button variant="ghost" size="sm" onClick={onSuggestFontSize} disabled={isPending} className="text-primary hover:text-primary shrink-0">
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    AI Suggest
                </Button>
            </div>
            <Input 
              id="fontSize" 
              type="number" 
              value={options.fontSize ?? ''}
              onChange={(e) => handleChange('fontSize', e.target.value ? e.target.valueAsNumber : null)}
              placeholder="Auto or AI suggested"
              min="1"
            />
        </div>
      </CardContent>
    </Card>
  );
}
