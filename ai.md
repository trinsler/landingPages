Standards:
- Best Practice
- Secure
- Fast
- SEO optimiert

Tools:
- NUXT
- VUE
- VITE
- Shadcn
- Typescript
- Github Pages deployment pipeline von NUXT
- Supabase
- Oauth
- Pinia als Store

App Specification:
Einfache Boilerplate App als beispiel für mein tech stack bei der man sich einloggen kann und dann gegen Geld digitale coins kaufen kann. Das ganze im Monorepo so dass es einfach kopiert und upliziert werden kann für neue startup ideen.

Kompletter User Flow - OAuth bis Payment (Best Practice)
Phase 1: OAuth Login Flow
Initial User Journey
[Landing Page] User sieht "Login with Google" Button
    ↓
[Click] Redirect zu Google OAuth Consent Screen
    ↓ User akzeptiert Permissions
    ↓
[Google] Generiert Authorization Code
    ↓ Redirect zurück zu deiner App
    ↓
[Supabase Auth] Tauscht Code gegen JWT Token
    ↓ Erstellt User Record in Database
    ↓
[Frontend] JWT wird automatisch in Cookie/LocalStorage gespeichert
    ↓
[User State] Ist jetzt eingeloggt und authenticated
Was passiert technisch:

Google OAuth Scope: email, profile (Name, Email, Avatar)
Supabase Magic: Erstellt automatisch User-Eintrag mit Google-Daten
JWT Token: Enthält User ID, Email, Role, Expiry
Session Management: Automatic refresh von JWT bei Expiry
Database: users Tabelle wird mit Google Profile Data befüllt


👤 Phase 2: User Profile & State Management
Nach erfolgreichem Login:
[Database] User Record existiert mit:
    - id (UUID)
    - email (von Google)
    - full_name (von Google)
    - avatar_url (Google Profile Picture)
    - coins (initial: 0)
    - created_at
    - last_sign_in
    ↓
[Frontend State] Reactive User Object verfügbar:
    - user.value.id
    - user.value.email
    - user.value.coins
    - user.value.avatar_url
    ↓
[UI Updates] Navigation zeigt:
    - "Welcome, Max!" statt "Login"
    - Avatar Image
    - Current Coin Balance
    - Access zu Protected Routes
Persistent State:

Refresh-Resistant: JWT bleibt nach Page Reload erhalten
Multi-Tab Sync: Session wird zwischen Browser Tabs synchronisiert
Auto-Logout: Bei JWT Expiry automatischer Re-Login Flow
Offline-Ready: Cached User Data verfügbar ohne Internet


🛍️ Phase 3: Shopping & Product Selection
User browsing Products:
[Shop Page] User sieht Coin Packages:
    - 100 Coins - €0.99
    - 1000 Coins - €4.99  ⭐ Most Popular
    ↓
[Package Selection] User klickt "Buy 1000 Coins"
    ↓
[Payment Method Screen] User wählt:
    - 💳 Credit Card (Stripe)
    - 🟦 PayPal
    - 🍎 Apple Pay (via Stripe)
    - 📱 Google Pay (via Stripe)
    ↓
[Pre-Payment Validation]
    - User ist eingeloggt? ✅
    - Package existiert? ✅
    - User hat aktive Session? ✅
Product Metadata wird vorbereitet:

Package ID: coin_pack_1000
User Context: User ID aus JWT Token
Transaction Context: Eindeutige Transaction ID generiert
Security Context: CSRF Token, Session Validation


💳 Phase 4: Payment Processing Flow
Checkout Session Creation:
[Frontend] POST /api/create-checkout mit:
    - packageId: "coin_pack_1000" 
    - provider: "stripe"
    - user_id: aus JWT (server-side extrahiert)
    ↓
[Backend API Route] Validiert:
    - JWT Token Authenticity ✅
    - User Permissions ✅
    - Package Availability ✅
    - Rate Limiting ✅
    ↓
[Payment Provider API] Erstellt Checkout Session mit Metadata:
    - customer_id: User ID
    - product_info: "1000 Coins"
    - success_url: "/payment/success"
    - cancel_url: "/shop"
    - metadata: { user_id, coins: 1000, package_id }
    ↓
[Redirect] User zu Stripe/PayPal Checkout Page
Payment Provider Handling:
[Stripe/PayPal Checkout] User gibt Payment Details ein:
    - Kreditkarten Info ODER PayPal Login
    - Billing Address
    - Confirmation
    ↓
