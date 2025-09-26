# Coin Boilerplate App - Digital Coin Platform

A modern Nuxt 3 application for purchasing digital coins with OAuth authentication and Stripe payments.

## 🏗️ Architecture

```
apps/coin-boilerplate-app/
├── components/
│   ├── layout/          # Layout components
│   ├── forms/          # Form components
│   └── ui/             # UI components (ErrorBoundary, etc.)
├── pages/              # Route-based pages
├── stores/             # Pinia stores
├── middleware/         # Route middleware
├── plugins/            # Nuxt plugins
├── types/              # TypeScript types
├── utils/              # Helper functions
├── supabase/           # Database & functions
└── assets/css/         # Theme imports
```

## 🎨 Theme System

This app uses the **Minimal** theme from the shared theme system:

- **Theme**: `themes/minimal.css` (clean, professional, light)
- **Colors**: Light backgrounds with subtle shadows
- **Typography**: Inter font family
- **Style**: Clean, modern, business-focused

### Switch Themes
```bash
# Apply different themes to test
pnpm theme:switch coin-boilerplate-app cyber
pnpm theme:switch coin-boilerplate-app glass
pnpm theme:minimal  # Quick shortcut back to minimal
```

## 🧩 Components & Features

### Core Features
- **OAuth Authentication**: Google OAuth via Supabase
- **Digital Coins**: Purchase system with packages
- **Stripe Integration**: Secure payments
- **User Dashboard**: Account management
- **Error Handling**: Global error boundaries
- **Toast Notifications**: User feedback system

### Component Structure
- `ErrorBoundary.vue` - Global error handling
- Theme-aware styling with shadcn/ui variables

## 🔧 Development

```bash
# Start development server
pnpm dev:coin

# Build for production
pnpm build:coin

# Type checking
pnpm typecheck:coin

# Generate static site
pnpm generate:coin
```

## 📱 Pages & Routes

- `/` - Homepage with authentication
- `/dashboard` - User dashboard (authenticated)
- `/shop` - Coin packages shop
- `/auth/callback` - OAuth callback handler
- `/payment/success` - Payment success page
- `/payment/cancelled` - Payment cancelled page

## 🗄️ Database & Backend

### Supabase Setup
- **Authentication**: OAuth providers
- **Database**: User data, transactions, coin balances
- **Functions**: Stripe webhook handling, checkout creation
- **Security**: RLS policies for data protection

### Database Schema
- `users` - User profiles
- `transactions` - Payment records
- `coin_balances` - User coin holdings
- `coin_packages` - Available packages

## 💳 Payment Flow

1. **User Selection**: Choose coin package
2. **Stripe Checkout**: Redirect to Stripe
3. **Payment Processing**: Handle webhook
4. **Coin Delivery**: Update user balance
5. **Confirmation**: Success/failure handling

## 🛡️ Security

- **OAuth**: Secure Google authentication
- **RLS**: Row-level security on all tables
- **Webhook Validation**: Stripe signature verification
- **Environment Variables**: Secure configuration
- **CORS**: Proper cross-origin handling

## 🤖 AI Development Notes

This app follows modern web app patterns:

- **State Management**: Pinia stores for auth and shop
- **Error Handling**: Comprehensive error boundaries
- **Type Safety**: Full TypeScript coverage
- **API Integration**: Supabase client and Stripe SDK
- **Middleware**: Authentication guards

### AI-Friendly Structure
- Clear separation of concerns
- Consistent error handling patterns
- Type-safe API calls
- Standard Nuxt 3 patterns
- Well-documented utilities

### Quick AI Tasks
1. **Add new coin package**: Update database + shop store
2. **Add new payment method**: Extend Stripe integration
3. **Add new dashboard feature**: Create component + route
4. **Add new middleware**: Create in `middleware/`
5. **Add new API function**: Create in `supabase/functions/`

## 🌐 Environment Variables

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id

# App
NUXT_APP_ENV=local|develop|production
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run specific app tests
vitest apps/coin-boilerplate-app/tests/
```

## 📦 Key Dependencies

- **Nuxt 3**: Full-stack framework
- **Supabase**: Backend-as-a-Service
- **Stripe**: Payment processing
- **Pinia**: State management
