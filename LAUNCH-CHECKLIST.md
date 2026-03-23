# Website Launch Checklist

Use this checklist before launching any website to production.

## SEO & Meta Tags
- [ ] Page title optimized for search (include brand + key benefit)
- [ ] Meta description (155 characters max, compelling, includes CTA)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- [ ] Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
- [ ] Twitter handle linked (@username in twitter:site and twitter:creator)
- [ ] OG image created (1200x630px or 1536x1024px)
- [ ] OG image uploaded to /static/
- [ ] Keywords meta tag (relevant, not stuffed)
- [ ] Canonical URL set
- [ ] Favicon added (SVG or multi-size ICO)
- [ ] Apple touch icon (180x180px)

## Structured Data
- [ ] Organization schema (JSON-LD)
- [ ] Include: name, url, logo, description, address, email, social links
- [ ] Contact point schema
- [ ] Test with Google Rich Results Test

## Search Engine Optimization
- [ ] robots.txt created and configured
- [ ] sitemap.xml created with all pages
- [ ] sitemap.xml referenced in robots.txt
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] All pages have unique, descriptive H1 tags
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] All images have descriptive alt text
- [ ] Internal linking strategy in place

## Analytics & Tracking
- [ ] Google Analytics 4 installed
- [ ] GA4 measurement ID configured
- [ ] Test GA4 is receiving data (Realtime view)
- [ ] Goals/conversions configured in GA4
- [ ] Google Tag Manager (optional, if needed)
- [ ] Privacy-compliant analytics consent (if required by jurisdiction)

## Performance
- [ ] Images optimized (WebP/AVIF where supported)
- [ ] Images lazy-loaded (below fold)
- [ ] Critical CSS inlined
- [ ] JavaScript minified and bundled
- [ ] Fonts optimized (woff2, font-display: swap)
- [ ] Test Core Web Vitals (PageSpeed Insights)
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] CDN configured (Vercel does this automatically)
- [ ] Compression enabled (gzip/brotli)

## Security
- [ ] HTTPS enforced (redirect HTTP → HTTPS)
- [ ] SSL certificate valid and not expiring soon
- [ ] Security headers configured (vercel.json or hosting provider):
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY or SAMEORIGIN
  - [ ] X-XSS-Protection: 1; mode=block
  - [ ] Referrer-Policy: strict-origin-when-cross-origin
  - [ ] Permissions-Policy: camera=(), microphone=(), geolocation=()
  - [ ] Content-Security-Policy (if needed)
- [ ] No API keys or secrets in client-side code
- [ ] Environment variables properly configured
- [ ] Forms have CSRF protection (if applicable)
- [ ] Rate limiting on forms (prevent spam)

## Accessibility (WCAG 2.1 AA)
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] ARIA labels on navigation and landmarks
- [ ] Semantic HTML (nav, main, footer, article, section)
- [ ] aria-hidden on decorative icons
- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text (18pt+)
- [ ] Forms have proper labels and error messages
- [ ] Skip to main content link (optional but recommended)
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Test with keyboard only navigation

## Forms
- [ ] Form submission works correctly
- [ ] Loading state while submitting
- [ ] Success message after submission
- [ ] Error handling with user-friendly messages
- [ ] Form validation (client and server-side)
- [ ] Required fields marked clearly
- [ ] Email deliverability tested
- [ ] Spam protection (honeypot, reCAPTCHA, or similar)
- [ ] Auto-responder email configured (optional)

## Content & Copy
- [ ] All placeholder text replaced with real content
- [ ] Spell check and grammar check completed
- [ ] Links open in correct windows (internal same, external new tab with rel="noopener")
- [ ] All CTAs clear and compelling
- [ ] Contact information accurate
- [ ] Social media links correct and functional
- [ ] Copyright year dynamic or current
- [ ] Company address and contact info up to date

## Legal & Compliance
- [ ] Privacy Policy page created (/privacy)
- [ ] Privacy Policy linked in footer
- [ ] Terms of Service (if applicable)
- [ ] Cookie consent banner (if required by GDPR/CCPA)
- [ ] Privacy policy mentions:
  - [ ] What data is collected
  - [ ] How data is used
  - [ ] Third-party services (GA, form processors, etc.)
  - [ ] User rights (access, correction, deletion)
  - [ ] Contact information
