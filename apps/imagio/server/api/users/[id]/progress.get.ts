import { prisma } from '~/server/lib/prisma'
import { success } from '~/server/lib/api'

interface UserProgressResponse {
  currentLevel: number;
  completedLevels: number[];
  statistics: {
    totalExams: number;
    completedExams: number;
    passedExams: number;
    totalAttempts: number;
    successRate: number;
    averageScore: number;
  };
  recentActivity: {
    lastExam?: {
      examTitle: string;
      completedAt: string;
      passed: boolean;
      score: number;
    };
  };
}

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'id')
  
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  try {
    // Get user progress
    const userProgress = await prisma.userProgress.findUnique({
      where: { userId }
    })

    // Get all exam attempts for the user
    const attempts = await prisma.examAttempt.findMany({
      where: { userId },
      include: {
        exam: true
      },
      orderBy: {
        startedAt: 'desc'
      }
    })

    const completedAttempts = attempts.filter(attempt => attempt.completedAt)
    const passedAttempts = completedAttempts.filter(attempt => attempt.passed)
    
    // Calculate unique exams
    const uniqueExamIds = new Set(attempts.map(attempt => attempt.examId))
    const completedUniqueExamIds = new Set(completedAttempts.map(attempt => attempt.examId))

    // Calculate statistics
    const totalExams = uniqueExamIds.size
    const completedExams = completedUniqueExamIds.size
    const passedExams = passedAttempts.length
    const totalAttempts = attempts.length
    const successRate = completedAttempts.length > 0 ? 
      (passedAttempts.length / completedAttempts.length) * 100 : 0
    const averageScore = completedAttempts.length > 0 ?
      completedAttempts.reduce((sum, attempt) => sum + attempt.overallScore, 0) / completedAttempts.length : 0

    // Get recent activity
    const lastCompletedAttempt = completedAttempts[0]
    const recentActivity: UserProgressResponse['recentActivity'] = {}
    
    if (lastCompletedAttempt) {
      recentActivity.lastExam = {
        examTitle: lastCompletedAttempt.exam.title,
        completedAt: lastCompletedAttempt.completedAt!.toISOString(),
        passed: lastCompletedAttempt.passed,
        score: lastCompletedAttempt.overallScore
      }
    }

    return success({
      currentLevel: userProgress?.currentLevel || 1,
      completedLevels: userProgress ? JSON.parse(userProgress.completedLevels) : [],
      statistics: {
        totalExams,
        completedExams,
        passedExams,
        totalAttempts,
        successRate: Math.round(successRate),
        averageScore: Math.round(averageScore)
      },
      recentActivity
    })
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching user progress'
    })
  }
})