# Google OAuth Setup Guide

## 1. Google Cloud Console Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### Step 2: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**

### Step 3: Configure OAuth Client
1. Application type: **Web application**
2. Name: `Coin Boilerplate App`

### Step 4: Save Credentials
- Copy **Client ID** → This is your `GOOGLE_CLIENT_ID`

### Step 5: Set OAuth Client Redirect URLs

1. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   https://your-domain.com
   ```

2. **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   https://your-project.supabase.co/auth/v1/callback
   ```
   
## 2. Supabase OAuth Setup

### In Supabase Dashboard:
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google credentials:
   - **Client ID**: Your Google Client ID
   - **Client Secret**: Your Google Client Secret
4. **Redirect URL** is automatically set:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```

### Authentication/URL Configuration Site URL (Default Redirect):
```
https://coin.trinsler.com
```

### Redirect URLs (Allowed URLs):
```
http://localhost:3000/auth/callback
https://coin.trinsler.com/auth/callback
https://coin.trinsler.com/payment/success
https://coin.trinsler.com/payment/cancelled
```

### Wildcard Alternative:
```
https://*.trinsler.com/auth/callback
https://*.trinsler.com/payment/*
