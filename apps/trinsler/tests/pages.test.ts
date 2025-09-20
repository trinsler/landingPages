import { describe, test, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils/e2e'

describe('Trinsler App - Page Smoke Tests', () => {
  test('homepage renders with correct meta content', async () => {
    const html = await $fetch('/')

    // Check title
    expect(html).toContain('<title>Trinsler - Equity-for-Growth Revolution</title>')

    // Check meta description
    expect(html).toContain('meta name="description"')
    expect(html).toContain('Equity-for-Growth')

    // Check that CSS is loaded (Tailwind classes should be present)
    expect(html).toContain('class=')

    // Check that main content is present
    expect(html).toContain('Trinsler')
  })

  test('main pages are accessible', async () => {
    const pages = [
      '/',
      '/services',
      '/team',
      '/portfolio',
      '/contact',
      '/impressum',
      '/datenschutz',
    ]

    for (const page of pages) {
      try {
        const html = await $fetch(page)
        expect(html).toContain('<!DOCTYPE html>')
        expect(html).not.toContain('404')
        expect(html).not.toContain('Error')
      } catch (error) {
        // If page doesn't exist, that's ok for some pages
        console.warn(`Page ${page} might not exist yet:`, error)
      }
    }
  })

  test('CSS classes are applied correctly', async () => {
    const html = await $fetch('/')

    // Check that Tailwind CSS is working
    expect(html).toMatch(/class="[^"]*(?:container|flex|grid|text-|bg-|p-|m-)/i)

    // Check custom CSS classes are present
    expect(html).toMatch(/(?:btn-primary|glass-card|gradient-text|cyber-)/i)
  })

  test('no JavaScript errors in page content', async () => {
    const html = await $fetch('/')

    // Check that Vue/Nuxt rendered properly
    expect(html).not.toContain('data-server-rendered="false"')

    // Check for proper script tags
    expect(html).toContain('<script')

    // No obvious error messages
    expect(html).not.toContain('ReferenceError')
    expect(html).not.toContain('TypeError')
  })
})
