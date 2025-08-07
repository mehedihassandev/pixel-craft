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
  Search,
  Command,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { menus } from '@/navigation/menus';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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

const HeaderOption4 = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Keyboard shortcut for command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(open => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const filteredMenus = menus.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTool = menus.find(item => pathname === item.href);

  // Popular tools for quick access
  const popularTools = [
    menus.find(m => m.id === 'background-remove'),
    menus.find(m => m.id === 'resize'),
    menus.find(m => m.id === 'image-compress'),
  ].filter(Boolean);

  return (
    <>
      {/* Clean Header */}
      <header className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative">
                <Image
                  src="/assets/logo.png"
                  alt="Pixel Craft Logo"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-xl"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur opacity-75"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Pixel Craft
                </h1>
              </div>
            </Link>

            {/* Quick Tools - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {popularTools.map(item => {
                if (!item) return null;
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Command Palette + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Command Palette Trigger */}
              <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-9 w-full justify-start rounded-lg bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span className="hidden lg:inline-flex">Search tools...</span>
                    <span className="inline-flex lg:hidden">Search</span>
                    <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                      <span className="text-xs">⌘</span>K
                    </kbd>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-0 shadow-2xl">
                  <div className="flex flex-col h-[400px]">
                    {/* Search Input */}
                    <div className="flex items-center border-b px-3">
                      <Command className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <Input
                        placeholder="Search for tools..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    {/* Results */}
                    <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                      {filteredMenus.length > 0 ? (
                        <div className="p-2">
                          {searchQuery === '' ? (
                            <>
                              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                                Quick Actions
                              </div>
                              {popularTools.map(item => {
                                if (!item) return null;
                                const IconComponent = iconMap[item.icon as keyof typeof iconMap];

                                return (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setCommandOpen(false)}
                                    className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                  >
                                    <IconComponent className="h-4 w-4" />
                                    {item.label}
                                    {item.id === 'background-remove' && (
                                      <Badge variant="secondary" className="ml-auto text-xs">
                                        Popular
                                      </Badge>
                                    )}
                                  </Link>
                                );
                              })}
                              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                                All Tools
                              </div>
                              {menus
                                .filter(m => !popularTools.some(p => p?.id === m.id))
                                .map(item => {
                                  const IconComponent = iconMap[item.icon as keyof typeof iconMap];

                                  return (
                                    <Link
                                      key={item.id}
                                      href={item.href}
                                      onClick={() => setCommandOpen(false)}
                                      className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    >
                                      <IconComponent className="h-4 w-4" />
                                      {item.label}
                                    </Link>
                                  );
                                })}
                            </>
                          ) : (
                            filteredMenus.map(item => {
                              const IconComponent = iconMap[item.icon as keyof typeof iconMap];

                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onClick={() => setCommandOpen(false)}
                                  className="flex items-center gap-3 rounded-sm px-2 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                >
                                  <IconComponent className="h-4 w-4" />
                                  {item.label}
                                </Link>
                              );
                            })
                          )}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No tools found.
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

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
                          <h2 className="text-lg font-bold">Pixel Craft</h2>
                          <p className="text-xs text-muted-foreground">AI Image Tools</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-3">
                            POPULAR TOOLS
                          </h3>
                          <div className="space-y-1">
                            {popularTools.map(item => {
                              if (!item) return null;
                              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                              const isActive = pathname === item.href;

                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                    isActive
                                      ? 'bg-primary text-primary-foreground'
                                      : 'hover:bg-accent hover:text-accent-foreground'
                                  }`}
                                >
                                  <IconComponent className="h-5 w-5" />
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

                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-3">
                            ALL TOOLS
                          </h3>
                          <div className="space-y-1">
                            {menus
                              .filter(m => !popularTools.some(p => p?.id === m.id))
                              .map(item => {
                                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                                const isActive = pathname === item.href;

                                return (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                      isActive
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                  >
                                    <IconComponent className="h-5 w-5" />
                                    <span className="font-medium">{item.label}</span>
                                  </Link>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export { HeaderOption4 };
