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
  Video,
  // Hover icons
  ImagePlus,
  Scissors,
  Bolt,
  Stars,
  ArchiveX,
  Type,
  Layers3,
  PaintBucket,
  PlayCircle,
} from 'lucide-react';
import Link from 'next/link';
import { menus } from '@/navigation/menus';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggleSimple } from '../theme';
import { useState } from 'react';

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
  Video,
};

const hoverIconMap = {
  Eraser: Scissors,
  Zap: Bolt,
  Sparkles: Stars,
  Maximize: ArchiveX,
  Archive: ArchiveX,
  ImageIcon: ImagePlus,
  FileText: Type,
  Layers: Layers3,
  Palette: PaintBucket,
  Video: PlayCircle,
};

// Component for animated icon with hover effect
const AnimatedIcon = ({
  iconName,
  size = 'sm',
  isActive = false,
}: {
  iconName: string;
  size?: 'sm' | 'lg';
  isActive?: boolean;
}) => {
  const IconComponent = iconMap[iconName as keyof typeof iconMap];
  const HoverIcon = hoverIconMap[iconName as keyof typeof hoverIconMap];
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-6 w-6';

  if (!IconComponent) return null;

  return (
    <div className={`relative ${iconSize} flex items-center justify-center`}>
      {/* Default Icon */}
      <IconComponent
        className={`${iconSize} transition-all duration-300 group-hover:scale-0 group-hover:rotate-180 ${
          isActive ? 'text-primary-foreground' : 'text-current group-hover:text-primary'
        }`}
      />

      {/* Hover Icon */}
      {HoverIcon && (
        <HoverIcon
          className={`absolute inset-0 ${iconSize} transition-all duration-300 scale-0 rotate-180 group-hover:scale-100 group-hover:rotate-0 ${
            isActive
              ? 'text-primary-foreground'
              : 'text-primary dark:group-hover:text-white group-hover:text-black'
          }`}
        />
      )}
    </div>
  );
};

