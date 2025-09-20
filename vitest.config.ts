/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Run only root-level tests for now
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
})
