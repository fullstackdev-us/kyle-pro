# kyle.pro Facelift Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean up the Lovable-generated React codebase, remove branding/bloat, fix the sonner/theme integration, add a Cloudflare Pages Function for the contact form, and deploy to Cloudflare Pages.

**Architecture:** Single-page React app deployed to Cloudflare Pages. Contact form submits to a Pages Function (`/api/contact`) that sends email via Resend. Cloudflare Turnstile prevents spam. No router — it's a single scroll page.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS 3, shadcn/ui, framer-motion, Cloudflare Pages + Pages Functions, Resend, Cloudflare Turnstile.

**Spec:** `docs/superpowers/specs/2026-03-21-kyle-pro-facelift-design.md`

---

## File Structure (Post-Cleanup)

```
kyle-pro/
├── public/favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx        # (keep) used by ContactSection
│   │   │   ├── input.tsx         # (keep) used by ContactSection
│   │   │   ├── textarea.tsx      # (keep) used by ContactSection
│   │   │   ├── sonner.tsx        # (keep, modify) remove next-themes, use ThemeToggle's approach
│   │   │   └── tooltip.tsx       # (keep) used by App.tsx TooltipProvider
│   │   ├── HeroSection.tsx       # (keep)
│   │   ├── SkillsSection.tsx     # (keep)
│   │   ├── ExperienceSection.tsx # (keep)
│   │   ├── EducationSection.tsx  # (keep)
│   │   ├── ContactSection.tsx    # (keep, modify) wire to /api/contact + Turnstile
│   │   └── ThemeToggle.tsx       # (keep) already has custom localStorage impl
│   ├── lib/utils.ts              # (keep) cn() utility
│   ├── App.tsx                   # (modify) remove router, query client, radix toaster
│   ├── main.tsx                  # (keep)
│   ├── index.css                 # (keep)
│   └── vite-env.d.ts            # (keep)
├── functions/
│   └── api/
│       └── contact.ts            # (create) Cloudflare Pages Function
├── index.html                    # (modify) remove Lovable branding
├── vite.config.ts                # (modify) remove lovable-tagger
├── tailwind.config.ts            # (keep)
├── tsconfig.json                 # (keep)
├── tsconfig.app.json             # (keep)
├── tsconfig.node.json            # (keep)
├── components.json               # (keep) shadcn/ui config
├── vitest.config.ts              # (keep)
├── eslint.config.js              # (keep)
├── postcss.config.js             # (keep)
└── package.json                  # (modify) rename, remove unused deps
```

**Files to delete:**
- `src/pages/Index.tsx` — content inlined into App.tsx
- `src/pages/NotFound.tsx` — 404 handled by Cloudflare Pages
- `src/components/NavLink.tsx` — depends on react-router-dom, unused without router
- `src/components/ui/toaster.tsx` — Radix toast, unused (sonner handles toasts)
- `src/components/ui/toast.tsx` — Radix toast primitives, unused
- `src/components/ui/use-toast.ts` — Radix toast hook, unused
- `src/hooks/use-toast.ts` — duplicate Radix toast hook, unused
- `src/hooks/use-mobile.tsx` — only consumer is sidebar.tsx which is removed
- `src/App.css` — unused, nothing imports it
- `src/test/example.test.ts` — placeholder test, will be replaced
- `bun.lock` — not using bun
- `bun.lockb` — not using bun
- `playwright.config.ts` — depends on lovable-agent-playwright-config
- `playwright-fixture.ts` — depends on lovable-agent-playwright-config
- `README.md` — will be recreated with proper content
- ~38 unused shadcn/ui components in `src/components/ui/` (see Task 2 for full list)

---

### Task 1: Remove Lovable Branding and Unused Files

**Files:**
- Modify: `index.html`
- Modify: `vite.config.ts`
- Modify: `package.json` (name field only)
- Delete: `bun.lock`, `bun.lockb`, `playwright.config.ts`, `playwright-fixture.ts`, `README.md`
- Create: `README.md` (replacement)

- [ ] **Step 1: Update index.html — remove all Lovable references**

Replace the entire `<head>` meta section. Change title to "Kyle V. Dunbar", remove Lovable OG/Twitter tags, add proper meta tags.

```html
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kyle V. Dunbar — Full Stack Developer</title>
    <meta name="description" content="Kyle V. Dunbar — Full Stack Developer. Skills, experience, and contact information." />
    <meta name="author" content="Kyle V. Dunbar" />
    <meta property="og:title" content="Kyle V. Dunbar — Full Stack Developer" />
    <meta property="og:description" content="Skills, experience, and contact information." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://kyle.pro" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
</head>
```

