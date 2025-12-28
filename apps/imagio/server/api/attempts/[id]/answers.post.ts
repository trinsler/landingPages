import { prisma } from '~/server/lib/prisma'
import { KeywordAnalyzer, type KeywordAnalysisResult } from '~/server/lib/keyword-analyzer'

interface SubmitAnswerRequest {
  questionId: string;
  answerText: string;
  mode: 'WRITTEN' | 'ORAL';
  timeSpent: number;
}

interface SubmitAnswerResponse {
  answerId: string;
  analysis: KeywordAnalysisResult;
  passed: boolean;
  score: number;
  percentage: number;
}

export default defineEventHandler(async (event): Promise<SubmitAnswerResponse> => {
  const attemptId = getRouterParam(event, 'id')
  
  if (!attemptId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Attempt ID is required'
    })
  }

  const body = await readBody<SubmitAnswerRequest>(event)
  
  if (!body.questionId || !body.answerText || !body.mode) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Question ID, answer text, and mode are required'
    })
  }

  try {
    // Enhanced atomic transaction with attempt counting
    const result = await prisma.$transaction(async (tx) => {
      // Verify exam attempt exists
      const attempt = await tx.examAttempt.findUnique({
        where: { id: attemptId },
        include: {
          exam: {
            include: {
              courses: true
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

      // Enhanced attempt counting with course maxAttempts
      const course = attempt.exam?.courses?.[0]
      const maxAttempts = course?.maxAttempts || 3
      
      if (attempt.attemptCount > maxAttempts) {
        throw createError({
          statusCode: 403,
          statusMessage: `Maximum attempts (${maxAttempts}) exceeded`
        })
      }

      // Get question with keywords
      const question = await tx.question.findUnique({
        where: { id: body.questionId }
      })

      if (!question) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Question not found'
        })
      }

      // Enhanced keyword analysis
      const analyzer = new KeywordAnalyzer()
      let keywords: string[] = []
      
      try {
        const parsed = JSON.parse(question.keywords || '[]')
        keywords = Array.isArray(parsed) ? parsed : []
      } catch {
        keywords = []
      }

      console.log('Keywords for analysis:', keywords)
      const analysis = await analyzer.analyzeAnswer(body.answerText, keywords)

      // Create/update answer with enhanced scoring
      const answer = await tx.answer.upsert({
        where: {
          examAttemptId_questionId: {
            examAttemptId: attemptId,
            questionId: body.questionId
          }
        },
        update: {
          answerText: body.answerText,
          submittedText: body.answerText,
          mode: body.mode,
          foundKeywords: JSON.stringify(analysis.foundKeywords),
          score: analysis.score,
          scoreObtained: Math.round(analysis.score),
          percentage: analysis.percentage,
          passed: analysis.passed,
          analysisDetails: JSON.stringify(analysis.details),
          scoringBreakdown: JSON.stringify(analysis.details),
          timeSpent: body.timeSpent,
          timestamp: new Date()
        },
        create: {
          examAttemptId: attemptId,
          questionId: body.questionId,
          answerText: body.answerText,
          submittedText: body.answerText,
          mode: body.mode,
          foundKeywords: JSON.stringify(analysis.foundKeywords),
          score: analysis.score,
          scoreObtained: Math.round(analysis.score),
          percentage: analysis.percentage,
          passed: analysis.passed,
          analysisDetails: JSON.stringify(analysis.details),
          scoringBreakdown: JSON.stringify(analysis.details),
          timeSpent: body.timeSpent
        }
      })

      // Simple attempt increment
      await tx.examAttempt.update({
        where: { id: attemptId },
        data: { 
          attemptCount: attempt.attemptCount + 1,
          attemptsCount: (attempt.attemptsCount || 0) + 1
        }
      })

      return {
        answerId: answer.id,
        analysis,
        passed: analysis.passed,
        score: analysis.score,
        percentage: analysis.percentage
      }
    })

    return result
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    console.error('Error submitting answer:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error submitting answer: ${error.message}`
    })
  }
})