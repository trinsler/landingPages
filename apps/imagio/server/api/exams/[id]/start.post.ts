import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'

interface StartExamRequest {
  userId: string;
}

interface StartExamResponse {
  attemptId: string;
  examId: string;
  startedAt: string;
  questions: QuestionDetails[];
}

interface QuestionDetails {
  id: string;
  text: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  keywords: string[];
  selected: boolean;
}

export default defineEventHandler(async (event): Promise<StartExamResponse> => {
  const examId = getRouterParam(event, 'id')
  
  if (!examId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Exam ID is required'
    })
  }

  const body = await readBody<StartExamRequest>(event)
  
  if (!body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  try {
    // Find or create user
    let user = await prisma.user.findUnique({
      where: { id: body.userId }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: body.userId,
          sessionId: body.userId
        }
      })
    }

    // Get exam with questions
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: {
        questions: {
          where: { selected: true },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!exam) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Exam not found'
      })
    }

    // Create exam attempt
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: user.id,
        examId: exam.id,
        level: exam.level,
        startedAt: new Date()
      }
    })

    const questions: QuestionDetails[] = exam.questions.map(question => ({
      id: question.id,
      text: question.text,
      difficulty: question.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
      keywords: JSON.parse(question.keywords || '[]'),
      selected: question.selected
    }))

    return {
      attemptId: attempt.id,
      examId: exam.id,
      startedAt: attempt.startedAt.toISOString(),
      questions
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error starting exam'
    })
  }
})