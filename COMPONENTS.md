# 🧩 Component Patterns & Library

This document outlines the component patterns, design principles, and usage guidelines for the shared UI library and app-specific components.

## 📚 UI Package Components (`@monorepo/ui`)

### Layout Components

#### BaseCard
**Purpose**: Flexible card container with theme-aware styling
```vue
<BaseCard padding="md" hover clickable>
  <h3>Card Title</h3>
  <p>Card content here</p>
</BaseCard>
```

**Props**:
- `tag`: HTML element (div, article, section, aside)
- `padding`: Size variants (none, sm, md, lg, xl)
- `hover`: Enable hover effects
- `clickable`: Add cursor pointer

#### Section
**Purpose**: Page sections with background variants
```vue
<Section background="muted" padding="lg">
  <Container>
    <h2>Section Title</h2>
    <p>Section content</p>
  </Container>
</Section>
```

**Background Options**:
- `default`: Standard background
- `muted`: Subtle background
- `card`: Card-style background

#### TerminalWindow
**Purpose**: Cyber-themed terminal interface
```vue
<TerminalWindow title="~/projects/awesome-app">
  <div class="code-font">
    <span class="text-accent-neon">$</span> npm run dev
  </div>
</TerminalWindow>
```

### UI Elements

#### BaseButton
**Purpose**: Consistent button styling across themes
```vue
<BaseButton variant="primary" size="md" @click="handleClick">
  Click Me
</BaseButton>
```

**Variants**: primary, secondary, outline, ghost
**Sizes**: sm, md, lg

#### LoadingSpinner
**Purpose**: Loading states
```vue
<LoadingSpinner size="md" :show="isLoading" />
```

### Content Components

#### ArticleCard
**Purpose**: Blog/article display
```vue
<ArticleCard
  :article="article"
  show-excerpt
  show-tags
  @click="navigateToArticle"
/>
```

#### CaseStudyCard
**Purpose**: Project showcase
```vue
<CaseStudyCard
  :case-study="caseStudy"
  show-tech-stack
  @view-details="openModal"
/>
```

### Notification System

#### ToastContainer
**Purpose**: Global toast notifications
```vue
<ToastContainer :toasts="toasts" @dismiss="dismissToast" />
```

**Usage with Composable**:
```typescript
import { useToast } from '@monorepo/ui'

const { addToast, toasts, dismiss } = useToast()

addToast({
  type: 'success',
  message: 'Operation completed!',
  duration: 3000
})
```

## 🎨 Theme Integration Patterns

### CSS Variable Usage
All components use CSS variables for theming:

```css
/* ✅ Correct - Theme agnostic */
background-color: hsl(var(--card));
color: hsl(var(--foreground));
border-color: hsl(var(--border));

/* ❌ Incorrect - Theme specific */
background-color: #1a1a1a;
color: #ffffff;
```

### Theme-Specific Classes
Some themes provide utility classes:

```css
/* Cyber theme specific */
.cyber-card { /* Neon glow effects */ }
.neon-text { /* Neon text glow */ }
.gradient-text-neon { /* Gradient text */ }

/* Minimal theme specific */
.minimal-card { /* Clean card styling */ }
.minimal-button { /* Simple button */ }
```

## 🏗️ App-Specific Component Patterns

### Trinsler App Components

#### Directory Structure
```
components/
├── layout/     # AppLogo, AppNavbar, AppFooter
├── sections/   # Hero, Services, Stats, Testimonials
├── forms/      # NewsletterSubscription, ContactForm
└── ui/         # App-specific UI components
```

#### Styling Patterns
```vue
<template>
  <div class="cyber-card rounded-xl">
    <h2 class="gradient-text-neon">Cyber Title</h2>
    <p class="text-glow-cyan">Neon text with glow</p>
    <button class="btn-primary animate-glow-pulse">
      Cyber Button
    </button>
  </div>
</template>
```

### Coin Boilerplate App Components

#### Directory Structure
```
components/
├── layout/     # Layout-specific components
├── forms/      # Payment forms, auth forms
└── ui/         # ErrorBoundary, etc.
```

#### Styling Patterns
```vue
<template>
  <div class="bg-card border border-border rounded-lg p-6">
    <h2 class="text-foreground font-semibold">Clean Title</h2>
    <p class="text-muted-foreground">Subtle description</p>
    <button class="bg-primary hover:bg-primary/90 text-primary-foreground">
      Professional Button
    </button>
  </div>
</template>
```

## 📝 Component Development Guidelines

### 1. Theme Compatibility
- **Always use CSS variables** instead of hardcoded colors
- **Test with all themes** during development
- **Provide fallback styles** for missing variables

### 2. TypeScript Integration
```typescript
interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

interface Emits {
  click: [event: MouseEvent]
  change: [value: string]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

const emit = defineEmits<Emits>()
```

### 3. Accessibility
- **Use semantic HTML** elements
- **Include ARIA attributes** when needed
- **Ensure keyboard navigation** works
- **Provide proper contrast** ratios

### 4. Responsive Design
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Responsive grid -->
  </div>
</template>
```

### 5. Slot Patterns
```vue
<template>
  <BaseCard>
    <template #header>
      <h2>Card Header</h2>
    </template>

    <p>Default slot content</p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <BaseButton>Cancel</BaseButton>
        <BaseButton variant="primary">Save</BaseButton>
      </div>
    </template>
  </BaseCard>
</template>
```

## 🔄 Component Lifecycle Patterns

### Composables Integration
```vue
<script setup lang="ts">
import { useToast } from '@monorepo/ui'
import { formatDate } from '@monorepo/shared'

const { addToast } = useToast()

const handleSubmit = async () => {
  try {
    await submitForm()
    addToast({
      type: 'success',
      message: 'Form submitted successfully!'
    })
  } catch (error) {
    addToast({
      type: 'error',
      message: 'Failed to submit form'
    })
  }
}
</script>
```

### Loading States
```vue
<template>
  <BaseButton :disabled="isLoading">
    <LoadingSpinner v-if="isLoading" size="sm" />
    <span v-else>Submit</span>
  </BaseButton>
</template>
```

## 🛠️ Development Workflow

### Adding New Components

#### To UI Package
1. Create component in `packages/ui/src/components/`
2. Add TypeScript interface
3. Export in `index.ts`
4. Write tests
5. Update documentation

#### To Apps
1. Create in appropriate subdirectory
2. Follow established patterns
3. Use shared components when possible
4. Import from correct paths

### Testing Components
```javascript
import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import BaseCard from '../BaseCard.vue'

describe('BaseCard', () => {
  it('renders with correct classes', () => {
    render(BaseCard, {
      props: { padding: 'md', hover: true }
    })

    expect(screen.getByRole('generic')).toHaveClass('p-6')
  })
})
```

## 🎯 Best Practices

### Performance
- **Lazy load** heavy components
- **Use `defineAsyncComponent`** for code splitting
- **Minimize prop drilling** with provide/inject
- **Debounce** expensive operations

### Maintainability
- **Follow single responsibility** principle
- **Keep components small** and focused
- **Extract complex logic** to composables
- **Document component APIs** clearly

### Consistency
- **Use shared design tokens** from themes
- **Follow naming conventions** (PascalCase components)
- **Maintain consistent prop interfaces**
- **Use established patterns** across apps

This component system enables rapid development while maintaining consistency, accessibility, and theme compatibility across all applications in the monorepo.