const HeaderOption2 = () => {
  const pathname = usePathname();
  const [isDesktopSheetOpen, setIsDesktopSheetOpen] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // Group popular tools for quick access
  const popularToolsBase = [
    menus.find(m => m.id === 'background-remove'),
    menus.find(m => m.id === 'resize'),
    menus.find(m => m.id === 'image-compress'),
    menus.find(m => m.id === 'photo-editor'),
  ].filter(Boolean);

  // Find the currently active menu item
  const activeMenuItem = menus.find(m => m.href === pathname);

  // Create dynamic popular tools list
  const popularTools = (() => {
    // If there's an active item and it's not in the base popular tools
    if (activeMenuItem && !popularToolsBase.some(tool => tool?.id === activeMenuItem.id)) {
      // Replace the last item with the active item to maintain 4 items
      return [...popularToolsBase.slice(0, 3), activeMenuItem];
    }
    return popularToolsBase;
  })();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main header row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <div className="relative">
              <Image
                src="/assets/logo.png"
                alt="Pixel Craft Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl shadow-md"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Pixel Craft
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">Professional Tools</p>
            </div>
          </Link>

          {/* Menu Options - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Popular Tools */}
              <div className="flex items-center gap-4">
                {popularTools.map((item, index) => {
                  if (!item) return null;
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-500 hover:backdrop-blur-lg hover:ring-1 hover:ring-primary/20 whitespace-nowrap border min-w-fit transform-gpu animate-in fade-in slide-in-from-top-2 overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground shadow-lg shadow-primary/25 border-primary ring-1 ring-primary/30'
                          : 'bg-card hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-accent-foreground shadow-sm hover:shadow-lg hover:shadow-primary/15 border-border hover:border-primary/30'
                      }`}
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animationDuration: '600ms',
                        animationFillMode: 'both',
                      }}
                    >
                      <div className="relative h-4 w-4 flex-shrink-0">
                        <AnimatedIcon iconName={item.icon} size="sm" isActive={isActive} />
                      </div>
                      <span
                        className={`text-sm font-medium transition-all duration-300 group-hover:font-semibold group-hover:tracking-wide ${
                          isActive ? '' : 'dark:group-hover:text-white group-hover:text-black'
                        }`}
                      >
                        {item.label}
                      </span>
                      {/* Animated background shimmer */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      {item.id === 'background-remove' && (
                        <Badge
                          variant="secondary"
                          className="ml-1 text-xs py-0 px-1 flex-shrink-0 animate-pulse hover:animate-bounce transition-all duration-400"
                        >
                          HOT
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* More Tools Button */}
              <Sheet open={isDesktopSheetOpen} onOpenChange={setIsDesktopSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15 hover:ring-1 hover:ring-primary/20 group overflow-hidden relative"
                  >
                    <div className="relative h-4 w-4">
                      <AnimatedIcon iconName="Sparkles" size="sm" />
                    </div>
                    <span className="text-sm font-medium transition-all duration-300 group-hover:font-semibold group-hover:tracking-wide dark:group-hover:text-white group-hover:text-black">
                      All Tools
                    </span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-96 max-h-screen overflow-hidden">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-bold">All Tools</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 mt-6 h-full overflow-hidden">
                    <div className="text-center px-4">
                      <p className="text-sm text-muted-foreground">
                        Choose from our complete toolkit
                      </p>
                    </div>

                    {/* Scrollable Tools Grid */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
                      <div className="grid grid-cols-2 gap-3 py-6">
                        {menus.map((item, index) => {
                          const isActive = pathname === item.href;

                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={() => setIsDesktopSheetOpen(false)}
                              className={`group relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-500 hover:ring-2 hover:ring-primary/20 transform-gpu animate-in fade-in slide-in-from-bottom-4 overflow-hidden ${
                                isActive
                                  ? 'bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground border-primary shadow-lg shadow-primary/25 ring-2 ring-primary/30'
                                  : 'bg-card hover:bg-gradient-to-br hover:from-primary/8 hover:to-primary/3 hover:text-accent-foreground border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/12'
                              }`}
                              style={{
                                animationDelay: `${index * 80}ms`,
                                animationDuration: '600ms',
                                animationFillMode: 'both',
                              }}
                            >
                              <div
                                className={`p-3 rounded-xl transition-all duration-500 group-hover:rotate-3 group-hover:brightness-110 ${
                                  isActive
                                    ? 'bg-primary-foreground/20 shadow-lg shadow-primary/20'
                                    : 'bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-md group-hover:shadow-primary/10'
                                }`}
                              >
                                <AnimatedIcon iconName={item.icon} size="lg" isActive={isActive} />
                              </div>
                              <div className="text-center w-full overflow-hidden">
                                <span
                                  className={`text-sm font-medium leading-tight block truncate px-1 transition-all duration-300 group-hover:font-semibold group-hover:tracking-wide ${
                                    isActive
                                      ? ''
                                      : 'dark:group-hover:text-white group-hover:text-black'
                                  }`}
                                >
                                  {item.label}
                                </span>
                              </div>
                              {/* Radial glow effect */}
                              <div className="absolute inset-0 rounded-xl bg-gradient-radial from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/2 group-hover:to-transparent transition-all duration-700 -z-10"></div>
                              {item.id === 'background-remove' && (
                                <Badge
                                  variant="secondary"
                                  className="absolute -top-2 -right-2 text-xs z-10 animate-pulse hover:animate-bounce transition-all duration-400"
                                >
                                  Popular
                                </Badge>
                              )}
                              {item.id === 'video-converter' && (
                                <Badge
                                  variant="secondary"
                                  className="absolute -top-2 -right-2 text-xs z-10 animate-pulse hover:animate-bounce transition-all duration-400"
                                >
                                  New
                                </Badge>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <ThemeToggleSimple />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggleSimple />
            <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-96 max-h-screen">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-center gap-3">
                    <Image
                      src="/assets/logo.png"
                      alt="Pixel Craft Logo"
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-lg"
                    />
                    <span className="text-lg font-bold">Pixel Craft</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-6 h-full">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Professional Image Tools</p>
                  </div>

                  {/* Scrollable Menu Items */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="grid grid-cols-1 gap-2 pb-6 px-2">
                      {menus.map((item, index) => {
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            onClick={() => setIsMobileSheetOpen(false)}
                            className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-500 hover:ring-1 hover:ring-primary/20 transform-gpu animate-in slide-in-from-right-4 fade-in overflow-hidden relative ${
                              isActive
                                ? 'bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground shadow-lg shadow-primary/25 ring-1 ring-primary/30'
                                : 'hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:text-accent-foreground hover:shadow-md hover:shadow-primary/15'
                            }`}
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animationDuration: '500ms',
                              animationFillMode: 'both',
                            }}
                          >
                            <div
                              className={`p-2 rounded-xl transition-all duration-500 group-hover:rotate-6 group-hover:brightness-110 ${
                                isActive
                                  ? 'bg-primary-foreground/20 shadow-md shadow-primary/20'
                                  : 'bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-sm group-hover:shadow-primary/10'
                              }`}
                            >
                              <AnimatedIcon iconName={item.icon} size="sm" isActive={isActive} />
                            </div>
                            <span
                              className={`font-medium transition-all duration-300 group-hover:font-semibold group-hover:tracking-wide ${
                                isActive ? '' : 'dark:group-hover:text-white group-hover:text-black'
                              }`}
                            >
                              {item.label}
                            </span>
                            {/* Sliding shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out -z-10"></div>
                            {item.id === 'background-remove' && (
                              <Badge
                                variant="secondary"
                                className="ml-auto text-xs animate-pulse hover:animate-bounce transition-all duration-400"
                              >
                                HOT
                              </Badge>
                            )}
                            {item.id === 'video-converter' && (
                              <Badge
                                variant="secondary"
                                className="ml-auto text-xs animate-pulse hover:animate-bounce transition-all duration-400"
                              >
                                New
                              </Badge>
                            )}
                            {/* Hover slide effect */}
                          </Link>
                        );
                      })}
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

export { HeaderOption2 as HeaderMain };
