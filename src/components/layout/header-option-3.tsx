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
  X,
  Search,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { menus } from '@/navigation/menus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { useState } from 'react';
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

const HeaderOption3 = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const filteredMenus = menus.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTool = menus.find(item => pathname === item.href);

  return (
    <>
      {/* Minimalist Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image
                src="/assets/logo.png"
                alt="Pixel Craft Logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
              />
              <h1 className="text-lg font-bold text-foreground">Pixel Craft</h1>
            </Link>

            {/* Current Tool Display */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              {currentTool && (
                <>
                  <span>Currently using:</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {(() => {
                      const IconComponent = iconMap[currentTool.icon as keyof typeof iconMap];
                      return <IconComponent className="h-3 w-3" />;
                    })()}
                    {currentTool.label}
                  </Badge>
                </>
              )}
            </div>

            {/* Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-background border-l z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logo.png"
                alt="Pixel Craft Logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
              />
              <div>
                <h2 className="font-bold text-foreground">Pixel Craft</h2>
                <p className="text-xs text-muted-foreground">Image Tools</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tools List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredMenus.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-4 p-3 rounded-xl transition-all hover:scale-[1.02] ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-foreground/20'
                          : 'bg-primary/10 group-hover:bg-primary/15'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium">{item.label}</span>
                      {item.id === 'background-remove' && (
                        <Badge variant="secondary" className="ml-2 text-xs py-0 px-2">
                          Popular
                        </Badge>
                      )}
                      {item.id === 'photo-editor' && (
                        <Badge variant="secondary" className="ml-2 text-xs py-0 px-2">
                          New
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {filteredMenus.length === 0 && (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-2">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No tools found</p>
                  <p className="text-xs">Try a different search term</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <Separator />
          <div className="p-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-2">
                {menus.length} Professional Tools Available
              </p>
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="text-sm text-primary hover:underline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { HeaderOption3 };
