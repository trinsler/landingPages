// Simple API helpers - replaces response-formatter.ts (111 lines)

export function success<T>(data: T) {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  }
}

export function error(message: string, code = 500) {
  return {
    error: true,
    message,
    statusCode: code,
    timestamp: new Date().toISOString()
  }
}