import { prisma } from '~/server/lib/prisma'

interface UpdateCourseRequest {
  code?: string
  title?: string
  description?: string
  level?: number
  totalTime?: number
  totalQuestions?: number
  timePerQuestion?: number
  isPublished?: boolean
}

interface CourseResponse {
  id: string
  code: string
  title: string
  description: string
  level: number
  totalTime: number
  totalQuestions: number
  timePerQuestion: number
  isPublished: boolean
}

export default defineEventHandler(async (event): Promise<CourseResponse> => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Course ID is required'
    })
  }

  try {
    const body = await readBody<UpdateCourseRequest>(event)

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

    // If updating code, check for duplicates
    if (body.code && body.code !== existingCourse.code) {
      const duplicateCourse = await prisma.course.findUnique({
        where: { code: body.code }
      })

      if (duplicateCourse) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Course code already exists'
        })
      }
    }

    // Update course
    const course = await prisma.course.update({
      where: { id },
      data: {
        code: body.code,
        title: body.title,
        description: body.description,
        level: body.level,
        totalTime: body.totalTime,
        totalQuestions: body.totalQuestions,
        timePerQuestion: body.timePerQuestion,
        isPublished: body.isPublished
      }
    })

    return {
      id: course.id,
      code: course.code,
      title: course.title,
      description: course.description,
      level: course.level,
      totalTime: course.totalTime,
      totalQuestions: course.totalQuestions,
      timePerQuestion: course.timePerQuestion,
      isPublished: course.isPublished
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error updating course:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating course'
    })
  }
})
