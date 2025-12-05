import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'

interface UpdateCourseRequest {
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
  const id = getRouterParam(event, 'id')
  const body = await readBody<UpdateCourseRequest>(event)
  
  console.log('Course update - Params:', event.node.req.url, 'ID:', id, 'Body:', body)
  
  if (!id) {
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
      where: { id }
    })

    if (!existingCourse) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course not found'
      })
    }

    // Check if new code is already taken by another course
    if (body.code !== existingCourse.code) {
      const codeConflict = await prisma.course.findUnique({
        where: { code: body.code }
      })

      if (codeConflict && codeConflict.id !== id) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Course code already exists'
        })
      }
    }

    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id },
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
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating course'
    })
  }
})