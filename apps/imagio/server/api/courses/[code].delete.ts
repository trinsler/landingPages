import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

interface DeleteData {
  code: string
  message: string
}

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Course code is required'
    })
  }

  console.log(`DELETE request for course: ${code}`)

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
    if (course.examId && course.examId.trim() !== '') {
      try {
        console.log(`Deleting questions for exam: ${course.examId}`)
        // Delete all questions first
        const deleteQuestionsResult = await prisma.question.deleteMany({
          where: { examId: course.examId }
        })
        console.log('Deleted questions:', deleteQuestionsResult)

        console.log(`Deleting exam: ${course.examId}`)
        // Delete the exam
        await prisma.exam.delete({
          where: { id: course.examId }
        })
        console.log('Exam deleted successfully')
      } catch (examError) {
        console.error('Error deleting exam/questions:', examError)
        // Continue anyway to delete the course
        console.log('Continuing to delete course despite exam deletion error...')
      }
    } else {
      console.log('No exam associated with this course, skipping exam deletion')
    }

    console.log(`Deleting course: ${course.code}`)
    // Delete the course
    await prisma.course.delete({
      where: { code }
    })

    console.log(`Course ${code} deleted successfully`)

    return success({
      code,
      message: `Course ${code} deleted successfully`
    })
  } catch (error: any) {
    console.error('Error deleting course:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting course'
    })
  }
})