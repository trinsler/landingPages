import { prisma } from '~/server/lib/prisma'

interface CourseInfo {
  id: string;        // ← ADD MISSING ID FIELD
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
      id: course.id,        // ← FIXED: Include ID for updates
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

    // Return format expected by frontend: { courses: [...] }
    return { 
      courses: courseInfos,
      success: true,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching courses:', error)
    
    return {
      courses: [],
      success: false,
      error: 'Failed to fetch courses',
      timestamp: new Date().toISOString()
    }
  }
})