# Complete cPanel Deployment Guide
## Municipality of Quezon, Bukidnon Website

### Quick Start
1. Build the project: `npm run build`
2. Upload entire `dist/` folder to `public_html/`
3. Verify `.htaccess` is in root
4. Test the website

---

## Pre-Deployment Checklist

### ✅ Before Building
- [ ] All code changes committed
- [ ] Environment variables set in `.env` file:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
  ```
- [ ] Test locally: `npm run dev`
- [ ] No console errors
- [ ] All features working

---

## Step 1: Build the Project

```bash
# Navigate to project directory
cd C:\Documents\gitrepo

# Clean build (removes old dist folder)
npm run build
```

**Expected Output:**
- ✅ `dist/` folder created
- ✅ `dist/index.html` exists
- ✅ `dist/assets/` folder with JS/CSS files
- ✅ `dist/.htaccess` file
- ✅ No build errors

**Verify Build:**
```bash
# Check built files
ls dist/
ls dist/assets/
```

---

## Step 2: Prepare Files for Upload

### Files Structure After Build:
```
dist/
├── index.html              ← Main HTML file
├── .htaccess              ← Apache configuration (CRITICAL!)
├── assets/
│   ├── index-[hash].js    ← JavaScript bundle
│   ├── index-[hash].css   ← CSS bundle
│   └── [other assets]     ← Images, fonts, etc.
├── images/                ← Public images
├── documents/             ← PDF files
├── forms/                 ← PDF forms
└── [other folders]        ← Additional resources
```

**Important:** Upload ALL files from `dist/` folder, not just `index.html`!

---

## Step 3: Upload to cPanel via FTP

### Option A: Using FTP Client (FileZilla, WinSCP, etc.)

1. **Connect to FTP:**
   - Host: `quezonbukidnon.com` (or your FTP host)
   - Username: [Your FTP username]
   - Password: [Your FTP password]
   - Port: 21 (or 22 for SFTP)

2. **Navigate to Root Directory:**
   - Go to `public_html/` (or your domain's root directory)

3. **Backup Current Files (Optional but Recommended):**
   - Create folder: `public_html/backup-[date]/`
   - Move current files to backup folder

4. **Upload Files:**
   - Select ALL files from `dist/` folder
   - Upload to `public_html/`
   - Ensure folder structure is maintained:
     ```
     public_html/
     ├── index.html
     ├── .htaccess
     ├── assets/
     │   └── [all files]
     ├── images/
     └── [other folders]
     ```

5. **Verify Upload:**
   - ✅ `index.html` is in root
   - ✅ `.htaccess` is in root (same directory as index.html)
   - ✅ `assets/` folder exists with files
   - ✅ All other folders uploaded

### Option B: Using cPanel File Manager

1. **Log in to cPanel**
2. **Open File Manager**
3. **Navigate to `public_html/`**
4. **Delete old files** (or move to backup)
5. **Upload Files:**
   - Click "Upload" button
   - Select all files from `dist/` folder
   - Wait for upload to complete
6. **Extract if Uploaded as ZIP:**
   - If you uploaded as ZIP, extract it
   - Delete the ZIP file after extraction

---

## Step 4: Set File Permissions

In cPanel File Manager:
- **Files:** `644`
- **Folders:** `755`
- **`.htaccess`:** `644`

**How to Set:**
1. Right-click file/folder → "Change Permissions"
2. Set numeric value: `644` (files) or `755` (folders)
3. Click "Change Permissions"

**Critical Files:**
- `index.html` → `644`
- `.htaccess` → `644`
- `assets/` folder → `755`
- All files in `assets/` → `644`

---

## Step 5: Verify Apache Modules

cPanel → Software → Apache Modules

**Required Modules:**
- ✅ `mod_rewrite` (for React Router)
- ✅ `mod_deflate` (for GZIP compression)
- ✅ `mod_expires` (for cache headers)
- ✅ `mod_headers` (for security headers)

**If Missing:**
- Contact your hosting provider to enable them

---

## Step 6: Test the Website

### Immediate Checks:
1. **Homepage Loads:**
   - Visit: `https://quezonbukidnon.com/`
   - Should see homepage (not white screen)

