import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '~/components/index/LoginForm.vue'

describe('LoginForm', () => {
  const defaultProps = {
    scenarioCode: 'ABC123',
    validationError: '',
    t: (key: string) => key
  }

  it('should render correctly', () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should display scenario code value', () => {
    const wrapper = mount(LoginForm, {
      props: { ...defaultProps, scenarioCode: 'TEST123' }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('TEST123')
  })

  it('should display validation error', () => {
    const wrapper = mount(LoginForm, {
      props: { 
        ...defaultProps, 
        validationError: 'Code is too short' 
      }
    })

    expect(wrapper.find('.error-message').text()).toBe('Code is too short')
  })

  it('should emit updateCode on input', async () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps
    })

    const input = wrapper.find('input')
    await input.setValue('NEW123')

    expect(wrapper.emitted('updateCode')).toBeTruthy()
    expect(wrapper.emitted('updateCode')![0]).toEqual(['NEW123'])
  })

  it('should emit handleLogin on button click', async () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('handleLogin')).toBeTruthy()
  })

  it('should emit handleLogin on Enter key', async () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps
    })

    const input = wrapper.find('input')
    await input.trigger('keyup.enter')

    expect(wrapper.emitted('handleLogin')).toBeTruthy()
  })

  it('should have correct button text', () => {
    const mockT = vi.fn().mockImplementation((key) => {
      if (key === 'start') return 'Start Learning'
      return key
    })

    const wrapper = mount(LoginForm, {
      props: { 
        ...defaultProps,
        t: mockT
      }
    })

    expect(wrapper.find('button').text()).toBe('Start Learning')
    expect(mockT).toHaveBeenCalledWith('start')
  })

  it('should apply correct CSS classes', () => {
    const wrapper = mount(LoginForm, {
      props: defaultProps
    })

    expect(wrapper.find('.login-section').exists()).toBe(true)
    expect(wrapper.find('.scenario-input').exists()).toBe(true)
    expect(wrapper.find('.login-button').exists()).toBe(true)
  })
})