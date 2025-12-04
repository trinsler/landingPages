export default defineEventHandler(async (event) => {
  // CORS headers for API requests
  const origin = getHeader(event, 'origin')
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://imagio-app.com', // Production domain
    'https://www.imagio-app.com'
  ]

  // Check if origin is allowed
  if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development')) {
    setHeader(event, 'Access-Control-Allow-Origin', origin)
  }

  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  setHeader(event, 'Access-Control-Max-Age', '86400') // 24 hours

  // Handle preflight OPTIONS requests
  if (getMethod(event) === 'OPTIONS') {
    setResponseStatus(event, 204)
    return ''
  }
})