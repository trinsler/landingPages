import { prisma } from '~/server/lib/prisma'

interface GenerateCodeResponse {
  success: boolean
  data: {
    code: string
    isUnique: boolean
  }
  timestamp: string
}

/**
 * Smart algorithm to generate unique course codes for 1000+ users
 * Format: 3 letters + 3 numbers (e.g., ABC123)
 * Total possible combinations: 26^3 * 1000 = 17,576,000 codes
 */
export default defineEventHandler(async (): Promise<GenerateCodeResponse> => {
  const timestamp = new Date().toISOString()
  
  try {
    // Get all existing codes from database
    const existingCourses = await prisma.course.findMany({
      select: { code: true }
    })
    const existingCodes = new Set(existingCourses.map(c => c.code.toUpperCase()))

    // Algorithm: Generate codes systematically to avoid collisions
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const maxAttempts = 100

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      let code: string

      if (attempt < 50) {
        // First 50 attempts: Use systematic generation for better distribution
        const letterIndex1 = Math.floor(Math.random() * 26)
        const letterIndex2 = Math.floor(Math.random() * 26)
        const letterIndex3 = Math.floor(Math.random() * 26)
        const numbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
        
        code = letters[letterIndex1] + letters[letterIndex2] + letters[letterIndex3] + numbers
      } else {
        // Fallback: Include timestamp for uniqueness
        const timestamp = Date.now().toString().slice(-3)
        const letterIndex1 = Math.floor(Math.random() * 26)
        const letterIndex2 = Math.floor(Math.random() * 26)
        
        code = letters[letterIndex1] + letters[letterIndex2] + 'X' + timestamp
      }

      // Check if code is unique
      if (!existingCodes.has(code)) {
        console.log(`Generated unique code: ${code} (attempt ${attempt + 1})`)
        return {
          success: true,
          data: {
            code,
            isUnique: true
          },
          timestamp
        }
      }
    }

    // If we couldn't generate a unique code, use UUID-based fallback
    const fallbackCode = 'GEN' + Math.random().toString(36).substr(2, 3).toUpperCase()
    console.warn(`Using fallback code generation: ${fallbackCode}`)
    
    return {
      success: true,
      data: {
        code: fallbackCode,
        isUnique: !existingCodes.has(fallbackCode)
      },
      timestamp
    }
    
  } catch (error) {
    console.error('Error generating course code:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating unique course code'
    })
  }
})