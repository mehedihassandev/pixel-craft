import { useState, useEffect } from 'react';
import { getAppStats } from '@/constants/stats';
import type { StatItem } from '@/constants/stats';

/**
 * Hook for managing dynamic app statistics
 * This can be extended to fetch real data from APIs
 */
export const useAppStats = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const fetchStats = () => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const newStats = getAppStats();
        setStats(newStats);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 100);
    };

    // Initial fetch
    fetchStats();

    // Update every 30 seconds for demo purposes
    // In production, this might be every few minutes or triggered by events
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshStats = () => {
    const newStats = getAppStats();
    setStats(newStats);
    setLastUpdated(new Date());
  };

  return {
    stats,
    isLoading,
    lastUpdated,
    refreshStats,
  };
};

/**
 * Hook for simulating real-time data updates
 * This demonstrates how you might handle live statistics
 */
export const useRealTimeStats = () => {
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional image processing
      if (Math.random() > 0.7) {
        setLiveCount(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return liveCount;
};
