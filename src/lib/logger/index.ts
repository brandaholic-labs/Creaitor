import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Winston Logger Singleton
 * 
 * Features:
 * - Log levels: error, warn, info, debug
 * - JSON format for production (structured logging)
 * - Pretty print format for development
 * - File transports with rotation: error.log, combined.log
 * - Console transport for development
 * 
 * Architecture: src/lib/logger/index.ts (Architecture § Project Structure)
 * Log Strategy: Architecture § Logging Strategy (lines 101-106)
 */

// Custom format for development (colorized, pretty print)
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

// Production format (JSON structured logging for aggregation tools like Logtail/Sentry)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// File transport configuration with daily rotation
const createRotateTransport = (filename: string, level?: string) => {
  return new DailyRotateFile({
    filename: path.join('logs', filename),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',  // AC4: Max 20MB per file
    maxFiles: '14d', // AC4: Keep 14 days history
    level,
    format: prodFormat,
  });
};

// Create logger instance
const logger = winston.createLogger({
  level: isDev ? 'debug' : 'info',
  format: isDev ? devFormat : prodFormat,
  transports: [
    // AC1: File transports
    createRotateTransport('error-%DATE%.log', 'error'),     // Errors only
    createRotateTransport('combined-%DATE%.log'),           // All logs
    
    // AC1: Console transport for development
    ...(isDev
      ? [
          new winston.transports.Console({
            format: devFormat,
          }),
        ]
      : []),
  ],
  // Performance: async/non-blocking file logging
  exitOnError: false,
});

// Export singleton logger instance
export default logger;

/**
 * AC2: Logger utility functions
 */

/**
 * Log user event (authentication, profile updates, etc.)
 * @param userId - User ID
 * @param eventType - Event type (e.g., 'login', 'profile_update')
 * @param metadata - Additional event metadata
 */
export function logUserEvent(
  userId: string,
  eventType: string,
  metadata?: object
): void {
  logger.info(`User event: ${eventType}`, {
    userId,
    eventType,
    ...metadata,
  });
}

/**
 * Log AI call for tracking AI provider usage, tokens, and latency
 * @param brandId - Brand ID
 * @param provider - AI provider (e.g., 'openai', 'anthropic')
 * @param tokens - Token count
 * @param latency - Latency in milliseconds
 */
export function logAICall(
  brandId: string,
  provider: string,
  tokens: number,
  latency: number
): void {
  logger.info(`AI call: ${provider}`, {
    brandId,
    provider,
    tokens,
    latency,
    category: 'ai_tracking',
  });
}

/**
 * Log publish event to Meta API (Facebook, Instagram)
 * @param postId - Post ID
 * @param platform - Platform ('facebook' | 'instagram')
 * @param status - Publish status ('success' | 'failed')
 * @param metadata - Additional metadata (e.g., error details)
 */
export function logPublishEvent(
  postId: string,
  platform: string,
  status: string,
  metadata?: object
): void {
  const level = status === 'success' ? 'info' : 'error';
  logger[level](`Publish event: ${platform} - ${status}`, {
    postId,
    platform,
    status,
    category: 'publishing',
    ...metadata,
  });
}

/**
 * Log error with standardized error object handling
 * @param error - Error object
 * @param context - Additional context (e.g., function name, user ID)
 */
export function logError(error: Error, context?: object): void {
  logger.error(error.message, {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    ...context,
  });
}
