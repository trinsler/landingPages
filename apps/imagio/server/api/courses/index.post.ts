import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, readBody, createError } from 'h3'

interface CreateCourseRequest {
  code: string;
  title: string;
  description?: string;
  level?: number;
  totalTime?: number;
  totalQuestions?: number;
  timePerQuestion?: number;
  maxAttempts?: number;
  isPublished?: boolean;
}

interface CreateCourseResponse {
  success: boolean;
  course: {
    id: string;
    code: string;
    title: string;
    description: string;
    level: number;
    totalTime: number;
    totalQuestions: number;
    timePerQuestion: number;
    maxAttempts: number;
    examId: string;
  };
}

export default defineEventHandler(async (event): Promise<CreateCourseResponse> => {
  const body = await readBody<CreateCourseRequest>(event)
  
  if (!body.title || !body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and code are required'
    })
  }

  try {
    // Check if code already exists
    const existingCourse = await prisma.course.findUnique({
      where: { code: body.code }
    })

    if (existingCourse) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Course code already exists'
      })
    }

    // Create course with exam in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create exam first
      const exam = await tx.exam.create({
        data: {
          title: body.title,
          description: body.description || '',
          sourceText: body.description || '',
          level: body.level || 1,
          duration: body.totalTime || 3600
        }
      })

      // Create course
      const course = await tx.course.create({
        data: {
          code: body.code,
          title: body.title,
          description: body.description || '',
          level: body.level || 1,
          totalTime: body.totalTime || 3600,
          totalQuestions: body.totalQuestions || 0,
          timePerQuestion: body.timePerQuestion || 300,
          maxAttempts: body.maxAttempts || 3,
          examId: exam.id,
          isPublished: body.isPublished !== false // Default to true
        }
      })

      return { course, exam }
    })

    return {
      success: true,
      course: {
        id: result.course.id,
        code: result.course.code,
        title: result.course.title,
        description: result.course.description,
        level: result.course.level,
        totalTime: result.course.totalTime,
        totalQuestions: result.course.totalQuestions,
        timePerQuestion: result.course.timePerQuestion,
        maxAttempts: result.course.maxAttempts || 3,
        examId: result.exam.id
      }
    }
  } catch (error) {
    console.error('Error creating course:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      stack: error.stack
    })
    
    if (error.statusCode) {
      throw error
    }
    
    // More specific error message
    let errorMessage = 'Error creating course'
    if (error.message) {
      errorMessage = `Error creating course: ${error.message}`
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})
