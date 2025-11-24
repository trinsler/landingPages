import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useLanguage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    vi.resetModules()
  })

  it('should initialize with default language', async () => {
    const { useLanguage } = await import('~/composables/useLanguage')
    const { currentLanguage } = useLanguage()
    
    expect(['en', 'de', 'fr']).toContain(currentLanguage.value)
  })

  it('should provide translation function', async () => {
    const { useLanguage, globalTranslations } = await import('~/composables/useLanguage')
    const { t } = useLanguage()
    
    const result = t('home', globalTranslations)
    expect(result).toBeTruthy()
    expect(typeof result).toBe('string')
  })

  it('should set language correctly', async () => {
    const { useLanguage } = await import('~/composables/useLanguage')
    const { setLanguage, currentLanguage } = useLanguage()
    
    setLanguage('fr')
    expect(currentLanguage.value).toBe('fr')
  })

  it('should fallback gracefully for missing translations', async () => {
    const { useLanguage } = await import('~/composables/useLanguage')
    const { t } = useLanguage()
    
    const testTranslations = {
      en: { test: 'Test English' },
      de: {},
      fr: {}
    }
    
    const result = t('test', testTranslations)
    expect(result).toBe('Test English')
  })

  it('should return key if no translation found anywhere', async () => {
    const { useLanguage } = await import('~/composables/useLanguage')
    const { t } = useLanguage()
    
    const testTranslations = { en: {}, de: {}, fr: {} }
    const result = t('nonexistent', testTranslations)
    expect(result).toBe('nonexistent')
  })

  it('should validate language values', async () => {
    const { useLanguage } = await import('~/composables/useLanguage')
    const { setLanguage, currentLanguage } = useLanguage()
    
    const validLanguages = ['en', 'de', 'fr']
    validLanguages.forEach(lang => {
      setLanguage(lang as 'en' | 'de' | 'fr')
      expect(currentLanguage.value).toBe(lang)
    })
  })
})