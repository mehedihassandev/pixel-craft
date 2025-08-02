'use client';

import {
  ImageIcon,
  Eraser,
  Zap,
  Sparkles,
  Maximize,
  Archive,
  Menu,
  FileText,
  Layers,
  Palette,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { menus } from '@/navigation/menus';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

const iconMap = {
  Eraser,
  Zap,
  Sparkles,
  Maximize,
  Archive,
  ImageIcon,
  FileText,
  Layers,
  Palette,
};

// Categorize menu items for better organization
const imageEditingTools = menus.filter(item =>
  ['background-remove', 'resize', 'image-optimization', 'photo-editor'].includes(item.id)
);

const conversionTools = menus.filter(item =>
  ['image-compress', 'png-to-svg', 'placeholder'].includes(item.id)
);

const advancedTools = menus.filter(item => ['ocr', 'batch-processor'].includes(item.id));

const HeaderOption1 = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Image
                src="/assets/logo.png"
                alt="Pixel Craft Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg opacity-75 blur animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground">Pixel Craft</h1>
              <p className="text-xs text-muted-foreground -mt-1">AI Image Tools</p>
            </div>
          </Link>

          {/* Desktop Menu with Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-2">
            {/* Image Editing Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9">
                  <ImageIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Image Editing</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Image Editing Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {imageEditingTools.map(item => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link href={item.href} className="flex items-center gap-3 cursor-pointer">
                        <IconComponent className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Conversion Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9">
                  <Archive className="h-4 w-4" />
                  <span className="text-sm font-medium">Conversion</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Conversion Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {conversionTools.map(item => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link href={item.href} className="flex items-center gap-3 cursor-pointer">
                        <IconComponent className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Advanced Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-9">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Advanced</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Advanced Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {advancedTools.map(item => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <DropdownMenuItem key={item.id} asChild>
                      <Link href={item.href} className="flex items-center gap-3 cursor-pointer">
                        <IconComponent className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/assets/logo.png"
                      alt="Pixel Craft Logo"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Pixel Craft</h2>
                      <p className="text-xs text-muted-foreground">AI Image Tools</p>
                    </div>
                  </div>

                  {/* Mobile menu with categories */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
                        IMAGE EDITING
                      </h3>
                      <nav className="space-y-1">
                        {imageEditingTools.map(item => {
                          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <IconComponent className="h-5 w-5" />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </nav>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
                        CONVERSION
                      </h3>
                      <nav className="space-y-1">
                        {conversionTools.map(item => {
                          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <IconComponent className="h-5 w-5" />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </nav>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
                        ADVANCED
                      </h3>
                      <nav className="space-y-1">
                        {advancedTools.map(item => {
                          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <IconComponent className="h-5 w-5" />
                              <span className="font-medium">{item.label}</span>
                            </Link>
                          );
                        })}
                      </nav>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { HeaderOption1 };
