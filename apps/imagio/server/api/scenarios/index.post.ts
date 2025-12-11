import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

interface CreateScenarioRequest {
  name: string;
  code: string;
  description?: string;
  introduction?: string;
  level?: number;
  maxAttempts?: number;
  totalTime?: number;
}

interface CreateScenarioResponse {
  success: boolean;
  scenario: {
    id: string;
    code: string;
    title: string;
    description: string;
    level: number;
    maxAttempts: number;
    examId?: string;
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateScenarioRequest>(event)
  
  if (!body.name || !body.code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and code are required'
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

    // Create new course with exam in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create exam first
      const exam = await tx.exam.create({
        data: {
          title: body.name,
          description: body.description || '',
          sourceText: body.introduction || '',
          level: body.level || 1,
          duration: body.totalTime || 3600 // 1 hour default
        }
      })

      // Create course
      const course = await tx.course.create({
        data: {
          code: body.code,
          title: body.name,
          description: body.description || '',
          level: body.level || 1,
          maxAttempts: body.maxAttempts || 3,
          totalTime: body.totalTime || 3600,
          totalQuestions: 0,
          timePerQuestion: 300, // 5 minutes default
          examId: exam.id,
          isPublished: true
        }
      })

      return { course, exam }
    })

    return success({
      scenario: {
        id: result.course.id,
        code: result.course.code,
        title: result.course.title,
        description: result.course.description,
        level: result.course.level,
        maxAttempts: result.course.maxAttempts || 3,
        examId: result.exam.id
      }
    })
  } catch (error) {
    console.error('Error creating scenario:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating scenario'
    })
  }
})