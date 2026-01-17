# Deployment Guide - Cloudflare Pages

This guide covers deploying the Design Pattern Visualizer to Cloudflare Pages, a platform perfect for static sites with excellent performance and DDoS protection.

## Why Cloudflare Pages?

✅ **Perfect for Static Sites**
- Next.js static export support
- Global CDN with 200+ data centers
- Automatic HTTPS and SSL certificates
- Built-in DDoS protection

✅ **Performance**
- Edge caching worldwide
- HTTP/3 support
- Image optimization
- Instant cache purging

✅ **Developer Experience**
- Git integration (GitHub, GitLab)
- Automatic deployments on push
- Preview deployments for PRs
- Rollback to any previous deployment

✅ **Cost**
- Free tier: Unlimited requests, 500 builds/month
- No bandwidth limits
- No additional costs for traffic spikes

## Prerequisites

1. **Cloudflare Account**
   - Sign up at [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
   - Free tier is sufficient

2. **GitHub Account**
   - Repository pushed to GitHub
   - Admin access to the repository

3. **Local Setup**
   - Node.js 18+ installed
   - Project building successfully locally

## Step-by-Step Deployment

### 1. Prepare the Project

The project is already configured for static export in `next.config.ts`:

```typescript
export default {
  output: "export",
  images: {
    unoptimized: true,
  },
};
```

**Test the static build locally:**

```bash
npm run build
```

This creates an `out` directory with static files.

### 2. Push to GitHub

If not already done:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/design-pattern-visualizer.git
git push -u origin main
```

### 3. Connect to Cloudflare Pages

1. **Log in to Cloudflare Dashboard**
   - Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)

2. **Navigate to Pages**
   - Click "Workers & Pages" in the sidebar
   - Click "Create application"
   - Choose "Pages"
   - Click "Connect to Git"

3. **Authorize GitHub**
   - Select your GitHub account
   - Grant access to the repository
   - Select the `design-pattern-visualizer` repository

### 4. Configure Build Settings

Use these exact settings:

```yaml
Production branch: main

Build command: npm run build

Build output directory: out

Root directory: /

Environment variables: (none required)
```

**Build Configuration Details:**

- **Framework preset**: Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node.js version**: 18.x (default)

### 5. Deploy

1. Click "Save and Deploy"
2. Cloudflare Pages will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Run build command (`npm run build`)
   - Deploy the `out` directory
   - Assign a `*.pages.dev` URL

3. Wait for deployment (usually 2-5 minutes)

### 6. Access Your Site

After deployment completes:

- **Production URL**: `https://design-pattern-visualizer.pages.dev`
- **Custom Domain**: Can be configured in Pages settings

## Custom Domain Setup

### Option 1: Using Cloudflare-Managed Domain

If your domain is already on Cloudflare:

1. Go to your Pages project
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain (e.g., `patterns.yourdomain.com`)
5. Click "Activate domain"
6. Cloudflare automatically configures DNS

### Option 2: External Domain

If your domain is elsewhere:

1. Add custom domain in Pages settings
2. Cloudflare provides CNAME record
3. Add CNAME to your DNS provider:
   ```
   CNAME patterns design-pattern-visualizer.pages.dev
   ```
4. Wait for DNS propagation (up to 48 hours)

## Continuous Deployment

### Automatic Deployments

Cloudflare Pages automatically deploys:

✅ **Production Deployments**
- Triggered by pushes to `main` branch
- URL: `design-pattern-visualizer.pages.dev`
- Also deploys to custom domain if configured

✅ **Preview Deployments**
- Triggered by PRs and other branches
- Unique URL for each deployment
- Perfect for testing before merging

### Manual Deployments

To trigger a manual deployment:

1. Go to Cloudflare Dashboard > Pages
2. Select your project
3. Click "Create deployment"
4. Choose branch or upload files

## Environment Variables

This project doesn't require environment variables, but if needed:

1. Go to Pages project settings
2. Click "Environment variables"
3. Add variables for:
   - **Production**: Used for `main` branch
   - **Preview**: Used for preview deployments

## Build Configuration

### Advanced Build Settings

Create `.node-version` file for specific Node version:

```
18.17.0
```

### Build Cache

Cloudflare Pages caches:
- `node_modules`
- `.next/cache`
- Build outputs

To clear cache:
1. Go to project settings
2. Click "Clear build cache"
3. Trigger new deployment

## Performance Optimization

### Caching Strategy

Cloudflare automatically caches:
- Static assets (JS, CSS, images)
- HTML pages
- API responses (if applicable)

**Cache Headers** (already configured in `next.config.ts`):
```typescript
headers: [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
]
```

### Speed Optimizations

✅ **Implemented:**
- Static HTML generation
- Optimized bundle size
- Code splitting
- Font optimization
- Security headers

✅ **Cloudflare Provides:**
- Global CDN distribution
- HTTP/3 and QUIC support
- Brotli compression
- Early Hints
- Edge caching

## Monitoring & Analytics

### Cloudflare Analytics

Access via Dashboard:
1. Go to your Pages project
2. Click "Analytics" tab

**Available Metrics:**
- Total requests
- Bandwidth usage
- Cache hit ratio
- Response time
- Geographic distribution

### Web Analytics (Optional)

Enable Cloudflare Web Analytics:
1. Go to Analytics > Web Analytics
2. Add site
3. Copy tracking code
4. Add to `app/layout.tsx` (optional)

## Rollback & Version Control

### Rollback to Previous Version

1. Go to Pages project
2. Click "Deployments" tab
3. Find previous successful deployment
4. Click "•••" menu
5. Select "Rollback to this deployment"

### Deployment History

- View all deployments
- See build logs
- Check deployment status
- Compare versions

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Module not found"
```bash
Solution: Ensure all dependencies in package.json
Run locally: npm install && npm run build
```

**Issue**: Out of memory during build
```bash
Solution: Increase Node memory
Add to package.json: "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
```

**Issue**: Build timeout
```bash
Solution: Optimize build process
- Remove unnecessary dependencies
- Use build cache
- Contact Cloudflare support for limit increase
```

### Deployment Issues

**Issue**: 404 on all pages except home
```bash
Solution: Check output directory is "out" not ".next"
Verify next.config.ts has output: "export"
```

**Issue**: Assets not loading
```bash
Solution: Check basePath configuration
Ensure all assets use relative paths
```

**Issue**: Preview deployments not working
```bash
Solution: Check branch permissions
Ensure GitHub integration is active
Verify build settings
```

### Performance Issues

**Issue**: Slow initial load
```bash
Solution:
- Check bundle size (should be < 300KB)
- Enable compression
- Use code splitting
- Check Cloudflare cache settings
```

**Issue**: High cache miss rate
```bash
Solution:
- Review cache headers
- Check Cloudflare cache rules
- Enable Cloudflare Argo (premium)
```

## Security Configuration

### Security Headers

Already configured in `next.config.ts`:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### Additional Cloudflare Security

Enable in Cloudflare Dashboard:

1. **Firewall Rules**
   - Block malicious IPs
   - Rate limiting
   - Geographic restrictions

2. **Bot Management** (Pro plan)
   - Block bad bots
   - Verify human users
   - Challenge suspicious traffic

3. **DDoS Protection** (Automatic)
   - Always on
   - No configuration needed
   - Handles large attacks

## Cost Breakdown

### Cloudflare Pages Free Tier

✅ **Included:**
- Unlimited requests
- Unlimited bandwidth
- 500 builds per month
- 1 concurrent build
- 100 custom domains per project

💰 **Limits:**
- Max 20,000 files per deployment
- Max 25 MB per file
- 20 MB max upload size

### When to Upgrade

Consider paid plans for:
- More than 500 builds/month
- Multiple concurrent builds
- Advanced analytics
- Priority support

## CI/CD Integration

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - run: npm test
      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: design-pattern-visualizer
          directory: out
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## Best Practices

### Before Deployment

- ✅ Test build locally: `npm run build`
- ✅ Run tests: `npm test`
- ✅ Check bundle size
- ✅ Test in multiple browsers
- ✅ Verify security headers
- ✅ Review dependencies

### After Deployment

- ✅ Test production URL
- ✅ Verify all pages load
- ✅ Check console for errors
- ✅ Test theme toggle
- ✅ Test code playground
- ✅ Verify mobile responsiveness
- ✅ Check performance metrics

### Ongoing Maintenance

- 🔄 Update dependencies monthly
- 🔄 Review analytics weekly
- 🔄 Monitor error rates
- 🔄 Check security advisories
- 🔄 Optimize based on metrics

## Support & Resources

### Cloudflare Resources
- **Documentation**: https://developers.cloudflare.com/pages/
- **Community**: https://community.cloudflare.com/
- **Status**: https://www.cloudflarestatus.com/
- **Support**: https://dash.cloudflare.com/?to=/:account/support

### Next.js Static Export
- **Documentation**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **GitHub**: https://github.com/vercel/next.js/

## Checklist

### Pre-Deployment
- [ ] Code pushed to GitHub
- [ ] Local build successful
- [ ] Tests passing
- [ ] Security review complete
- [ ] README updated

### Deployment
- [ ] Cloudflare account created
- [ ] Repository connected
- [ ] Build settings configured
- [ ] First deployment successful
- [ ] Production URL accessible

### Post-Deployment
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Performance verified
- [ ] Security headers checked
- [ ] Mobile testing complete
- [ ] Documentation updated

## Next Steps

1. **Deploy the site** following this guide
2. **Test thoroughly** in production
3. **Configure custom domain** (optional)
4. **Enable analytics** for monitoring
5. **Set up alerts** for downtime
6. **Plan maintenance schedule**

---

**Last Updated**: January 17, 2026

**Questions?** Open an issue on GitHub or contact the maintainers.
