// Test setup file
import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn((key: string) => null),
  setItem: vi.fn((key: string, value: string) => {}),
  removeItem: vi.fn((key: string) => {}),
  clear: vi.fn(() => {}),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Mock window.dispatchEvent
Object.defineProperty(window, 'dispatchEvent', {
  value: vi.fn(),
  writable: true,
})

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}