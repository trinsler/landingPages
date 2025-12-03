import { prisma } from '~/server/lib/prisma'

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

    const questions: QuestionDetails[] = course.exam.questions.map(question => ({
      id: question.id,
      text: question.text,
      difficulty: question.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
      keywords: JSON.parse(question.keywords || '[]'),
      selected: question.selected
    }))

    return {
      exam,
      questions
    }
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