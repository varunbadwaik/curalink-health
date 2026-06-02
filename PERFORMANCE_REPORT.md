# Performance Optimization Report - CuraLink Health

This document details the performance optimization strategies implemented in CuraLink Health to achieve maximum fluid responsiveness, fast initial load times, and clean client-side rendering profiles.

---

## 1. Dynamic Code Splitting (SSR: False)
Recharts relies heavily on browser APIs (like `window`, `document`, and SVG measurement contexts) which do not exist during Next.js Server-Side Rendering (SSR). This usually leads to layout shift or hydrated client warnings.

### Optimization:
- Wrapped chart modules dynamically using Next.js `dynamic()` helper with `{ ssr: false }`:
  - `PatientVitalsChart` in the Patient Dashboard.
  - `DoctorWorkloadChart` in the Doctor Command Center.
  - `RevenueChart` and `DepartmentChart` in the Admin Dashboard.
- **Result**: Reduced main bundle payload by splitting Recharts library (and its subcomponents like `d3-shape`, `d3-scale`, etc.) into a lazy-loaded chunk that loads asynchronous to the main skeleton layout.

---

## 2. Image Optimization (Next.js `<Image>`)
- High-fidelity visual components like the hero graphic on the landing page are implemented using Next.js `next/image`.
- **Properties**:
  - `priority` flag enabled on the above-the-fold hero image (`/doctor-hero.png`) to ensure it preloads immediately during document parsing.
  - Set explicit `width`/`height` attributes to prevent layout shifts (CLS) when images resolve.
  - Built-in automatic format conversion (WebP/AVIF generation) and source scaling for multi-device displays.

---

## 3. Render and Lifecycle Memoization
- List items like the upcoming appointments, medications, patient queue, and health indicators map over fetched arrays with distinct, stable key properties (e.g. `key={apt.id || i}`), preventing React from rebuilding the entire sub-tree during state mutations.
- Leveraged React state hook triggers for modals, forms, and custom mutations ensuring re-renders are localized to the active component tree.
- Connected component actions to TanStack Query's caching layer, ensuring data is kept fresh without triggering redundant network requests.

---

## 4. Next Steps for Production Deployment
1. **Font Optimization**: Fonts from Google Fonts are imported via standard preconnect hooks or can be bundled locally using `next/font/google` to minimize layout shifts on slower mobile links.
2. **Bundle Analytics**: Integrate `@next/bundle-analyzer` to continuously audit dependencies as more analytics or modules are introduced.
