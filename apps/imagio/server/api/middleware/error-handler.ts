import { createErrorResponse, ErrorCodes, HttpStatus } from '~/server/lib/response-formatter'

export default defineEventHandler(async (event) => {
  try {
    // Continue to next middleware/handler
    return
  } catch (error: any) {
    // Global error handling
    console.error('API Error:', {
      error: error.message,
      stack: error.stack,
      url: getRequestURL(event).pathname,
      method: getMethod(event),
      userId: event.context.user?.id,
      timestamp: new Date().toISOString()
    })

    // Determine error type and response
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR
    let errorCode = ErrorCodes.INTERNAL_ERROR
    let message = 'Internal server error'

    if (error.statusCode) {
      statusCode = error.statusCode
      message = error.statusMessage || message
    }

    // Map common error types
    if (error.name === 'ValidationError') {
      statusCode = HttpStatus.BAD_REQUEST
      errorCode = ErrorCodes.VALIDATION_ERROR
      message = error.message
    } else if (error.code === 'P2002') { // Prisma unique constraint
      statusCode = HttpStatus.CONFLICT
      errorCode = ErrorCodes.RESOURCE_ALREADY_EXISTS
      message = 'Resource already exists'
    } else if (error.code === 'P2025') { // Prisma record not found
      statusCode = HttpStatus.NOT_FOUND
      errorCode = ErrorCodes.RESOURCE_NOT_FOUND
      message = 'Resource not found'
    }

    // Set response status
    setResponseStatus(event, statusCode)

    // Return standardized error response
    return createErrorResponse(
      errorCode,
      message,
      statusCode,
      process.env.NODE_ENV === 'development' ? {
        originalError: error.message,
        stack: error.stack
      } : undefined
    )
  }
})