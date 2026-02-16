# 🚀 Ambienco Local Setup Guide

## Prerequisites

Before running the project locally, ensure you have:

- **Node.js** version 18.0.0 or higher
- **npm** version 8.0.0 or higher

Check your versions:
```bash
node --version
npm --version
```

## Installation Steps

### 1. Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

This will install all required dependencies including:
- Tailwind CSS v4 (alpha)
- React & React DOM
- Lucide Icons
- Motion (Framer Motion)
- Supabase
- And all other dependencies

### 2. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Important: Tailwind CSS v4 Setup

This project uses **Tailwind CSS v4 (alpha)** which has a different setup than v3:

### Key Files:
- **`/postcss.config.js`**: PostCSS configuration for Tailwind v4
- **`/styles/globals.css`**: Main CSS file with Tailwind import
- **`/tailwind.config.js`**: Minimal config (v4 uses CSS-based configuration)

### Styling Configuration:
The styles are configured using:
1. `@import "tailwindcss"` in `globals.css`
2. CSS variables defined in `:root`
3. `@theme inline` for Tailwind color tokens
4. `@layer base` for custom base styles

## Build for Production

```bash
npm run build
```

This will:
1. Run TypeScript compiler
2. Build with Vite
3. Output to `/dist` folder
4. Minify using Terser

## Preview Production Build

```bash
npm run preview
```

The production preview will run on `http://localhost:4173`

## Common Issues & Solutions

### Issue: Styles Not Applying

**Solution:**
1. Ensure you have installed all dependencies: `npm install`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Issue: PostCSS Error

**Solution:**
Ensure `postcss.config.js` exists with proper Tailwind v4 configuration:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### Issue: TypeScript Errors

**Solution:**
1. Check TypeScript version (should be 5.2.2 or higher)
2. Run: `npm run lint` to see specific errors

### Issue: Vite Build Fails

**Solution:**
1. Clear Vite cache: `rm -rf node_modules/.vite`
2. Rebuild: `npm run build`

## Project Structure

```
/
├── components/          # React components
│   ├── ui/             # UI components (buttons, cards, etc.)
│   └── figma/          # Figma-specific components
├── styles/             # Global styles
│   └── globals.css     # Main CSS file with Tailwind
├── utils/              # Utility functions
│   └── supabase/       # Supabase configuration
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── package.json        # Dependencies and scripts
```

## Environment Variables (Optional)

If you need to use Supabase features locally:

1. Create a `.env.local` file in the root
2. Add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

## Development Tips

1. **Hot Reload**: Vite provides instant hot module replacement (HMR)
2. **TypeScript**: The project uses TypeScript for type safety
3. **ESLint**: Run `npm run lint` to check code quality
4. **Dark Mode**: The site uses dark mode by default (class="dark" on HTML)

## Deployment

For production deployment, see:
- `/PRODUCTION-DEPLOYMENT.md` - Production deployment guide
- `/DEPLOYMENT-COMMANDS.md` - Quick deployment commands
- `/DEPLOY-AMBI-ENCO-IT-COM.md` - Domain-specific deployment

## Support

- **Built by**: Unaise
- **Contact**: +966 570514881
- **Email**: unaise@ambi-enco.it.com

## Technology Stack

- **Frontend**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Styling**: Tailwind CSS v4.0.0-alpha.25
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Backend**: Supabase
- **TypeScript**: 5.2.2

---

**Note**: This project uses Tailwind CSS v4 alpha which is still in development. If you experience any styling issues, ensure you have the latest dependencies installed and that the PostCSS configuration is correct.
