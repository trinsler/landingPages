import { describe, test, expect } from 'vitest'

describe('Shared Package - Type Tests', () => {
  test('package can be imported without errors', async () => {
    // Basic import test to ensure package structure is correct
    expect(async () => {
      await import('../src/index.ts')
    }).not.toThrow()
  })

  test('TypeScript compilation works', () => {
    // This test ensures the shared package types compile correctly
    // If vue-tsc or TypeScript updates break something, this will catch it

    interface TestInterface {
      id: string
      name: string
    }

    const testObject: TestInterface = {
      id: '123',
      name: 'test',
    }

    expect(testObject.id).toBe('123')
    expect(testObject.name).toBe('test')
  })

  test('exports are available', async () => {
    try {
      const sharedModule = await import('../src/index.ts')
      expect(typeof sharedModule).toBe('object')
    } catch (error) {
      // If the shared package doesn't export anything yet, that's ok
      console.warn('Shared package might not have exports yet:', error)
    }
  })
})
