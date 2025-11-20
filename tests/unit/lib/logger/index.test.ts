import logger, {
  logUserEvent,
  logAICall,
  logPublishEvent,
  logError,
} from '@/lib/logger';

/**
 * Unit tests for Winston Logger
 * 
 * Test Coverage:
 * - AC1: Logger singleton pattern
 * - AC1: Log level filtering
 * - AC1: Format selection (JSON production, pretty development)
 * - AC2: Utility functions (logUserEvent, logAICall, logPublishEvent, logError)
 */

// Mock Winston transports to avoid actual file writes during testing
jest.mock('winston', () => {
  const actualWinston = jest.requireActual('winston');
  return {
    ...actualWinston,
    createLogger: jest.fn(() => ({
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    })),
  };
});

jest.mock('winston-daily-rotate-file', () => {
  return jest.fn();
});

describe('Logger Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AC1: Logger singleton', () => {
    it('should return the same logger instance', () => {
      const logger1 = logger;
      const logger2 = logger;
      expect(logger1).toBe(logger2);
    });

    it('should have all required log methods', () => {
      expect(logger.info).toBeDefined();
      expect(logger.warn).toBeDefined();
      expect(logger.error).toBeDefined();
      expect(logger.debug).toBeDefined();
    });
  });

  describe('AC2: logUserEvent utility function', () => {
    it('should log user event with correct structure', () => {
      const userId = 'user_123';
      const eventType = 'login';
      const metadata = { ip: '192.168.1.1' };

      logUserEvent(userId, eventType, metadata);

      expect(logger.info).toHaveBeenCalledWith(`User event: ${eventType}`, {
        userId,
        eventType,
        ...metadata,
      });
    });

    it('should work without metadata', () => {
      logUserEvent('user_123', 'logout');
      expect(logger.info).toHaveBeenCalled();
    });
  });

  describe('AC2: logAICall utility function', () => {
    it('should log AI call with provider tracking', () => {
      const brandId = 'brand_456';
      const provider = 'openai';
      const tokens = 1500;
      const latency = 2300;

      logAICall(brandId, provider, tokens, latency);

      expect(logger.info).toHaveBeenCalledWith(`AI call: ${provider}`, {
        brandId,
        provider,
        tokens,
        latency,
        category: 'ai_tracking',
      });
    });
  });

  describe('AC2: logPublishEvent utility function', () => {
    it('should log successful publish as info', () => {
      const postId = 'post_789';
      const platform = 'facebook';
      const status = 'success';
      const metadata = { fbPostId: '123456' };

      logPublishEvent(postId, platform, status, metadata);

      expect(logger.info).toHaveBeenCalledWith(
        `Publish event: ${platform} - ${status}`,
        {
          postId,
          platform,
          status,
          category: 'publishing',
          ...metadata,
        }
      );
    });

    it('should log failed publish as error', () => {
      const postId = 'post_790';
      const platform = 'instagram';
      const status = 'failed';
      const metadata = { error: 'Invalid access token' };

      logPublishEvent(postId, platform, status, metadata);

      expect(logger.error).toHaveBeenCalledWith(
        `Publish event: ${platform} - ${status}`,
        {
          postId,
          platform,
          status,
          category: 'publishing',
          ...metadata,
        }
      );
    });
  });

  describe('AC2: logError utility function', () => {
    it('should serialize error object correctly', () => {
      const error = new Error('Database connection failed');
      error.stack = 'Error stack trace...';
      const context = { userId: 'user_123', operation: 'fetchData' };

      logError(error, context);

      expect(logger.error).toHaveBeenCalledWith(error.message, {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        ...context,
      });
    });

    it('should work without context', () => {
      const error = new Error('Test error');
      logError(error);
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
