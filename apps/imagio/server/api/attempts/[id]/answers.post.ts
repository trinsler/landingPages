import { prisma } from '~/server/lib/prisma'
import { analyzeAnswer } from '~/server/lib/keywords'
import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'

interface SubmitAnswerRequest {
  questionId: string;
  answerText: string;
  mode: 'WRITTEN' | 'ORAL';
  timeSpent: number;
}

export default defineEventHandler(async (event) => {
  const attemptId = getRouterParam(event, 'id')
  
  if (!attemptId) {
    throw createError({ statusCode: 400, statusMessage: 'Attempt ID required' })
  }

  const body = await readBody<SubmitAnswerRequest>(event)
  
  // Simplified validation
  if (!body.questionId || !body.answerText?.trim() || !body.mode) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  if (body.answerText.length > 2000) {
    throw createError({ statusCode: 400, statusMessage: 'Answer too long (max 2000 chars)' })
  }

  try {
    // Simplified transaction
    return await prisma.$transaction(async (tx) => {
      // Get attempt and question in parallel
      const [attempt, question] = await Promise.all([
        tx.examAttempt.findUnique({ where: { id: attemptId } }),
        tx.question.findUnique({ where: { id: body.questionId } })
      ])

      if (!attempt) {
        throw createError({ statusCode: 404, statusMessage: 'Exam attempt not found' })
      }

      if (!question) {
        throw createError({ statusCode: 404, statusMessage: 'Question not found' })
      }

      // Simple keyword analysis
      let keywords: string[] = []
      try {
        keywords = JSON.parse(question.keywords || '[]')
      } catch {
        keywords = []
      }

      const analysis = analyzeAnswer(body.answerText, keywords)

      // Create or update answer - SIMPLIFIED
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
          timeSpent: body.timeSpent,
          timestamp: new Date(),
          // Simplified details - no duplication
          analysisDetails: JSON.stringify({
            foundKeywords: analysis.foundKeywords,
            missedKeywords: analysis.missedKeywords
          })
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
          timeSpent: body.timeSpent,
          analysisDetails: JSON.stringify({
            foundKeywords: analysis.foundKeywords,
            missedKeywords: analysis.missedKeywords
          })
        }
      })

      return {
        answerId: answer.id,
        passed: analysis.passed,
        score: analysis.score,
        percentage: analysis.percentage,
        foundKeywords: analysis.foundKeywords,
        missedKeywords: analysis.missedKeywords
      }
    })

  } catch (error: any) {
    console.error('Answer submission error:', error)
    
    // Return proper error response
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit answer'
    })
  }
})