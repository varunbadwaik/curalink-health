# CuraLink Health — Unified Healthcare Experience Platform

CuraLink Health is a Staff-Grade, production-ready, unified healthcare dashboard built on **Next.js 16 (App Router)** and **React 19**. It features three customized user portals (Patient, Doctor, Admin) designed to synchronize real-time actions, telemetry, patient queues, and clinical analytics.

The visual design is structured around a modern, premium **Sage Green & Cream** aesthetic to foster accessibility, visual clarity, and user trust.

---

## 🛠 Tech Stack & Core Dependencies

- **Framework**: [Next.js 16.2.4](https://nextjs.org/) (App Router, Server Actions, Middleware)
- **UI & Styling**: React 19.2.4, Vanilla CSS (CSS Modules), theme variables
- **State Management**: [Zustand 5.0.14](https://github.com/pmndrs/zustand)
- **Authentication**: [NextAuth.js 4.24.14](https://next-auth.js.org/)
- **Form Validation**: [React Hook Form 7.77.0](https://react-hook-form.com/) & [Zod 4.4.3](https://zod.dev/)
- **Data Fetching**: [TanStack React Query 5.101.0](https://tanstack.com/query)
- **Charts**: [Recharts 3.8.1](https://recharts.org/) (dynamically imported with `ssr: false`)
- **Iconography**: [@phosphor-icons/react 2.1.10](https://phosphoricons.com/)

---

## 🏗 Directory Architecture

```
src/
├── app/                  # Next.js App Router (pages, layout, middleware, API)
│   ├── api/              # Authentication routes (NextAuth handlers)
│   ├── dashboard/        # Dashboard layouts and views
│   │   ├── admin/        # Admin analytics, health grids, metrics
│   │   ├── doctor/       # Doctor queues, scheduler, prescription modals
│   │   └── patient/      # Patient vitals timeline, booking, profile controls
│   └── page.tsx          # Marketing landing page & gateway sign-in
├── components/           # Component system
│   ├── charts/           # Dynamic analytics (Recharts engines)
│   ├── forms/            # Form components (Zod + React Hook Form)
│   ├── layouts/          # Core layout frames (Sidebar navigation)
│   ├── shared/           # Common components (ErrorBoundary, fallbacks)
│   └── ui/               # Standard UI micro-components
├── constants/            # Immutable layout labels and role parameters
├── hooks/                # Custom React hook files
├── lib/                  # Library configurations (auth options, env validation)
├── providers/            # Next.js Context wrap structures (Auth, Query)
├── services/             # Mock DB logic and network simulate latency APIs
├── store/                # Zustand global store states
├── tests/                # Jest + React Testing Library suites
└── utils/                # Input sanitizers and formatting helpers
```

---

## 🛡 Security Implementations
- **Role-Guarded Middleware**: All requests to `/dashboard/admin/*`, `/dashboard/doctor/*`, and `/dashboard/patient/*` pass through edge-intercept filters ensuring session verification and preventing vertical/horizontal privilege escalation.
- **Zod Env Validation**: Build-time checking of process variables (`env.ts`).
- **XSS Protection**: Sanitization layer (`sanitize.ts`) escapes HTML tokens before input rendering.
- **Zod Schemas**: Every form input is strictly validated on submit to prevent formatting bypasses.

---

## ⚡ Performance Optimization
- **Dynamic Chart Chunks**: Recharts components are split into async script segments (`ssr: false`) to avoid hydration conflicts and minimize first-contentful paint payload.
- **Image Priority Loaders**: Next.js `<Image>` component used for asset optimizations, including priority flags for above-the-fold hero rendering.
- **Caching Layer**: TanStack Query manages in-memory caching to avoid redundant server requests.

---

## ♿ Accessibility (WCAG 2.2 AA)
- Semantic landmarks (`<nav>`, `<aside>`, `<main>`) for screen reader support.
- Custom `:focus-visible` high-contrast outline styling for clean keyboard navigation.
- Minimum **4.5:1** contrast ratios for text readability.

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js v24+
- npm v10+

### Installation
```bash
npm install --legacy-peer-deps
```

### Run Local Development Server
```bash
npm run dev
```
Open [https://curalink-health-flame.vercel.app/](https://curalink-health-flame.vercel.app/) to view the portal.

### Run Test Suite
```bash
npm run test
```

### Production Build
```bash
npm run build
```
