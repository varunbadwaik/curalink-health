# CuraLink Health — Unified Healthcare Experience Platform

CuraLink Health is a Staff-Grade, production-ready, unified healthcare dashboard platform built on **Next.js 16 (App Router)** and **React 19**. It features three custom-tailored user portals (Patient, Doctor, Admin) designed to synchronize real-time actions, telemetry, patient queues, and clinical analytics.

The visual design is structured around a modern, premium **Sage Green & Cream** aesthetic to foster accessibility, visual clarity, and user trust.

---

## 🏗 System Architecture & Flow

```text
                               ┌───────────────────────────┐
                               │   Marketing / Login Gate  │
                               └─────────────┬─────────────┘
                                             │ (NextAuth Credentials)
                                             ▼
                               ┌───────────────────────────┐
                               │  src/middleware.ts Guard  │
                               └─────────────┬─────────────┘
          ┌──────────────────────────────────┼──────────────────────────────────┐
          ▼ (Role: admin)                    ▼ (Role: doctor)                   ▼ (Role: patient)
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│     Admin Dashboard       │      │     Doctor Dashboard      │      │     Patient Dashboard     │
├───────────────────────────┤      ├───────────────────────────┤      ├───────────────────────────┤
│ - Department Analytics    │      │ - Dynamic Workload Queue  │      │ - Vitals Tracking Logs    │
│ - HIPAA Compliance Log    │      │ - Prescription Creation   │      │ - Appointment Booking    │
│ - Integrations Config     │      │ - AI Diagnosis Insights   │      │ - Active Care Plans      │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

---

## 🛠 Tech Stack & Core Dependencies

* **Framework**: [Next.js 16.2.4](https://nextjs.org/) (App Router, Standalone Outputs, Server Middleware)
* **UI & Styling**: React 19.2.4, Vanilla CSS (CSS Modules), dynamic HSL design tokens
* **State Management**: [Zustand 5.0.14](https://github.com/pmndrs/zustand)
* **Authentication**: [NextAuth.js 4.24.14](https://next-auth.js.org/)
* **Form Validation**: [React Hook Form 7.77.0](https://react-hook-form.com/) & [Zod 4.4.3](https://zod.dev/)
* **Data Fetching**: [TanStack React Query 5.101.0](https://tanstack.com/query)
* **Charts**: [Recharts 3.8.1](https://recharts.org/) (dynamically imported with `ssr: false`)
* **Iconography**: [@phosphor-icons/react 2.1.10](https://phosphoricons.com/)

---

## 🚀 Setup & Installation

### Prerequisites
* Node.js v24+
* npm v10+

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Create a local `.env` file using the environment template:
```bash
cp .env.example .env
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 4. Run Test Suite
```bash
npm run test
```

---

## 🛡 Security Implementations

* **Role-Guarded Middleware**: All requests to `/dashboard/admin/*`, `/dashboard/doctor/*`, and `/dashboard/patient/*` pass through Edge middleware, preventing vertical/horizontal privilege escalation.
* **XSS Protection**: Inputs are run through our XSS escape sanitization module (`src/utils/sanitize.ts`).
* **Secure HTTP Headers**: Custom response headers (CSP, X-Frame-Options, X-Content-Type-Options) are configured in `next.config.ts`.
* **API Rate Limiting**: Features a token-bucket rate limiter helper in `src/lib/rate-limit.ts`.

---

## ⚡ Performance Optimizations

* **Dynamic Chart Chunks**: Recharts components are lazily imported to bypass node-side document dependencies, reducing page payload weights.
* **Zustand Selectors**: Using narrow state subscriptions to limit component re-renders.
* **Image Preloading**: Key media (like `doctor-hero.png`) uses Next.js `priority` loading.

---

## ♿ Accessibility (WCAG 2.2 AA)

* Semantic landmarks (`<nav>`, `<aside>`, `<main>`) for screen reader support.
* Custom `:focus-visible` high-contrast outline styling for clean keyboard navigation.
* Minimum **4.5:1** contrast ratios for text readability.
