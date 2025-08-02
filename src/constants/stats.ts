import { ImageIcon, Wand2, Users, Shield, TrendingUp } from 'lucide-react';
import { features } from './home';

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  increment: string;
  description: string;
}

export const getAppStats = (): StatItem[] => {
  const totalFeatures = features.length;
  const aiPoweredFeatures = features.filter(f => f.aiPowered).length;

  // Use static values to prevent hydration mismatches
  // These could be replaced with real API data later
  const baseImagesProcessed = 15307;
  const monthlyIncrease = 2847;
  const weeklyUserGrowth = 18;
  const activeUsers = 5512;

  return [
    {
      id: 'images',
      value: baseImagesProcessed.toLocaleString(),
      label: 'Images Processed',
      icon: ImageIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      increment: `+${monthlyIncrease.toLocaleString()} this month`,
      description: 'Total images enhanced across all tools',
    },
    {
      id: 'tools',
      value: totalFeatures.toString(),
      label: 'Powerful Tools',
      icon: Wand2,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      increment: `${aiPoweredFeatures} AI-powered`,
      description: 'Professional-grade image processing tools',
    },
    {
      id: 'users',
      value: activeUsers.toLocaleString(),
      label: 'Happy Users',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      increment: `+${weeklyUserGrowth}% this week`,
      description: 'Active users transforming images daily',
    },
    {
      id: 'security',
      value: '100%',
      label: 'Secure & Private',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      increment: 'SSL encrypted',
      description: 'Your images are processed securely and never stored',
    },
  ];
};

export const additionalMetrics = [
  {
    value: '99.9%',
    label: 'Uptime',
    description: 'Service availability',
  },
  {
    value: '<2s',
    label: 'Avg Processing',
    description: 'Lightning fast results',
  },
  {
    value: '24/7',
    label: 'Available',
    description: 'Always ready to serve',
  },
  {
    value: 'Free',
    label: 'Forever',
    description: 'No hidden costs',
  },
];
