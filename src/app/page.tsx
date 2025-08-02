'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon,
  Maximize,
  Eraser,
  Zap,
  Archive,
  Sparkles,
  FileText,
  Layers,
  ArrowRight,
  Star,
  Wand2,
  Users,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { features } from '@/constants/home';
import { getAppStats, additionalMetrics } from '@/constants/stats';

export default function Home() {
  // Get static stats data to prevent hydration mismatches
  const stats = getAppStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <Wand2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-6">
            PixelCraft
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Professional image processing tools powered by AI. Transform, optimize, and enhance your
            images with cutting-edge technology.
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {' '}
              Open source{' '}
            </span>
            and free for everyone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Star className="h-3 w-3 mr-1 text-yellow-600" />
              <span className="font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                AI Powered
              </span>
            </Badge>
            <Badge
              variant="outline"
              className="px-3 py-1 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-300 dark:border-green-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Users className="h-3 w-3 mr-1 text-green-600" />
              <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Open Source
              </span>
            </Badge>
            <Badge
              variant="outline"
              className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Free to Use
              </span>
            </Badge>
            <Badge
              variant="outline"
              className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border-cyan-300 dark:border-cyan-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                No Watermarks
              </span>
            </Badge>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {features.map(feature => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden relative"
              >
                {feature.popular && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>
                  </div>
                )}
                {feature.new && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
                  </div>
                )}
                <div className={`h-2 bg-gradient-to-r ${feature.gradient}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl ${feature.color} bg-opacity-10 mb-3`}>
                      <IconComponent
                        className={`h-6 w-6 text-${feature.color.split('-')[1]}-500`}
                      />
                    </div>
                    {feature.aiPowered && (
                      <Badge variant="secondary" className="text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link href={feature.href}>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors">
                      Try Now
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Trusted by Creators Worldwide</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Real-time statistics from our growing community
            </p>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live statistics
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(stat => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.id} className="group">
                  <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-105">
                    <div
                      className={`${stat.bgColor} p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div
                      className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium mb-2 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.increment}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {stat.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional metrics bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {additionalMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Source Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Open Source & Community Driven
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
              PixelCraft is proudly open source! Join our growing community of developers and
              contributors to help make image processing tools accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">MIT Licensed</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Free to use, modify, and distribute
              </p>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Built by developers, for developers
              </p>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Always Improving</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                New features and improvements regularly
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/mehedihassandev/pixel-craft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                <Star className="h-5 w-5 mr-2" />
                Star on GitHub
              </Button>
            </a>
            <a
              href="https://github.com/mehedihassandev/pixel-craft/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                <Users className="h-5 w-5 mr-2" />
                Contribute
              </Button>
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your images?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Choose any tool above to get started. No registration required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/placeholder">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <ImageIcon className="h-5 w-5 mr-2" />
                Start with Placeholders
              </Button>
            </Link>
            <Link href="/background-remove">
              <Button size="lg" variant="outline">
                <Sparkles className="h-5 w-5 mr-2" />
                Try AI Background Removal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
