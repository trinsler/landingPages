// Simple keyword matching - replaces keyword-analyzer.ts (134 lines) + keyword-scoring.ts (128 lines)

export interface KeywordResult {
  foundKeywords: string[]
  missedKeywords: string[]
  score: number
  percentage: number
  passed: boolean
}

export function analyzeAnswer(answerText: string, targetKeywords: string[]): KeywordResult {
  if (!answerText || !targetKeywords.length) {
    return { foundKeywords: [], missedKeywords: targetKeywords, score: 0, percentage: 0, passed: false }
  }

  const normalizedAnswer = answerText.toLowerCase().trim()
  const foundKeywords: string[] = []
  const missedKeywords: string[] = []

  // Simple keyword matching
  targetKeywords.forEach(keyword => {
    const normalizedKeyword = keyword.toLowerCase().trim()
    
    // Check exact match or partial match (for compound words)
    if (normalizedAnswer.includes(normalizedKeyword) || 
        normalizedKeyword.split(' ').some(part => normalizedAnswer.includes(part))) {
      foundKeywords.push(keyword)
    } else {
      missedKeywords.push(keyword)
    }
  })

  const percentage = targetKeywords.length > 0 ? (foundKeywords.length / targetKeywords.length) * 100 : 0
  const score = Math.round(percentage)
  const passed = percentage >= 60 // 60% threshold

  return { foundKeywords, missedKeywords, score, percentage, passed }
}

export function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'der', 'die', 'das', 'und', 'ist', 'in', 'von', 'zu', 'mit', 'auf', 'für',
    'the', 'and', 'is', 'in', 'of', 'to', 'with', 'on', 'for'
  ])

  return text
    .toLowerCase()
    .replace(/[^\wäöüß\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 4 && !stopWords.has(word))
    .slice(0, 10) // Top 10 keywords
}