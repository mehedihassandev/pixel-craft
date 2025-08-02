/**
 * Simulated API responses for app statistics
 * In a real application, these would be actual API endpoints
 */

export interface APIStatsResponse {
  images_processed: number;
  active_users: number;
  tools_available: number;
  ai_tools: number;
  uptime_percentage: number;
  avg_processing_time: number;
  total_users: number;
  monthly_growth: number;
  last_updated: string;
}

/**
 * Simulates fetching real-time statistics from an API
 * This demonstrates how you might integrate with actual backend services
 */
export const fetchAppStatistics = async (): Promise<APIStatsResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

  // Simulate some realistic data fluctuations
  const baseDate = new Date();
  const daysSinceEpoch = Math.floor(baseDate.getTime() / (1000 * 60 * 60 * 24));

  // Use day-based seed for consistent but changing data
  const seed = daysSinceEpoch;
  const random = (min: number, max: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  return {
    images_processed: 15000 + random(200, 500),
    active_users: 5400 + random(20, 100),
    tools_available: 8,
    ai_tools: 5,
    uptime_percentage: 99.9,
    avg_processing_time: 1.8 + Math.random() * 0.4,
    total_users: 12000 + random(50, 200),
    monthly_growth: random(15, 25),
    last_updated: new Date().toISOString(),
  };
};

/**
 * Simulates user activity events
 * This could be used to show live processing events
 */
export const subscribeToRealTimeEvents = (callback: (event: any) => void) => {
  const events = [
    'image_resized',
    'background_removed',
    'image_compressed',
    'placeholder_generated',
    'text_extracted',
    'svg_converted',
  ];

  const interval = setInterval(() => {
    if (Math.random() > 0.6) {
      // 40% chance of event
      const event = {
        type: events[Math.floor(Math.random() * events.length)],
        timestamp: new Date().toISOString(),
        user_location: ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'JP'][Math.floor(Math.random() * 7)],
      };
      callback(event);
    }
  }, 3000);

  return () => clearInterval(interval);
};

/**
 * Format large numbers for display
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
};
