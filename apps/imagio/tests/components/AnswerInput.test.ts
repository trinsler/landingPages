import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AnswerInput from '~/components/exams/AnswerInput.vue'

// Mock the useLanguage composable
vi.mock('~/composables/useLanguage', () => ({
  useLanguage: () => ({
    t: (key: string) => key
  }),
  globalTranslations: {}
}))

describe('AnswerInput', () => {
  const defaultProps = {
    mode: 'written',
    currentAnswer: 'Test answer',
    isRecording: false,
    transcript: ''
  }

  it('should render written mode correctly', () => {
    const wrapper = mount(AnswerInput, {
      props: { ...defaultProps, mode: 'written' }
    })

    expect(wrapper.find('.written-answer').exists()).toBe(true)
    expect(wrapper.find('.answer-textarea').exists()).toBe(true)
    expect(wrapper.find('.oral-answer').exists()).toBe(false)
  })

  it('should render oral mode correctly', () => {
    const wrapper = mount(AnswerInput, {
      props: { ...defaultProps, mode: 'oral' }
    })

    expect(wrapper.find('.oral-answer').exists()).toBe(true)
    expect(wrapper.find('.recording-controls').exists()).toBe(true)
    expect(wrapper.find('.written-answer').exists()).toBe(false)
  })

  it('should display current answer in textarea', () => {
    const wrapper = mount(AnswerInput, {
      props: { ...defaultProps, currentAnswer: 'My test answer' }
    })

    const textarea = wrapper.find('.answer-textarea')
    expect(textarea.element.value).toBe('My test answer')
  })

  it('should emit updateAnswer on textarea input', async () => {
    const wrapper = mount(AnswerInput, {
      props: defaultProps
    })

    const textarea = wrapper.find('.answer-textarea')
    await textarea.setValue('New answer text')

    expect(wrapper.emitted('updateAnswer')).toBeTruthy()
    expect(wrapper.emitted('updateAnswer')![0]).toEqual(['New answer text'])
  })

  it('should emit toggleRecording on button click in oral mode', async () => {
    const wrapper = mount(AnswerInput, {
      props: { ...defaultProps, mode: 'oral' }
    })

    const recordingButton = wrapper.find('.recording-button')
    await recordingButton.trigger('click')

    expect(wrapper.emitted('toggleRecording')).toBeTruthy()
  })

  it('should show recording indicator when recording', () => {
    const wrapper = mount(AnswerInput, {
      props: { 
        ...defaultProps, 
        mode: 'oral',
        isRecording: true 
      }
    })

    expect(wrapper.find('.recording-indicator').exists()).toBe(true)
    expect(wrapper.find('.pulse-dot').exists()).toBe(true)
  })

  it('should show transcript area when transcript exists', () => {
    const wrapper = mount(AnswerInput, {
      props: { 
        ...defaultProps, 
        mode: 'oral',
        transcript: 'This is a transcript' 
      }
    })

    expect(wrapper.find('.transcript-area').exists()).toBe(true)
    expect(wrapper.find('.transcript-text').text()).toBe('This is a transcript')
  })

  it('should show transcript area when recording', () => {
    const wrapper = mount(AnswerInput, {
      props: { 
        ...defaultProps, 
        mode: 'oral',
        isRecording: true 
      }
    })

    expect(wrapper.find('.transcript-area').exists()).toBe(true)
    expect(wrapper.find('.transcript-text').text()).toBe('Listening...')
  })

  it('should emit updateAnswer from transcript editor', async () => {
    const wrapper = mount(AnswerInput, {
      props: { 
        ...defaultProps, 
        mode: 'oral',
        transcript: 'Original transcript' 
      }
    })

    const transcriptEditor = wrapper.find('.transcript-editor')
    await transcriptEditor.setValue('Edited transcript')

    expect(wrapper.emitted('updateAnswer')).toBeTruthy()
    expect(wrapper.emitted('updateAnswer')![0]).toEqual(['Edited transcript'])
  })

  it('should apply correct recording button class when recording', () => {
    const wrapper = mount(AnswerInput, {
      props: { 
        ...defaultProps, 
        mode: 'oral',
        isRecording: true 
      }
    })

    const recordingButton = wrapper.find('.recording-button')
    expect(recordingButton.classes()).toContain('recording')
  })

  it('should not apply recording class when not recording', () => {
    const wrapper = mount(AnswerInput, {
      props: { 
        ...defaultProps, 
        mode: 'oral',
        isRecording: false 
      }
    })

    const recordingButton = wrapper.find('.recording-button')
    expect(recordingButton.classes()).not.toContain('recording')
  })
})