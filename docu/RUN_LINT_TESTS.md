# 🧹 Linting & Testing Guide

This guide documents how to run linting and tests locally and what you need to do before `git push` to ensure the CI/CD pipeline passes.

## 📋 Pre-Push Checklist

**IMPORTANT**: Run these commands before every `git push` to ensure the pipeline succeeds:

```bash
# 1. TypeScript compilation check
pnpm run typecheck

# 2. Linting (with auto-fix)
pnpm run lint:fix

# 3. Code formatting
pnpm run format

# 4. Run all tests
pnpm test:build
pnpm test:run

# 5. Build all apps (to catch build errors)
pnpm --filter=@monorepo/trinsler run build
pnpm --filter=@monorepo/betterclassroom run build
pnpm --filter=@monorepo/coin-boilerplate-app run build
```

## 🔧 Available Commands

### Linting Commands

```bash
# Check for linting errors (read-only)
pnpm run lint

# Auto-fix linting errors where possible
pnpm run lint:fix

# Check code formatting (read-only)
pnpm run format:check

# Auto-format code
pnpm run format
```

### Testing Commands

```bash
# Run all tests (watch mode by default)
pnpm test

# Run all tests once (CI mode)
pnpm test:run

# Run only build/health tests
pnpm test:build

# Interactive UI for tests
pnpm test:ui

# Watch mode (re-run on file changes)
pnpm test:watch

# Generate coverage reports
pnpm test:coverage

# Run component tests for UI package
cd packages/ui && pnpm vitest run

# Run component tests for shared package
cd packages/shared && pnpm vitest run

# TypeScript compilation check
pnpm run typecheck
```

### Build Commands

```bash
# Build specific app
pnpm --filter=@monorepo/trinsler run build
pnpm --filter=@monorepo/betterclassroom run build
pnpm --filter=@monorepo/coin-boilerplate-app run build

# Build packages
pnpm run build:packages
```

## 🤖 Automated Checks

### CI/CD Pipeline

**🎉 UPDATED**: Jetzt werden **ALLE** Pull Requests automatisch getestet!

**Main Test Pipeline** (`.github/workflows/test.yml`):

- **Triggers**: Push zu main/develop + ALL Pull Requests
- **Multi-Node Testing**: Tests auf Node.js 20 & 22
- **TypeScript Compilation**: `pnpm run typecheck`
- **Linting & Formatting**: `pnpm run lint` + `pnpm run format:check`
- **Build Health Tests**: `pnpm run test:build`
- **Component Tests**: Vitest tests in `packages/ui` und `packages/shared`
- **App Builds**: Alle drei Apps müssen erfolgreich builden
- **Dependency Security Audit**: Prüft auf Vulnerabilities
- **Lighthouse Performance**: Performance-Tests bei PRs

**NEW: PR Validation Pipeline** (`.github/workflows/pr-checks.yml`):

- **Triggers**: **ALLE** Pull Requests (auch Feature-Branches zu main!)
- **Quick Validation**: TypeScript, Lint, Format, Tests, Build
- **Security Scan**: Dependency Audit und Vulnerability Check
- **Bundle Size Check**: Vergleich zwischen Base- und PR-Branch
- **PR Summary**: Detaillierter Status-Report in GitHub
- **Draft PR Support**: Läuft nur bei ready-for-review PRs

## 🚨 Common Issues & Solutions

### TypeScript Errors

```bash
# Fix missing imports
pnpm run typecheck
# Look for import errors and add missing imports

# Update type definitions if needed
```

### Linting Errors

```bash
# Most issues can be auto-fixed
pnpm run lint:fix

# For remaining issues, check the error message and fix manually
```

### Build Failures

```bash
# Check what's failing in the build
pnpm --filter=@monorepo/[app-name] run build

# Common issues:
# - Missing dependencies: add to package.json
# - Import path errors: fix relative/absolute paths
# - Type errors: fix TypeScript issues
```

### Test Failures

```bash
# Run tests with verbose output
pnpm test:build --reporter=verbose

# Check specific test files
pnpm vitest run tests/build.test.ts

# Debug with UI interface
pnpm test:ui

# Watch specific test file
pnpm vitest watch tests/build.test.ts

# Run with coverage to see what's not tested
pnpm test:coverage
```

## 🧪 Advanced Testing Features

### Interactive Testing UI

```bash
# Start the Vitest UI (opens in browser)
pnpm test:ui
```

The UI provides:

- Visual test results
- Code coverage visualization
- Test file explorer
- Real-time test execution
- Debug capabilities

### Coverage Reports

```bash
# Generate coverage reports
pnpm test:coverage

# Coverage files are generated in:
# - coverage/lcov-report/index.html (detailed HTML report)
# - coverage/lcov.info (machine-readable format)
```

### Watch Mode Development

```bash
# Auto-run tests on file changes
pnpm test:watch

# Watch specific test pattern
pnpm vitest watch build

# Watch specific directory
pnpm vitest watch packages/ui
```

## 📊 Code Quality Standards

Our codebase enforces:

- **TypeScript**: No `any` types, proper type definitions
- **ESLint**: Vue/Nuxt/TypeScript best practices
- **Prettier**: Consistent code formatting
- **Import Organization**: Grouped and ordered imports
- **Component Naming**: Multi-word component names (with exceptions for pages)

## 🔄 Updating Dependencies

Use the automated dependency update system:

1. **Weekly Updates**: Automated PR with non-breaking updates
2. **Security Updates**: Immediate PRs for security vulnerabilities
3. **Manual Updates**: See `DEPENDENCY_UPDATE.md` for manual process

## 📈 Performance Monitoring

- **Build Health**: Automated tests ensure builds don't break
- **Bundle Size**: Monitored in CI/CD
- **Lighthouse**: Performance testing on PRs
- **TypeScript**: Compilation time tracking

---

## 🎯 Quick Reference

**Before every push:**

```bash
pnpm run typecheck && pnpm run lint:fix && pnpm run format && pnpm test:build && pnpm test:run
```

**If CI fails:**

1. Check the error logs in GitHub Actions
2. Run the same commands locally
3. Fix issues and push again

**Emergency bypass** (use sparingly):

```bash
git commit -m "fix: emergency fix" --no-verify
```

Remember: **Quality code prevents bugs in production!** 🚀
