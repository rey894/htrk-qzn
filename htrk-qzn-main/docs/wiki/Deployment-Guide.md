# Deployment Guide

This guide covers deploying the Quezon Municipal Website to cPanel hosting.

## Prerequisites

- Access to cPanel for your domain
- Node.js 18+ installed (for building locally)
- FTP/cPanel File Manager access
- `.env` file with Supabase credentials configured

## Build Process

### 1. Prepare Environment Variables

Create or verify `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**Important**: Environment variables are embedded at build time. Set them before running the build command.

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages listed in `package.json`.

### 3. Build for Production

```bash
npm run build
```

This command:
- Compiles TypeScript to JavaScript
- Bundles and minifies CSS and JavaScript
- Optimizes images and assets
- Creates the `dist/` folder with production-ready files

### 4. Verify Build Output

After building, verify these files exist in `dist/`:

- `dist/index.html` - Main entry point
- `dist/.htaccess` - Apache configuration for SPA routing
- `dist/assets/` - Compiled CSS, JS, and images
- `dist/robots.txt` - Search engine configuration
- `dist/sitemap.xml` - Site map for SEO

## Uploading to cPanel

### Method 1: Using cPanel File Manager

1. **Log in to cPanel**
   - Navigate to your cPanel dashboard
   - Look for "File Manager" in the Files section

2. **Navigate to public_html**
   - Click "File Manager"
   - Go to `public_html/` directory (or your domain's root directory)

3. **Upload Files**
   - Select all files from the `dist/` folder on your computer
   - Click "Upload" in File Manager
   - Wait for upload to complete

4. **Verify .htaccess**
   - Ensure `.htaccess` file was uploaded (may be hidden)
   - Enable "Show Hidden Files" in File Manager settings
   - Verify `.htaccess` is in the same directory as `index.html`

5. **Set File Permissions**
   - Files: `644`
   - Folders: `755`
   - `.htaccess`: `644`

### Method 2: Using FTP

1. **Connect via FTP Client**
   - Use FileZilla, WinSCP, or similar FTP client
   - Connect using cPanel FTP credentials

2. **Upload Files**
   - Navigate to `public_html/` directory on server
   - Upload all contents of `dist/` folder
   - Maintain folder structure

3. **Verify .htaccess**
   - Ensure `.htaccess` is uploaded (enable "Show Hidden Files")
   - File should be in root directory with `index.html`

## Post-Deployment Verification

### 1. Test the Website

- Visit your domain (e.g., `https://quezonbukidnon.com`)
- Verify all pages load correctly
- Check navigation menus
- Test forms and interactive elements

### 2. Verify .htaccess Configuration

The `.htaccess` file should:
- Handle React Router (SPA routing)
- Enable GZIP compression
- Set cache headers for static assets
- Include security headers

If you see 404 errors on page refreshes, verify `.htaccess` is present and configured correctly.

### 3. Check Browser Console

- Open browser Developer Tools (F12)
- Check Console tab for errors
- Verify no failed resource loads
- Check Network tab for successful asset loading

### 4. Verify Environment Variables

- Test features that require Supabase connection
- Verify authentication works
- Check admin dashboard access
- Test content management features

## Troubleshooting

### White Screen on Load

**Possible Causes:**
- Missing or incorrect `.htaccess` file
- JavaScript errors in console
- Missing assets in `dist/assets/` folder

**Solutions:**
1. Verify `.htaccess` exists in root directory
2. Check browser console for JavaScript errors
3. Rebuild and re-upload all files from `dist/`

### 404 Errors on Page Refresh

**Cause**: Missing or incorrect `.htaccess` configuration for SPA routing

**Solution**: Verify `.htaccess` contains React Router rewrite rules:
```apache
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Assets Not Loading

**Possible Causes:**
- Incorrect file paths in build
- Missing files in `dist/assets/`
- Permissions issues

**Solutions:**
1. Verify all assets were uploaded
2. Check file permissions (644 for files, 755 for folders)
3. Rebuild and re-upload if needed

### Supabase Connection Errors

**Cause**: Environment variables not set or incorrect

**Solution**:
1. Verify `.env` file has correct Supabase credentials
2. Rebuild after updating `.env`
3. Check Supabase project is active and accessible

## Updating the Website

### Standard Update Process

1. **Make Changes Locally**
   - Edit source files in `src/`
   - Test changes locally with `npm run dev`

2. **Build Production Version**
   ```bash
   npm run build
   ```

3. **Upload New Files**
   - Upload only changed files (or full `dist/` folder)
   - Overwrite existing files on server

4. **Clear Browser Cache**
   - Hard refresh (Ctrl+F5 / Cmd+Shift+R)
   - Or clear cache in browser settings

### Quick Update (Single File Changes)

For minor content changes:
1. Make changes in admin dashboard (for editable content)
2. Or edit source files and rebuild
3. Upload only changed files to save time

## Backup Before Deployment

**Always backup before deploying!**

1. **Backup Database**: Export Supabase data if making schema changes
2. **Backup Files**: Download current `dist/` folder from server
3. **Version Control**: Commit changes to Git before deploying

## Rollback Procedure

If deployment causes issues:

1. **Restore Previous Files**
   - Upload backup `dist/` folder
   - Or use Git to revert to previous commit

2. **Clear Cache**
   - Clear browser cache
   - Clear CDN cache if using one

3. **Verify Functionality**
   - Test all critical features
   - Check for any remaining issues

## Related Pages

- [Build Process](Build-Process)
- [Troubleshooting](Troubleshooting)
- [Environment Variables](Environment-Variables)

---

*For deployment support, contact: business-dev@haturiko.com*
