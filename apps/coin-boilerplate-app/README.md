# CoinApp - Digital Coin Purchase Platform

Eine moderne, sichere Boilerplate-Anwendung für den Kauf digitaler Coins mit OAuth-Authentifizierung und Stripe-Integration.

## 🚀 Features

- **Google OAuth Authentifizierung** - Sichere Anmeldung ohne Passwörter
- **Stripe Payment Integration** - Sichere Zahlungsabwicklung mit Kreditkarte, Apple Pay, Google Pay
- **Real-time Updates** - Sofortige Coin-Balance Updates mit Supabase Realtime
- **Row Level Security** - Umfassende Datenbankabsicherung
- **Responsive Design** - Optimiert für Desktop und Mobile
- **TypeScript** - Vollständige Typsicherheit
- **SEO Optimiert** - Server-Side Rendering mit Nuxt 3

## 🛠️ Tech Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth mit Google OAuth
- **Payments**: Stripe
- **State Management**: Pinia
- **Deployment**: GitHub Pages
- **Build Tool**: Vite

## 📦 Quick Start

### 1. Environment Variables einrichten

```bash
cp .env.example .env
```

Fülle die `.env` Datei mit deinen Credentials aus:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret

# Site Configuration
SITE_URL=http://localhost:3000
```

### 2. Dependencies installieren und starten

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## 🔧 Setup Services

### Supabase Setup

1. **Neues Projekt** auf [supabase.com](https://supabase.com) erstellen
2. **Database Schema** ausführen:
   ```sql
   -- Führe den Inhalt von supabase/schema.sql aus
   ```
3. **Edge Function** deployen:
   ```bash
   npm install -g supabase
   supabase login
   supabase functions deploy stripe-webhook
   ```

### Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/) → Neues Projekt
2. APIs & Services → OAuth 2.0 Client IDs erstellen
3. Authorized redirect URIs hinzufügen:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

### Stripe

1. [Stripe Dashboard](https://dashboard.stripe.com/) → API Keys kopieren
2. Webhooks konfigurieren:
   - Endpoint: `https://your-supabase-project.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `checkout.session.expired`

## 📁 Projektstruktur

```
├── assets/               # CSS, Bilder, etc.
├── components/          # Vue Components
├── layouts/             # Layout Components  
├── middleware/          # Route Middleware
├── pages/              # Page Components (Auto-Routing)
├── plugins/            # Nuxt Plugins
├── server/             # Server API Routes
│   └── api/payments/   # Payment API Endpoints
├── stores/             # Pinia Stores
├── supabase/          # Supabase Konfiguration
│   ├── functions/     # Edge Functions
│   └── schema.sql     # Datenbankschema
├── types/             # TypeScript Type Definitionen
└── utils/             # Utility Functions
```

## 🚀 Scripts

```bash
npm run dev          # Development Server
npm run build        # Production Build
npm run generate     # Static Generation für GitHub Pages
npm run typecheck    # TypeScript Check
npm run deploy       # Deploy zu GitHub Pages
```

## 🔒 Security Features

- **Row Level Security (RLS)** - Datenbankabsicherung
- **JWT Token Validation** - Automatische Auth-Überprüfung
- **Webhook Signature Verification** - HMAC-Überprüfung
- **Input Validation** - Server-seitige Validierung
- **Audit Logging** - Vollständige Transaktionsverfolgung

## 💳 Payment Flow

1. **Login** → Google OAuth
2. **Shop** → Coin Package auswählen  
3. **Checkout** → Stripe Payment
4. **Webhook** → Automatische Coin Gutschrift
5. **Real-time Update** → Sofortige Balance Aktualisierung

## 🎯 Anpassungen für neue Apps

Diese App kann als Boilerplate für neue Anwendungen verwendet werden:

### 1. App-Name ändern:
- `package.json` → name, description
- `app.vue` → title
- `layouts/default.vue` → Branding

### 2. Coin Packages anpassen:
- `stores/shop.ts` → Packages definieren
- `server/api/payments/create-checkout.post.ts` → Preise

### 3. Design anpassen:
- `assets/css/main.css` → Theme Farben
- `components/` → UI Components
- `pages/` → Seiten-Layout

## 📚 Weitere Dokumentation

- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Supabase Docs](https://supabase.com/docs)  
- [Stripe Docs](https://stripe.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 🤝 Support

Bei Fragen oder Problemen:
1. Checke die Troubleshooting Sektion im Root README
2. Öffne ein Issue im Repository
3. Checke die Console für Error Messages

---

🎉 **Happy Coding!** Diese Boilerplate bietet alles für eine moderne, sichere Coin-Kauf-Anwendung.