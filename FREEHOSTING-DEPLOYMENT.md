# Deploying Ambienco Website to FreeHosting.com

## Overview
This guide will help you deploy your Ambienco LED lighting website to https://panel.freehosting.com:2222/evo/user/dns

## Prerequisites
- Node.js installed on your local machine
- All project files downloaded/cloned locally
- Access to your FreeHosting.com account

## Step 1: Build Production Version

1. **Install Dependencies** (if not already done):
```bash
npm install
```

2. **Build for Production**:
```bash
npm run build
```

This creates a `dist/` folder with all optimized production files.

## Step 2: Access FreeHosting Control Panel

1. **Login to Control Panel**:
   - Go to: https://panel.freehosting.com:2222/evo/user/dns
   - Login with your credentials

2. **Navigate to File Manager**:
   - Look for "File Manager" or "Files" section in the control panel
   - This is where you'll upload your website files

## Step 3: Upload Website Files

1. **Locate Your Domain's Public Folder**:
   - Usually named `public_html`, `www`, or similar
   - This is where your website files need to go

2. **Upload Production Files**:
   - Upload ALL contents from the `dist/` folder (not the folder itself)
   - Key files to upload:
     - `index.html` (main entry point)
     - `assets/` folder (contains CSS, JS, images)
     - `favicon.ico`
     - `robots.txt`
     - `sitemap.xml`
     - `sw.js` (service worker)

3. **File Upload Methods**:
   - **Option A**: Use the web-based file manager to drag and drop
   - **Option B**: Use FTP if provided (check hosting details)
   - **Option C**: Upload as ZIP and extract in file manager

## Step 4: Configure Domain Settings

1. **DNS Configuration**:
   - If using a custom domain, configure DNS records
   - Point A record to hosting server IP
   - Add CNAME for www subdomain if needed

2. **SSL Certificate**:
   - Enable SSL/HTTPS if available in control panel
   - This is important for the WhatsApp integration and contact forms

## Step 5: Verify Deployment

1. **Test Website**:
   - Visit your domain in browser
   - Test all sections: Hero, Lighting, Furniture, Electrical, etc.
   - Verify contact forms work
   - Test WhatsApp integration
   - Check admin panel access

2. **Check Mobile Responsiveness**:
   - Test on different devices and screen sizes

## Important Notes

### Single Page Application (SPA) Configuration
Since this is a React SPA, you may need to configure URL rewriting:

1. **Create .htaccess file** in your public_html folder:
```apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/ico "access plus 1 month"
    ExpiresByType image/icon "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>
```

### Features That May Need Configuration
- **Contact Forms**: May need backend setup for email functionality
- **Forum System**: Requires database configuration if Supabase is not connected
- **Admin Dashboard**: Will work for frontend management

## Troubleshooting

### Common Issues:
1. **404 Errors on Refresh**: Add .htaccess configuration above
2. **CSS/JS Not Loading**: Check file paths and upload all assets
3. **WhatsApp Not Working**: Ensure HTTPS is enabled
4. **Slow Loading**: Enable compression and caching

### File Structure Check:
Ensure your uploaded files look like this:
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── sw.js
└── .htaccess
```

## Contact Information
- **Company**: Ambienco (formerly Maxorva)
- **Location**: Riyadh, Saudi Arabia
- **Email**: unaise@ambi-enco.it.com
- **Phone**: +966 570514881
- **Website**: Your new domain on FreeHosting.com

## Post-Deployment Checklist
- [ ] Website loads correctly
- [ ] All sections are visible and functional
- [ ] Contact forms work
- [ ] WhatsApp chat integration works
- [ ] Admin panel accessible
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Google Analytics (if added) tracking
- [ ] Sitemap submitted to search engines

Your Ambienco website should now be live and accessible to customers looking for premium LED lighting, furniture, and electrical solutions in Saudi Arabia!