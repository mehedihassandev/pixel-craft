'use client';

import { useState } from 'react';
import { HeaderOption1 } from './header-option-1';
import { HeaderOption2 } from './header-option-2';
import { HeaderOption3 } from './header-option-3';
import { HeaderOption4 } from './header-option-4';
import { Header } from './header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Palette,
  Layout,
  Monitor,
  Settings,
  Star,
  ChevronRight,
  Eye,
  Code,
  Smartphone,
} from 'lucide-react';

const headerOptions = [
  {
    id: 'current',
    name: 'Current Design',
    description: 'Your existing header with horizontal menu layout',
    component: Header,
    features: ['Horizontal menu', 'Mobile sheet', 'Simple layout'],
    color: 'from-gray-500 to-gray-600',
    icon: Layout,
  },
  {
    id: 'option1',
    name: 'Categorized Dropdowns',
    description: 'Organized menu with dropdown categories for better navigation',
    component: HeaderOption1,
    features: ['Categorized tools', 'Dropdown menus', 'Better organization', 'Animated logo'],
    color: 'from-blue-500 to-blue-600',
    icon: Settings,
  },
  {
    id: 'option2',
    name: 'Modern Quick Access',
    description: 'Highlights popular tools with modern card-based all tools view',
    component: HeaderOption2,
    features: ['Popular tools', 'Card-based layout', 'Status badges', 'Modern design'],
    color: 'from-purple-500 to-purple-600',
    icon: Star,
  },
  {
    id: 'option3',
    name: 'Minimalist Sidebar',
    description: 'Clean header with searchable sidebar navigation',
    component: HeaderOption3,
    features: [
      'Minimalist design',
      'Searchable tools',
      'Current tool display',
      'Slide-out sidebar',
    ],
    color: 'from-green-500 to-green-600',
    icon: Monitor,
  },
  {
    id: 'option4',
    name: 'Command Palette',
    description: 'Modern command palette with keyboard shortcuts (⌘K)',
    component: HeaderOption4,
    features: ['Command palette', 'Keyboard shortcuts', 'Quick search', 'Professional feel'],
    color: 'from-orange-500 to-orange-600',
    icon: Code,
  },
];

