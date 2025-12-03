import { prisma } from '~/server/lib/prisma'

interface QuestionData {
  text: string
  answer?: string
  difficulty: string
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
          create: body.questions.map((q, index) => ({
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
      await prisma.course.update({
        where: { id: body.courseId },
        data: { examId: exam.id }
      })
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
      statusMessage: 'Error creating exam'
    })
  }
})
