import { prisma } from '~/server/lib/prisma'

interface DeleteResponse {
  success: boolean
  message: string
}

export default defineEventHandler(async (event): Promise<DeleteResponse> => {
  const code = getRouterParam(event, 'code')

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Course code is required'
    })
  }

  try {
    // Find the course and its exam
    const course = await prisma.course.findUnique({
      where: { code },
      include: {
        exam: {
          include: {
            questions: true
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

    // Delete in correct order (questions -> exam -> course)
    if (course.examId) {
      // Delete all questions first
      await prisma.question.deleteMany({
        where: { examId: course.examId }
      })

      // Delete the exam
      await prisma.exam.delete({
        where: { id: course.examId }
      })
    }

    // Delete the course
    await prisma.course.delete({
      where: { code }
    })

    return {
      success: true,
      message: `Course ${code} deleted successfully`
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error deleting course:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting course'
    })
  }
})