2. **Browser Console (F12):**
   - No 404 errors
   - No JavaScript errors
   - Assets loading correctly

3. **Network Tab (F12):**
   - All files return `200 OK`
   - No `404 Not Found` errors

4. **React Router Works:**
   - Click navigation links
   - Refresh page (should not show 404)
   - Direct URL access works

5. **Functionality:**
   - ✅ Homepage displays correctly
   - ✅ Navigation works
   - ✅ All pages load
   - ✅ Images display
   - ✅ Admin login works (if applicable)

---

## Step 7: Clear Browser Cache

After deployment:
- **Hard Refresh:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Or:** Clear browser cache completely
- **Or:** Test in incognito/private window

---

## Troubleshooting

### ❌ White Screen
**Cause:** Missing files or JavaScript errors

**Fix:**
1. Check browser console (F12) for errors
2. Verify `assets/` folder is uploaded
3. Verify `.htaccess` is in root
4. Re-upload all files from `dist/`

### ❌ 404 Errors on Page Refresh
**Cause:** Missing or incorrect `.htaccess`

**Fix:**
1. Verify `.htaccess` is in root directory
2. Check file permissions (should be `644`)
3. Verify `mod_rewrite` is enabled
4. Re-upload `.htaccess` from `dist/`

### ❌ Invalid API Key
**Cause:** Environment variables not embedded in build

**Fix:**
1. Verify `.env` file has correct values
2. Rebuild: `npm run build`
3. Re-upload `dist/` folder

### ❌ Images Not Loading
**Cause:** Missing `images/` folder or wrong paths

**Fix:**
1. Verify `images/` folder is uploaded
2. Check file paths in browser console
3. Re-upload `images/` folder from `dist/`

### ❌ CSS/JS Files Not Loading (404)
**Cause:** Missing `assets/` folder

**Fix:**
1. Verify `assets/` folder is uploaded
2. Check file permissions
3. Re-upload entire `assets/` folder

---

## Files to Upload Summary

**CRITICAL - Must Upload:**
- ✅ `dist/index.html` → `public_html/index.html`
- ✅ `dist/.htaccess` → `public_html/.htaccess`
- ✅ `dist/assets/` folder (ENTIRE folder) → `public_html/assets/`

**IMPORTANT - Should Upload:**
- ✅ `dist/images/` folder → `public_html/images/`
- ✅ `dist/documents/` folder → `public_html/documents/`
- ✅ `dist/forms/` folder → `public_html/forms/`
- ✅ All other folders from `dist/`

**DO NOT Upload:**
- ❌ `node_modules/`
- ❌ `.env` file
- ❌ `src/` folder
- ❌ `.git/` folder
- ❌ `package.json` (unless needed)

---

## Deployment Checklist

### Before Deployment:
- [ ] Code tested locally
- [ ] Environment variables set
- [ ] Build completed successfully
- [ ] No build errors

### During Upload:
- [ ] Backup current files
- [ ] Upload all files from `dist/`
- [ ] Verify `.htaccess` uploaded
- [ ] Set file permissions

### After Deployment:
- [ ] Homepage loads
- [ ] No console errors
- [ ] Navigation works
- [ ] Page refresh works (no 404)
- [ ] Images load
- [ ] All features functional

---

## Quick Reference

### Build Command:
```bash
npm run build
```

### Upload Location:
```
FTP: public_html/
```

### Critical Files:
- `index.html` (root)
- `.htaccess` (root)
- `assets/` folder

### File Permissions:
- Files: `644`
- Folders: `755`

### Test URL:
```
https://quezonbukidnon.com/
```

---

## Support

If issues persist:
1. Check browser console (F12) for errors
2. Check cPanel error logs
3. Verify all files uploaded correctly
4. Review troubleshooting section above

---

**Last Updated:** Ready for deployment
**Build Tool:** Vite
**Framework:** React + TypeScript
**Deployment Target:** cPanel / Apache
