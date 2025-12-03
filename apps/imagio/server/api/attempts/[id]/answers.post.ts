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
    // Verify exam attempt exists
    const attempt = await prisma.examAttempt.findUnique({
      where: { id: attemptId }
    })

    if (!attempt) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Exam attempt not found'
      })
    }

    // Get question with keywords
    const question = await prisma.question.findUnique({
      where: { id: body.questionId }
    })

    if (!question) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Question not found'
      })
    }

    // Analyze keywords in answer
    const analyzer = new KeywordAnalyzer()
    const keywords = JSON.parse(question.keywords || '[]')
    const analysis = await analyzer.analyzeAnswer(body.answerText, keywords)

    // Create or update answer
    const answer = await prisma.answer.upsert({
      where: {
        examAttemptId_questionId: {
          examAttemptId: attemptId,
          questionId: body.questionId
        }
      },
      update: {
        answerText: body.answerText,
        mode: body.mode,
        foundKeywords: JSON.stringify(analysis.foundKeywords),
        score: analysis.score,
        percentage: analysis.percentage,
        passed: analysis.passed,
        analysisDetails: JSON.stringify(analysis.details),
        timeSpent: body.timeSpent,
        timestamp: new Date()
      },
      create: {
        examAttemptId: attemptId,
        questionId: body.questionId,
        answerText: body.answerText,
        mode: body.mode,
        foundKeywords: JSON.stringify(analysis.foundKeywords),
        score: analysis.score,
        percentage: analysis.percentage,
        passed: analysis.passed,
        analysisDetails: JSON.stringify(analysis.details),
        timeSpent: body.timeSpent
      }
    })

    return {
      answerId: answer.id,
      analysis,
      passed: analysis.passed,
      score: analysis.score,
      percentage: analysis.percentage
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Error submitting answer'
    })
  }
})