[Payment Processing] Provider processed Payment:
    - Card Authorization ✅
    - Fraud Detection ✅
    - 3D Secure (falls nötig) ✅
    - Money Transfer ✅
    ↓
[Success/Failure] Provider bestimmt Outcome

🔄 Phase 5: Webhook Verification & Processing
Bei successful Payment:
[Payment Provider] Sendet Webhook zu deiner Edge Function:
    - POST https://xyz.supabase.co/functions/v1/stripe-webhook
    - Header: stripe-signature (HMAC Verification)
    - Body: Event Data mit Metadata
    ↓
[Edge Function] Webhook Verification:
    - Signature Verification mit Secret ✅
    - Event Type Validation ✅  
    - Duplicate Event Protection ✅
    - Metadata Extraction ✅
    ↓
[Database Transaction] Atomic Operations:
    1. UPDATE users SET coins = coins + 1000 WHERE id = user_id
    2. INSERT INTO transactions (user_id, type, amount, status)
    3. INSERT INTO audit_log (action, user_id, details)
    ↓
[Success Response] Edge Function returns 200 OK
Bei failed Payment:
[Payment Provider] Webhook: payment_failed
    ↓
[Edge Function] Logs Failure:
    - INSERT INTO failed_transactions
    - Notification an Admin System
    - User wird NICHT charged, Coins werden NICHT hinzugefügt

⚡ Phase 6: Real-time User Experience
Automatic Frontend Updates:
[Supabase Realtime] Database Change Detection:
    - users.coins wurde updated für user_id
    ↓
[WebSocket Broadcast] An alle Client Connections:
    - User ID xyz hat neue Coin Balance
    ↓
[Frontend Subscription] Empfängt Update:
    - Reactive State Update: coins.value = new_balance
    - UI Animation: "+1000 Coins" mit Konfetti Effect
    - Toast Notification: "Payment successful! 🎉"
    - Navigation Update: Neuer Coin Counter in Header
    ↓
[User Experience] Nahtlos:
    - Kein Page Reload nötig
    - Instant Feedback
    - Coins sind sofort verfügbar für In-App Purchases

🛡️ Security & Error Handling Best Practices
Multi-Layer Security:
[Authentication Layer]
    - JWT Token Validation bei jedem Request
    - Google OAuth Identity Verification
    - Automatic Token Refresh
    ↓
[Authorization Layer] 
    - Row Level Security (RLS) in Database
    - User kann nur eigene Daten sehen/ändern
    - Payment Operations nur via verified Webhooks
    ↓
[Payment Security]
    - Webhook Signature Verification (HMAC)
    - Idempotency Keys gegen Duplicate Payments
    - Atomic Database Transactions
    ↓
[Input Validation]
    - Package ID Whitelist Validation
    - Amount Bounds Checking
    - Rate Limiting per User
Error Scenarios & Recovery:
[Scenario 1: Payment Success, Webhook Fails]
    - Payment Provider hat Geld erhalten
    - Aber Coins wurden nicht hinzugefügt
    - Recovery: Manual Webhook Replay oder Batch Job
    
[Scenario 2: Duplicate Webhooks]
    - Same Payment ID bereits processed
    - Prevention: Unique constraint auf transaction_id
    - Result: Silently ignored, keine doppelten Coins
    
[Scenario 3: User closes Browser during Payment]
    - Payment läuft weiter bei Provider
    - Bei nächstem Login: Coins sind automatisch da
    - Realtime Update triggered bei nächster Session
    
[Scenario 4: Network Issues]
    - Frontend Retry Logic für API Calls
    - Exponential Backoff bei Failed Requests
    - User bekommt Loading States & Error Messages

📊 Monitoring & Analytics
Business Intelligence Flow:
[Every Transaction] Wird geloggt mit:
    - User Demographics (aus Google Profile)
    - Package Performance (welche Packages verkaufen sich)
    - Payment Method Preference (Stripe vs PayPal)
    - Geographic Data (falls IP Geolocation enabled)
    - Conversion Funnel (Landing → Login → Shop → Payment)
    ↓
[Analytics Dashboard] Für dich als Founder:
    - Revenue Tracking
    - User Retention Metrics  
    - Payment Method Success Rates
    - Geographic Revenue Distribution
Technical Monitoring:
[Supabase Dashboard] Real-time Monitoring:
    - Database Performance
    - Edge Function Execution Times
    - Authentication Success Rates
    - API Rate Limits
    ↓
[External Monitoring] Optional:
    - Stripe/PayPal Dashboards für Payment Analytics
    - Google Analytics für User Journey
    - Sentry für Error Tracking
