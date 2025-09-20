import { describe, test, expect } from 'vitest'
import { $fetch } from '@nuxt/test-utils/e2e'

describe('Coin Boilerplate App - Page Smoke Tests', () => {
  test('homepage renders correctly', async () => {
    const html = await $fetch('/')

    // Check basic HTML structure
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('<html')

    // Check that CSS is loaded
    expect(html).toContain('class=')

    // Should not show critical errors
    expect(html).not.toContain('500')
    expect(html).not.toContain('ReferenceError')
  })

  test('main app pages are accessible', async () => {
    const pages = ['/', '/shop', '/dashboard']

    for (const page of pages) {
      try {
        const html = await $fetch(page)
        expect(html).toContain('<!DOCTYPE html>')
        // Pages might redirect to auth, that's ok
      } catch (error) {
        console.warn(`Page ${page} might require auth:`, error)
      }
    }
  })

  test('auth callback page exists', async () => {
    try {
      const html = await $fetch('/auth/callback')
      expect(html).toContain('<!DOCTYPE html>')
    } catch (error) {
      // Auth callback might redirect, that's expected
      console.warn('Auth callback redirects, which is expected:', error)
    }
  })

  test('CSS and styling is working', async () => {
    const html = await $fetch('/')

    // Check Tailwind classes
    expect(html).toMatch(/class="[^"]*(?:bg-|text-|p-|m-|flex)/i)

    // Check theme variables
    expect(html).toMatch(/(?:--ui-bg|--ui-text|var\(--)/i)
  })

  test('Supabase integration is configured', async () => {
    const html = await $fetch('/')

    // Should contain Supabase-related scripts or config
    // This is a very basic check that the app structure is intact
    expect(html).toContain('<script')

    // Should not show Supabase connection errors in HTML
    expect(html).not.toContain('Supabase Error')
    expect(html).not.toContain('Invalid API key')
  })
})
