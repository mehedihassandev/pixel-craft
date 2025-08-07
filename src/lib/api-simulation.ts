/**
 * Simulated API responses for app statistics
 * In a real application, these would be actual API endpoints
 */

import {
  BASE_STATS,
  STATS_VARIATIONS,
  ACTIVITY_EVENTS,
  USER_LOCATIONS,
  NUMBER_FORMAT_THRESHOLDS,
  STATS_TIME_CONSTANTS,
  SIMULATION_SETTINGS,
} from '@/constants';

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
  await new Promise(resolve =>
    setTimeout(
      resolve,
      Math.random() * SIMULATION_SETTINGS.MAX_DELAY + SIMULATION_SETTINGS.MIN_DELAY
    )
  );

  // Simulate some realistic data fluctuations
  const baseDate = new Date();
  const daysSinceEpoch = Math.floor(baseDate.getTime() / STATS_TIME_CONSTANTS.MILLISECONDS_PER_DAY);

  // Use day-based seed for consistent but changing data
  const seed = daysSinceEpoch;
  const random = (min: number, max: number) => {
    const x =
      Math.sin(seed * STATS_TIME_CONSTANTS.SEED_MULTIPLIER) * STATS_TIME_CONSTANTS.SEED_OFFSET;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  };

  return {
    images_processed:
      BASE_STATS.IMAGES_PROCESSED +
      random(STATS_VARIATIONS.IMAGES_PROCESSED.min, STATS_VARIATIONS.IMAGES_PROCESSED.max),
    active_users:
      BASE_STATS.ACTIVE_USERS +
      random(STATS_VARIATIONS.ACTIVE_USERS.min, STATS_VARIATIONS.ACTIVE_USERS.max),
    tools_available: BASE_STATS.TOOLS_AVAILABLE,
    ai_tools: BASE_STATS.AI_TOOLS,
    uptime_percentage: BASE_STATS.UPTIME_PERCENTAGE,
    avg_processing_time:
      BASE_STATS.BASE_PROCESSING_TIME + Math.random() * BASE_STATS.PROCESSING_TIME_VARIANCE,
    total_users:
      BASE_STATS.TOTAL_USERS +
      random(STATS_VARIATIONS.TOTAL_USERS.min, STATS_VARIATIONS.TOTAL_USERS.max),
    monthly_growth: random(
      STATS_VARIATIONS.MONTHLY_GROWTH.min,
      STATS_VARIATIONS.MONTHLY_GROWTH.max
    ),
    last_updated: new Date().toISOString(),
  };
};

/**
 * Simulates user activity events
 * This could be used to show live processing events
 */
export const subscribeToRealTimeEvents = (callback: (event: any) => void) => {
  const interval = setInterval(() => {
    if (Math.random() > 1 - SIMULATION_SETTINGS.EVENT_PROBABILITY) {
      const event = {
        type: ACTIVITY_EVENTS[Math.floor(Math.random() * ACTIVITY_EVENTS.length)],
        timestamp: new Date().toISOString(),
        user_location: USER_LOCATIONS[Math.floor(Math.random() * USER_LOCATIONS.length)],
      };
      callback(event);
    }
  }, SIMULATION_SETTINGS.REAL_TIME_EVENT_INTERVAL);

  return () => clearInterval(interval);
};

/**
 * Format large numbers for display
 */
export const formatNumber = (num: number): string => {
  if (num >= NUMBER_FORMAT_THRESHOLDS.MILLION) {
    return (
      (num / NUMBER_FORMAT_THRESHOLDS.MILLION).toFixed(NUMBER_FORMAT_THRESHOLDS.DECIMAL_PLACES) +
      NUMBER_FORMAT_THRESHOLDS.MILLION_SUFFIX
    );
  }
  if (num >= NUMBER_FORMAT_THRESHOLDS.THOUSAND) {
    return (
      (num / NUMBER_FORMAT_THRESHOLDS.THOUSAND).toFixed(NUMBER_FORMAT_THRESHOLDS.DECIMAL_PLACES) +
      NUMBER_FORMAT_THRESHOLDS.THOUSAND_SUFFIX
    );
  }
  return num.toLocaleString();
};
