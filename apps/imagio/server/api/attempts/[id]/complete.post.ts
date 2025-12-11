import { prisma } from '~/server/lib/prisma'
import { defineEventHandler, getRouterParam, createError } from 'h3'

interface CompleteExamResponse {
  attemptId: string;
  overallScore: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  levelCompleted: number;
  nextLevelUnlocked: boolean;
  summary: {
    answers: Array<{
      questionId: string;
      questionText: string;
      userAnswer: string;
      passed: boolean;
      score: number;
      foundKeywords: string[];
    }>;
  };
}

export default defineEventHandler(async (event): Promise<CompleteExamResponse> => {
  const attemptId = getRouterParam(event, 'id')
  
  if (!attemptId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Attempt ID is required'
    })
  }

  try {
    // Get exam attempt with answers and questions
    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId },
      include: {
        answers: {
          include: {
            question: true
          }
        },
        exam: {
          include: {
            questions: {
              where: { selected: true }
            }
          }
        }
      }
    })

    if (!attempt) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Exam attempt not found'
      })
    }

    // Calculate overall statistics
    const totalQuestions = attempt.exam.questions.length
    const answeredQuestions = attempt.answers.length
    const correctAnswers = attempt.answers.filter(answer => answer.passed).length
    const overallScore = answeredQuestions > 0 ? 
      Math.round(attempt.answers.reduce((sum, answer) => sum + answer.score, 0) / answeredQuestions) : 0
    const passed = correctAnswers >= Math.ceil(totalQuestions * 0.6) // 60% pass rate
    const totalTimeSpent = attempt.answers.reduce((sum, answer) => sum + answer.timeSpent, 0)

    // Update exam attempt
    const updatedAttempt = await prisma.examAttempt.update({
      where: { id: attemptId },
      data: {
        completedAt: new Date(),
        overallScore,
        passed
      }
    })

    // Update user progress if exam passed
    let nextLevelUnlocked = false
    if (passed) {
      // Get current progress
      const currentProgress = await prisma.userProgress.findUnique({
        where: { userId: attempt.userId }
      })
      
      const currentCompletedLevels = currentProgress ? 
        JSON.parse(currentProgress.completedLevels) : []
      
      if (!currentCompletedLevels.includes(attempt.level)) {
        currentCompletedLevels.push(attempt.level)
      }
      
      const userProgress = await prisma.userProgress.upsert({
        where: { userId: attempt.userId },
        update: {
          currentLevel: Math.max(attempt.level + 1, currentProgress?.currentLevel || 1),
          completedLevels: JSON.stringify(currentCompletedLevels),
          lastActivity: new Date()
        },
        create: {
          userId: attempt.userId,
          currentLevel: attempt.level + 1,
          completedLevels: JSON.stringify([attempt.level]),
          lastActivity: new Date()
        }
      })
      
      nextLevelUnlocked = userProgress.currentLevel > attempt.level
    }

    // Prepare summary
    const summary = {
      answers: attempt.answers.map(answer => ({
        questionId: answer.questionId,
        questionText: answer.question.text,
        userAnswer: answer.answerText,
        passed: answer.passed,
        score: answer.score,
        foundKeywords: JSON.parse(answer.foundKeywords || '[]')
      }))
    }

    return {
      attemptId: updatedAttempt.id,
      overallScore,
      passed,
      totalQuestions,
      correctAnswers,
      timeSpent: totalTimeSpent,
      levelCompleted: attempt.level,
      nextLevelUnlocked,
      summary
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error completing exam'
    })
  }
})