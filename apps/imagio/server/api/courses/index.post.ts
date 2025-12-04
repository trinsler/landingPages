import { prisma } from '~/server/lib/prisma'
import { createSuccessResponse, createErrorResponse, ErrorCodes, HttpStatus, type ApiResponse } from '~/server/lib/response-formatter'

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

export default defineEventHandler(async (event): Promise<ApiResponse<CourseResponse>> => {
  try {
    const body = await readBody<CreateCourseRequest>(event)

    // Validation
    if (!body.code || !body.title) {
      const errorResponse = createErrorResponse(
        ErrorCodes.VALIDATION_ERROR,
        'Code and title are required',
        HttpStatus.BAD_REQUEST
      )
      setResponseStatus(event, HttpStatus.BAD_REQUEST)
      return errorResponse
    }

    // Check if code already exists
    const existingCourse = await prisma.course.findUnique({
      where: { code: body.code }
    })

    if (existingCourse) {
      const errorResponse = createErrorResponse(
        ErrorCodes.COURSE_CODE_EXISTS,
        'Course code already exists',
        HttpStatus.CONFLICT
      )
      setResponseStatus(event, HttpStatus.CONFLICT)
      return errorResponse
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

    const courseResponse: CourseResponse = {
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

    setResponseStatus(event, HttpStatus.CREATED)
    return createSuccessResponse(courseResponse)
  } catch (error) {
    console.error('Error creating course:', error)
    
    const errorResponse = createErrorResponse(
      ErrorCodes.COURSE_CREATION_FAILED,
      'Error creating course',
      HttpStatus.INTERNAL_SERVER_ERROR
    )
    
    setResponseStatus(event, HttpStatus.INTERNAL_SERVER_ERROR)
    return errorResponse
  }
})
