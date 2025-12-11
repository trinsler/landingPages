import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

interface ScenarioInfo {
  id: string;
  code: string;
  title: string;
  description: string;
  level: number;
  totalQuestions: number;
  maxAttempts: number;
  examId?: string;
}

export default defineEventHandler(async (event) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        exam: {
          include: {
            _count: {
              select: {
                questions: true
              }
            }
          }
        }
      },
      orderBy: [
        { level: 'asc' },
        { code: 'asc' }
      ]
    })

    const courseInfos: ScenarioInfo[] = courses.map(course => ({
      id: course.id,
      code: course.code,
      title: course.title,
      description: course.description,
      level: course.level,
      totalQuestions: course.exam?._count?.questions || 0,
      maxAttempts: course.maxAttempts || 3,
      examId: course.examId || undefined
    }))

    return success({ courses: courseInfos })
  } catch (err) {
    console.error('Error fetching scenarios:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch scenarios'
    })
  }
})