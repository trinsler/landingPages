import { prisma } from '~/server/lib/prisma'
import { createSuccessResponse, createErrorResponse, ErrorCodes, HttpStatus, type ApiResponse } from '~/server/lib/response-formatter'

interface CourseInfo {
  code: string;
  title: string;
  description: string;
  examId: string;
  totalTime: number;
  totalQuestions: number;
  timePerQuestion: number;
  level: number;
}

export default defineEventHandler(async (event): Promise<ApiResponse<CourseInfo[]>> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        exam: true
      },
      orderBy: [
        { level: 'asc' },
        { code: 'asc' }
      ]
    })

    const courseInfos: CourseInfo[] = courses.map(course => ({
      code: course.code,
      title: course.title,
      description: course.description,
      examId: course.examId || '',
      totalTime: course.totalTime,
      totalQuestions: course.totalQuestions,
      timePerQuestion: course.timePerQuestion,
      level: course.level
    }))

    return createSuccessResponse(courseInfos, {
      pagination: {
        page: 1,
        pageSize: courses.length,
        total: courses.length,
        totalPages: 1
      }
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    
    const errorResponse = createErrorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'Failed to fetch courses',
      HttpStatus.INTERNAL_SERVER_ERROR
    )
    
    setResponseStatus(event, HttpStatus.INTERNAL_SERVER_ERROR)
    return errorResponse
  }
})