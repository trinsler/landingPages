// Redis Client for Scale-ready Caching and Rate Limiting
import { Redis } from 'ioredis'

let redis: Redis | null = null

export function getRedisClient(): Redis | null {
  // REDIS IS COMPLETELY DISABLED FOR DEVELOPMENT
  console.log('Redis is disabled in development mode')
  return null
}

// Rate Limiting Functions
export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  total: number
}

export async function checkRateLimit(
  key: string, 
  limit: number, 
  windowMs: number = 60000
): Promise<RateLimitResult> {
  const client = getRedisClient()
  const now = Date.now()
  
  // If no Redis client, allow all requests (development mode)
  if (!client) {
    return {
      allowed: true,
      remaining: limit,
      resetTime: now + windowMs,
      total: limit
    }
  }

  const window = Math.floor(now / windowMs)
  const redisKey = `rate_limit:${key}:${window}`

  try {
    // Use Redis pipeline for atomic operations
    const pipeline = client.pipeline()
    pipeline.incr(redisKey)
    pipeline.expire(redisKey, Math.ceil(windowMs / 1000))
    
    const results = await pipeline.exec()
    const count = results?.[0]?.[1] as number || 0

    const allowed = count <= limit
    const remaining = Math.max(0, limit - count)
    const resetTime = (window + 1) * windowMs

    return {
      allowed,
      remaining,
      resetTime,
      total: limit
    }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    // Fail open - allow request if Redis is down
    return {
      allowed: true,
      remaining: limit,
      resetTime: now + windowMs,
      total: limit
    }
  }
}

// Caching Functions
export async function setCache(
  key: string, 
  value: any, 
  ttlSeconds: number = 300
): Promise<void> {
  const client = getRedisClient()
  
  // If no Redis client, skip caching (development mode)
  if (!client) {
    return
  }
  
  try {
    const serialized = JSON.stringify(value)
    await client.setex(key, ttlSeconds, serialized)
  } catch (error) {
    console.error('Cache set failed:', error)
    // Fail silently - don't break the application
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  const client = getRedisClient()
  
  // If no Redis client, return null (development mode)
  if (!client) {
    return null
  }
  
  try {
    const cached = await client.get(key)
    if (!cached) return null
    
    return JSON.parse(cached) as T
  } catch (error) {
    console.error('Cache get failed:', error)
    return null
  }
}

export async function deleteCache(key: string): Promise<void> {
  const client = getRedisClient()
  
  // If no Redis client, skip deletion (development mode)
  if (!client) {
    return
  }
  
  try {
    await client.del(key)
  } catch (error) {
    console.error('Cache delete failed:', error)
  }
}

// Session Management 
export async function setSession(
  sessionId: string, 
  data: any, 
  ttlSeconds: number = 3600
): Promise<void> {
  const client = getRedisClient()
  if (!client) {
    console.warn('Session storage disabled: No Redis client available')
    return
  }
  await setCache(`session:${sessionId}`, data, ttlSeconds)
}

export async function getSession<T>(sessionId: string): Promise<T | null> {
  const client = getRedisClient()
  if (!client) {
    return null
  }
  return await getCache<T>(`session:${sessionId}`)
}

export async function deleteSession(sessionId: string): Promise<void> {
  const client = getRedisClient()
  if (!client) {
    return
  }
  await deleteCache(`session:${sessionId}`)
}

// Health Check
export async function redisHealthCheck(): Promise<boolean> {
  try {
    const client = getRedisClient()
    if (!client) {
      return false // Redis is disabled
    }
    const result = await client.ping()
    return result === 'PONG'
  } catch (error) {
    console.error('Redis health check failed:', error)
    return false
  }
}

// Graceful Shutdown
export async function closeRedis(): Promise<void> {
  if (redis) {
    await redis.quit()
    redis = null
  }
}