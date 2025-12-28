import { prisma } from '~/server/lib/prisma'

interface StudentSessionRequest {
  name: string
  courseCode: string
}

interface StudentSessionResponse {
  success: boolean
  attemptId: string
  userId: string
  examData: {
    attemptId: string
    userId: string
  }
}

export default defineEventHandler(async (event): Promise<StudentSessionResponse> => {
  const body = await readBody<StudentSessionRequest>(event)

  if (!body.name || !body.courseCode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and course code are required'
    })
  }

  try {
    // Find course by code
    const course = await prisma.course.findUnique({
      where: { code: body.courseCode },
      include: { exam: true }
    })

    if (!course || !course.exam) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course or exam not found'
      })
    }

    // Create or find user
    const user = await prisma.user.upsert({
      where: { name: body.name },
      update: {},
      create: {
        name: body.name,
        email: `${body.name.toLowerCase().replace(/\s+/g, '.')}@demo.com`
      }
    })

    // Create exam attempt
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: user.id,
        examId: course.exam.id,
        attemptCount: 1,
        attemptsCount: 1,
        status: 'in_progress'
      }
    })

    const examData = {
      attemptId: attempt.id,
      userId: user.id
    }

    return {
      success: true,
      attemptId: attempt.id,
      userId: user.id,
      examData
    }

  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error creating student session:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error creating student session'
    })
  }
})