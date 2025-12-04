import jwt from 'jsonwebtoken'
import { createErrorResponse, ErrorCodes, HttpStatus } from '~/server/lib/response-formatter'

interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'user'
  iat: number
  exp: number
}

// Extended H3Event with authenticated user
declare module 'h3' {
  interface H3EventContext {
    user?: AuthUser
  }
}

export default defineEventHandler(async (event) => {
  // Skip auth for certain endpoints
  const skipAuthPaths = [
    '/api/health',
    '/api/courses', // GET courses (public)
    '/api/utils/generate-course-code', // Utility endpoint
  ]

  // Skip auth for GET requests on public endpoints
  if (event.node.req.method === 'GET' && event.node.req.url?.startsWith('/api/courses')) {
    return
  }

  // Skip if path is in whitelist
  if (skipAuthPaths.some(path => event.node.req.url?.startsWith(path))) {
    return
  }

  try {
    // Get token from Authorization header
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      setResponseStatus(event, HttpStatus.UNAUTHORIZED)
      return createErrorResponse(
        ErrorCodes.UNAUTHORIZED,
        'Authorization token required',
        HttpStatus.UNAUTHORIZED
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    const secret = process.env.JWT_SECRET || 'default-secret-change-in-production'

    // Verify and decode token
    const decoded = jwt.verify(token, secret) as AuthUser
    
    // Add user to event context
    event.context.user = decoded

    console.log(`Authenticated user: ${decoded.email} (${decoded.role})`)
  } catch (error) {
    console.error('Authentication failed:', error)
    
    let errorCode = ErrorCodes.UNAUTHORIZED
    let errorMessage = 'Invalid authentication token'
    
    if (error instanceof jwt.TokenExpiredError) {
      errorCode = ErrorCodes.TOKEN_EXPIRED
      errorMessage = 'Authentication token has expired'
    }
    
    setResponseStatus(event, HttpStatus.UNAUTHORIZED)
    return createErrorResponse(
      errorCode,
      errorMessage,
      HttpStatus.UNAUTHORIZED
    )
  }
})