import { prisma } from '~/server/lib/prisma'

interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number
  database: {
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

    // Get memory usage
    const memoryUsage = process.memoryUsage()

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      database: {
        status: 'connected',
        response_time: dbResponseTime
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
      memory: {
        used: 0,
        free: 0,
        total: 0
      }
    }
  }
})