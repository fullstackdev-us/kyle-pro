# kyle.pro Facelift — Design Spec

## Overview

Rebuild kyle.pro as a single-page scroll site using the Lovable-generated React codebase already in the repo. Migrate hosting from Azure Static Web Apps to Cloudflare Pages, DNS from Namecheap to Cloudflare. Add a contact form backend via Cloudflare Pages Functions + Resend for email delivery.

## Site Structure

Single page with scroll-based sections:

1. **Hero** — name, title, avatar, social links
2. **Skills** — technology/skill tags
3. **Experience** — work history
4. **Education** — education history
5. **Contact** — form (name, email, message) that sends email via Resend

No authentication, no database. Single-page app with `react-router-dom` removed — Cloudflare Pages handles 404 via a static `404.html` or `_redirects` file.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 + shadcn/ui (subset of components)
- framer-motion for animations
- lucide-react for icons
- Cloudflare Pages for hosting
- Cloudflare Pages Functions for contact form API
- Resend for email delivery (free tier: 100 emails/day)
- Cloudflare Turnstile for spam protection on the contact form (free)

## Project Structure

```
kyle-pro/
├── public/                    # Static assets (favicon)
├── src/
│   ├── components/            # Page section components + shadcn/ui subset
│   │   ├── ui/                # Only used shadcn/ui primitives
│   │   ├── HeroSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/                 # Custom hooks (use-mobile.tsx if used, else removed)
│   ├── lib/utils.ts           # shadcn/ui utility (cn function)
│   ├── App.tsx                # Renders Index directly, no router
│   ├── main.tsx
│   └── index.css
├── functions/
│   └── api/
│       └── contact.ts         # Cloudflare Pages Function
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json            # shadcn/ui config (keep for future component additions)
├── vitest.config.ts           # Unit test config
└── package.json
```

Note: `src/pages/` directory is removed. `Index.tsx` content is inlined into `App.tsx` or rendered directly. `NotFound.tsx` is removed — 404 handling is done at the Cloudflare Pages level.

## Contact Form Backend

### Pages Function: `functions/api/contact.ts`

- Accepts `POST /api/contact` with JSON body: `{ name, email, message, turnstileToken }`
- Validates all fields are present and non-empty
- Validates email format
- Verifies Cloudflare Turnstile token to prevent spam
- Sends email via Resend API
- Returns 200 on success, 400 on validation error, 500 on send failure
- Recipient email and Resend API key configured via Cloudflare Pages environment variables
- Turnstile secret key configured via environment variable

### DNS Setup for Resend

- Add Resend's required DNS records (DKIM, SPF) for the kyle.pro domain
- Audit any existing email DNS records before adding new ones to avoid conflicts

### Frontend Changes

- `ContactSection.tsx`: replace `setTimeout` simulation with `fetch('/api/contact', { method: 'POST', ... })`
- Add Cloudflare Turnstile widget to the contact form
- Handle loading, success, and error states via existing sonner toasts

## Infrastructure

### DNS Migration (Manual Steps)

1. Add kyle.pro as a site in Cloudflare (free plan)
2. Cloudflare provides two nameservers
3. Log in to Namecheap, update nameservers to Cloudflare's
4. Wait for propagation (can take up to 48 hours)
5. Audit existing DNS records (especially any existing SPF/MX records for email)
6. Add Resend DNS records for email sending

### Cloudflare Pages Setup (Manual Steps)

1. In Cloudflare dashboard, create a new Pages project
2. Connect to the GitHub repo (fullstackdev-us/kyle-pro)
3. Build settings: command `npm run build`, output directory `dist`
4. Set environment variables: `CONTACT_EMAIL`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`
5. Custom domain: kyle.pro (after DNS propagation)
6. Add Turnstile site key in Cloudflare dashboard

### Azure Cleanup

- Delete the Azure Static Web App resource (manual)
- Remove `.github/workflows/azure-static-web-apps-agreeable-moss-061c40d1e.yml` (if present in repo)

## Code Cleanup

### Remove Lovable Branding

- `index.html`: replace title with "Kyle V. Dunbar", update meta description/author, remove Lovable OG/Twitter meta tags, add proper OG tags
- `vite.config.ts`: remove `lovable-tagger` import and `componentTagger()` plugin
- `README.md`: replace content
- `package.json`: rename from `vite_react_shadcn_ts` to `kyle-pro`
- Delete `playwright.config.ts` and `playwright-fixture.ts` (depend on `lovable-agent-playwright-config`)

### Remove Unused Files

- `bun.lock` and `bun.lockb`
- `src/pages/` directory (Index.tsx inlined, NotFound.tsx removed)
- `src/hooks/use-mobile.tsx` (only used by sidebar.tsx which is being removed)
- `src/hooks/use-toast.ts` (duplicate of ui/use-toast.ts, unused — sonner is used instead)
- `src/App.css` (unused Vite boilerplate, nothing imports it)

### Update App.tsx

- Remove `QueryClientProvider` wrapper and `@tanstack/react-query` import
- Remove `BrowserRouter`, `Routes`, `Route` and `react-router-dom` import
- Remove `<Toaster />` component (Radix toast — unused, sonner is used)
- Render page content directly instead of through router

### Remove Unused shadcn/ui Components

Keep only components that are actually imported by page sections. Remove the rest. Expected keepers (to verify during implementation by tracing imports):

- `button.tsx`, `input.tsx`, `textarea.tsx`, `tooltip.tsx`, `sonner.tsx`

Expected removals (~30+ components):

- `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `sheet`, `sidebar`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `toggle`, `toggle-group`
- `toaster.tsx`, `toast.tsx`, `use-toast.ts` (Radix-based toast system — unused, sonner handles toasts)

### Remove Unused Dependencies

**npm dependencies to remove:**
- `@tanstack/react-query` — no data fetching layer needed
- `react-router-dom` — single page, no routing needed
- `react-hook-form`, `@hookform/resolvers` — contact form uses useState
- `zod` — no schema validation used
- `recharts` — no charts
- `react-day-picker`, `date-fns` — no date picking
- `embla-carousel-react` — no carousel
- `react-resizable-panels` — no resizable panels
- `input-otp` — no OTP input
- `cmdk` — no command palette
- `next-themes` — Next.js specific, won't work properly with Vite
- `vaul` — drawer dependency, removed with drawer
- `@radix-ui/react-toast` — unused (sonner handles toasts)
- All other Radix packages for removed components

**npm devDependencies to remove:**
- `lovable-tagger`
- `@playwright/test`

**Dependencies to keep:**
- `react`, `react-dom`
- `framer-motion`
- `lucide-react`
- `sonner`
- `tailwind-merge`, `clsx`, `class-variance-authority`, `tailwindcss-animate`
- Radix packages for kept components (`@radix-ui/react-tooltip`, `@radix-ui/react-slot`)
- All existing devDependencies except those listed for removal

### Fix ThemeToggle

`next-themes` is a Next.js library. Replace with a simple React implementation:
- Use `localStorage` to persist theme preference
- Toggle a `dark` class on `<html>` element (Tailwind's dark mode strategy)
- Respect `prefers-color-scheme` as default

### Verify Tests Pass

After cleanup, run `npm run test` and `npm run build` to confirm nothing is broken. Fix any test files that import removed components.

## Out of Scope

- Authentication
- Database
- Blog or CMS
- Analytics (can be added later via Cloudflare Web Analytics, which is free)
- E2E tests (playwright removed; unit tests via vitest remain)
- Rate limiting beyond Turnstile (can be added later if needed)
