import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

interface ExamDetails {
  id: string;
  title: string;
  description: string;
  sourceText: string;
  level: number;
  duration: number;
  totalQuestions: number;
}

interface QuestionDetails {
  id: string;
  text: string;
  answer?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  keywords: string[];
  selected: boolean;
}

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
      }
    }

    if (!course || !course.exam) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course or exam not found'
      })
    }

    const exam: ExamDetails = {
      id: course.exam.id,
      title: course.exam.title,
      description: course.exam.description,
      sourceText: course.exam.sourceText,
      level: course.exam.level,
      duration: course.exam.duration || course.totalTime,
      totalQuestions: course.exam.questions.length
    }

    console.log(`Raw questions from database:`, course.exam.questions)
    
    const questions: QuestionDetails[] = course.exam.questions.map(question => {
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
        difficulty: question.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        keywords: parsedKeywords,
        selected: question.selected
      }
    })
    
    console.log(`Processed questions for response:`, questions)

    // Return in format expected by frontend: direct questions array
    console.log(`Final API response questions:`, questions)
    return success({
      questions,
      exam
    })
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching exam'
    })
  }
})