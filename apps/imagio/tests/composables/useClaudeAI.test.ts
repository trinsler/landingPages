import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useClaudeAI } from '~/composables/useClaudeAI'

// Mock timers for faster tests
vi.useFakeTimers()

describe('useClaudeAI', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with correct default state', () => {
    const claudeAI = useClaudeAI()
    
    expect(claudeAI.isLoading.value).toBe(false)
    expect(claudeAI.error.value).toBe('')
  })

  it('should generate questions successfully', async () => {
    const claudeAI = useClaudeAI()
    
    const promise = claudeAI.generateQuestions(
      'Test text for question generation',
      3,
      'medium'
    )
    
    await vi.runAllTimersAsync()
    const questions = await promise
    
    expect(questions).toBeDefined()
    expect(questions.length).toBe(3)
    expect(questions[0]).toHaveProperty('id')
    expect(questions[0]).toHaveProperty('text')
    expect(questions[0]).toHaveProperty('difficulty')
    expect(questions[0].difficulty).toBe('medium')
  })

  it('should generate different question types by difficulty', async () => {
    const claudeAI = useClaudeAI()
    
    const promises = [
      claudeAI.generateQuestions('Test', 1, 'easy'),
      claudeAI.generateQuestions('Test', 1, 'medium'),
      claudeAI.generateQuestions('Test', 1, 'hard')
    ]
    
    await vi.runAllTimersAsync()
    const [easyQuestions, mediumQuestions, hardQuestions] = await Promise.all(promises)
    
    expect(easyQuestions[0].text).toContain('What is the main concept')
    expect(mediumQuestions[0].text).toContain('Explain the relationship')
    expect(hardQuestions[0].text).toContain('Critically analyze')
  })

  it('should generate keywords from answer text', async () => {
    const claudeAI = useClaudeAI()
    
    const promise = claudeAI.generateKeywords(
      'This is a test answer about programming algorithms and data structures'
    )
    
    await vi.runAllTimersAsync()
    const keywords = await promise
    
    expect(keywords).toBeDefined()
    expect(Array.isArray(keywords)).toBe(true)
    expect(keywords.length).toBeGreaterThan(0)
    expect(keywords.length).toBeLessThanOrEqual(10)
  })

  it('should process keywords correctly', async () => {
    const claudeAI = useClaudeAI()
    
    const promise = claudeAI.generateKeywords(
      'The quick brown fox jumps over the lazy dog and runs very fast'
    )
    
    await vi.runAllTimersAsync()
    const keywords = await promise
    
    // Should contain meaningful words
    expect(keywords.some(kw => ['quick', 'brown', 'jumps', 'lazy'].includes(kw))).toBe(true)
    // Should filter common words but might contain some short ones
    expect(keywords.every(kw => kw.length > 0)).toBe(true)
  })

  it('should add domain-specific keywords', async () => {
    const claudeAI = useClaudeAI()
    
    const promise = claudeAI.generateKeywords(
      'Programming with algorithms and functions in object-oriented design'
    )
    
    await vi.runAllTimersAsync()
    const keywords = await promise
    
    expect(keywords).toContain('algorithmus')
    expect(keywords).toContain('funktion')
    expect(keywords).toContain('objektorientiert')
  })

  it('should analyze answer correctly', async () => {
    const claudeAI = useClaudeAI()
    
    const requiredKeywords = ['test', 'programming', 'algorithm']
    const promise = claudeAI.analyzeAnswer(
      'This is a test about programming algorithms and their implementation',
      requiredKeywords
    )
    
    await vi.runAllTimersAsync()
    const analysis = await promise
    
    expect(analysis).toBeDefined()
    expect(analysis).toHaveProperty('foundKeywords')
    expect(analysis).toHaveProperty('score')
    expect(analysis).toHaveProperty('percentage')
    expect(analysis).toHaveProperty('passed')
    expect(analysis).toHaveProperty('details')
    
    expect(analysis.foundKeywords.length).toBeGreaterThan(0)
    expect(analysis.score).toBeGreaterThan(0)
    expect(analysis.percentage).toBeGreaterThan(0)
  })

  it('should detect keyword variations in answer', async () => {
    const claudeAI = useClaudeAI()
    
    const promise = claudeAI.analyzeAnswer(
      'Programming is essential for software development',
      ['programmierung', 'software']
    )
    
    await vi.runAllTimersAsync()
    const analysis = await promise
    
    expect(analysis.foundKeywords).toContain('software')
    expect(analysis.details).toBeDefined()
    expect(analysis.details.length).toBe(2)
  })

  it('should handle empty answer text', async () => {
    const claudeAI = useClaudeAI()
    
    const promise = claudeAI.generateKeywords('')
    
    await vi.runAllTimersAsync()
    const keywords = await promise
    
    expect(keywords).toBeDefined()
    expect(keywords.length).toBeGreaterThanOrEqual(5) // Should add general keywords
  })

  it('should handle errors in Claude API mock', async () => {
    const claudeAI = useClaudeAI()
    
    await expect(claudeAI.callClaudeAPI('test prompt')).rejects.toThrow(
      'Claude API integration not implemented yet'
    )
  })
})