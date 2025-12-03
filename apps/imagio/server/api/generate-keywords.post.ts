interface GenerateKeywordsRequest {
  answerText: string
  questionText?: string
}

interface GenerateKeywordsResponse {
  keywords: string[]
}

// Helper function to extract keywords from text
function extractKeywordsFromText(text: string): string[] {
  // German stop words to filter out
  const stopWords = new Set([
    'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einer', 'eines', 'einem', 'einen',
    'und', 'oder', 'aber', 'wenn', 'dann', 'als', 'bei', 'nach', 'von', 'zu', 'mit', 'für',
    'auf', 'an', 'um', 'ist', 'sind', 'war', 'waren', 'hat', 'haben', 'wird', 'werden',
    'kann', 'können', 'soll', 'sollen', 'muss', 'müssen', 'auch', 'nur', 'noch', 'mehr',
    'sich', 'sein', 'seine', 'ihr', 'ihre', 'ihm', 'ihn', 'sie', 'es', 'wir', 'uns',
    'the', 'and', 'or', 'but', 'with', 'for', 'from', 'this', 'that', 'these', 'those'
  ])

  // Clean and split text
  const words = text
    .toLowerCase()
    .replace(/[^\wäöüß\s]/g, ' ')
    .split(/\s+/)
    .filter(word =>
      word.length >= 4 &&
      !stopWords.has(word) &&
      !/^\d+$/.test(word) // Filter out pure numbers
    )

  // Count word frequency
  const frequency = new Map<string, number>()
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1)
  })

  // Sort by frequency and get top keywords
  const sortedKeywords = Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([word]) => word)
    .slice(0, 12)

  return sortedKeywords
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

    // Try Ollama API first
    try {
      const OLLAMA_API_KEY = 'c1903e8724c24c1695fd846149592e35.K-zuMjEehI_Giqs3A4FtjF4W'
      const OLLAMA_API_URL = 'https://api.ollama.ai/v1/chat/completions'

      const prompt = `Analysiere die folgende Antwort und extrahiere die wichtigsten Schlüsselwörter (Keywords).
Gib NUR eine Liste von 8-12 relevanten Keywords zurück, durch Komma getrennt, ohne Nummerierung oder zusätzlichen Text.
Die Keywords sollten die Hauptkonzepte und wichtigen Begriffe der Antwort erfassen.

${body.questionText ? `Frage: ${body.questionText}\n\n` : ''}Antwort: ${body.answerText}

Keywords:`

      const response = await fetch(OLLAMA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OLLAMA_API_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen2.5:7b',
          messages: [
            {
              role: 'system',
              content: 'Du bist ein Experte für Textanalyse und Keyword-Extraktion. Antworte immer nur mit einer kommagetrennten Liste von Keywords, ohne zusätzliche Erklärungen.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 200
        })
      })

      if (response.ok) {
        const data = await response.json()
        const generatedText = data.choices?.[0]?.message?.content || ''

        const keywords = generatedText
          .split(',')
          .map((kw: string) => kw.trim())
          .filter((kw: string) => kw.length > 0 && kw.length < 50)
          .slice(0, 12)

        if (keywords.length > 0) {
          return { keywords }
        }
      }
    } catch (apiError) {
      console.error('Ollama API failed:', apiError)
      throw createError({
        statusCode: 503,
        statusMessage: 'KI-Service nicht verfügbar. Bitte Keywords manuell eingeben.'
      })
    }

    throw createError({
      statusCode: 503,
      statusMessage: 'KI-Service nicht verfügbar. Bitte Keywords manuell eingeben.'
    })

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
