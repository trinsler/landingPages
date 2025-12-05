import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, createError } from 'h3'
import { createSuccessResponse, createErrorResponse, ErrorCodes, HttpStatus, type ApiResponse } from '~/server/lib/response-formatter'

interface ScenarioInfo {
  id: string;
  code: string;
  title: string;
  description: string;
  level: number;
  totalQuestions: number;
  maxAttempts: number;
  examId?: string;
}

export default defineEventHandler(async (event): Promise<ApiResponse<{ courses: ScenarioInfo[] }>> => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        exam: {
          include: {
            _count: {
              select: {
                questions: true
              }
            }
          }
        }
      },
      orderBy: [
        { level: 'asc' },
        { code: 'asc' }
      ]
    })

    const courseInfos: ScenarioInfo[] = courses.map(course => ({
      id: course.id,
      code: course.code,
      title: course.title,
      description: course.description,
      level: course.level,
      totalQuestions: course.exam?._count?.questions || 0,
      maxAttempts: course.maxAttempts || 3,
      examId: course.examId || undefined
    }))

    return createSuccessResponse({ courses: courseInfos }, {
      pagination: {
        page: 1,
        pageSize: courses.length,
        total: courses.length,
        totalPages: 1
      }
    })
  } catch (error) {
    console.error('Error fetching scenarios:', error)
    
    const errorResponse = createErrorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'Failed to fetch scenarios',
      HttpStatus.INTERNAL_SERVER_ERROR
    )
    
    return errorResponse
  }
})