-- DROP ALL TABLES AND RESOURCES
-- WARNING: This will delete ALL data and database objects!
-- Use with caution - make sure to backup data first if needed

-- 1. Drop all triggers first (to avoid dependency issues)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users CASCADE;
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users CASCADE;
DROP TRIGGER IF EXISTS update_transactions_updated_at ON public.transactions CASCADE;
DROP TRIGGER IF EXISTS update_payment_sessions_updated_at ON public.payment_sessions CASCADE;
DROP TRIGGER IF EXISTS update_email_subscriptions_updated_at ON public.email_subscriptions CASCADE;

-- 2. Drop all tables (CASCADE removes dependent objects)
DROP TABLE IF EXISTS public.email_subscriptions CASCADE;
DROP TABLE IF EXISTS public.audit_logs CASCADE;
DROP TABLE IF EXISTS public.payment_sessions CASCADE;
DROP TABLE IF EXISTS public.transactions CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 3. Drop all custom functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_user_login() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS public.increment_user_coins(UUID, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS public.update_newsletter_subscription(TEXT, BOOLEAN) CASCADE;

-- 4. Drop all indexes (most should be auto-dropped with tables, but just in case)
DROP INDEX IF EXISTS idx_transactions_user_id CASCADE;
DROP INDEX IF EXISTS idx_transactions_status CASCADE;
DROP INDEX IF EXISTS idx_payment_sessions_user_id CASCADE;
DROP INDEX IF EXISTS idx_payment_sessions_provider_session_id CASCADE;
DROP INDEX IF EXISTS idx_audit_logs_user_id CASCADE;
DROP INDEX IF EXISTS idx_audit_logs_created_at CASCADE;
DROP INDEX IF EXISTS idx_email_subscriptions_email CASCADE;
DROP INDEX IF EXISTS idx_email_subscriptions_status CASCADE;
DROP INDEX IF EXISTS idx_email_subscriptions_tags CASCADE;
DROP INDEX IF EXISTS idx_email_subscriptions_created_at CASCADE;
DROP INDEX IF EXISTS idx_email_subscriptions_confirmation_token CASCADE;

-- 5. Drop any policies (RLS policies are auto-dropped with tables, but explicit cleanup)
-- Note: Policies are automatically dropped when tables are dropped, but listing for completeness

-- 6. Clean up any remaining objects
-- Drop any views if they exist
-- DROP VIEW IF EXISTS view_name CASCADE;

-- 7. Reset sequences if needed (auto-handled by UUID, but for completeness)
-- No sequences to reset since we use UUIDs

-- Success message
SELECT 'All tables, functions, triggers, and related objects have been dropped successfully!' as status;