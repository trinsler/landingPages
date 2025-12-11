import { extractKeywords } from '~/server/lib/keywords'
import { defineEventHandler, readBody, createError } from 'h3'

interface GenerateKeywordsRequest {
  answerText: string
  questionText?: string
}

interface GenerateKeywordsResponse {
  keywords: string[]
}

export default defineEventHandler(async (event): Promise<GenerateKeywordsResponse> => {
  try {
    const body = await readBody<GenerateKeywordsRequest>(event)

    if (!body.answerText || body.answerText.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Answer text is required'
      })
    }

    // Use simple local keyword extraction
    const keywords = extractKeywords(body.answerText)
    
    // If we also have question text, extract keywords from it too
    if (body.questionText) {
      const questionKeywords = extractKeywords(body.questionText)
      // Merge and deduplicate
      const allKeywords = [...new Set([...keywords, ...questionKeywords])]
      return { keywords: allKeywords.slice(0, 10) }
    }

    return { keywords }

  } catch (error: any) {
    console.error('Error generating keywords:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error generating keywords'
    })
  }
})
