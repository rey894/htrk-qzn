# DNS Setup Guide for staging.quezonbukidnon.com

## Issue: DNS_PROBE_FINISHED_NXDOMAIN

This error means the subdomain `staging.quezonbukidnon.com` doesn't exist in DNS yet. You need to create it in cPanel first.

## Solution 1: Create Subdomain in cPanel (Recommended)

### Step-by-Step Instructions:

1. **Log in to cPanel**
   - Go to your hosting provider's cPanel login page
   - Enter your credentials

2. **Navigate to Subdomains**
   - In cPanel, search for "Subdomains" or go to:
   - **Domains** → **Subdomains**

3. **Create the Subdomain**
   - **Subdomain:** Enter `staging`
   - **Domain:** Select `quezonbukidnon.com` (should auto-populate)
   - **Document Root:** 
     - Default: `public_html/staging` (recommended)
     - Or: `public_html/staging.quezonbukidnon.com`
   - Click **Create**

4. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually propagates within 15-30 minutes
   - Check status at: https://dnschecker.org/#A/staging.quezonbukidnon.com

5. **Verify DNS is Active**
   ```powershell
   nslookup staging.quezonbukidnon.com
   ```
   - Should return an IP address (not "Non-existent domain")

6. **Install SSL Certificate**
   - In cPanel, go to **SSL/TLS Status**
   - Find `staging.quezonbukidnon.com`
   - Click **Run AutoSSL** or install Let's Encrypt certificate

7. **Upload Your Files**
   - Navigate to the Document Root you specified in step 3
   - Upload all contents from `dist/` folder
   - Ensure `.htaccess` is in the root of that directory

## Solution 2: Deploy to Subdirectory (No DNS Needed)

If you can't create a subdomain yet, deploy to a subdirectory:

1. **Update Build Config**
   ```bash
   npm run build:staging
   ```
   This builds with `/staging/` base path

2. **Upload Files**
   - Upload all contents from `dist-staging/` to `public_html/staging/`
   - Access at: `https://quezonbukidnon.com/staging/`

3. **Update .htaccess for Subdirectory**
   - The `.htaccess` in subdirectory should have:
   ```apache
   RewriteBase /staging/
   ```

## Solution 3: Deploy to Main Domain (Temporary)

For immediate testing:

1. **Build for Root**
   ```bash
   npm run build
   ```

2. **Upload to Root**
   - Upload all contents from `dist/` to `public_html/`
   - Access at: `https://quezonbukidnon.com`

**Note:** This will overwrite the main site. Only do this if you have a backup or this is acceptable.

## Verification Steps

After DNS is set up and files are uploaded:

1. **Check DNS Resolution**
   ```powershell
   nslookup staging.quezonbukidnon.com
   ping staging.quezonbukidnon.com
   ```

2. **Test Website**
   - Visit: `https://staging.quezonbukidnon.com`
   - Should load the homepage
   - Check browser console for errors

3. **Test React Router**
   - Navigate to different pages
   - Refresh the page (should not show 404)
   - Check that `.htaccess` is working

4. **Test on Mobile**
   - Verify logo doesn't warp
   - Check responsive design
   - Test touch interactions

## Common Issues

### Issue: Subdomain created but still not resolving
**Solutions:**
- Wait longer for DNS propagation (up to 48 hours)
- Clear DNS cache: `ipconfig /flushdns` (Windows)
- Try accessing from different network/device
- Check if firewall is blocking

### Issue: 403 Forbidden after upload
**Solutions:**
- Check file permissions (644 for files, 755 for folders)
- Verify `.htaccess` is uploaded correctly
- Check if mod_rewrite is enabled in Apache

### Issue: SSL Certificate Error
**Solutions:**
- Install SSL certificate in cPanel
- Wait for certificate to be issued (can take a few minutes)
- Use AutoSSL feature in cPanel

### Issue: Subdomain shows "Account Suspended" or cPanel default page
**Solutions:**
- Verify files are uploaded to correct Document Root
- Check if subdomain Document Root path is correct
- Ensure files are in the right directory

## Next Steps After DNS Setup

Once `staging.quezonbukidnon.com` is accessible:

1. ✅ Upload all files from `dist/` to the Document Root
2. ✅ Verify `.htaccess` is in place
3. ✅ Test all routes work
4. ✅ Verify logo displays correctly on mobile
5. ✅ Test Supabase connections
6. ✅ Check admin dashboard access

## Contact Your Hosting Provider

If you're unable to create the subdomain:
- Contact your hosting provider's support
- Ask them to create the subdomain: `staging.quezonbukidnon.com`
- Provide the Document Root path you want: `public_html/staging`
- Ask them to install SSL certificate for the subdomain

---

**Current Status:** Waiting for DNS setup
**Action Required:** Create subdomain in cPanel or use subdirectory deployment
