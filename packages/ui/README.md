# @monorepo/ui - Universal Component Library

A comprehensive Vue 3 + TypeScript UI package designed for multi-theme support across different applications. This package provides reusable components, composables, and TypeScript types that work seamlessly with any design system.

## 🎨 Theme-Agnostic Architecture

This component library supports multiple themes out of the box:

- **Cyber Theme** - Futuristic neon design (Trinsler)
- **Glass Theme** - Clean glassmorphism design (BetterClassroom)
- **Minimal Theme** - Simple, clean design system
- **Dark Theme** - Professional dark mode

All components automatically adapt to the current theme while maintaining consistent functionality.

## 📦 Installation & Usage

### In any app:

```typescript
// Import components and composables
import { TerminalWindow, BaseCard, useTheme } from '@monorepo/ui'

// Import theme styles (in your main.css or app entry)
import '@monorepo/ui/src/styles/themes.css'
```

### Package.json setup:
```json
{
  "dependencies": {
    "@monorepo/ui": "workspace:*"
  }
}
```

### Theme initialization:
```typescript
// Set theme globally
import { useTheme } from '@monorepo/ui'

const { setTheme } = useTheme()
setTheme('glass') // cyber | glass | minimal | dark
```

## 🏗️ Component Architecture

### Layout Components (Universal)

#### `BaseCard`
Universal card component that adapts to any theme.

```vue
<BaseCard
  theme="glass"
  variant="elevated"
  :hover="true"
  rounded="xl"
>
  <h3>Content goes here</h3>
</BaseCard>
```

**Props:**
- `theme?: 'cyber' | 'glass' | 'minimal' | 'dark' | 'auto'`
- `variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'minimal'`
- `rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'`
- `hover?: boolean`
- `glow?: boolean`

#### `TerminalWindow`
Terminal-style container that adapts to any theme.

```vue
<TerminalWindow
  title="my-project.sh"
  theme="cyber"
  :glow="true"
  size="lg"
>
  <h1>Terminal Content</h1>
</TerminalWindow>
```

**Props:**
- `title?: string`
- `theme?: ThemeName | 'auto'`
- `size?: 'sm' | 'md' | 'lg'`
- `glow?: boolean`
- `maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full'`

#### `Container`
Responsive container with consistent max-width and padding.

```vue
<Container max-width="4xl" padding="lg" center>
  <h1>Centered content with consistent spacing</h1>
</Container>
```

#### `Grid`
Flexible grid system with responsive breakpoints.

```vue
<Grid responsive="cards" gap="lg" align="stretch">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

<!-- Custom grid -->
<Grid :cols="3" :cols-md="2" :cols-lg="4" gap="md">
  <div>Custom responsive grid</div>
</Grid>
```

#### `Section`
Semantic page sections with consistent spacing and theming.

```vue
<Section
  title="Features"
  subtitle="What makes us different"
  padding-y="xl"
  background="accent"
>
  <Grid responsive="features">
    <FeatureCard v-for="feature in features" :key="feature.id" />
  </Grid>
</Section>
```

### Content Components

#### `ArticleCard`
```vue
<ArticleCard :article="articleData" />
```

#### `TrendCard` & `TrendGrid`
```vue
<TrendGrid :trends="trendsData" />
```

#### `CaseStudyCard` & `CaseStudiesSection`
```vue
<CaseStudiesSection :case-studies="studiesData" />
```

### Basic UI Elements

#### `BaseButton`
```vue
<BaseButton variant="primary" size="lg" :loading="isLoading">
  Click me
</BaseButton>
```

#### `LoadingSpinner`
```vue
<LoadingSpinner v-if="loading" />
```

## 🪝 Theme-Aware Composables

### `useTheme()`
Manage themes programmatically with full TypeScript support.

```typescript
import { useTheme } from '@monorepo/ui'

const {
  currentTheme,
  setTheme,
  toggleTheme,
  isDark,
  availableThemes
} = useTheme()

// Switch themes
setTheme('glass')

// Toggle between light/dark
toggleTheme()

// Cycle through all themes
cycleTheme()

// Check current theme
if (currentTheme.value === 'cyber') {
  // Cyber-specific logic
}
```

### `useForm()`
Type-safe form validation system.

```typescript
import { useForm, useField } from '@monorepo/ui'

const email = useField({
  value: '',
  rules: [
    { required: true, message: 'Email is required' },
    { pattern: /\S+@\S+\.\S+/, message: 'Invalid email' }
  ]
})

const form = useForm({ email })

const handleSubmit = async () => {
  await form.submit(async () => {
    // Submit logic
    return api.submit({ email: email.value })
  })
}
```

### `useAnimation()`
Intersection observer with theme-aware animations.

```typescript
import { useAnimation } from '@monorepo/ui'

const { isVisible, isAnimating, setupIntersectionObserver } = useAnimation({
  type: 'fade-in',
  duration: 800
})
```

