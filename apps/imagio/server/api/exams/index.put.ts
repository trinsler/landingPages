import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, readBody, createError } from 'h3'

interface QuestionData {
  text: string;
  answer: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  keywords: string[];
  selected: boolean;
}

interface UpdateExamRequest {
  id: string;
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
  const body = await readBody<UpdateExamRequest>(event)
  
  console.log('Exam update - Body:', body)
  
  if (!body.id) {
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
      where: { id: body.id },
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
        where: { id: body.id },
        data: {
          title: body.title,
          description: body.description || '',
          sourceText: body.introduction || body.description || ''
        }
      })

      // Delete existing questions and related answers first
      const existingQuestions = await tx.question.findMany({
        where: { examId: body.id },
        select: { id: true }
      })
      
      // Delete answers for each question
      for (const question of existingQuestions) {
        await tx.answer.deleteMany({
          where: { questionId: question.id }
        })
      }
      
      // Now delete the questions
      await tx.question.deleteMany({
        where: { examId: body.id }
      })

      // Create new questions
      const questions = []
      for (let i = 0; i < body.questions.length; i++) {
        const questionData = body.questions[i]
        const question = await tx.question.create({
          data: {
            examId: body.id,
            text: questionData.text,
            answer: questionData.answer,
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
        where: { examId: body.id },
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
    console.error('Error updating exam:', error, error.message, error.stack)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Error updating exam: ${error.message}`
    })
  }
})