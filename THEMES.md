# 🎨 Shadcn Theme System

## Overview

This monorepo now uses a simplified, shadcn-compatible theme system. Each app can use any of the 3 predefined themes or easily create new ones.

## Available Themes

### 🌌 Cyber (`themes/cyber.css`)
- **For:** Trinsler (dark, futuristic, neon)
- **Colors:** Dark background, blue/cyan accents, glow effects
- **Best for:** Tech, gaming, sci-fi projects

### ✨ Minimal (`themes/minimal.css`)
- **For:** Coin Boilerplate (clean, simple, professional)
- **Colors:** Neutral palette, subtle shadows
- **Best for:** Finance, documentation, minimal designs

## Usage

### For Existing Apps

Each app imports its theme in `assets/css/main.css`:

```css
/* Import theme */
@import '../../../../themes/cyber.css';  /* or glass.css or minimal.css */
@import 'tailwindcss';
```

### Quick Theme Switching

```bash
# Switch any app to any theme
pnpm theme:switch <app-name> <theme-name>

# Examples:
pnpm theme:switch trinsler glass
pnpm theme:switch coin-boilerplate-app cyber

# Quick shortcuts:
pnpm theme:cyber      # Sets trinsler to cyber
pnpm theme:minimal    # Sets coin-boilerplate-app to minimal
```

### Creating a New App

1. **Create your app structure**
2. **Choose a theme:**
   ```css
   /* apps/your-app/assets/css/main.css */
   @import '../../../../themes/glass.css';
   @import 'tailwindcss';
   ```
3. **Add Tailwind config:**
   ```js
   // apps/your-app/tailwind.config.js
   export default {
     content: [
       './components/**/*.{js,vue,ts}',
       './layouts/**/*.vue',
       './pages/**/*.vue',
       './plugins/**/*.{js,ts}',
       './app.vue',
       './error.vue',
       '../packages/ui/src/**/*.{js,vue,ts}'
     ],
     theme: {
       extend: {
         colors: {
           border: 'hsl(var(--border))',
           input: 'hsl(var(--input))',
           ring: 'hsl(var(--ring))',
           background: 'hsl(var(--background))',
           foreground: 'hsl(var(--foreground))',
           primary: {
             DEFAULT: 'hsl(var(--primary))',
             foreground: 'hsl(var(--primary-foreground))'
           },
           // ... (copy from existing app config)
         }
       }
     }
   }
   ```
4. **Done!** 🚀

### Creating Custom Themes

1. **Create new theme file:**
   ```bash
   cp themes/minimal.css themes/my-theme.css
   ```

2. **Edit CSS variables:**
   ```css
   @layer base {
     :root {
       --background: 20 14.3% 4.1%;    /* Your colors */
       --foreground: 0 0% 95%;         /* HSL format */
       --primary: 346.8 77.2% 49.8%;  /* shadcn format */
       /* ... customize all variables ... */
     }
   }
   ```

3. **Use in app:**
   ```css
   @import '../../../../themes/my-theme.css';
   ```

## Components

All UI components automatically use the theme CSS variables:

```vue
<!-- Automatically themed -->
<BaseCard>Content with theme colors</BaseCard>
<TerminalWindow title="Themed terminal" />
<Section background="muted">Themed section</Section>
```

## CSS Variables Reference

| Variable | Usage | Example |
|----------|-------|---------|
| `--background` | Main background | Body, pages |
| `--foreground` | Main text | Primary text color |
| `--card` | Card backgrounds | BaseCard, modals |
| `--card-foreground` | Card text | Text on cards |
| `--primary` | Primary brand color | Buttons, links |
| `--primary-foreground` | Primary button text | Text on primary |
| `--muted` | Subtle backgrounds | Disabled, secondary |
| `--muted-foreground` | Subtle text | Help text, labels |
| `--border` | Border color | All borders |
| `--ring` | Focus rings | Focus outlines |

## Migration Benefits

✅ **Simplified:** One CSS import per app
✅ **Consistent:** All apps use same shadcn variables
✅ **Flexible:** Easy theme switching
✅ **Maintainable:** No complex theme logic
✅ **Extensible:** Easy to add new themes
✅ **Best Practice:** Follows shadcn conventions

## Troubleshooting

### "Unknown utility class bg-card" error
Make sure your `tailwind.config.js` includes the shadcn color definitions.

### Theme not applying
1. Check the CSS import path is correct (`../../../../themes/theme-name.css`)
2. Ensure Tailwind config includes `../packages/ui/src/**/*.{js,vue,ts}` in content
3. Restart dev server after config changes

### Old theme references
The old UI package theme system has been completely removed. If you see `useTheme` imports, remove them - themes are now pure CSS.