const HeaderShowcase = () => {
  const [selectedHeader, setSelectedHeader] = useState('current');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const CurrentHeaderComponent =
    headerOptions.find(h => h.id === selectedHeader)?.component || Header;

  const currentOption = headerOptions.find(h => h.id === selectedHeader);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Live Preview Header */}
      <div
        className={`transition-all duration-500 ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}`}
      >
        <div className="border-2 border-primary/20 rounded-lg overflow-hidden bg-background shadow-lg">
          <div className="bg-primary/5 px-3 py-1 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Live Preview - {currentOption?.name}</span>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className="h-6 px-2 text-xs"
              >
                <Monitor className="h-3 w-3 mr-1" />
                Desktop
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className="h-6 px-2 text-xs"
              >
                <Smartphone className="h-3 w-3 mr-1" />
                Mobile
              </Button>
            </div>
          </div>
          <CurrentHeaderComponent />
        </div>
      </div>

      {/* Showcase content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Header Design Studio
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Interactive showcase of optimized header designs for your Pixel Craft application.
              Click any design to see it live above.
            </p>
          </div>

          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Design Gallery
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Feature Comparison
              </TabsTrigger>
              <TabsTrigger value="implementation" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Implementation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="space-y-6">
              {/* Quick Switch Bar */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Quick Switch</h3>
                  <Badge variant="outline" className="capitalize">
                    {selectedHeader === 'current' ? 'Default' : selectedHeader}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {headerOptions.map(option => {
                    const IconComponent = option.icon;
                    return (
                      <Button
                        key={option.id}
                        variant={selectedHeader === option.id ? 'default' : 'outline'}
                        onClick={() => setSelectedHeader(option.id)}
                        className="flex items-center gap-2"
                      >
                        <IconComponent className="h-4 w-4" />
                        {option.name}
                        {selectedHeader === option.id && <ChevronRight className="h-3 w-3" />}
                      </Button>
                    );
                  })}
                </div>
              </Card>

              {/* Header Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {headerOptions.map(option => {
                  const IconComponent = option.icon;
                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                        selectedHeader === option.id
                          ? 'ring-2 ring-primary shadow-xl scale-[1.02]'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedHeader(option.id)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg bg-gradient-to-r ${option.color} text-white`}
                            >
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{option.name}</CardTitle>
                              {selectedHeader === option.id && (
                                <Badge variant="default" className="mt-1">
                                  Active
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <CardDescription className="mt-2">{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">
                              Key Features:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {option.features.map((feature, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <Button
                            className="w-full"
                            variant={selectedHeader === option.id ? 'default' : 'outline'}
                            onClick={e => {
                              e.stopPropagation();
                              setSelectedHeader(option.id);
                            }}
                          >
                            {selectedHeader === option.id ? (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                Currently Viewing
                              </>
                            ) : (
                              <>
                                <ChevronRight className="h-4 w-4 mr-2" />
                                Preview This Design
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Comparison Matrix</CardTitle>
                  <CardDescription>
                    Compare the key features across all header designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Feature</th>
                          {headerOptions.map(option => (
                            <th key={option.id} className="text-center p-2 min-w-24">
                              {option.name.split(' ')[0]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          'Mobile Responsive',
                          'Search Functionality',
                          'Keyboard Shortcuts',
                          'Visual Organization',
                          'Quick Access',
                          'Professional Look',
                          'Space Efficient',
                          'User-Friendly',
                        ].map(feature => (
                          <tr key={feature} className="border-b">
                            <td className="p-2 font-medium">{feature}</td>
                            {headerOptions.map(option => (
                              <td key={option.id} className="text-center p-2">
                                {/* Simplified rating system */}
                                <div className="flex justify-center">
                                  {feature === 'Mobile Responsive'
                                    ? '✅'
                                    : feature === 'Search Functionality' &&
                                        (option.id === 'option3' || option.id === 'option4')
                                      ? '✅'
                                      : feature === 'Keyboard Shortcuts' && option.id === 'option4'
                                        ? '✅'
                                        : feature === 'Visual Organization' &&
                                            (option.id === 'option1' || option.id === 'option2')
                                          ? '✅'
                                          : feature === 'Quick Access' &&
                                              (option.id === 'option2' || option.id === 'option4')
                                            ? '✅'
                                            : feature === 'Professional Look' &&
                                                (option.id === 'option3' || option.id === 'option4')
                                              ? '✅'
                                              : feature === 'Space Efficient' &&
                                                  option.id === 'option3'
                                                ? '✅'
                                                : feature === 'User-Friendly' &&
                                                    option.id !== 'current'
                                                  ? '✅'
                                                  : feature === 'Mobile Responsive'
                                                    ? '✅'
                                                    : '○'}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>How to Use</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">1. Choose Your Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Click on any design card above to preview it live
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">2. Test Responsiveness</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the Desktop/Mobile toggle to test different screen sizes
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">3. Implement</h4>
                      <p className="text-sm text-muted-foreground">
                        Replace your current header import with the chosen option
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Code</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted p-4 rounded-md text-sm font-mono">
                      <div className="text-muted-foreground mb-2">
                        {/* Replace in your layout file: */}
                      </div>
                      <div className="text-red-500">
                        - import {'{ Header }'} from '@/components/layout/header';
                      </div>
                      <div className="text-green-500">
                        + import {'{ '}
                        {currentOption?.name.replace(/\s+/g, '')} {'}'} from
                        '@/components/layout/header-{selectedHeader}';
                      </div>
                      <div className="mt-2 text-muted-foreground">{/* Then use: */}</div>
                      <div className="text-blue-500">
                        {'<'}
                        {currentOption?.name.replace(/\s+/g, '') || 'Header'} {'/>'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Implementation Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Design Notes & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                      <strong className="text-blue-700 dark:text-blue-300">
                        Option 1 (Categorized Dropdowns):
                      </strong>
                      <p className="text-blue-600 dark:text-blue-400 mt-1">
                        Best for users who want organized access to tools. Groups related
                        functionality together. Ideal for complex applications with many features.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20">
                      <strong className="text-purple-700 dark:text-purple-300">
                        Option 2 (Modern Quick Access):
                      </strong>
                      <p className="text-purple-600 dark:text-purple-400 mt-1">
                        Highlights popular tools while keeping all tools accessible. Great for user
                        engagement and promoting key features.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                      <strong className="text-green-700 dark:text-green-300">
                        Option 3 (Minimalist Sidebar):
                      </strong>
                      <p className="text-green-600 dark:text-green-400 mt-1">
                        Clean, professional look with powerful search functionality. Ideal for
                        focused workflows and professional users.
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20">
                      <strong className="text-orange-700 dark:text-orange-300">
                        Option 4 (Command Palette):
                      </strong>
                      <p className="text-orange-600 dark:text-orange-400 mt-1">
                        Modern developer-like experience with keyboard shortcuts. Appeals to power
                        users and technical audiences.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl border">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">8</div>
              <div className="text-sm text-blue-600/70 dark:text-blue-400/70">Total Tools</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl border">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5</div>
              <div className="text-sm text-purple-600/70 dark:text-purple-400/70">
                Design Options
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl border">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">100%</div>
              <div className="text-sm text-green-600/70 dark:text-green-400/70">
                Mobile Responsive
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl border">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">A11y</div>
              <div className="text-sm text-orange-600/70 dark:text-orange-400/70">Accessible</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderShowcase;
