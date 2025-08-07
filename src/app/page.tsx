'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ImageIcon,
  Zap,
  Sparkles,
  FileText,
  Layers,
  ArrowRight,
  Star,
  Wand2,
  Users,
  Shield,
  TrendingUp,
  GitFork,
} from 'lucide-react';
import { features } from '@/constants/home';
import { getAppStats, additionalMetrics } from '@/constants/stats';
import { useGitHubStats, formatNumber, timeAgo } from '@/hooks/use-github-stats';

export default function Home() {
  // Get static stats data to prevent hydration mismatches
  const stats = getAppStats();

  // Get real GitHub stats
  const { stats: githubStats, loading: githubLoading } = useGitHubStats();

  // Get popular and new features for quick access
  const popularFeatures = features.filter(f => f.popular);
  const newFeatures = features.filter(f => f.new);
  const aiFeatures = features.filter(f => f.aiPowered);

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

          {/* Project Creator & GitHub Stats */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Badge
                variant="outline"
                className="px-4 py-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
              >
                🚀 Built by &nbsp;
                <a
                  href="https://mehedihassan.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-2"
                >
                  Md. Mehedi Hassan
                </a>
                &nbsp; with ❤️
              </Badge>

              {/* GitHub Stars */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/mehedihassandev/pixel-craft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                  <Star className="h-4 w-4" />
                  <span className="font-medium">Star on GitHub</span>
                  <Badge variant="secondary" className="bg-gray-700 text-white text-xs">
                    {githubLoading ? '⭐ ...' : `⭐ ${formatNumber(githubStats?.stars || 0)}`}
                  </Badge>
                </a>
                <a
                  href="https://github.com/mehedihassandev/pixel-craft/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:scale-105 shadow-lg"
                >
                  <GitFork className="h-4 w-4" />
                  <span className="font-medium">Fork</span>
                  {!githubLoading && githubStats && (
                    <Badge variant="secondary" className="bg-blue-500 text-white text-xs">
                      {formatNumber(githubStats.forks)}
                    </Badge>
                  )}
                </a>
              </div>
            </div>
          </div>
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

        {/* Project Information Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-200 dark:border-indigo-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About PixelCraft
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
                PixelCraft is a comprehensive, open-source image processing platform that I've built
                to democratize access to professional-grade image editing tools. Combining the power
                of artificial intelligence with intuitive design, this project represents my
                commitment to creating accessible, high-quality software for the global developer
                and creator community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Project Vision */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/25 border border-white/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                    <Sparkles className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Vision</h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  To make professional image processing tools accessible to everyone, regardless of
                  budget or technical expertise. Every feature is designed with simplicity and power
                  in mind.
                </p>
              </div>

              {/* Technology Stack */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25 border border-white/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                    <Layers className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    Tech Stack
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'AI APIs'].map(tech => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Built with modern web technologies for optimal performance and user experience.
                  </p>
                </div>
              </div>

              {/* Open Source Commitment */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-pink-500/25 border border-white/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl group-hover:bg-pink-200 dark:group-hover:bg-pink-800/50 transition-colors">
                    <Users className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    Open Source
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Completely free and open-source under MIT license. Contributions, feedback, and
                  feature requests from the community are always welcome and appreciated.
                </p>
              </div>
            </div>

            {/* Creator Information */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg ring-4 ring-white/50 dark:ring-slate-700/50">
                    <Image
                      src="/assets/me.jpg"
                      alt="Md. Mehedi Hassan"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Built by Md. Mehedi Hassan
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    Full-stack developer passionate about creating tools that solve real problems. I
                    believe in the power of open-source software to make technology accessible to
                    everyone.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <a
                      href="https://mehedihassan.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      🌐 Portfolio
                    </a>
                    <a
                      href="https://github.com/mehedihassandev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      💻 GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/mehedihassandev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                    >
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      Project Status
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Active Development
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Access</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Jump right into our most popular and newest tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Popular Tools */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Star className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold">Popular Tools</h3>
              </div>
              <div className="space-y-3">
                {popularFeatures.map(feature => {
                  const IconComponent = feature.icon;
                  return (
                    <Link
                      key={feature.id}
                      href={feature.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${feature.color} bg-opacity-20`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-medium group-hover:text-orange-600 transition-colors">
                        {feature.title}
                      </span>
                      <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* AI-Powered Tools */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered</h3>
              </div>
              <div className="space-y-3">
                {aiFeatures.map(feature => {
                  const IconComponent = feature.icon;
                  return (
                    <Link
                      key={feature.id}
                      href={feature.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${feature.color} bg-opacity-20`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-medium group-hover:text-purple-600 transition-colors">
                        {feature.title}
                      </span>
                      <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* New Features */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">New Features</h3>
              </div>
              <div className="space-y-3">
                {newFeatures.map(feature => {
                  const IconComponent = feature.icon;
                  return (
                    <Link
                      key={feature.id}
                      href={feature.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all group"
                    >
                      <div className={`p-2 rounded-lg ${feature.color} bg-opacity-20`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="font-medium group-hover:text-green-600 transition-colors">
                        {feature.title}
                      </span>
                      <Badge className="ml-auto bg-green-500 hover:bg-green-600 text-xs">New</Badge>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* All Tools Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">All Tools</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Explore our complete collection of professional image processing tools. Each tool is
              crafted to deliver exceptional results with ease of use.
            </p>
          </div>

          {/* Simple Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map(feature => {
              const IconComponent = feature.icon;
              return (
                <Link key={feature.id} href={feature.href}>
                  <Card className="group h-full hover:shadow-2xl shadow-lg hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-700">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-colors">
                          <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                          {feature.popular && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {feature.new && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            >
                              ✨ New
                            </Badge>
                          )}
                          {feature.aiPowered && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            >
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 mt-auto">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {feature.category}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
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
                <Badge variant="secondary" className="ml-2 bg-gray-700 text-white">
                  {githubLoading ? '⭐ ...' : `⭐ ${formatNumber(githubStats?.stars || 0)}`}
                </Badge>
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
            <a
              href="https://github.com/mehedihassandev/pixel-craft/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                <FileText className="h-5 w-5 mr-2" />
                Report Issues
              </Button>
            </a>
          </div>

          {/* GitHub Repository Stats */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                🚀 Open Source Project Stats
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join our growing community of developers and contributors
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {githubLoading ? '⭐ ...' : `⭐ ${formatNumber(githubStats?.stars || 0)}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {githubLoading ? '🍴 ...' : `🍴 ${formatNumber(githubStats?.forks || 0)}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Forks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {githubLoading ? '🐛 ...' : `🐛 ${formatNumber(githubStats?.issues || 0)}`}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Open Issues</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  📝 MIT
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">License</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your content?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
            Choose any tool above to get started. No registration required, completely free to use.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 italic">
            "Built with passion by Md. Mehedi Hassan to empower creators worldwide" 💙
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            <a
              href="https://github.com/mehedihassandev/pixel-craft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Star className="h-5 w-5 mr-2" />
                Star on GitHub
              </Button>
            </a>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{features.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{aiFeatures.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">AI-Powered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Watermarks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
