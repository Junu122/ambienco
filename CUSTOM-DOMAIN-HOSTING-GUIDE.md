# 🌐 COMPLETE HOSTING GUIDE FOR YOUR CUSTOM DOMAIN

## 🎯 YOUR AMBIENCO WEBSITE → YOUR DOMAIN

**You have a domain! Let's make your LED lighting website live on it!**

---

## 📋 WHAT YOU NEED

✅ Your purchased domain (e.g., ambienco.sa, ambienco.com)  
✅ Access to your domain registrar account  
✅ This website code  
✅ 30-60 minutes of time  

---

## 🚀 STEP-BY-STEP COMPLETE DEPLOYMENT

### **OPTION 1: VERCEL (RECOMMENDED - EASIEST & FREE)**

---

## 🔵 PART A: SETUP GITHUB (5 MINUTES)

### 1. **Create GitHub Account** (if you don't have one)
- Go to [github.com](https://github.com)
- Click "Sign up"
- Create free account

### 2. **Create New Repository**
- Click "+" icon → "New repository"
- Name: `ambienco-website`
- Keep it Public or Private (your choice)
- Don't add README
- Click "Create repository"

### 3. **Upload Your Website Code**

**OPTION A: Using GitHub Desktop (Easiest)**
- Download [GitHub Desktop](https://desktop.github.com)
- File → Add Local Repository
- Choose your Ambienco website folder
- Click "Publish repository"

**OPTION B: Using Command Line**
```bash
# Navigate to your website folder
cd /path/to/your/ambienco-website

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Ambienco LED Lighting Website - Initial Deploy"

# Add GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ambienco-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## 🟢 PART B: DEPLOY TO VERCEL (10 MINUTES)

### 1. **Create Vercel Account**
- Go to [vercel.com](https://vercel.com)
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel to access your GitHub

### 2. **Import Your Project**
- Click "Add New..." → "Project"
- Find `ambienco-website` repository
- Click "Import"

### 3. **Configure Build Settings**
Vercel will auto-detect. Verify these settings:
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. **Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- ✅ Your website is now live at `https://ambienco-website-xxx.vercel.app`

---

## 🌐 PART C: CONNECT YOUR CUSTOM DOMAIN (15 MINUTES)

### 1. **Add Domain in Vercel**
- Go to your project in Vercel
- Click "Settings" → "Domains"
- Enter your domain (e.g., `ambienco.sa`)
- Click "Add"

### 2. **Get DNS Records from Vercel**
Vercel will show you DNS records like:
```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. **Configure DNS at Your Domain Registrar**

**Find where you bought your domain. Follow instructions for your registrar:**

#### **If you bought from GoDaddy:**
1. Go to [godaddy.com](https://godaddy.com) → My Products
2. Click DNS next to your domain
3. Click "Add" to add each record:
   - **A Record:**
     - Type: A
     - Name: @
     - Value: 76.76.19.19
     - TTL: 600
   - **CNAME Record:**
     - Type: CNAME
     - Name: www
     - Value: cname.vercel-dns.com
     - TTL: 600
4. Save changes

#### **If you bought from Namecheap:**
1. Go to [namecheap.com](https://namecheap.com) → Domain List
2. Click "Manage" next to your domain
3. Go to "Advanced DNS" tab
4. Add records:
   - **A Record:**
     - Type: A Record
     - Host: @
     - Value: 76.76.19.19
     - TTL: Automatic
   - **CNAME Record:**
     - Type: CNAME Record
     - Host: www
     - Value: cname.vercel-dns.com
     - TTL: Automatic
5. Save changes

#### **If you bought from Cloudflare:**
1. Go to [cloudflare.com](https://cloudflare.com) → Dashboard
2. Select your domain
3. Go to DNS → Records
4. Add records:
   - **A Record:**
     - Type: A
     - Name: @
     - IPv4 address: 76.76.19.19
     - Proxy status: DNS only (grey cloud)
   - **CNAME Record:**
     - Type: CNAME
     - Name: www
     - Target: cname.vercel-dns.com
     - Proxy status: DNS only (grey cloud)
5. Save

#### **If you bought from nic.sa (Saudi domain):**
1. Go to your registrar's control panel
2. Find DNS Management or Name Servers
3. Add the DNS records provided by Vercel
4. Contact your registrar support if unclear

### 4. **Wait for DNS Propagation**
- Usually takes 15 minutes - 24 hours
- Check status: [whatsmydns.net](https://whatsmydns.net)
- Enter your domain and check if DNS is propagated globally

### 5. **Verify in Vercel**
- Go back to Vercel → Domains
- Wait for green checkmark ✅
- Your domain is now live!

✅ **Your website is now at YOUR DOMAIN!**

---

## 🗄️ PART D: SETUP SUPABASE BACKEND (20 MINUTES)

### 1. **Deploy Supabase Edge Functions**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your existing project
supabase link --project-ref wrrnwlfoeglfjxziinub

# Deploy the edge functions
supabase functions deploy make-server-52299eb6
```

### 2. **Verify Backend is Working**
- Visit: `https://wrrnwlfoeglfjxziinub.supabase.co/functions/v1/make-server-52299eb6/health`
- You should see: `{"status":"ok","timestamp":"..."}`

✅ **Backend is deployed!**

**Note:** Your website already works with localStorage fallback, so it functions perfectly even without the backend deployed. Deploy the backend when you're ready to have centralized product management.

---

## 🔒 PART E: SECURITY & SSL (AUTOMATIC)

### Vercel Automatically Provides:
✅ **Free SSL Certificate** (HTTPS with green lock)  
✅ **Automatic renewal** (never expires)  
✅ **HTTP to HTTPS redirect** (automatic)  
✅ **Security headers** (already configured)  

### Verify SSL is Working:
1. Visit your domain: `https://yourdomain.com`
2. Look for green lock 🔒 in browser
3. Click lock → Certificate should show "Let's Encrypt"

---

## 📱 PART F: TESTING YOUR LIVE WEBSITE (10 MINUTES)

### ✅ **Complete Testing Checklist:**

1. **Basic Access:**
   - [ ] Visit `https://yourdomain.com` - loads successfully
   - [ ] Visit `https://www.yourdomain.com` - loads successfully
   - [ ] Green lock (HTTPS) shows in browser

2. **All Sections Load:**
   - [ ] Hero section with 3D animations
   - [ ] About section
   - [ ] LED Lighting section
   - [ ] Furniture section  
   - [ ] Electrical section
   - [ ] Product catalog
   - [ ] Forum section
   - [ ] Contact section
   - [ ] Footer with "Built by Unaise"

3. **Interactive Features:**
   - [ ] Phone link works: Click "0570514881"
   - [ ] WhatsApp chat opens
   - [ ] AI Lighting Assistant works
   - [ ] Navigation menu works
   - [ ] Smooth scrolling between sections
   - [ ] All animations play smoothly

4. **Admin Panel:**
   - [ ] Type "UNAISE" to reveal admin button
   - [ ] Click "Access Admin Panel"
   - [ ] Login with: unaise98 / Unualakandy@98
   - [ ] Can add/edit/delete products
   - [ ] Products show in catalog

5. **Mobile Testing:**
   - [ ] Open on phone browser
   - [ ] Responsive design works
   - [ ] Touch interactions work
   - [ ] Phone link opens dialer
   - [ ] All sections scroll smoothly

6. **Performance:**
   - [ ] Website loads in under 3 seconds
   - [ ] Animations are smooth (no lag)
   - [ ] Images load properly
   - [ ] No console errors (F12 → Console)

---

## 🎯 YOUR WEBSITE IS NOW LIVE!

### 🌟 **Your Professional LED Lighting Website Includes:**

✅ **Custom Domain:** yourdomain.com  
✅ **SSL/HTTPS:** Secure green lock  
✅ **Global CDN:** Fast worldwide  
✅ **3D Animations:** Cosmic space theme  
✅ **Mobile Responsive:** Perfect on all devices  
✅ **Admin Panel:** Manage products easily  
✅ **Contact Integration:** Direct phone calls  
✅ **AI Assistant:** Customer support  
✅ **Forum System:** Customer community  
✅ **WhatsApp Chat:** Instant messaging  
✅ **SEO Ready:** Found by Google  

---

## 📈 PART G: POST-LAUNCH (OPTIONAL BUT RECOMMENDED)

### 1. **Submit to Search Engines**

**Google Search Console:**
```
1. Go to: https://search.google.com/search-console
2. Add property: yourdomain.com
3. Verify ownership (choose DNS verification)
4. Submit sitemap: yourdomain.com/sitemap.xml
```

**Bing Webmaster Tools:**
```
1. Go to: https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap
```

### 2. **Add Google Analytics (Optional)**
```
1. Go to: https://analytics.google.com
2. Create property for your domain
3. Get tracking ID
4. Add to your website (contact developer)
```

### 3. **Test Performance**
- **PageSpeed Insights:** https://pagespeed.web.dev
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **SSL Test:** https://www.ssllabs.com/ssltest

### 4. **Update Business Profiles**
- [ ] Google My Business → Add website URL
- [ ] Facebook Business Page → Update website
- [ ] Instagram Bio → Add website link
- [ ] LinkedIn Company → Update website
- [ ] Business cards → Add website
- [ ] Email signature → Include website

---

## 🚀 SOCIAL MEDIA ANNOUNCEMENT

### 📢 **Ready to Announce? Use This Template:**

```
🌟 Exciting News! 🌟

Ambienco LED Lighting Solutions is now LIVE online!

🌐 Visit us: https://yourdomain.com

✨ Discover:
⚡ Premium LED lighting solutions
🪑 Modern furniture collections
🔌 Quality electrical products

📞 Contact: 0570514881
🇸🇦 Proudly serving Saudi Arabia

Experience our stunning 3D cosmic website and explore our complete product range!

#Ambienco #LEDLighting #SaudiArabia #Illuminate #Empower #Live

✨ Built by Unaise
```

---

## 🔄 MAKING UPDATES TO YOUR LIVE WEBSITE

### **Super Easy - Just Push to GitHub:**

```bash
# 1. Make changes to your files locally

# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Update product catalog"

# 4. Push to GitHub
git push

# 5. Vercel automatically deploys! (2-3 minutes)
```

**No need to manually redeploy - Vercel does it automatically!**

---

## 🆘 TROUBLESHOOTING COMMON ISSUES

### ❌ **Problem: Domain not working**
**Solution:**
- DNS takes 15 mins - 24 hours to propagate
- Check DNS: https://whatsmydns.net
- Clear browser cache (Ctrl + F5)
- Try incognito/private browsing

### ❌ **Problem: SSL not showing (no green lock)**
**Solution:**
- Wait 10-15 minutes after adding domain
- Vercel auto-provisions SSL
- Force refresh: Ctrl + Shift + R
- Check Vercel dashboard for SSL status

### ❌ **Problem: Build failed on Vercel**
**Solution:**
```bash
# Test build locally first
npm install
npm run build

# If it works locally, check Vercel logs
# Usually missing environment variables
```

### ❌ **Problem: Admin panel not working**
**Solution:**
- Type "UNAISE" (all caps) on homepage
- Admin button should appear top-right
- Login: unaise98 / Unualakandy@98
- Clear browser cache if needed

### ❌ **Problem: Products not showing**
**Solution:**
- Products use localStorage by default
- Add products via admin panel
- They save in browser storage
- Deploy Supabase backend for centralized storage

### ❌ **Problem: Phone link not working on mobile**
**Solution:**
- Link format: tel:+966570514881
- Must test on actual mobile device
- Desktop browsers won't open dialer

---

## 💰 COST BREAKDOWN

### **Total Monthly Cost:**

| Service | Cost | What For |
|---------|------|----------|
| **Domain** | $5-10/month | Your custom domain |
| **Vercel Hosting** | $0 (FREE) | Website hosting |
| **Supabase** | $0 (FREE) | Backend & database |
| **SSL Certificate** | $0 (FREE) | Secure HTTPS |
| **CDN** | $0 (FREE) | Global delivery |
| **Total** | **$5-10/month** | Everything! |

**That's it! Professional LED lighting website for less than a cup of coffee! ☕**

---

## 📞 SUPPORT & HELP

### **Need Help?**

**Technical Issues:**
- Check Vercel docs: https://vercel.com/docs
- Check Supabase docs: https://supabase.com/docs
- Browser console (F12) shows errors

**Domain/DNS Issues:**
- Contact your domain registrar support
- Show them the DNS records from Vercel
- Ask them to configure DNS for Vercel

**Business Contact:**
- Phone: 0570514881 (Ambienco)

**Website Developer:**
- Built by Unaise (credit shown in footer)

---

## 🎉 CONGRATULATIONS!

### 🌟 **YOUR AMBIENCO LED LIGHTING WEBSITE IS NOW LIVE!**

You now have:
- ✅ Professional website at YOUR domain
- ✅ Secure HTTPS with SSL
- ✅ Lightning-fast global hosting
- ✅ Full admin control
- ✅ Mobile-perfect design
- ✅ Saudi Arabia-themed elegance
- ✅ 3D cosmic animations
- ✅ Complete product management
- ✅ Customer contact system
- ✅ Forum community
- ✅ AI-powered assistance

**Your LED lighting business is ready to illuminate the digital world! 💡**

---

## 📋 QUICK REFERENCE COMMANDS

```bash
# Local Development
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production

# Git Commands
git add .           # Stage changes
git commit -m "msg" # Commit changes
git push            # Push to GitHub (auto-deploys!)

# Supabase Commands
supabase login      # Login to Supabase
supabase functions deploy make-server-52299eb6  # Deploy backend

# Check Website
curl -I https://yourdomain.com  # Check if site is up
```

---

## 🚀 YOU'RE READY TO SHINE!

**Follow these steps and your Ambienco LED Lighting website will be live on your custom domain within an hour!**

**Questions? Issues? Check the troubleshooting section above.**

**Built by Unaise - Illuminate. Empower. Live. 🌟**

---

*Last Updated: November 2025*
*Ambienco LED Lighting Solutions - Saudi Arabia*
