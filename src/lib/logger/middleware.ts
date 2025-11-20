import { NextRequest, NextResponse } from 'next/server';
import logger from './index';

/**
 * AC3: Request Logging Middleware
 * 
 * Logs incoming API requests with:
 * - Timestamp
 * - Request ID
 * - Method, URL
 * - Duration
 * - Status code
 * - User ID (if authenticated)
 * 
 * Usage in Next.js API routes:
 * 
 * ```typescript
 * import { withRequestLogging } from '@/lib/logger/middleware';
 * 
 * export const GET = withRequestLogging(async (request: NextRequest) => {
 *   // Your handler logic
 *   return NextResponse.json({ data: 'example' });
 * });
 * ```
 */

export interface RequestLogContext {
  requestId: string;
  method: string;
  url: string;
  userId?: string;
  startTime: number;
}

/**
 * Generate a unique request ID
 */
function generateRequestId(): string {
  // Use crypto for request ID generation (Node.js built-in)
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Extract user ID from request (auth session)
 * For now returns undefined, will be implemented in Epic 2 (Multi-Tenant Auth)
 */
async function extractUserId(request: NextRequest): Promise<string | undefined> {
  // TODO Epic 2: Extract userId from Supabase auth session
  // const supabase = createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // return user?.id;
  return undefined;
}

/**
 * Higher-order function to wrap API route handlers with request logging
 * 
 * @param handler - Next.js API route handler
 * @returns Wrapped handler with logging
 */
export function withRequestLogging(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    const requestId = generateRequestId();
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;

    // Extract userId (if authenticated)
    const userId = await extractUserId(request);

    // Log incoming request
    logger.info('Incoming request', {
      requestId,
      method,
      url,
      userId,
      timestamp: new Date().toISOString(),
    });

    try {
      // Execute the actual handler
      const response = await handler(request, context);

      // Calculate request duration
      const duration = Date.now() - startTime;
      const statusCode = response.status;

      // Log request completion
      logger.info('Request completed', {
        requestId,
        method,
        url,
        userId,
        statusCode,
        duration,
      });

      return response;
    } catch (error) {
      // Calculate request duration
      const duration = Date.now() - startTime;

      // Log request error
      logger.error('Request failed', {
        requestId,
        method,
        url,
        userId,
        duration,
        error: error instanceof Error ? error.message : String(error),
      });

      // Re-throw error to be handled by Next.js error handling
      throw error;
    }
  };
}

/**
 * Standalone request logger function (for custom middleware usage)
 */
export function logRequest(
  method: string,
  url: string,
  statusCode: number,
  duration: number,
  userId?: string
): void {
  logger.info('API Request', {
    method,
    url,
    statusCode,
    duration,
    userId,
    timestamp: new Date().toISOString(),
  });
}