- [ ] GDPR compliance (if EU users)
- [ ] CCPA compliance (if California users)
- [ ] ADA compliance statement (if applicable)

## Error Pages
- [ ] 404 page created and styled
- [ ] 404 page has link back to home
- [ ] 500 error page (if applicable)
- [ ] Error pages tested

## Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Responsive Design
- [ ] Mobile view (320px - 480px)
- [ ] Tablet view (768px - 1024px)
- [ ] Desktop view (1280px+)
- [ ] Large desktop (1920px+)
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Text readable without zooming
- [ ] No horizontal scrolling

## Domain & Hosting
- [ ] Custom domain connected
- [ ] WWW and non-WWW both resolve (choose one as canonical)
- [ ] DNS records configured correctly
- [ ] Email forwarding configured (if needed)
- [ ] Domain auto-renewal enabled
- [ ] Hosting plan appropriate for traffic
- [ ] Backup strategy in place

## Email & Communications
- [ ] Contact email working (test it)
- [ ] Email deliverability tested (check spam folders)
- [ ] Auto-responder configured (if wanted)
- [ ] Email signatures updated with new website

## Social Media
- [ ] Share buttons functional (if present)
- [ ] Social media profiles link to new site
- [ ] Social media preview correct (test with debuggers):
  - [ ] Facebook Sharing Debugger
  - [ ] Twitter Card Validator
  - [ ] LinkedIn Post Inspector
- [ ] Social media cover images updated with new brand (if applicable)

## Pre-Launch Testing
- [ ] All pages load without errors
- [ ] All forms work correctly
- [ ] All links functional (no 404s)
- [ ] No console errors or warnings
- [ ] Test on slow connection (3G)
- [ ] Test with JavaScript disabled (graceful degradation)
- [ ] Test contact form with real submission
- [ ] Check all third-party integrations work

## Post-Launch
- [ ] Submit site to Google Search Console
- [ ] Submit site to Bing Webmaster Tools
- [ ] Request indexing of key pages
- [ ] Monitor analytics for first 48 hours
- [ ] Monitor error logs
- [ ] Create Google My Business listing (if applicable)
- [ ] Update old site redirects (if replacing existing site)
- [ ] Announce launch on social media
- [ ] Notify email list (if applicable)
- [ ] Add site to directory listings (if applicable)

## Monitoring & Maintenance
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.)
- [ ] Error tracking configured (Sentry, LogRocket, etc.)
- [ ] Analytics reviewed weekly for first month
- [ ] Performance monitoring ongoing
- [ ] Regular backups scheduled
- [ ] Security updates scheduled
- [ ] Content update schedule planned

## Nice-to-Haves (Optional)
- [ ] Blog or news section
- [ ] Newsletter signup
- [ ] Live chat widget
- [ ] Testimonials or case studies
- [ ] FAQ section
- [ ] Client logos
- [ ] Team page
- [ ] Portfolio or work examples
- [ ] Video content
- [ ] Interactive elements or animations
- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA) features

---

## Quick Reference: Files to Create

**Essential:**
- `/static/robots.txt`
- `/static/sitemap.xml`
- `/static/favicon.svg` (or .ico)
- `/static/og-image.jpg` (1200x630px or 1536x1024px)
- `/src/routes/+error.svelte` (404 page)
- `/src/routes/privacy/+page.svelte`
- `vercel.json` (or hosting-specific config)

**Recommended:**
- `/static/apple-touch-icon.png` (180x180px)
- `/src/routes/terms/+page.svelte` (if applicable)
- `/.env` (for environment variables, gitignored)

---

## Testing Tools

- **SEO:** Google Search Console, Bing Webmaster Tools
- **Performance:** PageSpeed Insights, GTmetrix, WebPageTest
- **Accessibility:** WAVE, axe DevTools, Lighthouse
- **Social Preview:** Facebook Debugger, Twitter Card Validator
- **Mobile:** Google Mobile-Friendly Test, BrowserStack
- **Structured Data:** Google Rich Results Test
- **Security:** Mozilla Observatory, SecurityHeaders.com
- **Uptime:** UptimeRobot, Pingdom
- **Analytics:** Google Analytics 4, Plausible, Fathom

---

## Notes

- Save this checklist in your project repo
- Check off items as you complete them
- Add project-specific items as needed
- Review and update this checklist after each launch
- Not everything applies to every project—use judgment

**Last updated:** March 23, 2026
