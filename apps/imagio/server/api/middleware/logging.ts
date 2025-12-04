import { createErrorResponse, ErrorCodes, HttpStatus } from '~/server/lib/response-formatter'

interface RequestLog {
  id: string
  timestamp: string
  method: string
  url: string
  userAgent?: string
  ip: string
  userId?: string
  responseTime?: number
  statusCode?: number
  error?: string
}

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Request logging
const requestLogs: RequestLog[] = []

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  
  // Get request details
  const method = getMethod(event)
  const url = getRequestURL(event)
  const userAgent = getHeader(event, 'user-agent')
  const ip = getClientIP(event) || 'unknown'
  const userId = event.context.user?.id

  // Create request log entry
  const logEntry: RequestLog = {
    id: requestId,
    timestamp: new Date().toISOString(),
    method,
    url: url.pathname + url.search,
    userAgent,
    ip,
    userId
  }

  // Add request ID to headers for debugging
  setHeader(event, 'X-Request-ID', requestId)

  console.log(`[${requestId}] ${method} ${url.pathname} - IP: ${ip}${userId ? ` - User: ${userId}` : ''}`)

  // Rate limiting (100 requests per minute per IP)
  const rateLimitKey = ip
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 100

  let rateLimitData = rateLimitStore.get(rateLimitKey)
  
  if (!rateLimitData || rateLimitData.resetTime < now) {
    rateLimitData = { count: 1, resetTime: now + windowMs }
  } else {
    rateLimitData.count++
  }
  
  rateLimitStore.set(rateLimitKey, rateLimitData)

  // Check rate limit
  if (rateLimitData.count > maxRequests) {
    const timeUntilReset = Math.ceil((rateLimitData.resetTime - now) / 1000)
    
    console.warn(`Rate limit exceeded for IP ${ip}: ${rateLimitData.count} requests`)
    
    setResponseStatus(event, HttpStatus.TOO_MANY_REQUESTS)
    setHeader(event, 'Retry-After', timeUntilReset.toString())
    
    return createErrorResponse(
      ErrorCodes.RATE_LIMIT_EXCEEDED,
      `Rate limit exceeded. Try again in ${timeUntilReset} seconds.`,
      HttpStatus.TOO_MANY_REQUESTS
    )
  }

  // Add rate limit headers
  setHeader(event, 'X-RateLimit-Limit', maxRequests.toString())
  setHeader(event, 'X-RateLimit-Remaining', Math.max(0, maxRequests - rateLimitData.count).toString())
  setHeader(event, 'X-RateLimit-Reset', Math.ceil(rateLimitData.resetTime / 1000).toString())

  // Handle response logging
  const originalEnd = event.node.res.end
  event.node.res.end = function(chunk?: any, encoding?: any) {
    const responseTime = Date.now() - startTime
    logEntry.responseTime = responseTime
    logEntry.statusCode = event.node.res.statusCode

    // Log response
    console.log(`[${requestId}] ${logEntry.statusCode} - ${responseTime}ms`)

    // Store log (in production, send to logging service)
    requestLogs.push(logEntry)
    
    // Keep only last 1000 requests in memory
    if (requestLogs.length > 1000) {
      requestLogs.shift()
    }

    // Call original end method
    return originalEnd.call(this, chunk, encoding)
  }

  // Clean up old rate limit entries periodically
  if (Math.random() < 0.01) { // 1% chance per request
    const cutoff = Date.now() - windowMs
    for (const [key, data] of rateLimitStore.entries()) {
      if (data.resetTime < cutoff) {
        rateLimitStore.delete(key)
      }
    }
  }
})