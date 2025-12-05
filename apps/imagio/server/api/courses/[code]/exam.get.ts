import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, getRouterParam, createError } from 'h3'

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
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  keywords: string[];
  selected: boolean;
}

interface ExamResponse {
  exam: ExamDetails;
  questions: QuestionDetails[];
}

export default defineEventHandler(async (event): Promise<ExamResponse> => {
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
        difficulty: question.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
        keywords: parsedKeywords,
        selected: question.selected
      }
    })
    
    console.log(`Processed questions for response:`, questions)

    const response = {
      exam,
      questions
    }
    
    console.log(`Final API response:`, JSON.stringify(response, null, 2))
    return response
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