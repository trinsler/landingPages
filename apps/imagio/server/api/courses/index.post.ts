import { prisma } from '~/server/lib/prisma'

interface CreateCourseRequest {
  code: string
  title: string
  description: string
  level: number
  totalTime: number
  totalQuestions: number
  timePerQuestion: number
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
  try {
    const body = await readBody<CreateCourseRequest>(event)

    // Validation
    if (!body.code || !body.title) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Code and title are required'
      })
    }

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

    // Create course
    const course = await prisma.course.create({
      data: {
        code: body.code,
        title: body.title,
        description: body.description,
        level: body.level,
        totalTime: body.totalTime,
        totalQuestions: body.totalQuestions,
        timePerQuestion: body.timePerQuestion,
        isPublished: body.isPublished ?? true
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
    console.error('Error creating course:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating course'
    })
  }
})
