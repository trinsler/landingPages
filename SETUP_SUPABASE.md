# Supabase Setup Guide

## 1. Supabase Project erstellen

### Schritt 1: Account und Projekt
1. Gehe zu [supabase.com](https://supabase.com)
2. Erstelle einen Account oder logge dich ein
3. Klicke auf **New Project**
4. Wähle eine Organisation (oder erstelle eine neue)
5. Project Name: `coin-boilerplate-app`
6. Database Password: Starkes Passwort generieren und speichern
7. Region: Europe (Frankfurt) für deutsche Nutzer
8. Warte bis das Projekt erstellt ist (~2 Minuten)

### Schritt 2: Project Settings
1. Gehe zu **Settings** → **General**
2. Kopiere die **Reference ID** (das ist deine Project ID)
3. Gehe zu **Settings** → **API**
4. Kopiere:
   - **Project URL** → Das ist dein `SUPABASE_URL`
   - **anon public** key → Das ist dein `SUPABASE_ANON_KEY`
   - **service_role** key → Das ist dein `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Geheim halten!

## 2. Database Schema erstellen

### SQL Editor verwenden:
1. Gehe zu **SQL Editor**
2. Füge dieses SQL ein und führe es aus:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Users profile table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  coins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_sign_in TIMESTAMP WITH TIME ZONE
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'spend', 'bonus', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  coins INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  provider TEXT,
  provider_payment_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment sessions table
CREATE TABLE public.payment_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  package_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_session_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  coins INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'processing', 'completed', 'failed', 'cancelled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Audit logs table
CREATE TABLE public.audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email subscriptions table
CREATE TABLE public.email_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  source TEXT DEFAULT 'website',
  metadata JSONB DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- RLS Policies
CREATE POLICY "Users can read own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can read own payment sessions" ON public.payment_sessions
  FOR SELECT USING (auth.uid() = user_id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Functions
CREATE OR REPLACE FUNCTION increment_user_coins(user_id_param UUID, coins_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE public.users 
  SET coins = coins + coins_to_add, updated_at = NOW()
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url, last_sign_in)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Update last_sign_in on login
CREATE OR REPLACE FUNCTION update_last_sign_in()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at THEN
    UPDATE public.users 
    SET last_sign_in = NEW.last_sign_in_at
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER update_last_sign_in_trigger
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION update_last_sign_in();
```

## 3. Authentication Setup

### Email Templates (optional):
1. Gehe zu **Authentication** → **Email Templates**
2. Passe die Templates an (Confirm signup, Magic Link, etc.)
3. Verwende dein Branding und Design

### URL Configuration:
1. Gehe zu **Authentication** → **URL Configuration**
2. **Site URL**: `http://localhost:3000` (Development)
3. **Redirect URLs**: 
   ```
   http://localhost:3000/**
   https://deine-domain.com/**
   ```

## 4. Environment Variables Setup

### `.env` Datei:
```env
# Supabase
SUPABASE_URL=https://dein-projekt-id.supabase.co
SUPABASE_ANON_KEY=dein-anon-key
SUPABASE_SERVICE_ROLE_KEY=dein-service-role-key

# Stripe (für Payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
SITE_URL=http://localhost:3000
```

## 5. Edge Functions (für Webhooks)

### Supabase CLI installieren:
```bash
npm install -g supabase
```

### Edge Function deployen:
```bash
# Login
supabase login

# Link zu deinem Projekt
supabase link --project-ref dein-projekt-id

# Deploy Edge Function
supabase functions deploy stripe-webhook
```

### Environment Variables für Edge Function setzen:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set SUPABASE_URL=https://dein-projekt.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=dein-service-key
```

## 6. Testing

### Database Verbindung testen:
1. Starte deine App: `npm run dev:coin`
2. Versuche dich anzumelden
3. Überprüfe in Supabase → **Table Editor** ob ein User erstellt wurde

### Realtime testen (optional):
1. Gehe zu **Database** → **Replication**
2. Aktiviere Realtime für relevante Tabellen

## 7. Produktions-Setup

### Produktions-Umgebung:
1. **URL Configuration** in Supabase:
   - Site URL: `https://deine-produktions-domain.com`
   - Redirect URLs: `https://deine-produktions-domain.com/**`

2. **Environment Variables** für Production:
   ```env
   SUPABASE_URL=https://dein-projekt.supabase.co
   SUPABASE_ANON_KEY=dein-anon-key
   SITE_URL=https://deine-produktions-domain.com
   ```

### Security Checklist:
- ✅ Row Level Security (RLS) ist aktiviert
- ✅ Service Role Key ist nur server-side verwendet
- ✅ CORS ist korrekt konfiguriert
- ✅ Rate Limiting ist aktiviert (Supabase Pro)