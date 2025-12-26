import { prisma } from '~/server/lib/prisma'

interface GenerateCodeResponse {
  success: boolean
  code: string
}

/**
 * Simple algorithm: Generate random numbers until we find one that doesn't exist in DB
 */
export default defineEventHandler(async (): Promise<GenerateCodeResponse> => {
  try {
    // Simple loop: keep generating until we find unique code
    let attempts = 0
    const maxAttempts = 100
    
    while (attempts < maxAttempts) {
      // Generate simple random 6-digit code
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // Check if this code already exists in DB
      const existingCourse = await prisma.course.findUnique({
        where: { code: randomCode }
      })
      
      // If it doesn't exist, we found our unique code!
      if (!existingCourse) {
        return {
          success: true,
          code: randomCode
        }
      }
      
      attempts++
    }
    
    // Fallback: use timestamp if we couldn't find unique code
    const fallbackCode = Date.now().toString().slice(-6)
    
    return {
      success: true, 
      code: fallbackCode
    }
    
  } catch (error) {
    console.error('Error generating course code:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating course code'
    })
  }
})