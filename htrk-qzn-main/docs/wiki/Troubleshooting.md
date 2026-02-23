# Troubleshooting Guide

Common issues and solutions for the Quezon Municipal Website.

## Table of Contents

- [White Screen Issues](#white-screen-issues)
- [Navigation Problems](#navigation-problems)
- [Authentication Issues](#authentication-issues)
- [Build Errors](#build-errors)
- [Deployment Issues](#deployment-issues)
- [Database Errors](#database-errors)
- [Media Upload Issues](#media-upload-issues)

---

## White Screen Issues

### Symptom: Blank white screen when loading the website

**Possible Causes:**
- JavaScript errors in the application
- Missing `.htaccess` file
- Missing or corrupted assets
- Browser cache issues

**Solutions:**

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Check Console tab for error messages
   - Look for red error messages

2. **Verify .htaccess File**
   - Ensure `.htaccess` exists in root directory
   - Verify it contains React Router rewrite rules
   - Check file permissions (should be 644)

3. **Clear Browser Cache**
   - Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear cache in browser settings

4. **Rebuild and Redeploy**
   - Run `npm run build` locally
   - Re-upload all files from `dist/` folder

---

## Navigation Problems

### Symptom: Menu items not appearing

**Possible Causes:**
- Navigation items marked as inactive
- Database connection issues
- JavaScript errors preventing menu rendering

**Solutions:**

1. **Check Navigation Manager**
   - Log in to Admin Dashboard
   - Go to Navigation section
   - Verify menu items have "Active" status
   - Check Display Order is set

2. **Verify Database Connection**
   - Check Supabase credentials in `.env`
   - Verify network connectivity
   - Check browser console for API errors

3. **Clear Cache and Reload**
   - Hard refresh browser
   - Clear application cache

### Symptom: Dropdown menus not visible or hard to see

**Solution:**
- Dropdown menus use solid white background
- If still hard to see, check browser zoom level
- Verify CSS files are loading correctly

---

## Authentication Issues

### Symptom: Cannot log in to admin dashboard

**Possible Causes:**
- Incorrect credentials
- Supabase connection issues
- User account not set up correctly

**Solutions:**

1. **Verify Credentials**
   - Double-check email and password
   - Try password reset if available

2. **Check Supabase Connection**
   - Verify `.env` has correct Supabase URL and key
   - Check Supabase project is active
   - Test connection in browser console

3. **Contact Administrator**
   - If account not set up, contact system administrator
   - Request account creation or role assignment

### Symptom: Admin dashboard shows "Access Denied"

**Cause:** User doesn't have admin role assigned

**Solution:**
- Contact system administrator to assign admin role
- Or use existing admin account to assign role in User Management

---

## Build Errors

### Symptom: `npm run build` fails with errors

**Common Causes and Solutions:**

1. **Missing Dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScript Errors**
   - Check error messages for file and line numbers
   - Fix type errors in source files
   - Verify `tsconfig.json` is correct

3. **Memory Issues**
   - Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`
   - Or use `npm run build` in smaller chunks

4. **Missing Environment Variables**
   - Verify `.env` file exists
   - Check required variables are set
   - Rebuild after updating `.env`

---

## Deployment Issues

### Symptom: 404 errors on page refresh

**Cause:** Missing or incorrect `.htaccess` configuration

**Solution:**
- Ensure `.htaccess` is uploaded to root directory
- Verify it contains React Router rewrite rules
- Check file permissions (644)

### Symptom: Assets not loading (CSS/JS/Images)

**Possible Causes:**
- Missing files in `dist/assets/` folder
- Incorrect file paths
- Permission issues

**Solutions:**

1. **Verify Files Were Uploaded**
   - Check `dist/assets/` contains all files
   - Verify file sizes match local build

2. **Check File Permissions**
   - Files: 644
   - Folders: 755
   - `.htaccess`: 644

3. **Rebuild and Re-upload**
   - Run `npm run build` again
   - Upload complete `dist/` folder

---

## Database Errors

### Symptom: Error messages related to database/Supabase

**Possible Causes:**
- Incorrect Supabase credentials
- Database migration not run
- RLS (Row Level Security) policy issues

**Solutions:**

1. **Verify Environment Variables**
   - Check `.env` has correct `VITE_SUPABASE_URL`
   - Verify `VITE_SUPABASE_PUBLISHABLE_KEY` is correct
   - Rebuild after updating `.env`

2. **Check Database Migrations**
   - Verify all migrations in `supabase/migrations/` are applied
   - Run missing migrations through Supabase dashboard

3. **RLS Policy Issues**
   - Check browser console for specific error messages
   - Verify user has necessary permissions
   - Contact administrator for policy updates

---

## Media Upload Issues

### Symptom: Cannot upload images or files

**Possible Causes:**
- File size exceeds limit
- Unsupported file format
- Storage bucket not configured
- Network connectivity issues

**Solutions:**

1. **Check File Size**
   - Images: Maximum 10MB
   - Documents: Maximum 5MB
   - Compress files if needed

2. **Verify File Format**
   - Images: JPG, PNG, WebP
   - Documents: PDF, DOC, DOCX
   - Use supported formats only

3. **Check Supabase Storage**
   - Verify storage bucket exists
   - Check bucket permissions
   - Ensure RLS policies allow uploads

4. **Network Issues**
   - Check internet connection
   - Try uploading smaller files first
   - Verify no firewall blocking uploads

---

## Getting Help

If you've tried the solutions above and issues persist:

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages
   - Note the specific error text

2. **Review Logs**
   - Check Supabase logs for database errors
   - Review server logs for deployment issues

3. **Contact Support**
   - Email: business-dev@haturiko.com
   - Include:
     - Description of the issue
     - Steps to reproduce
     - Browser console errors (screenshot)
     - Browser and version

---

## Related Pages

- [Deployment Guide](Deployment-Guide)
- [Getting Started](Getting-Started)
- [Admin Dashboard Overview](Admin-Dashboard-Overview)

---

*For technical support, contact: business-dev@haturiko.com*
