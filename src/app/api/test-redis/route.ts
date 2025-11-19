import Redis from 'ioredis'
import { NextResponse } from 'next/server'

/**
 * Test API route to verify Redis connection in Docker environment
 * GET /api/test-redis
 * 
 * This route is used for validation in Story 1.3 to verify:
 * - Redis client connection works (Docker service name resolution)
 * - SET/GET operations work correctly
 * - Connection uses Docker service name 'redis' (redis://redis:6379)
 */
export async function GET() {
  let redis: Redis | null = null
  
  try {
    // Get Redis URL from environment variable (default to Docker service name)
    const redisUrl = process.env.REDIS_URL || 'redis://redis:6379'
    
    // Create Redis client
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000)
        return delay
      },
    })
    
    // Test connection: PING
    const pingResult = await redis.ping()
    
    if (pingResult !== 'PONG') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Redis PING failed',
          pingResult 
        },
        { status: 500 }
      )
    }
    
    // Test SET operation
    const testKey = `test-key-${Date.now()}`
    const testValue = 'test-value'
    await redis.set(testKey, testValue, 'EX', 60) // Expires in 60 seconds
    
    // Test GET operation
    const retrievedValue = await redis.get(testKey)
    
    if (retrievedValue !== testValue) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Redis GET/SET mismatch',
          expected: testValue,
          actual: retrievedValue 
        },
        { status: 500 }
      )
    }
    
    // Cleanup: Delete test key
    await redis.del(testKey)
    
    return NextResponse.json({
      success: true,
      message: 'Redis connection successful',
      tests: {
        ping: pingResult,
        setGet: 'passed',
        connectionUrl: redisUrl.replace(/\/\/.*@/, '//***@') // Hide credentials if any
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : String(error)
      },
      { status: 500 }
    )
  } finally {
    // Cleanup: Close Redis connection
    if (redis) {
      redis.quit()
    }
  }
}

