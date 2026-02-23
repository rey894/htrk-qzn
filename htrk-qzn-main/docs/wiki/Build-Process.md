# Build Process

Understanding how the Quezon Municipal Website is built for production deployment.

## Overview

The website uses **Vite** as the build tool, which compiles TypeScript/React code into optimized production-ready files.

## Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- Environment variables configured (`.env` file)

## Build Commands

### Development Build

```bash
npm run dev
```

Starts development server with hot-reload at `https://quezonbukidnon.com`

### Production Build

```bash
npm run build
```

Creates optimized production files in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deploying.

## Build Output

After running `npm run build`, you'll get:

```
dist/
├── index.html          # Main HTML file
├── .htaccess          # Apache configuration
├── robots.txt         # Search engine configuration
├── sitemap.xml        # Site map
├── assets/            # Compiled CSS, JS, images
│   ├── index-[hash].css
│   ├── index-[hash].js
│   ├── vendor-[hash].js
│   └── [image files]
├── documents/         # PDF files
├── forms/            # Permit forms
├── favicon/          # Favicon files
└── images/           # Uploaded images
```

## Build Process Details

### 1. TypeScript Compilation

- Converts TypeScript (`.ts`, `.tsx`) to JavaScript
- Type checking and error reporting
- Removes type annotations (keeps for IDE support only)

### 2. React Bundling

- Bundles React components into optimized JavaScript
- Tree-shaking (removes unused code)
- Code splitting for better performance

### 3. CSS Processing

- Processes Tailwind CSS
- Autoprefixes CSS for browser compatibility
- Minifies CSS for smaller file size

### 4. Asset Optimization

- Optimizes images (if configured)
- Generates hash-based filenames for cache busting
- Copies static assets to `dist/` folder

### 5. HTML Generation

- Generates `index.html` with correct asset references
- Injects meta tags and SEO information
- Sets up proper script and link tags

## Environment Variables

Environment variables are embedded at **build time**, not runtime.

### Required Variables

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

### Using Variables in Code

Access via `import.meta.env`:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
```

**Important**: Only variables prefixed with `VITE_` are exposed to client-side code.

## Build Optimization

### Automatic Optimizations

Vite automatically:
- **Minifies** JavaScript and CSS
- **Tree-shakes** unused code
- **Code-splits** vendor libraries
- **Generates source maps** (disabled in production)
- **Optimizes asset imports**

### Manual Optimizations

Before building:
- Optimize images (compress, resize)
- Remove unused dependencies
- Check bundle size
- Verify environment variables

## Build Troubleshooting

### Build Fails with Errors

**TypeScript Errors:**
- Fix type errors shown in terminal
- Check `tsconfig.json` configuration

**Memory Issues:**
- Increase Node.js memory: `NODE_OPTIONS=--max-old-space-size=4096 npm run build`
- Or build in smaller chunks

**Missing Dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Build Output Missing Files

**Check:**
- `.env` file exists and has correct values
- All source files are in `src/` folder
- Public assets are in `public/` folder
- No build errors in console

### Build Takes Too Long

**Optimize:**
- Reduce dependencies
- Check for large assets
- Use code splitting
- Optimize images before build

## Verification Steps

After building, verify:

1. **`dist/index.html` exists**
   ```bash
   Test-Path dist/index.html
   ```

2. **`.htaccess` is present**
   ```bash
   Test-Path dist/.htaccess
   ```

3. **Assets folder exists**
   ```bash
   Test-Path dist/assets
   ```

4. **No build errors in console**
   - Check terminal output
   - Verify all files generated

## Build Configuration

### Vite Config

Configuration in `vite.config.ts`:
- Entry points
- Output directory
- Asset handling
- Build optimization settings

### TypeScript Config

Configuration in `tsconfig.json`:
- Type checking rules
- Module resolution
- Compiler options

### Tailwind Config

Configuration in `tailwind.config.ts`:
- Theme customization
- Plugin configuration
- Content paths

## Production Build Checklist

Before deploying:

- [ ] `.env` file configured correctly
- [ ] Build completes without errors
- [ ] `dist/` folder contains all required files
- [ ] `.htaccess` present in `dist/`
- [ ] Assets loaded and accessible
- [ ] Preview build locally (`npm run preview`)
- [ ] Test all pages and features
- [ ] Verify environment variables are correct

## Related Pages

- [Deployment Guide](Deployment-Guide)
- [Environment Variables](Environment-Variables)
- [Troubleshooting](Troubleshooting)

---

*For build-related support, contact: business-dev@haturiko.com*
