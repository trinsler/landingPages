// Minimal keyword scoring implementation
interface KeywordMatch {
  keyword: string
  matched: boolean
  matchType: 'exact' | 'fuzzy' | 'none'
  score: number
}

interface ScoringResult {
  totalScore: number
  maxScore: number
  percentage: number
  breakdown: KeywordMatch[]
}

// Simple Levenshtein distance calculation
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length
  
  const matrix = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null))
  
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j
  
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }
  
  return matrix[a.length][b.length]
}

// Enhanced normalize text for comparison per specification
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD') // Enhanced normalization
    .replace(/\p{M}/gu, '') // Remove diacritics (Unicode-aware)
    .replace(/[^\w\s-]/g, ' ') // Keep hyphens, replace punctuation with space
    .replace(/\s+/g, ' ') // Collapse whitespace
    .trim()
}

// Score answer against keywords
export function scoreAnswer(answerText: string, keywords: string[]): ScoringResult {
  const normalizedAnswer = normalize(answerText)
  const answerTokens = normalizedAnswer.split(/\s+/).filter(token => token.length > 0)
  
  const breakdown: KeywordMatch[] = keywords.map(keyword => {
    const normalizedKeyword = normalize(keyword)
    let bestMatch: KeywordMatch = {
      keyword,
      matched: false,
      matchType: 'none',
      score: 0
    }
    
    // Enhanced matching per specification
    
    // 1. Exact match check
    if (answerTokens.includes(normalizedKeyword) || normalizedAnswer.includes(normalizedKeyword)) {
      bestMatch = {
        keyword,
        matched: true,
        matchType: 'exact',
        score: 1
      }
    } else {
      // 2. Fuzzy match with specification thresholds
      for (const token of answerTokens) {
        const distance = levenshteinDistance(token, normalizedKeyword)
        const maxLength = Math.max(token.length, normalizedKeyword.length)
        const ratio = 1 - (distance / maxLength)
        
        // Short word protection (≤3 chars require exact or very high similarity)
        if (normalizedKeyword.length <= 3) {
          if (distance === 0 || ratio >= 0.9) {
            bestMatch = {
              keyword,
              matched: true,
              matchType: ratio === 1 ? 'exact' : 'fuzzy',
              score: ratio
            }
          }
        } else {
          // Full weight for high similarity (≥0.85)
          if (ratio >= 0.85 && ratio > bestMatch.score) {
            bestMatch = {
              keyword,
              matched: true,
              matchType: 'fuzzy',
              score: 1 // Full weight per spec
            }
          }
          // Partial credit for medium similarity (0.7-0.85)
          else if (ratio >= 0.7 && ratio > bestMatch.score) {
            bestMatch = {
              keyword,
              matched: true,
              matchType: 'fuzzy',
              score: ratio // Partial weight
            }
          }
        }
      }
    }
    
    return bestMatch
  })
  
  const totalScore = breakdown.reduce((sum, match) => sum + match.score, 0)
  const maxScore = keywords.length
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0
  
  return {
    totalScore,
    maxScore,
    percentage,
    breakdown
  }
}