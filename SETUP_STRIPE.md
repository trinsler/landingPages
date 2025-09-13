# Stripe Payment Setup Guide

## 1. Stripe Account erstellen

### Schritt 1: Account Setup
1. Gehe zu [stripe.com](https://stripe.com)
2. Klicke auf **Sign up** und erstelle einen Account
3. Verifiziere deine E-Mail-Adresse
4. Fülle deine Geschäftsinformationen aus (kann später vervollständigt werden)

### Schritt 2: Dashboard erkunden
1. Du startest im **Test Mode** (erkennbar am Toggle oben links)
2. Test Mode ist perfekt für Development
3. Live Mode erst aktivieren wenn alles funktioniert

## 2. API Keys erhalten

### Test Keys (für Development):
1. Gehe zu **Developers** → **API keys**
2. Kopiere die **Test Keys**:
   - **Publishable key** (beginnt mit `pk_test_`) → Das ist dein `STRIPE_PUBLIC_KEY`
   - **Secret key** (beginnt mit `sk_test_`) → Das ist dein `STRIPE_SECRET_KEY` ⚠️ Geheim halten!

### Webhook Secret:
1. Gehe zu **Developers** → **Webhooks**
2. Klicke **+ Add endpoint**
3. **Endpoint URL**: 
   ```
   https://dein-projekt.supabase.co/functions/v1/stripe-webhook
   ```
4. **Events to send**:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Nach dem Erstellen: Kopiere den **Signing secret** → Das ist dein `STRIPE_WEBHOOK_SECRET`

## 3. Stripe Dashboard Konfiguration

### Payment Methods aktivieren:
1. Gehe zu **Settings** → **Payment methods**
2. Aktiviere gewünschte Zahlungsmethoden:
   - ✅ Cards (Visa, Mastercard, etc.)
   - ✅ Google Pay
   - ✅ Apple Pay
   - ✅ SEPA Direct Debit (für Europa)
   - ✅ PayPal (falls gewünscht)

### Währung einstellen:
1. Gehe zu **Settings** → **Account details**
2. Stelle **Default currency** auf **EUR** (oder deine gewünschte Währung)

### Steuereinstellungen (optional):
1. Gehe zu **Products** → **Tax**
2. Konfiguriere Steuerregeln falls nötig

## 4. Environment Variables

### `.env` Datei aktualisieren:
```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_dein-secret-key
STRIPE_PUBLIC_KEY=pk_test_dein-public-key
STRIPE_WEBHOOK_SECRET=whsec_dein-webhook-secret

# Existing keys...
SUPABASE_URL=https://dein-projekt.supabase.co
SUPABASE_ANON_KEY=dein-anon-key
SUPABASE_SERVICE_ROLE_KEY=dein-service-role-key
GOOGLE_CLIENT_ID=dein-google-client-id
SITE_URL=http://localhost:3000
```

## 5. Testing Setup

### Test Credit Cards verwenden:
```
Successful Payment:
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any valid ZIP

Declined Payment:
Card: 4000 0000 0000 0002
```

### Webhook Testing:
1. **Stripe CLI installieren** (empfohlen für lokales Testing):
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Oder download von https://stripe.com/docs/stripe-cli
   ```

2. **Local Webhook Forwarding**:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. **Test Events senden**:
   ```bash
   stripe trigger checkout.session.completed
   ```

## 6. Produktions-Setup

### Live Mode aktivieren:
1. **Business Information vervollständigen**:
   - Gehe zu **Settings** → **Business settings**
   - Fülle alle erforderlichen Informationen aus
   - Lade erforderliche Dokumente hoch

2. **Live API Keys**:
   - Schalte auf **Live Mode** um (Toggle oben links)
   - Kopiere die **Live Keys** (`pk_live_...` und `sk_live_...`)

3. **Live Webhook Endpoint**:
   ```
   https://deine-produktions-domain.supabase.co/functions/v1/stripe-webhook
   ```

### Environment Variables für Production:
```env
STRIPE_SECRET_KEY=sk_live_dein-live-secret-key
STRIPE_PUBLIC_KEY=pk_live_dein-live-public-key
STRIPE_WEBHOOK_SECRET=whsec_dein-live-webhook-secret
```

## 7. Supabase Edge Function Secrets

### Secrets für die Edge Function setzen:
```bash
# Supabase CLI verwenden
supabase secrets set STRIPE_SECRET_KEY=sk_test_dein-key
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_dein-secret

# Für Production:
supabase secrets set STRIPE_SECRET_KEY=sk_live_dein-key --project-ref dein-projekt-id
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_dein-live-secret --project-ref dein-projekt-id
```

## 8. Testing der Integration

### End-to-End Test:
1. Starte deine App: `npm run dev:coin`
2. Logge dich ein (Google OAuth)
3. Gehe zur Shop-Seite
4. Wähle ein Coin-Paket
5. Klicke "Buy" → Du wirst zu Stripe Checkout weitergeleitet
6. Verwende Test-Kreditkarte: `4242 4242 4242 4242`
7. Schließe Payment ab
8. Du solltest zurück zur Success-Seite weitergeleitet werden
9. Überprüfe in Supabase ob:
   - Transaction eingetragen wurde
   - User Coins erhöht wurden

### Webhook Testing:
1. Überprüfe Stripe Dashboard → **Developers** → **Webhooks**
2. Sieh dir die Event History an
3. Bei Fehlern: Überprüfe die Response Details

## 9. Monitoring & Analytics

### Stripe Dashboard Features nutzen:
1. **Payments**: Überblick über alle Transaktionen
2. **Customers**: Kundendaten und Zahlungshistorie
3. **Disputes**: Chargebacks und Disputes verwalten
4. **Reports**: Detaillierte Finanzberichte

### Wichtige Metriken:
- Successful payment rate
- Average transaction value
- Most popular payment methods
- Geographic distribution

## 10. Security Best Practices

### Checklist:
- ✅ Secret Keys niemals im Frontend verwenden
- ✅ Webhook Signature Verification implementiert
- ✅ Test Mode für Development verwenden
- ✅ HTTPS für alle Endpoints (Webhooks)
- ✅ Idempotency Keys für kritische Operations
- ✅ Rate Limiting implementieren
- ✅ Error Logging aktivieren

### Troubleshooting:
- **"No such checkout session"**: Session ID ist falsch oder abgelaufen
- **"Invalid API key"**: Falsche Environment Variables oder Test/Live Mode Mismatch
- **Webhook Fehler**: Signature Verification oder URL-Konfiguration prüfen