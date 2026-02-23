## Supabase Auth Email Templates

These HTML templates provide a consistent look for Supabase Auth messages (signup confirmation, password recovery, magic link, and email-change verification). Copy the markup you need into the corresponding **Supabase Dashboard → Authentication → Email Templates** form.

All links use `https://quezonbukidnon.com` as the base URL and Supabase template variables (`{{ .TokenHash }}`, `{{ .RedirectTo }}`, etc.). Update the copy or styling as needed.

### Available templates

- `signup-confirmation.html`
- `password-recovery.html`
- `magic-link.html`
- `email-change.html`

### How to use

1. Open the HTML file you need and copy its contents.
2. In Supabase Dashboard, go to **Authentication → Templates**.
3. Select the template (e.g., *Confirm Signup*) and paste the HTML.
4. Save changes and send yourself a test email to confirm the rendering looks correct.

> **Note:** If you deploy to a different domain or subpath, update the base URL (`https://quezonbukidnon.com`) and redirect query parameters accordingly.
