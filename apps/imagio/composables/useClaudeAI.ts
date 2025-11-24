import { ref } from 'vue'
import { useErrorHandler } from './useErrorHandler'

interface Question {
  id: string
  text: string
  answer?: string // Added answer field for manual question entry
  difficulty: 'easy' | 'medium' | 'hard'
  keywords: string[]
  selected: boolean
}

interface KeywordAnalysis {
  foundKeywords: string[]
  score: number
  percentage: number
  passed: boolean
  details: {
    keyword: string
    found: boolean
    variations?: string[]
  }[]
}

export const useClaudeAI = () => {
  const isLoading = ref(false)
  const error = ref('')
  const { withErrorHandling, retryOperation } = useErrorHandler()

  // Mock Claude API - In production, replace with actual Claude API calls
  const generateQuestions = async (
    text: string, 
    numberOfQuestions: number = 10, 
    difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  ): Promise<Question[]> => {
    return await withErrorHandling(
      async () => {
        // Input validation
        if (!text || text.trim().length === 0) {
          throw new Error('Text input is required for question generation')
        }
        
        if (numberOfQuestions <= 0 || numberOfQuestions > 50) {
          throw new Error('Number of questions must be between 1 and 50')
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Mock question generation based on difficulty
        const mockQuestions: Question[] = []
        
        for (let i = 1; i <= numberOfQuestions; i++) {
          let questionText = ''
          
          switch (difficulty) {
            case 'easy':
              questionText = `What is the main concept discussed in the text regarding topic ${i}?`
              break
            case 'medium':
              questionText = `Explain the relationship between the key elements mentioned in section ${i} of the text.`
              break
            case 'hard':
              questionText = `Critically analyze and evaluate the implications of the arguments presented in the text, particularly regarding concept ${i}.`
              break
          }
          
          mockQuestions.push({
            id: `q_${Date.now()}_${i}`,
            text: questionText,
            difficulty,
            keywords: [],
            selected: false
          })
        }
        
        return mockQuestions
      },
      'Question Generation',
      { 
        fallbackMessage: 'Fehler beim Generieren der Fragen. Versuchen Sie es erneut.',
        showToast: true 
      }
    ) || []
  }

  const generateKeywords = async (answerText: string): Promise<string[]> => {
    return await withErrorHandling(
      async () => {
        // Input validation
        if (typeof answerText !== 'string') {
          throw new Error('Answer text must be a string')
        }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Enhanced keyword extraction from answer text
        const extractKeywordsFromAnswer = (text: string): string[] => {
        // Convert to lowercase and remove punctuation
        const cleanText = text.toLowerCase()
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
          .replace(/\s{2,}/g, ' ')
        
        // Split into words
        const words = cleanText.split(' ')
        
        // Common stop words to filter out
        const stopWords = new Set([
          'der', 'die', 'das', 'und', 'oder', 'aber', 'ist', 'sind', 'war', 'waren',
          'wird', 'werden', 'wurde', 'wurden', 'hat', 'haben', 'hatte', 'hatten',
          'ein', 'eine', 'einen', 'einer', 'einem', 'eines', 'ich', 'du', 'er', 'sie', 'es',
          'wir', 'ihr', 'sie', 'mich', 'dich', 'sich', 'uns', 'euch', 'mir', 'dir',
          'ihm', 'ihr', 'uns', 'euch', 'ihnen', 'in', 'an', 'auf', 'für', 'mit',
          'von', 'zu', 'bei', 'nach', 'vor', 'über', 'unter', 'durch', 'ohne',
          'gegen', 'um', 'wenn', 'als', 'wie', 'was', 'wer', 'wo', 'wann', 'warum',
          'auch', 'noch', 'nur', 'schon', 'nicht', 'kann', 'soll', 'will', 'muss',
          'darf', 'mag', 'könnte', 'sollte', 'würde', 'müsste', 'dürfte', 'möchte',
          'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'will', 'would',
          'have', 'has', 'had', 'can', 'could', 'should', 'must', 'may', 'might',
          'a', 'an', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she',
          'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your',
          'his', 'her', 'its', 'our', 'their', 'in', 'on', 'at', 'by', 'for',
          'with', 'from', 'to', 'of', 'about', 'into', 'through', 'during',
          'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off',
          'over', 'under', 'again', 'further', 'then', 'once'
        ])
        
        // Filter meaningful words (longer than 3 characters, not stop words)
        const meaningfulWords = words.filter(word => 
          word.length > 3 && 
          !stopWords.has(word) &&
          /^[a-zäöüß]+$/.test(word)
        )
        
        // Count word frequency
        const wordCount = new Map()
        meaningfulWords.forEach(word => {
          wordCount.set(word, (wordCount.get(word) || 0) + 1)
        })
        
        // Get unique words sorted by frequency
        const sortedWords = Array.from(wordCount.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([word]) => word)
        
        // Add some domain-specific keywords if relevant
        const domainKeywords = []
        if (text.includes('algorithmus') || text.includes('algorithm')) domainKeywords.push('algorithmus')
        if (text.includes('datenstruktur') || text.includes('data structure')) domainKeywords.push('datenstruktur')
        if (text.includes('programmier') || text.includes('programm')) domainKeywords.push('programmierung')
        if (text.includes('funktion') || text.includes('function')) domainKeywords.push('funktion')
        if (text.includes('variable') || text.includes('variabel')) domainKeywords.push('variable')
        if (text.includes('objekt') || text.includes('object')) domainKeywords.push('objektorientiert')
        if (text.includes('datenbank') || text.includes('database')) domainKeywords.push('datenbank')
        if (text.includes('analyse') || text.includes('analysis')) domainKeywords.push('analyse')
        if (text.includes('methode') || text.includes('method')) domainKeywords.push('methodik')
        if (text.includes('konzept') || text.includes('concept')) domainKeywords.push('konzept')
        
        // Combine domain keywords with extracted words
        const allKeywords = [...new Set([...domainKeywords, ...sortedWords])]
        
        return allKeywords.slice(0, 10)
      }
      
        const keywords = extractKeywordsFromAnswer(answerText)
        
        // If we don't get enough keywords, add some general ones
        if (keywords.length < 5) {
          const generalKeywords = [
            'verständnis', 'analyse', 'konzept', 'methodik', 'anwendung',
            'theorie', 'praxis', 'grundlagen', 'prinzipien', 'beispiel'
          ]
          keywords.push(...generalKeywords.slice(0, 10 - keywords.length))
        }
        
        return keywords.slice(0, 10)
      },
      'Keyword Generation',
      {
        fallbackMessage: 'Fehler beim Generieren der Schlüsselwörter. Versuchen Sie es erneut.',
        showToast: true
      }
    ) || []
  }

  const analyzeAnswer = async (
    answer: string,
    requiredKeywords: string[]
  ): Promise<KeywordAnalysis> => {
    const result = await withErrorHandling(
      async () => {
        // Input validation
        if (!answer || typeof answer !== 'string') {
          throw new Error('Answer text is required for analysis')
        }
        
        if (!Array.isArray(requiredKeywords) || requiredKeywords.length === 0) {
          throw new Error('Required keywords array is required for analysis')
        }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock keyword matching algorithm
        const foundKeywords: string[] = []
        const details = requiredKeywords.map(keyword => {
          // Simple keyword matching - in production, use more sophisticated NLP
          const variations = [keyword, keyword.toLowerCase(), keyword.replace(/[^a-zA-Z]/g, '')]
          const found = variations.some(variation => 
            answer.toLowerCase().includes(variation.toLowerCase())
          )
          
          if (found) {
            foundKeywords.push(keyword)
          }
          
          return {
            keyword,
            found,
            variations: found ? variations.filter(v => 
              answer.toLowerCase().includes(v.toLowerCase())
            ) : undefined
          }
        })
        
        const score = foundKeywords.length
        const percentage = requiredKeywords.length > 0 ? (score / requiredKeywords.length) * 100 : 0
        const passed = score >= Math.min(8, requiredKeywords.length) // Minimum 8 or all keywords if less than 8
        
        return {
          foundKeywords,
          score,
          percentage,
          passed,
          details
        }
      },
      'Answer Analysis',
      {
        fallbackMessage: 'Fehler bei der Antwortanalyse. Versuchen Sie es erneut.',
        showToast: true
      }
    )

    // Return default analysis if error handling returns null
    return result || {
      foundKeywords: [],
      score: 0,
      percentage: 0,
      passed: false,
      details: []
    }
  }

  // Real Claude API integration function (for production)
  const callClaudeAPI = async (prompt: string, systemMessage?: string) => {
    // This would be the actual Claude API call
    // const response = await fetch('https://api.anthropic.com/v1/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': process.env.CLAUDE_API_KEY,
    //     'anthropic-version': '2023-06-01'
    //   },
    //   body: JSON.stringify({
    //     model: 'claude-3-sonnet-20240229',
    //     max_tokens: 1024,
    //     system: systemMessage,
    //     messages: [
    //       {
    //         role: 'user',
    //         content: prompt
    //       }
    //     ]
    //   })
    // })
    // 
    // return response.json()
    
    throw new Error('Claude API integration not implemented yet')
  }

  return {
    isLoading,
    error,
    generateQuestions,
    generateKeywords,
    analyzeAnswer,
    callClaudeAPI
  }
}