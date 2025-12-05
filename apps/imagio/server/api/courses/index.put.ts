import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, readBody, createError } from 'h3'

interface UpdateCourseRequest {
  id: string;
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

interface UpdateCourseResponse {
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
    examId?: string;
  };
}

export default defineEventHandler(async (event): Promise<UpdateCourseResponse> => {
  const body = await readBody<UpdateCourseRequest>(event)
  
  if (!body.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Course ID is required'
    })
  }

  if (!body.title || !body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and code are required'
    })
  }

  try {
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id: body.id }
    })

    if (!existingCourse) {
      throw createError({
        statusCode: 404,
        statusMessage: `Course not found with ID: ${body.id}`
      })
    }

    // Check if new code is already taken by another course
    if (body.code !== existingCourse.code) {
      const codeConflict = await prisma.course.findUnique({
        where: { code: body.code }
      })

      if (codeConflict && codeConflict.id !== body.id) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Course code already exists'
        })
      }
    }

    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id: body.id },
      data: {
        code: body.code,
        title: body.title,
        description: body.description || '',
        level: body.level || 1,
        totalTime: body.totalTime || 3600,
        totalQuestions: body.totalQuestions || 0,
        timePerQuestion: body.timePerQuestion || 300,
        maxAttempts: body.maxAttempts || 3,
        isPublished: body.isPublished !== false // Default to true
      }
    })

    return {
      success: true,
      course: {
        id: updatedCourse.id,
        code: updatedCourse.code,
        title: updatedCourse.title,
        description: updatedCourse.description,
        level: updatedCourse.level,
        totalTime: updatedCourse.totalTime,
        totalQuestions: updatedCourse.totalQuestions,
        timePerQuestion: updatedCourse.timePerQuestion,
        maxAttempts: updatedCourse.maxAttempts || 3,
        examId: updatedCourse.examId || undefined
      }
    }
  } catch (error) {
    console.error('Error updating course:', error)
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
    let errorMessage = 'Error updating course'
    if (error.message) {
      errorMessage = `Error updating course: ${error.message}`
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: errorMessage
    })
  }
})