- [ ] **Step 2: Update vite.config.ts — remove lovable-tagger**

Replace contents with:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Note: the `mode` parameter and conditional plugin are no longer needed since `componentTagger` was the only conditional plugin.

- [ ] **Step 3: Update package.json name**

Change `"name": "vite_react_shadcn_ts"` to `"name": "kyle-pro"`. Also remove the `"build:dev"` script (was only used for Lovable tagger conditional mode).

- [ ] **Step 4: Delete Lovable/bun/playwright files**

```bash
rm bun.lock bun.lockb playwright.config.ts playwright-fixture.ts README.md
```

- [ ] **Step 5: Create new README.md**

```markdown
# kyle.pro

Personal website for Kyle V. Dunbar. Built with React, Tailwind CSS, and shadcn/ui. Hosted on Cloudflare Pages.
```

- [ ] **Step 6: Verify the app still builds and runs**

```bash
npm run build
npm run dev
```

Expected: Build succeeds. Dev server starts on port 8080. Site loads normally in browser.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove Lovable branding and unused files"
```

---

### Task 2: Remove Unused shadcn/ui Components

**Files:**
- Delete: ~38 unused component files from `src/components/ui/`
- Delete: `src/components/NavLink.tsx`
- Delete: `src/App.css`
- Delete: `src/hooks/use-mobile.tsx`, `src/hooks/use-toast.ts`
- Delete: `src/components/ui/toaster.tsx`, `src/components/ui/toast.tsx`, `src/components/ui/use-toast.ts`

- [ ] **Step 1: Delete unused shadcn/ui components**

Delete these files from `src/components/ui/`:

```bash
rm src/components/ui/accordion.tsx \
   src/components/ui/alert.tsx \
   src/components/ui/alert-dialog.tsx \
   src/components/ui/aspect-ratio.tsx \
   src/components/ui/avatar.tsx \
   src/components/ui/badge.tsx \
   src/components/ui/breadcrumb.tsx \
   src/components/ui/calendar.tsx \
   src/components/ui/card.tsx \
   src/components/ui/carousel.tsx \
   src/components/ui/chart.tsx \
   src/components/ui/checkbox.tsx \
   src/components/ui/collapsible.tsx \
   src/components/ui/command.tsx \
   src/components/ui/context-menu.tsx \
   src/components/ui/dialog.tsx \
   src/components/ui/drawer.tsx \
   src/components/ui/dropdown-menu.tsx \
   src/components/ui/form.tsx \
   src/components/ui/hover-card.tsx \
   src/components/ui/input-otp.tsx \
   src/components/ui/label.tsx \
   src/components/ui/menubar.tsx \
   src/components/ui/navigation-menu.tsx \
   src/components/ui/pagination.tsx \
   src/components/ui/popover.tsx \
   src/components/ui/progress.tsx \
   src/components/ui/radio-group.tsx \
   src/components/ui/resizable.tsx \
   src/components/ui/scroll-area.tsx \
   src/components/ui/select.tsx \
   src/components/ui/separator.tsx \
   src/components/ui/sheet.tsx \
   src/components/ui/sidebar.tsx \
   src/components/ui/skeleton.tsx \
   src/components/ui/slider.tsx \
   src/components/ui/switch.tsx \
   src/components/ui/table.tsx \
   src/components/ui/tabs.tsx \
   src/components/ui/toggle.tsx \
   src/components/ui/toggle-group.tsx \
   src/components/ui/toaster.tsx \
   src/components/ui/toast.tsx \
   src/components/ui/use-toast.ts
```

- [ ] **Step 2: Delete other unused files**

```bash
rm src/components/NavLink.tsx \
   src/App.css \
   src/hooks/use-mobile.tsx \
   src/hooks/use-toast.ts \
   src/test/example.test.ts
```

- [ ] **Step 3: Verify the app still builds**

```bash
npm run build
```

Expected: Build succeeds with no errors about missing imports (none of these files are imported by kept components).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused shadcn/ui components and dead code"
```

---

### Task 3: Simplify App.tsx — Remove Router, QueryClient, Radix Toaster

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/pages/Index.tsx`, `src/pages/NotFound.tsx`

- [ ] **Step 1: Rewrite App.tsx**

Replace the entire file. Inline the Index page content, remove router, remove QueryClientProvider, remove Radix Toaster (keep only Sonner):

```tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 right-0 p-4 z-50">
        <ThemeToggle />
      </header>
      <main className="max-w-3xl mx-auto px-6 pb-20">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kyle V. Dunbar
      </footer>
    </div>
  </TooltipProvider>
);

