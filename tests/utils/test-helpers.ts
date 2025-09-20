import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Execute pnpm command and return result
 */
export function runPnpm(command: string, cwd?: string): string {
  try {
    return execSync(`pnpm ${command}`, {
      cwd: cwd || process.cwd(),
      encoding: 'utf-8',
      stdio: 'pipe',
    })
  } catch (error: any) {
    throw new Error(`pnpm ${command} failed: ${error.message}`)
  }
}

/**
 * Check if TypeScript compiles without errors
 */
export function checkTypeScript(projectPath: string): boolean {
  try {
    execSync('pnpm run typecheck', {
      cwd: projectPath,
      stdio: 'pipe',
    })
    return true
  } catch {
    return false
  }
}

/**
 * Check if a build succeeds
 */
export function checkBuild(appName: string): boolean {
  try {
    execSync(`pnpm --filter=${appName} run build`, {
      cwd: process.cwd(),
      stdio: 'pipe',
    })
    return true
  } catch {
    return false
  }
}

/**
 * Read package.json from a path
 */
export function readPackageJson(packagePath: string) {
  const content = readFileSync(join(packagePath, 'package.json'), 'utf-8')
  return JSON.parse(content)
}

/**
 * Get all app names from monorepo
 */
export function getAppNames(): string[] {
  return ['@monorepo/trinsler', '@monorepo/betterclassroom', '@monorepo/coin-boilerplate-app']
}

/**
 * Get all package names from monorepo
 */
export function getPackageNames(): string[] {
  return ['@monorepo/ui', '@monorepo/shared']
}
