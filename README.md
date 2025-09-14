# Monorepo

An **NPM Workspace Monorepo** with shared packages for Landing Pages and Apps. **One `npm update` updates all apps**

## Shared Tech Stack

All apps use:

- **Frontend**: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Shadcn
- **Backend**: Supabase (Auth + DB + Edge Functions)
- **Payments**: Stripe
- **State**: Pinia
- **UI**: Headless UI, Heroicons
- **Build**: Vite + tsup (for packages)

### Shared Packages
- **`@monorepo/shared`** - Types, Utils, Constants
- **`@monorepo/ui`** - Reusable UI Components

### 📱 Apps
- **`coin-boilerplate-app`** - Complete boilerplate with OAuth, Payments, Email subscription

## 🚀 Quick Start

### 1. Setup

```bash
git clone https://github.com/Nielshen/landingPages.git
cd landingPages

pnpm install

pnpm run build:packages
```

### 2. Start existing app

```bash
pnpm dev:coin    # coin-boilerplate-app on localhost:3000
```

### 3. Create new app

```bash
# New app based on coin-boilerplate-app
pnpm run create-new-app my-landing-page

# Configure app
cd apps/my-landing-page
cp .env.example .env
# Fill out .env

# Back to root and start
cd ../..
pnpm dev:mylandingpage
```

## 📦 Dependency Management

### One update for ALL apps

```bash
# Run ONCE → ALL apps benefit:
pnpm update              # Nuxt, Tailwind, Vue, etc. for all apps
pnpm add @vueuse/core    # New package for all apps
pnpm audit fix           # Security updates for all apps
```

### Add package

```bash
# Add in root = Available for all apps
pnpm add lucide-vue-next

# Development dependencies
pnpm add -D vitest
```

### Per-app development

```bash
# Switch to an app (optional)
cd apps/my-app

# Standard Nuxt commands work
pnpm dev             # localhost:3000
pnpm build           # Production build
pnpm generate        # Static generation

# But better: Work from root
cd ../..
pnpm dev:myapp       # Start from root
```

### Parallel development

```bash
# Multiple apps simultaneously
pnpm dev:coin &                       # Port 3000
NUXT_PORT=3001 pnpm dev:myapp &       # Port 3001
NUXT_PORT=3002 pnpm dev:another &     # Port 3002
```

## Services Setup

### Google OAuth

See SETUP_OAUTH.md

### Supabase and Stripe

See SETUP_SUPABASE.md

## 🔗 Useful Links

- [NPM Workspaces Docs](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Monorepo Guide](https://www.typescriptlang.org/docs/handbook/project-references.html)