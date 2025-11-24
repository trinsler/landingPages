import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeInput from '~/components/results/CodeInput.vue'

// Mock the useLanguage composable
vi.mock('~/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        enterGameCode: 'Enter Game Code',
        gameCode: 'Game Code',
        loadResults: 'Load Results',
        gameCodePlaceholder: 'Enter your game code'
      }
      return translations[key] || key
    }
  }),
  globalTranslations: {}
}))

describe('CodeInput', () => {
  const defaultProps = {
    gameCode: 'ABC123',
    loadingError: ''
  }

  it('should render correctly', () => {
    const wrapper = mount(CodeInput, {
      props: defaultProps
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.code-input-section').exists()).toBe(true)
    expect(wrapper.find('.code-input').exists()).toBe(true)
    expect(wrapper.find('.load-button').exists()).toBe(true)
  })

  it('should display game code value', () => {
    const wrapper = mount(CodeInput, {
      props: { ...defaultProps, gameCode: 'TEST456' }
    })

    const input = wrapper.find('.code-input')
    expect(input.element.value).toBe('TEST456')
  })

  it('should emit updateCode on input change', async () => {
    const wrapper = mount(CodeInput, {
      props: defaultProps
    })

    const input = wrapper.find('.code-input')
    await input.setValue('NEW789')

    expect(wrapper.emitted('updateCode')).toBeTruthy()
    expect(wrapper.emitted('updateCode')![0]).toEqual(['NEW789'])
  })

  it('should emit loadResults on form submit', async () => {
    const wrapper = mount(CodeInput, {
      props: { ...defaultProps, gameCode: 'VALID123' }
    })

    const form = wrapper.find('.code-form')
    await form.trigger('submit')

    expect(wrapper.emitted('loadResults')).toBeTruthy()
  })

  it('should disable button when code is too short', () => {
    const wrapper = mount(CodeInput, {
      props: { ...defaultProps, gameCode: 'AB' }
    })

    const button = wrapper.find('.load-button')
    expect(button.element.disabled).toBe(true)
  })

  it('should enable button when code is valid length', () => {
    const wrapper = mount(CodeInput, {
      props: { ...defaultProps, gameCode: 'ABC' }
    })

    const button = wrapper.find('.load-button')
    expect(button.element.disabled).toBe(false)
  })

  it('should display loading error when present', () => {
    const wrapper = mount(CodeInput, {
      props: { 
        ...defaultProps, 
        loadingError: 'Code not found' 
      }
    })

    expect(wrapper.find('.error-message').exists()).toBe(true)
    expect(wrapper.find('.error-message').text()).toBe('Code not found')
  })

  it('should not display error message when no error', () => {
    const wrapper = mount(CodeInput, {
      props: { ...defaultProps, loadingError: '' }
    })

    expect(wrapper.find('.error-message').exists()).toBe(false)
  })

  it('should have correct form attributes', () => {
    const wrapper = mount(CodeInput, {
      props: defaultProps
    })

    const input = wrapper.find('.code-input')
    expect(input.attributes('required')).toBe('')
    expect(input.attributes('minlength')).toBe('3')
    expect(input.attributes('type')).toBe('text')
  })

  it('should display correct button text', () => {
    const wrapper = mount(CodeInput, {
      props: defaultProps
    })

    const button = wrapper.find('.load-button')
    expect(button.text()).toBe('Load Results')
  })

  it('should have correct placeholder text', () => {
    const wrapper = mount(CodeInput, {
      props: defaultProps
    })

    const input = wrapper.find('.code-input')
    expect(input.attributes('placeholder')).toBe('Enter your game code')
  })

  it('should prevent form submission with empty code', () => {
    const wrapper = mount(CodeInput, {
      props: { ...defaultProps, gameCode: '' }
    })

    const button = wrapper.find('.load-button')
    // Button should be disabled with empty code
    expect(button.element.disabled).toBe(true)
  })
})