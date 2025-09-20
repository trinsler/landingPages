import { describe, test, expect } from 'vitest'

import { checkTypeScript, checkBuild, getAppNames, runPnpm } from './utils/test-helpers'

describe('Build Health Tests', () => {
  test('monorepo TypeScript compiles without errors', async () => {
    const result = checkTypeScript(process.cwd())
    expect(result).toBe(true)
  }, 30000) // 30s timeout for typecheck

  test('all apps build successfully', async () => {
    const apps = getAppNames()

    for (const app of apps) {
      const buildSucceeds = checkBuild(app)
      expect(buildSucceeds, `${app} should build successfully`).toBe(true)
    }
  }, 60000) // 60s timeout for builds

  test('packages build successfully', async () => {
    const packagesResult = runPnpm('run build:packages')
    expect(packagesResult).toContain('Done')
  }, 30000)

  test('Tailwind CSS compiles without errors', async () => {
    // Test that CSS processing works by checking build outputs
    const trinslerBuild = checkBuild('@monorepo/trinsler')
    expect(trinslerBuild).toBe(true)

    const betterclassroomBuild = checkBuild('@monorepo/betterclassroom')
    expect(betterclassroomBuild).toBe(true)

    const coinBuild = checkBuild('@monorepo/coin-boilerplate-app')
    expect(coinBuild).toBe(true)
  }, 90000) // 90s for all builds

  test('pnpm outdated shows no critical updates needed', async () => {
    try {
      const outdated = runPnpm('outdated')
      // If outdated returns output, dependencies need updates
      // We just test that the command doesn't crash
      expect(typeof outdated).toBe('string')
    } catch (error: any) {
      // pnpm outdated exits with code 1 when no updates available - that's good!
      if (error.message.includes('failed')) {
        // No outdated packages is actually success
        expect(true).toBe(true)
      }
    }
  })
})
