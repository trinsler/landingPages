Prerequisits: 
- Make sure Supabase URL and Anon Key is set in .env
- integration with https://resend.com/settings/integrations works

Mail Formular:
1.1 Paste in functions and sql Table
1.2 Set RESEND_API_KEY in Edge Functions Secrets

Resend integration for login:
2. confirm cloudflare dns
3. edit custom mail template in supabase: https://supabase.com/dashboard/project/amilnmlymgtkefeizohj/auth/templates
4. set smtp settings: https://supabase.com/dashboard/project/amilnmlymgtkefeizohj/auth/smtp

Sender email; noreply@coin.trinsler.com
Host: smtp.resend.com
Port number: 587
Minumum interval: 15
Username: resend
Passwort: same API Key which is used for the mail formular

5. edge functions: safe api key for the formular