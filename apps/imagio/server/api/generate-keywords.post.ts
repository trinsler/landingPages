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
  
  // German verb endings to filter out verbs (more precise)
  const verbEndings = ['ieren', 'isieren', 'ifizieren']
  const verbStems = ['mach', 'geh', 'komm', 'werd', 'hab', 'sein', 'lös', 'erklär']
  
  // Words that are definitely not useful keywords
  const unwantedWords = new Set([
    'eine', 'einer', 'eines', 'einem', 'einen', 'zur', 'lösung', 'problem', 'problems'
  ])
  
  // Function to check if word is likely a noun or adjective
  const isUsefulKeyword = (word: string): boolean => {
    // Skip unwanted words
    if (unwantedWords.has(word)) return false
    
    // Skip obvious verbs
    if (verbEndings.some(ending => word.endsWith(ending))) return false
    if (verbStems.some(stem => word.includes(stem))) return false
    
    // Skip words ending in typical verb endings but be more selective
    if (word.endsWith('en') && word.length < 8) return false // Skip short -en words (likely verbs)
    if (word.endsWith('ung') && word.length < 6) return false // Keep longer -ung words (nouns)
    
    // Prefer words that are likely nouns or adjectives
    const nounIndicators = ['heit', 'keit', 'schaft', 'ismus', 'tion', 'sion', 'tät']
    const adjIndicators = ['isch', 'lich', 'bar', 'sam', 'haft']
    
    // Favor words with noun/adjective indicators
    if (nounIndicators.some(indicator => word.includes(indicator))) return true
    if (adjIndicators.some(indicator => word.includes(indicator))) return true
    
    // Accept words that don't look like verbs
    return !word.endsWith('en') || word.length >= 8
  }

  // Clean and split text - extract ONLY words that exist in the original text
  const originalWords = text
    .toLowerCase()
    .replace(/[^\wäöüß\s]/g, ' ')
    .split(/\s+/)
    .filter(word =>
      word.length >= 4 && // Minimum length for meaningful keywords
      !stopWords.has(word) &&
      !/^\d+$/.test(word) && // Filter out pure numbers
      isUsefulKeyword(word) // Use improved keyword detection
    )

  // Count frequency of the ACTUAL words from the text
  const frequency = new Map<string, number>()
  originalWords.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1)
  })

  // Get all potential keywords
  const allKeywords = Array.from(frequency.entries())
    .sort((a, b) => {
      // Prefer longer words (more specific) and higher frequency
      const scoreA = a[1] * a[0].length
      const scoreB = b[1] * b[0].length
      return scoreB - scoreA
    })
    .map(([word]) => word)

  // Return different sets each time by randomizing selection
  const shuffled = allKeywords.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(8, allKeywords.length))
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

    // Try OpenAI API first
    try {
      const OPENAI_API_KEY = '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'
      const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

      const prompt = `Extrahiere Keywords aus der folgenden Musterantwort.
WICHTIG: 
- Verwende NUR Wörter, die DIREKT in der Musterantwort stehen
- Nur Nomen (Hauptwörter) und Adjektive (Eigenschaftswörter), KEINE Verben
- Erfinde keine neuen Begriffe, sondern filtere aus dem vorhandenen Text
- Gib eine variierte Auswahl von 6-8 Keywords zurück, durch Komma getrennt
- Fokussiere auf verschiedene Aspekte bei jeder Generierung

${body.questionText ? `Frage: ${body.questionText}\n\n` : ''}Musterantwort: ${body.answerText}

Keywords aus der Musterantwort:`

      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Du bist ein Experte für Textanalyse. Extrahiere nur Wörter die DIREKT im gegebenen Text stehen. Nur Nomen und Adjektive, keine Verben oder erfundene Begriffe. Antworte nur mit einer kommagetrennten Liste, ohne Erklärungen.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7, // Higher temperature for more variation
          max_tokens: 150
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
      console.error('OpenAI API failed:', apiError)
      // Fall back to simple keyword extraction
      const fallbackKeywords = extractKeywordsFromText(body.answerText)
      if (fallbackKeywords.length > 0) {
        return { keywords: fallbackKeywords }
      }
    }

    // Final fallback: simple keyword extraction
    const keywords = extractKeywordsFromText(body.answerText)
    if (keywords.length > 0) {
      return { keywords }
    }

    throw createError({
      statusCode: 503,
      statusMessage: 'Keine Keywords gefunden. Bitte Keywords manuell eingeben.'
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
