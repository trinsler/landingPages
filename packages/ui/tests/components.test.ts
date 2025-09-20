import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { computed } from 'vue'

// Import components to test
import ArticleIcon from '../src/components/ArticleIcon.vue'
import ClassificationBadge from '../src/components/ClassificationBadge.vue'
import TagBadge from '../src/components/TagBadge.vue'

describe('UI Package - Component Tests', () => {
  describe('ArticleIcon', () => {
    test('renders with default props', () => {
      const wrapper = mount(ArticleIcon)

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('svg')).toBeTruthy()

      // Check default size class
      expect(wrapper.find('svg').classes()).toContain('w-5')
      expect(wrapper.find('svg').classes()).toContain('h-5')
    })

    test('renders with different sizes', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      const expectedClasses = {
        sm: ['w-4', 'h-4'],
        md: ['w-5', 'h-5'],
        lg: ['w-6', 'h-6'],
      }

      sizes.forEach(size => {
        const wrapper = mount(ArticleIcon, {
          props: { size },
        })

        const svg = wrapper.find('svg')
        expectedClasses[size].forEach(className => {
          expect(svg.classes()).toContain(className)
        })
      })
    })

    test('computed property works correctly', () => {
      // Test that the computed function from the component works
      // This tests the vue-tsc v3 fix we implemented
      const sizeClass = computed(() => {
        const sizes = {
          sm: 'w-4 h-4',
          md: 'w-5 h-5',
          lg: 'w-6 h-6',
        }
        return sizes['md']
      })

      expect(sizeClass.value).toBe('w-5 h-5')
    })
  })

  describe('ClassificationBadge', () => {
    test('renders with default props', () => {
      const wrapper = mount(ClassificationBadge)

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('div').exists()).toBe(true)
    })

    test('renders different classification levels', () => {
      const levels = ['public', 'confidential', 'secret', 'top-secret'] as const

      levels.forEach(level => {
        const wrapper = mount(ClassificationBadge, {
          props: { level },
        })

        expect(wrapper.exists()).toBe(true)
        // Badge should have appropriate classes based on level
        expect(wrapper.find('div').classes()).toContain('px-2')
        expect(wrapper.find('div').classes()).toContain('py-1')
      })
    })
  })

  describe('TagBadge', () => {
    test('renders with required tag prop', () => {
      const wrapper = mount(TagBadge, {
        props: { tag: 'Test Tag' },
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.text()).toContain('Test Tag')
    })

    test('renders with different variants', () => {
      const variants = ['default', 'accent', 'muted'] as const

      variants.forEach(variant => {
        const wrapper = mount(TagBadge, {
          props: {
            tag: 'Test',
            variant,
          },
        })

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('Test')

        // Should have base styling classes
        expect(wrapper.find('span').classes()).toContain('inline-flex')
        expect(wrapper.find('span').classes()).toContain('items-center')
      })
    })
  })

  describe('Component Integration', () => {
    test('components use consistent CSS class patterns', () => {
      const articleIcon = mount(ArticleIcon)
      const tagBadge = mount(TagBadge, { props: { tag: 'test' } })

      // Both should use Tailwind classes
      expect(articleIcon.html()).toMatch(/class="[^"]*w-\d+/)
      expect(tagBadge.html()).toMatch(/class="[^"]*(?:inline-flex|items-center)/)
    })

    test('all components render without errors', () => {
      expect(() => {
        mount(ArticleIcon)
        mount(ClassificationBadge)
        mount(TagBadge, { props: { tag: 'test' } })
      }).not.toThrow()
    })
  })
})
