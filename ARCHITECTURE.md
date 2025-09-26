# 🏗️ Monorepo Architecture

## Overview

This is a modern monorepo for building multiple web applications with shared UI components, utilities, and a flexible theme system. Built with pnpm workspaces, Nuxt 3, Vue 3, and TypeScript.

## 📁 Project Structure

```
landingPages/                    # Root monorepo
├── apps/                        # Applications
│   ├── trinsler/               # Growth services landing page
│   └── coin-boilerplate-app/   # Digital coin purchase platform
├── packages/                    # Shared packages
│   ├── ui/                     # Shared UI components
│   └── shared/                 # Common types & utilities
├── themes/                     # Theme system
│   ├── cyber.css              # Dark futuristic theme
│   ├── minimal.css            # Clean professional theme
│   └── glass.css              # Modern glass theme
├── scripts/                    # Development scripts
└── .github/workflows/          # CI/CD pipelines
```

## 🎯 Design Principles

### 1. **Shared-First Architecture**
- Common code in packages, app-specific code in apps
- Reusable UI components work across all themes
- Centralized configuration and tooling

### 2. **Theme-Agnostic Design**
- Components use CSS variables, not hardcoded colors
- Easy theme switching for apps
- Consistent design tokens via shadcn/ui variables

### 3. **TypeScript-First**
- Full type safety across the monorepo
- Shared types prevent inconsistencies
- Enhanced developer experience

### 4. **AI-Optimized Structure**
- Consistent patterns and naming conventions
- Clear separation of concerns
- Extensive documentation for AI assistance

## 🏢 Applications

### Trinsler (`apps/trinsler/`)
**Purpose**: B2B growth services landing page
- **Theme**: Cyber (dark, neon, futuristic)
- **Content**: Services, team, case studies, insights
- **Style**: Tech-forward, professional with edge
- **Target**: Startups and growing companies

### Coin Boilerplate App (`apps/coin-boilerplate-app/`)
**Purpose**: Digital coin purchase platform with payments
- **Theme**: Minimal (clean, professional)
- **Features**: OAuth auth, Stripe payments, user dashboard
- **Backend**: Supabase (database, auth, functions)
- **Target**: End-users purchasing digital coins

## 📦 Shared Packages

### UI Package (`packages/ui/`)
**24+ reusable Vue components**
- Layout components (cards, sections, terminals)
- Interactive elements (forms, buttons, badges)
- Specialized components (case studies, articles)
- Composables (toast system, storage utilities)

### Shared Package (`packages/shared/`)
**Common utilities and types**
- TypeScript interfaces and types
- Helper functions and validators
- API service patterns
- Constants and configurations

## 🎨 Theme System

### Three Themes Available
1. **Cyber**: Dark with neon accents (Trinsler)
2. **Minimal**: Light and clean (Coin App)
3. **Glass**: Modern with transparency effects

### CSS Variable System
All themes provide standard shadcn/ui variables:
```css
--background, --foreground
--primary, --secondary, --accent
--card, --border, --muted
--radius (border radius)
```

### Theme Switching
```bash
pnpm theme:switch <app> <theme>    # Switch any app to any theme
pnpm theme:cyber                   # Quick preset
pnpm theme:minimal                 # Quick preset
```

## 🛠️ Development Workflow

### Package Manager: pnpm
- Workspace support for monorepos
- Efficient dependency management
- Parallel command execution

### Unified Commands
```bash
# Development
pnpm dev:all          # Start all apps in development
pnpm dev:trinsler     # Start specific app
pnpm dev:coin         # Start specific app

# Building
pnpm build:all        # Build all apps
pnpm build:packages   # Build shared packages

# Quality Assurance
pnpm typecheck:all    # Type check all apps
pnpm lint             # Lint all code
pnpm test:build       # Test builds
```

### CI/CD Pipeline
- **Node.js 22** standardized across all workflows
- **Parallel builds** for performance
- **Artifact uploads** for deployment
- **Quality gates** (lint, typecheck, tests)

## 🔧 Technical Stack

### Frontend
- **Nuxt 3**: Full-stack framework
- **Vue 3**: Component framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Design system compatibility

### Backend (Coin App)
- **Supabase**: Backend-as-a-Service
- **Stripe**: Payment processing
- **PostgreSQL**: Database via Supabase
- **Edge Functions**: Serverless functions

### Development Tools
- **Vitest**: Testing framework
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **pnpm**: Package management
- **GitHub Actions**: CI/CD

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 22+
- pnpm 9+

### Quick Start
```bash
# Install dependencies
pnpm install

# Start all apps in development
pnpm dev:all

# Or start specific app
pnpm dev:trinsler
pnpm dev:coin
```

### Creating New Apps
```bash
# Use the app generator
pnpm create-new-app

# Or manually create following the established patterns
```

## 🤖 AI Development Support

### AI-Friendly Features
- **Consistent patterns** across all apps
- **Clear documentation** in .ai-context.md files
- **Type definitions** for all data structures
- **Standardized component structure**
- **Well-documented utilities and helpers**

### AI Context Files
Each major directory contains `.ai-context.md` with:
- Purpose and current structure
- Key patterns and conventions
- Import paths and usage examples
- Common tasks and troubleshooting

### Quick AI Tasks
1. **Create new component**: Follow established patterns in UI package
2. **Add new page**: Use Nuxt 3 file-based routing
3. **Switch themes**: Use theme switching commands
4. **Add new app**: Follow monorepo structure patterns
5. **Extend types**: Add to shared package first

## 🔒 Best Practices

### Code Organization
- **Separation of concerns**: Apps vs packages vs themes
- **Consistent naming**: PascalCase components, camelCase files
- **Clear dependencies**: Explicit imports and exports

### Performance
- **Tree shaking**: Only import what's needed
- **Code splitting**: Route-based chunks in apps
- **Optimized images**: WebP format, proper sizing
- **Bundle analysis**: Monitor package sizes

### Security
- **Environment variables**: Proper secret management
- **OAuth implementation**: Secure authentication flows
- **Payment security**: PCI-compliant via Stripe
- **Database security**: Row-level security (RLS)

## 📈 Scaling Strategy

### Adding New Apps
1. Create in `apps/` directory
2. Choose or create appropriate theme
3. Use shared packages for common functionality
4. Add app-specific scripts to root package.json

### Adding New Packages
1. Create in `packages/` directory
2. Define clear boundaries and responsibilities
3. Export only what's needed publicly
4. Include comprehensive TypeScript types

### Theme Expansion
1. Create new theme CSS file in `themes/`
2. Follow shadcn/ui variable structure
3. Test with existing components
4. Update theme switching scripts

This architecture enables rapid development of new applications while maintaining consistency, quality, and performance across the entire monorepo.