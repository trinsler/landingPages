import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'

interface QuestionData {
  text: string;
  answer: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  keywords: string[];
  selected: boolean;
}

interface UpdateExamRequest {
  title: string;
  description?: string;
  introduction?: string;
  questions: QuestionData[];
}

interface UpdateExamResponse {
  success: boolean;
  exam: {
    id: string;
    title: string;
    description: string;
    questions: {
      id: string;
      text: string;
      difficulty: string;
      keywords: string[];
      selected: boolean;
    }[];
  };
}

export default defineEventHandler(async (event): Promise<UpdateExamResponse> => {
  const examId = getRouterParam(event, 'id')
  const body = await readBody<UpdateExamRequest>(event)
  
  if (!examId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Exam ID is required'
    })
  }

  if (!body.title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title is required'
    })
  }

  try {
    // Check if exam exists
    const existingExam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true }
    })

    if (!existingExam) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Exam not found'
      })
    }

    // Update exam and questions in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update exam
      const updatedExam = await tx.exam.update({
        where: { id: examId },
        data: {
          title: body.title,
          description: body.description || '',
          sourceText: body.introduction || body.description || ''
        }
      })

      // Delete existing questions
      await tx.question.deleteMany({
        where: { examId: examId }
      })

      // Create new questions
      const questions = []
      for (let i = 0; i < body.questions.length; i++) {
        const questionData = body.questions[i]
        const question = await tx.question.create({
          data: {
            examId: examId,
            text: questionData.text,
            difficulty: questionData.difficulty,
            keywords: JSON.stringify(questionData.keywords),
            selected: questionData.selected,
            order: i + 1
          }
        })
        questions.push({
          id: question.id,
          text: question.text,
          difficulty: question.difficulty,
          keywords: JSON.parse(question.keywords || '[]'),
          selected: question.selected
        })
      }

      // Update course totalQuestions
      await tx.course.updateMany({
        where: { examId: examId },
        data: { totalQuestions: body.questions.length }
      })

      return {
        exam: updatedExam,
        questions
      }
    })

    return {
      success: true,
      exam: {
        id: result.exam.id,
        title: result.exam.title,
        description: result.exam.description,
        questions: result.questions
      }
    }
  } catch (error) {
    console.error('Error updating exam:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating exam'
    })
  }
})