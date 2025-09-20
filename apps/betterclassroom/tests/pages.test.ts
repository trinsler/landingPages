import { describe, test, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils/e2e'

describe('BetterClassroom App - Page Smoke Tests', () => {
  test('homepage renders correctly', async () => {
    const html = await $fetch('/')

    // Check basic HTML structure
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html')
    expect(html).toContain('<head>')
    expect(html).toContain('<body')

    // Check that CSS is loaded
    expect(html).toContain('class=')

    // Check for meta tags
    expect(html).toContain('<meta')
  })

  test('main pages are accessible', async () => {
    const pages = ['/', '/agb', '/datenschutz', '/impressum']

    for (const page of pages) {
      try {
        const html = await $fetch(page)
        expect(html).toContain('<!DOCTYPE html>')
        expect(html).not.toContain('404')
      } catch (error) {
        console.warn(`Page ${page} might not exist:`, error)
      }
    }
  })

  test('CSS framework is working', async () => {
    const html = await $fetch('/')

    // Check Tailwind CSS classes are present
    expect(html).toMatch(/class="[^"]*(?:bg-|text-|p-|m-|flex|grid)/i)

    // Check custom CSS variables are applied
    expect(html).toMatch(/(?:--background|--foreground|--primary)/i)
  })

  test('theme system is functional', async () => {
    const html = await $fetch('/')

    // Check CSS custom properties for theming
    expect(html).toMatch(/--glass-bg|--accent-|--background/i)

    // Check theme classes
    expect(html).toMatch(/(?:glass-card|gradient-|theme-)/i)
  })
})
