import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

interface CourseInfo {
  id: string;
  code: string;
  title: string;
  description: string;
  examId: string;
  totalTime: number;
  totalQuestions: number;
  timePerQuestion: number;
  level: number;
  maxAttempts: number;
}

export default defineEventHandler(async (event) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true
      },
      include: {
        exam: true
      },
      orderBy: [
        { level: 'asc' },
        { code: 'asc' }
      ]
    })

    const courseInfos: CourseInfo[] = courses.map(course => ({
      id: course.id,
      code: course.code,
      title: course.title,
      description: course.description,
      examId: course.examId || '',
      totalTime: course.totalTime,
      totalQuestions: course.totalQuestions,
      timePerQuestion: course.timePerQuestion,
      level: course.level,
      maxAttempts: course.maxAttempts || 3
    }))

    return success({ courses: courseInfos })
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch courses'
    })
  }
})