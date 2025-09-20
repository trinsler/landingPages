import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt(
  {
    features: {
      // Enable TypeScript support
      typescript: true,
      // Enable Vue support
      vue: true,
      // Enable Nuxt-specific rules
      nuxt: true,
    },
    dirs: {
      // Lint these directories
      src: ['apps', 'packages', 'tests'],
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.output/**',
      '**/.nuxt/**',
      '**/.cache/**',
      '**/coverage/**',
      '**/*.log',
      '**/.env*',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
    ],
  }
).append(
  // Custom rules for the monorepo
  {
    files: ['**/*.{ts,vue,js}'],
    rules: {
      // Vue-specific rules (relaxed for pages and simple components)
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: [
            'default',
            'index',
            'error',
            'callback',
            'dashboard',
            'shop',
            'auth',
            'agb',
            'datenschutz',
            'impressum',
            'contact',
            'services',
            'portfolio',
            'insights',
            'team',
            'Hero',
            'Services',
            'Stats',
            'Testimonials',
            'Container',
            'Grid',
            'Section',
            'cancelled',
            'success',
          ],
        },
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/require-default-prop': 'off', // Allow optional props without defaults

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',

      // Import/export rules
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
    },
  },
  // Test files have relaxed rules
  {
    files: ['**/*.test.{ts,js}', '**/tests/**/*.{ts,js}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // Config files and scripts have relaxed rules
  {
    files: ['*.config.{ts,js}', '.eslintrc.{js,cjs}', 'scripts/**/*.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/order': 'off',
    },
  },
  // Supabase functions have relaxed rules
  {
    files: ['**/supabase/functions/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  }
)
