// Unified Middleware - Scale-ready with Redis
import jwt from 'jsonwebtoken'
import { defineEventHandler, getMethod, getRequestURL, getHeader, setHeader, setResponseStatus, createError } from 'h3'
import { checkRateLimit } from '~/server/lib/redis'

interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'user'
  iat: number
  exp: number
}

declare module 'h3' {
  interface H3EventContext {
    user?: AuthUser
  }
}

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  const method = getMethod(event)
  const url = getRequestURL(event)
  const ip = getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'
  
  try {
    // 1. CORS (simplified)
    const origin = getHeader(event, 'origin')
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://yourdomain.com']
    
    if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development')) {
      setHeader(event, 'Access-Control-Allow-Origin', origin)
    }
    setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    setHeader(event, 'Access-Control-Allow-Credentials', 'true')
    
    if (method === 'OPTIONS') {
      setResponseStatus(event, 204)
      return ''
    }

    // 2. Redis-based Rate Limiting (Scale-ready)
    const rateLimit = await checkRateLimit(ip, 100, 60000) // 100 req/min
    
    // Add rate limit headers
    setHeader(event, 'X-RateLimit-Limit', '100')
    setHeader(event, 'X-RateLimit-Remaining', rateLimit.remaining.toString())
    setHeader(event, 'X-RateLimit-Reset', Math.ceil(rateLimit.resetTime / 1000).toString())
    
    if (!rateLimit.allowed) {
      setResponseStatus(event, 429)
      return {
        error: true,
        message: 'Rate limit exceeded',
        statusCode: 429,
        retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      }
    }

    // 3. Auth (simplified) - skip for public endpoints
    const publicPaths = ['/api/health', '/api/courses']
    const isPublicGet = method === 'GET' && url.pathname.startsWith('/api/courses')
    const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path))
    
    if (!isPublicGet && !isPublicPath) {
      const authHeader = getHeader(event, 'authorization')
      if (!authHeader?.startsWith('Bearer ')) {
        throw createError({ statusCode: 401, statusMessage: 'Authorization required' })
      }
      
      const token = authHeader.substring(7)
      const secret = process.env.JWT_SECRET || 'default-secret'
      
      try {
        const decoded = jwt.verify(token, secret) as AuthUser
        event.context.user = decoded
      } catch (error) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
      }
    }

    // 4. Basic Logging
    const responseTime = Date.now() - startTime
    console.log(`${method} ${url.pathname} ${ip} - ${responseTime}ms`)
    
  } catch (error: any) {
    // 5. Simple Error Handling
    console.error('API Error:', error.message)
    
    let statusCode = error.statusCode || 500
    let message = error.statusMessage || 'Internal server error'
    
    // Map Prisma errors
    if (error.code === 'P2002') {
      statusCode = 409
      message = 'Resource already exists'
    } else if (error.code === 'P2025') {
      statusCode = 404
      message = 'Resource not found'
    }
    
    setResponseStatus(event, statusCode)
    return {
      error: true,
      message,
      statusCode,
      timestamp: new Date().toISOString()
    }
  }
})