import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, readBody, createError } from 'h3'

interface QuestionData {
  text: string
  answer?: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  keywords: string[]
  selected?: boolean
  order?: number
}

interface CreateExamRequest {
  title: string
  description: string
  sourceText: string
  level: number
  duration?: number
  isPublished?: boolean
  courseId?: string
  questions?: QuestionData[]
}

interface ExamResponse {
  id: string
  title: string
  description: string
  sourceText: string
  level: number
  duration: number | null
  isPublished: boolean
  questionsCount: number
}

export default defineEventHandler(async (event): Promise<ExamResponse> => {
  try {
    const body = await readBody<CreateExamRequest>(event)

    // Validation
    if (!body.title || !body.description || !body.sourceText) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title, description, and sourceText are required'
      })
    }

    if (!body.level || body.level < 1 || body.level > 4) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Level must be between 1 and 4'
      })
    }

    // Validate questions if provided
    if (body.questions && body.questions.length > 0) {
      for (const question of body.questions) {
        if (!question.text || !question.text.trim()) {
          throw createError({
            statusCode: 400,
            statusMessage: 'All questions must have text'
          })
        }
        if (!['EASY', 'MEDIUM', 'HARD'].includes(question.difficulty)) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Question difficulty must be EASY, MEDIUM, or HARD'
          })
        }
      }
    }

    // Create exam with questions
    const exam = await prisma.exam.create({
      data: {
        title: body.title,
        description: body.description,
        sourceText: body.sourceText,
        level: body.level,
        duration: body.duration,
        isPublished: body.isPublished ?? true,
        questions: body.questions ? {
          create: body.questions.map((q: QuestionData, index: number) => ({
            text: q.text,
            answer: q.answer,
            difficulty: q.difficulty,
            keywords: JSON.stringify(q.keywords),
            selected: q.selected ?? true,
            order: q.order ?? index
          }))
        } : undefined
      },
      include: {
        questions: true
      }
    })

    // Link to course if courseId provided
    if (body.courseId) {
      try {
        await prisma.course.update({
          where: { id: body.courseId },
          data: { examId: exam.id }
        })
      } catch (courseError) {
        console.warn('Failed to link exam to course:', courseError)
        // Continue without linking - exam was created successfully
      }
    }

    return {
      id: exam.id,
      title: exam.title,
      description: exam.description,
      sourceText: exam.sourceText,
      level: exam.level,
      duration: exam.duration,
      isPublished: exam.isPublished,
      questionsCount: exam.questions.length
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error creating exam:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error creating exam: ${error.message}`
    })
  }
})
