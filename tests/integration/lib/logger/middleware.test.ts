/**
 * Integration tests for Request Logging Middleware
 * 
 * Test Coverage:
 * - AC3: Request logging middleware (logRequest standalone function)
 * - Logs timestamp, requestId, method, URL, duration, statusCode
 * 
 * Note: withRequestLogging HOC will be tested in E2E tests due to Next.js server component mocking complexity
 */

jest.mock('@/lib/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

// Import after mocks
import { logRequest } from '@/lib/logger/middleware';
import logger from '@/lib/logger';

describe('Request Logging Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('AC3: logRequest standalone function', () => {
    it('should log API request with all parameters', () => {
      logRequest('GET', '/api/posts', 200, 150, 'user_123');

      expect(logger.info).toHaveBeenCalledWith(
        'API Request',
        expect.objectContaining({
          method: 'GET',
          url: '/api/posts',
          statusCode: 200,
          duration: 150,
          userId: 'user_123',
          timestamp: expect.any(String),
        })
      );
    });

    it('should work without userId', () => {
      logRequest('POST', '/api/brands', 201, 300);
      
      expect(logger.info).toHaveBeenCalledWith(
        'API Request',
        expect.objectContaining({
          method: 'POST',
          url: '/api/brands',
          statusCode: 201,
          duration: 300,
          timestamp: expect.any(String),
        })
      );
    });

    it('should log request with error status codes', () => {
      logRequest('DELETE', '/api/posts/123', 404, 50);
      
      expect(logger.info).toHaveBeenCalledWith(
        'API Request',
        expect.objectContaining({
          method: 'DELETE',
          statusCode: 404,
          duration: 50,
        })
      );
    });

    it('should include timestamp in ISO format', () => {
      logRequest('PATCH', '/api/brands/456', 200, 200);
      
      const callArgs = (logger.info as jest.Mock).mock.calls[0][1];
      expect(callArgs.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
});

