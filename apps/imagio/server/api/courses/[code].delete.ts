import { prisma } from '~/server/lib/prisma'
import { createSuccessResponse, createErrorResponse, ErrorCodes, HttpStatus, type ApiResponse } from '~/server/lib/response-formatter'

interface DeleteData {
  code: string
  message: string
}

export default defineEventHandler(async (event): Promise<ApiResponse<DeleteData>> => {
  const code = getRouterParam(event, 'code')

  if (!code) {
    const errorResponse = createErrorResponse(
      ErrorCodes.VALIDATION_ERROR,
      'Course code is required',
      HttpStatus.BAD_REQUEST
    )
    setResponseStatus(event, HttpStatus.BAD_REQUEST)
    return errorResponse
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
      const errorResponse = createErrorResponse(
        ErrorCodes.COURSE_NOT_FOUND,
        'Course not found',
        HttpStatus.NOT_FOUND
      )
      setResponseStatus(event, HttpStatus.NOT_FOUND)
      return errorResponse
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

    const deleteData: DeleteData = {
      code,
      message: `Course ${code} deleted successfully`
    }

    return createSuccessResponse(deleteData)
  } catch (error: any) {
    console.error('Error deleting course:', error)
    
    const errorResponse = createErrorResponse(
      ErrorCodes.INTERNAL_ERROR,
      'Error deleting course',
      HttpStatus.INTERNAL_SERVER_ERROR
    )
    
    setResponseStatus(event, HttpStatus.INTERNAL_SERVER_ERROR)
    return errorResponse
  }
})