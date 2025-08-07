/**
 * Statistics and analytics constants
 * Configuration for app stats, metrics, and real-time data simulation
 */

// Google Analytics configuration
export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

// Base statistics for simulation
export const BASE_STATS = {
  IMAGES_PROCESSED: 15000,
  ACTIVE_USERS: 5400,
  TOTAL_USERS: 12000,
  TOOLS_AVAILABLE: 8,
  AI_TOOLS: 5,
  UPTIME_PERCENTAGE: 99.9,
  BASE_PROCESSING_TIME: 1.8,
  PROCESSING_TIME_VARIANCE: 0.4,
} as const;

// Random variation ranges for simulated stats
export const STATS_VARIATIONS = {
  IMAGES_PROCESSED: { min: 200, max: 500 },
  ACTIVE_USERS: { min: 20, max: 100 },
  TOTAL_USERS: { min: 50, max: 200 },
  MONTHLY_GROWTH: { min: 15, max: 25 },
} as const;

// Event types for real-time activity simulation
export const ACTIVITY_EVENTS = [
  'image_resized',
  'background_removed',
  'image_compressed',
  'placeholder_generated',
  'text_extracted',
  'svg_converted',
  'video_converted',
  'batch_processed',
  'ocr_completed',
  'filter_applied',
] as const;

// User locations for activity simulation
export const USER_LOCATIONS = [
  'US',
  'UK',
  'CA',
  'AU',
  'DE',
  'FR',
  'JP',
  'BR',
  'IN',
  'CN',
  'RU',
  'ES',
  'IT',
  'NL',
  'SE',
  'NO',
  'DK',
  'FI',
  'KR',
  'SG',
] as const;

// Number formatting thresholds
export const NUMBER_FORMAT_THRESHOLDS = {
  MILLION: 1000000,
  THOUSAND: 1000,
  MILLION_SUFFIX: 'M',
  THOUSAND_SUFFIX: 'K',
  DECIMAL_PLACES: 1,
} as const;

// Time constants for statistics
export const STATS_TIME_CONSTANTS = {
  MILLISECONDS_PER_DAY: 1000 * 60 * 60 * 24,
  SEED_MULTIPLIER: 9999,
  SEED_OFFSET: 10000,
  UPDATE_INTERVAL: 30000, // 30 seconds
  CACHE_DURATION: 300000, // 5 minutes
} as const;

// Performance monitoring constants
export const ANALYTICS_PERFORMANCE_METRICS = {
  SLOW_OPERATION_THRESHOLD: 5000, // milliseconds
  MEMORY_WARNING_THRESHOLD: 100 * 1024 * 1024, // 100MB
  ERROR_RATE_THRESHOLD: 0.05, // 5%
  SUCCESS_RATE_TARGET: 0.95, // 95%

  // Processing time targets (milliseconds)
  TARGET_TIMES: {
    compression: 2000,
    'background-removal': 8000,
    ocr: 3000,
    resize: 1000,
    filter: 500,
  },
} as const;
