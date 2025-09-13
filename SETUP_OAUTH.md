# Google OAuth Setup Guide

## 1. Google Cloud Console Setup

### Schritt 1: Google Cloud Project erstellen
1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt oder wähle ein bestehendes aus
3. Notiere dir die **Project ID**

### Schritt 2: OAuth 2.0 Credentials erstellen
1. Gehe zu **APIs & Services** → **Credentials**
2. Klicke auf **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
3. Falls noch nicht geschehen, konfiguriere den **OAuth consent screen**:
   - User Type: **External** (für öffentliche Apps)
   - App name: Dein App Name
   - User support email: Deine Emaila
   - Developer contact email: Deine Email
   - Scopes: `email`, `profile`, `openid`

### Schritt 3: OAuth Client konfigurieren
1. Application type: **Web application**
2. Name: `Coin Boilerplate App`
3. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://deine-domain.com
   ```
4. **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   https://deine-domain.com/auth/callback
   ```

### Schritt 4: Credentials speichern
- **Client ID** kopieren → Das ist dein `GOOGLE_CLIENT_ID`
- **Client Secret** kopieren → Das ist dein `GOOGLE_CLIENT_SECRET`

## 2. Supabase OAuth Setup

### In Supabase Dashboard:
1. Gehe zu **Authentication** → **Providers**
2. Aktiviere **Google**
3. Füge deine Google Credentials ein:
   - **Client ID**: Dein Google Client ID
   - **Client Secret**: Dein Google Client Secret
4. **Redirect URL** ist automatisch gesetzt:
   ```
   https://dein-projekt.supabase.co/auth/v1/callback
   ```

## 3. Environment Variables

### `.env` Datei in deinem Projekt:
```env
# Google OAuth
GOOGLE_CLIENT_ID=deine-google-client-id
GOOGLE_CLIENT_SECRET=deine-google-client-secret

# Supabase (wird für OAuth verwendet)
SUPABASE_URL=https://dein-projekt.supabase.co
SUPABASE_ANON_KEY=dein-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=dein-supabase-service-key

# App URLs
SITE_URL=http://localhost:3000
```

## 4. Nuxt Configuration Check

### `nuxt.config.ts` sollte enthalten:
```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/',
      callback: '/auth/callback',
      exclude: ['/']
    }
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      siteUrl: process.env.SITE_URL || 'http://localhost:3000'
    }
  }
})
```

## 5. Testing

### Login testen:
1. Starte deine App: `npm run dev:coin`
2. Klicke auf "Login with Google"
3. Du solltest zum Google OAuth Consent Screen weitergeleitet werden
4. Nach erfolgreicher Anmeldung zurück zu deiner App

### Troubleshooting:
- **"redirect_uri_mismatch"**: Überprüfe die Redirect URIs in Google Cloud Console
- **"invalid_client"**: Überprüfe Client ID und Secret
- **Supabase Fehler**: Überprüfe ob Google Provider in Supabase aktiviert ist

## 6. Produktions-Setup

### Für Production:
1. **Google Cloud Console**:
   - Füge deine Produktions-Domain zu den authorized origins hinzu
   - Füge Produktions-Callback URL hinzu

2. **Environment Variables**:
   ```env
   SITE_URL=https://deine-produktions-domain.com
   ```

3. **Domain Verification** (optional aber empfohlen):
   - Verifiziere deine Domain in Google Search Console
   - Verknüpfe sie mit deinem OAuth Projekt