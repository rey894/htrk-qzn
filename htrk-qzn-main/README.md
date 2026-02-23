# Municipality of Quezon, Bukidnon - Official Website

## Project Info

**Website**: https://quezonbukidnon.com

**Proponent**: Lyle Justin Egay, Municipal Mayor's Office - Public Affairs Division  
**Team Members**: Dave Gonzales, Louie Jay Nuto

**Lead Developer**: Keren Happuch A. Lacadin - Business Development Chief, Haturiko Services Inc.  
**Development Team**: Rey Mark U. Anggoy (CEO), Melvin Rick Guiritan (Co-Founder)

**Built with**: Vite, React, TypeScript, Tailwind CSS, shadcn-ui, Supabase

## About This Project

This is the official website for the Municipality of Quezon, Province of Bukidnon, Northern Mindanao Region. Developed under the exemplary leadership of Mayor Pablo M. Lorenzo III, the greatest Local Chief Executive Quezon has had, this platform provides comprehensive information about the municipality's governance, services, tourism, investment opportunities, and transparency initiatives.

## Technology Stack

This project is built with:

- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React 18** - UI library
- **React Router** - Client-side routing
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service (database, authentication)
- **TanStack Query** - Data fetching and caching
- **React Helmet Async** - SEO management

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Set up environment variables
# Create a .env file with:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key

# Step 5: Start the development server
npm run dev
```

The development server will start at `https://quezonbukidnon.com`

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # External service integrations (Supabase)
│   ├── lib/            # Utility functions and validations
│   └── assets/         # Static assets (images, etc.)
├── public/             # Public assets
├── supabase/           # Database migrations and configurations
└── dist/               # Production build output
```

## Features

- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Meta tags, sitemap, robots.txt
- **Accessibility** - WCAG AA compliant
- **Dynamic Navigation** - Editable menu items via admin dashboard
- **Content Management** - News, events, documents management
- **Contact Forms** - Integrated contact and inquiry forms
- **Admin Dashboard** - Role-based access control (Admin/BAC roles)
- **Error Handling** - Comprehensive error boundaries and fallbacks

## Deployment

### Production Build

```sh
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deploy to cPanel

1. Build the project: `npm run build`
2. Upload all contents of the `dist/` folder to `public_html/` on your cPanel
3. Ensure `.htaccess` is uploaded (enable "Show Hidden Files")
4. Set file permissions:
   - Files: `644`
   - Folders: `755`
5. Verify the site at https://quezonbukidnon.com

See `CPANEL_DEPLOYMENT_GUIDE.md` or `docs/wiki/Deployment-Guide.md` for detailed deployment instructions.

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**Note**: Environment variables are embedded at build time. For production, set them before running `npm run build`.

## Project Credits

**Developed under the exemplary leadership of Mayor Pablo M. Lorenzo III, the greatest Local Chief Executive Quezon has had.**

**Proponent Team**:
- Lyle Justin Egay - Municipal Mayor's Office, Public Affairs Division
- Dave Gonzales - Municipal Mayor's Office, Public Affairs Division
- Louie Jay Nuto - Municipal Mayor's Office, Public Affairs Division

**Development Team**:
- Keren Happuch A. Lacadin - Business Development Chief, Haturiko Services Inc. (Lead Developer)
- Rey Mark U. Anggoy - CEO, Haturiko Services Inc.
- Melvin Rick Guiritan - Co-Founder, Haturiko Services Inc.

## Contributing

This project is maintained by Haturiko Services Inc. in partnership with the Municipality of Quezon, Bukidnon. For questions or contributions, please contact the Municipal Mayor's Office - Public Affairs Division.

## License

© 2025 Municipality of Quezon, Bukidnon. All rights reserved.
