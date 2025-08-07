/**
 * Processing-related constants
 * Includes API timeouts, progress intervals, performance thresholds
 */

// Processing timeouts and intervals
export const PROCESSING_TIMEOUTS = {
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  BACKGROUND_REMOVAL_TIMEOUT: 60000, // 60 seconds
  VIDEO_CONVERSION_TIMEOUT: 300000, // 5 minutes
  BATCH_PROCESSING_TIMEOUT: 600000, // 10 minutes
} as const;

export const PROGRESS_INTERVALS = {
  DEFAULT_PROGRESS_INTERVAL: 200, // milliseconds
  FAST_PROGRESS_INTERVAL: 100,
  SLOW_PROGRESS_INTERVAL: 500,
  PROGRESS_STEP: 10, // percentage increment
  MAX_SIMULATED_PROGRESS: 90, // percentage
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  SLOW_COMPRESSION_TIME: 10000, // milliseconds
  LOW_END_MAX_DIMENSION: 1280,
  HIGH_END_MAX_DIMENSION: 1920,
  MEMORY_WARNING_THRESHOLD: 100 * 1024 * 1024, // 100MB
  CANVAS_POOL_SIZE: 3,
  QUEUE_MAX_SIZE: 10,
} as const;

// Processing queue settings
export const QUEUE_SETTINGS = {
  MAX_CONCURRENT_PROCESSES: 3,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // milliseconds
  BATCH_SIZE: 5,
} as const;

// Simulation settings for development
export const SIMULATION_SETTINGS = {
  MIN_DELAY: 500, // milliseconds
  MAX_DELAY: 1000,
  NETWORK_SIMULATION_DELAY: 800,
  ERROR_SIMULATION_RATE: 0.05, // 5% chance
  REAL_TIME_EVENT_INTERVAL: 3000, // milliseconds
  EVENT_PROBABILITY: 0.4, // 40% chance
} as const;