export default App;
```

- [ ] **Step 2: Delete pages directory**

```bash
rm -r src/pages
```

- [ ] **Step 3: Verify the app builds and runs**

```bash
npm run build
npm run dev
```

Expected: Build succeeds. Site loads and displays all sections correctly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: inline page content into App, remove router and query client"
```

---

### Task 4: Fix sonner.tsx — Remove next-themes Dependency

**Files:**
- Modify: `src/components/ui/sonner.tsx`

The current `sonner.tsx` imports `useTheme` from `next-themes` which is a Next.js-only library. ThemeToggle already manages theme via `localStorage` and `document.documentElement.classList`. Sonner should read the theme the same way.

- [ ] **Step 1: Rewrite sonner.tsx**

```tsx
import { useEffect, useState } from "react";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains("dark") ? "dark" : "light");
    });
    // Set initial value
    setTheme(root.classList.contains("dark") ? "dark" : "light");
    // Watch for class changes (ThemeToggle toggles "dark" class)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
```

- [ ] **Step 2: Verify toasts still work with theme toggle**

```bash
npm run build
npm run dev
```

Expected: Build succeeds. Toggle theme → sonner toasts match the current theme. Submit the contact form (still simulated) → toast appears styled correctly in both light and dark modes.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/sonner.tsx
git commit -m "fix: replace next-themes with DOM observer in sonner"
```

---

### Task 5: Remove Unused npm Dependencies

**Files:**
- Modify: `package.json`
- Regenerate: `package-lock.json`

- [ ] **Step 1: Uninstall unused dependencies**

```bash
npm uninstall \
  @tanstack/react-query \
  react-router-dom \
  react-hook-form \
  @hookform/resolvers \
  zod \
  recharts \
  react-day-picker \
  date-fns \
  embla-carousel-react \
  react-resizable-panels \
  input-otp \
  cmdk \
  next-themes \
  vaul \
  @radix-ui/react-accordion \
  @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio \
  @radix-ui/react-avatar \
  @radix-ui/react-checkbox \
  @radix-ui/react-collapsible \
  @radix-ui/react-context-menu \
  @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu \
  @radix-ui/react-hover-card \
  @radix-ui/react-label \
  @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu \
  @radix-ui/react-popover \
  @radix-ui/react-progress \
  @radix-ui/react-radio-group \
  @radix-ui/react-scroll-area \
  @radix-ui/react-select \
  @radix-ui/react-separator \
  @radix-ui/react-slider \
  @radix-ui/react-switch \
  @radix-ui/react-tabs \
  @radix-ui/react-toast \
  @radix-ui/react-toggle \
  @radix-ui/react-toggle-group \
  @radix-ui/react-label \
  @radix-ui/react-separator
```

- [ ] **Step 2: Uninstall unused devDependencies**

```bash
npm uninstall lovable-tagger @playwright/test
```

- [ ] **Step 3: Verify the app still builds and runs**

```bash
npm run build
npm run dev
```

Expected: Build succeeds. No missing module errors. Site works as before.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused dependencies"
```

---

### Task 6: Create Contact Form Pages Function

**Files:**
- Create: `functions/api/contact.ts`

- [ ] **Step 1: Create the functions directory**

```bash
mkdir -p functions/api
```

- [ ] **Step 2: Write the Pages Function**

Create `functions/api/contact.ts`:

