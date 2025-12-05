import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, getQuery, createError } from 'h3'

interface DeleteCourseResponse {
  success: boolean;
  message: string;
}

export default defineEventHandler(async (event): Promise<DeleteCourseResponse> => {
  const query = getQuery(event)
  const code = query.code as string
  
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Course code is required'
    })
  }

  try {
    // Find the course and related data
    const course = await prisma.course.findUnique({
      where: { code },
      include: {
        exam: {
          include: {
            questions: true,
            examAttempts: true
          }
        }
      }
    })

    if (!course) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course not found'
      })
    }

    // Delete in transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // Delete all related data first
      if (course.exam) {
        // Delete exam attempts and their answers
        for (const attempt of course.exam.examAttempts) {
          await tx.answer.deleteMany({
            where: { examAttemptId: attempt.id }
          })
        }
        
        // Delete exam attempts
        await tx.examAttempt.deleteMany({
          where: { examId: course.exam.id }
        })

        // Delete questions
        await tx.question.deleteMany({
          where: { examId: course.exam.id }
        })

        // Delete exam
        await tx.exam.delete({
          where: { id: course.exam.id }
        })
      }

      // Finally delete the course
      await tx.course.delete({
        where: { code }
      })
    })

    return {
      success: true,
      message: `Course "${course.title}" successfully deleted`
    }
  } catch (error) {
    console.error('Error deleting course:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting course'
    })
  }
})