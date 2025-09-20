# Dependency Updates with pnpm

This guide describes how to update npm and all other dependencies in this Vue/Nuxt project using pnpm.

## Prerequisites

Make sure pnpm is installed:
```bash
npm install -g pnpm
```

## Updating Dependencies

### 1. Check all dependencies for updates
```bash
pnpm outdated
```

### 2. Update all dependencies interactively
```bash
pnpm update --interactive
```

### 3. Update all dependencies automatically
```bash
pnpm update --latest
```

### 4. Update specific packages
```bash
pnpm update [package-name]
pnpm update [package-name] --latest
```

## Vue/Nuxt Specific Updates

### Update Vue
```bash
pnpm update vue --latest
```

### Update Nuxt
```bash
pnpm update nuxt --latest
```

### Vue Ecosystem Updates
```bash
pnpm update @vue/cli @vue/cli-service vue-router vuex --latest
```

## Security Updates

### Check for security vulnerabilities
```bash
pnpm audit
```

### Automatically fix security vulnerabilities
```bash
pnpm audit --fix
```

## After Updates

1. **Commit lockfile**: `pnpm-lock.yaml` should be committed
2. **Run tests**: Make sure all tests still pass
3. **Start project**: Verify the project starts correctly
4. **Test build**: Run a build to ensure everything compiles

```bash
pnpm run dev    # Start development server
pnpm run build  # Build project
pnpm run test   # Run tests (if available)
```

## Useful pnpm Commands

- `pnpm list`: Show all installed packages
- `pnpm list --depth=0`: Show only top-level dependencies
- `pnpm why [package]`: Shows why a package is installed
- `pnpm prune`: Remove unused packages