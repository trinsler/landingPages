import { prisma } from '~/server/lib/prisma'

interface CourseInfo {
  code: string;
  title: string;
  description: string;
  examId: string;
  totalTime: number;
  totalQuestions: number;
  timePerQuestion: number;
  level: number;
}

interface CoursesResponse {
  courses: CourseInfo[];
}

export default defineEventHandler(async (event): Promise<CoursesResponse> => {
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
      code: course.code,
      title: course.title,
      description: course.description,
      examId: course.examId || '',
      totalTime: course.totalTime,
      totalQuestions: course.totalQuestions,
      timePerQuestion: course.timePerQuestion,
      level: course.level
    }))

    return {
      courses: courseInfos
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching courses'
    })
  }
})