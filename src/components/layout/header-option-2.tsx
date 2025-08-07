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
} from 'lucide-react';
import Link from 'next/link';
import { menus } from '@/navigation/menus';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggleSimple } from '../theme';

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

const HeaderOption2 = () => {
  const pathname = usePathname();

  // Group popular tools for quick access
  const popularTools = [
    menus.find(m => m.id === 'background-remove'),
    menus.find(m => m.id === 'resize'),
    menus.find(m => m.id === 'image-compress'),
    menus.find(m => m.id === 'photo-editor'),
  ].filter(Boolean);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main header row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Image
                src="/assets/logo.png"
                alt="Pixel Craft Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl shadow-md"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pixel Craft
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Professional Tools</p>
            </div>
          </Link>

          {/* Quick Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {popularTools.map(item => {
              if (!item) return null;
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-card hover:bg-accent hover:text-accent-foreground shadow-sm'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.id === 'background-remove' && (
                    <Badge variant="secondary" className="ml-1 text-xs py-0 px-1">
                      HOT
                    </Badge>
                  )}
                </Link>
              );
            })}

            {/* More Tools Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">All Tools</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-96">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="text-center">
                    <h2 className="text-xl font-bold">All Tools</h2>
                    <p className="text-sm text-muted-foreground">
                      Choose from our complete toolkit
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {menus.map(item => {
                      const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all hover:scale-105 ${
                            isActive
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-card hover:bg-accent hover:text-accent-foreground border-border'
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg ${
                              isActive ? 'bg-primary-foreground/20' : 'bg-primary/10'
                            }`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium leading-tight">{item.label}</span>
                          </div>
                          {item.id === 'background-remove' && (
                            <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
                              Popular
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <ThemeToggleSimple />
          </div>

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
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Image
                        src="/assets/logo.png"
                        alt="Pixel Craft Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-lg"
                      />
                      <h2 className="text-lg font-bold">Pixel Craft</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">Professional Image Tools</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {menus.map(item => {
                      const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                      const isActive = pathname === item.href;

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              isActive ? 'bg-primary-foreground/20' : 'bg-primary/10'
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <span className="font-medium">{item.label}</span>
                          {item.id === 'background-remove' && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              HOT
                            </Badge>
                          )}
                        </Link>
                      );
                    })}
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

export { HeaderOption2 as HeaderMain };
