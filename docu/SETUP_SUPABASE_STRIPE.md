# Supabase Setup Guide

### Step 1: Create Supabase Project

### Step 2: Project Settings
1. Go to **Settings** → **General**
2. Copy the **Reference ID** (this is your Project ID)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public** key → This is your `SUPABASE_ANON_KEY`

## 2. Create Database Schema

### Using SQL Editor:
Go to **Supabase SQL Editor**

```sql
-- Copy and paste: schema.sql
-- Then RUN

-- Copy and paste: functions/_shared/database.sql
-- Then RUN
```

Test login on http://localhost:3000/ and check network console for errors

## 3. Functions with IAC:

```bash
supabase login

supabase projects list

supabase link --project-ref "replace with Project ID"
supabase link --project-ref amilnmlymgtkefeizohj

supabase functions deploy stripe-webhook --no-verify-jwt

supabase functions deploy create_checkout
supabase functions deploy email-subscribe
supabase functions deploy email-confirm
supabase functions deploy email-unsubscribe
```

## 4. Stripe Setup:

```bash
stripe login

stripe listen --forward-to https://"replace with Project ID".supabase.co/functions/v1/stripe-webhook
stripe listen --forward-to https://amilnmlymgtkefeizohj.supabase.co/functions/v1/stripe-webhook
```

Copy whsec secret:
```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_XXX
```

Secret Key from Stripe UI:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_XXX
```

## 5. Test Payment

Use test card:
- **Card:** 4242 4242 4242 4242
- **Date:** 12/34
- **CVV:** 123
