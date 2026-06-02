# Interview Guide - CuraLink Health Technical Q&A

This document prepares you for technical interviews by detailing the architectural design, healthcare context, and tradeoffs made in this project.

---

## 1. Architecture Questions

### Q1: Explain the folder structure of this project.
> We transitioned this project from a flat prototype to a highly structured modular design:
> * `src/components/`: Separated into `ui/` (reusable atomic elements), `forms/` (Zod-validated forms), `charts/` (lazy Recharts), `layouts/` (navigation), and `shared/` (error boundaries).
> * `src/store/`: Zustand stores separating states for patient vitals, doctor queue management, auth sessions, and admin metrics.
> * `src/services/api.ts`: Centralized Mock API simulating network lag, optimistic updates, and database updates using LocalStorage.

### Q2: How is the authentication and authorization flow designed?
> * We use **NextAuth.js** with a `CredentialsProvider` mapping mock accounts representing Patient, Doctor, and Admin users.
> * Session cookies are configured as HttpOnly and Secure, guarding against script-based token theft.
> * Route protection is enforced at the server boundary inside `src/middleware.ts` using role-based routing checks. Users are redirected instantly if their token role does not match the page sub-path.

### Q3: Why did you combine Zustand and TanStack Query?
> * **TanStack Query** manages server-state (fetch caching, request statuses, data mutations, optimistic query invalidation).
> * **Zustand** manages client-state (sidebar layout toggle, auth credentials, active local selection indices).
> * This separation of concerns keeps state synchronization clean and prevents state store bloating.

---

## 2. Healthcare Domain Questions

### Q4: What business problem does CuraLink solve?
> * In healthcare, scheduling coordination and compliance checks are major overhead costs. 
> * CuraLink aggregates patient care progress, doctor workload queues, and admin compliance logs into a single reactive hub. When a patient completes a care checklist step, the system dynamically invalidates the compliance database cache, automatically updating the Admin's sign-off queue.

### Q5: How does the application protect Patient Health Information (PHI)?
> * Inputs are run through our XSS escape sanitization module (`src/utils/sanitize.ts`).
> * Strict security headers (CSP, X-Frame-Options) prevent injection attacks and clickjacking.
> * API rate limiting protects routes against credential stuffing.

---

## 3. Technical Tradeoffs

### Q6: Why did you choose Zustand over Redux Toolkit?
> * Zustand is incredibly lightweight (less than 1KB gzipped) and does not require complex boilerplate (actions, reducers, payload builders). For a dashboard ecosystem requiring rapid slice subscriptions, Zustand is much faster to implement and maintain while offering equivalent performance.

### Q7: Why did you implement a dynamic fallback for environment variables?
> * In production/Vercel environments, missing environment variables usually trigger application crashes. 
> * To ensure a seamless recruitment review, the application validates variables using Zod but falls back gracefully to secure demo presets with warnings, keeping the platform plug-and-play and ready to explore instantly.
