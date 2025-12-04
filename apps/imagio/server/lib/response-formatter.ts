// Standardized API Response Formats

export interface SuccessResponse<T = any> {
  success: true
  data: T
  timestamp: string
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      totalPages: number
    }
    version?: string
  }
}

export interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    statusCode: number
    details?: any
  }
  timestamp: string
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse

// Helper functions for consistent responses
export function createSuccessResponse<T>(
  data: T, 
  meta?: SuccessResponse<T>['meta']
): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...(meta && { meta })
  }
}

export function createErrorResponse(
  code: string,
  message: string,
  statusCode: number,
  details?: any
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      statusCode,
      details
    },
    timestamp: new Date().toISOString()
  }
}

// Common error codes
export const ErrorCodes = {
  // Authentication & Authorization
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
  INVALID_FORMAT: 'INVALID_FORMAT',
  
  // Business Logic
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
  
  // Courses
  COURSE_NOT_FOUND: 'COURSE_NOT_FOUND',
  COURSE_CODE_EXISTS: 'COURSE_CODE_EXISTS',
  COURSE_CREATION_FAILED: 'COURSE_CREATION_FAILED',
  
  // Exams
  EXAM_NOT_FOUND: 'EXAM_NOT_FOUND',
  EXAM_NOT_PUBLISHED: 'EXAM_NOT_PUBLISHED',
  EXAM_ALREADY_STARTED: 'EXAM_ALREADY_STARTED',
  
  // System
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
} as const

// HTTP Status Codes mapping
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const