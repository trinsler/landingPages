import { prisma } from '~/server/lib/prisma'
import { redisHealthCheck } from '~/server/lib/redis'
import { defineEventHandler, setResponseStatus } from 'h3'

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number
  database: {
    status: 'connected' | 'disconnected'
    response_time?: number
  }
  redis: {
    status: 'connected' | 'disconnected'
    response_time?: number
  }
  memory: {
    used: number
    free: number
    total: number
  }
}

export default defineEventHandler(async (event): Promise<HealthCheckResponse> => {
  const startTime = Date.now()
  
  try {
    // Test database connection
    const dbStart = Date.now()
    await prisma.$queryRaw`SELECT 1 as test`
    const dbResponseTime = Date.now() - dbStart

    // Test Redis connection
    const redisStart = Date.now()
    const redisHealthy = await redisHealthCheck()
    const redisResponseTime = Date.now() - redisStart

    // Get memory usage
    const memoryUsage = process.memoryUsage()

    const isHealthy = redisHealthy // Redis is critical for scale

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      database: {
        status: 'connected',
        response_time: dbResponseTime
      },
      redis: {
        status: redisHealthy ? 'connected' : 'disconnected',
        response_time: redisHealthy ? redisResponseTime : undefined
      },
      memory: {
        used: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
        free: Math.round((memoryUsage.heapTotal - memoryUsage.heapUsed) / 1024 / 1024), // MB
        total: Math.round(memoryUsage.heapTotal / 1024 / 1024) // MB
      }
    }
  } catch (error) {
    console.error('Health check failed:', error)
    
    // Set error status code
    setResponseStatus(event, 503)
    
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      database: {
        status: 'disconnected'
      },
      redis: {
        status: 'disconnected'
      },
      memory: {
        used: 0,
        free: 0,
        total: 0
      }
    }
  }
})