```typescript
interface Env {
  CONTACT_EMAIL: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface ContactRequest {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Parse body
  let body: ContactRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate fields
  const { name, email, message, turnstileToken } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email address" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!turnstileToken) {
    return new Response(
      JSON.stringify({ error: "Turnstile verification required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Verify Turnstile token
  const turnstileResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: request.headers.get("CF-Connecting-IP") || "",
      }),
    }
  );

  const turnstileResult = await turnstileResponse.json<{ success: boolean }>();
  if (!turnstileResult.success) {
    return new Response(
      JSON.stringify({ error: "Turnstile verification failed" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Send email via Resend
  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `kyle.pro Contact Form <contact@kyle.pro>`,
        to: [env.CONTACT_EMAIL],
        reply_to: email,
        subject: `Contact form: ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("Resend error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send message" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error("Send error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
```

- [ ] **Step 3: Commit**

```bash
git add functions/api/contact.ts
git commit -m "feat: add contact form Pages Function with Resend and Turnstile"
```

---

### Task 7: Wire Up ContactSection to Pages Function + Turnstile

**Files:**
- Modify: `src/components/ContactSection.tsx`
- Modify: `index.html` (add Turnstile script)

- [ ] **Step 1: Add Turnstile script to index.html**

Add before the closing `</head>` tag:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

- [ ] **Step 2: Rewrite ContactSection.tsx**

```tsx
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void }
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>("");

  useEffect(() => {
    const renderWidget = () => {
      if (!turnstileRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
      });
    };

    // Turnstile script loads async — poll until available
    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          renderWidget();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!turnstileToken) {
      toast.error("Please complete the verification.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setTurnstileToken("");
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-16 border-t border-border" id="contact">
      <motion.h2
        className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Get in Touch
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Input
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={100}
        />
        <Input
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={255}
        />
        <Textarea
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          maxLength={1000}
          rows={5}
        />
        <div ref={turnstileRef} />
        <Button type="submit" disabled={sending || !turnstileToken}>
          {sending ? "Sending…" : "Send Message"}
        </Button>
      </motion.form>
    </section>
  );
};
```

- [ ] **Step 3: Verify the app builds**

```bash
npm run build
```

Expected: Build succeeds. The contact form renders with a Turnstile widget placeholder (widget won't render without a valid site key, but the build should succeed).

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactSection.tsx index.html
git commit -m "feat: wire contact form to /api/contact with Turnstile"
```

---

### Task 8: Cloudflare Pages Setup (Manual)

These steps are performed in the Cloudflare dashboard and Resend dashboard, not in code.

**Prerequisite:** kyle.pro DNS is already managed by Cloudflare (domain previously onboarded).

- [ ] **Step 1: Set up Resend**

1. Sign up at resend.com (free tier: 100 emails/day)
2. Add and verify the kyle.pro domain — Resend will provide DNS records (DKIM, SPF)
3. Add those DNS records in Cloudflare DNS dashboard for kyle.pro
4. Generate an API key in Resend

- [ ] **Step 2: Set up Cloudflare Turnstile**

1. In Cloudflare dashboard → Turnstile → Add site
2. Add kyle.pro as the domain
3. Choose "Managed" challenge type
4. Note the **site key** and **secret key**

- [ ] **Step 3: Create Cloudflare Pages project**

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Select the `fullstackdev-us/kyle-pro` repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Environment variables (Settings → Environment variables):
   - `CONTACT_EMAIL` = your email address
   - `RESEND_API_KEY` = key from Step 1
   - `TURNSTILE_SECRET_KEY` = secret key from Step 2
   - `VITE_TURNSTILE_SITE_KEY` = site key from Step 2 (must be prefixed with `VITE_` for client-side access)

- [ ] **Step 4: Add custom domain**

1. Cloudflare Pages project → Custom domains → Add
2. Enter `kyle.pro`
3. Cloudflare will automatically configure the DNS record (since kyle.pro is already on Cloudflare)

- [ ] **Step 5: Remove Azure Static Web App**

1. Delete the Azure Static Web App resource in the Azure portal
2. If `.github/workflows/azure-static-web-apps-agreeable-moss-061c40d1e.yml` exists in the repo, delete it and commit

- [ ] **Step 6: Verify deployment**

Push to `main` → Cloudflare Pages auto-builds and deploys. Visit https://kyle.pro and verify:
- Site loads with all sections
- Theme toggle works
- Contact form submits and you receive an email
- Turnstile widget renders and functions

---

### Task 9: Final Verification

- [ ] **Step 1: Run build and tests**

```bash
npm run build
npm run test
npm run lint
```

Expected: All pass.

- [ ] **Step 2: Manual smoke test**

Open the deployed site at https://kyle.pro:
1. All sections render (Hero, Skills, Experience, Education, Contact)
2. Theme toggle switches between light and dark
3. Sonner toasts match the current theme
4. Contact form validates required fields
5. Turnstile widget renders
6. Form submits successfully and email is received
7. No Lovable branding anywhere (view source, meta tags, console)

- [ ] **Step 3: Check page title and meta tags**

View page source and confirm:
- Title: "Kyle V. Dunbar — Full Stack Developer"
- No references to "Lovable" anywhere
- OG tags are correct

- [ ] **Step 4: Final commit (if any cleanup needed)**

```bash
git add -A
git commit -m "chore: final cleanup"
```
