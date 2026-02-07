# Deployment Guide - AI Study Planner

## Quick Deploy Options

### Option 1: Vercel (Recommended - 2 minutes)

Vercel provides the fastest and easiest deployment for React apps.

#### Steps:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"
7. Done! Your app is live

#### Custom Domain (Optional):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate is automatic

### Option 2: Netlify (Alternative - 3 minutes)

#### Method A: Drag & Drop
1. Build the project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to Netlify Drop
4. Done!

#### Method B: Git Integration
1. Push code to GitHub
2. Go to Netlify → New Site from Git
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy

### Option 3: GitHub Pages (Free - 5 minutes)

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/ai-study-planner",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/ai-study-planner/'
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: AWS S3 + CloudFront (Production - 15 minutes)

For production deployment with CDN, follow the AWS architecture guide in `.kiro/specs/ai-study-planner/aws-architecture.md`.

#### Quick S3 Deploy:
1. Build:
   ```bash
   npm run build
   ```

2. Create S3 bucket:
   ```bash
   aws s3 mb s3://ai-study-planner-app
   ```

3. Upload:
   ```bash
   aws s3 sync dist/ s3://ai-study-planner-app --acl public-read
   ```

4. Enable static website hosting in S3 console

## Environment Variables

This app doesn't require environment variables for the MVP. All data is stored in localStorage.

For future API integrations, create `.env`:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=AI Study Planner
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Build Optimization

### Production Build
```bash
npm run build
```

### Analyze Bundle Size
```bash
npm run build -- --mode analyze
```

### Performance Tips
1. Images: Use WebP format, compress before upload
2. Code splitting: Already configured with React Router
3. Lazy loading: Import components dynamically
4. CDN: Use Vercel/Netlify CDN automatically

## Post-Deployment Checklist

- [ ] Test all routes (/, /setup, /dashboard)
- [ ] Verify "Try Demo" button works
- [ ] Test schedule generation
- [ ] Check timer functionality
- [ ] Verify localStorage persistence
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify all assets load correctly

## Monitoring & Analytics

### Add Google Analytics (Optional)
1. Get tracking ID from Google Analytics
2. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Error Tracking with Sentry (Optional)
```bash
npm install @sentry/react
```

Add to `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### Routes Don't Work After Deploy
Add `_redirects` file in `public/`:
```
/*    /index.html   200
```

For Netlify, this enables SPA routing.

### Assets Not Loading
Check `base` in `vite.config.ts` matches your deployment path.

## Custom Domain Setup

### Vercel
1. Project Settings → Domains
2. Add domain
3. Update DNS:
   - Type: A
   - Name: @
   - Value: 76.76.21.21

### Netlify
1. Domain Settings → Add custom domain
2. Update DNS:
   - Type: A
   - Name: @
   - Value: 75.2.60.5

## SSL Certificate

Both Vercel and Netlify provide automatic SSL certificates via Let's Encrypt. No configuration needed!

## Rollback

### Vercel
1. Go to Deployments
2. Click on previous deployment
3. Click "Promote to Production"

### Netlify
1. Go to Deploys
2. Click on previous deploy
3. Click "Publish deploy"

## Performance Benchmarks

Target metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90

Test with:
```bash
npm run build
npm run preview
# Open Chrome DevTools → Lighthouse
```

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- GitHub Pages: [docs.github.com/pages](https://docs.github.com/pages)

---

**Pro Tip**: Deploy early and often. Use Vercel's preview deployments for every PR!
