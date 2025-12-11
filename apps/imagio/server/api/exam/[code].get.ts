import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Course code is required'
    })
  }

  try {
    console.log(`Looking for course with code: ${code}`)
    const course = await prisma.course.findUnique({
      where: { code },
      include: {
        exam: {
          include: {
            questions: {
              where: {
                selected: true
              },
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    })
    
    console.log(`Found course:`, course ? 'YES' : 'NO')
    if (course) {
      console.log(`Course has exam:`, course.exam ? 'YES' : 'NO')
      if (course.exam) {
        console.log(`Exam has questions:`, course.exam.questions.length)
        console.log(`Questions:`, course.exam.questions)
      }
    }

    if (!course || !course.exam) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course or exam not found'
      })
    }

    const questions = course.exam.questions.map(question => {
      let parsedKeywords: string[] = []
      try {
        parsedKeywords = JSON.parse(question.keywords || '[]')
      } catch (e) {
        console.error('Failed to parse keywords:', question.keywords)
        parsedKeywords = []
      }
      
      return {
        id: question.id,
        text: question.text,
        answer: question.answer,
        difficulty: question.difficulty,
        keywords: parsedKeywords,
        selected: question.selected
      }
    })
    
    console.log(`Returning ${questions.length} questions:`, questions)

    return success({
      questions,
      exam: {
        id: course.exam.id,
        title: course.exam.title,
        description: course.exam.description,
        level: course.exam.level,
        duration: course.exam.duration || course.totalTime
      }
    })
  } catch (error) {
    console.error('Error in exam API:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching exam'
    })
  }
})