import { prisma } from '~/server/lib/prisma'

interface QuestionUpdate {
  id?: string
  text: string
  answer?: string
  difficulty: string
  keywords: string[]
  selected?: boolean
  order?: number
}

interface UpdateExamRequest {
  title?: string
  description?: string
  sourceText?: string
  level?: number
  duration?: number
  isPublished?: boolean
  questions?: QuestionUpdate[]
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
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Exam ID is required'
    })
  }

  try {
    const body = await readBody<UpdateExamRequest>(event)

    // Check if exam exists
    const existingExam = await prisma.exam.findUnique({
      where: { id },
      include: { questions: true }
    })

    if (!existingExam) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Exam not found'
      })
    }

    // Update exam and handle questions
    const updateData: any = {
      title: body.title,
      description: body.description,
      sourceText: body.sourceText,
      level: body.level,
      duration: body.duration,
      isPublished: body.isPublished
    }

    // Handle questions update if provided
    if (body.questions) {
      // Delete all existing questions
      await prisma.question.deleteMany({
        where: { examId: id }
      })

      // Create new questions
      updateData.questions = {
        create: body.questions.map((q, index) => ({
          text: q.text,
          answer: q.answer,
          difficulty: q.difficulty,
          keywords: JSON.stringify(q.keywords),
          selected: q.selected ?? true,
          order: q.order ?? index
        }))
      }
    }

    const exam = await prisma.exam.update({
      where: { id },
      data: updateData,
      include: {
        questions: true
      }
    })

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
    console.error('Error updating exam:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating exam'
    })
  }
})