### Other Composables
- `useApi()` - Data fetching with caching and retries
- `useScroll()` - Scroll position and direction tracking
- `useLocalStorage()` - Reactive local storage

## 🎨 Creating Custom Themes

### 1. Define theme in CSS:

```css
[data-theme="custom"] {
  --ui-bg-primary: #your-color;
  --ui-text-primary: #your-text-color;
  --ui-border-primary: #your-border-color;
  /* ... other variables */
}
```

### 2. Register theme in composable:

```typescript
// Extend the theme types
declare module '@monorepo/ui' {
  interface ThemeConfig {
    custom: {
      name: 'custom'
      displayName: 'Custom Theme'
      primaryColor: '#your-primary'
      isDark: boolean
    }
  }
}
```

### 3. Use in components:

```vue
<BaseCard theme="custom">
  Custom themed content
</BaseCard>
```

## 🚀 Best Practices

### Theme-First Development
```typescript
// ✅ Good: Let components adapt to current theme
<BaseCard>Content</BaseCard>

// ✅ Good: Override theme when needed
<BaseCard theme="minimal">Always minimal</BaseCard>

// ❌ Avoid: Hardcoded styling that breaks themes
<div class="bg-blue-500">Hardcoded color</div>
```

### Component Composition
```vue
<!-- ✅ Good: Compose layout components -->
<Section title="Features" padding-y="xl">
  <Container max-width="6xl">
    <Grid responsive="features" gap="lg">
      <BaseCard v-for="feature in features" :key="feature.id">
        {{ feature.content }}
      </BaseCard>
    </Grid>
  </Container>
</Section>
```

### TypeScript Usage
```typescript
// ✅ Good: Use proper types
import type { ThemeName } from '@monorepo/ui'

interface Props {
  theme?: ThemeName
}

// ❌ Avoid: Any types
const props: any = defineProps()
```

## 🎯 Landing Page Creation

This library makes creating new landing pages extremely efficient:

```vue
<template>
  <div>
    <!-- Hero Section -->
    <Section full-height background="gradient" text-align="center">
      <Container max-width="4xl" center>
        <h1 class="text-6xl font-bold ui-text-primary mb-6">
          Welcome to Our Platform
        </h1>
        <p class="text-xl ui-text-secondary mb-8">
          Build amazing products with our tools
        </p>
        <BaseButton variant="primary" size="xl">
          Get Started
        </BaseButton>
      </Container>
    </Section>

    <!-- Features Grid -->
    <Section title="Features" subtitle="Why choose us" padding-y="2xl">
      <Grid responsive="features" gap="xl">
        <BaseCard v-for="feature in features" :key="feature.id" :hover="true">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </BaseCard>
      </Grid>
    </Section>

    <!-- Call to Action -->
    <Section background="accent" text-align="center">
      <TerminalWindow title="ready-to-start.sh">
        <h2>Ready to get started?</h2>
        <BaseButton variant="primary">Start Now</BaseButton>
      </TerminalWindow>
    </Section>
  </div>
</template>

<script setup>
import {
  Section,
  Container,
  Grid,
  BaseCard,
  BaseButton,
  TerminalWindow,
  useTheme
} from '@monorepo/ui'

// Set theme for this landing page
const { setTheme } = useTheme()
setTheme('glass')

const features = [
  { id: 1, title: 'Fast', description: 'Lightning quick performance' },
  { id: 2, title: 'Secure', description: 'Enterprise-grade security' },
  { id: 3, title: 'Scalable', description: 'Grows with your business' }
]
</script>
```

## 📊 Technical Specifications

### Performance
- **Tree-shakable** - Only import what you use
- **Lazy loading** - Components load on demand
- **CSS Custom Properties** - Minimal runtime overhead
- **TypeScript** - Full type safety

### Compatibility
- **Vue 3.3+** with Composition API
- **TypeScript 5.0+** for best experience
- **Tailwind CSS 3.0+** for styling
- **Modern browsers** (ES2020+)

### Bundle Size
- **Core components**: ~15KB gzipped
- **All components**: ~45KB gzipped
- **Composables only**: ~8KB gzipped

## 🔧 Development

### Adding New Components
1. Create component in `/src/components/`
2. Add theme support via `useTheme()` composable
3. Export from `/src/components/index.ts`
4. Add documentation and examples

### Testing Themes
```bash
# Test with different themes
pnpm dev # Use theme switcher in dev mode
```

### Contributing
- Follow Vue 3 Composition API patterns
- Use TypeScript for all components
- Support all themes or document limitations
- Add comprehensive prop types and documentation

---

**For AI Sessions**: This component library prioritizes flexibility and theme-agnostic design. Always check existing components before creating new ones. Use `BaseCard`, `Container`, `Grid`, and `Section` for layouts. Theme support is built into all components via the `useTheme()` composable.