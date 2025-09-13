# Monorepo

Ein **NPM Workspace Monorepo** mit geteilten Packages für Landing Pages und Apps. **Ein `npm update` aktualisiert alle Apps**

## Shared Tech Stack

Alle Apps nutzen:

- **Frontend**: Nuxt 4, Vue 3, TypeScript, Tailwind CSS, Shadcn
- **Backend**: Supabase (Auth + DB + Edge Functions)
- **Payments**: Stripe
- **State**: Pinia
- **UI**: Headless UI, Heroicons
- **Build**: Vite + tsup (für Packages)

### Zentrale Dependency-Verwaltung
- **Ein `npm update`** → **Alle Apps** aktualisiert
- **Ein `npm install package`** → **Für alle Apps** verfügbar
- **Konsistente Versionen** überall
- **Shared Code** zwischen Apps

### Shared Packages
- **`@monorepo/shared`** - Types, Utils, Constants
- **`@monorepo/ui`** - Wiederverwendbare UI Componentse

### 📱 Apps
- **`coin-boilerplate-app`** - Vollständige Boilerplate mit OAuth, Payments, Email-Subscription

## 🚀 Quick Start

### 1. Setup

```bash
git clone https://github.com/Nielshen/landingPages.git
cd landingPages

npm install

npm run build:packages
```

### 2. Existierende App starten

```bash
npm run dev:coin    # coin-boilerplate-app auf localhost:3000
```

### 3. Neue App erstellen

```bash
# Neue App basierend auf coin-boilerplate-app
npm run create-new-app my-landing-page

# App konfigurieren
cd apps/my-landing-page
cp .env.example .env
# .env ausfüllen

# Zurück ins Root und starten
cd ../..
npm run dev:mylandingpage
```

## 📦 Dependency Management

### Ein Update für ALLE Apps

```bash
# EINMAL ausführen → ALLE Apps profitieren:
npm update              # Nuxt, Tailwind, Vue, etc. für alle Apps
npm install @vueuse/core # Neues Package für alle Apps
npm audit fix           # Security Updates für alle Apps
```

### Package hinzufügen

```bash
# Im Root hinzufügen = Für alle Apps verfügbar
npm install lucide-vue-next

# Development Dependencies
npm install -D vitest
```

### Per-App Development

```bash
# In eine App wechseln (optional)
cd apps/my-app

# Standard Nuxt Commands funktionieren
npm run dev          # localhost:3000
npm run build        # Production Build
npm run generate     # Static Generation

# Aber besser: Im Root arbeiten
cd ../..
npm run dev:myapp    # Aus Root starten
```

### Parallel Development

```bash
# Mehrere Apps gleichzeitig
npm run dev:coin &                    # Port 3000
NUXT_PORT=3001 npm run dev:myapp &    # Port 3001
NUXT_PORT=3002 npm run dev:another &  # Port 3002
```

## Services Setup (Einmalig)

### Supabase

```sql
-- 1. Projekt auf supabase.com erstellen
-- 2. Schema ausführen:

-- Aus packages/shared (für alle Apps):
-- apps/coin-boilerplate-app/supabase/schema.sql

-- Email Subscriptions Schema:
-- packages/email-subscription/src/schemas/email-subscriptions.sql

-- 3. Edge Functions deployen:
cd apps/my-app
supabase functions deploy stripe-webhook
```

### Google OAuth

```bash
# 1. Google Cloud Console → OAuth 2.0 Client
# 2. Redirect URIs:
#    - http://localhost:3000/auth/callback (Dev)
#    - https://yourdomain.com/auth/callback (Prod)
```

### Stripe

```bash
# 1. Stripe Dashboard → API Keys
# 2. Webhooks:
#    - Events: checkout.session.completed, checkout.session.expired
#    - Endpoint: https://project.supabase.co/functions/v1/stripe-webhook
```


### 🔗 Useful Links

- [NPM Workspaces Docs](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Monorepo Guide](https://www.typescriptlang.org/docs/handbook/project-references.html)